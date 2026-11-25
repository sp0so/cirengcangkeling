'use client';

import React from 'react';
import { motion } from 'motion/react';
import { pageVariants } from '../lib/motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full flex-1 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}
