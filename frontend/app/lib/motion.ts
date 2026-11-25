/**
 * J.A.R.V.I.S. Premium Motion Design System Tokens & Variants
 * Consistent durations, easings, springs, and reduced-motion compliance.
 */

export const motionTokens = {
  duration: {
    instant: 0.1,
    fast: 0.18,
    normal: 0.28,
    slow: 0.45,
    expressive: 0.6,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1] as const, // Smooth cubic-bezier
    decelerate: [0.0, 0.0, 0.2, 1] as const,
    accelerate: [0.4, 0.0, 1, 1] as const,
  },
  spring: {
    gentle: { type: 'spring' as const, damping: 25, stiffness: 200 },
    subtle: { type: 'spring' as const, damping: 22, stiffness: 280 },
    snappy: { type: 'spring' as const, damping: 18, stiffness: 380 },
    bouncy: { type: 'spring' as const, damping: 14, stiffness: 300 },
  },
};

// Subtle, elegant page transition variant (No disorienting large shifts)
export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.ease.standard,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: motionTokens.duration.fast,
      ease: motionTokens.ease.accelerate,
    },
  },
};

// Viewport entrance for cards & content blocks
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.ease.standard,
      delay: customDelay,
    },
  }),
};

// Modal & dialog backdrop and scale variants
export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: motionTokens.spring.subtle,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
};

// Micro-interaction hover presets
export const hoverScale = {
  card: { y: -5, scale: 1.015, transition: motionTokens.spring.subtle },
  button: { scale: 1.02, transition: { duration: 0.15, ease: 'easeOut' } },
  tap: { scale: 0.97, transition: { duration: 0.08 } },
};
