
import React, { useState } from 'react';
import { useSignup, Gender } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const genderOptions: { id: Gender; label: string }[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'non-binary', label: 'Non-binary' },
  { id: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const Step6Gender: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [selectedGender, setSelectedGender] = useState<Gender | null>(signupData.gender);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!selectedGender) {
      toast({
        title: "Please select a gender",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      updateSignupData({ gender: selectedGender });
      setCurrentStep(7);
      setIsLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    setCurrentStep(5);
  };

  return (
    <div>
      <div className="space-y-6 mb-6">
        <RadioGroup 
          value={selectedGender || ""} 
          onValueChange={(value) => setSelectedGender(value as Gender)}
          className="space-y-3"
        >
          {genderOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
        
        <p className="text-sm text-gray-500">
          This information helps brands find creators for targeted campaigns. It will not be publicly displayed unless you choose to share it.
        </p>
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
          disabled={isLoading || !selectedGender}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step6Gender;
