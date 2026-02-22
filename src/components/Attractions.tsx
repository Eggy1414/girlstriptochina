import { motion } from "framer-motion";
import { ATTRACTIONS, CITY_CONFIG, CityKey, Attraction } from "@/data/tripData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Camera } from "lucide-react";
import { useState } from "react";
import { DayPlan, Activity, generateId } from "@/data/tripData";

interface Props {
  days: DayPlan[];
  updateDay: (date: string, updater: (d: DayPlan) => DayPlan) => void;
}

const CITIES: CityKey[] = ["chongqing", "zhangjiajie", "beijing", "shanghai"];

export default function Attractions({ days, updateDay }: Props) {
  const [filter, setFilter] = useState<CityKey | "all">("all");

  const filtered = filter === "all" ? ATTRACTIONS : ATTRACTIONS.filter(a => a.city === filter);

  const addToDay = (attraction: Attraction) => {
    const cityDays = days.filter(d => d.city === attraction.city);
    if (cityDays.length === 0) return;
    // Add to first day of that city
    const targetDate = cityDays[0].date;
    const activity: Activity = {
      id: generateId(),
      time: "TBD",
      title: attraction.name,
      notes: attraction.description,
      type: "activity",
    };
    updateDay(targetDate, d => ({ ...d, activities: [...d.activities, activity] }));
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl">🎯 Attraction Suggestions</h2>

      {/* Filter */}
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

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((attr, i) => {
          const config = CITY_CONFIG[attr.city];
          return (
            <motion.div key={attr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full border-2 hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{attr.emoji}</span>
                        <h3 className="font-display font-bold text-sm">{attr.name}</h3>
                        {attr.photoWorthy && <Camera className="h-3.5 w-3.5 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{attr.description}</p>
                      <div className="flex items-center gap-1 flex-wrap">
                        <Badge variant="outline" className={`text-[10px] ${config.colorClass} border-current`}>
                          {config.emoji} {config.name}
                        </Badge>
                        {attr.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => addToDay(attr)} title="Add to planner">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
