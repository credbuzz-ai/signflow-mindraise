
import React, { ReactNode } from 'react';
import ProgressBar from './ProgressBar';
import { useSignup } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SignupLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showProgress?: boolean;
  showSkip?: boolean;
}

const SignupLayout: React.FC<SignupLayoutProps> = ({ 
  children, 
  title, 
  description,
  showProgress = true,
  showSkip = true 
}) => {
  const { currentStep, totalSteps, skipCurrentStep, skipToCompletion } = useSignup();
  const isMobile = useIsMobile();
  
  return (
    <div className="signup-container min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
        {showProgress && <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />}
        
        <h1 className="text-2xl font-bold gradient-text mb-2">{title}</h1>
        
        {description && (
          <p className="text-gray-600 mb-6">{description}</p>
        )}
        
        {children}
        
        {showSkip && currentStep < totalSteps - 1 && (
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={skipCurrentStep} 
              className="text-gray-500 hover:text-primary"
            >
              Skip this step
            </Button>
            
            <Button 
              variant="link" 
              size="sm" 
              onClick={skipToCompletion} 
              className="text-gray-400 hover:text-primary"
            >
              Skip to end
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupLayout;
