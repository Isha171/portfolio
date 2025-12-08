import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Zap, ExternalLink } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
];

const quickLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer 
      className="relative border-t border-neon-purple/20 bg-card/50 backdrop-blur-sm"
      data-testid="footer"
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div 
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #A855F7, #3B82F6, #EC4899, transparent)',
          boxShadow: '0 0 10px #A855F7',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 cursor-pointer" data-testid="link-footer-logo">
                <div 
                  className="w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-br from-neon-purple to-neon-blue"
                  style={{
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)',
                  }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold neon-text-purple text-neon-purple">
                  DEV<span className="text-neon-blue">.RAVE</span>
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A creative developer passionate about building 
              immersive digital experiences with cutting-edge 
              technologies.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neon-purple mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.span
                      className="text-sm text-muted-foreground hover:text-neon-purple transition-colors cursor-pointer flex items-center gap-2"
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      data-testid={`link-footer-${link.label.toLowerCase()}`}
                    >
                      <motion.span
                        animate={{ 
                          x: hoveredLink === link.href ? 4 : 0,
                          color: hoveredLink === link.href ? '#A855F7' : undefined,
                        }}
                      >
                        {link.label}
                      </motion.span>
                      {hoveredLink === link.href && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <ExternalLink className="w-3 h-3 text-neon-purple" />
                        </motion.span>
                      )}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neon-purple mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-md flex items-center justify-center bg-muted/50 border border-border hover:border-neon-purple/50 transition-colors"
                  style={{
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground hover:text-neon-purple transition-colors" />
                </motion.a>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Available for freelance work and collaborations.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            className="text-sm text-muted-foreground cursor-default"
            whileHover={{ x: 5 }}
          >
            <span className="glitch-text" data-text={`© ${new Date().getFullYear()} DEV.RAVE`}>
              © {new Date().getFullYear()} DEV.RAVE
            </span>
            {' '}— All rights reserved.
          </motion.p>
          
          <p className="text-xs text-muted-foreground/60 font-mono">
            Built with neon dreams and caffeine
          </p>
        </div>
      </div>
    </footer>
  );
}
