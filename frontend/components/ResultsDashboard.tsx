"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import {
  RefreshCw,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  Leaf,
} from "lucide-react";

interface ApiResponse {
  totalFootprint: number;
  breakdown: {
    energy: number;
    travel: number;
    food: number;
  };
  plan: string[];
  simulation: {
    scenario: string;
    savings: number;
    newFootprint: number;
  };
}

interface ResultsDashboardProps {
  results: ApiResponse;
  onReset: () => void;
}

const COLORS = ["#a3e635", "#22d3ee", "#fb923c"];

export function ResultsDashboard({ results, onReset }: ResultsDashboardProps) {
  const dashboardRef = useRef<HTMLDivElement>(null);

  // PDF Download Handler
  const handleDownloadPDF = async () => {
    console.log("📥 Download button clicked!"); // Debug
    if (!dashboardRef.current) {
      console.error("❌ No dashboardRef found");
      return;
    }

    try {
      const canvas = await html2canvas(dashboardRef.current, { scale: 2 });
      console.log("✅ Canvas created", canvas);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate dimensions to fit A4 (210mm x 297mm)
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // If height exceeds A4, scale down; else use auto
      if (pdfHeight > 297) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 297); // Scale to fit height
        console.log("📄 Scaled PDF to fit A4 height");
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        console.log("📄 PDF fits within A4");
      }

      pdf.save("report.pdf");
      console.log("📄 PDF saved!");
    } catch (err) {
      console.error("❌ PDF generation failed:", err);
    }
  };

  // Prepare data for pie chart
  const chartData = [
    { name: "Energy", value: results.breakdown.energy },
    { name: "Travel", value: results.breakdown.travel },
    { name: "Food", value: results.breakdown.food },
  ];

  // Calculate US average comparison (US average is ~16 tons/year)
  const usAverage = 16;
  const percentageOfAverage = (
    (results.totalFootprint / usAverage) *
    100
  ).toFixed(0);
  const isBelowAverage = results.totalFootprint < usAverage;

  return (
    <div ref={dashboardRef} className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full mb-4 shadow-lg glow-lime">
          <Leaf className="w-10 h-10 text-slate-900" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">
          Your Carbon Footprint Analysis
        </h2>
        <p className="text-slate-400">
          Here's your personalized sustainability report
        </p>
      </div>

      {/* Main Footprint Card */}
      <Card className="mb-8 text-center bg-gradient-to-br from-slate-800 to-slate-700 border-2 border-lime-400/30 glow-lime">
        <div className="mb-4">
          <p className="text-lg text-slate-300 mb-2">
            Your Annual Carbon Footprint
          </p>
          <div className="text-6xl font-bold text-lime-400 mb-2">
            {results.totalFootprint.toFixed(1)}
            <span className="text-3xl ml-2">tons</span>
          </div>
          <p className="text-slate-400">CO₂ equivalent per year</p>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
            isBelowAverage
              ? "bg-lime-400 text-slate-900"
              : "bg-orange-500 text-white"
          } font-medium`}
        >
          {isBelowAverage ? "🎉" : "⚠️"} {percentageOfAverage}% of US average (
          {usAverage} tons)
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
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="w-4 h-4 bg-lime-400 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-white">
                {results.breakdown.energy}%
              </p>
              <p className="text-xs text-slate-400">Energy</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-cyan-400 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-white">
                {results.breakdown.travel}%
              </p>
              <p className="text-xs text-slate-400">Travel</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-orange-400 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-white">
                {results.breakdown.food}%
              </p>
              <p className="text-xs text-slate-400">Food</p>
            </div>
          </div>
        </Card>

        {/* Simulation Results */}
        <Card title="What-If Scenario" subtitle="Potential impact of changes">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 mb-6 border border-lime-400/30">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-lime-400" />
              <h4 className="text-lg font-bold text-white">
                {results.simulation.scenario}
              </h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Current Footprint:</span>
                <span className="text-xl font-bold text-white">
                  {results.totalFootprint.toFixed(1)} tons
                </span>
              </div>

              <div className="flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-lime-400" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">New Footprint:</span>
                <span className="text-xl font-bold text-lime-400">
                  {results.simulation.newFootprint.toFixed(1)} tons
                </span>
              </div>

              <div className="pt-4 border-t border-lime-400/30">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">
                    Annual Savings:
                  </span>
                  <span className="text-2xl font-bold text-lime-400">
                    -{results.simulation.savings.toFixed(1)} tons CO₂
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400 text-center">
            🌱 That's equivalent to planting{" "}
            <strong className="text-lime-400">
              {Math.ceil(results.simulation.savings / 0.06)}
            </strong>{" "}
            trees!
          </p>
        </Card>
      </div>

      {/* Sustainability Plan */}
      <Card
        title="Your Personalized Sustainability Plan"
        subtitle="AI-recommended actions to reduce your impact"
      >
        <div className="space-y-4">
          {results.plan.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg border border-lime-400/30 hover:shadow-md hover:glow-lime transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-lime-400 text-slate-900 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-slate-200 leading-relaxed">{item}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
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
        <Button onClick={handleDownloadPDF} className="sm:w-auto">
          <Sparkles className="w-5 h-5" />
          Download Report
        </Button>
      </div>

      {/* Footer Message */}
      <div className="mt-8 text-center p-6 bg-slate-800 rounded-xl border border-lime-400/30">
        <p className="text-white mb-2">
          <strong className="text-lime-400">
            Great job on taking the first step!
          </strong>
        </p>
        <p className="text-sm text-slate-400">
          Small changes can make a big difference. Start with one action from
          your plan and track your progress over time.
        </p>
      </div>
    </div>
  );
}
