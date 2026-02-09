import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { provinces, regionNames } from '../../data/provinces';
import type { Province } from '../../types';

interface LocationStepProps {
  selectedProvince: string;
  city: string;
  onProvinceChange: (id: string) => void;
  onCityChange: (city: string) => void;
  onNext: () => void;
}

export function LocationStep({
  selectedProvince,
  city,
  onProvinceChange,
  onCityChange,
  onNext,
}: LocationStepProps) {
  // Group provinces by region
  const grouped = provinces.reduce<Record<string, Province[]>>((acc, p) => {
    if (!acc[p.region]) acc[p.region] = [];
    acc[p.region].push(p);
    return acc;
  }, {});

  const selectedProv = provinces.find((p) => p.id === selectedProvince);

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
          📍
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">
          ¿Dónde está tu propiedad?
        </h2>
        <p className="text-dark-400 text-lg">
          La ubicación determina la radiación solar y las tarifas eléctricas
        </p>
      </div>

      <GlassCard variant="strong" className="mb-6">
        <label className="block text-sm font-medium text-dark-300 mb-3">
          Provincia
        </label>
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(grouped).map(([region, provs]) => (
            <div key={region}>
              <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2">
                {regionNames[region as Province['region']]}
              </p>
              <div className="flex flex-wrap gap-2">
                {provs.map((p) => (
                  <motion.button
                    key={p.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onProvinceChange(p.id)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                      ${selectedProvince === p.id
                        ? 'bg-solar-500/20 text-solar-300 border border-solar-500/40 shadow-lg shadow-solar-500/10'
                        : 'bg-dark-800/50 text-dark-400 border border-dark-700/30 hover:border-dark-600/50 hover:text-dark-300'
                      }
                    `}
                  >
                    {p.name}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {selectedProv && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard variant="strong" className="mb-6">
            <label className="block text-sm font-medium text-dark-300 mb-3">
              Ciudad (opcional)
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              placeholder={`Ej: ${selectedProv.name === 'Córdoba' ? 'Villa Carlos Paz' : 'Capital'}`}
              className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl px-4 py-3 text-white
                placeholder:text-dark-500 focus:outline-none focus:border-solar-500/50 focus:ring-1
                focus:ring-solar-500/20 transition-all"
            />
          </GlassCard>

          {/* Province info card */}
          <GlassCard variant="accent" className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-dark-400">Radiación solar</p>
                <p className="text-2xl font-bold text-amber-400">
                  {selectedProv.solarIrradiation} <span className="text-sm font-normal text-dark-400">kWh/m²/día</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-dark-400">Distribuidora</p>
                <p className="text-lg font-semibold text-white">{selectedProv.utility}</p>
              </div>
              <div>
                <p className="text-sm text-dark-400">Net Metering</p>
                <p className={`text-lg font-semibold ${selectedProv.hasNetMetering ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedProv.hasNetMetering ? '✓ Habilitado' : '⏳ En proceso'}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={!selectedProvince}
          icon={<span>→</span>}
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
}
