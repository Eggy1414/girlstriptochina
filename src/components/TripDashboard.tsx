import { motion } from "framer-motion";
import { CITY_CONFIG, CityKey, INITIAL_DAYS } from "@/data/tripData";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";

const ROUTE_CITIES: CityKey[] = ["flight", "chongqing", "zhangjiajie", "transit", "beijing", "shanghai"];

export default function TripDashboard() {
  const tripStart = new Date("2025-06-22T00:00:00");
  const tripEnd = new Date("2025-07-08T23:59:59");
  const now = new Date();
  const daysUntil = Math.max(0, Math.ceil((tripStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const totalDays = INITIAL_DAYS.length;

  const cityDayCounts = useMemo(() => {
    const counts: Partial<Record<CityKey, number>> = {};
    INITIAL_DAYS.forEach(d => { counts[d.city] = (counts[d.city] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl md:text-5xl font-display font-black mb-2">
          🌏 Girls Trip to China!
        </h1>
        <p className="text-lg text-muted-foreground mb-6">Sydney → Chongqing → Zhangjiajie → Beijing → Shanghai</p>
        
        <div className="inline-flex items-center gap-3 bg-card rounded-2xl shadow-lg px-8 py-5 border">
          <div className="text-center">
            <div className="text-5xl font-display font-black text-primary">{daysUntil}</div>
            <div className="text-sm text-muted-foreground font-semibold">days to go!</div>
          </div>
          <div className="text-4xl">🎉</div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Days", value: totalDays, emoji: "📅" },
          { label: "Cities", value: "4 + transit", emoji: "🏙️" },
          { label: "Travellers", value: "4 girls", emoji: "👩‍👩‍👧‍👧" },
          { label: "Jun 22 – Jul 8", value: "2025", emoji: "✈️" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <Card className="text-center border-2 hover:shadow-md transition-shadow">
              <CardContent className="pt-4 pb-3 px-3">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-display font-bold text-lg">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Route Map */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Card className="overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <h2 className="font-display font-bold text-xl mb-4">🗺️ Trip Route</h2>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-1">
              {ROUTE_CITIES.map((cityKey, i) => {
                const city = CITY_CONFIG[cityKey];
                return (
                  <motion.div
                    key={cityKey}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-1 md:gap-2"
                  >
                    <div className={`${city.bgClass} text-white rounded-xl px-3 py-2 md:px-4 md:py-3 text-center min-w-[80px] md:min-w-[110px] shadow-md`}>
                      <div className="text-xl md:text-2xl">{city.emoji}</div>
                      <div className="font-display font-bold text-xs md:text-sm">{city.name}</div>
                      <div className="text-[10px] md:text-xs opacity-80">{city.dates}</div>
                      {cityDayCounts[cityKey] && (
                        <div className="text-[10px] opacity-70">{cityDayCounts[cityKey]}d</div>
                      )}
                    </div>
                    {i < ROUTE_CITIES.length - 1 && (
                      <span className="text-muted-foreground text-lg md:text-xl">→</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
