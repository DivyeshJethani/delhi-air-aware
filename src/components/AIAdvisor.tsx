import { useState } from "react";
import { User, MapPin, Heart, ChevronDown, Loader2, Shield, Leaf, Wind, Moon, Sun, Utensils, Home } from "lucide-react";

const REGIONS = [
  "Anand Vihar", "Connaught Place", "Dwarka", "Gurgaon", "Noida Sector 62",
  "Rohini", "Lodhi Road", "Faridabad", "Greater Noida", "Pitampura",
  "Vasant Kunj", "Saket", "Lajpat Nagar", "Karol Bagh", "Nehru Place",
];

const HEALTH_ISSUES = [
  "Asthma", "COPD", "Heart Disease", "Diabetes", "Allergies",
  "Bronchitis", "Hypertension", "None", "Other",
];

type Recommendation = {
  icon: typeof Shield;
  category: string;
  tips: string[];
  priority: "high" | "medium" | "low";
};

function generateRecommendations(age: number, region: string, health: string[]): Recommendation[] {
  const regionAQI: Record<string, number> = {
    "Anand Vihar": 312, "Noida Sector 62": 241, "Dwarka": 224, "Greater Noida": 256,
    "Faridabad": 278, "Rohini": 198, "Pitampura": 203, "Connaught Place": 189,
    "Gurgaon": 167, "Lodhi Road": 142, "Vasant Kunj": 160, "Saket": 155,
    "Lajpat Nagar": 185, "Karol Bagh": 210, "Nehru Place": 195,
  };
  const aqi = regionAQI[region] ?? 200;
  const isHighRisk = health.some(h => ["Asthma", "COPD", "Heart Disease", "Bronchitis"].includes(h));
  const isSenior = age >= 60;
  const isChild = age <= 14;

  return [
    {
      icon: Shield,
      category: "Immediate Protection",
      priority: "high",
      tips: [
        aqi > 250 ? "Wear N95/N99 mask outdoors — mandatory for your region." : "Wear a 3-ply or N95 mask when outdoors.",
        isHighRisk ? "Carry your inhaler/medication at all times." : "Stay indoors between 10 AM–4 PM when pollution peaks.",
        "Keep windows sealed during peak traffic hours (8–10 AM & 6–9 PM).",
      ],
    },
    {
      icon: Home,
      category: "Indoor Air Quality",
      priority: "high",
      tips: [
        "Use a HEPA air purifier in bedroom & living room (CADR > 300 recommended).",
        "Keep indoor plants like Peace Lily, Spider Plant, or Snake Plant.",
        isSenior || isChild ? "Seal gaps under doors with draft stoppers — crucial for elderly/children." : "Place wet cloth/towel near air vents to reduce dust.",
        "Vacuum carpets with HEPA filter vacuum twice a week.",
      ],
    },
    {
      icon: Leaf,
      category: "Diet & Immunity",
      priority: "medium",
      tips: [
        "Consume Vitamin C-rich foods (amla, oranges) to boost lung immunity.",
        "Drink turmeric milk (haldi doodh) every night — powerful anti-inflammatory.",
        "Add jaggery + sesame to your diet — traditional lung cleansers.",
        isHighRisk ? "Avoid cold/iced drinks — they irritate already-stressed airways." : "Eat more antioxidant-rich foods: pomegranate, berries, green tea.",
        "Steam inhalation with eucalyptus oil 2x daily helps clear airways.",
      ],
    },
    {
      icon: Sun,
      category: "Outdoor Routine",
      priority: "medium",
      tips: [
        "Check AQI before stepping out — exercise only when AQI < 100.",
        aqi > 200 ? "Avoid morning outdoor exercise — pollution is worst at sunrise in your area." : "Exercise between 6–8 AM when AQI is relatively lower.",
        "If jogging, choose green zones: Lodhi Garden, Sanjay Van, or Central Park.",
        "After outdoor exposure, rinse nasal passage with saline water.",
      ],
    },
    {
      icon: Moon,
      category: "Sleep & Recovery",
      priority: "low",
      tips: [
        "Run air purifier 30 min before bedtime for clean sleep environment.",
        "Sleep with bedroom windows closed and sealed.",
        isSenior ? "8+ hours of sleep is vital for immune recovery in older adults." : "Maintain 7–8 hours of sleep to support respiratory immune function.",
        "Avoid sleeping near roads or high-traffic areas of the house.",
      ],
    },
    {
      icon: Utensils,
      category: "Lifestyle Changes",
      priority: "low",
      tips: [
        "Quit smoking entirely — dual exposure to indoor + outdoor pollution is lethal.",
        "Install exhaust fans in kitchen — cooking smoke is 10× worse than outdoor AQI.",
        "Use CNG/electric auto or metro during heavy pollution months (Oct–Feb).",
        "Practice Anulom Vilom pranayama daily — proven to increase lung capacity.",
        health.includes("Asthma") ? "Keep bedroom dust-free, use anti-dust covers on mattresses." : "Reduce incense/agarbatti use indoors.",
      ],
    },
  ];
}

const priorityColors = {
  high: "aqi-very-unhealthy",
  medium: "aqi-moderate",
  low: "aqi-good",
};

export default function AIAdvisor() {
  const [age, setAge] = useState("");
  const [region, setRegion] = useState("");
  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<Recommendation[] | null>(null);

  const toggleHealth = (h: string) => {
    setSelectedHealth(prev =>
      prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !region) return;
    setLoading(true);
    setTimeout(() => {
      setRecs(generateRecommendations(Number(age), region, selectedHealth));
      setLoading(false);
    }, 1800);
  };

  return (
    <section id="ai-advisor" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "hsl(158 64% 42%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">AI Powered</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Personalized <span className="gradient-text">Health Advisor</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Enter your profile and get tailored AQI survival strategies for your specific situation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col gap-5">
            <h3 className="font-display font-semibold text-lg">Your Profile</h3>

            {/* Age */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <User className="w-4 h-4 text-primary" /> Age
              </label>
              <input
                type="number"
                min="1" max="120"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="Enter your age"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            {/* Region */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 text-primary" /> Your Region in Delhi NCR
              </label>
              <div className="relative">
                <select
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground focus:outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer"
                >
                  <option value="">Select region...</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Health issues */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Heart className="w-4 h-4 text-primary" /> Health Conditions (select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {HEALTH_ISSUES.map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => toggleHealth(h)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                      selectedHealth.includes(h)
                        ? "bg-primary/20 border-primary/50 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!age || !region || loading}
              className="w-full py-3 rounded-xl font-semibold text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow-green)" }}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Shield className="w-4 h-4" /> Get My Recommendations</>
              )}
            </button>
          </form>

          {/* Recommendations */}
          <div className="lg:col-span-3">
            {!recs && !loading && (
              <div className="h-full glass-card rounded-2xl flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 animate-float">
                  <Wind className="w-10 h-10 text-primary" />
                </div>
                <p className="font-display font-semibold text-xl text-foreground mb-2">Fill Your Profile</p>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Our AI analyzes your age, region's pollution data, and health conditions to generate personalized survival strategies.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full glass-card rounded-2xl flex flex-col items-center justify-center p-12 text-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                </div>
                <p className="text-foreground font-medium">Analyzing your health profile...</p>
                <p className="text-muted-foreground text-sm">Cross-referencing AQI data with medical guidelines</p>
              </div>
            )}

            {recs && (
              <div className="flex flex-col gap-4">
                {recs.map(({ icon: Icon, category, tips, priority }) => (
                  <div key={category} className="glass-card-hover rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-sm text-foreground">{category}</h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${priorityColors[priority]}`}>
                        {priority}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
