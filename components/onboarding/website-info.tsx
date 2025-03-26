"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { StepProps } from "@/types/onboarding";

export function WebsiteInfo({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}: StepProps) {
  const domainExtensions = [
    { name: ".com", price: "$12/year" },
    { name: ".net", price: "$15/year" },
    { name: ".org", price: "$13/year" },
    { name: ".io", price: "$45/year" },
    { name: ".co", price: "$25/year" },
    { name: ".xyz", price: "$10/year" },
    { name: ".dev", price: "$15/year" },
    { name: ".app", price: "$17/year" },
    { name: ".site", price: "$11/year" },
    { name: ".online", price: "$8/year" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Website Information</h1>
        <p className="text-gray-500 mt-2">
          Tell us about your website or choose a domain if you don&apos;t have
          one yet.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Do you have a website?</Label>
          <RadioGroup
            value={formData.hasWebsite ? "yes" : "no"}
            onValueChange={(value) =>
              updateFormData({ hasWebsite: value === "yes" })
            }
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="has-website-yes" />
              <Label className="mb-0" htmlFor="has-website-yes">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="has-website-no" />
              <Label className="mb-0" htmlFor="has-website-no">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.hasWebsite ? (
          <div>
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              value={formData.websiteUrl}
              onChange={(e) => updateFormData({ websiteUrl: e.target.value })}
              placeholder="https://example.com"
              className="mt-1"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <Label htmlFor="desiredDomain">Choose a domain name</Label>
              <div className="flex mt-1">
                <Input
                  id="desiredDomain"
                  value={formData.desiredDomain}
                  onChange={(e) =>
                    updateFormData({ desiredDomain: e.target.value })
                  }
                  placeholder="yourbusiness"
                  className="rounded-r-none"
                />
                <select className="inline-flex items-center justify-center whitespace-nowrap rounded-l-none rounded-r-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-l-0">
                  {domainExtensions.map((ext) => (
                    <option key={ext.name} value={ext.name}>
                      {ext.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                Available Domain Extensions
              </h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Extension
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {domainExtensions.map((domain) => (
                      <tr key={domain.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {domain.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {domain.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
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
