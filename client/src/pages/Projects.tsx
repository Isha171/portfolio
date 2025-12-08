import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { HologramCard } from '@/components/HologramCard';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Neural Synth',
    description: 'An AI-powered music synthesizer that generates unique soundscapes based on user input and neural network analysis.',
    tech: ['React', 'TensorFlow.js', 'Web Audio API', 'Python'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'Quantum Dashboard',
    description: 'Real-time analytics dashboard with interactive 3D data visualizations and predictive insights.',
    tech: ['Next.js', 'Three.js', 'D3.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'Cyber Wallet',
    description: 'Secure cryptocurrency wallet with biometric authentication and multi-chain support.',
    tech: ['React Native', 'Solidity', 'Node.js', 'Web3.js'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '4',
    title: 'Pixel Forge',
    description: 'Browser-based pixel art editor with collaborative features and NFT minting capabilities.',
    tech: ['Vue.js', 'Canvas API', 'Socket.io', 'IPFS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '5',
    title: 'Echo Chamber',
    description: 'Immersive audio experience platform with spatial sound and VR integration.',
    tech: ['Three.js', 'WebXR', 'Howler.js', 'Express'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '6',
    title: 'Data Nexus',
    description: 'Enterprise data pipeline management tool with visual workflow builder.',
    tech: ['TypeScript', 'Apache Kafka', 'React Flow', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="page-projects">
      <SectionWrapper className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-sm text-neon-blue mb-6"
          >
            <Layers className="w-4 h-4" />
            Portfolio
          </motion.div>

          <AnimatedHeading
            as="h1"
            glitch
            neonColor="purple"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            data-testid="text-projects-title"
          >
            MY PROJECTS
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A collection of projects that showcase my skills in web development, 
            creative coding, and system design.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HologramCard
                className="h-full"
                data-testid={`card-project-${project.id}`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-foreground group">
                      <span className="relative">
                        {project.title}
                        {project.featured && (
                          <span className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
                        )}
                      </span>
                    </h3>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-md bg-muted/50 hover:bg-neon-purple/20 transition-colors"
                          data-testid={`link-github-${project.id}`}
                        >
                          <Github className="w-4 h-4 text-muted-foreground hover:text-neon-purple" />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-md bg-muted/50 hover:bg-neon-blue/20 transition-colors"
                          data-testid={`link-live-${project.id}`}
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-neon-blue" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-neon-purple/30 text-neon-purple bg-neon-purple/5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </HologramCard>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
