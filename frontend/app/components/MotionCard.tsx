'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { hoverScale } from '../lib/motion';

interface MotionCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScaleValue?: number;
  hoverY?: number;
  enableHover?: boolean;
  hoverEffect?: 'lift' | 'glow' | 'scale' | string;
}

export default function MotionCard({
  children,
  className = '',
  delay = 0,
  hoverScaleValue,
  hoverY,
  enableHover = true,
  hoverEffect = 'lift',
  ...props
}: MotionCardProps) {
  // Compute default values based on hoverEffect if not explicitly specified
  const effectiveHoverY = hoverY !== undefined ? hoverY : (hoverEffect === 'glow' ? -2 : hoverEffect === 'scale' ? 0 : -5);
  const effectiveHoverScale = hoverScaleValue !== undefined ? hoverScaleValue : (hoverEffect === 'glow' ? 1.008 : hoverEffect === 'scale' ? 1.02 : 1.015);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      whileHover={
        enableHover
          ? {
              y: effectiveHoverY,
              scale: effectiveHoverScale,
              transition: { duration: 0.22, ease: 'easeOut' },
            }
          : undefined
      }
      whileTap={enableHover ? hoverScale.tap : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
