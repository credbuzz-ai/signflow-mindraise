
import React from 'react';
import { SignupProvider, useSignup } from '@/contexts/SignupContext';
import SignupLayout from '@/components/signup/SignupLayout';
import Step0Username from '@/components/signup/Step0Username';
import Step1BasicInfo from '@/components/signup/Step1BasicInfo';
import Step2VerifyOTP from '@/components/signup/Step2VerifyOTP';
import Step3Location from '@/components/signup/Step3Location';
import Step4Title from '@/components/signup/Step4Title';
import Step5Bio from '@/components/signup/Step5Bio';
import Step6Gender from '@/components/signup/Step6Gender';
import Step7SocialProfiles from '@/components/signup/Step7SocialProfiles';
import Step8ContentCategories from '@/components/signup/Step8ContentCategories';
import Step9ContentImages from '@/components/signup/Step9ContentImages';
import Step10ContentPackages from '@/components/signup/Step10ContentPackages';
import Step11PhoneVerification from '@/components/signup/Step11PhoneVerification';
import Step12Payment from '@/components/signup/Step12Payment';

const SignupContent: React.FC = () => {
  const { currentStep } = useSignup();
  
  // Define step titles and descriptions
  const stepInfo = {
    0: {
      title: "Claim your username",
      description: "Choose a unique username for your profile"
    },
    1: {
      title: "Create your account",
      description: "Get started with your content creator journey"
    },
    2: {
      title: "Verify your email",
      description: "Enter the 6-digit code we sent to your email"
    },
    3: {
      title: "Where are you located?",
      description: "Help brands find you for location-based campaigns"
    },
    4: {
      title: "Introduce yourself",
      description: "Add a title that will be shown on your profile"
    },
    5: {
      title: "Describe yourself",
      description: "Tell us about you and your content"
    },
    6: {
      title: "What's your gender?",
      description: "This helps brands find creators for targeted campaigns"
    },
    7: {
      title: "Add your social channels",
      description: "Connect your social profiles and share your follower count"
    },
    8: {
      title: "What content do you create?",
      description: "Select categories that describe your content"
    },
    9: {
      title: "Add your content",
      description: "Upload images of you and your content (3 minimum + profile picture)"
    },
    10: {
      title: "Your content packages",
      description: "Set up the content packages you offer with pricing"
    },
    11: {
      title: "Verify your phone",
      description: "Add your phone number to get notified of new orders"
    },
    12: {
      title: "Add payment method",
      description: "Add a payment method to receive payments from brands"
    }
  };
  
  // Render the current step component
  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <Step0Username />;
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2VerifyOTP />;
      case 3:
        return <Step3Location />;
      case 4:
        return <Step4Title />;
      case 5:
        return <Step5Bio />;
      case 6:
        return <Step6Gender />;
      case 7:
        return <Step7SocialProfiles />;
      case 8:
        return <Step8ContentCategories />;
      case 9:
        return <Step9ContentImages />;
      case 10:
        return <Step10ContentPackages />;
      case 11:
        return <Step11PhoneVerification />;
      case 12:
        return <Step12Payment />;
      default:
        return <Step0Username />;
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
