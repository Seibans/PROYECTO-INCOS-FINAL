// app/_components/ClientMotionWrapper.tsx
"use client";

import { motion } from 'framer-motion';

export default function ClientMotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex items-center flex-col'
    >
      {children}
    </motion.div>
  );
}
