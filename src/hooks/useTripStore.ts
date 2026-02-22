import { useState, useEffect, useCallback } from "react";
import { DayPlan, Expense, PackingItem, INITIAL_DAYS, INITIAL_PACKING } from "@/data/tripData";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useTripStore() {
  const [days, setDays] = useState<DayPlan[]>(() => loadFromStorage("trip-days", INITIAL_DAYS));
  const [expenses, setExpenses] = useState<Expense[]>(() => loadFromStorage("trip-expenses", []));
  const [packing, setPacking] = useState<PackingItem[]>(() => loadFromStorage("trip-packing", INITIAL_PACKING));
  const [cityNotes, setCityNotes] = useState<Record<string, string>>(() => loadFromStorage("trip-city-notes", {}));

  useEffect(() => saveToStorage("trip-days", days), [days]);
  useEffect(() => saveToStorage("trip-expenses", expenses), [expenses]);
  useEffect(() => saveToStorage("trip-packing", packing), [packing]);
  useEffect(() => saveToStorage("trip-city-notes", cityNotes), [cityNotes]);

  const updateDay = useCallback((date: string, updater: (day: DayPlan) => DayPlan) => {
    setDays(prev => prev.map(d => d.date === date ? updater(d) : d));
  }, []);

  const addExpense = useCallback((expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  }, []);

  const removeExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const togglePacking = useCallback((id: string) => {
    setPacking(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  }, []);

  const addPackingItem = useCallback((item: PackingItem) => {
    setPacking(prev => [...prev, item]);
  }, []);

  const removePackingItem = useCallback((id: string) => {
    setPacking(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateCityNote = useCallback((city: string, note: string) => {
    setCityNotes(prev => ({ ...prev, [city]: note }));
  }, []);

  return {
    days, setDays, updateDay,
    expenses, addExpense, removeExpense,
    packing, togglePacking, addPackingItem, removePackingItem,
    cityNotes, updateCityNote,
  };
}
