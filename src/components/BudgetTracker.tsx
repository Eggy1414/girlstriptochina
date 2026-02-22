import { useState } from "react";
import { motion } from "framer-motion";
import { Expense, CityKey, CITY_CONFIG, CATEGORY_EMOJI, generateId } from "@/data/tripData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  expenses: Expense[];
  addExpense: (e: Expense) => void;
  removeExpense: (id: string) => void;
}

const CATEGORIES = ["flights", "hotels", "food", "transport", "shopping", "activities", "shipping", "other"] as const;
const CITIES: CityKey[] = ["chongqing", "zhangjiajie", "beijing", "shanghai"];

export default function BudgetTracker({ expenses, addExpense, removeExpense }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Expense["category"]>("food");
  const [city, setCity] = useState<CityKey>("chongqing");
  const [note, setNote] = useState("");
  const [budgetGoal] = useState(() => {
    const stored = localStorage.getItem("trip-budget-goal");
    return stored ? Number(stored) : 5000;
  });

  const totalAUD = expenses.filter(e => e.currency === "AUD").reduce((s, e) => s + e.amount, 0);
  const totalCNY = expenses.filter(e => e.currency === "CNY").reduce((s, e) => s + e.amount, 0);
  const estimatedTotal = totalAUD + totalCNY * 0.21;

  const handleAdd = () => {
    if (!amount) return;
    addExpense({ id: generateId(), amount: parseFloat(amount), currency: "AUD", category, city, note, date: new Date().toISOString().slice(0, 10) });
    setAmount(""); setNote(""); setShowAdd(false);
  };

  const byCity = CITIES.map(c => ({
    city: c,
    config: CITY_CONFIG[c],
    total: expenses.filter(e => e.city === c).reduce((s, e) => s + (e.currency === "AUD" ? e.amount : e.amount * 0.21), 0),
  }));

  const byCategory = CATEGORIES.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + (e.currency === "AUD" ? e.amount : e.amount * 0.21), 0),
  })).filter(c => c.total > 0);

  const progressPct = Math.min(100, (estimatedTotal / budgetGoal) * 100);

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl flex items-center gap-2">🏮 Budget Tracker</h2>

      {/* Total */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-foreground/60">Total Spent (est. AUD)</span>
          <span className="font-display font-bold text-2xl">${estimatedTotal.toFixed(0)}</span>
        </div>
        <div className="w-full bg-accent/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-foreground/40">$0</span>
          <span className="text-xs text-foreground/40">Goal: ${budgetGoal}</span>
        </div>
      </div>

      {/* By City */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {byCity.map(({ city: c, config, total }) => (
          <div key={c} className="border border-border rounded-lg px-3 py-3 text-center">
            <span className="text-xl">{config.emoji}</span>
            <div className="font-display font-bold text-sm mt-1">{config.name}</div>
            <div className="font-bold">${total.toFixed(0)}</div>
          </div>
        ))}
      </div>

      {/* By Category */}
      {byCategory.length > 0 && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-display font-bold text-sm mb-2">By Category</h3>
          <div className="space-y-1">
            {byCategory.map(({ category: cat, total }) => (
              <div key={cat} className="flex items-center justify-between text-sm">
                <span>{CATEGORY_EMOJI[cat]} {cat}</span>
                <span className="font-semibold">${total.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Expenses */}
      {expenses.length > 0 && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-display font-bold text-sm mb-2">Recent Expenses</h3>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {[...expenses].reverse().map(e => (
              <div key={e.id} className="flex items-center gap-2 text-sm py-1 group">
                <span>{CATEGORY_EMOJI[e.category]}</span>
                <span className="flex-1 truncate">{e.note || e.category}</span>
                <span className="text-xs text-foreground/50">{CITY_CONFIG[e.city]?.emoji}</span>
                <span className="font-semibold">${e.amount} {e.currency}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeExpense(e.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Expense */}
      {showAdd ? (
        <div className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex gap-2">
            <Input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="w-28 h-9" />
            <Input placeholder="Note" value={note} onChange={e => setNote(e.target.value)} className="flex-1 h-9" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`text-xs px-2 py-1 rounded-full border border-border transition-colors ${category === c ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"}`}>
                {CATEGORY_EMOJI[c]} {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {CITIES.map(c => (
              <button key={c} onClick={() => setCity(c)} className={`text-xs px-2 py-1 rounded-full border border-border transition-colors ${city === c ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"}`}>
                {CITY_CONFIG[c].emoji} {CITY_CONFIG[c].name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}>Add Expense</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setShowAdd(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Expense
        </Button>
      )}
    </div>
  );
}
