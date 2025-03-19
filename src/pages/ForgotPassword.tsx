
import React, { useState } from 'react';
import ForgotPasswordRequest from '@/components/forgotPassword/ForgotPasswordRequest';
import VerifyResetOTP from '@/components/forgotPassword/VerifyResetOTP';
import ResetPassword from '@/components/forgotPassword/ResetPassword';
import { useIsMobile } from '@/hooks/use-mobile';

type ForgotPasswordStep = 1 | 2 | 3;

const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>(1);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const isMobile = useIsMobile();
  
  return (
    <div className="signup-container min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className={`w-full ${isMobile ? 'max-w-[95%]' : 'max-w-md'} mx-auto bg-white rounded-xl shadow-lg p-5 md:p-8 animate-fade-in`}>
        {currentStep === 1 && (
          <ForgotPasswordRequest
            setCurrentStep={setCurrentStep}
            setEmail={setEmail}
          />
        )}
        
        {currentStep === 2 && (
          <VerifyResetOTP
            setCurrentStep={setCurrentStep}
            email={email}
            setResetToken={setResetToken}
          />
        )}
        
        {currentStep === 3 && (
          <ResetPassword
            email={email}
            resetToken={resetToken}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
