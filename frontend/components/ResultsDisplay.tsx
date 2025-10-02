'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { TrendingDown, Award, RefreshCw, Leaf, DollarSign, TreeDeciduous } from 'lucide-react'
import { AnalysisResult } from './EnergyForm'

interface ResultsDisplayProps {
  result: AnalysisResult
  onReset: () => void
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4']

export default function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const averageFootprint = 16 // US average tons CO2/year
  const percentageOfAverage = ((result.totalFootprint / averageFootprint) * 100).toFixed(0)
  const treesNeeded = Math.ceil(result.totalFootprint / 0.06) // 1 tree absorbs ~60kg CO2/year

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header with Reset Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-gray-900">Your Carbon Footprint Analysis</h2>
        <button
          onClick={onReset}
          className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Calculate Again
        </button>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Footprint Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center mb-4">
            <Leaf className="w-10 h-10 mr-3" />
            <h3 className="text-xl font-semibold">Total Footprint</h3>
          </div>
          <p className="text-5xl font-bold mb-2">{result.totalFootprint}</p>
          <p className="text-lg">tons CO₂/year</p>
          <div className="mt-4 pt-4 border-t border-green-400">
            <p className="text-sm">
              {result.totalFootprint < averageFootprint ? '🎉 Below' : '⚠️ Above'} US average ({averageFootprint} tons)
            </p>
            <p className="text-2xl font-bold mt-1">{percentageOfAverage}%</p>
          </div>
        </div>

        {/* Trees Needed Card */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center mb-4">
            <TreeDeciduous className="w-10 h-10 mr-3" />
            <h3 className="text-xl font-semibold">Trees to Offset</h3>
          </div>
          <p className="text-5xl font-bold mb-2">{treesNeeded}</p>
          <p className="text-lg">trees needed</p>
          <div className="mt-4 pt-4 border-t border-blue-400">
            <p className="text-sm">
              Plant {treesNeeded} trees to neutralize your annual carbon emissions
            </p>
          </div>
        </div>

        {/* Potential Savings Card */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center mb-4">
            <DollarSign className="w-10 h-10 mr-3" />
            <h3 className="text-xl font-semibold">Potential Savings</h3>
          </div>
          <p className="text-5xl font-bold mb-2">
            ${result.savings.reduce((sum, s) => sum + s.moneySaved, 0)}
          </p>
          <p className="text-lg">per year</p>
          <div className="mt-4 pt-4 border-t border-purple-400">
            <p className="text-sm">
              By implementing all recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Emissions Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={result.breakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {result.breakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${value.toFixed(2)} tons CO₂`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {result.breakdown.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-700">{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Potential Savings */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Potential CO₂ Reduction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={result.savings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="action" angle={-15} textAnchor="end" height={100} fontSize={11} />
              <YAxis label={{ value: 'tons CO₂/year', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: any) => `${value.toFixed(2)} tons CO₂`} />
              <Legend />
              <Bar dataKey="co2Saved" fill="#10b981" name="CO₂ Saved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <Award className="w-8 h-8 text-green-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h3>
        </div>
        <div className="space-y-4">
          {result.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <p className="ml-4 text-gray-800 text-lg">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Savings Table */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <TrendingDown className="w-8 h-8 text-blue-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Action Plan with Savings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Action</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">CO₂ Saved (tons/year)</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Money Saved ($/year)</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Impact</th>
              </tr>
            </thead>
            <tbody>
              {result.savings.map((saving, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-gray-800">{saving.action}</td>
                  <td className="py-4 px-4 text-center font-semibold text-green-600">
                    {saving.co2Saved.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-blue-600">
                    ${saving.moneySaved}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {saving.co2Saved > 2 ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        High
                      </span>
                    ) : saving.co2Saved > 0.5 ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Medium
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Low
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="py-4 px-4 text-gray-900">Total Potential</td>
                <td className="py-4 px-4 text-center text-green-700">
                  {result.savings.reduce((sum, s) => sum + s.co2Saved, 0).toFixed(2)}
                </td>
                <td className="py-4 px-4 text-center text-blue-700">
                  ${result.savings.reduce((sum, s) => sum + s.moneySaved, 0)}
                </td>
                <td className="py-4 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
        <p className="text-xl mb-6 max-w-3xl mx-auto">
          Start implementing these recommendations today and reduce your carbon footprint by up to{' '}
          <span className="font-bold text-yellow-300">
            {result.savings.reduce((sum, s) => sum + s.co2Saved, 0).toFixed(1)} tons CO₂
          </span>{' '}
          per year!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Download Report
          </button>
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
            Share Results
          </button>
        </div>
      </div>
    </div>
  )
}
