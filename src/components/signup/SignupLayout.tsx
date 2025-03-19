
import React, { ReactNode } from 'react';
import ProgressBar from './ProgressBar';
import { useSignup } from '@/contexts/SignupContext';

interface SignupLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showProgress?: boolean;
}

const SignupLayout: React.FC<SignupLayoutProps> = ({ 
  children, 
  title, 
  description,
  showProgress = true 
}) => {
  const { currentStep } = useSignup();
  
  return (
    <div className="signup-container min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
        {showProgress && <ProgressBar currentStep={currentStep} totalSteps={7} />}
        
        <h1 className="text-2xl font-bold mb-2 gradient-text">{title}</h1>
        
        {description && (
          <p className="text-gray-600 mb-6">{description}</p>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default SignupLayout;
