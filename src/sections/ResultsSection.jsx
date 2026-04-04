import { motion } from 'framer-motion';
import EcosystemCard from '../components/EcosystemCard';
import SpeciesCard from '../components/SpeciesCard';
import SafeImage from '../components/SafeImage';

export default function ResultsSection({ product }) {
  if (!product) return null;

  return (
    <section id="results-section" className="relative w-full min-h-[100vh] flex flex-col py-24 bg-forest-900 section-snap scroll-mt-0">
      {/* Background Image transitions to habitat photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
           key={product.ecosystem.id}
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.4 }}
           transition={{ duration: 2 }}
           className="w-full h-full"
        >
          <SafeImage 
            src={product.ecosystem.image_url} 
            alt={product.ecosystem.name}
            className="w-full h-[120%] -mt-10 origin-center transition-all duration-1000"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/80 to-forest-900/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-eco-green uppercase tracking-widest font-mono text-sm mb-2 block">Discovered</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">
            {product.name} depends on...
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full flex justify-center mb-16"
        >
          <EcosystemCard ecosystem={product.ecosystem} />
        </motion.div>

        <div className="flex-1 flex flex-col justify-end">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-serif font-bold text-white mb-6 pl-4 border-l-4 border-eco-green"
          >
            Key Species in this Ecosystem
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ width: '100%', WebkitOverflowScrolling: 'touch' }}
          >
            {product.species.map((sp, idx) => (
              <motion.div 
                key={sp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (idx * 0.2) }}
              >
                <SpeciesCard species={sp} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
