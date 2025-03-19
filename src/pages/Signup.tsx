
import React, { useEffect } from 'react';
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
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SignupContent: React.FC = () => {
  const { currentStep, completedSteps, totalSteps, skipToCompletion } = useSignup();
  const navigate = useNavigate();
  
  // Define step titles and descriptions
  const stepInfo = {
    0: {
      title: "Claim your username",
      description: "Choose a unique username for your profile",
      showSkip: true
    },
    1: {
      title: "Create your account",
      description: "Get started with your content creator journey",
      showSkip: false // Can't skip account creation
    },
    2: {
      title: "Verify your email",
      description: "Enter the 6-digit code we sent to your email",
      showSkip: false // Can't skip verification
    },
    3: {
      title: "Where are you located?",
      description: "Help brands find you for location-based campaigns",
      showSkip: true
    },
    4: {
      title: "Introduce yourself",
      description: "Add a title that will be shown on your profile",
      showSkip: true
    },
    5: {
      title: "Describe yourself",
      description: "Tell us about you and your content",
      showSkip: true
    },
    6: {
      title: "What's your gender?",
      description: "This helps brands find creators for targeted campaigns",
      showSkip: true
    },
    7: {
      title: "Add your social channels",
      description: "Connect your social profiles and share your follower count",
      showSkip: true
    },
    8: {
      title: "What content do you create?",
      description: "Select categories that describe your content",
      showSkip: true
    },
    9: {
      title: "Add your content",
      description: "Upload images of you and your content (3 minimum + profile picture)",
      showSkip: true
    },
    10: {
      title: "Your content packages",
      description: "Set up the content packages you offer with pricing",
      showSkip: true
    },
    11: {
      title: "Verify your phone",
      description: "Add your phone number to get notified of new orders",
      showSkip: true
    },
    12: {
      title: "Add payment method",
      description: "Add a payment method to receive payments from brands",
      showSkip: false // Can't skip payment setup at the end
    }
  };
  
  // If all steps are completed or skipped, show success screen
  const allStepsCompleted = completedSteps.length === totalSteps || currentStep === totalSteps - 1;
  
  // Render the current step component
  const renderStepComponent = () => {
    if (allStepsCompleted && currentStep === totalSteps - 1) {
      return (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle className="h-12 w-12" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 gradient-text">Setup Complete!</h2>
          <p className="text-gray-600 mb-6">
            Your account is now ready to use.
          </p>
          
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-gradient-signup hover:opacity-90"
          >
            Go to Dashboard
          </Button>
        </div>
      );
    }

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
      showSkip={stepInfo[currentStep as keyof typeof stepInfo]?.showSkip}
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
