
import React from 'react';
import { SignupProvider, useSignup } from '@/contexts/SignupContext';
import SignupLayout from '@/components/signup/SignupLayout';
import Step1BasicInfo from '@/components/signup/Step1BasicInfo';
import Step2VerifyOTP from '@/components/signup/Step2VerifyOTP';
import Step3Industry from '@/components/signup/Step3Industry';
import Step4Categories from '@/components/signup/Step4Categories';
import Step5Platforms from '@/components/signup/Step5Platforms';
import Step6ContentVolume from '@/components/signup/Step6ContentVolume';
import Step7Budget from '@/components/signup/Step7Budget';

const SignupContent: React.FC = () => {
  const { currentStep } = useSignup();
  
  // Define step titles and descriptions
  const stepInfo = {
    1: {
      title: "Create your account",
      description: "Get started with your influencer marketing journey"
    },
    2: {
      title: "Verify your email",
      description: "Enter the 6-digit code we sent to your email"
    },
    3: {
      title: "Select your industry",
      description: "Which industry best describes your brand?"
    },
    4: {
      title: "Choose categories",
      description: "Select up to 3 categories that describe your brand"
    },
    5: {
      title: "Target platforms",
      description: "Which platforms would you like to target?"
    },
    6: {
      title: "Content volume",
      description: "How many pieces of content do you need monthly?"
    },
    7: {
      title: "Annual budget",
      description: "What's your annual budget for influencer marketing?"
    }
  };
  
  // Render the current step component
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2VerifyOTP />;
      case 3:
        return <Step3Industry />;
      case 4:
        return <Step4Categories />;
      case 5:
        return <Step5Platforms />;
      case 6:
        return <Step6ContentVolume />;
      case 7:
        return <Step7Budget />;
      default:
        return <Step1BasicInfo />;
    }
  };

  return (
    <SignupLayout 
      title={stepInfo[currentStep as keyof typeof stepInfo]?.title || ""}
      description={stepInfo[currentStep as keyof typeof stepInfo]?.description}
    >
      {renderStepComponent()}
    </SignupLayout>
  );
};

const Signup: React.FC = () => {
  return (
    <SignupProvider>
      <SignupContent />
    </SignupProvider>
  );
};

export default Signup;
