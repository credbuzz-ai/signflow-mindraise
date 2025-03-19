
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Check, User, Mail, Link, Twitter, Instagram, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KOLApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KOLApplicationForm: React.FC<KOLApplicationFormProps> = ({ open, onOpenChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    twitterHandle: '',
    instagramHandle: '',
    youtubeChannel: '',
    additionalInfo: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        websiteUrl: '',
        twitterHandle: '',
        instagramHandle: '',
        youtubeChannel: '',
        additionalInfo: ''
      });
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">KOL Application</DialogTitle>
          <DialogDescription>
            Fill out the form below to apply to our KOL network. We'll review your application and get back to you soon.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                placeholder="Your name"
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                placeholder="Your email address"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website (optional)</Label>
            <div className="relative">
              <Input
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="pl-10"
                placeholder="https://yourwebsite.com"
              />
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitterHandle">Twitter</Label>
              <div className="relative">
                <Input
                  id="twitterHandle"
                  name="twitterHandle"
                  value={formData.twitterHandle}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="@username"
                />
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagramHandle">Instagram</Label>
              <div className="relative">
                <Input
                  id="instagramHandle"
                  name="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="@username"
                />
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="youtubeChannel">YouTube</Label>
              <div className="relative">
                <Input
                  id="youtubeChannel"
                  name="youtubeChannel"
                  value={formData.youtubeChannel}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Channel name"
                />
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[100px]"
              placeholder="Tell us more about yourself, your audience, and why you want to join our KOL network"
            ></textarea>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="mr-2"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-signup hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              {!isSubmitting && <Check className="ml-2 h-4 w-4" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KOLApplicationForm;
