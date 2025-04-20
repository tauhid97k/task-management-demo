"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";
import type { StepProps } from "@/types/onboarding";
import { toast } from "sonner";

export function ThankYou({ formData, onComplete }: StepProps) {
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedFilename, setSavedFilename] = useState<string | null>(null);

  // Save data when component mounts
  useEffect(() => {
    saveOnboardingData();
  }, []);

  useEffect(() => {
    if (!confettiTriggered) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      setConfettiTriggered(true);

      return () => clearInterval(interval);
    }
  }, [confettiTriggered]);

  const saveOnboardingData = async () => {
    setIsSaving(true);
    const toastId = toast.loading("Saving your onboarding data...");

    try {
      // Prepare the data for saving
      const dataToSave = {
        ...formData,
        completedAt: new Date().toISOString(),
      };

      // Send the data to the API
      const response = await fetch("/api/save-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Your onboarding data has been saved successfully!", {
          id: toastId,
        });
        setSavedFilename(result.filename);
      } else {
        throw new Error(result.message || "Failed to save data");
      }
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast.error("There was a problem saving your data. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadJson = () => {
    if (!formData) return;

    // Create a JSON blob
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "onboarding-data.json";
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("JSON file downloaded successfully!");
  };

  return (
    <div className="space-y-8 text-center py-10">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Onboarding is complete. We&apos;ve collected all the information we
          need to help optimize your online presence.
        </p>

        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">
            Your data has been saved
            {savedFilename ? ` as "${savedFilename}"` : ""}.
          </p>
          <Button
            onClick={downloadJson}
            variant="outline"
            className="mt-2"
            disabled={isSaving}
          >
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
        </div>
      </div>

      <div className="pt-6">
        <Button onClick={onComplete} size="lg">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
