import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expense, CityKey, CITY_CONFIG, CATEGORY_EMOJI, PEOPLE, generateId } from "@/data/tripData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  expenses: Expense[];
  addExpense: (e: Expense) => void;
  removeExpense: (id: string) => void;
}

const CATEGORIES = ["flights", "hotels", "food", "transport", "shopping", "activities", "shipping", "other"] as const;
const CITIES: CityKey[] = ["chongqing", "zhangjiajie", "beijing", "shanghai"];

export default function BudgetTracker({ expenses, addExpense, removeExpense }: Props) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState<Expense["category"]>("food");
  const [city, setCity] = useState<CityKey>("chongqing");
  const [paidBy, setPaidBy] = useState<string>(PEOPLE[0]);
  const [splitCount, setSplitCount] = useState(4);

  const parsedAmount = parseFloat(amount) || 0;
  const perPerson = parsedAmount > 0 ? parsedAmount / splitCount : 0;

  const handleAdd = () => {
    if (!parsedAmount) return;
    addExpense({
      id: generateId(),
      amount: parsedAmount,
      currency: "CNY",
      category,
      city,
      note,
      date: new Date().toISOString().slice(0, 10),
      paidBy,
      splitCount,
    });
    setAmount("");
    setNote("");
  };

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);

  // Per-person totals (what each person paid)
  const perPersonPaid: Record<string, number> = {};
  // Per-person owes (what each person's share is across all expenses)
  const perPersonOwes: Record<string, number> = {};
  PEOPLE.forEach(p => { perPersonPaid[p] = 0; perPersonOwes[p] = 0; });

  expenses.forEach(e => {
    if (e.paidBy) perPersonPaid[e.paidBy] += e.amount;
    const split = e.splitCount || 1;
    const share = e.amount / split;
    // Assume first N people in PEOPLE list share
    PEOPLE.slice(0, split).forEach(p => { perPersonOwes[p] += share; });
  });

  // By category
  const byCategory: Record<string, number> = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });

  // By city
  const byCity: Record<string, number> = {};
  expenses.forEach(e => { byCity[e.city] = (byCity[e.city] || 0) + e.amount; });

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl flex items-center gap-2">💰 Expense Tracker</h2>

      {/* Total Expense Summary */}
      <div className="border border-border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-lg">Total Expenses</span>
          <span className="font-display font-bold text-3xl">¥{totalSpent.toFixed(0)}</span>
        </div>

        {expenses.length > 0 && (
          <>
            {/* Per Person Summary */}
            <div className="grid grid-cols-2 gap-2">
              {PEOPLE.map(p => {
                const paid = perPersonPaid[p];
                const owes = perPersonOwes[p];
                const balance = paid - owes;
                return (
                  <div key={p} className="bg-accent/15 rounded-lg p-3 space-y-1">
                    <p className="text-sm font-bold text-foreground">{p}</p>
                    <p className="text-xs text-foreground/60">Paid: ¥{paid.toFixed(0)}</p>
                    <p className="text-xs text-foreground/60">Owes: ¥{owes.toFixed(0)}</p>
                    <p className={`text-xs font-bold ${balance >= 0 ? "text-foreground/80" : "text-destructive"}`}>
                      {balance >= 0 ? `+¥${balance.toFixed(0)} owed back` : `-¥${Math.abs(balance).toFixed(0)} to pay`}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* By Category */}
            <div>
              <p className="text-xs text-foreground/50 mb-2 font-bold uppercase tracking-wide">By Category</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, total]) => (
                  <div key={cat} className="bg-accent/10 rounded-full px-3 py-1 text-xs">
                    {CATEGORY_EMOJI[cat]} {cat} <span className="font-bold">¥{total.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By City */}
            <div>
              <p className="text-xs text-foreground/50 mb-2 font-bold uppercase tracking-wide">By City</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([c, total]) => (
                  <div key={c} className="bg-accent/10 rounded-full px-3 py-1 text-xs">
                    {CITY_CONFIG[c as CityKey]?.emoji} {CITY_CONFIG[c as CityKey]?.name || c} <span className="font-bold">¥{total.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Expense Form */}
      <div className="border border-border rounded-lg p-4 space-y-4">
        {/* Amount & Note */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Amount (¥)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-32 h-10"
          />
          <Input
            placeholder="Note"
            value={note}
            onChange={e => setNote(e.target.value)}
            className="flex-1 h-10"
          />
        </div>

        {/* Category */}
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-xs px-2 py-1 rounded-full border border-border transition-colors ${
                category === c ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"
              }`}
            >
              {CATEGORY_EMOJI[c]} {c}
            </button>
          ))}
        </div>

        {/* City */}
        <div className="flex gap-1 flex-wrap">
          {CITIES.map(c => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`text-xs px-2 py-1 rounded-full border border-border transition-colors ${
                city === c ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"
              }`}
            >
              {CITY_CONFIG[c].emoji} {CITY_CONFIG[c].name}
            </button>
          ))}
        </div>

        {/* Paid By & Split */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60">Paid by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  {paidBy}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {PEOPLE.map(p => (
                  <DropdownMenuItem key={p} onClick={() => setPaidBy(p)}>
                    {p}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60">Split:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setSplitCount(n)}
                  className={`h-8 w-8 rounded-full border border-border text-sm font-bold transition-colors ${
                    splitCount === n
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent/30"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <AnimatePresence>
          {parsedAmount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-accent/20 rounded-lg p-3 text-sm space-y-1"
            >
              <div className="font-display font-bold">
                {paidBy} paid ¥{parsedAmount.toFixed(2)}.{" "}
                {splitCount > 1
                  ? `Each person owes ¥${perPerson.toFixed(2)}.`
                  : "No split."}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={handleAdd} className="w-full" disabled={!parsedAmount}>
          Add Expense
        </Button>
      </div>

      {/* Expense Log */}
      {expenses.length > 0 && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-display font-bold text-sm mb-3">Expense Log</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {[...expenses].reverse().map(e => (
              <div
                key={e.id}
                className="flex items-start gap-2 text-sm py-2 px-2 rounded-md group hover:bg-accent/10 transition-colors"
              >
                <span>{CATEGORY_EMOJI[e.category]}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{e.note || e.category}</div>
                  <div className="text-xs text-foreground/50">
                    {e.paidBy && <span>{e.paidBy} paid</span>}
                    {e.splitCount && e.splitCount > 1 && (
                      <span> · split {e.splitCount} ways · ¥{(e.amount / e.splitCount).toFixed(2)} each</span>
                    )}
                    {CITY_CONFIG[e.city] && (
                      <span> · {CITY_CONFIG[e.city].emoji} {CITY_CONFIG[e.city].name}</span>
                    )}
                  </div>
                </div>
                <span className="font-bold whitespace-nowrap">¥{e.amount.toFixed(0)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                  onClick={() => removeExpense(e.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
