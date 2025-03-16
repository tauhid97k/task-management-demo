"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newPackage: never) => void;
}

export function AddPackageModal({
  isOpen,
  onClose,
  onAdd,
}: AddPackageModalProps) {
  const [newPackage, setNewPackage] = useState({
    id: "",
    subscriptions: 0,
    days: 0,
    socialSites: 0,
    web2Sites: 0,
    additionalAssets: 10,
    monthlyEngagement: 1,
    domain: "1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPackage({
      ...newPackage,
      [name]: name === "id" ? value : Number.parseInt(value) || 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newPackage);
    setNewPackage({
      id: "",
      subscriptions: 0,
      days: 0,
      socialSites: 0,
      web2Sites: 0,
      additionalAssets: 10,
      monthlyEngagement: 1,
      domain: "1",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Package</DialogTitle>
          <DialogDescription>
            Create a new subscription package with the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                Package ID
              </Label>
              <Input
                id="id"
                name="id"
                placeholder="DFP123"
                value={newPackage.id}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subscriptions" className="text-right">
                Subscriptions
              </Label>
              <Input
                id="subscriptions"
                name="subscriptions"
                type="number"
                value={newPackage.subscriptions || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">
                Days
              </Label>
              <Input
                id="days"
                name="days"
                type="number"
                value={newPackage.days || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="socialSites" className="text-right">
                Social Sites
              </Label>
              <Input
                id="socialSites"
                name="socialSites"
                type="number"
                value={newPackage.socialSites || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="web2Sites" className="text-right">
                Web 2.0 Sites
              </Label>
              <Input
                id="web2Sites"
                name="web2Sites"
                type="number"
                value={newPackage.web2Sites || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domain" className="text-right">
                Domain
              </Label>
              <Input
                id="domain"
                name="domain"
                placeholder="1, 2/3, or 3 or more"
                value={newPackage.domain}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, domain: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Package</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
