import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface PreferencesStepProps {
  budgetTier: 'economy' | 'standard' | 'premium';
  financingPreference: 'cash' | 'financing' | 'undecided';
  customerName: string;
  onTierChange: (tier: 'economy' | 'standard' | 'premium') => void;
  onFinancingChange: (pref: 'cash' | 'financing' | 'undecided') => void;
  onNameChange: (name: string) => void;
  onGenerate: () => void;
  onBack: () => void;
}

export function PreferencesStep({
  budgetTier,
  financingPreference,
  customerName,
  onTierChange,
  onFinancingChange,
  onNameChange,
  onGenerate,
  onBack,
}: PreferencesStepProps) {
  const tiers = [
    {
      key: 'economy' as const,
      icon: '💰',
      label: 'Económico',
      desc: 'Equipos confiables de marcas emergentes. Mejor relación costo-beneficio.',
      brands: 'Growatt, Risen, Solis',
      savings: 'Ahorrá ~20%',
    },
    {
      key: 'standard' as const,
      icon: '⭐',
      label: 'Estándar',
      desc: 'Equipos Tier 1 con garantías extendidas. La mejor opción para la mayoría.',
      brands: 'Trina, JinkoSolar, GoodWe',
      savings: 'Recomendado',
      recommended: true,
    },
    {
      key: 'premium' as const,
      icon: '👑',
      label: 'Premium',
      desc: 'Lo mejor del mercado. Máxima eficiencia, garantías superiores, monitoreo avanzado.',
      brands: 'LONGi, REC, Fronius, Huawei',
      savings: 'Máximo rendimiento',
    },
  ];

  const financingOptions = [
    { key: 'cash' as const, icon: '💵', label: 'Pago contado', desc: 'Pago total o en cuotas sin interés' },
    { key: 'financing' as const, icon: '🏦', label: 'Financiamiento', desc: 'Crédito bancario o plan de cuotas' },
    { key: 'undecided' as const, icon: '🤔', label: 'Aún no decidí', desc: 'Quiero ver opciones en la propuesta' },
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
          ⚙️
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Tus preferencias
        </h2>
        <p className="text-dark-400 text-lg">
          Elegí la calidad de equipos y forma de pago
        </p>
      </div>

      {/* Customer name */}
      <GlassCard variant="strong" className="mb-6">
        <label className="block text-sm font-medium text-dark-300 mb-3">
          Tu nombre (opcional)
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ej: Juan Pérez"
          className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl px-4 py-3 text-white
            placeholder:text-dark-500 focus:outline-none focus:border-solar-500/50 focus:ring-1
            focus:ring-solar-500/20 transition-all"
        />
      </GlassCard>

      {/* Budget tier */}
      <GlassCard variant="strong" className="mb-6">
        <label className="block text-sm font-medium text-dark-300 mb-4">
          Nivel de equipamiento
        </label>
        <div className="space-y-3">
          {tiers.map((tier) => (
            <motion.button
              key={tier.key}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onTierChange(tier.key)}
              className={`
                w-full p-5 rounded-xl text-left transition-all duration-200 cursor-pointer relative
                ${budgetTier === tier.key
                  ? 'bg-solar-500/10 border-2 border-solar-500/40 shadow-lg shadow-solar-500/10'
                  : 'bg-dark-800/50 border-2 border-dark-700/20 hover:border-dark-600/40'
                }
              `}
            >
              {tier.recommended && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-solar-500/20 text-solar-300 text-xs font-semibold rounded-full">
                  Recomendado
                </span>
              )}
              <div className="flex items-start gap-4">
                <span className="text-3xl">{tier.icon}</span>
                <div className="flex-1">
                  <p className={`text-lg font-bold ${budgetTier === tier.key ? 'text-solar-300' : 'text-white'}`}>
                    {tier.label}
                  </p>
                  <p className="text-sm text-dark-400 mt-1">{tier.desc}</p>
                  <p className="text-xs text-dark-500 mt-2">
                    Marcas: {tier.brands}
                  </p>
                </div>
                <div className={`text-sm font-semibold ${budgetTier === tier.key ? 'text-amber-400' : 'text-dark-500'}`}>
                  {tier.savings}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Financing */}
      <GlassCard variant="strong" className="mb-8">
        <label className="block text-sm font-medium text-dark-300 mb-4">
          Forma de pago
        </label>
        <div className="grid grid-cols-3 gap-3">
          {financingOptions.map((fo) => (
            <motion.button
              key={fo.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFinancingChange(fo.key)}
              className={`
                p-4 rounded-xl text-center transition-all duration-200 cursor-pointer
                ${financingPreference === fo.key
                  ? 'bg-solar-500/15 border-2 border-solar-500/40'
                  : 'bg-dark-800/50 border-2 border-dark-700/20 hover:border-dark-600/40'
                }
              `}
            >
              <span className="text-2xl">{fo.icon}</span>
              <p className={`text-sm font-semibold mt-2 ${financingPreference === fo.key ? 'text-solar-300' : 'text-white'}`}>
                {fo.label}
              </p>
              <p className="text-xs text-dark-500 mt-1">{fo.desc}</p>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-between">
        <Button variant="ghost" size="lg" onClick={onBack} icon={<span>←</span>}>
          Atrás
        </Button>
        <Button
          variant="amber"
          size="lg"
          onClick={onGenerate}
          icon={<span>☀️</span>}
        >
          Generar Propuesta Solar
        </Button>
      </div>
    </motion.div>
  );
}
