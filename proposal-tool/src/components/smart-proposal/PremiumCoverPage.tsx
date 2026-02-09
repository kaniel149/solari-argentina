import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface PremiumCoverPageProps {
  customerName: string;
  systemSize: number;
  date: string;
  province: string;
}

export function PremiumCoverPage({ customerName, systemSize, date, province }: PremiumCoverPageProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-solar-500/15 blur-[120px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px]"
          animate={{
            x: [0, -60, 50, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '40%', right: '15%' }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px]"
          animate={{
            x: [0, 40, -60, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '15%', left: '30%' }}
        />
      </div>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-sm uppercase tracking-[0.3em] text-dark-400 mb-8"
      >
        Propuesta Solar Personalizada
      </motion.p>

      {/* Customer name */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-center px-4 mb-6"
      >
        <span className="bg-gradient-to-r from-solar-300 via-white to-amber-300 bg-clip-text text-transparent">
          {customerName || 'Tu Propuesta'}
        </span>
      </motion.h1>

      {/* System size badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
      >
        <span className="text-xl">⚡</span>
        <span className="text-lg font-semibold text-white">Sistema de {systemSize} kWp</span>
      </motion.div>

      {/* Province */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-dark-400 text-base mb-2"
      >
        {province}
      </motion.p>

      {/* Date */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="text-dark-500 text-sm"
      >
        {date}
      </motion.p>

      {/* Solari watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-24 text-center"
      >
        <p className="text-xl font-bold tracking-wider text-white">SOLARI</p>
        <p className="text-xs tracking-widest text-white">ARGENTINA</p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-dark-500">Desplazar para ver</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-dark-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}
