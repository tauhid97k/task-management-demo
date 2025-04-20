export interface StepProps {
  formData: {
    name: string;
    profilePicture: File | null;
    birthDate: string;
    clientType: string;
    companyName: string;
    companyAddress: string;
    companyWebsite: string;
    hasWebsite: boolean;
    websiteUrl: string;
    desiredDomain: string;
    biography: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
      youtube: string;
      tiktok: string;
      pinterest: string;
      reddit: string;
      snapchat: string;
      discord: string;
    };
    selectedArticles: number[];
  };
  updateFormData: (data: Partial<StepProps["formData"]>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}
