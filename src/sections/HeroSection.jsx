import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useMemo } from 'react';
import SafeImage from '../components/SafeImage';

export default function HeroSection({ onScrollToScanner }) {
  const leaves = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${5 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
  })), []);

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-forest-900 section-snap scroll-mt-0">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <SafeImage 
          src="https://images.unsplash.com/photo-1511497584788-8767601ad209?auto=format&fit=crop&q=80&w=2000" 
          alt="Ancient Cloud Forest"
          className="absolute inset-0 w-full h-[120%] -mt-10 origin-center animate-bg-pan"
        />
        <div className="absolute inset-0 bg-forest-900/80 bg-gradient-to-t from-forest-900 via-forest-900/60 to-forest-900/90" />
      </div>

      {/* Leaf Particles */}
      {leaves.map((leaf) => (
        <div 
          key={leaf.id} 
          className="leaf z-0" 
          style={{ 
            left: leaf.left, 
            animationDuration: leaf.animationDuration,
            animationDelay: leaf.animationDelay,
            backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%2334d974\" stroke=\"none\"><path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z\"/></svg>')"
          }} 
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 drop-shadow-xl"
        >
          The World Behind Your Products Is <span className="text-forest-900 bg-white px-4 py-1 pb-2 inline-block transform -rotate-1 mix-blend-screen opacity-90 mt-2">Invisible</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl font-light"
        >
          Until Now. Scan any product and watch the forests, bees, and rivers that make it possible emerge from the darkness.
        </motion.p>

        <motion.button 
          onClick={onScrollToScanner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-eco-green text-forest-900 px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(52,217,116,0.4)] hover:shadow-[0_0_30px_rgba(52,217,116,0.6)] transition-all group"
        >
          Start Exploring
          <ArrowDown size={20} className="group-hover:animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
