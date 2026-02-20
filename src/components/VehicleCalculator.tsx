import { useState } from "react";
import { Car, Bike, Truck, Plus, Minus, TrendingDown, Leaf, AlertTriangle } from "lucide-react";

type VehicleType = {
  type: string;
  icon: typeof Car;
  co2PerKm: number;
  label: string;
  color: string;
};

const VEHICLES: VehicleType[] = [
  { type: "car", icon: Car, co2PerKm: 192, label: "Cars (Petrol/Diesel)", color: "hsl(var(--aqi-very-unhealthy))" },
  { type: "bike", icon: Bike, co2PerKm: 103, label: "Two-Wheelers", color: "hsl(var(--aqi-unhealthy))" },
  { type: "truck", icon: Truck, co2PerKm: 430, label: "Heavy Vehicles", color: "hsl(var(--aqi-hazardous))" },
];

const STRATEGIES = [
  { icon: "🚇", title: "Switch to Metro", desc: "Delhi Metro covers 350+ km. Saves 4–8 kg CO₂ per commute.", saving: "80%" },
  { icon: "🚲", title: "Cycle Lanes", desc: "Use dedicated cycle tracks near South Delhi & Dwarka sectors.", saving: "100%" },
  { icon: "⚡", title: "Go Electric", desc: "Delhi EV policy offers ₹1.5L subsidy on electric vehicles.", saving: "70%" },
  { icon: "🤝", title: "Carpooling", desc: "Share rides via QuickRide or Bhola. Halve your emission instantly.", saving: "50%" },
];

export default function VehicleCalculator() {
  const [counts, setCounts] = useState<Record<string, number>>({ car: 1, bike: 1, truck: 0 });
  const [kmPerDay, setKmPerDay] = useState(25);

  const totalCO2Daily = VEHICLES.reduce((sum, v) => sum + counts[v.type] * v.co2PerKm * kmPerDay / 1000, 0);
  const totalCO2Yearly = totalCO2Daily * 365;
  const aqiImpact = Math.round(totalCO2Daily * 8);

  const adjust = (type: string, delta: number) => {
    setCounts(prev => ({ ...prev, [type]: Math.max(0, (prev[type] || 0) + delta) }));
  };

  return (
    <section id="vehicle" className="py-24 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 mb-4">
            <Car className="w-3 h-3 text-orange-500" />
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Vehicle Impact</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Vehicle <span className="gradient-text">Impact Calculator</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Understand your household's CO₂ contribution and discover smarter alternatives.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Calculator input */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-foreground">Your Vehicles</h3>

            {VEHICLES.map(({ type, icon: Icon, label, color }) => (
              <div key={type} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => adjust(type, -1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus className="w-3 h-3 text-foreground" />
                  </button>
                  <span className="w-6 text-center font-bold text-foreground font-display">{counts[type]}</span>
                  <button onClick={() => adjust(type, 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus className="w-3 h-3 text-foreground" />
                  </button>
                </div>
              </div>
            ))}

            {/* Daily km */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-muted-foreground">Daily Travel Distance</label>
                <span className="text-primary font-bold text-sm">{kmPerDay} km</span>
              </div>
              <input
                type="range" min="5" max="150" step="5"
                value={kmPerDay}
                onChange={e => setKmPerDay(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "hsl(var(--primary))" }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 km</span><span>150 km</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            {/* CO2 output */}
            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-5">Your Estimated Emissions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold font-display text-foreground">{totalCO2Daily.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">kg CO₂ / day</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                  <TrendingDown className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold font-display text-foreground">{(totalCO2Yearly / 1000).toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">tonnes CO₂ / year</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl border border-red-200 bg-red-50">
                <p className="text-xs text-center text-foreground">
                  Your vehicles contribute approx. <span className="text-red-600 font-bold">+{aqiImpact} AQI points</span> to your area daily
                </p>
              </div>
            </div>

            {/* Emission bars */}
            <div className="glass-card rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Emission Breakdown</h4>
              {VEHICLES.map(({ type, label, co2PerKm, color }) => {
                const val = counts[type] * co2PerKm * kmPerDay / 1000;
                const pct = totalCO2Daily > 0 ? (val / totalCO2Daily) * 100 : 0;
                return (
                  <div key={type} className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{label}</span>
                      <span className="font-bold" style={{ color }}>{val.toFixed(2)} kg</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategies */}
            <div className="glass-card rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" /> Reduction Strategies
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {STRATEGIES.map(({ icon, title, desc, saving }) => (
                  <div key={title} className="bg-muted/40 rounded-lg p-3 border border-border hover:border-primary/30 transition-colors">
                    <span className="text-lg">{icon}</span>
                    <p className="text-xs font-semibold text-foreground mt-1">{title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{desc}</p>
                    <p className="text-xs text-primary font-bold mt-1">-{saving} emissions</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
