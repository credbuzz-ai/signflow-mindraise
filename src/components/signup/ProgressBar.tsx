
import React from 'react';
import { useSignup } from '@/contexts/SignupContext';
import { CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const { completedSteps } = useSignup();
  const percentage = Math.round((currentStep) / (totalSteps - 1) * 100);
  
  // Calculate completion percentage accounting for skipped steps
  const completionPercentage = Math.max(
    percentage,
    Math.round((completedSteps.length) / (totalSteps) * 100)
  );
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <div className="flex items-center text-sm font-medium">
          <span className="text-primary">Step {currentStep + 1} of {totalSteps}</span>
          {completedSteps.length > 0 && (
            <div className="flex items-center ml-2 text-green-500">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{completedSteps.length} completed</span>
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-primary">{completionPercentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-ai-orange to-ai-darkOrange transition-all duration-500 ease-in-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
