import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, Calendar, AlertTriangle } from "lucide-react";

const MONTHLY_DATA = [
  { month: "Aug", aqi: 98, pm25: 52, pm10: 84 },
  { month: "Sep", aqi: 115, pm25: 68, pm10: 110 },
  { month: "Oct", aqi: 178, pm25: 110, pm10: 168 },
  { month: "Nov", aqi: 289, pm25: 198, pm10: 240 },
  { month: "Dec", aqi: 312, pm25: 218, pm10: 270 },
  { month: "Jan", aqi: 264, pm25: 180, pm10: 232 },
  { month: "Feb", aqi: 218, pm25: 145, pm10: 198 },
];

const WEEKLY_DATA = [
  { day: "Mon", morning: 210, afternoon: 180, evening: 245 },
  { day: "Tue", morning: 225, afternoon: 190, evening: 260 },
  { day: "Wed", morning: 195, afternoon: 165, evening: 230 },
  { day: "Thu", morning: 240, afternoon: 200, evening: 275 },
  { day: "Fri", morning: 218, afternoon: 185, evening: 250 },
  { day: "Sat", morning: 175, afternoon: 150, evening: 195 },
  { day: "Sun", morning: 160, afternoon: 140, evening: 180 },
];

const FORECAST = [
  { day: "Today", aqi: 218, risk: "High" },
  { day: "Tue", aqi: 195, risk: "High" },
  { day: "Wed", aqi: 240, risk: "Very High" },
  { day: "Thu", aqi: 268, risk: "Very High" },
  { day: "Fri", aqi: 225, risk: "High" },
  { day: "Sat", aqi: 180, risk: "Moderate" },
  { day: "Sun", aqi: 155, risk: "Moderate" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs border border-border">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const TABS = ["Monthly Trends", "Daily Pattern", "7-Day Forecast"];

export default function TrendAnalytics() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="trends" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: "hsl(199 80% 48%)" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <TrendingUp className="w-3 h-3 text-secondary" />
            <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Analytics</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Pollution <span className="gradient-text">Trend Analytics</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Historical patterns and AI-powered forecasts to plan your week.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-1 glass-card rounded-xl p-1">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Monthly Trends */}
          {activeTab === 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Monthly AQI & Pollutant Trends
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={MONTHLY_DATA}>
                  <defs>
                    <linearGradient id="aqiG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199 80% 48%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(199 80% 48%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="pm25G" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(158 64% 42%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(158 64% 42%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Area type="monotone" dataKey="aqi" name="AQI" stroke="hsl(199 80% 48%)" strokeWidth={2} fill="url(#aqiG)" />
                  <Area type="monotone" dataKey="pm25" name="PM2.5" stroke="hsl(158 64% 42%)" strokeWidth={2} fill="url(#pm25G)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 rounded-xl border border-aqi-very-unhealthy/30 bg-aqi-very-unhealthy/10 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-aqi-very-unhealthy flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Delhi NCR sees <strong className="text-foreground">3× worse air quality</strong> in Nov–Jan due to crop burning, diwali firecrackers, and cold trapping pollution near the ground.
                </p>
              </div>
            </div>
          )}

          {/* Daily Pattern */}
          {activeTab === 1 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-6">
                AQI by Time of Day — This Week
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={WEEKLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Bar dataKey="morning" name="Morning (6–10AM)" fill="hsl(158 64% 42%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="afternoon" name="Afternoon (12–4PM)" fill="hsl(199 80% 48%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="evening" name="Evening (6–9PM)" fill="hsl(25 95% 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-primary">Morning</p>
                  <p className="text-xs text-muted-foreground mt-1">Best time outdoors</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-secondary">Afternoon</p>
                  <p className="text-xs text-muted-foreground mt-1">Moderate — masks advised</p>
                </div>
                <div className="bg-aqi-unhealthy/10 border border-aqi-unhealthy/20 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-aqi-unhealthy">Evening</p>
                  <p className="text-xs text-muted-foreground mt-1">Worst — stay indoors</p>
                </div>
              </div>
            </div>
          )}

          {/* 7-day forecast */}
          {activeTab === 2 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" /> AI-Powered 7-Day Forecast
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={FORECAST}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} domain={[100, 320]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone" dataKey="aqi" name="Predicted AQI"
                    stroke="hsl(var(--secondary))" strokeWidth={3}
                    dot={{ fill: "hsl(var(--secondary))", r: 5, strokeWidth: 2 }}
                    strokeDasharray="6 3"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-7 gap-2">
                {FORECAST.map(({ day, aqi, risk }) => (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">{day}</span>
                    <span className="font-bold text-sm font-display text-foreground">{aqi}</span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${risk === "Very High" ? "aqi-very-unhealthy" : risk === "High" ? "aqi-unhealthy" : "aqi-moderate"}`}>
                      {risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
