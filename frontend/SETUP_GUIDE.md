# EcoAI Frontend - Quick Setup Guide

## 🚀 Getting Started

Follow these steps to set up and run the EcoAI frontend application.

### Step 1: Install Dependencies

Open PowerShell in the frontend directory and run:

```powershell
cd "c:\Users\Utpal Kalita\EcoAI\frontend"
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Recharts (for visualizations)
- Lucide React (for icons)
- Axios (for API calls)

### Step 2: Run Development Server

Start the development server:

```powershell
npm run dev
```

The application will be available at: http://localhost:3000

### Step 3: Test the Application

1. Open your browser and navigate to http://localhost:3000
2. Fill in the energy consumption form with your data
3. Click "Calculate My Carbon Footprint"
4. View your personalized analysis and recommendations

## 📋 Form Fields Explained

### Electricity Usage
- **Monthly Electricity (kWh)**: Your total household electricity consumption
  - Average US household: 600-900 kWh/month
  - Check your utility bill for exact numbers

- **Water Heating (kWh/month)**: Energy used for hot water
  - Typical range: 150-250 kWh/month
  - Electric water heaters use more energy

### Transportation
- **Miles Driven per Week**: Total distance driven in your vehicle
  - US average: 200-300 miles/week
  
- **Vehicle Type**: 
  - Gasoline: Traditional combustion engine
  - Hybrid: Combines gas and electric
  - Electric: Battery-powered

### Home Appliances
- **AC Usage (hours/day)**: Air conditioning runtime
  - Summer: 8-12 hours/day
  - Winter: 0-2 hours/day

- **Number of Refrigerators**: Count all fridges/freezers
  - Most homes: 1-2 units

- **Heating (hours/day)**: Heating system runtime
  - Winter: 4-8 hours/day
  - Summer: 0 hours/day

### Lighting
- **Lighting Hours per Day**: Average daily usage
  - Typical: 5-8 hours/day

- **Using LED Bulbs**: Check if you use energy-efficient LEDs
  - LEDs use 75% less energy than incandescent

### Water & Laundry
- **Washing Machine (loads/week)**: Laundry frequency
  - Average family: 4-7 loads/week

- **Dishwasher (loads/week)**: Dish cleaning frequency
  - Average family: 3-5 loads/week

### Diet & Lifestyle
- **Diet Type**:
  - Meat-heavy: Red meat 5+ times/week
  - Balanced: Meat 2-4 times/week
  - Vegetarian: No meat, includes dairy/eggs
  - Vegan: Plant-based only

- **Regular Recycling**: Check if you recycle consistently

## 🎨 Features

### 1. Interactive Form
- Real-time validation
- User-friendly input fields
- Helpful tooltips and icons
- Responsive design for all devices

### 2. Carbon Footprint Analysis
- Total CO₂ emissions (tons/year)
- Comparison to US average (16 tons)
- Category-by-category breakdown
- Beautiful pie chart visualization

### 3. AI-Powered Recommendations
- Personalized suggestions based on your data
- Prioritized by impact
- Easy-to-understand action items
- Links to helpful resources

### 4. Savings Calculator
- CO₂ reduction potential
- Annual cost savings
- Impact level indicators
- Detailed action plan table

### 5. Visual Analytics
- Pie chart: Emissions breakdown
- Bar chart: Potential CO₂ reduction
- Cards: Key metrics and statistics
- Color-coded impact levels

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Customize Carbon Factors

Edit `components/EnergyForm.tsx` to adjust emission factors for your region:

```typescript
const electricityFactor = 0.5 // kg CO2 per kWh (US average)
const gasFactor = 8.89 // kg CO2 per gallon
```

### Customize Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      },
    },
  },
}
```

## 📊 Understanding Results

### Total Footprint
- **Below 16 tons**: Better than US average! 🎉
- **16-20 tons**: Around average
- **Above 20 tons**: Room for improvement

### Carbon Offset
- Trees shown = number needed to neutralize emissions
- 1 tree absorbs ~60kg CO₂/year (0.06 tons)
- Consider planting or supporting reforestation

### Potential Savings
- Shows maximum achievable reduction
- Implement high-impact actions first
- Track progress over time

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 3000
npx kill-port 3000
# Then restart
npm run dev
```

### Dependencies Issues
```powershell
# Clear node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
```

### Build Errors
```powershell
# Clear Next.js cache
rm -r .next
npm run build
```

## 🚢 Deployment

### Option 1: Vercel (Recommended)
```powershell
npm install -g vercel
vercel --prod
```

### Option 2: Docker
```powershell
docker build -t ecoai-frontend .
docker run -p 3000:3000 ecoai-frontend
```

### Option 3: Build & Host Manually
```powershell
npm run build
npm start
```

## 📱 Mobile Testing

The app is fully responsive. Test on different devices:
- Desktop: Chrome, Firefox, Edge
- Tablet: iPad, Android tablets
- Mobile: iOS Safari, Chrome Android

## 🔗 API Integration

To connect with the backend API:

1. Ensure backend is running on port 3001
2. Set `NEXT_PUBLIC_API_URL` in `.env.local`
3. Uncomment API call in `EnergyForm.tsx`:

```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
  data
)
setAnalysisResult(response.data)
```

## 📈 Next Steps

1. **Test the calculator** with different scenarios
2. **Share with friends** to get feedback
3. **Customize** colors and branding
4. **Connect** to the AI backend for enhanced analysis
5. **Deploy** to production when ready

## 💡 Tips for Best Results

- Use actual data from utility bills
- Be honest about consumption patterns
- Check results monthly to track progress
- Implement one recommendation at a time
- Share results to inspire others

## 📞 Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Open an issue on GitHub

---

Happy calculating! 🌍💚
