
import React, { useState } from 'react';
import { useSignup } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Step5Bio: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [bio, setBio] = useState(signupData.bio);
  const [isLoading, setIsLoading] = useState(false);
  
  const maxBioLength = 500;

  const handleSubmit = () => {
    if (!bio) {
      toast({
        title: "Please enter a description",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      updateSignupData({ bio });
      setCurrentStep(6);
      setIsLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    setCurrentStep(4);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="bio">About you and your content</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, maxBioLength))}
            placeholder="Tell brands about yourself, your content style, and what makes you unique..."
            className="min-h-32 resize-y"
          />
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">
              Share your story, expertise, and content style
            </span>
            <span className={`${bio.length >= maxBioLength ? 'text-red-500' : 'text-gray-500'}`}>
              {bio.length}/{maxBioLength}
            </span>
          </div>
        </div>
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
          disabled={isLoading || !bio}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step5Bio;
