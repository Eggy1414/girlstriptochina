import { motion } from "framer-motion";
import { PHOTO_SPOTS, POSE_IDEAS, CITY_CONFIG, CityKey } from "@/data/tripData";
import { Camera, Clock, Lightbulb } from "lucide-react";
import { useState } from "react";

const CITIES: CityKey[] = ["chongqing", "zhangjiajie", "beijing", "shanghai"];

export default function PhotoGuide() {
  const [filter, setFilter] = useState<CityKey | "all">("all");
  const [tab, setTab] = useState<"spots" | "poses">("spots");

  const filteredSpots = filter === "all" ? PHOTO_SPOTS : PHOTO_SPOTS.filter(s => s.city === filter);

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl">Photo Guide</h2>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("spots")}
          className={`px-4 py-2 rounded-full font-display font-bold text-sm transition-colors ${tab === "spots" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent/30"}`}
        >
          Photo Spots
        </button>
        <button
          onClick={() => setTab("poses")}
          className={`px-4 py-2 rounded-full font-display font-bold text-sm transition-colors ${tab === "poses" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent/30"}`}
        >
          Pose Ideas
        </button>
      </div>

      {tab === "spots" && (
        <>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`text-xs px-3 py-1.5 rounded-full border border-border font-semibold transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"}`}
            >
              All Cities
            </button>
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs px-3 py-1.5 rounded-full border border-border font-semibold transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"}`}
              >
                {CITY_CONFIG[c].emoji} {CITY_CONFIG[c].name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSpots.map((spot, i) => {
              const config = CITY_CONFIG[spot.city];
              return (
                <motion.div key={spot.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="h-4 w-4 text-foreground/60" />
                      <h3 className="font-display font-bold text-sm">{spot.name}</h3>
                      <span className="text-[10px] border border-border rounded-full px-2 py-0.5 ml-auto">
                        {config.emoji} {config.name}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 mb-2">{spot.description}</p>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-xs">
                        <Lightbulb className="h-3 w-3 text-foreground/40" />
                        <span className="text-foreground/60">{spot.tips}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3 text-foreground/40" />
                        <span className="text-foreground/60">Best time: {spot.bestTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {tab === "poses" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {POSE_IDEAS.map((pose, i) => (
            <motion.div key={pose.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="border border-border rounded-lg p-4 text-center h-full">
                <div className="text-4xl mb-2">{pose.emoji}</div>
                <h3 className="font-display font-bold text-sm mb-1">{pose.name}</h3>
                <p className="text-xs text-foreground/60">{pose.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
