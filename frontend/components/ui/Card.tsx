'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export function Card({ children, className = '', title, subtitle }: CardProps) {
  return (
    <div className={`bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl border border-slate-700 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>}
          {subtitle && <p className="text-slate-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
