
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow py-3 md:py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold gradient-text`}>Influencer Platform</h1>
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline" className="text-xs md:text-sm py-1 md:py-2 px-2 md:px-4">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-signup hover:opacity-90 text-xs md:text-sm py-1 md:py-2 px-2 md:px-4">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 signup-container">
        <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Find the perfect <span className="gradient-text">influencers</span> for your brand
          </h2>
          <p className="text-sm md:text-xl text-gray-600 max-w-2xl mb-6 md:mb-8">
            Connect with influencers that align with your brand values and reach your target audience effectively.
          </p>
          <Link to="/signup">
            <Button size={isMobile ? "default" : "lg"} className="bg-gradient-signup hover:opacity-90 text-sm md:text-lg px-6 md:px-8 py-2 md:py-6">
              Get Started
            </Button>
          </Link>
          
          <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 rounded-lg mb-3 md:mb-4 flex items-center justify-center mx-auto">
                <svg className="h-5 w-5 md:h-6 md:w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-base md:text-xl font-semibold mb-2">Find Influencers</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Discover and filter through thousands of influencers based on your brand needs.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-purple-100 rounded-lg mb-3 md:mb-4 flex items-center justify-center mx-auto">
                <svg className="h-5 w-5 md:h-6 md:w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-base md:text-xl font-semibold mb-2">Create Campaigns</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Launch effective influencer marketing campaigns with comprehensive tools.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-pink-100 rounded-lg mb-3 md:mb-4 flex items-center justify-center mx-auto">
                <svg className="h-5 w-5 md:h-6 md:w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3 className="text-base md:text-xl font-semibold mb-2">Track Performance</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Measure the impact of your campaigns with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-6 md:py-8 border-t">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm text-gray-500">
          <p>© 2023 Influencer Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
