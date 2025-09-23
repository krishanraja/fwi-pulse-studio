import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Mover {
  skill: string;
  type: string;
  change_pct: number;
  note: string;
}

interface SignalsTableProps {
  movers: Mover[];
}

const SignalsTable = ({ movers }: SignalsTableProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'demand':
        return <Activity className="w-4 h-4 text-primary" />;
      case 'supply':
        return <Activity className="w-4 h-4 text-accent" />;
      case 'culture':
        return <Activity className="w-4 h-4 text-secondary" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      demand: 'bg-primary/10 text-primary border-primary/20',
      supply: 'bg-accent/10 text-accent border-accent/20', 
      culture: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${
        styles[type as keyof typeof styles] || 'bg-muted text-muted-foreground'
      }`}>
        {getTypeIcon(type)}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Mobile Cards */}
      <div className="block md:hidden space-y-3">
        {movers.map((mover, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">{mover.skill}</h4>
                {getTypeBadge(mover.type)}
              </div>
              <div className={`flex items-center gap-1 font-semibold ${
                mover.change_pct >= 0 ? 'stat-up' : 'stat-down'
              }`}>
                {mover.change_pct >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
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
            <th className="text-left py-3 px-4 font-semibold">Skill/Role</th>
            <th className="text-left py-3 px-4 font-semibold">Type</th>
            <th className="text-right py-3 px-4 font-semibold">% Change</th>
            <th className="text-left py-3 px-4 font-semibold">Note</th>
          </tr>
        </thead>
        <tbody>
          {movers.map((mover, index) => (
            <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
              <td className="py-4 px-4">
                <div className="font-medium">{mover.skill}</div>
              </td>
              <td className="py-4 px-4">
                {getTypeBadge(mover.type)}
              </td>
              <td className="py-4 px-4 text-right">
                <div className={`flex items-center justify-end gap-1 font-semibold ${
                  mover.change_pct >= 0 ? 'stat-up' : 'stat-down'
                }`}>
                  {mover.change_pct >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {mover.change_pct >= 0 ? '+' : ''}{mover.change_pct}%
                </div>
              </td>
              <td className="py-4 px-4 text-muted-foreground">
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