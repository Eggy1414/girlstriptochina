import { useState } from "react";
import { motion } from "framer-motion";
import { Expense, CityKey, CITY_CONFIG, CATEGORY_EMOJI, generateId } from "@/data/tripData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Calculator, Users } from "lucide-react";

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
  const [showSplit, setShowSplit] = useState(false);
  const [splitPeople, setSplitPeople] = useState(2);
  const [splitAmount, setSplitAmount] = useState("");
  const [splitPaidBy, setSplitPaidBy] = useState("");

  const totalCNY = expenses.filter(e => e.currency === "CNY").reduce((s, e) => s + e.amount, 0);
  const totalAUD = expenses.filter(e => e.currency === "AUD").reduce((s, e) => s + e.amount, 0);
  const estimatedTotal = totalCNY + totalAUD * 4.76;

  const handleAdd = () => {
    if (!amount) return;
    addExpense({ id: generateId(), amount: parseFloat(amount), currency: "CNY", category, city, note, date: new Date().toISOString().slice(0, 10) });
    setAmount(""); setNote(""); setShowAdd(false);
  };

  const byCity = CITIES.map(c => ({
    city: c,
    config: CITY_CONFIG[c],
    total: expenses.filter(e => e.city === c).reduce((s, e) => s + (e.currency === "CNY" ? e.amount : e.amount * 4.76), 0),
  }));

  const byCategory = CATEGORIES.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + (e.currency === "CNY" ? e.amount : e.amount * 4.76), 0),
  })).filter(c => c.total > 0);

  const splitPerPerson = splitAmount ? parseFloat(splitAmount) / splitPeople : 0;

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl flex items-center gap-2">💰 Expense Tracker</h2>

      {/* Total */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-foreground/60">Total Spent (est. ¥)</span>
          <span className="font-display font-bold text-2xl">¥{estimatedTotal.toFixed(0)}</span>
        </div>
        <div className="text-xs text-foreground/40 flex gap-3">
          <span>CNY: ¥{totalCNY.toFixed(0)}</span>
          {totalAUD > 0 && <span>AUD: ${totalAUD.toFixed(0)}</span>}
        </div>
      </div>

      {/* By City */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {byCity.map(({ city: c, config, total }) => (
          <div key={c} className="border border-border rounded-lg px-3 py-3 text-center">
            <span className="text-xl">{config.emoji}</span>
            <div className="font-display font-bold text-sm mt-1">{config.name}</div>
            <div className="font-bold">¥{total.toFixed(0)}</div>
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
                <span className="font-semibold">¥{total.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Split Calculator */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => setShowSplit(!showSplit)}
          className="flex items-center gap-2 w-full font-display font-bold text-sm"
        >
          <Calculator className="h-4 w-4" />
          AA Split Calculator
          <span className="ml-auto text-foreground/40 text-xs">{showSplit ? "▲" : "▼"}</span>
        </button>
        {showSplit && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-3"
          >
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Total amount (¥)"
                value={splitAmount}
                onChange={e => setSplitAmount(e.target.value)}
                className="flex-1 h-9"
              />
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-foreground/50" />
                <button
                  onClick={() => setSplitPeople(Math.max(2, splitPeople - 1))}
                  className="h-7 w-7 rounded border border-border text-sm hover:bg-accent/30"
                >-</button>
                <span className="w-6 text-center font-bold text-sm">{splitPeople}</span>
                <button
                  onClick={() => setSplitPeople(splitPeople + 1)}
                  className="h-7 w-7 rounded border border-border text-sm hover:bg-accent/30"
                >+</button>
              </div>
            </div>
            <Input
              placeholder="Paid by (optional)"
              value={splitPaidBy}
              onChange={e => setSplitPaidBy(e.target.value)}
              className="h-9"
            />
            {splitAmount && (
              <div className="bg-accent/20 rounded-lg p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Total</span>
                  <span className="font-bold">¥{parseFloat(splitAmount).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Split {splitPeople} ways</span>
                  <span className="font-display font-bold text-lg">¥{splitPerPerson.toFixed(2)}</span>
                </div>
                {splitPaidBy && (
                  <div className="text-xs text-foreground/50 mt-1">
                    💡 Everyone owes {splitPaidBy}: ¥{splitPerPerson.toFixed(2)} each
                  </div>
                )}
              </div>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (!splitAmount) return;
                const totalExpense = parseFloat(splitAmount);
                setSplitAmount(estimatedTotal.toFixed(0));
              }}
              className="text-xs"
            >
              Use total expenses (¥{estimatedTotal.toFixed(0)})
            </Button>
          </motion.div>
        )}
      </div>

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
                <span className="font-semibold">¥{e.amount} {e.currency}</span>
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
            <Input type="number" placeholder="Amount (¥)" value={amount} onChange={e => setAmount(e.target.value)} className="w-28 h-9" />
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
