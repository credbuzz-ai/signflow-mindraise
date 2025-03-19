
import React, { useState, useEffect } from 'react';
import { useSignup } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Step4Title: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep, markStepComplete, isStepComplete } = useSignup();
  const { toast } = useToast();
  const [title, setTitle] = useState(signupData.title);
  const [isLoading, setIsLoading] = useState(false);
  
  const maxTitleLength = 60;

  // Check if this step was previously completed
  useEffect(() => {
    if (signupData.title && !isStepComplete(4)) {
      markStepComplete(4);
    }
  }, [signupData.title, isStepComplete, markStepComplete]);

  const handleSubmit = () => {
    if (!title) {
      toast({
        title: "Please enter a title",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      updateSignupData({ title });
      markStepComplete(4);
      setCurrentStep(5);
      setIsLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    updateSignupData({ title });
    setCurrentStep(3);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="title">Your profile title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, maxTitleLength))}
            placeholder="e.g. Travel Vlogger | Food Enthusiast | Adventure Seeker"
          />
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">
              Give a concise summary of who you are
            </span>
            <span className={`${title.length >= maxTitleLength ? 'text-red-500' : 'text-gray-500'}`}>
              {title.length}/{maxTitleLength}
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
          disabled={isLoading || !title}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step4Title;
