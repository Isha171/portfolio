import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export function SectionWrapper({ 
  children, 
  className = '', 
  id,
  'data-testid': testId,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`relative ${className}`}
      data-testid={testId}
    >
      {children}
    </motion.section>
  );
}
