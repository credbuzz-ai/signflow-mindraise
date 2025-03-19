
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Handshake,
  ShieldCheck,
  CreditCard,
  Search,
  FileChartColumn,
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ForBusiness = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const features = [
    {
      icon: <Handshake className="h-6 w-6 text-ai-orange" />,
      title: "Seamless Outreach",
      description: "Connect directly with influencers, no middleman required."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-ai-orange" />,
      title: "Secure Bidding System",
      description: "Attract top KOLs with transparent bids."
    },
    {
      icon: <PieChart className="h-6 w-6 text-ai-orange" />,
      title: "Quality Assurance",
      description: "Payments released only after engagement metrics are verified."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-ai-orange" />,
      title: "Flexible Payment Options",
      description: "Pay in tokens, stablecoins or traditional currency."
    },
    {
      icon: <Search className="h-6 w-6 text-ai-orange" />,
      title: "Insight-driven Recommendations",
      description: "Get matched with the perfect influencers for your specific needs."
    },
    {
      icon: <FileChartColumn className="h-6 w-6 text-ai-orange" />,
      title: "Performance Analytics",
      description: "Track how your campaign performed and what was the ROI."
    }
  ];

  const requestDemo = () => {
    window.open(import.meta.env.VITE_CALENDLY_URL, "_blank");
  };

  return (
    <section id="for-business" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-ai-darkOrange/30 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-ai-orange/30 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-gradient">For Business</span>
          </h2>
          <p className="text-lg md:text-xl text-ai-dark/70 max-w-3xl mx-auto">
            Transform your marketing with direct access to key opinion leaders.
            Our platform removes barriers and maximizes ROI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8 mb-16">
          {features.map((feature, index) => (
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
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-ai-dark">{feature.title}</h3>
              <p className="text-ai-dark/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-3xl mx-auto bg-gradient-to-r from-white via-ai-lightOrange/30 to-white py-10 px-8 rounded-2xl shadow-sm border border-ai-orange/10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-ai-dark">Ready to Transform Your Marketing?</h3>
          <p className="text-ai-dark/80 mx-auto mb-8 text-base md:text-lg">
            See how our platform can help you connect with the right influencers and boost your marketing ROI.
          </p>
          <Button 
            className="bg-gradient-signup hover:opacity-90 text-white px-8 py-6 rounded-lg h-auto text-lg font-medium group"
            onClick={requestDemo}
          >
            Schedule a Business Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ForBusiness;
