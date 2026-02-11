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
    default: 'glass',
    subtle: 'glass-subtle',
    elevated: 'glass-elevated',
    solid: 'bg-[var(--surface-1)] border border-[var(--border-default)]',
    strong: 'glass-strong',
    accent: 'glass border-solar-500/20',
    highlight: 'glass border-amber-500/20',
  };

  return (
    <motion.div
      className={`
        ${variants[variant]}
        rounded-2xl p-6
        ${hover ? 'transition-all duration-200 hover:border-solar-400/30 hover:shadow-lg hover:shadow-solar-500/5' : ''}
        ${glow ? 'solar-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
