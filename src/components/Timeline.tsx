import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPlan, Activity, CITY_CONFIG, generateId } from "@/data/tripData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Plus, Trash2, GripVertical } from "lucide-react";

interface Props {
  days: DayPlan[];
  updateDay: (date: string, updater: (d: DayPlan) => DayPlan) => void;
}

const TYPE_EMOJI: Record<string, string> = {
  activity: "🎯", food: "🍜", transport: "🚄", photo: "📸", shopping: "🛍️", rest: "😴",
};

export default function Timeline({ days, updateDay }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newType, setNewType] = useState<Activity["type"]>("activity");

  const toggle = (date: string) => setExpanded(prev => prev === date ? null : date);

  const addActivity = (date: string) => {
    if (!newTitle.trim()) return;
    const activity: Activity = { id: generateId(), time: newTime || "TBD", title: newTitle, notes: "", type: newType };
    updateDay(date, d => ({ ...d, activities: [...d.activities, activity] }));
    setNewTitle(""); setNewTime(""); setAddingTo(null);
  };

  const removeActivity = (date: string, actId: string) => {
    updateDay(date, d => ({ ...d, activities: d.activities.filter(a => a.id !== actId) }));
  };

  // Group days by city
  const cityGroups: { city: string; days: DayPlan[] }[] = [];
  days.forEach(day => {
    const last = cityGroups[cityGroups.length - 1];
    if (last && last.city === day.city) {
      last.days.push(day);
    } else {
      cityGroups.push({ city: day.city, days: [day] });
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl">📅 Day-by-Day Timeline</h2>
      
      {cityGroups.map((group) => {
        const config = CITY_CONFIG[group.city as keyof typeof CITY_CONFIG];
        return (
          <motion.div key={group.city + group.days[0].date} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`${config.bgClass} text-white rounded-t-xl px-4 py-2 font-display font-bold flex items-center gap-2`}>
              <span className="text-xl">{config.emoji}</span>
              <span>{config.name}</span>
              <span className="text-sm opacity-80 ml-auto">{config.dates}</span>
            </div>
            <div className="border border-t-0 rounded-b-xl overflow-hidden divide-y">
              {group.days.map(day => (
                <div key={day.date} className="bg-card">
                  <button
                    onClick={() => toggle(day.date)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div>
                      <span className="font-display font-bold">{day.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {day.activities.length} {day.activities.length === 1 ? "activity" : "activities"}
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded === day.date ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {expanded === day.date && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2">
                          {day.activities.map(act => (
                            <div key={act.id} className="flex items-start gap-2 bg-muted/30 rounded-lg px-3 py-2 group">
                              <span className="text-lg mt-0.5">{TYPE_EMOJI[act.type] || "🎯"}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-muted-foreground bg-muted rounded px-1.5 py-0.5">{act.time}</span>
                                  <span className="font-semibold text-sm">{act.title}</span>
                                </div>
                                {act.notes && <p className="text-xs text-muted-foreground mt-0.5">{act.notes}</p>}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                                onClick={() => removeActivity(day.date, act.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}

                          {addingTo === day.date ? (
                            <div className="flex flex-col gap-2 bg-muted/20 rounded-lg p-3">
                              <div className="flex gap-2">
                                <Input placeholder="Time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-24 h-8 text-sm" />
                                <Input placeholder="Activity name" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="flex-1 h-8 text-sm" />
                              </div>
                              <div className="flex gap-1 flex-wrap">
                                {(Object.keys(TYPE_EMOJI) as Activity["type"][]).map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setNewType(t)}
                                    className={`text-xs px-2 py-1 rounded-full border transition-colors ${newType === t ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                                  >
                                    {TYPE_EMOJI[t]} {t}
                                  </button>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => addActivity(day.date)} className="h-7 text-xs">Add</Button>
                                <Button size="sm" variant="ghost" onClick={() => setAddingTo(null)} className="h-7 text-xs">Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full h-8 text-xs text-muted-foreground"
                              onClick={() => { setAddingTo(day.date); setNewTitle(""); setNewTime(""); }}
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add activity
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
