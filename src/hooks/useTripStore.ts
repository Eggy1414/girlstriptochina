import { useState, useEffect, useCallback } from "react";
import { DayPlan, Expense, PackingItem, INITIAL_DAYS, INITIAL_PACKING, generateId } from "@/data/tripData";
import { RouteDay, RouteActivity, INITIAL_ROUTE_DAYS } from "@/data/routeData";

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
  const [routeDays, setRouteDays] = useState<RouteDay[]>(() => loadFromStorage("trip-route", INITIAL_ROUTE_DAYS));

  useEffect(() => saveToStorage("trip-days", days), [days]);
  useEffect(() => saveToStorage("trip-expenses", expenses), [expenses]);
  useEffect(() => saveToStorage("trip-packing", packing), [packing]);
  useEffect(() => saveToStorage("trip-city-notes", cityNotes), [cityNotes]);
  useEffect(() => saveToStorage("trip-route", routeDays), [routeDays]);

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

  const togglePackingPerson = useCallback((id: string, person: string) => {
    setPacking(prev => prev.map(p => {
      if (p.id !== id) return p;
      const checkedBy = p.checkedBy || [];
      const updated = checkedBy.includes(person)
        ? checkedBy.filter(n => n !== person)
        : [...checkedBy, person];
      return { ...p, checkedBy: updated };
    }));
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

  // Route day operations
  const addRouteDay = useCallback((day: RouteDay) => {
    setRouteDays(prev => [...prev, day]);
  }, []);

  const removeRouteDay = useCallback((id: string) => {
    setRouteDays(prev => prev.filter(d => d.id !== id));
  }, []);

  const updateRouteDay = useCallback((id: string, updates: Partial<Omit<RouteDay, "id" | "activities">>) => {
    setRouteDays(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  }, []);

  const addRouteActivity = useCallback((dayId: string, activity: RouteActivity) => {
    setRouteDays(prev => prev.map(d =>
      d.id === dayId ? { ...d, activities: [...d.activities, activity] } : d
    ));
  }, []);

  const removeRouteActivity = useCallback((dayId: string, activityId: string) => {
    setRouteDays(prev => prev.map(d =>
      d.id === dayId ? { ...d, activities: d.activities.filter(a => a.id !== activityId) } : d
    ));
  }, []);

  return {
    days, setDays, updateDay,
    expenses, addExpense, removeExpense,
    packing, togglePacking, togglePackingPerson, addPackingItem, removePackingItem,
    cityNotes, updateCityNote,
    routeDays, addRouteDay, removeRouteDay, updateRouteDay, addRouteActivity, removeRouteActivity,
  };
}
