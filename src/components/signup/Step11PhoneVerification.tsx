
import React, { useState } from 'react';
import { useSignup } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Phone, Check } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Country codes for select dropdown
const countryCodes = [
  { code: '+1', name: 'United States/Canada (+1)' },
  { code: '+44', name: 'United Kingdom (+44)' },
  { code: '+61', name: 'Australia (+61)' },
  { code: '+33', name: 'France (+33)' },
  { code: '+49', name: 'Germany (+49)' },
  { code: '+81', name: 'Japan (+81)' },
  { code: '+86', name: 'China (+86)' },
  { code: '+91', name: 'India (+91)' },
  { code: '+55', name: 'Brazil (+55)' },
  { code: '+52', name: 'Mexico (+52)' },
  { code: '+39', name: 'Italy (+39)' },
  { code: '+34', name: 'Spain (+34)' },
];

const Step11PhoneVerification: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState(signupData.phoneNumber);
  const [countryCode, setCountryCode] = useState(signupData.countryCode || '+1');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(signupData.phoneVerified);
  const [otp, setOtp] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const handleSendCode = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }

    setIsSendingCode(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsSendingCode(false);
      setShowOTPInput(true);
      toast({
        title: "Verification code sent",
        description: `We've sent a 6-digit code to ${countryCode} ${phoneNumber}`
      });
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setIsVerifyingCode(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsVerifyingCode(false);
      
      // Demo success
      if (otp === '123456') {
        updateSignupData({ 
          phoneNumber, 
          countryCode, 
          phoneVerified: true 
        });
        toast({
          title: "Phone verified",
          description: "Your phone number has been verified successfully"
        });
      } else {
        // For demo, show error for any code other than 123456
        toast({
          title: "Invalid code",
          description: "For this demo, use code 123456",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleSubmit = () => {
    if (!signupData.phoneVerified && !showOTPInput) {
      handleSendCode();
      return;
    }
    
    if (showOTPInput && otp.length !== 6) {
      toast({
        title: "Verification required",
        description: "Please verify your phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      updateSignupData({ 
        phoneNumber, 
        countryCode
      });
      setCurrentStep(12);
      setIsLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    updateSignupData({ 
      phoneNumber, 
      countryCode
    });
    setCurrentStep(10);
  };

  return (
    <div>
      <div className="space-y-6 mb-8">
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-1">Add your mobile number</h3>
            <p className="text-sm text-gray-500">We'll send you notifications when you receive orders</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="country-code">Country</Label>
                <Select 
                  value={countryCode}
                  onValueChange={setCountryCode}
                  disabled={showOTPInput}
                >
                  <SelectTrigger id="country-code">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="123-456-7890"
                    className="pl-10"
                    disabled={showOTPInput}
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            </div>
            
            {!showOTPInput && (
              <Button 
                className="w-full bg-gradient-signup hover:opacity-90" 
                onClick={handleSendCode}
                disabled={isSendingCode || !phoneNumber}
              >
                {isSendingCode ? "Sending..." : "Send Verification Code"}
              </Button>
            )}
          </div>
        </div>
        
        {showOTPInput && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Verify your number</h3>
            <p className="text-sm text-gray-500 mb-4">
              Enter the 6-digit code sent to {countryCode} {phoneNumber}
            </p>
            
            <div className="mb-4">
              <InputOTP 
                maxLength={6}
                value={otp}
                onChange={setOtp}
                containerClassName="gap-2 justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              
              <p className="text-xs text-center text-gray-500 mt-2">
                <button 
                  onClick={handleSendCode} 
                  className="text-primary hover:underline"
                  disabled={isSendingCode}
                >
                  {isSendingCode ? "Sending..." : "Resend code"}
                </button>
              </p>
            </div>
            
            <Button 
              className="w-full bg-gradient-signup hover:opacity-90" 
              onClick={handleVerifyCode}
              disabled={isVerifyingCode || otp.length !== 6}
            >
              {isVerifyingCode ? "Verifying..." : "Verify Code"}
              {!isVerifyingCode && <Check className="ml-2 h-4 w-4" />}
            </Button>
            
            <p className="text-xs text-center text-gray-500 mt-2">
              Demo: Use code <span className="font-mono font-medium">123456</span>
            </p>
          </div>
        )}
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
          disabled={isLoading || (showOTPInput && otp.length !== 6)}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step11PhoneVerification;
