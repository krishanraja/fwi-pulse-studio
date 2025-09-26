import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Download, BookOpen } from 'lucide-react';
import { calcComposite } from '@/pages/Index';

interface HeroSectionProps {
  data: any;
  onShowMethodology: () => void;
}

const HeroSection = ({ data, onShowMethodology }: HeroSectionProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const compositeScore = calcComposite(data.today, data.weights);
  const delta = data.today.delta30d;
  const isPositive = delta >= 0;

  useEffect(() => {
    // Animate the counter on load
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = compositeScore / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= compositeScore) {
        current = compositeScore;
        clearInterval(timer);
        setIsLoaded(true);
      }
      setAnimatedScore(Math.round(current * 10) / 10);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [compositeScore]);

  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground font-primary">
          Fractional Working Index
        </h1>
        <p className="text-lg text-muted-foreground">
          Real-time intelligence on the fractional economy
        </p>
      </div>

      <div className="glass-card p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Main Score */}
          <div className="md:col-span-1 space-y-2">
            <div className="score-large count-up text-primary">
              {animatedScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              Current Index Score
            </div>
          </div>

          {/* Delta */}
          <div className="md:col-span-1 space-y-2">
            <div className={`flex items-center justify-center gap-2 text-2xl font-semibold ${
              isPositive ? 'stat-up' : 'stat-down'
            }`}>
              {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
              {isPositive ? '+' : ''}{delta.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              30-day change
            </div>
          </div>

          {/* Meta Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(data.asOf).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short', 
                day: 'numeric'
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="btn-primary" onClick={() => window.open('/assets/fwi_sample_report.pdf', '_blank')}>
                <Download size={16} />
                Get Full Report
              </Button>
              <Button variant="outline" className="btn-secondary" onClick={onShowMethodology}>
                <BookOpen size={16} />
                Methodology
              </Button>
            </div>
          </div>
        </div>

        {/* Weight indicators */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>Demand (40%)</span>
            <span>Supply (40%)</span>
            <span>Culture (20%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;