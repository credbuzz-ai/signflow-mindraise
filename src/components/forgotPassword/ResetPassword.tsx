
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordProps {
  email: string;
  resetToken: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ email, resetToken }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password"
      });
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-2 gradient-text">Reset Password</h1>
      <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
        Create a new password for your account
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <p className="text-[10px] md:text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-signup hover:opacity-90 text-xs md:text-sm py-2 md:py-2.5"
            disabled={isLoading}
          >
            {isLoading ? "Resetting password..." : "Reset Password"}
            {!isLoading && <Check className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />}
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-xs md:text-sm text-gray-600">
        Remember your password?{" "}
        <a href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default ResetPassword;
