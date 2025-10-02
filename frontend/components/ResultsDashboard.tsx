'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { RefreshCw, Sparkles, TrendingDown, CheckCircle2, Leaf } from 'lucide-react'

interface ApiResponse {
  totalFootprint: number
  breakdown: {
    energy: number
    travel: number
    food: number
  }
  plan: string[]
  simulation: {
    scenario: string
    savings: number
    newFootprint: number
  }
}

interface ResultsDashboardProps {
  results: ApiResponse
  onReset: () => void
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b']

export function ResultsDashboard({ results, onReset }: ResultsDashboardProps) {
  // Prepare data for pie chart
  const chartData = [
    { name: 'Energy', value: results.breakdown.energy },
    { name: 'Travel', value: results.breakdown.travel },
    { name: 'Food', value: results.breakdown.food }
  ]

  // Calculate US average comparison (US average is ~16 tons/year)
  const usAverage = 16
  const percentageOfAverage = ((results.totalFootprint / usAverage) * 100).toFixed(0)
  const isBelowAverage = results.totalFootprint < usAverage

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-4 shadow-lg">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-slate-800 mb-2">Your Carbon Footprint Analysis</h2>
        <p className="text-slate-600">Here's your personalized sustainability report</p>
      </div>

      {/* Main Footprint Card */}
      <Card className="mb-8 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200">
        <div className="mb-4">
          <p className="text-lg text-slate-700 mb-2">Your Annual Carbon Footprint</p>
          <div className="text-6xl font-bold text-emerald-700 mb-2">
            {results.totalFootprint.toFixed(1)}
            <span className="text-3xl ml-2">tons</span>
          </div>
          <p className="text-slate-600">CO₂ equivalent per year</p>
        </div>
        
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
          isBelowAverage ? 'bg-emerald-600' : 'bg-orange-500'
        } text-white font-medium`}>
          {isBelowAverage ? '🎉' : '⚠️'} {percentageOfAverage}% of US average ({usAverage} tons)
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Footprint Breakdown */}
        <Card title="Emissions Breakdown" subtitle="Where your CO₂ comes from">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-slate-800">{results.breakdown.energy}%</p>
              <p className="text-xs text-slate-600">Energy</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-slate-800">{results.breakdown.travel}%</p>
              <p className="text-xs text-slate-600">Travel</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-slate-800">{results.breakdown.food}%</p>
              <p className="text-xs text-slate-600">Food</p>
            </div>
          </div>
        </Card>

        {/* Simulation Results */}
        <Card title="What-If Scenario" subtitle="Potential impact of changes">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-bold text-slate-800">{results.simulation.scenario}</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Current Footprint:</span>
                <span className="text-xl font-bold text-slate-800">{results.totalFootprint.toFixed(1)} tons</span>
              </div>
              
              <div className="flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-emerald-600" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-700">New Footprint:</span>
                <span className="text-xl font-bold text-emerald-600">{results.simulation.newFootprint.toFixed(1)} tons</span>
              </div>
              
              <div className="pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Annual Savings:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    -{results.simulation.savings.toFixed(1)} tons CO₂
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 text-center">
            🌱 That's equivalent to planting <strong>{Math.ceil(results.simulation.savings / 0.06)}</strong> trees!
          </p>
        </Card>
      </div>

      {/* Sustainability Plan */}
      <Card title="Your Personalized Sustainability Plan" subtitle="AI-recommended actions to reduce your impact">
        <div className="space-y-4">
          {results.plan.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-slate-800 leading-relaxed">{item}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Button onClick={onReset} variant="outline" className="sm:w-auto">
          <RefreshCw className="w-5 h-5" />
          Calculate Again
        </Button>
        <Button className="sm:w-auto">
          <Sparkles className="w-5 h-5" />
          Download Report
        </Button>
      </div>

      {/* Footer Message */}
      <div className="mt-8 text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-slate-700 mb-2">
          <strong>Great job on taking the first step!</strong>
        </p>
        <p className="text-sm text-slate-600">
          Small changes can make a big difference. Start with one action from your plan and track your progress over time.
        </p>
      </div>
    </div>
  )
}
