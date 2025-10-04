"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "./ui/Button";
import { EnergyStep } from "./form-steps/EnergyStep";
import { TravelStep } from "./form-steps/TravelStep";
import { DietStep } from "./form-steps/DietStep";
import { ResultsDashboard } from "./ResultsDashboard";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface FormData {
  energy_kwh: number;
  miles_driven: number;
  meat_consumption: number;
}

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

export function CarbonFootprintForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [results, setResults] = useState<ApiResponse | null>(null);

  // Form state
  const [energyValue, setEnergyValue] = useState(1000);
  const [milesValue, setMilesValue] = useState(500);
  const [meatValue, setMeatValue] = useState(5.5);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      energy_kwh: 1000,
      miles_driven: 500,
      meat_consumption: 5.5,
    },
  });

  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const payload = {
        energy_kwh: energyValue,
        miles_driven: milesValue,
        meat_consumption: meatValue,
      };

      console.log("Submitting data:", payload);

      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      const response = await axios.post<ApiResponse>(
        `${backendUrl}/analyze`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("API Response:", response.data);
      setResults(response.data);
    } catch (error: any) {
      console.error("API Error:", error);
      setApiError(
        error.response?.data?.error ||
          error.message ||
          "Failed to analyze your carbon footprint. Please make sure the backend server is running on port 3001."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // If we have results, show the dashboard
  if (results) {
    return (
      <ResultsDashboard results={results} onReset={() => setResults(null)} />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    transition-all duration-300
                    ${
                      step === currentStep
                        ? "bg-lime-400 text-slate-900 scale-110 shadow-lg glow-lime"
                        : step < currentStep
                        ? "bg-lime-500 text-slate-900"
                        : "bg-slate-700 text-slate-400"
                    }
                  `}
                >
                  {step < currentStep ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className="text-xs mt-2 text-slate-300 font-medium">
                  {step === 1 && "Energy"}
                  {step === 2 && "Travel"}
                  {step === 3 && "Diet"}
                </span>
              </div>
              {step < 3 && (
                <div
                  className={`
                    flex-1 h-1 mx-2 rounded transition-all duration-300
                    ${step < currentStep ? "bg-lime-400" : "bg-slate-700"}
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-slate-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <EnergyStep
            register={register}
            errors={errors}
            energyValue={energyValue}
            setEnergyValue={setEnergyValue}
          />
        )}

        {currentStep === 2 && (
          <TravelStep
            register={register}
            errors={errors}
            milesValue={milesValue}
            setMilesValue={setMilesValue}
          />
        )}

        {currentStep === 3 && (
          <DietStep
            register={register}
            errors={errors}
            meatValue={meatValue}
            setMeatValue={setMeatValue}
          />
        )}

        {/* Error Message */}
        {apiError && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-400/30 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> {apiError}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex-1 sm:flex-initial"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex-1 sm:flex-initial"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="flex-1 sm:flex-initial"
            >
              {!isSubmitting && <Sparkles className="w-5 h-5" />}
              {isSubmitting ? "Analyzing..." : "Analyze My Footprint"}
            </Button>
          )}
        </div>
      </form>

      {/* Helper Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Your data is processed securely and never shared with third parties
        </p>
      </div>
    </div>
  );
}
