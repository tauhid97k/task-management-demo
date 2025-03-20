"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddPackageModal2Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newPackage: any) => void;
}

export function AddPackageModal2({
  isOpen,
  onClose,
  onAdd,
}: AddPackageModal2Props) {
  const [id, setId] = useState("");
  const [subscriptions, setSubscriptions] = useState(0);
  const [days, setDays] = useState(0);
  const [socialSites, setSocialSites] = useState(0);
  const [web2Sites, setWeb2Sites] = useState(0);
  const [additionalAssets, setAdditionalAssets] = useState(0);
  const [monthlyEngagement, setMonthlyEngagement] = useState(0);
  const [domain, setDomain] = useState("");

  const handleSubmit = () => {
    const newPackage = {
      id,
      subscriptions: Number(subscriptions),
      days: Number(days),
      socialSites: Number(socialSites),
      web2Sites: Number(web2Sites),
      additionalAssets: Number(additionalAssets),
      monthlyEngagement: Number(monthlyEngagement),
      domain,
    };
    onAdd(newPackage);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Package</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              ID
            </Label>
            <Input
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subscriptions" className="text-right">
              Subscriptions
            </Label>
            <Input
              type="number"
              id="subscriptions"
              value={subscriptions}
              onChange={(e) => setSubscriptions(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="days" className="text-right">
              Days
            </Label>
            <Input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="socialSites" className="text-right">
              Social Sites
            </Label>
            <Input
              type="number"
              id="socialSites"
              value={socialSites}
              onChange={(e) => setSocialSites(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="web2Sites" className="text-right">
              Web2 Sites
            </Label>
            <Input
              type="number"
              id="web2Sites"
              value={web2Sites}
              onChange={(e) => setWeb2Sites(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="additionalAssets" className="text-right">
              Additional Assets
            </Label>
            <Input
              type="number"
              id="additionalAssets"
              value={additionalAssets}
              onChange={(e) => setAdditionalAssets(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monthlyEngagement" className="text-right">
              Monthly Engagement
            </Label>
            <Input
              type="number"
              id="monthlyEngagement"
              value={monthlyEngagement}
              onChange={(e) => setMonthlyEngagement(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="domain" className="text-right">
              Domain
            </Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
