import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code, Rocket } from 'lucide-react';
import { Link } from 'wouter';
import { ThreeCanvas } from '@/components/ThreeCanvas';
import { MagneticButton } from '@/components/MagneticButton';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { SectionWrapper } from '@/components/SectionWrapper';

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ThreeCanvas className="z-0" />

        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 30%, hsl(270 5% 3%) 70%)',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-sm text-neon-purple">
              <Sparkles className="w-4 h-4" />
              BCA Final Year Student
            </span>
          </motion.div>

          <AnimatedHeading
            as="h1"
            glitch
            neonColor="purple"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            data-testid="text-hero-title"
          >
            ISHA SINGH
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-neon-purple mb-6"
            data-testid="text-hero-subtitle-name"
          >
            BCA Student | Aspiring Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            data-testid="text-hero-subtitle"
          >
            Passionate about programming and web development. Currently learning 
            and building projects with C, C++, VB 6.0, HTML, CSS, and SQL to 
            enhance my skills as an aspiring developer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/projects">
              <MagneticButton variant="primary" data-testid="button-view-work">
                <Code className="w-4 h-4" />
                View My Work
              </MagneticButton>
            </Link>
            <Link href="/contact">
              <MagneticButton variant="secondary" data-testid="button-contact">
                <Rocket className="w-4 h-4" />
                Get In Touch
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-neon-purple animate-glow-pulse" />
          </motion.div>
        </motion.div>
      </section>

      <SectionWrapper className="py-24 px-6" data-testid="section-about">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[320px,1fr] gap-10 items-center text-center md:text-left">
          <div className="relative mx-auto h-[320px] w-[240px] overflow-hidden rounded-xl border border-border/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <img
              src="/ishika.jpg"
              alt="Isha Singh"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>

          <AnimatedHeading
            as="h2"
            neonColor="blue"
            className="text-3xl md:text-4xl font-bold mb-8"
            data-testid="text-about-title"
          >
            ABOUT ME
          </AnimatedHeading>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                Hi, I'm <span className="text-neon-purple font-semibold">Isha Singh</span>, a BCA Final Year Student with a passion for programming and 
                web development. I'm currently pursuing my Bachelor's in Computer Applications 
                and building my skills in various programming languages and technologies.
              </p>
              <p>
                I'm eager to learn and grow in the field of software development, 
                constantly working on projects to enhance my skills and gain practical 
                experience in building applications.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 px-6 bg-card/30" data-testid="section-featured">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading
            as="h2"
            neonColor="pink"
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            data-testid="text-featured-title"
          >
            WHAT I DO
          </AnimatedHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Programming',
                description: 'Working with C, C++, and VB 6.0 to build applications and solve problems.',
              },
              {
                icon: Rocket,
                title: 'Web Development',
                description: 'Creating web pages and interfaces using HTML and CSS, learning modern web technologies.',
              },
              {
                icon: Sparkles,
                title: 'Database Management',
                description: 'Managing and querying databases using SQL, understanding data structures and relationships.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative p-6 rounded-md bg-card border border-border hover:border-neon-purple/50 transition-all duration-300 group"
                data-testid={`card-service-${index}`}
              >
                <div 
                  className="w-12 h-12 rounded-md flex items-center justify-center mb-4 bg-neon-purple/10 border border-neon-purple/30 group-hover:bg-neon-purple/20 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-neon-purple" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>

                <div 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), transparent)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
