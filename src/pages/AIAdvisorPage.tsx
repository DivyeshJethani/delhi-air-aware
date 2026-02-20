import { Link } from "react-router-dom";
import { Wind, ArrowLeft } from "lucide-react";
import AIAdvisor from "@/components/AIAdvisor";

export default function AIAdvisorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simple top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 nav-glass">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wind className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              <span className="gradient-text">BreathSafe</span>
              <span className="text-foreground"> Delhi</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="pt-16">
        {/* Page hero */}
        <div className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-6 py-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-primary text-xs font-semibold uppercase tracking-wider">AI Powered Health Advisor</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Personalized <span className="gradient-text">Health Recommendations</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enter your profile below and receive tailored AQI survival strategies based on your age, region, and health conditions — specific to Delhi NCR.
            </p>
          </div>
        </div>

        {/* AIAdvisor component */}
        <AIAdvisor />
      </main>

      {/* Mini footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 BreathSafe Delhi · Data for educational purposes. Always consult medical professionals for health decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}
