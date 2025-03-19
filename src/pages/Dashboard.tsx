
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
          <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold gradient-text`}>Influencer Dashboard</h1>
          <Button variant="outline" onClick={() => window.location.href = '/'} className="text-xs md:text-sm py-1 md:py-2">
            Logout
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="bg-white shadow rounded-lg p-4 md:p-6">
          <h2 className="text-base md:text-xl font-semibold mb-3 md:mb-4">Welcome to your dashboard!</h2>
          <p className="text-xs md:text-sm text-gray-600">
            Your account has been successfully created. This is a placeholder dashboard.
          </p>
          <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            <div className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
              <h3 className="text-sm md:text-base font-medium mb-1 md:mb-2">Your Profile</h3>
              <p className="text-xs md:text-sm text-gray-500">Complete your profile to get started</p>
            </div>
            <div className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
              <h3 className="text-sm md:text-base font-medium mb-1 md:mb-2">Find Influencers</h3>
              <p className="text-xs md:text-sm text-gray-500">Browse and connect with influencers</p>
            </div>
            <div className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
              <h3 className="text-sm md:text-base font-medium mb-1 md:mb-2">Create Campaign</h3>
              <p className="text-xs md:text-sm text-gray-500">Launch your first influencer campaign</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
