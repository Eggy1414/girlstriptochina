import { useState } from "react";
import { useTripStore } from "@/hooks/useTripStore";
import TripDashboard from "@/components/TripDashboard";

import BudgetTracker from "@/components/BudgetTracker";
import Timeline from "@/components/Timeline";

import PackingList from "@/components/PackingList";

const TABS = [
  { id: "overview", label: "Overview", emoji: "🌏" },
  
  { id: "budget", label: "Expenses", emoji: "💰" },
  { id: "timeline", label: "Timeline", emoji: "📅" },

  { id: "packing", label: "Packing", emoji: "🎒" },
] as const;

type TabId = typeof TABS[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const store = useTripStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Tab Navigation */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            <span className="text-lg mr-1 hidden sm:inline">🏮</span>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-display font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-foreground/70"
                }`}
              >
                <span>{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
            <span className="text-lg ml-1 hidden sm:inline">🏮</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === "overview" && <TripDashboard />}
        
        {activeTab === "budget" && <BudgetTracker expenses={store.expenses} addExpense={store.addExpense} removeExpense={store.removeExpense} />}
        {activeTab === "timeline" && <Timeline days={store.days} updateDay={store.updateDay} />}

        {activeTab === "packing" && <PackingList packing={store.packing} togglePacking={store.togglePacking} togglePackingPerson={store.togglePackingPerson} addPackingItem={store.addPackingItem} removePackingItem={store.removePackingItem} cityNotes={store.cityNotes} updateCityNote={store.updateCityNote} />}
      </main>
    </div>
  );
};

export default Index;
