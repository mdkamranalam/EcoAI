# ecoAI Frontend - Multi-Step Form Implementation

## 🎉 Complete Redesign

The ecoAI frontend has been completely rebuilt according to expert specifications with a modern, wizard-style multi-step form approach.

---

## 📁 New Component Structure

```
frontend/
├── app/
│   ├── layout.tsx              ✅ Updated with Inter font
│   ├── page.tsx                ✅ Hero section + header/footer
│   └── globals.css             ✅ Clean, modern styling
├── components/
│   ├── CarbonFootprintForm.tsx ✅ Main wizard container
│   ├── ResultsDashboard.tsx    ✅ AI results with charts
│   ├── ui/
│   │   ├── Button.tsx          ✅ Reusable button component
│   │   ├── Input.tsx           ✅ Styled input with validation
│   │   ├── Slider.tsx          ✅ Interactive range slider
│   │   └── Card.tsx            ✅ Content card wrapper
│   └── form-steps/
│       ├── EnergyStep.tsx      ✅ Step 1: Energy consumption
│       ├── TravelStep.tsx      ✅ Step 2: Travel habits
│       └── DietStep.tsx        ✅ Step 3: Dietary choices
```

---

## 🎨 Design Features

### Color Palette (Earthy & Modern)
- **Primary**: Emerald 500-600 (#10b981, #059669)
- **Background**: Slate 50 (#f8fafc)
- **Text**: Slate 700-800 (#334155, #1e293b)
- **Accents**: Blue 500 (#3b82f6), Orange 500 (#f59e0b)

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale from text-sm to text-6xl
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### UI/UX Enhancements
- ✨ Smooth transitions (300ms duration)
- 🎯 Hover effects on interactive elements
- 📱 Fully responsive (mobile-first approach)
- 🔄 Loading states with spinners
- ✅ Visual feedback on form validation

---

## 🧙 Multi-Step Wizard Flow

### Step 1: Energy Consumption (🏠)
**Component**: `EnergyStep.tsx`

**Inputs**:
- **Slider**: 0-3000 kWh/month (step: 50)
- **Number Input**: Exact value entry
- **Icon**: Zap (⚡)

**Features**:
- Synchronized slider + input
- Real-time value display
- Helper text showing US average
- Emerald color theme

**API Field**: `energy_kwh`

---

### Step 2: Travel Habits (🚗)
**Component**: `TravelStep.tsx`

**Inputs**:
- **Slider**: 0-1000 miles/week (step: 10)
- **Number Input**: Exact distance
- **Icon**: Car (🚗)

**Features**:
- Miles-only (not kilometers)
- Info box explaining units
- US emission standards note
- Blue accent highlights

**API Field**: `miles_driven`

---

### Step 3: Dietary Choices (🍽️)
**Component**: `DietStep.tsx`

**Inputs**:
- **Segmented Control**: 4 options
  - Never (0) - Vegetarian/Vegan
  - Rarely (1-3) - Few times/week → value: 2
  - Moderate (4-7) - Most days → value: 5.5
  - Daily (7+) - Every meal → value: 10

**Features**:
- Card-based selection UI
- Visual checkmark on selected option
- Educational fact box
- Green accent when selected

**API Field**: `meat_consumption`

---

## 🔄 Form State Management

### React Hook Form Integration
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  mode: 'onChange',
  defaultValues: {
    energy_kwh: 1000,
    miles_driven: 500,
    meat_consumption: 5.5
  }
})
```

### Controlled State
- Energy: `energyValue` / `setEnergyValue`
- Miles: `milesValue` / `setMilesValue`
- Meat: `meatValue` / `setMeatValue`

---

## 🌐 API Integration

### Endpoint
```
POST http://localhost:3001/analyze
```

### Request Payload
```json
{
  "energy_kwh": 1000,
  "miles_driven": 500,
  "meat_consumption": 5.5
}
```

### Expected Response
```json
{
  "totalFootprint": 3.2,
  "breakdown": {
    "energy": 40,
    "travel": 35,
    "food": 25
  },
  "plan": [
    "Reduce meat to 3x/week to save 0.8 tons CO2/year.",
    "Switch to LED bulbs to save 0.5 tons CO2/year."
  ],
  "simulation": {
    "scenario": "Switch to an EV",
    "savings": 1.5,
    "newFootprint": 1.7
  }
}
```

### States Handled
- **Loading**: Shows spinner, disables submit button
- **Error**: Displays user-friendly error message
- **Success**: Hides form, shows `ResultsDashboard`

---

## 📊 Results Dashboard

### Layout Structure
1. **Header**: Large footprint number with US average comparison
2. **Two Columns**:
   - **Left**: Pie chart (Recharts) showing emissions breakdown
   - **Right**: What-if scenario simulation card
3. **Sustainability Plan**: Numbered checklist of AI recommendations
4. **Action Buttons**: Calculate Again + Download Report

### Pie Chart (Recharts)
- **Data**: Energy, Travel, Food percentages
- **Colors**: Emerald, Blue, Orange
- **Features**: Labels, tooltips, legend, responsive

### What-If Simulation
- Shows selected scenario
- Current vs. new footprint
- CO₂ savings highlighted
- Tree equivalent calculation

### Sustainability Plan
- Each item in a card
- Numbered circles (1, 2, 3...)
- Checkmark icons
- Gradient green background

---

## 🎯 Progress Indicator

### Visual Design
- 3 numbered circles (1, 2, 3)
- Active step: Emerald 600 with scale effect
- Completed steps: Checkmark icon
- Future steps: Gray 200
- Connecting lines between steps
- Step labels below circles

### State Management
```typescript
const [currentStep, setCurrentStep] = useState(1)
const totalSteps = 3
```

---

## 🚀 Navigation Controls

### Back Button
- Label: "Back" with ChevronLeft icon
- Variant: Outline
- Disabled on step 1

### Next Button (Steps 1-2)
- Label: "Next" with ChevronRight icon
- Variant: Primary (emerald)

### Submit Button (Step 3)
- Label: "Analyze My Footprint" with Sparkles icon
- Shows spinner when loading
- Disabled during API call

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (sm)
  - Single column
  - Stacked buttons
  - Smaller text sizes

- **Tablet**: 640px - 1024px (md)
  - Two-column grids
  - Side-by-side cards

- **Desktop**: > 1024px (lg)
  - Maximum width containers
  - Enhanced spacing
  - Larger visualizations

### Mobile Optimizations
- Touch-friendly buttons (44px min height)
- Larger tap targets on sliders
- Simplified chart legends
- Collapsed navigation on small screens

---

## 🎨 Reusable UI Components

### Button Component
**Path**: `components/ui/Button.tsx`

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline'
- `isLoading`: boolean
- `disabled`: boolean
- `children`: ReactNode

**Features**:
- Loading spinner animation
- Smooth hover effects
- Disabled state styling

---

### Input Component
**Path**: `components/ui/Input.tsx`

**Props**:
- `label`: string
- `error`: string
- `icon`: ReactNode

**Features**:
- Emerald focus ring
- Icon support (left-aligned)
- Error state with red border
- Accessible labels

---

### Slider Component
**Path**: `components/ui/Slider.tsx`

**Props**:
- `label`: string
- `value`: number
- `onChange`: (value: number) => void
- `min`, `max`, `step`: numbers
- `unit`: string

**Features**:
- Custom thumb styling
- Emerald accent color
- Value display with unit
- Min/max labels

---

### Card Component
**Path**: `components/ui/Card.tsx`

**Props**:
- `title`: string
- `subtitle`: string
- `children`: ReactNode
- `className`: string

**Features**:
- White background
- Rounded corners (2xl)
- Shadow with hover effect
- Optional header section

---

## 🔍 Validation & Error Handling

### Client-Side Validation
- All fields required
- Positive numbers only
- Real-time error messages

### API Error Handling
```typescript
try {
  const response = await axios.post(...)
  setResults(response.data)
} catch (error) {
  setApiError(
    error.response?.data?.error || 
    'Please make sure the backend server is running'
  )
}
```

### Error Display
- Red background box
- Clear error message
- Positioned above navigation buttons

---

## 🎬 Animations & Transitions

### Smooth Transitions
- Button hover: 300ms
- Step indicator: 300ms
- Card hover: 300ms
- Form step changes: Instant (no animation)

### Loading States
- Spinner animation on submit button
- Skeleton screen for results (optional)

### Micro-interactions
- Button press effect
- Slider thumb hover scale
- Card lift on hover

---

## 🌟 Key Features Summary

✅ **Wizard-Style Form**: 3-step guided experience
✅ **Interactive Sliders**: Visual feedback for numeric inputs
✅ **Progress Indicator**: Clear step tracking
✅ **API Integration**: Axios with error handling
✅ **Recharts Visualization**: Professional pie charts
✅ **Responsive Design**: Mobile-first approach
✅ **Reusable Components**: Clean, modular code
✅ **TypeScript**: Full type safety
✅ **Modern UI**: Tailwind CSS with custom styling
✅ **Accessibility**: Keyboard navigation, labels, ARIA

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Application
```
http://localhost:3000
```

### 4. Test the Flow
1. Fill in energy consumption (Step 1)
2. Click "Next"
3. Enter travel distance (Step 2)
4. Click "Next"
5. Select diet preference (Step 3)
6. Click "Analyze My Footprint"
7. View results dashboard

---

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Update API Endpoint
In `CarbonFootprintForm.tsx`:
```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
  payload
)
```

---

## 📈 Performance Optimizations

- **Code Splitting**: Automatic with Next.js App Router
- **Tree Shaking**: Unused code removed
- **Image Optimization**: Next.js Image component (if needed)
- **Font Optimization**: Inter font with display: swap

---

## 🎯 Best Practices Implemented

1. **Component Separation**: Each step is a separate component
2. **Type Safety**: Full TypeScript coverage
3. **Error Boundaries**: Graceful error handling
4. **Accessibility**: Semantic HTML, ARIA labels
5. **Responsive**: Mobile-first design
6. **Performance**: Optimized re-renders
7. **Maintainability**: Clean, documented code

---

## 📝 Next Steps

1. **Backend Integration**: Ensure backend is running on port 3001
2. **Testing**: Test form with different values
3. **Customization**: Adjust colors/styling as needed
4. **Enhancement**: Add more form fields if required
5. **Deployment**: Build and deploy to Vercel

---

## 🆘 Troubleshooting

### Issue: "Cannot connect to backend"
**Solution**: Make sure backend is running on port 3001

### Issue: "Font download errors"
**Solution**: Using fallback font, application still works

### Issue: "Form not submitting"
**Solution**: Check browser console for errors, validate payload

---

**Built with modern best practices for an exceptional user experience! 🌍💚**
