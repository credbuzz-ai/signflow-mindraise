
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Industry = 'agency' | 'ecommerce' | 'website-app' | 'brick-mortar' | 'other';
export type Category = 'fashion' | 'beauty' | 'travel' | 'food-drink' | 'tech' | 'finance' | 'health' | 'education' | 'entertainment' | 'sports';
export type Platform = 'instagram' | 'tiktok' | 'twitter' | 'youtube' | 'twitch' | 'amazon' | 'website';
export type ContentVolume = '0-5' | '5-10' | '10-20' | '20-50' | '50+';
export type Budget = 'under-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k+';
export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
export type FollowerRange = 'under-1k' | '1k-5k' | '5k-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k-1m' | 'over-1m';

export interface SocialProfile {
  platform: Platform;
  url: string;
  followers?: FollowerRange;
}

export interface ContentImage {
  url: string;
  isProfilePicture?: boolean;
}

export interface ContentPackage {
  type: 'instagram-post' | 'instagram-reel' | 'tiktok' | 'tweet' | 'youtube' | 'other';
  description: string;
  price: number;
}

export interface PaymentMethod {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

interface SignupData {
  // Step 0: Username
  username: string;
  
  // Step 1: Basic Info
  name: string;
  email: string;
  password: string;
  brandName: string;
  
  // Step 2: OTP Verification
  isVerified: boolean;
  
  // Step 3: Location
  location: string;
  
  // Step 4: Title/Summary
  title: string;
  
  // Step 5: Bio/Description
  bio: string;
  
  // Step 6: Gender
  gender: Gender | null;
  
  // Step 7: Social Channels
  socialProfiles: SocialProfile[];
  
  // Step 8: Content Categories
  contentCategories: Category[];
  
  // Step 9: Content Images
  contentImages: ContentImage[];
  
  // Step 10: Content Packages
  contentPackages: ContentPackage[];
  
  // Step 11: Mobile Verification
  phoneNumber: string;
  countryCode: string;
  phoneVerified: boolean;
  
  // Step 12: Payment Method
  paymentMethod: PaymentMethod | null;
  
  // For business side
  industry: Industry | null;
  categories: Category[];
  platforms: Platform[];
  contentVolume: ContentVolume | null;
  budget: Budget | null;
}

interface SignupContextType {
  currentStep: number;
  totalSteps: number;
  signupData: SignupData;
  setCurrentStep: (step: number) => void;
  updateSignupData: (data: Partial<SignupData>) => void;
  resetSignup: () => void;
}

const initialSignupData: SignupData = {
  username: '',
  name: '',
  email: '',
  password: '',
  brandName: '',
  isVerified: false,
  location: '',
  title: '',
  bio: '',
  gender: null,
  socialProfiles: [],
  contentCategories: [],
  contentImages: [],
  contentPackages: [],
  phoneNumber: '',
  countryCode: '+1',
  phoneVerified: false,
  paymentMethod: null,
  industry: null,
  categories: [],
  platforms: [],
  contentVolume: null,
  budget: null
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [signupData, setSignupData] = useState<SignupData>(initialSignupData);
  const totalSteps = 13; // 0-12 steps

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  const resetSignup = () => {
    setCurrentStep(0);
    setSignupData(initialSignupData);
  };

  return (
    <SignupContext.Provider value={{
      currentStep,
      totalSteps,
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
