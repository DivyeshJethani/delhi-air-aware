import { Wind, Twitter, Github, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const LINKS = {
  Features: ["AQI Dashboard", "AI Health Advisor", "Vehicle Calculator", "Route Finder", "Trend Analytics"],
  Regions: ["Anand Vihar", "Dwarka", "Gurgaon", "Noida", "Faridabad"],
  Resources: ["Air Quality Guide", "Health Tips", "Community Forum", "API Docs", "About Us"],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Wind className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="gradient-text">BreathSafe</span>
                <span className="text-foreground"> Delhi</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AI-powered air quality intelligence for Delhi NCR residents. Breathe better, live smarter.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground bg-white">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground bg-white">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground bg-white">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">{group}</h4>
              <ul className="flex flex-col gap-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AQI Scale reference */}
        <div className="glass-card rounded-xl p-4 mb-8 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-3">AQI Reference Scale</p>
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: "Good", range: "0–50", cls: "aqi-good" },
              { label: "Moderate", range: "51–100", cls: "aqi-moderate" },
              { label: "Unhealthy", range: "101–200", cls: "aqi-unhealthy" },
              { label: "Very Unhealthy", range: "201–300", cls: "aqi-very-unhealthy" },
              { label: "Hazardous", range: "300+", cls: "aqi-hazardous" },
            ].map(({ label, range, cls }) => (
              <div key={label} className={`${cls} rounded-lg px-2 py-2 text-center`}>
                <p className="text-[10px] font-bold">{label}</p>
                <p className="text-[9px] opacity-80">{range}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2025 BreathSafe Delhi. Made with <Heart className="w-3 h-3 inline text-primary" /> for a cleaner Delhi NCR.
          </p>
          <p className="text-xs text-muted-foreground">
            Data for educational purposes. Always consult medical professionals for health decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
