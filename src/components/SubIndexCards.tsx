import { TrendingUp, TrendingDown, Users, Briefcase, TrendingUpIcon } from 'lucide-react';
import SparklineChart from './SparklineChart';

interface SubIndexCardsProps {
  data: any;
}

const SubIndexCards = ({ data }: SubIndexCardsProps) => {
  const indices = [
    {
      title: 'Demand Index',
      weight: '40%',
      score: data.today.demand.score,
      delta: data.today.demand.delta30d,
      description: 'Job postings & employer activity',
      sparklineData: data.monthly.demand,
      icon: Briefcase,
      color: 'text-primary'
    },
    {
      title: 'Supply Index', 
      weight: '40%',
      score: data.today.supply.score,
      delta: data.today.supply.delta30d,
      description: 'Freelancer/marketplace & repo activity',
      sparklineData: data.monthly.supply,
      icon: Users,
      color: 'text-accent'
    },
    {
      title: 'Cultural Adoption Index',
      weight: '20%',
      score: data.today.culture.score,
      delta: data.today.culture.delta30d,
      description: 'Google Trends, events, media mentions',
      sparklineData: data.monthly.culture,
      icon: TrendingUpIcon,
      color: 'text-secondary'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {indices.map((index, i) => {
        const isPositive = index.delta >= 0;
        const Icon = index.icon;
        
        return (
          <div key={i} className="glass-card index-card p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${index.color}`} />
                <div>
                  <h3 className="font-semibold">{index.title}</h3>
                  <span className="text-sm text-muted-foreground">{index.weight}</span>
                </div>
              </div>
            </div>

            {/* Score and Delta */}
            <div className="flex items-end justify-between">
              <div className="score-medium text-foreground">
                {index.score}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                isPositive ? 'stat-up' : 'stat-down'
              }`}>
                {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {isPositive ? '+' : ''}{index.delta.toFixed(1)}
              </div>
            </div>

            {/* Sparkline */}
            <div className="h-12">
              <SparklineChart 
                data={index.sparklineData}
                months={data.monthly.months}
                color={index.color.replace('text-', '')}
              />
            </div>

            {/* Description */}
            <div className="text-sm text-muted-foreground border-t border-border pt-3">
              {index.description}
              <br />
              <span className="text-xs opacity-75">Source stubs: see Data Wiring</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubIndexCards;