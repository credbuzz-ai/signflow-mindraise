
import React, { useState, useEffect } from 'react';
import { useSignup } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Step2VerifyOTP: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Only take the last character if pasting
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus to next input if current input is filled
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    
    if (pastedData) {
      const newOtp = [...otp];
      
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newOtp[i] = pastedData[i];
        }
      }
      
      setOtp(newOtp);
      
      // Focus on the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(digit => !digit);
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs[focusIndex].current?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast({
        title: "Please enter a valid 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      // For demo, let's say 123456 is the correct OTP
      if (otpValue === '123456') {
        updateSignupData({ isVerified: true });
        setCurrentStep(3);
        toast({
          title: "Email verified successfully",
        });
      } else {
        toast({
          title: "Invalid verification code",
          description: "Please check and try again",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    
    toast({
      title: "OTP sent",
      description: "A new verification code has been sent to your email"
    });
    
    setTimeLeft(60);
    setCanResend(false);
  };

  const handleGoBack = () => {
    setCurrentStep(1);
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        We've sent a verification code to <span className="font-medium">{signupData.email}</span>
      </p>

      <div className="mb-6">
        <div className="flex justify-between mb-4 gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              ref={inputRefs[index]}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-lg font-semibold focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">
            {canResend ? 'Didn\'t receive the code?' : `Resend code in ${timeLeft}s`}
          </p>
          <button
            onClick={handleResendOtp}
            disabled={!canResend}
            className={`text-sm font-medium ${canResend ? 'text-primary hover:underline' : 'text-gray-400'}`}
          >
            Resend verification code
          </button>
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
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length !== 6}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Verifying..." : "Verify"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      <p className="mt-4 text-xs text-center text-gray-500">
        For this demo, use code: <span className="font-medium">123456</span>
      </p>
    </div>
  );
};

export default Step2VerifyOTP;
