'use client'

import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Card } from '../ui/Card'
import { Slider } from '../ui/Slider'
import { Input } from '../ui/Input'
import { Car } from 'lucide-react'

interface TravelStepProps {
  register: UseFormRegister<any>
  errors: FieldErrors
  milesValue: number
  setMilesValue: (value: number) => void
}

export function TravelStep({ register, errors, milesValue, setMilesValue }: TravelStepProps) {
  return (
    <Card>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <Car className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">🚗 Your Travel Footprint</h2>
        <p className="text-slate-600">
          How much do you drive each week?
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Slider
            label="Distance Driven (miles/week)"
            value={milesValue}
            onChange={setMilesValue}
            min={0}
            max={1000}
            step={10}
            unit="miles"
          />
        </div>

        <div>
          <Input
            type="number"
            label="Or enter exact distance"
            placeholder="e.g., 500"
            value={milesValue}
            onChange={(e) => setMilesValue(Number(e.target.value))}
            min={0}
            icon={<Car className="w-5 h-5" />}
            error={errors.miles_driven?.message as string}
          />
          <p className="mt-2 text-sm text-slate-500">
            🚙 Average US driver: 200-300 miles/week
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-sm text-emerald-800">
            <strong>Note:</strong> We measure distance in miles to accurately calculate your carbon footprint based on US emission standards.
          </p>
        </div>
      </div>
    </Card>
  )
}
