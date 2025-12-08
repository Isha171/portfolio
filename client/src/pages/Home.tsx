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
              Available for hire
            </span>
          </motion.div>

          <AnimatedHeading
            as="h1"
            glitch
            neonColor="purple"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            data-testid="text-hero-title"
          >
            CREATIVE DEVELOPER
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            data-testid="text-hero-subtitle"
          >
            I craft immersive digital experiences with cutting-edge 
            technologies. Specializing in modern web development, 
            interactive 3D, and creative coding.
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
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedHeading
            as="h2"
            neonColor="blue"
            className="text-3xl md:text-4xl font-bold mb-8"
            data-testid="text-about-title"
          >
            ABOUT ME
          </AnimatedHeading>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 text-muted-foreground text-lg leading-relaxed"
          >
            <p>
              I'm a passionate full-stack developer with a love for creating 
              visually stunning and highly performant web applications. My 
              journey in tech started with curiosity and has evolved into a 
              career focused on pushing the boundaries of what's possible on 
              the web.
            </p>
            <p>
              When I'm not coding, you'll find me exploring the latest in 
              creative technology, contributing to open-source projects, or 
              diving deep into the world of generative art and interactive 
              experiences.
            </p>
          </motion.div>
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
                title: 'Frontend Development',
                description: 'Building responsive, performant interfaces with React, Next.js, and modern CSS.',
              },
              {
                icon: Rocket,
                title: 'Backend Systems',
                description: 'Designing scalable APIs and services with Node.js, Python, and cloud platforms.',
              },
              {
                icon: Sparkles,
                title: 'Creative Coding',
                description: 'Crafting interactive 3D experiences with Three.js, WebGL, and generative art.',
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
