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
      {/* Overview */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2 text-foreground">About the Metrics</h4>
        <p className="text-sm text-muted-foreground">
          Fractional Metrics (FWI) is a proprietary composite score measuring the health and momentum of the fractional executive market in real-time.
        </p>
      </div>

      {/* Components - High level only */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground text-sm uppercase tracking-wide">Index Components</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="font-medium text-foreground">Demand Signal</span>
            </div>
            <span className="text-sm text-muted-foreground">{(weights.demand * 100).toFixed(0)}% weight</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="font-medium text-foreground">Supply Signal</span>
            </div>
            <span className="text-sm text-muted-foreground">{(weights.supply * 100).toFixed(0)}% weight</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span className="font-medium text-foreground">Culture Signal</span>
            </div>
            <span className="text-sm text-muted-foreground">{(weights.culture * 100).toFixed(0)}% weight</span>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      <div className="border-t border-border pt-4">
        <h4 className="font-medium mb-2 text-foreground">Data Quality</h4>
        <p className="text-sm text-muted-foreground">
          The index aggregates data from multiple proprietary and public sources, normalized monthly and benchmarked against official labor statistics.
        </p>
      </div>
      
      {/* Pro teaser */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
        <h4 className="font-medium mb-1 text-foreground">Want the full methodology?</h4>
        <p className="text-sm text-muted-foreground">
          Detailed data sources, weighting algorithms, and signal processing documentation available for enterprise subscribers.
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
