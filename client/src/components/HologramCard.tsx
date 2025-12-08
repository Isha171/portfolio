import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HologramCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glitchOnHover?: boolean;
  'data-testid'?: string;
}

export function HologramCard({
  children,
  className = '',
  onClick,
  glitchOnHover = true,
  'data-testid': testId,
}: HologramCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const maxRotation = 10;
    const rotateXValue = (mouseY / (rect.height / 2)) * -maxRotation;
    const rotateYValue = (mouseX / (rect.width / 2)) * maxRotation;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (glitchOnHover) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={`
        relative
        rounded-md
        overflow-visible
        cursor-pointer
        ${glitch ? 'animate-glitch' : ''}
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      data-testid={testId}
    >
      <div className="absolute inset-0 rounded-md p-[2px] bg-gradient-to-br from-neon-purple via-neon-blue to-neon-pink opacity-60">
        <div className="absolute inset-[2px] rounded-md bg-card" />
      </div>

      <div 
        className={`
          relative z-10
          rounded-md
          p-6
          bg-gradient-to-br from-card/95 to-card
          backdrop-blur-sm
          transition-all duration-300
          ${isHovered ? 'shadow-[0_0_40px_rgba(168,85,247,0.3)]' : ''}
        `}
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.05))'
            : 'hsl(var(--card))',
        }}
      >
        {children}
      </div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-md pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `
              linear-gradient(
                45deg,
                transparent 40%,
                rgba(168, 85, 247, 0.1) 50%,
                transparent 60%
              )
            `,
            backgroundSize: '200% 200%',
            animation: 'border-flow 3s ease infinite',
          }}
        />
      )}

      <div 
        className={`
          absolute -inset-[1px] rounded-md
          bg-gradient-to-br from-neon-purple via-neon-blue to-neon-pink
          -z-10
          transition-opacity duration-300
          ${isHovered ? 'opacity-80' : 'opacity-40'}
        `}
        style={{
          filter: isHovered ? 'blur(4px)' : 'blur(2px)',
        }}
      />
    </motion.div>
  );
}
