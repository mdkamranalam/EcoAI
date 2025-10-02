'use client'

import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Card } from '../ui/Card'
import { Utensils } from 'lucide-react'

interface DietStepProps {
  register: UseFormRegister<any>
  errors: FieldErrors
  meatValue: number
  setMeatValue: (value: number) => void
}

export function DietStep({ register, errors, meatValue, setMeatValue }: DietStepProps) {
  const meatOptions = [
    { label: 'Never (0)', value: 0, description: 'Vegetarian/Vegan' },
    { label: 'Rarely (1-3)', value: 2, description: 'Few times a week' },
    { label: 'Moderate (4-7)', value: 5.5, description: 'Most days' },
    { label: 'Daily (7+)', value: 10, description: 'Every meal' }
  ]

  return (
    <Card>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-400/20 rounded-full mb-4 glow-lime">
          <Utensils className="w-8 h-8 text-lime-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">🍽️ Your Dietary Choices</h2>
        <p className="text-slate-400">
          Diet plays a significant role in your carbon footprint
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-200 mb-3">
          How often do you eat meat? (servings/week)
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meatOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMeatValue(option.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${meatValue === option.value
                  ? 'border-lime-400 bg-lime-400/20 shadow-md glow-lime'
                  : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold ${meatValue === option.value ? 'text-lime-400' : 'text-white'}`}>{option.label}</span>
                {meatValue === option.value && (
                  <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center glow-lime">
                    <svg className="w-3 h-3 text-slate-900" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-400">{option.description}</p>
            </button>
          ))}
        </div>

        {errors.meat_consumption && (
          <p className="text-sm text-red-400">{errors.meat_consumption.message as string}</p>
        )}

        <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-4 mt-6">
          <p className="text-sm text-slate-200">
            <strong className="text-lime-400">Did you know?</strong> Reducing meat consumption is one of the most impactful changes you can make. Plant-based meals typically have 10x lower carbon emissions than meat-based meals.
          </p>
        </div>
      </div>
    </Card>
  )
}
