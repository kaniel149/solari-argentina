import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { formatUsd } from '../../utils/calculations';

interface CostBreakdownChartProps {
  breakdown: {
    panels: number;
    inverter: number;
    mounting: number;
    cabling: number;
    protections: number;
    installation: number;
    permits: number;
    design: number;
  };
}

const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#f59e0b', '#fbbf24', '#10b981', '#34d399', '#a78bfa'];
const LABELS: Record<string, string> = {
  panels: 'Paneles solares',
  inverter: 'Inversor',
  mounting: 'Estructura',
  cabling: 'Cableado',
  protections: 'Protecciones',
  installation: 'Instalación',
  permits: 'Permisos',
  design: 'Diseño',
};

export function CostBreakdownChart({ breakdown }: CostBreakdownChartProps) {
  const data = Object.entries(breakdown)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: LABELS[key] || key,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex items-center gap-6">
      <div className="w-[180px] h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
              formatter={(value: number) => [formatUsd(value)]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1 space-y-2">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="text-dark-300">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-dark-500 text-xs">
                {Math.round((item.value / total) * 100)}%
              </span>
              <span className="text-white font-medium">{formatUsd(item.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
