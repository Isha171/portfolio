import { useEffect, useState } from 'react';

interface RaveGridBackgroundProps {
  className?: string;
  raveMode?: boolean;
}

export function RaveGridBackground({ className = '', raveMode = false }: RaveGridBackgroundProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;
    const speed = raveMode ? 0.15 : 0.03;

    const animate = (time: number) => {
      if (time - lastTime > 16) {
        setOffset(prev => (prev + speed) % 50);
        lastTime = time;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [raveMode]);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      data-testid="rave-grid-background"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`absolute inset-0 ${raveMode ? 'animate-rave-hue' : ''}`}
        style={{
          background: `
            linear-gradient(
              rgba(168, 85, 247, ${raveMode ? 0.15 : 0.08}) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(168, 85, 247, ${raveMode ? 0.15 : 0.08}) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: `0 ${offset}px`,
          transform: 'rotateX(60deg) scale(2.5)',
          transformOrigin: 'center top',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 0%,
              rgba(168, 85, 247, 0.2) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 30% 70%,
              rgba(59, 130, 246, 0.15) 0%,
              transparent 40%
            ),
            radial-gradient(
              ellipse at 70% 80%,
              rgba(236, 72, 153, 0.1) 0%,
              transparent 40%
            )
          `,
        }}
      />

      <div 
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(to top, hsl(270 5% 3%), transparent)',
        }}
      />
    </div>
  );
}
