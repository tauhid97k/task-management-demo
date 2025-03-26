"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { StepProps } from "@/types/onboarding";
import { Sparkles } from "lucide-react";

export function BiographyInfo({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}: StepProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBio = () => {
    setIsGenerating(true);

    // Mock AI generation with a timeout
    setTimeout(() => {
      const generatedBio = `I am a passionate professional with over 10 years of experience in my field. My journey began with a deep curiosity about how things work and evolved into a career dedicated to innovation and excellence. I believe in the power of collaboration and continuous learning.

Throughout my career, I've had the opportunity to work with amazing teams on challenging projects that have pushed the boundaries of what's possible. I'm particularly proud of my contributions to sustainability initiatives and community development programs.

When I'm not working, you can find me exploring nature trails, experimenting with new recipes, or mentoring young professionals. I'm excited about the future and the endless possibilities it holds for growth and positive impact.`;

      updateFormData({ biography: generatedBio });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Your Biography</h1>
        <p className="text-gray-500 mt-2">
          Tell us about yourself or let our AI help you create a compelling
          biography.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            onClick={handleGenerateBio}
            disabled={isGenerating}
            className="relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 bg-primary opacity-90 group-hover:opacity-0 transition-opacity duration-300"></span>
            <span className="absolute -inset-x-1/4 top-0 h-[300%] w-[150%] -translate-y-1/2 rotate-12 animate-[shimmer_2s_linear_infinite] bg-gradient-to-t from-transparent via-white/20 to-transparent group-hover:via-white/30"></span>
          </Button>
        </div>

        <div className="relative min-h-[300px] border rounded-md">
          <div className="absolute inset-0 overflow-auto p-4">
            <div
              className="prose prose-sm max-w-none h-full p-4"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateFormData({ biography: e.currentTarget.innerHTML })
              }
              dangerouslySetInnerHTML={{ __html: formData.biography }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
