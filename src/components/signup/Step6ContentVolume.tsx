
import React, { useState } from 'react';
import { useSignup, ContentVolume } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SelectionCard from './SelectionCard';

const volumeOptions: { id: ContentVolume; title: string }[] = [
  { id: '0-5', title: '0-5 pieces' },
  { id: '5-10', title: '5-10 pieces' },
  { id: '10-20', title: '10-20 pieces' },
  { id: '20-50', title: '20-50 pieces' },
  { id: '50+', title: '50+ pieces' },
];

const Step6ContentVolume: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectVolume = (volume: ContentVolume) => {
    updateSignupData({ contentVolume: volume });
  };

  const handleSubmit = () => {
    if (!signupData.contentVolume) {
      toast({
        title: "Please select a content volume",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(7);
    }, 500);
  };

  const handleGoBack = () => {
    setCurrentStep(5);
  };

  return (
    <div>
      <div className="space-y-3 mb-6">
        {volumeOptions.map((option) => (
          <SelectionCard
            key={option.id}
            id={option.id}
            title={option.title}
            isSelected={signupData.contentVolume === option.id}
            onClick={() => handleSelectVolume(option.id)}
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
          disabled={isLoading || !signupData.contentVolume}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step6ContentVolume;
