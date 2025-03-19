
import React, { useState } from 'react';
import { useSignup } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, ArrowRight, AtSign } from 'lucide-react';

const Step0Username: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(signupData.username);

  const handleCheckUsername = () => {
    if (!username || username.length < 3) {
      toast({
        title: "Username is too short",
        description: "Username must be at least 3 characters",
        variant: "destructive"
      });
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast({
        title: "Invalid username",
        description: "Username can only contain letters, numbers, and underscores",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    
    // Simulate API call to check username availability
    setTimeout(() => {
      const isUsernameTaken = ["admin", "support", "test", "user"].includes(username.toLowerCase());
      setIsAvailable(!isUsernameTaken);
      
      if (isUsernameTaken) {
        toast({
          title: "Username is already taken",
          description: "Please choose a different username",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Username is available",
          description: "You can use this username",
        });
      }
      
      setIsChecking(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (!isAvailable) {
      toast({
        title: "Please check username availability",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Save the username and proceed to next step
    setTimeout(() => {
      updateSignupData({ username });
      setCurrentStep(1);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="username">Choose your username</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsAvailable(null);
              }}
              placeholder="yourname"
              className="pl-10"
            />
          </div>
          <p className="text-xs text-gray-500">
            Letters, numbers, and underscores only. Minimum 3 characters.
          </p>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          disabled={isChecking || !username || username.length < 3}
          onClick={handleCheckUsername}
        >
          {isChecking ? "Checking..." : "Check Availability"}
        </Button>

        {isAvailable === true && (
          <div className="flex items-center text-green-600 text-sm">
            <Check className="h-4 w-4 mr-1" />
            Username is available
          </div>
        )}
      </div>

      <Button 
        type="button" 
        onClick={handleSubmit}
        disabled={isLoading || !isAvailable}
        className="w-full bg-gradient-signup hover:opacity-90"
      >
        {isLoading ? "Saving..." : "Continue"}
        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default Step0Username;
