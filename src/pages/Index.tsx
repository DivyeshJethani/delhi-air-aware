import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AQIDashboard from "@/components/AQIDashboard";
import AIAdvisor from "@/components/AIAdvisor";
import VehicleCalculator from "@/components/VehicleCalculator";
import RouteFinder from "@/components/RouteFinder";
import TrendAnalytics from "@/components/TrendAnalytics";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AQIDashboard />
        <AIAdvisor />
        <VehicleCalculator />
        <RouteFinder />
        <TrendAnalytics />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
