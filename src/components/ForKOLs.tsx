
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter, Shield, Wallet, BarChart, Trophy } from "lucide-react";
import KOLApplicationForm from "./KOLApplicationForm";
import { cn } from "@/lib/utils";

const ForKOLs = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const benefits = [
    {
      icon: <Trophy className="h-6 w-6 text-ai-orange" />,
      title: "Streamlined Deal Flow",
      description: "Receive and evaluate legitimate partnership offers"
    },
    {
      icon: <Filter className="h-6 w-6 text-ai-orange" />,
      title: "Reduced Inbox Noise",
      description: "Filter out spam and low-quality requests"
    },
    {
      icon: <Shield className="h-6 w-6 text-ai-orange" />,
      title: "Secure Payments",
      description: "Smart contract-driven settlements protect your interests"
    },
    {
      icon: <Wallet className="h-6 w-6 text-ai-orange" />,
      title: "Privacy Protection",
      description: "Keep your payment wallets anonymous and secure"
    },
    {
      icon: <BarChart className="h-6 w-6 text-ai-orange" />,
      title: "Performance Metrics",
      description: "Build your reputation with verified engagement data"
    },
    {
      icon: <Trophy className="h-6 w-6 text-ai-orange" />,
      title: "Improve Visibility",
      description: "Get more visibility through CRED Leaderboard"
    }
  ];

  return (
    <section id="for-kols" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-ai-darkOrange/30 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-ai-orange/30 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-gradient">For Key Opinion Leaders</span>
          </h2>
          <p className="text-lg md:text-xl text-ai-dark/70 max-w-3xl mx-auto">
            Amplify your influence and engage your audience more effectively with 
            AI-powered tools designed for KOLs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col p-6 rounded-xl transition-all duration-300 card-gradient-hover border border-gray-100 shadow-sm hover:shadow-md",
                hoveredCard === index ? "scale-105" : ""
              )}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-ai-lightOrange rounded-lg mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-ai-dark">{benefit.title}</h3>
              <p className="text-ai-dark/70">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-3xl mx-auto bg-gradient-to-r from-white via-ai-lightOrange/30 to-white py-10 px-8 rounded-2xl shadow-sm border border-ai-orange/10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-ai-dark">Join Our KOL Network</h3>
          <p className="text-ai-dark/80 mx-auto mb-8 text-base md:text-lg">
            Connect with other influencers and gain exclusive access to our premium AI tools 
            designed specifically for key opinion leaders.
          </p>
          <Button 
            className="bg-gradient-signup hover:opacity-90 text-white px-8 py-6 rounded-lg h-auto text-lg font-medium group"
            onClick={() => setIsApplicationOpen(true)}
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      <KOLApplicationForm 
        open={isApplicationOpen} 
        onOpenChange={setIsApplicationOpen} 
      />
    </section>
  );
};

export default ForKOLs;
