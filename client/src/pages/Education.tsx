import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Timeline } from '@/components/Timeline';

const educationItems = [
  {
    id: '1',
    title: 'Bachelor of Computer Applications (BCA)',
    subtitle: 'Final Year Student',
    date: 'Pursuing',
    description: 'Currently in final year, learning computer science fundamentals, programming languages, and software development.',
    bullets: [
      'Learning programming languages: C, C++, VB 6.0',
      'Web development: HTML, CSS',
      'Database management: SQL',
      'Building projects to enhance practical skills',
    ],
  },
];

export default function Education() {
  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="page-education">
      <SectionWrapper className="px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-sm text-neon-cyan mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            Academic Background
          </motion.div>

          <AnimatedHeading
            as="h1"
            glitch
            neonColor="purple"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            data-testid="text-education-title"
          >
            EDUCATION
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            My academic journey as a BCA student, continuously learning and building 
            practical skills in programming and software development.
          </motion.p>
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-neon-blue mb-8 neon-text-blue"
          >
            Degrees
          </motion.h2>
          <Timeline 
            items={educationItems}
            data-testid="timeline-education"
          />
        </div>

      </SectionWrapper>
    </div>
  );
}
