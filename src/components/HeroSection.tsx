import heroDelhiImg from "@/assets/hero-delhi.jpg";
import { ArrowRight, Wind, Activity, Shield } from "lucide-react";

const LIVE_AQI = 218;
const aqiLabel = "Very Unhealthy";
const aqiClass = "aqi-very-unhealthy";

const stats = [
  { icon: Wind, label: "AQI Level", value: "218", unit: "PM2.5" },
  { icon: Activity, label: "Health Risk", value: "High", unit: "Alert" },
  { icon: Shield, label: "Safe Hours", value: "6–8 AM", unit: "Today" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroDelhiImg}
          alt="Delhi skyline with smog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "hsl(158 64% 42% / 0.4)" }} />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "hsl(199 80% 48% / 0.5)" }} />

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Live AQI chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border glass-card mb-6 animate-fade-in-up">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(var(--aqi-very-unhealthy))" }} />
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: "hsl(var(--aqi-very-unhealthy))" }} />
            </span>
            <span className="text-sm font-medium text-muted-foreground">Live Delhi AQI:</span>
            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${aqiClass}`}>{LIVE_AQI} – {aqiLabel}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Breathe Better.
            <br />
            <span className="gradient-text text-glow-green">Live Smarter.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            AI-powered AQI insights tailored for Delhi NCR residents. Get personalized health
            recommendations, clean routes, and real-time pollution data — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#ai-advisor"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-primary-foreground font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow-green)" }}
            >
              Get AI Health Advice <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border glass-card hover:border-primary/50 transition-all duration-300"
            >
              View Live Dashboard
            </a>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {stats.map(({ icon: Icon, label, value, unit }) => (
              <div key={label} className="glass-card rounded-xl p-4 text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold font-display text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xs text-primary font-medium">{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs font-medium">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
