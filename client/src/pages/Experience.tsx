import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Timeline } from '@/components/Timeline';

const experienceItems = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    subtitle: 'TechCorp Industries',
    date: '2022 - Present',
    description: 'Leading the frontend architecture for a suite of enterprise applications.',
    bullets: [
      'Architected and implemented a micro-frontend system serving 500k+ users',
      'Reduced page load time by 60% through code splitting and lazy loading',
      'Mentored a team of 5 junior developers and established coding standards',
      'Integrated AI-powered features using TensorFlow.js and custom ML models',
    ],
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    subtitle: 'StartupXYZ',
    date: '2020 - 2022',
    description: 'Built the core product from MVP to production-ready SaaS platform.',
    bullets: [
      'Developed a real-time collaboration platform using WebSockets and React',
      'Designed and implemented RESTful APIs handling 1M+ requests daily',
      'Set up CI/CD pipelines reducing deployment time from hours to minutes',
      'Implemented end-to-end encryption for sensitive user data',
    ],
  },
  {
    id: '3',
    title: 'Frontend Developer',
    subtitle: 'Digital Agency Co.',
    date: '2018 - 2020',
    description: 'Created interactive web experiences for Fortune 500 clients.',
    bullets: [
      'Built 20+ client websites with pixel-perfect designs and animations',
      'Developed custom WordPress themes and headless CMS solutions',
      'Created interactive 3D product configurators using Three.js',
      'Optimized websites for SEO achieving top 3 rankings for target keywords',
    ],
  },
  {
    id: '4',
    title: 'Junior Developer',
    subtitle: 'CodeWorks Studio',
    date: '2016 - 2018',
    description: 'Started my professional journey building web applications.',
    bullets: [
      'Developed responsive web applications using HTML, CSS, and JavaScript',
      'Contributed to open-source projects and internal tools',
      'Learned agile methodologies and team collaboration best practices',
    ],
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="page-experience">
      <SectionWrapper className="px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-sm text-neon-pink mb-6"
          >
            <Briefcase className="w-4 h-4" />
            Work History
          </motion.div>

          <AnimatedHeading
            as="h1"
            glitch
            neonColor="purple"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            data-testid="text-experience-title"
          >
            EXPERIENCE
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A journey through my professional career, highlighting key roles and 
            achievements in the world of software development.
          </motion.p>
        </div>

        <Timeline 
          items={experienceItems}
          data-testid="timeline-experience"
        />
      </SectionWrapper>
    </div>
  );
}
