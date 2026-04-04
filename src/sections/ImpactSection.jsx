import { motion } from 'framer-motion';
import { Share2, Heart, ShieldCheck, Bird, TreePine } from 'lucide-react';
import SafeImage from '../components/SafeImage';

export default function ImpactSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center py-24 px-6 bg-gradient-to-b from-forest-900 to-[#0a120b] text-text-primary section-snap overflow-hidden">
      
      {/* Background illustration / texture */}
      <div className="absolute inset-0 z-0">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 0.2 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="w-full h-full"
        >
          <SafeImage 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000" 
            alt="Thriving Forest"
            className="w-full h-full mix-blend-luminosity grayscale"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/60 to-forest-900 border-t border-forest-border/30" />
      </div>

      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mb-8"
        >
          <div className="w-24 h-24 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(52,217,116,0.3)]">
            <Heart size={48} className="text-eco-green animate-pulse" />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-xl">
            Your Choices Have <span className="text-eco-green">Roots.</span>
          </h2>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-16 text-text-secondary">
             When you know, you choose differently. Millions of small choices protect millions of hectares and save countless species.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16"
        >
          <div className="glass-card p-6 flex flex-col items-center text-center hover:bg-forest-800 transition-colors cursor-default transform hover:-translate-y-2 transition-transform">
             <TreePine className="text-amber mb-4" size={32} />
             <h4 className="font-serif font-bold text-white text-xl mb-2">Shade-grown</h4>
             <p className="text-sm text-text-secondary">Preserves native canopy protecting delicate understory ecosystems.</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center hover:bg-forest-800 transition-colors cursor-default transform hover:-translate-y-2 transition-transform">
             <Bird className="text-scan-cyan mb-4" size={32} />
             <h4 className="font-serif font-bold text-white text-xl mb-2">Pollinator-friendly</h4>
             <p className="text-sm text-text-secondary">Avoids harsh pesticides, letting essential pollinators thrive.</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center hover:bg-forest-800 transition-colors cursor-default transform hover:-translate-y-2 transition-transform">
             <ShieldCheck className="text-eco-green mb-4" size={32} />
             <h4 className="font-serif font-bold text-white text-xl mb-2">Rainforest Alliance</h4>
             <p className="text-sm text-text-secondary">Ensures products meet rigorous environmental and social standards.</p>
          </div>
        </motion.div>

        <motion.button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'Hidden Ecosystems Explorer', text: 'I just discovered the ecosystem behind my product!', url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-eco-green text-forest-900 px-10 py-5 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(52,217,116,0.4)] hover:shadow-[0_0_40px_rgba(52,217,116,0.6)] transition-all"
        >
          <Share2 size={24} />
          Share Your Discovery
        </motion.button>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-sm font-mono text-text-muted">
        Hidden Ecosystems Explorer — Hackathon Demo 2026
      </div>
    </section>
  );
}
