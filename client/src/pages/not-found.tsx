import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Home, AlertTriangle } from 'lucide-react';
import { MagneticButton } from '@/components/MagneticButton';
import { AnimatedHeading } from '@/components/AnimatedHeading';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" data-testid="page-not-found">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-6"
            style={{
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
            }}
          >
            <AlertTriangle className="w-12 h-12 text-neon-purple animate-glow-pulse" />
          </div>
        </motion.div>

        <AnimatedHeading
          as="h1"
          glitch
          neonColor="purple"
          className="text-6xl md:text-8xl font-bold mb-4"
          data-testid="text-404"
        >
          404
        </AnimatedHeading>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-4"
        >
          PAGE NOT FOUND
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8"
        >
          The page you're looking for has glitched out of existence. 
          Maybe it's hiding in another dimension?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/">
            <MagneticButton variant="primary" data-testid="button-go-home">
              <Home className="w-4 h-4" />
              Return Home
            </MagneticButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8 }}
          className="mt-12 font-mono text-sm text-muted-foreground"
        >
          <code>
            ERROR::DIMENSION_404::PAGE_VOID
          </code>
        </motion.div>
      </div>
    </div>
  );
}
