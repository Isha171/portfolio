import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Timeline } from '@/components/Timeline';

const educationItems = [
  {
    id: '1',
    title: 'Master of Science in Computer Science',
    subtitle: 'Tech University',
    date: '2014 - 2016',
    description: 'Specialized in Human-Computer Interaction and Web Technologies.',
    bullets: [
      'Thesis: "Immersive Web Experiences Using WebGL and Spatial Computing"',
      'GPA: 3.9/4.0 - Graduated with Honors',
      'Research Assistant in the Interactive Media Lab',
    ],
  },
  {
    id: '2',
    title: 'Bachelor of Science in Software Engineering',
    subtitle: 'State University',
    date: '2010 - 2014',
    description: 'Foundation in computer science principles and software development.',
    bullets: [
      'Dean\'s List for Academic Excellence (All semesters)',
      'President of the Computer Science Student Association',
      'Senior Project: Real-time Multiplayer Game Engine',
    ],
  },
];

const certifications = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    icon: Award,
  },
  {
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    year: '2022',
    icon: Award,
  },
  {
    title: 'Meta Frontend Developer Certificate',
    issuer: 'Meta (Coursera)',
    year: '2022',
    icon: BookOpen,
  },
  {
    title: 'Certified Kubernetes Administrator',
    issuer: 'CNCF',
    year: '2021',
    icon: Award,
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
            My academic journey and continuous learning through certifications 
            and professional development.
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-neon-pink mb-8 neon-text-pink">
            Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-md bg-card/80 backdrop-blur-sm border border-neon-purple/30 p-6 hover:border-neon-purple/60 transition-all duration-300 group"
                data-testid={`card-cert-${index}`}
              >
                <div 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), transparent)',
                  }}
                />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center bg-neon-purple/10 border border-neon-purple/30 flex-shrink-0">
                    <cert.icon className="w-6 h-6 text-neon-purple" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-foreground">
                        {cert.title}
                      </h3>
                      <span className="text-sm font-mono px-2 py-0.5 rounded bg-neon-blue/10 text-neon-blue border border-neon-blue/30">
                        {cert.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
