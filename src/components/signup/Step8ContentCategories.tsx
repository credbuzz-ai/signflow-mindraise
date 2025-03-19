
import React, { useState } from 'react';
import { useSignup, Category } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SelectionCard from './SelectionCard';
import { useIsMobile } from '@/hooks/use-mobile';

const MAX_CATEGORIES = 5;

const categoryOptions: { id: Category; title: string }[] = [
  { id: 'fashion', title: 'Fashion' },
  { id: 'beauty', title: 'Beauty' },
  { id: 'travel', title: 'Travel' },
  { id: 'food-drink', title: 'Food & Drink' },
  { id: 'tech', title: 'Technology' },
  { id: 'finance', title: 'Finance' },
  { id: 'health', title: 'Health & Wellness' },
  { id: 'education', title: 'Education' },
  { id: 'entertainment', title: 'Entertainment' },
  { id: 'sports', title: 'Sports & Fitness' },
];

const Step8ContentCategories: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(signupData.contentCategories);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const toggleCategory = (category: Category) => {
    const currentCategories = [...categories];
    const categoryIndex = currentCategories.indexOf(category);
    
    if (categoryIndex > -1) {
      // Remove if already selected
      currentCategories.splice(categoryIndex, 1);
      setCategories(currentCategories);
    } else {
      // Add if not at maximum
      if (currentCategories.length < MAX_CATEGORIES) {
        setCategories([...currentCategories, category]);
      } else {
        toast({
          title: `You can select up to ${MAX_CATEGORIES} categories`,
          description: "Please deselect a category before selecting a new one",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = () => {
    if (categories.length === 0) {
      toast({
        title: "Please select at least one category",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      updateSignupData({ contentCategories: categories });
      setCurrentStep(9);
      setIsLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    setCurrentStep(7);
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Select up to {MAX_CATEGORIES} categories that best describe your content.
      </p>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mb-6`}>
        {categoryOptions.map((option) => (
          <SelectionCard
            key={option.id}
            id={option.id}
            title={option.title}
            isSelected={categories.includes(option.id)}
            onClick={() => toggleCategory(option.id)}
            maxWidth="max-w-full"
            className="h-full"
          />
        ))}
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
          disabled={isLoading || categories.length === 0}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step8ContentCategories;
