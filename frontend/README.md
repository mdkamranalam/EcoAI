# EcoAI Frontend

This is the frontend application for EcoAI - a GenAI-powered climate action advisor built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ UI/UX Design

**Theme**: Sleek & Tech-Forward Dark Mode
- **Primary Background**: `slate-900` (RGB: 15, 23, 42)
- **Accent Color**: `lime-400` (RGB: 163, 230, 53)
- **Text Colors**: `white`, `slate-200`, `slate-400`
- **Card Backgrounds**: `slate-800` with `slate-700` borders
- **Special Effects**: Glow effects on lime-400 elements using custom utility classes

## Features

- 🌍 **3-Step Wizard Form**: Intuitive multi-step carbon footprint calculator
  - Step 1: Energy consumption (electricity in kWh)
  - Step 2: Travel footprint (miles driven per week)
  - Step 3: Dietary choices (meat consumption frequency)
- 📊 **Interactive Visualizations**: Beautiful dark-themed charts showing carbon footprint breakdown using Recharts
- 🤖 **AI-Powered Recommendations**: Get personalized sustainability plans
- 🎨 **Modern Dark UI**: Sleek tech-forward design with lime-400 accents and glow effects
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ♻️ **Real-time Analysis**: Instant feedback on your carbon footprint

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation and management
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Home page with hero section
│   └── globals.css         # Global styles + custom glow utilities
├── components/
│   ├── CarbonFootprintForm.tsx  # Main wizard container with progress indicator
│   ├── ResultsDashboard.tsx     # Results visualization with charts
│   ├── form-steps/
│   │   ├── EnergyStep.tsx       # Step 1: Energy consumption input
│   │   ├── TravelStep.tsx       # Step 2: Travel/driving distance
│   │   └── DietStep.tsx         # Step 3: Diet selection with cards
│   └── ui/
│       ├── Button.tsx           # Reusable button component
│       ├── Input.tsx            # Input with validation
│       ├── Slider.tsx           # Range slider component
│       └── Card.tsx             # Container component
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Calculator Form

The 3-step wizard tracks:

### Step 1: Energy Consumption
- Weekly electricity usage (kWh)
- Slider + manual input for precision

### Step 2: Travel Footprint
- Weekly miles driven
- Average US driver: 200-300 miles/week

### Step 3: Dietary Choices
- Meat consumption frequency (servings/week)
- Options: Never (0), Rarely (1-3), Moderate (4-7), Daily (7+)
- Visual card selection interface

## Carbon Calculation

The calculator uses industry-standard conversion factors:

- **Electricity**: 0.5 kg CO₂ per kWh (US average)
- **Gasoline**: 8.89 kg CO₂ per gallon
- **Vehicle efficiency**: 25 MPG (gas), 50 MPG (hybrid)
- **Electric vehicles**: 0.3 kWh per mile
- **Appliances**: Based on typical power consumption ratings
- **Diet**: Varies from 0.6 tons (vegan) to 2.5 tons (meat-heavy) per year

## API Integration

The form is designed to integrate with the EcoAI backend API. To connect to your backend:

1. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

2. Update the API call in `EnergyForm.tsx`:
```typescript
const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, data)
```

## Customization

### Dark Theme Colors

The app uses a custom dark theme defined in `globals.css` and Tailwind:

```css
/* globals.css */
:root {
  --background: 15 23 42;      /* slate-900 */
  --foreground: 226 232 240;   /* slate-200 */
}

/* Custom glow effects */
.glow-lime {
  box-shadow: 0 0 20px rgba(163, 230, 53, 0.3);
}
.glow-lime-hover:hover {
  box-shadow: 0 0 25px rgba(163, 230, 53, 0.5);
}
```

Edit these values in `globals.css` to customize the theme.

### Carbon Factors

The backend API handles carbon calculations. Frontend focuses on data collection and visualization.

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Docker

```bash
docker build -t ecoai-frontend .
docker run -p 3000:3000 ecoai-frontend
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is part of the FutureStack GenAI Hackathon (Sept 29 - Oct 5, 2025).

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ for a sustainable future 🌍
