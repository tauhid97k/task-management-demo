"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { StepProps } from "@/types/onboarding"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  InstagramIcon as TiktokIcon,
  PinIcon as PinterestIcon,
  RedoDotIcon as RedditIcon,
  MessageCircle,
  MessageSquare,
} from "lucide-react"

export function SocialMediaInfo({ formData, updateFormData, onNext, onPrevious }: StepProps) {
  const socialMediaPlatforms = [
    { name: "facebook", icon: Facebook, label: "Facebook", placeholder: "https://facebook.com/username" },
    { name: "twitter", icon: Twitter, label: "Twitter", placeholder: "https://twitter.com/username" },
    { name: "instagram", icon: Instagram, label: "Instagram", placeholder: "https://instagram.com/username" },
    { name: "linkedin", icon: Linkedin, label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
    { name: "youtube", icon: Youtube, label: "YouTube", placeholder: "https://youtube.com/c/channelname" },
    { name: "tiktok", icon: TiktokIcon, label: "TikTok", placeholder: "https://tiktok.com/@username" },
    { name: "pinterest", icon: PinterestIcon, label: "Pinterest", placeholder: "https://pinterest.com/username" },
    { name: "reddit", icon: RedditIcon, label: "Reddit", placeholder: "https://reddit.com/user/username" },
    { name: "snapchat", icon: MessageCircle, label: "Snapchat", placeholder: "username" },
    { name: "discord", icon: MessageSquare, label: "Discord", placeholder: "username#0000" },
  ]

  const handleSocialMediaChange = (platform: string, value: string) => {
    updateFormData({
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Social Media Profiles</h1>
        <p className="text-gray-500 mt-2">Connect your social media accounts to enhance your online presence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialMediaPlatforms.map((platform) => {
          const Icon = platform.icon
          return (
            <div key={platform.name} className="space-y-2">
              <Label htmlFor={`social-${platform.name}`} className="flex items-center">
                <Icon className="mr-2 h-4 w-4" />
                {platform.label}
              </Label>
              <div className="flex">
                <div className="w-10 flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  <Icon className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id={`social-${platform.name}`}
                  value={formData.socialMedia[platform.name as keyof typeof formData.socialMedia] || ""}
                  onChange={(e) => handleSocialMediaChange(platform.name, e.target.value)}
                  placeholder={platform.placeholder}
                  className="rounded-l-none"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

