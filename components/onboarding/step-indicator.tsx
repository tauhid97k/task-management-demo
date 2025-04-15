"use client";

import type React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  component: React.ComponentType<any>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-center mb-20">
        {steps.map((step, stepIdx) => (
          <li
            key={step.title}
            className={cn(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.id < currentStep ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary cursor-pointer"
                  onClick={() => onStepClick && onStepClick(step.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to ${step.title} step`}
                >
                  <CheckIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.title}</span>
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.title}</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.title}</span>
                </div>
              </>
            )}
            <div
              className={cn(
                "absolute top-10 text-center text-sm font-medium",
                step.id < currentStep
                  ? "text-primary cursor-pointer hover:underline"
                  : "text-gray-500"
              )}
              onClick={() =>
                step.id < currentStep && onStepClick && onStepClick(step.id)
              }
              role={step.id < currentStep ? "button" : undefined}
              tabIndex={step.id < currentStep ? 0 : undefined}
            >
              {step.title}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
