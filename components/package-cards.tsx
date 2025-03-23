"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check, Eye, Info, Plus } from "lucide-react";
import { AddPackageModal } from "@/components/add-package-modal";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { PackageDetailsModal } from "@/components/package-details-modal";

// Package data
const packages = [
  {
    id: "DFP90",
    subscriptions: 29,
    days: 90,
    socialSites: 11,
    web2Sites: 5,
    additionalAssets: 10,
    monthlyEngagement: 1,
    domain: "1",
  },
  {
    id: "DFP120",
    subscriptions: 12,
    days: 120,
    socialSites: 22,
    web2Sites: 10,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "2/3",
  },
  {
    id: "DFP180",
    subscriptions: 21,
    days: 240,
    socialSites: 24,
    web2Sites: 11,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "2/3 or more",
  },
  {
    id: "DFP240",
    subscriptions: 21,
    days: 270,
    socialSites: 29,
    web2Sites: 11,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "2/3 or more",
  },
  {
    id: "DFP270",
    subscriptions: 5,
    days: 360,
    socialSites: 34,
    web2Sites: 11,
    additionalAssets: 10,
    monthlyEngagement: 3,
    domain: "3 or more",
  },
];

export function PackageCards() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageList, setPackageList] = useState(packages);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addPackage = (newPackage: any) => {
    setPackageList([...packageList, newPackage]);
    setIsModalOpen(false);
  };

  const handleSeeTemplates = (packageId: string) => {
    router.push(`/admin/packages/${packageId}/templates`);
  };

  const handleViewDetails = (packageId: string) => {
    setSelectedPackage(packageId);
    setIsDetailsModalOpen(true);
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
          <Card
            key={pkg.id}
            className="overflow-hidden hover:ring-2 ring-muted-foreground ring-offset-2 transition-[box-shadow] "
          >
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
            <CardFooter className="p-4 bg-muted/30 flex flex-col gap-2">
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleSeeTemplates(pkg.id)}
                >
                  <Eye className="h-4 w-4" /> See Templates
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewDetails(pkg.id)}
                >
                  <Info className="h-4 w-4" /> View Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AddPackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addPackage}
      />

      {selectedPackage && (
        <PackageDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          packageId={selectedPackage}
        />
      )}
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
