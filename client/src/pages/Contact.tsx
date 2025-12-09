import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Clock, CheckCircle, Phone, Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { SectionWrapper } from '@/components/SectionWrapper';
import { MagneticButton } from '@/components/MagneticButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: 'Message sent!',
        description: 'Thanks for reaching out. I\'ll get back to you soon.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="page-contact">
      <SectionWrapper className="px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-sm text-neon-purple mb-6"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </motion.div>

          <AnimatedHeading
            as="h1"
            glitch
            neonColor="purple"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            data-testid="text-contact-title"
          >
            CONTACT ME
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Have a project in mind? Let's discuss how we can work together to 
            bring your ideas to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Let's Connect
              </h2>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of something amazing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-neon-purple/10 border border-neon-purple/30">
                  <Mail className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">ishasing1805@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-neon-purple/10 border border-neon-purple/30">
                  <Github className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <a
                    href="https://github.com/isha17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-medium hover:text-neon-purple transition-colors"
                  >
                    github.com/isha17
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-neon-pink/10 border border-neon-pink/30">
                  <Phone className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium">9341011817</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-neon-blue/10 border border-neon-blue/30">
                  <MapPin className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">Anisabad</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-neon-pink/10 border border-neon-pink/30">
                  <Clock className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-foreground font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 rounded-md bg-card/80 border border-neon-purple/30"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-neon-purple/20 border border-neon-purple/50 mb-6 animate-glow-pulse">
                  <CheckCircle className="w-8 h-8 text-neon-purple" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Message Received!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <MagneticButton
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  data-testid="button-send-another"
                >
                  Send Another Message
                </MagneticButton>
              </motion.div>
            ) : (
              <div className="p-8 rounded-md bg-card/80 backdrop-blur-sm border border-neon-purple/30">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-muted/50 border-neon-purple/30 focus:border-neon-purple transition-colors"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="bg-muted/50 border-neon-purple/30 focus:border-neon-purple transition-colors"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project..."
                              className="min-h-[150px] bg-muted/50 border-neon-purple/30 focus:border-neon-purple transition-colors resize-none"
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <MagneticButton
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </MagneticButton>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
