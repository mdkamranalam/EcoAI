'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  Zap, 
  Car, 
  Snowflake, 
  Home, 
  Utensils, 
  Droplet,
  Wind,
  Lightbulb,
  Calculator,
  Leaf
} from 'lucide-react'
import ResultsDisplay from './ResultsDisplay'

export interface EnergyFormData {
  // Electricity Usage (kWh/month)
  electricity: number
  
  // Transportation (kWh equivalent)
  carMilesDriven: number // miles per week
  carType: 'gas' | 'hybrid' | 'electric'
  
  // Home Appliances (hours per day)
  acUsage: number
  refrigeratorCount: number
  heatingHours: number
  
  // Lighting (hours per day)
  lightingHours: number
  ledBulbs: boolean
  
  // Water heating (kWh/month)
  waterHeating: number
  
  // Other activities
  washingMachineLoads: number // per week
  dishwasherLoads: number // per week
  
  // Diet & Lifestyle
  dietType: 'meat-heavy' | 'balanced' | 'vegetarian' | 'vegan'
  recycling: boolean
}

export interface AnalysisResult {
  totalFootprint: number // tons CO2/year
  breakdown: {
    category: string
    value: number
    percentage: number
  }[]
  recommendations: string[]
  savings: {
    action: string
    co2Saved: number
    moneySaved: number
  }[]
}

export default function EnergyForm() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<EnergyFormData>({
    defaultValues: {
      electricity: 600,
      carMilesDriven: 200,
      carType: 'gas',
      acUsage: 8,
      refrigeratorCount: 1,
      heatingHours: 4,
      lightingHours: 6,
      ledBulbs: false,
      waterHeating: 200,
      washingMachineLoads: 5,
      dishwasherLoads: 4,
      dietType: 'balanced',
      recycling: false
    }
  })

  const onSubmit = async (data: EnergyFormData) => {
    setIsCalculating(true)
    
    // Simulate API call to backend for AI analysis
    // In production, this would call your Node.js backend
    setTimeout(() => {
      const result = calculateFootprint(data)
      setAnalysisResult(result)
      setIsCalculating(false)
    }, 1500)
  }

  const calculateFootprint = (data: EnergyFormData): AnalysisResult => {
    // Carbon conversion factors (kg CO2 per kWh or unit)
    const electricityFactor = 0.5 // kg CO2 per kWh (US average)
    const gasFactor = 8.89 // kg CO2 per gallon
    const milesPerGallon = {
      gas: 25,
      hybrid: 50,
      electric: 0
    }
    
    // Calculate electricity emissions (tons CO2/year)
    const electricityEmissions = (data.electricity * 12 * electricityFactor) / 1000
    
    // Calculate transportation emissions
    const weeklyGallons = data.carMilesDriven / milesPerGallon[data.carType]
    const transportEmissions = data.carType === 'electric' 
      ? (data.carMilesDriven * 0.3 * 52 * electricityFactor) / 1000 // kWh per mile * weeks
      : (weeklyGallons * 52 * gasFactor) / 1000
    
    // Calculate appliance emissions (kWh to tons CO2)
    const acKwh = data.acUsage * 3 * 30 * 12 // 3 kW AC, daily hours, monthly, yearly
    const refrigeratorKwh = data.refrigeratorCount * 150 * 12 // 150 kWh per month per unit
    const heatingKwh = data.heatingHours * 5 * 30 * 12 // 5 kW heating
    const lightingKwh = data.lightingHours * (data.ledBulbs ? 0.01 : 0.06) * 10 * 365 // bulbs count
    const waterHeatingEmissions = (data.waterHeating * 12 * electricityFactor) / 1000
    
    const appliancesEmissions = ((acKwh + refrigeratorKwh + heatingKwh + lightingKwh) * electricityFactor) / 1000
    
    // Calculate other activities
    const washingEmissions = (data.washingMachineLoads * 52 * 0.5 * electricityFactor) / 1000
    const dishwasherEmissions = (data.dishwasherLoads * 52 * 1.5 * electricityFactor) / 1000
    
    // Diet emissions (tons CO2/year)
    const dietEmissions = {
      'meat-heavy': 2.5,
      'balanced': 1.7,
      'vegetarian': 1.0,
      'vegan': 0.6
    }[data.dietType]
    
    // Recycling offset
    const recyclingOffset = data.recycling ? -0.3 : 0
    
    const totalFootprint = 
      electricityEmissions + 
      transportEmissions + 
      appliancesEmissions + 
      waterHeatingEmissions +
      washingEmissions +
      dishwasherEmissions +
      dietEmissions + 
      recyclingOffset

    const breakdown = [
      { category: 'Electricity', value: electricityEmissions, percentage: 0 },
      { category: 'Transportation', value: transportEmissions, percentage: 0 },
      { category: 'Home Appliances', value: appliancesEmissions, percentage: 0 },
      { category: 'Water Heating', value: waterHeatingEmissions, percentage: 0 },
      { category: 'Laundry & Dishes', value: washingEmissions + dishwasherEmissions, percentage: 0 },
      { category: 'Diet', value: dietEmissions, percentage: 0 }
    ]

    // Calculate percentages
    breakdown.forEach(item => {
      item.percentage = (item.value / totalFootprint) * 100
    })

    const recommendations = generateRecommendations(data, breakdown)
    const savings = calculateSavings(data)

    return {
      totalFootprint: Math.round(totalFootprint * 100) / 100,
      breakdown: breakdown.filter(item => item.value > 0),
      recommendations,
      savings
    }
  }

  const generateRecommendations = (data: EnergyFormData, breakdown: any[]): string[] => {
    const recommendations: string[] = []
    
    if (!data.ledBulbs) {
      recommendations.push('Switch to LED bulbs to reduce lighting energy by 75%')
    }
    
    if (data.carType === 'gas') {
      recommendations.push('Consider switching to a hybrid or electric vehicle to reduce transportation emissions by up to 60%')
    }
    
    if (data.electricity > 500) {
      recommendations.push('Install solar panels to offset electricity usage and save on energy bills')
    }
    
    if (data.acUsage > 6) {
      recommendations.push('Optimize AC usage by using a programmable thermostat and setting it 2-3°F higher')
    }
    
    if (data.dietType === 'meat-heavy') {
      recommendations.push('Reduce meat consumption to 3-4 times per week to lower your food-related carbon footprint')
    }
    
    if (!data.recycling) {
      recommendations.push('Start recycling to reduce waste emissions by approximately 0.3 tons CO2/year')
    }
    
    if (data.waterHeating > 150) {
      recommendations.push('Lower water heater temperature to 120°F and install low-flow showerheads')
    }

    return recommendations
  }

  const calculateSavings = (data: EnergyFormData) => {
    const savings = []
    
    if (!data.ledBulbs) {
      savings.push({
        action: 'Switch to LED bulbs',
        co2Saved: 0.2,
        moneySaved: 75
      })
    }
    
    if (data.carType === 'gas') {
      savings.push({
        action: 'Switch to electric vehicle',
        co2Saved: 2.5,
        moneySaved: 800
      })
    }
    
    if (data.electricity > 500) {
      savings.push({
        action: 'Install solar panels (5kW)',
        co2Saved: 3.0,
        moneySaved: 1200
      })
    }
    
    if (!data.recycling) {
      savings.push({
        action: 'Start recycling program',
        co2Saved: 0.3,
        moneySaved: 50
      })
    }

    return savings
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-5xl font-bold text-gray-900">EcoAI</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your carbon footprint and get AI-powered recommendations to reduce your environmental impact
          </p>
        </div>

        {!analysisResult ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Calculator className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Energy Consumption Calculator</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Electricity Section */}
              <div className="border-b pb-6">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Electricity Usage</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Electricity (kWh)
                    </label>
                    <input
                      type="number"
                      {...register('electricity', { required: true, min: 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Water Heating (kWh/month)
                    </label>
                    <input
                      type="number"
                      {...register('waterHeating', { required: true, min: 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="200"
                    />
                  </div>
                </div>
              </div>

              {/* Transportation Section */}
              <div className="border-b pb-6">
                <div className="flex items-center mb-4">
                  <Car className="w-6 h-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Transportation</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Miles Driven per Week
                    </label>
                    <input
                      type="number"
                      {...register('carMilesDriven', { required: true, min: 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      {...register('carType', { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="gas">Gasoline</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Home Appliances Section */}
              <div className="border-b pb-6">
                <div className="flex items-center mb-4">
                  <Home className="w-6 h-6 text-purple-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Home Appliances</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Snowflake className="w-4 h-4 inline mr-1" />
                      AC Usage (hours/day)
                    </label>
                    <input
                      type="number"
                      {...register('acUsage', { required: true, min: 0, max: 24 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Refrigerators
                    </label>
                    <input
                      type="number"
                      {...register('refrigeratorCount', { required: true, min: 0, max: 10 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Wind className="w-4 h-4 inline mr-1" />
                      Heating (hours/day)
                    </label>
                    <input
                      type="number"
                      {...register('heatingHours', { required: true, min: 0, max: 24 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="4"
                    />
                  </div>
                </div>
              </div>

              {/* Lighting Section */}
              <div className="border-b pb-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Lighting</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lighting Hours per Day
                    </label>
                    <input
                      type="number"
                      {...register('lightingHours', { required: true, min: 0, max: 24 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="6"
                    />
                  </div>
                  <div className="flex items-center pt-7">
                    <input
                      type="checkbox"
                      {...register('ledBulbs')}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Using LED bulbs
                    </label>
                  </div>
                </div>
              </div>

              {/* Water Usage Section */}
              <div className="border-b pb-6">
                <div className="flex items-center mb-4">
                  <Droplet className="w-6 h-6 text-cyan-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Water & Laundry</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Washing Machine (loads/week)
                    </label>
                    <input
                      type="number"
                      {...register('washingMachineLoads', { required: true, min: 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dishwasher (loads/week)
                    </label>
                    <input
                      type="number"
                      {...register('dishwasherLoads', { required: true, min: 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="4"
                    />
                  </div>
                </div>
              </div>

              {/* Lifestyle Section */}
              <div className="pb-6">
                <div className="flex items-center mb-4">
                  <Utensils className="w-6 h-6 text-red-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Diet & Lifestyle</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diet Type
                    </label>
                    <select
                      {...register('dietType', { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="meat-heavy">Meat Heavy</option>
                      <option value="balanced">Balanced</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-7">
                    <input
                      type="checkbox"
                      {...register('recycling')}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Regular recycling
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isCalculating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2" />
                      Calculate My Carbon Footprint
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <ResultsDisplay 
            result={analysisResult} 
            onReset={() => setAnalysisResult(null)} 
          />
        )}
      </div>
    </div>
  )
}
