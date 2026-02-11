export const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
export const fadeUp = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } };
export const fadeDown = { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 } };
export const scaleIn = { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 } };

export const durations = { fast: 0.12, default: 0.2, slow: 0.35 };
export const easings = { easeOut: [0.16, 1, 0.3, 1] as const, easeInOut: [0.4, 0, 0.2, 1] as const };

export const stagger = (staggerChildren = 0.04) => ({
  animate: { transition: { staggerChildren } }
});

export const transition = {
  fast: { duration: durations.fast, ease: easings.easeOut },
  default: { duration: durations.default, ease: easings.easeOut },
  slow: { duration: durations.slow, ease: easings.easeOut },
};
