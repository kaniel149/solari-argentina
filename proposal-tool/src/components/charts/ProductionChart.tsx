import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { formatNumber } from '../../utils/calculations';

interface ProductionChartProps {
  monthlyProduction: number[];
  monthlyConsumption: number;
}

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export function ProductionChart({ monthlyProduction, monthlyConsumption }: ProductionChartProps) {
  const data = monthlyProduction.map((prod, i) => ({
    month: monthNames[i],
    produccion: prod,
    consumo: monthlyConsumption,
    excedente: Math.max(0, prod - monthlyConsumption),
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
            tickFormatter={(v: number) => `${v}`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              color: '#e2e8f0',
            }}
            formatter={(value: number, name: string) => [
              `${formatNumber(value)} kWh`,
              name === 'produccion' ? 'Producción solar' : 'Consumo',
            ]}
          />
          <ReferenceLine
            y={monthlyConsumption}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{
              value: `Consumo: ${formatNumber(monthlyConsumption)} kWh`,
              fill: '#ef4444',
              fontSize: 11,
              position: 'right',
            }}
          />
          <Bar
            dataKey="produccion"
            fill="url(#barGrad)"
            radius={[6, 6, 0, 0]}
            name="produccion"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
