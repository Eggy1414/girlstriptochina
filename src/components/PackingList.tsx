import { useState } from "react";
import { motion } from "framer-motion";
import { PackingItem, CATEGORY_EMOJI, CITY_CONFIG, CityKey, PEOPLE, generateId } from "@/data/tripData";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  packing: PackingItem[];
  togglePacking: (id: string) => void;
  togglePackingPerson: (id: string, person: string) => void;
  addPackingItem: (item: PackingItem) => void;
  removePackingItem: (id: string) => void;
  cityNotes: Record<string, string>;
  updateCityNote: (city: string, note: string) => void;
}

const PACK_CATEGORIES = ["documents", "clothing", "toiletries", "electronics", "beauty", "misc"] as const;
const NOTE_CITIES: CityKey[] = ["chongqing", "zhangjiajie", "beijing", "shanghai"];

export default function PackingList({ packing, togglePacking, togglePackingPerson, addPackingItem, removePackingItem, cityNotes, updateCityNote }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newCat, setNewCat] = useState<PackingItem["category"]>("misc");
  const [tab, setTab] = useState<"packing" | "notes">("packing");

  const checkedCount = packing.filter(p => p.checked).length;
  const progress = packing.length > 0 ? (checkedCount / packing.length) * 100 : 0;

  const handleAdd = () => {
    if (!newItem.trim()) return;
    addPackingItem({ id: generateId(), item: newItem, category: newCat, checked: false });
    setNewItem(""); setShowAdd(false);
  };

  const grouped = PACK_CATEGORIES.map(cat => ({
    category: cat,
    items: packing.filter(p => p.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl">Packing & Notes</h2>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("packing")}
          className={`px-4 py-2 rounded-full font-display font-bold text-sm transition-colors ${tab === "packing" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent/30"}`}
        >
          Packing List
        </button>
        <button
          onClick={() => setTab("notes")}
          className={`px-4 py-2 rounded-full font-display font-bold text-sm transition-colors ${tab === "notes" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent/30"}`}
        >
          City Notes
        </button>
      </div>

      {tab === "packing" && (
        <>
          <div className="border border-border rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold">{checkedCount}/{packing.length} packed</span>
              <span className="text-foreground/50">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-accent/30 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {grouped.map(({ category, items }) => (
            <div key={category}>
              <h3 className="font-display font-bold text-sm flex items-center gap-1 mb-2">
                {CATEGORY_EMOJI[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="space-y-1">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-2 group py-1">
                    <Checkbox checked={item.checked} onCheckedChange={() => togglePacking(item.id)} />
                    <span className={`text-sm flex-1 ${item.checked ? "line-through text-foreground/40" : ""}`}>{item.item}</span>
                    <div className="flex gap-1">
                      {PEOPLE.map(person => {
                        const done = item.checkedBy?.includes(person);
                        return (
                          <button
                            key={person}
                            onClick={() => togglePackingPerson(item.id, person)}
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold transition-colors ${
                              done
                                ? "bg-primary text-primary-foreground"
                                : "border border-border text-foreground/40 hover:bg-accent/30"
                            }`}
                            title={`${person}: ${done ? "Done" : "Not done"}`}
                          >
                            {person.slice(0, 2)}
                          </button>
                        );
                      })}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removePackingItem(item.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {showAdd ? (
            <div className="flex flex-col gap-2 border border-border rounded-lg p-3">
              <Input placeholder="Item name" value={newItem} onChange={e => setNewItem(e.target.value)} className="h-8 text-sm" />
              <div className="flex gap-1 flex-wrap">
                {PACK_CATEGORIES.map(c => (
                  <button key={c} onClick={() => setNewCat(c)} className={`text-xs px-2 py-1 rounded-full border border-border transition-colors ${newCat === c ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"}`}>
                    {CATEGORY_EMOJI[c]} {c}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAdd}>Add</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowAdd(true)} className="w-full">
              <Plus className="h-3 w-3 mr-1" /> Add item
            </Button>
          )}
        </>
      )}

      {tab === "notes" && (
        <div className="space-y-4">
          {NOTE_CITIES.map(c => {
            const config = CITY_CONFIG[c];
            return (
              <div key={c} className="border border-border rounded-lg p-4">
                <h3 className="font-display font-bold text-sm flex items-center gap-2 mb-2">
                  <span className="text-lg">{config.emoji}</span> {config.name} Notes
                </h3>
                <Textarea
                  placeholder={`Restaurant tips, reminders, etc for ${config.name}...`}
                  value={cityNotes[c] || ""}
                  onChange={e => updateCityNote(c, e.target.value)}
                  className="min-h-[80px] text-sm"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
