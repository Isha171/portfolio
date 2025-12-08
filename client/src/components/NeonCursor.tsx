import { useEffect, useRef, useState } from 'react';

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

export function NeonCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = useRef(0);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      positionRef.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      trailIdRef.current += 1;
      setTrails(prev => {
        const newTrails = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current }];
        if (newTrails.length > 8) {
          return newTrails.slice(-8);
        }
        return newTrails;
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`,
            width: `${8 - index * 0.5}px`,
            height: `${8 - index * 0.5}px`,
            backgroundColor: '#A855F7',
            opacity: (index / trails.length) * 0.4,
            filter: 'blur(2px)',
          }}
        />
      ))}

      <div
        ref={cursorOuterRef}
        className={`fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: 0,
          top: 0,
          width: isHovering ? '50px' : '35px',
          height: isHovering ? '50px' : '35px',
          borderColor: isHovering ? '#3B82F6' : '#A855F7',
          boxShadow: isHovering 
            ? '0 0 10px #3B82F6, 0 0 20px rgba(59, 130, 246, 0.5)'
            : '0 0 10px #A855F7, 0 0 20px rgba(168, 85, 247, 0.5)',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.08s ease-out',
        }}
        data-testid="cursor-outer"
      />

      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[10002] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-100 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: 0,
          top: 0,
          width: isHovering ? '8px' : '6px',
          height: isHovering ? '8px' : '6px',
          backgroundColor: isHovering ? '#3B82F6' : '#A855F7',
          boxShadow: isHovering 
            ? '0 0 10px #3B82F6, 0 0 20px #3B82F6'
            : '0 0 10px #A855F7, 0 0 20px #A855F7',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        }}
        data-testid="cursor-inner"
      />
    </>
  );
}
