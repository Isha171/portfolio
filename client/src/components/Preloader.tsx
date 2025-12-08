import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 300);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          data-testid="preloader"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, #A855F7 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, #3B82F6 0%, transparent 50%)
                `,
              }}
            />
            
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.1), transparent)',
              animation: 'scan-line 2s linear infinite',
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative mb-8"
          >
            <div 
              className="w-20 h-20 rounded-md flex items-center justify-center bg-gradient-to-br from-neon-purple to-neon-blue"
              style={{
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)',
              }}
            >
              <Zap className="w-10 h-10 text-white" />
            </div>

            <motion.div
              className="absolute inset-0 rounded-md"
              animate={{ 
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                border: '2px solid #A855F7',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-md"
              animate={{ 
                scale: [1, 2],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.3,
              }}
              style={{
                border: '2px solid #3B82F6',
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-8 neon-text-purple text-neon-purple"
          >
            INITIALIZING<span className="text-neon-blue">...</span>
          </motion.h1>

          <div className="w-64 md:w-80 relative">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #A855F7, #3B82F6, #EC4899)',
                  width: `${progress}%`,
                  boxShadow: '0 0 10px #A855F7, 0 0 20px #3B82F6',
                }}
              />
            </div>
            
            <div className="flex justify-between mt-2 text-sm font-mono text-muted-foreground">
              <span>Loading assets</span>
              <span className="text-neon-purple">{Math.round(progress)}%</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 text-sm font-mono text-muted-foreground"
          >
            <span className="animate-pulse">RAVE_SYSTEM_v2.0</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
