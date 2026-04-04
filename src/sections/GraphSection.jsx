import { motion } from 'framer-motion';
import DependencyGraph from '../components/DependencyGraph';

export default function GraphSection({ product }) {
  if (!product) return null;

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col py-24 px-6 bg-forest-900 border-t border-forest-border section-snap">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest-800/30 via-forest-900 to-forest-900 pointer-events-none"></div>
      
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            The Dependency Web
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Watch how {product.name.toLowerCase()} connects to the living world. The graph below is generated dynamically from the ecosystem data.
          </p>
        </motion.div>

        <div className="flex-1 w-full bg-forest-900/50 rounded-2xl border border-forest-border/50 overflow-hidden backdrop-blur shadow-2xl relative">
          <div className="absolute top-4 left-4 z-20 glass-card bg-forest-900/80 p-4 text-xs font-mono text-text-secondary flex flex-col gap-3">
            <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-amber"></div> Product</div>
            <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-eco-green"></div> Ecosystem</div>
            <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-eco-green-lime"></div> Species</div>
          </div>
          <DependencyGraph product={product} ecosystem={product.ecosystem} species={product.species} />
        </div>
      </div>
    </section>
  );
}
