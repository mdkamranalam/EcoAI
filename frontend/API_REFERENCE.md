# API Integration Reference

## Backend Requirements

The frontend expects a backend API endpoint at:
```
POST http://localhost:3001/analyze
```

### Request Format

```typescript
interface RequestPayload {
  energy_kwh: number        // Monthly electricity in kWh
  miles_driven: number      // Weekly distance in miles
  meat_consumption: number  // Servings per week
}
```

### Example Request

```json
{
  "energy_kwh": 1000,
  "miles_driven": 500,
  "meat_consumption": 5.5
}
```

### Response Format

```typescript
interface ApiResponse {
  totalFootprint: number    // Total CO2 in tons/year
  breakdown: {
    energy: number         // Percentage (0-100)
    travel: number         // Percentage (0-100)
    food: number           // Percentage (0-100)
  }
  plan: string[]           // Array of recommendation strings
  simulation: {
    scenario: string       // Description of what-if scenario
    savings: number        // CO2 saved in tons/year
    newFootprint: number   // New total after scenario
  }
}
```

### Example Response

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
    "Switch to LED bulbs to save 0.5 tons CO2/year.",
    "Consider carpooling 2 days/week to save 0.6 tons CO2/year."
  ],
  "simulation": {
    "scenario": "Switch to an EV",
    "savings": 1.5,
    "newFootprint": 1.7
  }
}
```

### Error Response

```json
{
  "error": "Invalid input data",
  "message": "energy_kwh must be a positive number"
}
```

## Frontend API Call

Located in: `components/CarbonFootprintForm.tsx`

```typescript
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true)
  setApiError(null)

  try {
    const payload = {
      energy_kwh: energyValue,
      miles_driven: milesValue,
      meat_consumption: meatValue
    }

    const response = await axios.post<ApiResponse>(
      'http://localhost:3001/analyze',
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    setResults(response.data)
  } catch (error: any) {
    setApiError(
      error.response?.data?.error || 
      error.message || 
      'Failed to analyze your carbon footprint'
    )
  } finally {
    setIsSubmitting(false)
  }
}
```

## Testing Without Backend

To test the frontend without a backend, you can temporarily mock the response:

```typescript
// Replace the API call with:
setTimeout(() => {
  const mockResponse: ApiResponse = {
    totalFootprint: 3.2,
    breakdown: {
      energy: 40,
      travel: 35,
      food: 25
    },
    plan: [
      "Reduce meat to 3x/week to save 0.8 tons CO2/year.",
      "Switch to LED bulbs to save 0.5 tons CO2/year."
    ],
    simulation: {
      scenario: "Switch to an EV",
      savings: 1.5,
      newFootprint: 1.7
    }
  }
  setResults(mockResponse)
  setIsSubmitting(false)
}, 1500)
```

## CORS Configuration

Your backend must allow requests from `http://localhost:3000`.

Example Express configuration:

```javascript
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST'],
  credentials: true
}))
```

## Environment Variables

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Then update the API call:

```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
  payload
)
```
