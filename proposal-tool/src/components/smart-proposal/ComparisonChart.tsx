import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { motion } from 'framer-motion';
import { formatArs } from '../../utils/calculations';

interface ComparisonChartProps {
  currentBill: number;
  solarBill: number;
  monthlySavings: number;
}

export function ComparisonChart({ currentBill, solarBill, monthlySavings }: ComparisonChartProps) {
  const data = [
    { name: 'Factura actual', value: currentBill, fill: '#f59e0b' },
    { name: 'Con Solar', value: solarBill, fill: '#10b981' },
  ];

  const renderLabel = (props: { x?: number; y?: number; width?: number; value?: number }) => {
    const { x = 0, y = 0, width = 0, value = 0 } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#e2e8f0"
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
      >
        {formatArs(value)}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl animated-border p-[1px]">
          <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center text-xl">
            📉
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Comparación de factura</h2>
          <p className="text-sm text-dark-400">Tu factura antes y despues de instalar solar</p>
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-6">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
              barCategoryGap="30%"
            >
              <XAxis
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 13 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={100}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" content={renderLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Savings arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <span className="text-2xl">💰</span>
          <div className="text-center">
            <p className="text-sm text-dark-400">Ahorro mensual estimado</p>
            <p className="text-2xl font-bold text-emerald-400">{formatArs(monthlySavings)}</p>
          </div>
          <span className="text-2xl">↓</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
