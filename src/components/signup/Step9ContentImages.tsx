
import React, { useState, useRef } from 'react';
import { useSignup, ContentImage } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Upload, X, CheckCircle2, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MIN_IMAGES = 3;
const MAX_IMAGES = 10;

const Step9ContentImages: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [images, setImages] = useState<ContentImage[]>(signupData.contentImages);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageIndex, setProfileImageIndex] = useState<number | null>(
    images.findIndex(img => img.isProfilePicture) !== -1 
      ? images.findIndex(img => img.isProfilePicture) 
      : null
  );
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // For demo purposes, we'll convert uploaded files to Data URLs
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const filesArray = Array.from(e.target.files);
    const validFiles = filesArray.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload image files only",
        variant: "destructive"
      });
      return;
    }
    
    if (images.length + validFiles.length > MAX_IMAGES) {
      toast({
        title: `You can only upload a maximum of ${MAX_IMAGES} images`,
        variant: "destructive"
      });
      return;
    }

    // Convert files to data URLs and add to images state
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          setImages(prev => [...prev, { url: dataUrl }]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Clear the file input to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    
    // Adjust profile picture index if necessary
    if (profileImageIndex === index) {
      setProfileImageIndex(null);
    } else if (profileImageIndex !== null && profileImageIndex > index) {
      setProfileImageIndex(profileImageIndex - 1);
    }
    
    setImages(newImages);
  };

  const handleSetProfilePicture = (index: number) => {
    const newImages = [...images];
    
    // Remove profile picture flag from all images
    newImages.forEach(img => img.isProfilePicture = false);
    
    // Set the new profile picture
    newImages[index].isProfilePicture = true;
    
    setImages(newImages);
    setProfileImageIndex(index);
  };

  const handleSubmit = () => {
    if (images.length < MIN_IMAGES) {
      toast({
        title: `Please add at least ${MIN_IMAGES} images`,
        variant: "destructive"
      });
      return;
    }

    if (profileImageIndex === null) {
      toast({
        title: "Please select a profile picture",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      updateSignupData({ contentImages: images });
      setIsLoading(false);
      setCurrentStep(10);
    }, 500);
  };

  const handleGoBack = () => {
    updateSignupData({ contentImages: images });
    setCurrentStep(8);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="flex items-center p-4 rounded-lg bg-blue-50 text-blue-700 text-sm mb-4">
          <Info className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Upload at least {MIN_IMAGES} images, including 1 profile picture. You can add up to {MAX_IMAGES} images total.</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative group aspect-square rounded-lg overflow-hidden border-2 ${
                profileImageIndex === index ? 'border-green-500' : 'border-gray-200'
              }`}
            >
              <img 
                src={image.url} 
                alt={`Content ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                {profileImageIndex !== index && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetProfilePicture(index)}
                    className="mb-2 bg-white text-xs"
                  >
                    Set as Profile
                  </Button>
                )}
                
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
              
              {profileImageIndex === index && (
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {images.length < MAX_IMAGES && (
            <button
              onClick={handleAddImage}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Upload Image</span>
            </button>
          )}
        </div>
        
        {profileImageIndex === null && images.length > 0 && (
          <p className="text-amber-600 text-sm">Please select one image as your profile picture</p>
        )}
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
          disabled={isLoading || images.length < MIN_IMAGES || profileImageIndex === null}
          className="flex-1 bg-gradient-signup hover:opacity-90"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Step9ContentImages;
