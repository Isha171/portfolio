import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  glitch?: boolean;
  neonColor?: 'purple' | 'blue' | 'pink' | 'cyan';
  delay?: number;
  'data-testid'?: string;
}

export function AnimatedHeading({
  children,
  className = '',
  as: Tag = 'h2',
  glitch = false,
  neonColor = 'purple',
  delay = 0,
  'data-testid': testId,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const neonClasses = {
    purple: 'neon-text-purple text-neon-purple',
    blue: 'neon-text-blue text-neon-blue',
    pink: 'neon-text-pink text-neon-pink',
    cyan: 'neon-text-cyan text-neon-cyan',
  };

  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    const text = children;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [isInView, children]);

  const words = children.split(' ');

  if (glitch && isTypingComplete) {
    return (
      <Tag
        ref={ref}
        className={`
          glitch-text
          ${neonClasses[neonColor]}
          ${className}
        `}
        data-text={children}
        data-testid={testId}
      >
        {children}
      </Tag>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Tag
        className={`
          ${neonClasses[neonColor]}
          ${className}
        `}
        data-testid={testId}
      >
        {isTypingComplete ? (
          words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: delay + wordIndex * 0.1,
              }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))
        ) : (
          <>
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
            />
          </>
        )}
      </Tag>
    </motion.div>
  );
}
