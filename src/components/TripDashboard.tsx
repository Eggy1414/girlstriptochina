import { motion } from "framer-motion";
import { CITY_CONFIG, CityKey, INITIAL_DAYS, ACCOMMODATIONS } from "@/data/tripData";
import { useMemo } from "react";

const ROUTE_CITIES: CityKey[] = ["flight", "chongqing", "zhangjiajie", "transit", "beijing", "shanghai", "return"];

// SVG cloud pattern for Chinese decorative element
function CloudPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="currentColor" opacity="0.15">
      <path d="M10 30 Q15 10 30 20 Q35 5 50 15 Q55 0 70 12 Q80 5 90 15 Q100 8 110 20 Q115 25 110 30 Z" />
    </svg>
  );
}

const ACCOM_TYPE_LABEL = { hotel: "🏨 酒店", homestay: "🏠 民宿", hostel: "🏘️ 青旅" };

export default function TripDashboard() {
  const tripStart = new Date("2025-06-22T00:00:00");
  const now = new Date();
  const daysUntil = Math.max(0, Math.ceil((tripStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const totalDays = INITIAL_DAYS.length;

  const cityDayCounts = useMemo(() => {
    const counts: Partial<Record<CityKey, number>> = {};
    INITIAL_DAYS.forEach(d => { counts[d.city] = (counts[d.city] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="space-y-8 relative">
      {/* Decorative clouds */}
      <CloudPattern className="absolute top-0 right-0 w-32 text-foreground pointer-events-none" />
      <CloudPattern className="absolute top-40 left-0 w-24 text-foreground pointer-events-none rotate-6" />

      {/* Countdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10 relative">
        <div className="text-3xl mb-2">🏮</div>
        <h1 className="text-4xl md:text-5xl font-display font-black mb-2">Girls Trip to China</h1>
        <p className="text-sm text-foreground/60 mb-8 tracking-wide">Sydney → 重庆 → 张家界 → 北京 → 上海 → Sydney</p>
        
        <div className="inline-flex items-center gap-3 border border-border rounded-xl px-8 py-5">
          <div className="text-center">
            <div className="text-5xl font-display font-black">{daysUntil}</div>
            <div className="text-sm text-foreground/60">days to go</div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4 text-2xl">
          <span>🏮</span><span>☁️</span><span>🏮</span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Days", value: totalDays, icon: "📅" },
          { label: "Cities", value: "4 + Transit", icon: "🏙️" },
          { label: "Travellers", value: "4", icon: "👩‍👩‍👧‍👧" },
          { label: "Duration", value: "Jun 22 – Jul 9", icon: "⏱️" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <div className="text-center border border-border rounded-lg px-3 py-4">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="font-display font-bold text-lg">{stat.value}</div>
              <div className="text-xs text-foreground/50">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Route Map */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="border border-border rounded-lg p-4 md:p-6">
          <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
            <span>☁️</span> Trip Route
          </h2>
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
                  <div className="border border-border rounded-lg px-3 py-2 md:px-4 md:py-3 text-center min-w-[80px] md:min-w-[110px]">
                    <div className="text-xl md:text-2xl">{city.emoji}</div>
                    <div className="font-display font-bold text-xs md:text-sm">{city.name}</div>
                    <div className="text-[10px] md:text-xs text-foreground/50">{city.dates}</div>
                    {cityDayCounts[cityKey] && (
                      <div className="text-[10px] text-foreground/40">{cityDayCounts[cityKey]}d</div>
                    )}
                  </div>
                  {i < ROUTE_CITIES.length - 1 && (
                    <span className="text-foreground/40 text-lg md:text-xl">→</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Accommodation Plan */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="border border-border rounded-lg p-4 md:p-6">
          <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
            <span>🏮</span> Accommodation Plan
          </h2>
          <div className="space-y-3">
            {ACCOMMODATIONS.map((acc, i) => {
              const cityConf = CITY_CONFIG[acc.city];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="border border-border rounded-lg p-4 flex flex-col md:flex-row md:items-start gap-3"
                >
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <span className="text-xl">{cityConf.emoji}</span>
                    <div>
                      <div className="font-display font-bold text-sm">{cityConf.name}</div>
                      <div className="text-[10px] text-foreground/50">{acc.dates}</div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{acc.name}</span>
                      <span className="text-[10px] border border-border rounded-full px-2 py-0.5">
                        {ACCOM_TYPE_LABEL[acc.type]}
                      </span>
                    </div>
                    <div className="text-xs text-foreground/50 mt-0.5">📍 {acc.address}</div>
                    {acc.notes && <div className="text-xs text-foreground/60 mt-1">💡 {acc.notes}</div>}
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <div className="font-display font-bold text-sm">¥{acc.pricePerNight}/晚</div>
                    <div className="text-[10px] text-foreground/50">{acc.nights} nights = ¥{acc.pricePerNight * acc.nights}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-sm">
            <span className="text-foreground/60">Total Accommodation</span>
            <span className="font-display font-bold">
              ¥{ACCOMMODATIONS.reduce((sum, a) => sum + a.pricePerNight * a.nights, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Decorative footer */}
      <div className="flex justify-center gap-1 text-foreground/20 text-2xl py-2">
        <span>☁️</span><span>🏮</span><span>☁️</span><span>🏮</span><span>☁️</span>
      </div>
    </div>
  );
}