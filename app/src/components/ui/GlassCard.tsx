import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'default' | 'subtle' | 'elevated' | 'solid' | 'strong' | 'accent' | 'highlight';
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  variant = 'default',
  hover = false,
  glow = false,
  className = '',
  ...props
}: GlassCardProps) {
  const variants = {
    default: 'bg-zinc-900 border border-white/[0.09]',
    subtle: 'bg-zinc-900/50 border border-white/[0.06]',
    elevated: 'bg-zinc-800 border border-white/[0.12] shadow-lg shadow-black/20',
    solid: 'bg-zinc-900 border border-white/[0.09]',
    strong: 'bg-zinc-800 border border-sky-500/15 shadow-lg',
    accent: 'bg-zinc-900 border border-sky-500/20',
    highlight: 'bg-zinc-900 border border-amber-500/20',
  };

  return (
    <motion.div
      className={`
        ${variants[variant]}
        rounded-xl p-5
        ${hover ? 'hover:border-white/[0.15] transition-colors duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
