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

function calculateSettlements(expenses: Expense[]) {
  // Net balance for each person (positive = owed money, negative = owes money)
  const net: Record<string, number> = {};
  PEOPLE.forEach(p => { net[p] = 0; });

  expenses.forEach(e => {
    const paidBy = e.paidBy || PEOPLE[0];
    const splitAmong = e.splitAmong && e.splitAmong.length > 0
      ? e.splitAmong
      : PEOPLE.slice(0, e.splitCount || 1);
    const share = e.amount / splitAmong.length;

    net[paidBy] += e.amount; // they paid this much
    splitAmong.forEach(p => {
      net[p] -= share; // they owe this much
    });
  });

  // Settle debts: people who owe pay people who are owed
  const debtors = PEOPLE.filter(p => net[p] < -0.01).map(p => ({ name: p, amount: -net[p] }));
  const creditors = PEOPLE.filter(p => net[p] > 0.01).map(p => ({ name: p, amount: net[p] }));

  const settlements: { from: string; to: string; amount: number }[] = [];
  let di = 0, ci = 0;
  while (di < debtors.length && ci < creditors.length) {
    const transfer = Math.min(debtors[di].amount, creditors[ci].amount);
    if (transfer > 0.01) {
      settlements.push({ from: debtors[di].name, to: creditors[ci].name, amount: transfer });
    }
    debtors[di].amount -= transfer;
    creditors[ci].amount -= transfer;
    if (debtors[di].amount < 0.01) di++;
    if (creditors[ci].amount < 0.01) ci++;
  }

  return { net, settlements };
}

export default function BudgetTracker({ expenses, addExpense, removeExpense }: Props) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState<Expense["category"]>("food");
  const [city, setCity] = useState<CityKey>("chongqing");
  const [paidBy, setPaidBy] = useState<string>(PEOPLE[0]);
  const [splitAmong, setSplitAmong] = useState<string[]>([...PEOPLE]);

  const parsedAmount = parseFloat(amount) || 0;
  const perPerson = parsedAmount > 0 && splitAmong.length > 0 ? parsedAmount / splitAmong.length : 0;

  const toggleSplitPerson = (person: string) => {
    setSplitAmong(prev =>
      prev.includes(person) ? prev.filter(p => p !== person) : [...prev, person]
    );
  };

  const handleAdd = () => {
    if (!parsedAmount || splitAmong.length === 0) return;
    addExpense({
      id: generateId(),
      amount: parsedAmount,
      currency: "CNY",
      category,
      city,
      note,
      date: new Date().toISOString().slice(0, 10),
      paidBy,
      splitAmong,
      splitCount: splitAmong.length,
    });
    setAmount("");
    setNote("");
  };

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);

  // Per-person totals
  const perPersonPaid: Record<string, number> = {};
  const perPersonOwes: Record<string, number> = {};
  PEOPLE.forEach(p => { perPersonPaid[p] = 0; perPersonOwes[p] = 0; });

  expenses.forEach(e => {
    if (e.paidBy) perPersonPaid[e.paidBy] += e.amount;
    const splitPeople = e.splitAmong && e.splitAmong.length > 0
      ? e.splitAmong
      : PEOPLE.slice(0, e.splitCount || 1);
    const share = e.amount / splitPeople.length;
    splitPeople.forEach(p => { perPersonOwes[p] += share; });
  });

  // By category
  const byCategory: Record<string, number> = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });

  // By city
  const byCity: Record<string, number> = {};
  expenses.forEach(e => { byCity[e.city] = (byCity[e.city] || 0) + e.amount; });

  // Settlements
  const { settlements } = calculateSettlements(expenses);

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

            {/* Who Owes Who - Settlements */}
            {settlements.length > 0 && (
              <div>
                <p className="text-xs text-foreground/50 mb-2 font-bold uppercase tracking-wide">Settlement Plan</p>
                <div className="space-y-2">
                  {settlements.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-accent/10 rounded-lg px-3 py-2 text-sm">
                      <span className="font-bold text-destructive">{s.from}</span>
                      <span className="text-foreground/40">→</span>
                      <span className="font-bold text-foreground">{s.to}</span>
                      <span className="ml-auto font-display font-bold">¥{s.amount.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

        {/* Paid By & Split Among */}
        <div className="space-y-3">
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

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-foreground/60">Split among:</span>
            {PEOPLE.map(p => (
              <button
                key={p}
                onClick={() => toggleSplitPerson(p)}
                className={`text-xs px-3 py-1.5 rounded-full border border-border font-bold transition-colors ${
                  splitAmong.includes(p)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent/30 text-foreground/50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <AnimatePresence>
          {parsedAmount > 0 && splitAmong.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-accent/20 rounded-lg p-3 text-sm space-y-1"
            >
              <div className="font-display font-bold">
                {paidBy} paid ¥{parsedAmount.toFixed(2)}.{" "}
                {splitAmong.length > 1
                  ? `Split among ${splitAmong.join(", ")} — ¥${perPerson.toFixed(2)} each.`
                  : `${splitAmong[0]} pays full amount.`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={handleAdd} className="w-full" disabled={!parsedAmount || splitAmong.length === 0}>
          Add Expense
        </Button>
      </div>

      {/* Expense Log */}
      {expenses.length > 0 && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-display font-bold text-sm mb-3">Expense Log</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {[...expenses].reverse().map(e => {
              const splitPeople = e.splitAmong && e.splitAmong.length > 0
                ? e.splitAmong
                : PEOPLE.slice(0, e.splitCount || 1);
              return (
                <div
                  key={e.id}
                  className="flex items-start gap-2 text-sm py-2 px-2 rounded-md group hover:bg-accent/10 transition-colors"
                >
                  <span>{CATEGORY_EMOJI[e.category]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{e.note || e.category}</div>
                    <div className="text-xs text-foreground/50">
                      {e.paidBy && <span>{e.paidBy} paid</span>}
                      {splitPeople.length > 1 && (
                        <span> · split: {splitPeople.join(", ")} · ¥{(e.amount / splitPeople.length).toFixed(2)} each</span>
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
