import { motion } from 'framer-motion';
import { ChevronDown, Sun, MapPin, Calendar, Zap } from 'lucide-react';

interface PremiumCoverPageProps {
  customerName: string;
  systemSize: number;
  date: string;
  province: string;
}

export function PremiumCoverPage({ customerName, systemSize, date, province }: PremiumCoverPageProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient — navy to dark */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0c1929] via-[#0f172a] to-zinc-950" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[180px]"
        style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }}
        animate={{ opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-500 to-amber-500" />
      </motion.div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex items-center gap-3 mb-12"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Sun className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-lg font-bold tracking-wider text-white">SOLARI</p>
          <p className="text-[10px] tracking-[0.35em] text-sky-400/80 uppercase -mt-0.5">Argentina</p>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4"
      >
        Propuesta Solar Personalizada
      </motion.p>

      {/* Gold line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mb-10"
      />

      {/* Customer name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center px-4 mb-10"
      >
        <span className="text-white">
          {customerName || 'Tu Propuesta'}
        </span>
      </motion.h1>

      {/* Info badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-16"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-slate-300">{systemSize} kWp</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
          <MapPin className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-medium text-slate-300">{province}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">{date}</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500">Desplazar para ver la propuesta</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}
