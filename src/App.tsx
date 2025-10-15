import React, { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  ArrowDown,
  MessageSquare,
  Users,
  Zap,
  Database,
  Mail,
  Linkedin
} from 'lucide-react';
import Logo from './assets/logo.svg';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Floating shapes component
const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-slate-600/10 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-12 h-12 bg-blue-400/5 rounded-full"
        animate={{
          y: [0, -15, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Button component
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'lg';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'lg',
  onClick 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center cursor-pointer";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg",
    secondary: "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
  };
  const sizes = {
    sm: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// Hero Section
const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden">
      <FloatingShapes />
      
      <motion.div 
        className="container mx-auto px-6 text-center z-10"
        style={{ y }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <VeloceAILogo className="w-32 h-32 mx-auto mb-6" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ship your AI support bot in{' '}
          <span className="text-blue-400">6 weeks</span>.{' '}
          Not 6 months.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We build production-ready AI features while your competitors are still hiring teams.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg">Book a Call</Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  );
};

// Problem Section
const ProblemSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: Clock,
      text: "Hiring takes 6+ months. $500K+ in salaries. They still might not ship."
    },
    {
      icon: DollarSign,
      text: "Agencies bill for discovery. 20 weeks later, you get a prototype."
    },
    {
      icon: FileText,
      text: "You need working features. Not meeting notes."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-gray-900"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Most companies waste months on AI
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {problems.map((problem, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <problem.icon className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Solution Section with Timeline
const SolutionSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    { weeks: "Week 1-2", task: "Ticket analysis & architecture", color: "bg-electric-blue" },
    { weeks: "Week 3-5", task: "Build & testing", color: "bg-electric-blue" },
    { weeks: "Week 6-8", task: "Launch & tuning", color: "bg-electric-blue" },
    { weeks: "Result", task: "Production-ready bot", color: "bg-green-500" }
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          We ship in 6-10 weeks
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center mb-8 last:mb-0"
              variants={fadeInUp}
            >
              <div className="flex-shrink-0 w-32 text-right mr-8">
                <span className="text-blue-400 font-semibold">{item.weeks}</span>
              </div>
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-400 mr-8"></div>
              <div className="flex-1">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-lg">{item.task}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: MessageSquare,
      text: "Handles tier 1 questions (password resets, billing, how-to)"
    },
    {
      icon: Users,
      text: "Routes to right human when uncertain"
    },
    {
      icon: Zap,
      text: "Uses agentic workflows for escalation"
    },
    {
      icon: Database,
      text: "RAG for accurate retrieval"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-gray-900"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Your support bot that actually works
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex items-start space-x-4"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Technical Credibility Section
const TechnicalSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techPoints = [
    "Agentic workflows for smart routing",
    "RAG architecture for accurate answers", 
    "Fine-tuned for your use case"
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-gray-900"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Built for production
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {techPoints.map((point, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={fadeInUp}
            >
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <p className="text-gray-700">{point}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          className="text-5xl font-bold mb-6"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Ready to ship?
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.2 }}
        >
          Book a 20-minute call. We'll scope your bot and give you a timeline.
        </motion.p>
        
        <motion.div 
          className="space-y-4"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg">Book a Call</Button>
          <p className="text-gray-300">
            Or email <a href="mailto:massab@veloceai.co" className="text-blue-400 hover:underline">massab@veloceai.co</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Logo Component
const VeloceAILogo: React.FC<{ className?: string }> = ({ 
  className = "w-8 h-8"
}) => {
  return (
    <img 
      src={Logo} 
      alt="VeloceAI Logo" 
      className={`${className} drop-shadow-2xl`}
      style={{
        filter: 'brightness(0) invert(1)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

// Footer
const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center space-x-4">
            <VeloceAILogo className="w-16 h-16" />
            <div>
              <h3 className="text-2xl font-bold text-blue-400">VeloceAI</h3>
              <p className="text-sm text-gray-400">Ship AI features in weeks, not quarters</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="mailto:massab@veloceai.co" className="hover:text-blue-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/veloceaico/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 VeloceAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  useEffect(() => {
    // Set page title and meta description
    document.title = "VeloceAI - Ship AI features in weeks, not quarters";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ship your AI support bot in 6 weeks. We build production-ready AI features while your competitors are still hiring teams.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Ship your AI support bot in 6 weeks. We build production-ready AI features while your competitors are still hiring teams.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TechnicalSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default App;