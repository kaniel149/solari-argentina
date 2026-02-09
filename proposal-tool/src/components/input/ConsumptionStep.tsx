import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { provinces } from '../../data/provinces';
import { estimateConsumption, formatArs, formatNumber } from '../../utils/calculations';

interface ConsumptionStepProps {
  provinceId: string;
  monthlyBill: number;
  systemType: 'residential' | 'commercial';
  onBillChange: (bill: number) => void;
  onSystemTypeChange: (type: 'residential' | 'commercial') => void;
  onNext: () => void;
  onBack: () => void;
}

export function ConsumptionStep({
  provinceId,
  monthlyBill,
  systemType,
  onBillChange,
  onSystemTypeChange,
  onNext,
  onBack,
}: ConsumptionStepProps) {
  const province = provinces.find((p) => p.id === provinceId);
  const estimatedKwh = province
    ? estimateConsumption(monthlyBill, province, systemType)
    : 0;

  const typicalBills = systemType === 'residential'
    ? [
      { label: 'Bajo', amount: 25000, kwh: '~120 kWh' },
      { label: 'Medio', amount: 55000, kwh: '~300 kWh' },
      { label: 'Alto', amount: 120000, kwh: '~600 kWh' },
      { label: 'Muy alto', amount: 250000, kwh: '~1200 kWh' },
    ]
    : [
      { label: 'Pequeño', amount: 150000, kwh: '~800 kWh' },
      { label: 'Mediano', amount: 400000, kwh: '~2000 kWh' },
      { label: 'Grande', amount: 800000, kwh: '~4000 kWh' },
      { label: 'Muy grande', amount: 2000000, kwh: '~10000 kWh' },
    ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-5xl mb-4"
        >
          ⚡
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Tu consumo eléctrico
        </h2>
        <p className="text-dark-400 text-lg">
          Ingresá el monto de tu factura mensual de luz
        </p>
      </div>

      {/* System type selector */}
      <GlassCard variant="strong" className="mb-6">
        <label className="block text-sm font-medium text-dark-300 mb-3">
          Tipo de instalación
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'residential' as const, icon: '🏠', label: 'Residencial', desc: 'Casa / Departamento' },
            { key: 'commercial' as const, icon: '🏢', label: 'Comercial', desc: 'Oficina / Local / Galpón' },
          ].map((t) => (
            <motion.button
              key={t.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSystemTypeChange(t.key)}
              className={`
                p-4 rounded-xl text-left transition-all duration-200 cursor-pointer
                ${systemType === t.key
                  ? 'bg-solar-500/15 border-2 border-solar-500/40 shadow-lg shadow-solar-500/10'
                  : 'bg-dark-800/50 border-2 border-dark-700/20 hover:border-dark-600/40'
                }
              `}
            >
              <span className="text-2xl">{t.icon}</span>
              <p className={`font-semibold mt-2 ${systemType === t.key ? 'text-solar-300' : 'text-white'}`}>
                {t.label}
              </p>
              <p className="text-sm text-dark-400">{t.desc}</p>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Bill input */}
      <GlassCard variant="strong" className="mb-6">
        <label className="block text-sm font-medium text-dark-300 mb-3">
          Factura mensual de luz (ARS)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 text-lg font-semibold">$</span>
          <input
            type="number"
            value={monthlyBill || ''}
            onChange={(e) => onBillChange(Number(e.target.value))}
            placeholder="Ej: 85.000"
            className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-16 py-4 text-2xl
              font-bold text-white placeholder:text-dark-600 focus:outline-none focus:border-solar-500/50
              focus:ring-1 focus:ring-solar-500/20 transition-all"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 text-sm">ARS/mes</span>
        </div>

        {/* Quick select buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {typicalBills.map((tb) => (
            <motion.button
              key={tb.amount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBillChange(tb.amount)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
                ${monthlyBill === tb.amount
                  ? 'bg-solar-500/20 text-solar-300 border border-solar-500/30'
                  : 'bg-dark-800/30 text-dark-400 border border-dark-700/20 hover:text-dark-300'
                }
              `}
            >
              {tb.label}: {formatArs(tb.amount)}
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Estimated consumption */}
      {monthlyBill > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard variant="accent" className="mb-8">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <p className="text-sm text-dark-400 mb-1">Consumo estimado</p>
                <p className="text-3xl font-bold text-white">
                  {formatNumber(estimatedKwh)} <span className="text-lg font-normal text-dark-400">kWh/mes</span>
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-dark-400 mb-1">Consumo anual</p>
                <p className="text-3xl font-bold text-amber-400">
                  {formatNumber(estimatedKwh * 12)} <span className="text-lg font-normal text-dark-400">kWh/año</span>
                </p>
              </div>
            </div>
            <p className="text-xs text-dark-500 mt-3">
              * Estimación basada en tarifas de {province?.name} (categoría {systemType === 'residential' ? 'R' : 'T'}, sin subsidio N3)
            </p>
          </GlassCard>
        </motion.div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" size="lg" onClick={onBack} icon={<span>←</span>}>
          Atrás
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={monthlyBill <= 0}
          icon={<span>→</span>}
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
}
