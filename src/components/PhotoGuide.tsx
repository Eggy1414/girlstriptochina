import { motion } from "framer-motion";
import { PHOTO_SPOTS, POSE_IDEAS, CITY_CONFIG, CityKey } from "@/data/tripData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, Lightbulb } from "lucide-react";
import { useState } from "react";

const CITIES: CityKey[] = ["chongqing", "zhangjiajie", "beijing", "shanghai"];

export default function PhotoGuide() {
  const [filter, setFilter] = useState<CityKey | "all">("all");
  const [tab, setTab] = useState<"spots" | "poses">("spots");

  const filteredSpots = filter === "all" ? PHOTO_SPOTS : PHOTO_SPOTS.filter(s => s.city === filter);

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl">📸 Photo Guide</h2>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("spots")}
          className={`px-4 py-2 rounded-full font-display font-bold text-sm transition-colors ${tab === "spots" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
        >
          📍 Photo Spots
        </button>
        <button
          onClick={() => setTab("poses")}
          className={`px-4 py-2 rounded-full font-display font-bold text-sm transition-colors ${tab === "poses" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
        >
          💃 Pose Ideas
        </button>
      </div>

      {tab === "spots" && (
        <>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              All Cities
            </button>
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-colors ${filter === c ? `${CITY_CONFIG[c].bgClass} text-white` : "hover:bg-muted"}`}
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
                  <Card className="border-2 hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className={`h-4 w-4 ${config.colorClass}`} />
                        <h3 className="font-display font-bold text-sm">{spot.name}</h3>
                        <Badge variant="outline" className={`text-[10px] ${config.colorClass} border-current ml-auto`}>
                          {config.emoji} {config.name}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{spot.description}</p>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Lightbulb className="h-3 w-3 text-secondary" />
                          <span className="text-muted-foreground">{spot.tips}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3 text-accent" />
                          <span className="text-muted-foreground">Best time: {spot.bestTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
              <Card className="border-2 hover:shadow-md transition-shadow text-center h-full">
                <CardContent className="pt-5 pb-4">
                  <div className="text-4xl mb-2">{pose.emoji}</div>
                  <h3 className="font-display font-bold text-sm mb-1">{pose.name}</h3>
                  <p className="text-xs text-muted-foreground">{pose.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
