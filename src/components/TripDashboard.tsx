import { motion } from "framer-motion";
import { CITY_CONFIG, CityKey, INITIAL_DAYS, ACCOMMODATIONS } from "@/data/tripData";
import { useMemo, useState, useEffect } from "react";

const ROUTE_CITIES: CityKey[] = ["flight", "chongqing", "trainToZhangjiajie", "zhangjiajie", "transit", "beijing", "flightToShanghai", "shanghai", "return"];

function CloudPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="currentColor" opacity="0.15">
      <path d="M10 30 Q15 10 30 20 Q35 5 50 15 Q55 0 70 12 Q80 5 90 15 Q100 8 110 20 Q115 25 110 30 Z" />
    </svg>
  );
}

const ACCOM_TYPE_LABEL = { hotel: "Hotel", homestay: "Homestay", hostel: "Hostel" };
const ACCOM_TYPE_ICON = { hotel: "🏨", homestay: "🏠", hostel: "🏘️" };

function useCountdown(targetDate: Date) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <div className="border border-border rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <span className="font-display font-black text-3xl md:text-4xl tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] md:text-xs text-foreground/50 mt-1.5 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}

export default function TripDashboard() {
  const tripStart = new Date("2026-06-22T00:00:00");
  const { days, hours, minutes, seconds } = useCountdown(tripStart);
  const totalDays = INITIAL_DAYS.length;

  const cityDayCounts = useMemo(() => {
    const counts: Partial<Record<CityKey, number>> = {};
    INITIAL_DAYS.forEach(d => { counts[d.city] = (counts[d.city] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="space-y-8 relative">
      <CloudPattern className="absolute top-0 right-0 w-32 text-foreground pointer-events-none" />
      <CloudPattern className="absolute top-40 left-0 w-24 text-foreground pointer-events-none rotate-6" />

      {/* Countdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10 relative">
        <div className="text-3xl mb-2">🏮</div>
        <h1 className="text-4xl md:text-5xl font-display font-black mb-2">Girls Trip to China</h1>
        <p className="text-sm text-foreground/60 mb-8 tracking-wide">
          Sydney → Chongqing → Zhangjiajie → Beijing → Shanghai → Sydney
        </p>
        
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <CountdownUnit value={days} label="days" delay={0.1} />
          <span className="text-foreground/30 text-2xl font-light mt-[-20px]">:</span>
          <CountdownUnit value={hours} label="hrs" delay={0.2} />
          <span className="text-foreground/30 text-2xl font-light mt-[-20px]">:</span>
          <CountdownUnit value={minutes} label="min" delay={0.3} />
          <span className="text-foreground/30 text-2xl font-light mt-[-20px]">:</span>
          <CountdownUnit value={seconds} label="sec" delay={0.4} />
        </div>

        <div className="flex justify-center gap-2 mt-6 text-2xl">
          <span>🏮</span><span>☁️</span><span>🏮</span>
        </div>
      </motion.div>


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
                        {ACCOM_TYPE_ICON[acc.type]} {ACCOM_TYPE_LABEL[acc.type]}
                      </span>
                    </div>
                    <div className="text-xs text-foreground/50 mt-0.5">📍 {acc.address}</div>
                    {acc.notes && <div className="text-xs text-foreground/60 mt-1">💡 {acc.notes}</div>}
                  </div>
                  <div className="text-right whitespace-nowrap">
                    {acc.pricePerNight > 0 ? (
                      <>
                        <div className="font-display font-bold text-sm">¥{acc.pricePerNight}/night</div>
                        <div className="text-[10px] text-foreground/50">{acc.nights} nights = ¥{acc.pricePerNight * acc.nights}</div>
                      </>
                    ) : (
                      <div className="font-display font-bold text-sm text-foreground/40">TBD</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          {ACCOMMODATIONS.some(a => a.pricePerNight > 0) && (
            <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-sm">
              <span className="text-foreground/60">Total Accommodation</span>
              <span className="font-display font-bold">
                ¥{ACCOMMODATIONS.reduce((sum, a) => sum + a.pricePerNight * a.nights, 0).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Decorative footer */}
      <div className="flex justify-center gap-1 text-foreground/20 text-2xl py-2">
        <span>☁️</span><span>🏮</span><span>☁️</span><span>🏮</span><span>☁️</span>
      </div>
    </div>
  );
}
