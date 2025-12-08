import { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NeonCursor } from '@/components/NeonCursor';
import { RaveGridBackground } from '@/components/RaveGridBackground';
import { Preloader } from '@/components/Preloader';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Skills from '@/pages/Skills';
import Experience from '@/pages/Experience';
import Education from '@/pages/Education';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function AnimatedRoutes() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/skills" component={Skills} />
          <Route path="/experience" component={Experience} />
          <Route path="/education" component={Education} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [raveMode, setRaveMode] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const expectedKey = KONAMI_CODE[konamiProgress];
    
    if (e.code === expectedKey) {
      const newProgress = konamiProgress + 1;
      setKonamiProgress(newProgress);
      
      if (newProgress === KONAMI_CODE.length) {
        setRaveMode(prev => !prev);
        setKonamiProgress(0);
      }
    } else {
      setKonamiProgress(0);
    }
  }, [konamiProgress]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (raveMode) {
      document.body.classList.add('rave-mode-active');
    } else {
      document.body.classList.remove('rave-mode-active');
    }
  }, [raveMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        
        <div className={`min-h-screen flex flex-col ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ${raveMode ? 'rave-mode-active' : ''}`}>
          <RaveGridBackground raveMode={raveMode} />
          
          <div className="noise-overlay" />
          
          <NeonCursor />
          
          <Navbar raveMode={raveMode} />
          
          <main className="flex-1 relative z-10">
            <AnimatedRoutes />
          </main>
          
          <Footer />
        </div>
        
        {raveMode && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-neon-purple/90 text-white font-bold rounded-md animate-pulse" data-testid="rave-mode-indicator">
            RAVE MODE ACTIVATED
          </div>
        )}
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
