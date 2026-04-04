import { motion } from 'framer-motion';
import StatCounter from '../components/StatCounter';
import SafeImage from '../components/SafeImage';

export default function ProblemSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center py-24 px-6 bg-forest-900 section-snap">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Everything is connected. <br/>
            <span className="text-text-muted">But we only see the shelf.</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            The supply chains that feed us heavily rely on local ecosystems and pollinators. Yet, there are zero consumer tools showing you the living network your morning coffee or chocolate bar depends on.
          </p>
          
          <div className="relative rounded-2xl overflow-hidden glass-card p-[1px] bg-gradient-to-br from-forest-border via-forest-800 to-forest-border">
             {/* Split image effect */}
             <div className="relative h-[300px] w-full rounded-xl overflow-hidden group bg-forest-900">
               <SafeImage 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
                  alt="Supermarket Shelf" 
                  className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out group-hover:opacity-0" 
               />
               <SafeImage 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" 
                  alt="Forest Deforestation" 
                  className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100 mix-blend-luminosity grayscale group-hover:grayscale-0" 
               />
               <div className="absolute inset-0 bg-forest-900/30 group-hover:bg-forest-900/10 transition-colors duration-1000"></div>
               <div className="absolute bottom-4 left-4 bg-forest-900/80 backdrop-blur px-3 py-1 rounded text-white font-mono text-xs uppercase tracking-wider opacity-80 border border-forest-border">Hover to reveal truth</div>
             </div>
          </div>
        </motion.div>

        {/* Stats Side */}
        <div className="flex flex-col gap-12 py-10 md:py-0 border-l border-forest-border/50 pl-0 md:pl-12">
          <StatCounter value="75%" label="of global crop types depend on animal pollination" />
          <StatCounter value="1M+" label="plant and animal species at risk of extinction" />
          <StatCounter value="0" label="consumer apps showing you the ecosystem link... until now" />
        </div>

      </div>
    </section>
  );
}
