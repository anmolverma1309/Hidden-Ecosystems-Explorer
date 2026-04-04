import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import ScannerSection from './sections/ScannerSection';

const ResultsSection = lazy(() => import('./sections/ResultsSection'));
const GraphSection = lazy(() => import('./sections/GraphSection'));
const MapSection = lazy(() => import('./sections/MapSection'));
const ImpactSection = lazy(() => import('./sections/ImpactSection'));

function App() {
  const [activeProduct, setActiveProduct] = useState(null);
  const timerRef = useRef(null);
  
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const scrollToScanner = () => {
    document.getElementById('scanner-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductFound = (product) => {
    setActiveProduct(product);
    // Add small delay to let state update before scrolling
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-forest-900 scrollbar-hide">
      
      <div className="snap-start"><HeroSection onScrollToScanner={scrollToScanner} /></div>
      <div className="snap-start"><ProblemSection /></div>
      <div className="snap-start"><ScannerSection onProductFound={handleProductFound} /></div>
      
      {activeProduct && (
        <Suspense fallback={<div className="min-h-screen bg-forest-900 flex items-center justify-center text-eco-green">Loading visualizer...</div>}>
          <div className="snap-start"><ResultsSection product={activeProduct} /></div>
          <div className="snap-start"><GraphSection product={activeProduct} /></div>
          <div className="snap-start"><MapSection product={activeProduct} /></div>
          <div className="snap-start"><ImpactSection /></div>
        </Suspense>
      )}
      
      {/* Scroll Progress Indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
         {[0,1,2,3,4,5,6].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-forest-border/50 transition-all"></div>
         ))}
      </div>
      
    </main>
  );
}

export default App;
