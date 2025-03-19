
import React, { useState } from 'react';
import { useSignup, Budget } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import SelectionCard from './SelectionCard';

const budgetOptions: { id: Budget; title: string }[] = [
  { id: 'under-10k', title: 'Under $10,000' },
  { id: '10k-50k', title: '$10,000 - $50,000' },
  { id: '50k-100k', title: '$50,000 - $100,000' },
  { id: '100k-500k', title: '$100,000 - $500,000' },
  { id: '500k+', title: 'Over $500,000' },
];

const Step7Budget: React.FC = () => {
  const { signupData, updateSignupData, resetSignup } = useSignup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelectBudget = (budget: Budget) => {
    updateSignupData({ budget });
  };

  const handleSubmit = () => {
    if (!signupData.budget) {
      toast({
        title: "Please select a budget range",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
      toast({
        title: "Account setup complete!",
        description: "Welcome to our platform."
      });
      
      // Here you would typically redirect to the dashboard
      console.log('Signup data:', signupData);
    }, 1000);
  };

  const handleGoBack = () => {
    resetSignup();
    window.location.href = '/';
  };

  if (isComplete) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle className="h-12 w-12" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 gradient-text">Setup Complete!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for signing up! Your account is now ready to use.
        </p>
        
        <Button 
          onClick={() => window.location.href = '/dashboard'} 
          className="w-full bg-gradient-signup hover:opacity-90"
        >
          Go to Dashboard
        </Button>
        
        <p className="mt-4 text-sm text-gray-500">
          A confirmation email has been sent to {signupData.email}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3 mb-6">
        {budgetOptions.map((option) => (
          <SelectionCard
            key={option.id}
            id={option.id}
            title={option.title}
            isSelected={signupData.budget === option.id}
            onClick={() => handleSelectBudget(option.id)}
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
          Start Over
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !signupData.budget}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Completing..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );
};

export default Step7Budget;
