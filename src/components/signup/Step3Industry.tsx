
import React, { useState } from 'react';
import { useSignup, Industry } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft, Briefcase, ShoppingBag, Globe, Store, MoreHorizontal } from 'lucide-react';
import SelectionCard from './SelectionCard';

const industryOptions: { id: Industry; title: string; icon: React.ReactNode }[] = [
  { id: 'agency', title: 'Agency', icon: <Briefcase className="h-5 w-5 text-primary" /> },
  { id: 'ecommerce', title: 'Ecommerce', icon: <ShoppingBag className="h-5 w-5 text-primary" /> },
  { id: 'website-app', title: 'Website/App', icon: <Globe className="h-5 w-5 text-primary" /> },
  { id: 'brick-mortar', title: 'Brick & Mortar', icon: <Store className="h-5 w-5 text-primary" /> },
  { id: 'other', title: 'Other', icon: <MoreHorizontal className="h-5 w-5 text-primary" /> },
];

const Step3Industry: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectIndustry = (industry: Industry) => {
    updateSignupData({ industry });
  };

  const handleSubmit = () => {
    if (!signupData.industry) {
      toast({
        title: "Please select an industry",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
    }, 500);
  };

  const handleGoBack = () => {
    setCurrentStep(2);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        {industryOptions.map((option) => (
          <SelectionCard
            key={option.id}
            id={option.id}
            title={option.title}
            icon={option.icon}
            isSelected={signupData.industry === option.id}
            onClick={() => handleSelectIndustry(option.id)}
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
          disabled={isLoading || !signupData.industry}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step3Industry;
