'use client'

import React from 'react'

interface SliderProps {
  label?: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

export function Slider({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  unit = ''
}: SliderProps) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-slate-200">{label}</label>
          <span className="text-lg font-semibold text-lime-400">
            {value} {unit}
          </span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-lime-400
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:hover:bg-lime-500
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-webkit-slider-thumb]:hover:shadow-[0_0_15px_rgba(163,230,53,0.5)]
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-lime-400
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:transition-all
          [&::-moz-range-thumb]:hover:bg-lime-500
        "
      />
      <div className="flex justify-between mt-1 text-xs text-slate-400">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}
