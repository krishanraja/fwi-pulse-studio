import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  weights: {
    demand: number;
    supply: number;
    culture: number;
  };
}

const MethodologyModal = ({ isOpen, onClose, weights }: MethodologyModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center">
        <div className="glass-card max-w-4xl max-h-full overflow-y-auto p-6 w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Methodology</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Formula */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How the FWI is computed</h3>
              <div className="font-mono text-lg">
                FWI = {(weights.demand * 100).toFixed(0)}% × Demand + {(weights.supply * 100).toFixed(0)}% × Supply + {(weights.culture * 100).toFixed(0)}% × Culture
              </div>
            </div>

            {/* Components */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  Demand ({(weights.demand * 100).toFixed(0)}%)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Weekly new postings tagged fractional/contract/interim across selected job boards + company career pages; deduped and normalized.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Indeed API job search</li>
                  <li>• RemoteOK postings</li>
                  <li>• AngelList startup roles</li>
                  <li>• LinkedIn Talent Insights</li>
                  <li>• Company career pages</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-accent flex items-center gap-2">
                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                  Supply ({(weights.supply * 100).toFixed(0)}%)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Active gigs & median rates on marketplaces + developer activity (repos/issues) as a proxy for available talent.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Upwork active listings</li>
                  <li>• Fiverr gig counts</li>
                  <li>• GitHub repo activity</li>
                  <li>• LinkedIn "fractional" profiles</li>
                  <li>• Freelancer marketplace data</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-secondary flex items-center gap-2">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  Culture ({(weights.culture * 100).toFixed(0)}%)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Search momentum, event counts, and media mentions indicating cultural adoption.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Google Trends data</li>
                  <li>• Meetup/Eventbrite events</li>
                  <li>• Press mentions</li>
                  <li>• Social media signals</li>
                  <li>• Industry reports</li>
                </ul>
              </div>
            </div>

            {/* Normalization */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-3">Normalization</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Each signal is scaled 0–100 per month, then weighted and aggregated according to the formula above.
                </p>
                <p>
                  The index is anchored annually to official labor statistics for credibility (e.g., BLS/OECD data), with detailed methodology published in our full report.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-4">
              <Button 
                className="btn-primary" 
                onClick={() => window.open('/assets/fwi_sample_report.pdf', '_blank')}
              >
                <Download size={16} />
                Get Full Report (PDF)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MethodologyModal;