import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/motion';
import type { AIInsight } from '@/lib/types';

// Mock AI insights - to be replaced with actual AI-generated content
const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'summary',
    title: 'Weekly Market Summary',
    body: 'Fractional executive demand surged +8% this week driven by Series A/B fundraising activity. Fractional CMO roles saw the largest spike (+12%), suggesting companies are prioritizing growth marketing expertise without full-time commitment.',
    confidence: 92,
    generatedAt: new Date().toISOString(),
    relatedSignals: ['Fractional CMO', 'Series A/B'],
  },
  {
    id: '2',
    type: 'prediction',
    title: 'Q1 2026 Outlook',
    body: 'Based on current momentum and seasonal patterns, the FWI is projected to reach 74 by end of Q1, representing a 6% increase from current levels. Key drivers: post-holiday hiring surge and budget cycle resets.',
    confidence: 78,
    generatedAt: new Date().toISOString(),
    relatedSignals: ['Overall FWI', 'Demand Index'],
  },
  {
    id: '3',
    type: 'opportunity',
    title: 'Emerging Role: Fractional CRO',
    body: '"Fractional CRO" search interest up 7% week-over-week. This emerging role shows strong demand-supply imbalance, presenting opportunities for revenue leaders considering fractional work.',
    confidence: 85,
    generatedAt: new Date().toISOString(),
    relatedSignals: ['Fractional CRO', 'Culture Index'],
  },
  {
    id: '4',
    type: 'alert',
    title: 'Supply Constraint: AI Strategists',
    body: 'AI Strategy Consultant supply is not keeping pace with demand (+9% supply vs +15% demand). Expect rate increases and longer placement times in this category over the next 30-60 days.',
    confidence: 88,
    generatedAt: new Date().toISOString(),
    relatedSignals: ['AI Strategy Consultant', 'Supply Index'],
  },
];

const getInsightIcon = (type: AIInsight['type']) => {
  switch (type) {
    case 'summary':
      return Sparkles;
    case 'prediction':
      return TrendingUp;
    case 'alert':
      return AlertTriangle;
    case 'opportunity':
      return Lightbulb;
  }
};

const getInsightColor = (type: AIInsight['type']) => {
  switch (type) {
    case 'summary':
      return 'text-primary bg-primary/10 border-primary/20';
    case 'prediction':
      return 'text-accent bg-accent/10 border-accent/20';
    case 'alert':
      return 'text-warning bg-warning/10 border-warning/20';
    case 'opportunity':
      return 'text-success bg-success/10 border-success/20';
  }
};

interface AIInsightsProps {
  compact?: boolean;
}

const AIInsights = ({ compact = false }: AIInsightsProps) => {
  const displayInsights = compact ? mockInsights.slice(0, 2) : mockInsights;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl font-semibold">AI Insights</h2>
        </div>
        <span className="text-xs text-muted-foreground">
          Updated {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Insights Cards */}
      <div className={compact ? "space-y-3" : "grid gap-4 md:grid-cols-2"}>
        {displayInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const colorClass = getInsightColor(insight.type);
          
          return (
            <motion.div
              key={insight.id}
              variants={fadeInUp}
              className="glass-card p-4 space-y-3 cursor-pointer hover:border-primary/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg border ${colorClass}`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {insight.type}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {insight.confidence}% confidence
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-medium text-foreground leading-tight">
                  {insight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.body}
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {insight.relatedSignals.map((signal) => (
                    <span
                      key={signal}
                      className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {compact && (
        <button className="w-full text-center text-sm text-primary font-medium py-2 hover:underline">
          View all insights →
        </button>
      )}
    </motion.div>
  );
};

export default AIInsights;
