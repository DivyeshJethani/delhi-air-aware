import { useState } from "react";
import { MapPin, Droplets, Wind, Eye, Thermometer } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const REGIONS = [
  { name: "Anand Vihar", aqi: 312, category: "hazardous" },
  { name: "Connaught Place", aqi: 189, category: "unhealthy" },
  { name: "Dwarka", aqi: 224, category: "very-unhealthy" },
  { name: "Gurgaon", aqi: 167, category: "unhealthy" },
  { name: "Noida Sector 62", aqi: 241, category: "very-unhealthy" },
  { name: "Rohini", aqi: 198, category: "very-unhealthy" },
  { name: "Lodhi Road", aqi: 142, category: "unhealthy" },
  { name: "Faridabad", aqi: 278, category: "very-unhealthy" },
  { name: "Greater Noida", aqi: 256, category: "very-unhealthy" },
  { name: "Pitampura", aqi: 203, category: "very-unhealthy" },
];

const WEEK_DATA = [
  { day: "Mon", aqi: 180 },
  { day: "Tue", aqi: 210 },
  { day: "Wed", aqi: 195 },
  { day: "Thu", aqi: 240 },
  { day: "Fri", aqi: 218 },
  { day: "Sat", aqi: 175 },
  { day: "Sun", aqi: 160 },
];

const POLLUTANTS = [
  { name: "PM2.5", value: 145, unit: "μg/m³", icon: Wind, max: 250 },
  { name: "PM10", value: 198, unit: "μg/m³", icon: Droplets, max: 300 },
  { name: "NO₂", value: 87, unit: "ppb", icon: Eye, max: 200 },
  { name: "SO₂", value: 32, unit: "ppb", icon: Thermometer, max: 100 },
];

function getAqiClass(cat: string) {
  const map: Record<string, string> = {
    good: "aqi-good",
    moderate: "aqi-moderate",
    unhealthy: "aqi-unhealthy",
    "very-unhealthy": "aqi-very-unhealthy",
    hazardous: "aqi-hazardous",
  };
  return map[cat] ?? "aqi-moderate";
}

function getAqiLabel(cat: string) {
  return cat.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-sm">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-primary">AQI: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function AQIDashboard() {
  const [selected, setSelected] = useState(REGIONS[1]);

  return (
    <section id="dashboard" className="py-24 relative">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "hsl(199 80% 48%)" }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Live Data</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Real-Time <span className="gradient-text">AQI Dashboard</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Monitor air quality across Delhi NCR regions with live pollutant breakdowns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Region selector */}
          <div className="glass-card rounded-2xl p-4 lg:col-span-1">
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Select Region
            </h3>
            <div className="flex flex-col gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r.name}
                  onClick={() => setSelected(r)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selected.name === r.name
                      ? "bg-primary/20 border border-primary/40 text-primary"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{r.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getAqiClass(r.category)}`}>
                    {r.aqi}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main AQI display + pollutants */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Big AQI number */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm font-medium mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> {selected.name}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-display text-8xl font-bold leading-none ${
                        selected.category === "hazardous" ? "text-aqi-hazardous" :
                        selected.category === "very-unhealthy" ? "text-aqi-very-unhealthy" :
                        selected.category === "unhealthy" ? "text-aqi-unhealthy" :
                        selected.category === "moderate" ? "text-aqi-moderate" : "text-aqi-good"
                      }`}
                      style={{ textShadow: "0 0 40px currentColor" }}
                    >
                      {selected.aqi}
                    </span>
                    <div>
                      <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${getAqiClass(selected.category)}`}>
                        {getAqiLabel(selected.category)}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">AQI Index</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-3">
                    {selected.aqi > 300
                      ? "⚠️ Hazardous — Avoid outdoor activities. Wear N95 mask."
                      : selected.aqi > 200
                      ? "🔴 Very Unhealthy — Limit outdoor exposure. Use air purifiers."
                      : "🟠 Unhealthy — Sensitive groups should stay indoors."}
                  </p>
                </div>
                {/* AQI gauge visual */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke={selected.category === "hazardous" ? "hsl(var(--aqi-hazardous))" :
                        selected.category === "very-unhealthy" ? "hsl(var(--aqi-very-unhealthy))" :
                        selected.category === "unhealthy" ? "hsl(var(--aqi-unhealthy))" :
                        "hsl(var(--aqi-moderate))"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(selected.aqi / 500) * 251} 251`}
                      style={{ filter: "drop-shadow(0 0 6px currentColor)" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-medium text-center leading-tight">
                      {Math.round((selected.aqi / 500) * 100)}%<br />
                      <span className="text-[10px]">of max</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pollutant cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {POLLUTANTS.map(({ name, value, unit, icon: Icon, max }) => (
                <div key={name} className="glass-card rounded-xl p-4">
                  <Icon className="w-4 h-4 text-secondary mb-2" />
                  <p className="text-xl font-bold font-display text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{name}</p>
                  <p className="text-[10px] text-muted-foreground">{unit}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(value / max) * 100}%`,
                        background: value / max > 0.7 ? "hsl(var(--aqi-very-unhealthy))" : "hsl(var(--secondary))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 7-day trend */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                7-Day AQI Trend — {selected.name}
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={WEEK_DATA}>
                  <defs>
                    <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199 80% 48%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(199 80% 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} domain={[100, 300]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="aqi" stroke="hsl(199 80% 48%)" strokeWidth={2} fill="url(#aqiGrad)" dot={{ fill: "hsl(199 80% 48%)", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
