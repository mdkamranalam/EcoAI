import { CarbonFootprintForm } from "../components/CarbonFootprintForm";
import { Leaf, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center shadow-md glow-lime">
                <Leaf className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ecoAI</h1>
                <p className="text-xs text-slate-400">Climate Action Advisor</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/20 text-lime-400 rounded-full text-sm font-medium mb-6 border border-lime-400/30">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Carbon Footprint Analysis</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Understand Your
            <span className="text-lime-400"> Carbon Impact</span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Get personalized insights into your carbon footprint and receive
            AI-generated recommendations to help you make a real difference for
            our planet.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
              <span>Fast & Accurate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
              <span>AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
              <span>Actionable Plans</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarbonFootprintForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">
              Built for FutureStack GenAI Hackathon 2025
            </p>
            <p className="text-xs text-slate-500">
              Making climate action accessible and actionable through AI 🌍💚
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
