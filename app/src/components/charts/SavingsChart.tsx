import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { YearProjection } from '../../types';
import { formatUsd } from '../../utils/calculations';

interface SavingsChartProps {
  data: YearProjection[];
  investmentUsd: number;
  paybackYears: number;
}

export function SavingsChart({ data, investmentUsd, paybackYears }: SavingsChartProps) {
  const chartData = data.map((d) => ({
    year: `Año ${d.year}`,
    yearNum: d.year,
    ahorro: d.cumulativeSavings,
    neto: d.netPosition,
    inversion: investmentUsd,
  }));

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAhorro" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorNeto" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              color: '#e2e8f0',
            }}
            formatter={(value: number | undefined, name: string | undefined) => [
              formatUsd(value ?? 0),
              name === 'ahorro' ? 'Ahorro acumulado' : 'Posición neta',
            ]}
          />
          <ReferenceLine
            y={investmentUsd}
            stroke="#f59e0b"
            strokeDasharray="5 5"
            label={{
              value: `Inversión: ${formatUsd(investmentUsd)}`,
              fill: '#f59e0b',
              fontSize: 11,
              position: 'right',
            }}
          />
          <ReferenceLine
            x={`Año ${Math.ceil(paybackYears)}`}
            stroke="#10b981"
            strokeDasharray="5 5"
            label={{
              value: `Recupero: ${paybackYears} años`,
              fill: '#10b981',
              fontSize: 11,
              position: 'top',
            }}
          />
          <Area
            type="monotone"
            dataKey="ahorro"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="url(#colorAhorro)"
            name="ahorro"
          />
          <Area
            type="monotone"
            dataKey="neto"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorNeto)"
            name="neto"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
