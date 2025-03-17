"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check, Eye, Plus } from "lucide-react";
import { AddPackageModal } from "@/components/add-package-modal";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Package data
const packages = [
  {
    id: "DFP90",
    subscriptions: 29,
    days: 90,
    socialSites: 13,
    web2Sites: 5,
    additionalAssets: 10,
    monthlyEngagement: 1,
    domain: "1",
  },
  {
    id: "DFP120",
    subscriptions: 12,
    days: 120,
    socialSites: 20,
    web2Sites: 11,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "2/3",
  },
  {
    id: "DFP240",
    subscriptions: 21,
    days: 240,
    socialSites: 34,
    web2Sites: 11,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "2/3 or more",
  },
  {
    id: "DFP270",
    subscriptions: 21,
    days: 270,
    socialSites: 34,
    web2Sites: 11,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "2/3 or more",
  },
  {
    id: "DFP360",
    subscriptions: 5,
    days: 360,
    socialSites: 40,
    web2Sites: 12,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "3 or more",
  },
];

export function PackageCards() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageList, setPackageList] = useState(packages);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addPackage = (newPackage: any) => {
    setPackageList([...packageList, newPackage]);
    setIsModalOpen(false);
  };

  const handleSeeTemplates = (packageId: string) => {
    router.push(`/admin/packages/${packageId}/templates`);
  };

  return (
    <div>
      <div className="flex justify-start mb-6">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packageList.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden border-2 border-muted">
            <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row justify-between items-center">
              <h3 className="text-xl font-bold">{pkg.id}</h3>
              <Badge
                variant="secondary"
                className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              >
                Total Subscriptions: {pkg.subscriptions}
              </Badge>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <FeatureItem label={`${pkg.days} Days`} description="duration" />
              <FeatureItem
                label={`${pkg.socialSites}`}
                description="Social Sites"
              />
              <FeatureItem
                label={`Web 2.0s ${pkg.web2Sites}`}
                description="Sites"
              />
              <FeatureItem
                label={`Additional Assets ${pkg.additionalAssets}`}
                description="Approx"
              />
              <FeatureItem
                label={`Monthly Engagement ${pkg.monthlyEngagement}`}
                description=""
              />
              <FeatureItem label={`Domain ${pkg.domain}`} description="" />
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 flex justify-between gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => handleSeeTemplates(pkg.id)}
              >
                <Eye className="h-4 w-4" /> See Templates
              </Button>
              <Button variant="secondary" className="flex-1 gap-2">
                <Plus className="h-4 w-4" /> Add Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AddPackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addPackage}
      />
    </div>
  );
}

function FeatureItem({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="rounded-full bg-muted p-1 mt-0.5">
        <Check className="h-3 w-3 text-primary" />
      </div>
      <div>
        <span className="font-medium">{label}</span>
        {description && (
          <span className="text-muted-foreground ml-1">{description}</span>
        )}
      </div>
    </div>
  );
}
