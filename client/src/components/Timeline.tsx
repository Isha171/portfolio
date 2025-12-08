import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  bullets?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  'data-testid'?: string;
}

export function Timeline({ items, className = '', 'data-testid': testId }: TimelineProps) {
  return (
    <div className={`relative ${className}`} data-testid={testId}>
      <div 
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2"
        style={{
          background: 'linear-gradient(to bottom, #A855F7, #3B82F6, #EC4899)',
        }}
      />

      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineEntry 
            key={item.id} 
            item={item} 
            index={index}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineEntryProps {
  item: TimelineItem;
  index: number;
  isEven: boolean;
}

function TimelineEntry({ item, index, isEven }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div 
      ref={ref}
      className={`
        relative
        pl-12 md:pl-0
        ${isEven ? 'md:pr-[52%]' : 'md:pl-[52%]'}
      `}
    >
      <motion.div
        className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="relative">
          <div 
            className="w-4 h-4 rounded-full bg-neon-purple"
            style={{
              boxShadow: '0 0 10px #A855F7, 0 0 20px #A855F7, 0 0 30px #7E22CE',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{
              border: '2px solid #A855F7',
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ 
          opacity: 0, 
          x: isEven ? -30 : 30,
          y: 20,
        }}
        animate={isInView ? { 
          opacity: 1, 
          x: 0,
          y: 0,
        } : { 
          opacity: 0, 
          x: isEven ? -30 : 30,
          y: 20,
        }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={`
          relative
          rounded-md
          p-6
          bg-card/80
          backdrop-blur-sm
          border border-neon-purple/30
          transition-all duration-300
          hover:border-neon-purple/60
          hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]
        `}
        data-testid={`timeline-item-${item.id}`}
      >
        <div className="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: 'linear-gradient(135deg, #A855F7, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="text-lg font-bold text-foreground">
              {item.title}
            </h3>
            <span 
              className="text-sm font-mono px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
            >
              {item.date}
            </span>
          </div>

          <p className="text-neon-blue font-medium mb-3">
            {item.subtitle}
          </p>

          {item.description && (
            <p className="text-muted-foreground mb-4">
              {item.description}
            </p>
          )}

          {item.bullets && item.bullets.length > 0 && (
            <ul className="space-y-2">
              {item.bullets.map((bullet, bulletIndex) => (
                <motion.li
                  key={bulletIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.15 + bulletIndex * 0.1 + 0.3,
                  }}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-pink mt-2 flex-shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <div 
          className={`
            hidden md:block
            absolute top-4 
            ${isEven ? '-right-6' : '-left-6'}
            w-4 h-[2px]
          `}
          style={{
            background: 'linear-gradient(to right, #A855F7, #3B82F6)',
          }}
        />
      </motion.div>
    </div>
  );
}
