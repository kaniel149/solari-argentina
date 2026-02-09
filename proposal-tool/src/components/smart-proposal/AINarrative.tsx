import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';

interface AINarrativeProps {
  narrative: string;
}

export function AINarrative({ narrative }: AINarrativeProps) {
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
            📝
          </div>
        </div>
        <div>
          <p className="text-xs text-dark-500 uppercase tracking-widest">Resumen</p>
          <h2 className="text-2xl font-bold text-white">Resumen Ejecutivo</h2>
          <p className="text-sm text-dark-400">Analisis personalizado de su proyecto solar</p>
        </div>
      </div>

      <GlassCard variant="strong" className="relative">
        {/* Large quotation mark */}
        <div className="absolute top-4 left-6">
          <span className="text-6xl font-serif leading-none bg-gradient-to-r from-solar-400 to-amber-400 bg-clip-text text-transparent opacity-30">
            &ldquo;
          </span>
        </div>

        {/* Narrative text */}
        <div className="pt-10 px-2">
          {narrative.split('\n\n').map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="text-lg text-dark-300 italic leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
