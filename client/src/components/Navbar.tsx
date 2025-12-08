import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/education', label: 'Education' },
  { href: '/contact', label: 'Contact' },
];

interface NavbarProps {
  raveMode?: boolean;
}

export function Navbar({ raveMode = false }: NavbarProps) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled 
            ? 'bg-background/80 backdrop-blur-lg border-b border-neon-purple/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
            : 'bg-transparent'
          }
          ${raveMode ? 'animate-rave-hue' : ''}
        `}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 cursor-pointer"
                data-testid="link-logo"
              >
                <div 
                  className="w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-br from-neon-purple to-neon-blue"
                  style={{
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)',
                  }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold neon-text-purple text-neon-purple hidden sm:block">
                  DEV<span className="text-neon-blue">.RAVE</span>
                </span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavItem 
                  key={link.href} 
                  {...link} 
                  isActive={location === link.href}
                />
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-foreground hover:text-neon-purple transition-colors"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card/95 backdrop-blur-xl border-l border-neon-purple/20 p-8 pt-24"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: `
                    linear-gradient(135deg, #A855F7 0%, transparent 50%),
                    linear-gradient(225deg, #3B82F6 0%, transparent 50%)
                  `,
                }}
              />
              
              <nav className="relative z-10 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={link.href}>
                      <MagneticButton
                        variant={location === link.href ? 'primary' : 'outline'}
                        className="w-full justify-start text-left"
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </MagneticButton>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavItemProps extends NavLink {
  isActive: boolean;
}

function NavItem({ href, label, isActive }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        className="relative px-4 py-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={`link-${label.toLowerCase()}`}
      >
        <span 
          className={`
            text-sm font-medium transition-colors duration-300
            ${isActive ? 'text-neon-purple' : 'text-muted-foreground hover:text-foreground'}
          `}
        >
          {label}
        </span>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-neon-purple to-neon-blue"
          initial={{ width: 0 }}
          animate={{ width: isActive || isHovered ? '80%' : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: isActive || isHovered ? '0 0 10px #A855F7' : 'none',
          }}
        />
      </motion.div>
    </Link>
  );
}
