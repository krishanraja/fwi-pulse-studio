import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import SparklineChart from './SparklineChart';
import { fadeInUp } from '@/lib/motion';

interface SubIndexCardsProps {
  data: any;
  compact?: boolean;
}

const SubIndexCards = ({ data, compact = false }: SubIndexCardsProps) => {
  const indices = [
    {
      title: 'Demand',
      weight: data.weights.demand,
      score: data.today.demand.score,
      delta: data.today.demand.delta30d,
      description: 'Job postings & employer activity',
      sparklineData: data.monthly.demand,
      colorClass: 'bg-primary',
      colorName: 'primary'
    },
    {
      title: 'Supply', 
      weight: data.weights.supply,
      score: data.today.supply.score,
      delta: data.today.supply.delta30d,
      description: 'Freelancer marketplace & talent activity',
      sparklineData: data.monthly.supply,
      colorClass: 'bg-accent',
      colorName: 'accent'
    },
    {
      title: 'Culture',
      weight: data.weights.culture,
      score: data.today.culture.score,
      delta: data.today.culture.delta30d,
      description: 'Search trends, events, media coverage',
      sparklineData: data.monthly.culture,
      colorClass: 'bg-secondary',
      colorName: 'secondary'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {indices.map((index, i) => {
        const isPositive = index.delta >= 0;
        
        return (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            className="glass-card index-card p-5 hover-lift cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${index.colorClass}`} />
                <h3 className="font-medium text-foreground">{index.title}</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.round(index.weight * 100)}%
              </span>
            </div>

            {/* Score and Delta */}
            <div className="flex items-end justify-between mb-4">
              <div className="score-medium text-foreground">
                {index.score}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                isPositive ? 'stat-up' : 'stat-down'
              }`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPositive ? '+' : ''}{index.delta.toFixed(1)}
              </div>
            </div>

            {/* Sparkline */}
            {!compact && (
              <div className="h-10 mb-3">
                <SparklineChart 
                  data={index.sparklineData}
                  months={data.monthly.months}
                  color={index.colorName}
                />
              </div>
            )}

            {/* Description */}
            {!compact && (
              <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                {index.description}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SubIndexCards;
