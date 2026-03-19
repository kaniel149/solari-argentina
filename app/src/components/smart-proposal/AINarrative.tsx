import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
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
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/40 flex items-center justify-center">
            <FileText className="w-5 h-5 text-sky-400" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Resumen Ejecutivo</h2>
          <p className="text-sm text-slate-400">Analisis personalizado de su proyecto solar</p>
        </div>
      </div>

      <GlassCard variant="strong" className="relative">
        {/* Gold accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        {/* Narrative text */}
        <div className="pt-4 px-2">
          {narrative.split('\n\n').map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="text-base text-slate-300 leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
