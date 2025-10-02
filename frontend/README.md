# EcoAI Frontend

This is the frontend application for EcoAI - a GenAI-powered climate action advisor built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Energy Consumption Calculator**: Input your energy usage across multiple categories (electricity, transportation, appliances, etc.)
- 📊 **Interactive Visualizations**: Beautiful charts showing carbon footprint breakdown using Recharts
- 🤖 **AI-Powered Recommendations**: Get personalized suggestions to reduce your carbon footprint
- 💰 **Savings Calculator**: See potential cost savings alongside environmental benefits
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ♻️ **Real-time Analysis**: Instant feedback on your energy consumption patterns

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
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── EnergyForm.tsx      # Main calculator form
│   └── ResultsDisplay.tsx  # Results visualization
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Form Categories

The energy calculator tracks consumption across these categories:

### 1. Electricity Usage
- Monthly electricity consumption (kWh)
- Water heating usage (kWh/month)

### 2. Transportation
- Weekly miles driven
- Vehicle type (gasoline, hybrid, electric)

### 3. Home Appliances
- Air conditioning usage (hours/day)
- Number of refrigerators
- Heating usage (hours/day)

### 4. Lighting
- Daily lighting hours
- LED bulb usage

### 5. Water & Laundry
- Washing machine loads per week
- Dishwasher loads per week

### 6. Diet & Lifestyle
- Diet type (meat-heavy, balanced, vegetarian, vegan)
- Recycling habits

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

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Carbon Factors

Modify conversion factors in `EnergyForm.tsx` under the `calculateFootprint` function to match your region's emission factors.

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
