import { Download } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-mobile';

interface MethodologyDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weights: {
    demand: number;
    supply: number;
    culture: number;
  };
}

const MethodologyContent = ({ weights }: { weights: MethodologyDrawerProps['weights'] }) => {
  return (
    <div className="space-y-6 py-4">
      {/* Formula */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2 text-foreground">Composite Formula</h4>
        <div className="font-mono text-sm text-muted-foreground">
          FWI = {(weights.demand * 100).toFixed(0)}% × Demand + {(weights.supply * 100).toFixed(0)}% × Supply + {(weights.culture * 100).toFixed(0)}% × Culture
        </div>
      </div>

      {/* Components */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h4 className="font-medium text-foreground">Demand ({(weights.demand * 100).toFixed(0)}%)</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-5">
            Weekly new postings tagged fractional/contract/interim across job boards and company career pages.
          </p>
          <div className="text-xs text-muted-foreground pl-5 space-y-0.5">
            <p>• Indeed, RemoteOK, AngelList</p>
            <p>• LinkedIn Talent Insights</p>
            <p>• Company career pages</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <h4 className="font-medium text-foreground">Supply ({(weights.supply * 100).toFixed(0)}%)</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-5">
            Active gigs & rates on marketplaces plus developer activity as a talent proxy.
          </p>
          <div className="text-xs text-muted-foreground pl-5 space-y-0.5">
            <p>• Upwork, Fiverr listings</p>
            <p>• GitHub repo activity</p>
            <p>• LinkedIn profiles</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <h4 className="font-medium text-foreground">Culture ({(weights.culture * 100).toFixed(0)}%)</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-5">
            Search momentum, event counts, and media mentions indicating adoption.
          </p>
          <div className="text-xs text-muted-foreground pl-5 space-y-0.5">
            <p>• Google Trends data</p>
            <p>• Meetup/Eventbrite events</p>
            <p>• Press mentions</p>
          </div>
        </div>
      </div>

      {/* Normalization */}
      <div className="border-t border-border pt-4">
        <h4 className="font-medium mb-2 text-foreground">Normalization</h4>
        <p className="text-sm text-muted-foreground">
          Each signal is scaled 0–100 monthly, then weighted. The index is anchored annually to official labor statistics (BLS/OECD).
        </p>
      </div>

      {/* CTA */}
      <Button 
        className="w-full"
        onClick={() => window.open('/assets/fwi_sample_report.pdf', '_blank')}
      >
        <Download size={16} className="mr-2" />
        Download Full Report
      </Button>
    </div>
  );
};

const MethodologyDrawer = ({ open, onOpenChange, weights }: MethodologyDrawerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Methodology</DrawerTitle>
            <DrawerDescription>How the FWI is computed</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8 overflow-y-auto">
            <MethodologyContent weights={weights} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Methodology</SheetTitle>
          <SheetDescription>How the FWI is computed</SheetDescription>
        </SheetHeader>
        <MethodologyContent weights={weights} />
      </SheetContent>
    </Sheet>
  );
};

export default MethodologyDrawer;
