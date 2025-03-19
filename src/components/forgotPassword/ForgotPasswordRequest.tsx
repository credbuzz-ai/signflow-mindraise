
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { Mail } from 'lucide-react';

interface ForgotPasswordRequestProps {
  setCurrentStep: (step: 2) => void;
  setEmail: (email: string) => void;
}

const ForgotPasswordRequest: React.FC<ForgotPasswordRequestProps> = ({ 
  setCurrentStep, 
  setEmail 
}) => {
  const [emailValue, setEmailValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailValue) {
      toast({
        title: "Please enter your email",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(emailValue)) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setEmail(emailValue);
      setCurrentStep(2);
      toast({
        title: "Reset code sent",
        description: "Please check your email for the verification code"
      });
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 gradient-text">Forgot Password</h1>
      <p className="text-gray-600 mb-6">
        Enter your email and we'll send you a code to reset your password
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="you@example.com"
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-signup hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Sending reset code..." : "Send Reset Code"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <a href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordRequest;
