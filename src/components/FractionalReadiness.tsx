import { useEffect, useRef, useState } from 'react';
import { Gauge } from 'lucide-react';

const FractionalReadiness = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const targetValue = 62; // Beta value

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      setAnimatedValue(Math.round(current));
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetValue]);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="glass-card p-6 space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <Gauge className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Fractional Readiness</h3>
        <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
          beta
        </span>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Mindmaker proprietary metric
      </div>

      {/* Gauge - centered and flexible */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--border))"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gaugeGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="gauge-fill"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gaugeGradient" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary count-up">
                  {animatedValue}
                </div>
                <div className="text-xs text-muted-foreground">
                  out of 100
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Aggregate anonymized signals from AI Literacy assessments and advisory sprints to estimate organizational readiness for fractional operating models.
          </p>
          <div className="text-xs opacity-75 border-t border-border pt-2">
            Developer note: future endpoint <code className="bg-muted px-1 rounded">/api/fwi/readiness</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractionalReadiness;