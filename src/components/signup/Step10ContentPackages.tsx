
import React, { useState } from 'react';
import { useSignup, ContentPackage } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, PackageCheck, Plus, Trash2 } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const packageTypes = [
  { id: 'instagram-post', label: 'Instagram Post' },
  { id: 'instagram-reel', label: 'Instagram Reel' },
  { id: 'tiktok', label: 'TikTok Video' },
  { id: 'tweet', label: 'Twitter/X Post' },
  { id: 'youtube', label: 'YouTube Video' },
  { id: 'other', label: 'Other Content' },
];

const DEFAULT_PACKAGE: ContentPackage = {
  type: 'instagram-post',
  description: '',
  price: 0
};

const Step10ContentPackages: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [packages, setPackages] = useState<ContentPackage[]>(
    signupData.contentPackages.length > 0 ? signupData.contentPackages : [{ ...DEFAULT_PACKAGE }]
  );
  const [isLoading, setIsLoading] = useState(false);

  const handlePackageChange = (index: number, field: keyof ContentPackage, value: any) => {
    const updatedPackages = [...packages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: field === 'price' ? (value === '' ? 0 : parseFloat(value)) : value
    };
    setPackages(updatedPackages);
  };

  const handleAddPackage = () => {
    setPackages([...packages, { ...DEFAULT_PACKAGE }]);
  };

  const handleRemovePackage = (index: number) => {
    if (packages.length === 1) {
      toast({
        title: "You need at least one package",
        description: "Please provide at least one content package offering",
        variant: "destructive"
      });
      return;
    }
    
    const updatedPackages = [...packages];
    updatedPackages.splice(index, 1);
    setPackages(updatedPackages);
  };

  const handleSubmit = () => {
    const isValid = packages.every(pkg => 
      pkg.description.trim() !== '' && 
      pkg.price > 0
    );

    if (!isValid) {
      toast({
        title: "Invalid packages",
        description: "Please ensure all packages have descriptions and valid prices",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      updateSignupData({ contentPackages: packages });
      setCurrentStep(11);
      setIsLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    updateSignupData({ contentPackages: packages });
    setCurrentStep(9);
  };

  return (
    <div>
      <div className="space-y-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">Content Packages</h3>
            <p className="text-sm text-gray-500">Add the content services you offer with pricing</p>
          </div>
          <Button
            type="button"
            onClick={handleAddPackage}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Package
          </Button>
        </div>

        {packages.map((pkg, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <PackageCheck className="h-5 w-5 text-ai-orange mr-2" />
                <span className="font-medium">Package {index + 1}</span>
              </div>
              {packages.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePackage(index)}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`package-type-${index}`}>Content Type</Label>
                <Select 
                  value={pkg.type}
                  onValueChange={(value) => handlePackageChange(index, 'type', value as any)}
                >
                  <SelectTrigger id={`package-type-${index}`}>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`package-price-${index}`}>Price ($)</Label>
                <Input
                  id={`package-price-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={pkg.price || ''}
                  onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`package-description-${index}`}>Description</Label>
                <Textarea
                  id={`package-description-${index}`}
                  value={pkg.description}
                  onChange={(e) => handlePackageChange(index, 'description', e.target.value)}
                  placeholder="Describe what's included in this package..."
                  rows={2}
                />
              </div>
            </div>
          </div>
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
          disabled={isLoading}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step10ContentPackages;
