import { useEffect, useRef, useId } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function BarcodeScanner({ onScan }) {
  const scannerRef = useRef(null);
  const readerId = "reader-" + useId().replace(/:/g, '');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(readerId, { fps: 10, qrbox: { width: 250, height: 250 } }, false);
    
    scanner.render((decodedText) => {
      onScan(decodedText);
    }, (error) => {});
    
    scannerRef.current = scanner;
    return () => {
      try {
        scanner.clear();
      } catch(e) {}
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-forest-border bg-forest-800 shadow-2xl relative">
      <div className="absolute inset-0 border-2 border-scan-cyan rounded-xl opacity-20 pointer-events-none z-10"></div>
      <div id={readerId} className="w-full text-text-primary [&_button]:bg-eco-green [&_button]:text-forest-900 [&_button]:px-4 [&_button]:py-2 [&_button]:rounded [&_button]:font-semibold [&_a]:hidden" />
    </div>
  );
}
