import { useState } from "react";
import { Users, Flag, Star, Award, ChevronUp, Send } from "lucide-react";
import connaughtPlaceImg from "@/assets/connaught-place.jpg";

const LEADERBOARD = [
  { rank: 1, name: "Rohini Residents Forum", score: 2840, badge: "🏆", reports: 128 },
  { rank: 2, name: "Dwarka Green Warriors", score: 2312, badge: "🥈", reports: 98 },
  { rank: 3, name: "Noida Eco Circle", score: 1987, badge: "🥉", reports: 84 },
  { rank: 4, name: "CP Clean Air Squad", score: 1654, badge: "⭐", reports: 72 },
  { rank: 5, name: "South Delhi Saviours", score: 1423, badge: "⭐", reports: 61 },
];

const REPORT_TYPES = [
  "Industrial Smoke", "Construction Dust", "Garbage Burning",
  "Vehicle Smoke", "Crop Burning", "Open Fire",
];

export default function CommunitySection() {
  const [reportType, setReportType] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportType || !location) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setReportType("");
    setLocation("");
  };

  return (
    <section id="community" className="py-24 relative">
      {/* Background image strip */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src={connaughtPlaceImg} alt="Delhi community" className="w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "hsl(158 64% 42%)" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Users className="w-3 h-3 text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">Community</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Fight Pollution <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Report pollution incidents and earn Green Score points for a cleaner Delhi NCR.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Report Pollution */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
              <Flag className="w-5 h-5 text-aqi-unhealthy" /> Report Pollution Incident
            </h3>
            <p className="text-muted-foreground text-sm mb-6">Help the community by flagging pollution sources near you.</p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <p className="font-display font-semibold text-foreground">Report Submitted! +50 Green Points</p>
                <p className="text-sm text-muted-foreground text-center">Thank you for helping keep Delhi NCR cleaner.</p>
              </div>
            ) : (
              <form onSubmit={handleReport} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Pollution Type</label>
                  <div className="flex flex-wrap gap-2">
                    {REPORT_TYPES.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setReportType(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                          reportType === t
                            ? "bg-aqi-unhealthy/20 border-aqi-unhealthy/50 text-aqi-unhealthy"
                            : "border-border text-muted-foreground hover:border-aqi-unhealthy/30"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Location / Area</label>
                  <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Connaught Place, near Janpath..."
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Description (optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you observed..."
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!reportType || !location}
                  className="w-full py-3 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow-green)" }}
                >
                  <Send className="w-4 h-4" /> Submit Report (+50 pts)
                </button>
              </form>
            )}
          </div>

          {/* Green Score Leaderboard */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-aqi-moderate" /> Green Score Leaderboard
            </h3>
            <p className="text-muted-foreground text-sm mb-6">Communities driving real change in Delhi NCR air quality.</p>

            <div className="flex flex-col gap-3">
              {LEADERBOARD.map(({ rank, name, score, badge, reports }) => (
                <div key={rank} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  rank <= 3 ? "border-primary/20 bg-primary/5" : "border-border bg-muted/20"
                }`}>
                  <span className="text-xl w-8 text-center">{badge}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{name}</p>
                    <p className="text-xs text-muted-foreground">{reports} reports filed</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-primary font-display">{score.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Green Points</p>
                  </div>
                  {rank === 1 && (
                    <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
              <p className="text-xs text-center text-muted-foreground">
                <span className="text-secondary font-semibold">🏅 Your Green Score: 0 pts</span>
                <span className="block mt-1">Start reporting to earn points and help your community!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
