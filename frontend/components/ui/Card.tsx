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
    <div className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>}
          {subtitle && <p className="text-slate-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
