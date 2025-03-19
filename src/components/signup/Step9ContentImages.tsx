
import React, { useState } from 'react';
import { useSignup, ContentImage } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, X, CheckCircle2, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MIN_IMAGES = 3;
const MAX_IMAGES = 10;

const Step9ContentImages: React.FC = () => {
  const { signupData, updateSignupData, resetSignup } = useSignup();
  const { toast } = useToast();
  const [images, setImages] = useState<ContentImage[]>(signupData.contentImages);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageIndex, setProfileImageIndex] = useState<number | null>(
    images.findIndex(img => img.isProfilePicture) !== -1 
      ? images.findIndex(img => img.isProfilePicture) 
      : null
  );
  const isMobile = useIsMobile();

  // For demo purposes, we'll use placeholder images
  const placeholderImages = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ];

  const handleAddImage = () => {
    if (images.length >= MAX_IMAGES) {
      toast({
        title: `Maximum ${MAX_IMAGES} images allowed`,
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would open a file picker
    // For demo, we'll just add a placeholder image
    const newImage = { url: placeholderImages[Math.floor(Math.random() * placeholderImages.length)] };
    setImages([...images, newImage]);
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
    
    // Simulate API call
    setTimeout(() => {
      updateSignupData({ contentImages: images });
      setIsLoading(false);
      
      toast({
        title: "Registration complete!",
        description: "Your creator profile has been set up successfully."
      });
      
      // Here you would typically redirect to the dashboard
      console.log('Signup data:', signupData);
      
      // For demo purposes, reset the signup
      resetSignup();
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleGoBack = () => {
    updateSignupData({ contentImages: images });
    window.location.href = '/dashboard';
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="flex items-center p-4 rounded-lg bg-blue-50 text-blue-700 text-sm mb-4">
          <Info className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Upload at least {MIN_IMAGES} images, including 1 profile picture. You can add up to {MAX_IMAGES} images total.</p>
        </div>
        
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
          {isLoading ? "Completing Sign-up..." : "Complete Sign-up"}
        </Button>
      </div>
    </div>
  );
};

export default Step9ContentImages;
