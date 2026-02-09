import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface PropertyStepProps {
  roofType: 'tile' | 'metal' | 'concrete' | 'flat';
  roofOrientation: 'north' | 'northeast' | 'northwest' | 'east' | 'west';
  onRoofTypeChange: (type: 'tile' | 'metal' | 'concrete' | 'flat') => void;
  onOrientationChange: (orientation: 'north' | 'northeast' | 'northwest' | 'east' | 'west') => void;
  onNext: () => void;
  onBack: () => void;
}

export function PropertyStep({
  roofType,
  roofOrientation,
  onRoofTypeChange,
  onOrientationChange,
  onNext,
  onBack,
}: PropertyStepProps) {
  const roofTypes = [
    { key: 'tile' as const, icon: '🏠', label: 'Tejas', desc: 'Techo inclinado de tejas' },
    { key: 'metal' as const, icon: '🏗️', label: 'Chapa/Metal', desc: 'Techo de chapa o zinc' },
    { key: 'concrete' as const, icon: '🏢', label: 'Losa', desc: 'Losa de hormigón' },
    { key: 'flat' as const, icon: '⬜', label: 'Terraza plana', desc: 'Azotea o terraza' },
  ];

  const orientations = [
    { key: 'north' as const, label: 'Norte', efficiency: '100%', best: true, angle: 0 },
    { key: 'northeast' as const, label: 'Noreste', efficiency: '95%', best: false, angle: 45 },
    { key: 'northwest' as const, label: 'Noroeste', efficiency: '95%', best: false, angle: -45 },
    { key: 'east' as const, label: 'Este', efficiency: '85%', best: false, angle: 90 },
    { key: 'west' as const, label: 'Oeste', efficiency: '85%', best: false, angle: -90 },
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
          🏗️
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Tu techo
        </h2>
        <p className="text-dark-400 text-lg">
          Contanos sobre tu techo para diseñar la mejor instalación
        </p>
      </div>

      {/* Roof type */}
      <GlassCard variant="strong" className="mb-6">
        <label className="block text-sm font-medium text-dark-300 mb-4">
          Tipo de techo
        </label>
        <div className="grid grid-cols-2 gap-3">
          {roofTypes.map((rt) => (
            <motion.button
              key={rt.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onRoofTypeChange(rt.key)}
              className={`
                p-4 rounded-xl text-left transition-all duration-200 cursor-pointer
                ${roofType === rt.key
                  ? 'bg-solar-500/15 border-2 border-solar-500/40 shadow-lg shadow-solar-500/10'
                  : 'bg-dark-800/50 border-2 border-dark-700/20 hover:border-dark-600/40'
                }
              `}
            >
              <span className="text-2xl">{rt.icon}</span>
              <p className={`font-semibold mt-2 ${roofType === rt.key ? 'text-solar-300' : 'text-white'}`}>
                {rt.label}
              </p>
              <p className="text-xs text-dark-400">{rt.desc}</p>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Orientation */}
      <GlassCard variant="strong" className="mb-8">
        <label className="block text-sm font-medium text-dark-300 mb-2">
          Orientación del techo
        </label>
        <p className="text-xs text-dark-500 mb-4">
          En el hemisferio sur, el norte es la mejor orientación para paneles solares
        </p>

        {/* Compass visual */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            {/* Compass background */}
            <div className="absolute inset-0 rounded-full border-2 border-dark-700/30 bg-dark-800/30" />
            <div className="absolute inset-4 rounded-full border border-dark-700/20" />

            {/* N label */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-400">N</div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-dark-500">S</div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-bold text-dark-500">E</div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs font-bold text-dark-500">O</div>

            {/* Sun icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-3xl solar-pulse"
              >
                ☀️
              </motion.div>
            </div>

            {/* Direction indicators */}
            {orientations.map((o) => {
              const angle = o.angle - 90; // Adjust so N is top
              const radians = (angle * Math.PI) / 180;
              const r = 75;
              const x = 96 + r * Math.cos(radians);
              const y = 96 + r * Math.sin(radians);

              return (
                <motion.button
                  key={o.key}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onOrientationChange(o.key)}
                  className={`
                    absolute w-8 h-8 rounded-full flex items-center justify-center
                    text-xs font-bold transition-all cursor-pointer -translate-x-1/2 -translate-y-1/2
                    ${roofOrientation === o.key
                      ? 'bg-solar-500 text-white shadow-lg shadow-solar-500/30'
                      : 'bg-dark-700/50 text-dark-400 hover:bg-dark-600/50'
                    }
                  `}
                  style={{ left: x, top: y }}
                >
                  {o.best ? '★' : '•'}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Orientation options list */}
        <div className="space-y-2">
          {orientations.map((o) => (
            <motion.button
              key={o.key}
              whileHover={{ x: 4 }}
              onClick={() => onOrientationChange(o.key)}
              className={`
                w-full flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer
                ${roofOrientation === o.key
                  ? 'bg-solar-500/10 border border-solar-500/30 text-solar-300'
                  : 'bg-dark-800/30 border border-transparent text-dark-400 hover:text-dark-300'
                }
              `}
            >
              <span className="font-medium">{o.label}</span>
              <span className={`text-sm ${o.best ? 'text-emerald-400 font-semibold' : ''}`}>
                {o.efficiency} eficiencia {o.best ? '⭐ Óptimo' : ''}
              </span>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-between">
        <Button variant="ghost" size="lg" onClick={onBack} icon={<span>←</span>}>
          Atrás
        </Button>
        <Button variant="primary" size="lg" onClick={onNext} icon={<span>→</span>}>
          Continuar
        </Button>
      </div>
    </motion.div>
  );
}
