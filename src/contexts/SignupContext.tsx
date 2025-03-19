
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Industry = 'agency' | 'ecommerce' | 'website-app' | 'brick-mortar' | 'other';
export type Category = 'fashion' | 'beauty' | 'travel' | 'food-drink' | 'tech' | 'finance' | 'health' | 'education' | 'entertainment' | 'sports';
export type Platform = 'instagram' | 'tiktok' | 'twitter' | 'youtube' | 'ugc';
export type ContentVolume = '0-5' | '5-10' | '10-20' | '20-50' | '50+';
export type Budget = 'under-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k+';

interface SignupData {
  // Step 1: Basic Info
  name: string;
  brandName: string;
  email: string;
  password: string;
  
  // Step 2: OTP Verification
  isVerified: boolean;
  
  // Step 3: Industry
  industry: Industry | null;
  
  // Step 4: Categories (max 3)
  categories: Category[];
  
  // Step 5: Platforms
  platforms: Platform[];
  
  // Step 6: Content Volume
  contentVolume: ContentVolume | null;
  
  // Step 7: Budget
  budget: Budget | null;
}

interface SignupContextType {
  currentStep: number;
  signupData: SignupData;
  setCurrentStep: (step: number) => void;
  updateSignupData: (data: Partial<SignupData>) => void;
  resetSignup: () => void;
}

const initialSignupData: SignupData = {
  name: '',
  brandName: '',
  email: '',
  password: '',
  isVerified: false,
  industry: null,
  categories: [],
  platforms: [],
  contentVolume: null,
  budget: null,
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>(initialSignupData);

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  const resetSignup = () => {
    setCurrentStep(1);
    setSignupData(initialSignupData);
  };

  return (
    <SignupContext.Provider value={{
      currentStep,
      signupData,
      setCurrentStep,
      updateSignupData,
      resetSignup
    }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};
