# EcoAI Frontend - Visual Guide

## 🎨 Application Overview

### Homepage - Energy Calculator Form

```
┌─────────────────────────────────────────────────────────────┐
│                          🍃 EcoAI                            │
│         Calculate your carbon footprint and get              │
│    AI-powered recommendations to reduce environmental impact │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🧮 Energy Consumption Calculator                            │
│                                                              │
│  ⚡ Electricity Usage                                        │
│  ├─ Monthly Electricity (kWh)    [600        ]              │
│  └─ Water Heating (kWh/month)    [200        ]              │
│                                                              │
│  🚗 Transportation                                           │
│  ├─ Miles Driven per Week        [200        ]              │
│  └─ Vehicle Type                 [Gasoline  ▼]              │
│                                                              │
│  🏠 Home Appliances                                          │
│  ├─ AC Usage (hours/day)         [8          ]              │
│  ├─ Number of Refrigerators      [1          ]              │
│  └─ Heating (hours/day)          [4          ]              │
│                                                              │
│  💡 Lighting                                                 │
│  ├─ Lighting Hours per Day       [6          ]              │
│  └─ ☐ Using LED bulbs                                       │
│                                                              │
│  💧 Water & Laundry                                          │
│  ├─ Washing Machine (loads/wk)   [5          ]              │
│  └─ Dishwasher (loads/week)      [4          ]              │
│                                                              │
│  🍽️ Diet & Lifestyle                                         │
│  ├─ Diet Type                    [Balanced  ▼]              │
│  └─ ☐ Regular recycling                                     │
│                                                              │
│            [🧮 Calculate My Carbon Footprint]                │
└─────────────────────────────────────────────────────────────┘
```

### Results Page - Analysis Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  Your Carbon Footprint Analysis          [🔄 Calculate Again]│
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ 🍃 Total         │  │ 🌳 Trees         │  │ 💰 Potential     │
│   Footprint      │  │   to Offset      │  │    Savings       │
│                  │  │                  │  │                  │
│    8.5           │  │    142           │  │   $2,125         │
│  tons CO₂/year   │  │  trees needed    │  │   per year       │
│                  │  │                  │  │                  │
│ Below US average │  │ Plant 142 trees  │  │ By implementing  │
│      53%         │  │ to neutralize    │  │ all suggestions  │
└──────────────────┘  └──────────────────┘  └──────────────────┘

┌──────────────────────────────┐  ┌──────────────────────────┐
│ Emissions Breakdown          │  │ Potential CO₂ Reduction  │
│                              │  │                          │
│      [PIE CHART]             │  │      [BAR CHART]         │
│                              │  │                          │
│  🟢 Electricity: 35%         │  │  Switch to LEDs    0.2   │
│  🔵 Transportation: 28%      │  │  Electric Vehicle  2.5   │
│  🟣 Home Appliances: 20%     │  │  Solar Panels      3.0   │
│  🟡 Water Heating: 10%       │  │  Start Recycling   0.3   │
│  🔴 Laundry: 4%              │  │                          │
│  🔷 Diet: 3%                 │  │                          │
└──────────────────────────────┘  └──────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🏆 AI-Powered Recommendations                                │
│                                                              │
│  1️⃣  Switch to LED bulbs to reduce lighting energy by 75%   │
│                                                              │
│  2️⃣  Consider switching to a hybrid or electric vehicle to  │
│      reduce transportation emissions by up to 60%           │
│                                                              │
│  3️⃣  Install solar panels to offset electricity usage and   │
│      save on energy bills                                   │
│                                                              │
│  4️⃣  Optimize AC usage by using a programmable thermostat   │
│      and setting it 2-3°F higher                            │
│                                                              │
│  5️⃣  Start recycling to reduce waste emissions by           │
│      approximately 0.3 tons CO₂/year                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📉 Action Plan with Savings                                  │
│                                                              │
│ Action                    CO₂ Saved    $ Saved    Impact    │
│ ─────────────────────────────────────────────────────────── │
│ Switch to LED bulbs         0.20       $75       [Low]      │
│ Switch to electric car      2.50       $800      [High]     │
│ Install solar panels        3.00       $1200     [High]     │
│ Start recycling             0.30       $50       [Low]      │
│ ─────────────────────────────────────────────────────────── │
│ Total Potential             6.00       $2125                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           Ready to Make a Difference?                        │
│                                                              │
│  Start implementing these recommendations today and          │
│  reduce your carbon footprint by up to 6.0 tons CO₂!        │
│                                                              │
│      [Download Report]    [Share Results]                    │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Color Palette

### Primary Colors
- **Green** (#22c55e): Main theme, sustainability
- **Emerald** (#10b981): Accent, eco-friendly
- **Blue** (#3b82f6): Trust, clarity
- **Purple** (#8b5cf6): Innovation
- **Yellow** (#f59e0b): Energy, attention

### Gradients
- **Header**: Green 50 → Blue 50 → Emerald 50
- **Total Footprint Card**: Green 500 → Emerald 600
- **Trees Card**: Blue 500 → Cyan 600
- **Savings Card**: Purple 500 → Pink 600
- **CTA Section**: Green 600 → Emerald 600

### Text
- **Primary**: Gray 900
- **Secondary**: Gray 700
- **Muted**: Gray 600

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Stacked cards
- Full-width inputs
- Simplified charts

### Tablet (768px - 1024px)
- 2-column grids
- Side-by-side cards
- Optimized charts
- Touch-friendly

### Desktop (> 1024px)
- 3-column grids
- Maximum width: 1280px
- Enhanced visualizations
- Hover effects

## 🎯 Interactive Elements

### Form Inputs
- Border: Gray 300
- Focus: Green 500 ring
- Hover: Subtle shadow
- Error: Red 500 border

### Buttons
- Primary: Green 600 → Emerald 600 gradient
- Hover: Darker shades
- Loading: Spinning animation
- Disabled: 50% opacity

### Cards
- Background: White
- Shadow: XL elevation
- Rounded: 2xl (16px)
- Hover: Lift effect

### Charts
- Recharts library
- Smooth animations
- Tooltips on hover
- Responsive sizing

## 🔍 Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: System sans-serif

### Sizes
- **Hero**: 5xl (48px)
- **H1**: 4xl (36px)
- **H2**: 3xl (30px)
- **H3**: 2xl (24px)
- **Body**: Base (16px)
- **Small**: SM (14px)

### Weights
- **Bold**: 700
- **Semibold**: 600
- **Medium**: 500
- **Regular**: 400

## 🎬 Animations

### Loading States
- Spinner animation during calculation
- Smooth fade-in for results
- Progress indicators

### Transitions
- Button hover: 300ms
- Card hover: 200ms
- Chart animations: 800ms
- Page transitions: Smooth

### Micro-interactions
- Input focus glow
- Button press effect
- Checkbox check animation
- Chart data reveal

## 📐 Layout System

### Container
- Max width: 1280px (7xl)
- Padding: 4 (16px) on mobile
- Padding: 8 (32px) on desktop
- Centered with margin auto

### Spacing
- Section gap: 8 (32px)
- Card padding: 8 (32px)
- Form gap: 4-6 (16-24px)
- Grid gap: 6 (24px)

### Grids
- Form inputs: 1-2 columns
- Stats cards: 1-3 columns
- Charts: 1-2 columns
- Responsive auto-layout

## 🎪 Component Hierarchy

```
App (page.tsx)
└── EnergyForm (main container)
    ├── Header (title + description)
    ├── Form Section
    │   ├── Electricity Inputs
    │   ├── Transportation Inputs
    │   ├── Appliances Inputs
    │   ├── Lighting Inputs
    │   ├── Water & Laundry Inputs
    │   ├── Diet & Lifestyle Inputs
    │   └── Submit Button
    └── ResultsDisplay (conditional)
        ├── Header + Reset Button
        ├── Stats Cards
        │   ├── Total Footprint Card
        │   ├── Trees Needed Card
        │   └── Potential Savings Card
        ├── Charts Section
        │   ├── Pie Chart (breakdown)
        │   └── Bar Chart (savings)
        ├── Recommendations List
        ├── Action Plan Table
        └── Call to Action Section
```

## 🎨 Icon System

### Lucide React Icons Used
- 🍃 Leaf: Logo, eco theme
- ⚡ Zap: Electricity
- 🚗 Car: Transportation
- ❄️ Snowflake: AC
- 🏠 Home: Appliances
- 💡 Lightbulb: Lighting
- 💧 Droplet: Water
- 🍽️ Utensils: Diet
- 🧮 Calculator: Calculate button
- 🔄 RefreshCw: Reset
- 🏆 Award: Recommendations
- 📉 TrendingDown: Savings
- 💰 DollarSign: Money
- 🌳 TreeDeciduous: Trees

## 📊 Chart Types

### Pie Chart (Recharts)
- **Data**: Emissions breakdown by category
- **Colors**: 6 distinct colors
- **Labels**: Category name + percentage
- **Tooltip**: Shows exact CO₂ values
- **Legend**: Color-coded list below

### Bar Chart (Recharts)
- **Data**: Potential CO₂ reduction actions
- **Color**: Green (#10b981)
- **Axis**: X (actions), Y (tons CO₂)
- **Tooltip**: Shows exact savings
- **Grid**: Light gridlines

## 🎯 User Flow

1. **Land on homepage** → See form
2. **Fill in energy data** → All categories
3. **Submit form** → Loading animation
4. **View results** → Stats + charts
5. **Read recommendations** → Prioritized list
6. **Explore action plan** → Detailed table
7. **Reset or adjust** → Calculate again

## 💫 Special Features

### Smart Defaults
- Pre-filled with average values
- Easy to modify
- Represents typical household

### Real-time Validation
- Required fields marked
- Min/max constraints
- Type checking
- Error messages

### Contextual Recommendations
- Based on actual input data
- Prioritized by impact
- Specific to user situation
- Actionable steps

### Multiple Metrics
- CO₂ emissions (tons)
- Cost savings (dollars)
- Trees needed (count)
- Percentage comparisons

---

This visual guide helps you understand the structure, design, and user experience of the EcoAI frontend application! 🎨✨
