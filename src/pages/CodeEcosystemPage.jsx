import { motion } from 'framer-motion';
import CodeReviewGraph from '../components/CodeReviewGraph';
import { ArrowLeft, Database, Layers, ShieldCheck, TreePine } from 'lucide-react';

export default function CodeEcosystemPage({ onBack }) {
  return (
    <div className="min-h-screen bg-forest-900 selection:bg-eco-green selection:text-forest-900 pb-20">
      
      {/* Premium Header */}
      <nav className="sticky top-0 z-50 bg-forest-900/40 backdrop-blur-3xl border-b border-forest-border/30 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-text-muted hover:text-eco-green transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Explorer</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-eco-green/10 flex items-center justify-center border border-eco-green/20">
             <TreePine className="w-4 h-4 text-eco-green" />
          </div>
          <h1 className="font-serif text-xl text-text-primary tracking-tight">Code <span className="text-eco-green">Ecosystem</span></h1>
        </div>

        <div className="flex gap-4">
           <button className="px-4 py-1.5 rounded-full border border-forest-border text-[10px] uppercase font-bold text-text-muted hover:text-text-primary hover:border-text-muted transition-all">
              Export Audit
           </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Stats */}
        <aside className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-forest-800 border border-forest-border shadow-xl"
          >
            <h2 className="text-amber font-serif text-lg mb-4">Architecture Vitals</h2>
            <div className="space-y-4">
              <StatItem icon={<Layers />} label="System Components" value="15" />
              <StatItem icon={<Database />} label="Data Models" value="4" />
              <StatItem icon={<ShieldCheck />} label="Integrity Score" value="98%" />
            </div>
            
            <div className="mt-8 pt-6 border-t border-forest-border">
              <p className="text-[11px] text-text-muted leading-relaxed">
                The ecosystem is healthy. All components are responding to stimulus and the dependency mesh is balanced.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-forest-800 border border-forest-border shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck className="w-24 h-24 text-eco-green" />
            </div>
            <h3 className="text-text-primary font-bold text-sm mb-2">Audit Insight</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Scan-to-Graph latency is optimized. All assets are being lazy-loaded appropriately.
            </p>
            <button className="mt-4 text-[10px] text-eco-green uppercase font-bold tracking-widest hover:underline">
              Run Full Diagnostic →
            </button>
          </motion.div>
        </aside>

        {/* Main Graph Area */}
        <main className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[700px]"
          >
            <CodeReviewGraph />
          </motion.div>
        </main>

      </div>

      {/* Floating Particles Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-green/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber/10 rounded-full blur-[120px]"></div>
      </div>

    </div>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="text-text-muted group-hover:text-eco-green transition-colors">
          {cloneElement(icon, { size: 16 })}
        </div>
        <span className="text-xs text-text-muted">{label}</span>
      </div>
      <span className="text-sm font-extrabold text-eco-green">{value}</span>
    </div>
  );
}

import { cloneElement } from 'react';
