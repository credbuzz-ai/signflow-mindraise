
import React, { useState } from 'react';
import { useSignup, Platform, SocialProfile, FollowerRange } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft, Plus, Trash2, Instagram, Youtube, Twitter, Twitch, Link, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const platformOptions: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: 'instagram', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
  { id: 'tiktok', label: 'TikTok', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.321 5.562a5.124 5.124 0 0 1-3.414-2.276 5.124 5.124 0 0 1-.731-2.584h-3.522v12.93c0 1.357-1.045 2.422-2.422 2.422a2.422 2.422 0 0 1 0-4.844c.134 0 .268.11.391.033v-3.522a5.943 5.943 0 0 0-.391-.011 5.944 5.944 0 1 0 5.944 5.944v-6.167c1.445.8 3.12 1.29 4.9 1.29v-3.215c-.245.011-.49.022-.755 0Z" /></svg> },
  { id: 'twitter', label: 'Twitter/X', icon: <Twitter className="h-4 w-4" /> },
  { id: 'youtube', label: 'YouTube', icon: <Youtube className="h-4 w-4" /> },
  { id: 'twitch', label: 'Twitch', icon: <Twitch className="h-4 w-4" /> },
  { id: 'amazon', label: 'Amazon', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.42 14.24c-.51-.51-1.11-.95-1.74-1.33v-.15c.43-.3.96-.54 1.46-.87.74-.45 1.42-.92 1.93-1.5.51-.58.82-1.29.82-2.07 0-.64-.22-1.24-.57-1.77-.36-.53-.89-.97-1.5-1.32-1.25-.7-2.85-1.05-4.33-1.05h-7.5c-.64 0-.97.32-.97.97v15.72c0 .71.32.97.97.97h7.76c1.54 0 3.27-.34 4.62-1.05.68-.36 1.29-.85 1.74-1.44s.7-1.32.7-2.07c0-1.03-.47-1.99-1.39-2.91zm-8.74-7.53l1.87-.08c.9 0 1.88.08 2.62.45.36.15.68.38.89.7.22.3.32.68.32 1.05 0 .51-.19.89-.51 1.2-.3.3-.68.53-1.11.7-.9.38-1.87.45-2.85.45l-1.24-.08v-4.39zm5.8 10.44c-.38.38-.85.68-1.39.85-.98.36-2.07.45-3.12.38l-1.31-.15v-5.15l1.54-.08c1.11 0 2.3.08 3.35.53.43.15.83.45 1.16.83.3.38.49.85.49 1.39s-.21 1.03-.72 1.4zM21.1 19.15c.22.38.45.7.45 1.24 0 .45-.15.78-.45 1.05-.3.3-.7.45-1.05.45s-.77-.15-1.05-.45c-.3-.3-.45-.7-.45-1.05 0-.38.15-.7.45-1.02.3-.3.7-.45 1.05-.45.38-.01.75.14 1.05.23z" /></svg> },
  { id: 'website', label: 'Website', icon: <Link className="h-4 w-4" /> },
];

const followerRangeOptions: { value: FollowerRange; label: string }[] = [
  { value: 'under-1k', label: 'Under 1,000' },
  { value: '1k-5k', label: '1,000 - 5,000' },
  { value: '5k-10k', label: '5,000 - 10,000' },
  { value: '10k-50k', label: '10,000 - 50,000' },
  { value: '50k-100k', label: '50,000 - 100,000' },
  { value: '100k-500k', label: '100,000 - 500,000' },
  { value: '500k-1m', label: '500,000 - 1,000,000' },
  { value: 'over-1m', label: 'Over 1,000,000' },
];

const Step7SocialProfiles: React.FC = () => {
  const { signupData, updateSignupData, setCurrentStep } = useSignup();
  const { toast } = useToast();
  const [socialProfiles, setSocialProfiles] = useState<SocialProfile[]>(
    signupData.socialProfiles.length > 0 ? signupData.socialProfiles : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [newProfile, setNewProfile] = useState<SocialProfile>({
    platform: 'instagram',
    url: '',
    followers: 'under-1k'
  });

  const handleAddProfile = () => {
    if (!newProfile.url) {
      toast({
        title: "Please enter a URL",
        variant: "destructive"
      });
      return;
    }
    
    if (!isValidUrl(newProfile.url)) {
      toast({
        title: "Please enter a valid URL",
        description: "URL must start with http:// or https://",
        variant: "destructive"
      });
      return;
    }

    const existingPlatform = socialProfiles.find(profile => profile.platform === newProfile.platform);
    if (existingPlatform) {
      toast({
        title: "Platform already added",
        description: "You've already added this platform",
        variant: "destructive"
      });
      return;
    }

    setSocialProfiles([...socialProfiles, { ...newProfile }]);
    setNewProfile({
      platform: 'instagram',
      url: '',
      followers: 'under-1k'
    });
  };

  const handleRemoveProfile = (index: number) => {
    const updatedProfiles = [...socialProfiles];
    updatedProfiles.splice(index, 1);
    setSocialProfiles(updatedProfiles);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = () => {
    updateSignupData({ socialProfiles });
    setCurrentStep(8);
  };

  const handleGoBack = () => {
    setCurrentStep(6);
  };

  const getPlatformIcon = (platform: Platform) => {
    return platformOptions.find(option => option.id === platform)?.icon || <Link className="h-4 w-4" />;
  };

  return (
    <div>
      <div className="space-y-6 mb-6">
        <div className="space-y-4">
          <div className="p-4 border rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-2">
                <Label htmlFor="platform">Platform</Label>
                <Select 
                  value={newProfile.platform} 
                  onValueChange={(value) => setNewProfile({...newProfile, platform: value as Platform})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platformOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        <div className="flex items-center">
                          {option.icon}
                          <span className="ml-2">{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="followers">Followers</Label>
                <Select 
                  value={newProfile.followers || ''} 
                  onValueChange={(value) => setNewProfile({...newProfile, followers: value as FollowerRange})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {followerRangeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-1 flex items-end">
                <Button 
                  type="button" 
                  onClick={handleAddProfile}
                  className="w-full"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="url">Profile URL</Label>
              <Input
                id="url"
                type="url"
                value={newProfile.url}
                onChange={(e) => setNewProfile({...newProfile, url: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </div>
          
          {socialProfiles.length > 0 && (
            <div className="space-y-2">
              <Label>Your social profiles</Label>
              <div className="space-y-2">
                {socialProfiles.map((profile, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg group hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full mr-3">
                        {getPlatformIcon(profile.platform)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {platformOptions.find(p => p.id === profile.platform)?.label}
                          {profile.followers && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({followerRangeOptions.find(f => f.value === profile.followers)?.label})
                            </span>
                          )}
                        </div>
                        <a 
                          href={profile.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center"
                        >
                          {profile.url.replace(/^https?:\/\//, '')}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProfile(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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

export default Step7SocialProfiles;
