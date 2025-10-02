'use client'

import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Card } from '../ui/Card'
import { Slider } from '../ui/Slider'
import { Input } from '../ui/Input'
import { Zap } from 'lucide-react'

interface EnergyStepProps {
  register: UseFormRegister<any>
  errors: FieldErrors
  energyValue: number
  setEnergyValue: (value: number) => void
}

export function EnergyStep({ register, errors, energyValue, setEnergyValue }: EnergyStepProps) {
  return (
    <Card>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-400/20 rounded-full mb-4 glow-lime">
          <Zap className="w-8 h-8 text-lime-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">🏠 Your Home Energy</h2>
        <p className="text-slate-400">
          Tell us about your monthly electricity consumption
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Slider
            label="Electricity (kWh/month)"
            value={energyValue}
            onChange={setEnergyValue}
            min={0}
            max={3000}
            step={50}
            unit="kWh"
          />
        </div>

        <div>
          <Input
            type="number"
            label="Or enter exact amount"
            placeholder="e.g., 1000"
            value={energyValue}
            onChange={(e) => setEnergyValue(Number(e.target.value))}
            min={0}
            icon={<Zap className="w-5 h-5" />}
            error={errors.energy_kwh?.message as string}
          />
          <p className="mt-2 text-sm text-slate-400">
            💡 Average US household: 800-1000 kWh/month
          </p>
        </div>
      </div>
    </Card>
  )
}
