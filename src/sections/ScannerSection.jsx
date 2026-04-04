import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ScanLine, X } from 'lucide-react';
import BarcodeScanner from '../components/BarcodeScanner';
import ecosystemsData from '../data/ecosystems.json';

export default function ScannerSection({ onProductFound }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState('');

  const handleScan = useCallback((decodedText) => {
    setShowScanner(false);
    if (!decodedText || typeof decodedText !== 'string' || decodedText.length > 50) {
       setError("Invalid barcode format.");
       return;
    }
    const cleanText = decodedText.trim();
    const product = ecosystemsData.products.find(p => p.barcode === cleanText);
    if (product) {
       onProductFound(product);
       setError('');
    } else {
       setError("Product not found in demo database.");
    }
  }, [onProductFound]);

  const executeSearch = (query) => {
    if (!query.trim()) return;
    
    // Simple fuzzy match for demo
    const match = ecosystemsData.products.find(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );

    if (match) {
      onProductFound(match);
      setSearchQuery('');
      setError('');
    } else {
      setError("No demo product matches that search.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  // Predefined pills to show what works
  const demoPills = ["Coffee", "Almonds", "Chocolate", "Cotton", "Avocado"];

  return (
    <section id="scanner-section" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center py-24 px-6 bg-forest-800 section-snap">
      <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-5"></div>
      <div className="max-w-2xl w-full text-center z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
        >
          Scan. Discover. Connect.
        </motion.h2>
        <p className="text-text-secondary mb-12 text-xl font-light">
          Point your camera at a barcode, or search by name.
        </p>

        <div className="glass-card p-10 relative overflow-visible transform hover:scale-[1.01] transition-transform duration-500 shadow-2xl">
          {/* Animated decorative scan line bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-scan-cyan/5 to-transparent h-48 w-full animate-scan-line -top-48 z-0 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!showScanner ? (
              <motion.div 
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center relative z-10"
              >
                <form onSubmit={handleSearch} className="w-full relative mb-10">
                  <Search className="absolute left-2 top-4 text-text-muted transition-colors peer-focus:text-eco-green" size={28} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try: coffee, almonds, chocolate..." 
                    className="w-full bg-transparent border-b-2 border-forest-border pb-3 pl-14 text-2xl text-white outline-none focus:border-eco-green transition-colors placeholder:text-text-muted/40 font-serif peer"
                  />
                  <button type="submit" className="hidden">Search</button>
                </form>

                <div className="flex items-center gap-6 w-full mb-10">
                  <div className="h-[1px] flex-1 bg-forest-border"></div>
                  <span className="text-text-muted font-mono text-xs tracking-widest">OR</span>
                  <div className="h-[1px] flex-1 bg-forest-border"></div>
                </div>

                <button 
                  onClick={() => setShowScanner(true)}
                  className="flex items-center gap-3 bg-forest-900 border-2 border-eco-green text-eco-green px-8 py-4 rounded-xl hover:bg-eco-green hover:text-forest-900 font-bold text-lg transition-all w-full justify-center group shadow-[0_0_15px_rgba(52,217,116,0.1)] hover:shadow-[0_0_25px_rgba(52,217,116,0.4)]"
                >
                  <ScanLine className="group-hover:animate-pulse" />
                  Open Camera Scanner
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="scanner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex justify-center flex-col items-center relative z-10"
              >
                <button 
                  onClick={() => setShowScanner(false)}
                  className="absolute -top-6 -right-6 lg:-right-12 bg-forest-900 p-3 rounded-full text-text-muted hover:text-white hover:bg-danger-red z-20 shadow-xl border border-forest-border transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="w-full bg-black rounded-xl overflow-hidden p-2">
                  <BarcodeScanner onScan={handleScan} />
                </div>
                <p className="mt-6 text-sm text-text-muted font-mono bg-forest-900/80 px-4 py-2 rounded-lg inline-block border border-forest-border">Position barcode in the center. Requires camera permissions.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <motion.p role="alert" aria-live="polite" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="text-danger-red mt-8 bg-danger-red/10 py-3 rounded-lg font-mono text-sm border border-danger-red/20">{error}</motion.p>}
        </div>

        <div className="mt-16">
          <p className="text-xs text-text-muted mb-4 font-mono uppercase tracking-widest">Demo Products Configured Offline</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {demoPills.map(cur => (
              <button 
                key={cur}
                onClick={() => { setSearchQuery(cur); executeSearch(cur); }}
                className="px-5 py-2 rounded-full border border-forest-border bg-forest-900 text-text-secondary hover:text-eco-green-lime hover:border-eco-green-lime hover:bg-forest-800 transition-all text-sm font-medium shadow-sm hover:shadow-md"
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
