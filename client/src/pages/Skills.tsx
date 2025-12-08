import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Database, Server, Wrench } from 'lucide-react';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { SectionWrapper } from '@/components/SectionWrapper';

interface SkillCategory {
  title: string;
  icon: typeof Code2;
  skills: string[];
  color: 'purple' | 'blue' | 'pink' | 'cyan';
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    color: 'purple',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Vue.js',
      'TailwindCSS',
      'Framer Motion',
      'Three.js',
      'GSAP',
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'blue',
    skills: [
      'Node.js',
      'Express',
      'Python',
      'FastAPI',
      'GraphQL',
      'REST APIs',
      'WebSockets',
      'Microservices',
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'pink',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Firebase',
      'Prisma',
      'Drizzle',
      'Supabase',
      'MySQL',
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: 'cyan',
    skills: [
      'Git',
      'Docker',
      'AWS',
      'Vercel',
      'CI/CD',
      'Linux',
      'Figma',
      'VS Code',
    ],
  },
];

const colorClasses = {
  purple: {
    bg: 'bg-neon-purple/10',
    border: 'border-neon-purple/30',
    text: 'text-neon-purple',
    glow: '0 0 15px rgba(168, 85, 247, 0.3)',
    hoverBg: 'hover:bg-neon-purple/20',
    hoverBorder: 'hover:border-neon-purple/60',
  },
  blue: {
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/30',
    text: 'text-neon-blue',
    glow: '0 0 15px rgba(59, 130, 246, 0.3)',
    hoverBg: 'hover:bg-neon-blue/20',
    hoverBorder: 'hover:border-neon-blue/60',
  },
  pink: {
    bg: 'bg-neon-pink/10',
    border: 'border-neon-pink/30',
    text: 'text-neon-pink',
    glow: '0 0 15px rgba(236, 72, 153, 0.3)',
    hoverBg: 'hover:bg-neon-pink/20',
    hoverBorder: 'hover:border-neon-pink/60',
  },
  cyan: {
    bg: 'bg-neon-cyan/10',
    border: 'border-neon-cyan/30',
    text: 'text-neon-cyan',
    glow: '0 0 15px rgba(6, 182, 212, 0.3)',
    hoverBg: 'hover:bg-neon-cyan/20',
    hoverBorder: 'hover:border-neon-cyan/60',
  },
};

export default function Skills() {
  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="page-skills">
      <SectionWrapper className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-sm text-neon-purple mb-6"
          >
            <Code2 className="w-4 h-4" />
            Technical Expertise
          </motion.div>

          <AnimatedHeading
            as="h1"
            glitch
            neonColor="purple"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            data-testid="text-skills-title"
          >
            MY SKILLS
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A comprehensive toolkit built over years of development experience, 
            constantly evolving with the latest technologies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              index={categoryIndex}
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const colors = colorClasses[category.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative rounded-md bg-card/80 backdrop-blur-sm border border-border p-6"
      data-testid={`card-skills-${category.title.toLowerCase()}`}
    >
      <div 
        className="absolute inset-0 rounded-md opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${
            category.color === 'purple' ? '#A855F7' :
            category.color === 'blue' ? '#3B82F6' :
            category.color === 'pink' ? '#EC4899' : '#06B6D4'
          }, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className={`w-12 h-12 rounded-md flex items-center justify-center ${colors.bg} border ${colors.border}`}
          >
            <category.icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <h2 className={`text-2xl font-bold ${colors.text}`}>
            {category.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {category.skills.map((skill, skillIndex) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.15 + skillIndex * 0.05,
              }}
              whileHover={{ scale: 1.05 }}
              className={`
                px-3 py-2 rounded-md text-center text-sm font-medium
                ${colors.bg} border ${colors.border}
                ${colors.hoverBg} ${colors.hoverBorder}
                transition-all duration-300 cursor-default
              `}
              style={{
                transform: `rotate(${(Math.random() - 0.5) * 2}deg)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = colors.glow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
              data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className={colors.text}>{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
