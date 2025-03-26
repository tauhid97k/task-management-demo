"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { GeneralInfo } from "@/components/onboarding/general-info";
import { WebsiteInfo } from "@/components/onboarding/website-info";
import { BiographyInfo } from "@/components/onboarding/biography-info";
import { SocialMediaInfo } from "@/components/onboarding/social-media-info";
import { ArticlesSelection } from "@/components/onboarding/articles-selection";
import { ThankYou } from "@/components/onboarding/thank-you";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: null,
    birthDate: "",
    clientType: "individual",
    companyName: "",
    companyAddress: "",
    companyWebsite: "",
    hasWebsite: false,
    websiteUrl: "",
    desiredDomain: "",
    biography: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      tiktok: "",
      pinterest: "",
      reddit: "",
      snapchat: "",
      discord: "",
    },
    selectedArticles: [],
  });

  const steps = [
    { id: 1, title: "General", component: GeneralInfo },
    { id: 2, title: "Website", component: WebsiteInfo },
    { id: 3, title: "Biography", component: BiographyInfo },
    { id: 4, title: "Social Media", component: SocialMediaInfo },
    { id: 5, title: "Articles", component: ArticlesSelection },
    { id: 6, title: "Complete", component: ThankYou },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    router.push("/client");
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === steps.length}
          />
        </div>
      </div>
    </div>
  );
}
