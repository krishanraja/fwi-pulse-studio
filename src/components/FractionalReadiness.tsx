import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

const FractionalReadiness = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const targetValue = 62;

  useEffect(() => {
    const duration = 1500;
    const steps = 50;
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

  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  return (
    <motion.div 
      variants={fadeInUp}
      className="glass-card p-5 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground">Fractional Readiness</h3>
        <span className="text-[10px] font-medium bg-warning/10 text-warning px-2 py-0.5 rounded-full uppercase tracking-wide">
          Beta
        </span>
      </div>

      {/* Gauge */}
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="hsl(var(--border))"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#readinessGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="gauge-fill"
            />
            <defs>
              <linearGradient id="readinessGradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary count-up">
                {animatedValue}
              </div>
              <div className="text-[10px] text-muted-foreground">
                /100
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">
        Aggregate organizational readiness for fractional operating models
      </p>
    </motion.div>
  );
};

export default FractionalReadiness;
