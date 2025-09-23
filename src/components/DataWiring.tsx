import { useState } from 'react';
import { ChevronDown, ChevronRight, Code, Database, TrendingUp, Globe } from 'lucide-react';

const DataWiring = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sources = [
    {
      title: 'A) Demand (40%) — Jobs/Postings',
      icon: Database,
      color: 'text-primary',
      sources: ['Indeed', 'RemoteOK', 'AngelList', 'company career pages', 'LinkedIn Talent Insights'],
      quickPath: [
        'Apify or n8n + Playwright → scrape weekly counts of postings with keywords:',
        '["fractional", "contract", "part-time", "advisor", "interim", "consultant"]',
        'Push aggregates to Google Sheets (fwi_jobs!A:D: date, source, role, count)',
        'A tiny Cloud Function exposes /api/fwi/demand → {date, role, count} and a weekly total'
      ],
      todo: 'replace FWI_DATA.monthly.demand with GET /api/fwi/demand?bucket=monthly'
    },
    {
      title: 'B) Supply (40%) — Marketplaces & Repos',
      icon: TrendingUp,
      color: 'text-accent',
      sources: ['Upwork', 'Fiverr (public listings)', 'GitHub (repos tagged by skill)', 'LinkedIn profile titles containing "fractional"'],
      quickPath: [
        'Upwork/Fiverr: daily scrape category pages → median hourly & #new gigs',
        'GitHub API: count new repos/issues for tags: "fractional", "contract", "freelance", "agentic"',
        'Store weekly in Supabase table supply_signal(date, metric, value)'
      ],
      todo: 'replace FWI_DATA.monthly.supply with GET /api/fwi/supply?bucket=monthly'
    },
    {
      title: 'C) Culture (20%) — Search & Events',
      icon: Globe,
      color: 'text-secondary',
      sources: ['Google Trends', 'Meetup/Eventbrite event counts', 'press mentions'],
      quickPath: [
        'Trends scraper (Apify or pytrends on a cron) → normalized 0–100 weekly',
        'Eventbrite API: count events with "fractional", "future of work", "gig economy"',
        'Store in Airtable base culture_signal'
      ],
      todo: 'replace FWI_DATA.monthly.culture with GET /api/fwi/culture?bucket=monthly'
    }
  ];

  return (
    <div className="glass-card">
      <button 
        className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 text-warning" />
          <div>
            <h3 className="font-semibold">Data Wiring (Swap Dummy → Live)</h3>
            <p className="text-sm text-muted-foreground">Developer implementation guide with exact API stubs</p>
          </div>
        </div>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-6">
          {sources.map((source, index) => {
            const Icon = source.icon;
            return (
              <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                <h4 className={`font-semibold flex items-center gap-2 ${source.color}`}>
                  <Icon size={18} />
                  {source.title}
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Sources:</p>
                    <p className="text-sm text-muted-foreground">
                      {source.sources.join(', ')}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Quick path:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {source.quickPath.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-1">•</span>
                          <span className={step.includes('[') || step.includes('{') ? 'font-mono text-xs bg-muted px-1 rounded' : ''}>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-warning/5 border border-warning/20 rounded p-3">
                    <p className="text-sm font-medium text-warning mb-1">TODO in code:</p>
                    <code className="text-xs text-muted-foreground font-mono">{source.todo}</code>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Additional sections */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-success">D) Composite Calculation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep weights editable at runtime (sliders or query params)</li>
                <li>• Default {'{0.4, 0.4, 0.2}'}</li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-error">E) Governance / Audit</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Log source, last fetch, coverage % per source</li>
                <li>• Provide a "data dictionary" link in the report</li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-muted-foreground border-t border-border pt-4">
            <p>
              <strong>Implementation Note:</strong> All data fetchers are currently returning dummy data from FWI_DATA. 
              Replace the return statements in the async functions with actual API calls to the endpoints listed above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataWiring;