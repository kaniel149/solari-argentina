import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface IrrGaugeProps {
  irr: number;
  maxIrr?: number;
}

export function IrrGauge({ irr, maxIrr = 50 }: IrrGaugeProps) {
  const progress = useMotionValue(0);
  const clampedIrr = Math.min(irr, maxIrr);
  const targetProgress = clampedIrr / maxIrr;

  // Determine color based on IRR
  const getColor = () => {
    if (irr < 10) return '#ef4444'; // red
    if (irr < 20) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  const color = getColor();

  // SVG arc parameters
  const size = 200;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2 + 10; // slight offset down

  // Arc from 180deg (left) to 0deg (right) — semicircle
  const circumference = Math.PI * radius;

  const dashOffset = useTransform(progress, [0, 1], [circumference, 0]);

  useEffect(() => {
    const controls = animate(progress, targetProgress, {
      duration: 1.5,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [targetProgress, progress]);

  // Calculate arc path (semicircle, left to right)
  const arcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 30 }}>
        <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
          {/* Background arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Filled arc */}
          <motion.path
            d={arcPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>

        {/* Center text */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: '50%',
            bottom: 10,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="text-4xl font-bold text-white">{irr}</span>
          <span className="text-lg text-slate-400 -mt-1">%</span>
        </div>
      </div>

      <p className="text-sm text-slate-400 mt-1 text-center">Tasa Interna de Retorno</p>
    </div>
  );
}
