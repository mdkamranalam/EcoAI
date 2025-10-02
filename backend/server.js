const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock carbon footprint calculation
function calculateFootprint(energy_kwh, miles_driven, meat_consumption) {
  // Simple calculations (kg CO2 per year)
  const energyFootprint = energy_kwh * 52 * 0.5; // 0.5 kg CO2 per kWh
  const travelFootprint = miles_driven * 52 * 0.411; // 0.411 kg CO2 per mile
  const meatFootprint = meat_consumption * 52 * 6.61; // 6.61 kg CO2 per serving
  
  const total = (energyFootprint + travelFootprint + meatFootprint) / 1000; // Convert to tons
  
  return {
    total: total,
    energy: energyFootprint / 1000,
    travel: travelFootprint / 1000,
    food: meatFootprint / 1000
  };
}

// Mock AI-generated plan
function generatePlan(footprint) {
  const plans = [
    "Switch to LED bulbs throughout your home - save up to 0.3 tons CO₂/year",
    "Reduce meat consumption by 2 servings per week - save 0.7 tons CO₂/year",
    "Carpool or use public transit 2 days per week - save 0.5 tons CO₂/year",
    "Install a programmable thermostat - save 0.4 tons CO₂/year",
    "Switch to renewable energy provider - reduce emissions by 50%"
  ];
  
  return plans.slice(0, Math.min(5, Math.ceil(footprint.total / 2)));
}

// Mock simulation
function generateSimulation(footprint) {
  const scenarios = [
    {
      scenario: "Switch to electric vehicle",
      savings: footprint.travel * 0.7,
      newFootprint: footprint.total - (footprint.travel * 0.7)
    },
    {
      scenario: "Reduce energy consumption by 20%",
      savings: footprint.energy * 0.2,
      newFootprint: footprint.total - (footprint.energy * 0.2)
    },
    {
      scenario: "Adopt plant-based diet 3 days/week",
      savings: footprint.food * 0.4,
      newFootprint: footprint.total - (footprint.food * 0.4)
    }
  ];
  
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

// API endpoint
app.post('/analyze', (req, res) => {
  try {
    const { energy_kwh, miles_driven, meat_consumption } = req.body;
    
    // Validation
    if (!energy_kwh || !miles_driven || meat_consumption === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: energy_kwh, miles_driven, meat_consumption' 
      });
    }
    
    // Calculate footprint
    const footprint = calculateFootprint(energy_kwh, miles_driven, meat_consumption);
    
    // Calculate percentages for breakdown
    const energyPercent = (footprint.energy / footprint.total) * 100;
    const travelPercent = (footprint.travel / footprint.total) * 100;
    const foodPercent = (footprint.food / footprint.total) * 100;
    
    // Generate response
    const response = {
      totalFootprint: parseFloat(footprint.total.toFixed(2)),
      breakdown: {
        energy: parseFloat(energyPercent.toFixed(1)),
        travel: parseFloat(travelPercent.toFixed(1)),
        food: parseFloat(foodPercent.toFixed(1))
      },
      plan: generatePlan(footprint),
      simulation: generateSimulation(footprint)
    };
    
    console.log('Request:', req.body);
    console.log('Response:', response);
    
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'EcoAI backend is running' });
});

app.listen(PORT, () => {
  console.log(`🌍 EcoAI backend running on http://localhost:${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/analyze`);
});
