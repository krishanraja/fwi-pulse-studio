import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import SubIndexCards from '@/components/SubIndexCards';
import TrendlineChart from '@/components/TrendlineChart';
import SignalsTable from '@/components/SignalsTable';
import FractionalReadiness from '@/components/FractionalReadiness';
import MethodologyModal from '@/components/MethodologyModal';
import DataWiring from '@/components/DataWiring';
import { Button } from '@/components/ui/button';

// Fractional Working Index: dummy data v1
export const FWI_DATA = {
  asOf: "2025-09-23",
  weights: { demand: 0.4, supply: 0.4, culture: 0.2 },
  monthly: {
    months: ["2024-10","2024-11","2024-12","2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09"],
    overall: [52,54,56,57,59,61,62,63,65,66,67,68],
    demand:  [55,57,58,60,62,64,64,66,68,70,71,72],
    supply:  [49,51,54,55,57,58,60,61,63,64,64,65],
    culture: [44,46,47,49,50,53,54,54,56,56,57,58]
  },
  today: {
    overall: 68.4, 
    delta30d: 4.2,
    demand: { score: 72, delta30d: 6.0 },
    supply: { score: 65, delta30d: 3.0 },
    culture:{ score: 58, delta30d: 5.0 }
  },
  movers: [
    { skill:"Fractional CMO", type:"demand", change_pct: +12, note:"Spike in enterprise RFPs" },
    { skill:"AI Product Consultant", type:"supply", change_pct: +9, note:"Upwork listings up" },
    { skill:"Fractional CFO", type:"demand", change_pct: +8, note:"Series A/B hiring" },
    { skill:"Data Clean Rooms", type:"culture", change_pct: +7, note:"Search interest rising" },
    { skill:"Agentic Workflow PM", type:"demand", change_pct: +6, note:"Retail media pilots" }
  ]
};

// Composite calculator
export function calcComposite(d: any, w: any) {
  return Math.round(((d.demand.score * w.demand) + (d.supply.score * w.supply) + (d.culture.score * w.culture)) * 10) / 10;
}

const Index = () => {
  const [showMethodology, setShowMethodology] = useState(false);

  useEffect(() => {
    // Preload data and initialize components
    document.title = "Fractional Working Index - Real-time Market Intelligence";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="container-width py-8">
        <HeroSection data={FWI_DATA} onShowMethodology={() => setShowMethodology(true)} />
      </header>

      {/* Main Content */}
      <main className="container-width space-y-8 pb-16">
        {/* Sub-Index Cards */}
        <section id="sub-indices">
          <SubIndexCards data={FWI_DATA} />
        </section>

        {/* 12-Month Trendline */}
        <section id="trendline" className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">12-Month Trend</h2>
          <TrendlineChart data={FWI_DATA.monthly} />
        </section>

        {/* Two-column layout for signals and readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Signals Table */}
          <section id="signals" className="lg:col-span-2 glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Market Signals (Last 7 Days)</h2>
            <SignalsTable movers={FWI_DATA.movers} />
          </section>

          {/* Fractional Readiness */}
          <aside id="readiness">
            <FractionalReadiness />
          </aside>
        </div>

        {/* Data Wiring */}
        <DataWiring />
      </main>

      {/* Methodology Modal */}
      {showMethodology && (
        <MethodologyModal 
          isOpen={showMethodology}
          onClose={() => setShowMethodology(false)}
          weights={FWI_DATA.weights}
        />
      )}
    </div>
  );
};

export default Index;