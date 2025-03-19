
import React, { useState } from 'react';
import { useSignup, Platform } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SelectionCard from './SelectionCard';

const platformOptions: { id: Platform; title: string; icon: React.ReactNode }[] = [
  { 
    id: 'instagram', 
    title: 'Instagram',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEC054" />
          <stop offset="25%" stopColor="#F3605C" />
          <stop offset="50%" stopColor="#EE407C" />
          <stop offset="75%" stopColor="#C23AA1" />
          <stop offset="100%" stopColor="#8C31EE" />
        </linearGradient>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagram-gradient)" />
      </svg>
    )
  },
  { 
    id: 'tiktok', 
    title: 'TikTok',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M19.321 5.562a5.124 5.124 0 0 1-3.414-2.276 5.124 5.124 0 0 1-.731-2.584h-3.522v12.93c0 1.357-1.045 2.422-2.422 2.422a2.422 2.422 0 0 1 0-4.844c.134 0 .268.11.391.033v-3.522a5.943 5.943 0 0 0-.391-.011 5.944 5.944 0 1 0 5.944 5.944v-6.167c1.445.8 3.12 1.29 4.9 1.29v-3.215c-.245.011-.49.022-.755 0Z" fill="#FF004F" />
        <path d="M19.321 5.562v3.215c-1.78 0-3.454-.49-4.9-1.29v6.168a5.944 5.944 0 0 1-5.943 5.943 5.934 5.934 0 0 1-5.166-3.013 5.944 5.944 0 0 0 10.12-4.243V.702h3.522a5.124 5.124 0 0 0 .73 2.584 5.124 5.124 0 0 0 3.415 2.276h-1.779Z" fill="#000000" />
      </svg>
    )
  },
  { 
    id: 'twitter', 
    title: 'Twitter/X',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  { 
    id: 'youtube', 
    title: 'YouTube',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  { 
    id: 'ugc', 
    title: 'User Generated Content',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
];

const Step5Platforms: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const togglePlatform = (platform: Platform) => {
    const currentPlatforms = [...signupData.platforms];
    const platformIndex = currentPlatforms.indexOf(platform);
    
    if (platformIndex > -1) {
      // Remove if already selected
      currentPlatforms.splice(platformIndex, 1);
    } else {
      // Add if not selected
      currentPlatforms.push(platform);
    }
    
    updateSignupData({ platforms: currentPlatforms });
  };

  const handleSubmit = () => {
    if (signupData.platforms.length === 0) {
      toast({
        title: "Please select at least one platform",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(6);
    }, 500);
  };

  const handleGoBack = () => {
    setCurrentStep(4);
  };

  return (
    <div>
      <div className="space-y-3 mb-6">
        {platformOptions.map((option) => (
          <SelectionCard
            key={option.id}
            id={option.id}
            title={option.title}
            icon={option.icon}
            isSelected={signupData.platforms.includes(option.id)}
            onClick={() => togglePlatform(option.id)}
          />
        ))}
      </div>

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleGoBack}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || signupData.platforms.length === 0}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step5Platforms;
