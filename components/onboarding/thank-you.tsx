"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { StepProps } from "@/types/onboarding";

export function ThankYou({ onComplete }: StepProps) {
  const [confettiTriggered, setConfettiTriggered] = useState(false);

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
      </div>

      <div className="pt-6">
        <Button onClick={onComplete} size="lg">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
