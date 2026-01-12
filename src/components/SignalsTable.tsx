import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Mover } from '@/lib/types';

interface SignalsTableProps {
  movers: Mover[];
}

const SignalsTable = ({ movers }: SignalsTableProps) => {
  const getTypeDot = (type: string) => {
    const colors: Record<string, string> = {
      demand: 'bg-primary',
      supply: 'bg-accent', 
      culture: 'bg-secondary'
    };
    return colors[type] || 'bg-muted-foreground';
  };

  return (
    <div className="overflow-x-auto">
      {/* Mobile Cards */}
      <div className="block md:hidden space-y-3">
        {movers.map((mover, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-2 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getTypeDot(mover.type)}`} />
                <span className="font-medium text-foreground">{mover.skill}</span>
              </div>
              <div className={`flex items-center gap-1 font-semibold text-sm ${
                mover.change_pct >= 0 ? 'stat-up' : 'stat-down'
              }`}>
                {mover.change_pct >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {mover.change_pct >= 0 ? '+' : ''}{mover.change_pct}%
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{mover.note}</p>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Role</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Type</th>
            <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm">Change</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Insight</th>
          </tr>
        </thead>
        <tbody>
          {movers.map((mover, index) => (
            <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-3.5 px-4">
                <span className="font-medium text-foreground">{mover.skill}</span>
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getTypeDot(mover.type)}`} />
                  <span className="text-sm text-muted-foreground capitalize">{mover.type}</span>
                </div>
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className={`inline-flex items-center gap-1 font-semibold text-sm ${
                  mover.change_pct >= 0 ? 'stat-up' : 'stat-down'
                }`}>
                  {mover.change_pct >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {mover.change_pct >= 0 ? '+' : ''}{mover.change_pct}%
                </div>
              </td>
              <td className="py-3.5 px-4 text-muted-foreground text-sm">
                {mover.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignalsTable;
