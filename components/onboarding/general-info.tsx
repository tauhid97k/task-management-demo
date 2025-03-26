"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { StepProps } from "@/types/onboarding";

export function GeneralInfo({
  formData,
  updateFormData,
  onNext,
  isFirstStep,
}: StepProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">General Information</h1>
        <p className="text-gray-500 mt-2">
          Let's start with some basic information about you or your business.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="Enter your full name"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="mb-2">Profile Picture</Label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border border-gray-300">
              {previewUrl ? (
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Upload size={16} />
                <span>Upload</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <Label htmlFor="birthDate">Birth Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !formData.birthDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.birthDate ? (
                  format(new Date(formData.birthDate), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  formData.birthDate ? new Date(formData.birthDate) : undefined
                }
                onSelect={(date) =>
                  updateFormData({ birthDate: date ? date.toISOString() : "" })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-3">
          <Label>Client Type</Label>
          <RadioGroup
            value={formData.clientType}
            onValueChange={(value) => updateFormData({ clientType: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label className="mb-0" htmlFor="individual">
                Individual
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label className="mb-0" htmlFor="business">
                Business
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.clientType === "business" && (
          <div className="space-y-4 border-l-2 border-primary pl-4 mt-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  updateFormData({ companyName: e.target.value })
                }
                placeholder="Enter company name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) =>
                  updateFormData({ companyAddress: e.target.value })
                }
                placeholder="Enter company address"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input
                id="companyWebsite"
                value={formData.companyWebsite}
                onChange={(e) =>
                  updateFormData({ companyWebsite: e.target.value })
                }
                placeholder="https://example.com"
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
