import { useState } from "react";
import { Navigation, TreePine, AlertTriangle, CheckCircle2 } from "lucide-react";
import cleanZoneImg from "@/assets/clean-zone.jpg";

const AREAS = [
  { name: "Lodhi Garden", type: "green", aqi: 82, category: "moderate", desc: "344-acre heritage garden, best for morning walks" },
  { name: "Sanjay Van", type: "green", aqi: 74, category: "moderate", desc: "Dense forest, ideal for cycling & nature walks" },
  { name: "Central Park, CP", type: "green", aqi: 110, category: "unhealthy", desc: "Shaded paths in central Delhi" },
  { name: "Deer Park, Hauz Khas", type: "green", aqi: 88, category: "moderate", desc: "Lake-side walking, deer sanctuary" },
  { name: "Garden of Five Senses", type: "green", aqi: 95, category: "moderate", desc: "Saket, fragrant garden with wide paths" },
];

const ROUTES = [
  {
    from: "Dwarka", to: "Connaught Place",
    cleanRoute: "Metro Blue Line → Green Park exit → DLF walk",
    cleanAqi: 142,
    regularAqi: 210,
    time: "45 min", cleanTime: "52 min",
    savings: "32%",
  },
  {
    from: "Noida Sector 62", to: "Nehru Place",
    cleanRoute: "Metro Aqua Line → Blue Line → Surface walk via Ring Road",
    cleanAqi: 165,
    regularAqi: 240,
    time: "35 min", cleanTime: "48 min",
    savings: "31%",
  },
  {
    from: "Gurgaon", to: "South Ex",
    cleanRoute: "Rapid Metro → Delhi Metro Yellow Line → walk via Aurobindo Marg",
    cleanAqi: 130,
    regularAqi: 198,
    time: "40 min", cleanTime: "55 min",
    savings: "34%",
  },
  {
    from: "Rohini", to: "Karol Bagh",
    cleanRoute: "Metro Red Line → Green Line interchange → exit at Karol Bagh",
    cleanAqi: 155,
    regularAqi: 218,
    time: "30 min", cleanTime: "38 min",
    savings: "29%",
  },
];

function AqiBadge({ aqi }: { aqi: number }) {
  const cls = aqi < 100 ? "aqi-good" : aqi < 150 ? "aqi-moderate" : aqi < 200 ? "aqi-unhealthy" : "aqi-very-unhealthy";
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cls}`}>{aqi}</span>;
}

export default function RouteFinder() {
  const [selectedRoute, setSelectedRoute] = useState(0);

  return (
    <section id="routes" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Navigation className="w-3 h-3 text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">Clean Route Finder</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Breathe Easy on <span className="gradient-text">Every Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Discover low-pollution routes and green zones across Delhi NCR.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Route cards */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4 text-secondary" /> Low-Pollution Routes
            </h3>
            {ROUTES.map((r, i) => (
              <button
                key={i}
                onClick={() => setSelectedRoute(i)}
                className={`glass-card rounded-xl p-5 text-left transition-all duration-300 shadow-sm ${
                  selectedRoute === i ? "border-primary/40 bg-primary/5" : "hover:border-border hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {r.from} → {r.to}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">🚇 {r.cleanRoute}</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                    -{r.savings} AQI
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <AlertTriangle className="w-3 h-3 text-orange-400" />
                    <span>Regular: </span><AqiBadge aqi={r.regularAqi} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    <span>Clean: </span><AqiBadge aqi={r.cleanAqi} />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>🚗 Regular: {r.time}</span>
                  <span>🚇 Clean: {r.cleanTime}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Green zones + map visual */}
          <div className="flex flex-col gap-4">
            {/* Map placeholder with route overlay */}
            <div className="relative glass-card rounded-2xl overflow-hidden h-56 shadow-sm">
              <img src={cleanZoneImg} alt="Green zone Delhi" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display font-semibold text-white text-sm mb-1">
                  🗺️ {ROUTES[selectedRoute].from} → {ROUTES[selectedRoute].to}
                </p>
                <p className="text-xs text-green-300">{ROUTES[selectedRoute].cleanRoute}</p>
              </div>
              {/* Route dots visual */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <div className="w-16 h-0.5 bg-primary/60 border-t border-dashed border-primary" />
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <div className="w-8 h-0.5 bg-secondary/60 border-t border-dashed border-secondary" />
                <div className="w-3 h-3 rounded-full bg-secondary" />
              </div>
            </div>

            {/* Green zones */}
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <TreePine className="w-4 h-4 text-primary" /> Green Zones & Parks
            </h3>
            <div className="flex flex-col gap-2">
              {AREAS.map((a) => (
                <div key={a.name} className="glass-card-hover rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <TreePine className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                    <AqiBadge aqi={a.aqi} />
                    <span className="text-[10px] text-muted-foreground">AQI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
