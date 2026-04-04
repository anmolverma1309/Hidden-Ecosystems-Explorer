import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function StatCounter({ value, label }) {
  const parsed = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');
  
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      if (parsed === 0) { 
        setCount(0); 
        return; 
      }
      let start = 0;
      const duration = 2000;
      const stepTime = 16; // ~60fps
      
      const timer = setInterval(() => {
        start += parsed / (duration / stepTime);
        if (start >= parsed) {
          setCount(parsed);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, parsed]);

  // Format to remove decimals if doing fast counting of integers
  const displayCount = parsed >= 10 ? Math.floor(count) : count.toFixed(1);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6">
      <div className="text-5xl sm:text-7xl font-bold font-serif text-eco-green mb-4 drop-shadow-[0_0_15px_rgba(52,217,116,0.3)]">
        {displayCount}{suffix}
      </div>
      <div className="text-lg text-text-secondary max-w-[200px] leading-snug font-medium">
        {label}
      </div>
    </div>
  );
}
