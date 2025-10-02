# EcoAI Backend

Mock backend API for the EcoAI carbon footprint calculator.

## Features

- ✅ Carbon footprint calculation based on energy, travel, and diet
- ✅ AI-generated sustainability recommendations
- ✅ What-if scenario simulations
- ✅ CORS enabled for frontend integration

## API Endpoint

### POST `/analyze`

Calculate carbon footprint and get recommendations.

**Request Body:**
```json
{
  "energy_kwh": 1000,
  "miles_driven": 500,
  "meat_consumption": 5.5
}
```

**Response:**
```json
{
  "totalFootprint": 12.5,
  "breakdown": {
    "energy": 45.2,
    "travel": 32.8,
    "food": 22.0
  },
  "plan": [
    "Switch to LED bulbs throughout your home - save up to 0.3 tons CO₂/year",
    "Reduce meat consumption by 2 servings per week - save 0.7 tons CO₂/year",
    "Carpool or use public transit 2 days per week - save 0.5 tons CO₂/year"
  ],
  "simulation": {
    "scenario": "Switch to electric vehicle",
    "savings": 2.8,
    "newFootprint": 9.7
  }
}
```

## Installation

```bash
npm install
```

## Usage

```bash
# Start the server
npm start

# Development mode (with nodemon)
npm run dev
```

The server will run on `http://localhost:3001`

## Carbon Calculation Formula

- **Energy**: `energy_kwh * 52 weeks * 0.5 kg CO₂ per kWh`
- **Travel**: `miles_driven * 52 weeks * 0.411 kg CO₂ per mile`
- **Food**: `meat_consumption * 52 weeks * 6.61 kg CO₂ per serving`

Total is converted to tons (divide by 1000).

## Health Check

```bash
GET http://localhost:3001/health
```

## Future Enhancements

- Integration with Llama 3.1 for AI-powered recommendations
- Cerebras for ultra-fast simulations
- RAG with FAISS vector database for climate data
- User profiles and history tracking
- More detailed emission factors by region

---

Built for FutureStack GenAI Hackathon 2025 🌍💚
