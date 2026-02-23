import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import { RouteDay, RouteActivity } from "@/data/routeData";
import { generateId } from "@/data/tripData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RouteItineraryProps {
  routeDays: RouteDay[];
  addRouteDay: (day: RouteDay) => void;
  removeRouteDay: (id: string) => void;
  addRouteActivity: (dayId: string, activity: RouteActivity) => void;
  removeRouteActivity: (dayId: string, activityId: string) => void;
}

const CITY_COLORS: Record<string, string> = {
  "Flight": "border-l-foreground/30",
  "Chongqing": "border-l-foreground/60",
  "Zhangjiajie": "border-l-foreground/40",
  "Beijing": "border-l-foreground/50",
  "Shanghai": "border-l-foreground/70",
  "Return": "border-l-foreground/30",
};

const CITY_OPTIONS = [
  { label: "Flight", emoji: "✈️" },
  { label: "Chongqing", emoji: "🏙️" },
  { label: "Zhangjiajie", emoji: "🏔️" },
  { label: "Beijing", emoji: "🏯" },
  { label: "Shanghai", emoji: "🌃" },
  { label: "Return", emoji: "🏠" },
  { label: "Transit", emoji: "🚄" },
];

function AddDayDialog({ onAdd, nextDay }: { onAdd: (day: RouteDay) => void; nextDay: number }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [focus, setFocus] = useState("");
  const [city, setCity] = useState("Chongqing");

  const handleSubmit = () => {
    if (!date || !title) return;
    const cityOption = CITY_OPTIONS.find(c => c.label === city);
    onAdd({
      id: generateId(),
      day: nextDay,
      date,
      title,
      city,
      cityEmoji: cityOption?.emoji || "📍",
      focus: focus || undefined,
      activities: [],
    });
    setDate("");
    setTitle("");
    setFocus("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-dashed border-2 border-border/50 text-foreground/60 hover:text-foreground hover:border-border">
          <Plus className="w-4 h-4 mr-2" /> Add Day
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Day</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Date (e.g. 7.10)" value={date} onChange={e => setDate(e.target.value)} className="bg-background/50 border-border text-foreground" />
          <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="bg-background/50 border-border text-foreground" />
          <Input placeholder="Focus (optional)" value={focus} onChange={e => setFocus(e.target.value)} className="bg-background/50 border-border text-foreground" />
          <select
            value={city}
            onChange={e => setCity(e.target.value)}
            className="w-full rounded-md px-3 py-2 bg-background/50 border border-border text-foreground text-sm"
          >
            {CITY_OPTIONS.map(c => (
              <option key={c.label} value={c.label}>{c.emoji} {c.label}</option>
            ))}
          </select>
          <Button onClick={handleSubmit} className="w-full" disabled={!date || !title}>Add Day</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddActivityDialog({ onAdd }: { onAdd: (activity: RouteActivity) => void }) {
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState("📍");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title) return;
    onAdd({ id: generateId(), emoji, title, description });
    setEmoji("📍");
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground/80 transition-colors mt-2">
          <Plus className="w-3 h-3" /> Add activity
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Activity</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Emoji" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-16 bg-background/50 border-border text-foreground text-center" />
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="flex-1 bg-background/50 border-border text-foreground" />
          </div>
          <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="bg-background/50 border-border text-foreground min-h-[80px]" />
          <Button onClick={handleSubmit} className="w-full" disabled={!title}>Add Activity</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const RouteItinerary = ({ routeDays, addRouteDay, removeRouteDay, addRouteActivity, removeRouteActivity }: RouteItineraryProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">🗺️ Full Route Itinerary</h2>
      <Accordion type="multiple" className="space-y-2">
        {routeDays.map((day) => (
          <AccordionItem
            key={day.id}
            value={day.id}
            className={`border rounded-xl bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden border-l-4 ${CITY_COLORS[day.city] || ""}`}
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/20">
              <div className="flex items-center gap-3 text-left flex-1">
                <span className="text-2xl">{day.cityEmoji}</span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-sans">Day {day.day} · {day.date}</p>
                  <p className="font-bold text-foreground text-sm">{day.title}</p>
                  {day.focus && <p className="text-xs text-muted-foreground mt-0.5">{day.focus}</p>}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="group relative">
                    <div className="flex items-start gap-2">
                      <span className="text-base mt-0.5">{activity.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-foreground text-sm">{activity.title}</h4>
                        <p className="text-foreground/75 text-sm whitespace-pre-line mt-0.5">{activity.description}</p>
                      </div>
                      <button
                        onClick={() => removeRouteActivity(day.id, activity.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/20 text-foreground/40 hover:text-destructive shrink-0"
                        title="Remove activity"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <AddActivityDialog onAdd={(a) => addRouteActivity(day.id, a)} />
              </div>
              <div className="mt-4 pt-3 border-t border-border/30 flex justify-end">
                <button
                  onClick={() => removeRouteDay(day.id)}
                  className="flex items-center gap-1 text-xs text-foreground/40 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Remove day
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-4">
        <AddDayDialog onAdd={addRouteDay} nextDay={routeDays.length + 1} />
      </div>
    </div>
  );
};

export default RouteItinerary;
