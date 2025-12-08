import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'data-testid'?: string;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  'data-testid': testId,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const maxDistance = 100;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < maxDistance) {
      const strength = 0.3;
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles = `
    relative overflow-visible font-medium
    transition-all duration-300 ease-out
    rounded-md px-6 py-3
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-neon-purple to-neon-blue
      text-white
      border border-neon-purple/50
      shadow-neon-purple
      focus:ring-neon-purple
      ${isHovered ? 'shadow-[0_0_30px_rgba(168,85,247,0.6)]' : ''}
    `,
    secondary: `
      bg-transparent
      text-neon-purple
      border-2 border-neon-purple
      hover:bg-neon-purple/10
      focus:ring-neon-purple
      ${isHovered ? 'shadow-[0_0_20px_rgba(168,85,247,0.4)]' : ''}
    `,
    outline: `
      bg-transparent
      text-foreground
      border border-border
      hover:border-neon-purple
      hover:text-neon-purple
      focus:ring-neon-purple
      ${isHovered ? 'border-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''}
    `,
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered && !disabled ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 15,
      }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      data-testid={testId}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: variant === 'primary' 
              ? 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3), transparent 70%)'
              : 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15), transparent 70%)',
          }}
        />
      )}
    </motion.button>
  );
}
