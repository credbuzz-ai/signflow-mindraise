
import React, { useState } from 'react';
import { useSignup } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, Lock, User, Building } from 'lucide-react';

const Step1BasicInfo: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.name || !signupData.brandName || !signupData.email || !signupData.password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password.length < 8) {
      toast({
        title: "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(signupData.email)) {
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
      setCurrentStep(2);
      toast({
        title: "OTP sent to your email",
        description: "Please check your inbox for the verification code"
      });
    }, 1000);
  };

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Google signup",
      description: "This feature would connect to Google OAuth"
    });
  };

  const handleXSignup = () => {
    toast({
      title: "X signup",
      description: "This feature would connect to X/Twitter OAuth"
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <Button 
          onClick={handleGoogleSignup}
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>
        <Button 
          onClick={handleXSignup}
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Continue with X
        </Button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                value={signupData.name}
                onChange={(e) => updateSignupData({ name: e.target.value })}
                placeholder="John Doe"
                className="pl-10"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name</Label>
            <div className="relative">
              <Input
                id="brandName"
                type="text"
                value={signupData.brandName}
                onChange={(e) => updateSignupData({ brandName: e.target.value })}
                placeholder="Your Brand"
                className="pl-10"
              />
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={signupData.email}
                onChange={(e) => updateSignupData({ email: e.target.value })}
                placeholder="you@example.com"
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={signupData.password}
                onChange={(e) => updateSignupData({ password: e.target.value })}
                placeholder="••••••••"
                className="pl-10"
                showPasswordToggle
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <p className="text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-signup hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Sending verification..." : "Continue"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default Step1BasicInfo;
