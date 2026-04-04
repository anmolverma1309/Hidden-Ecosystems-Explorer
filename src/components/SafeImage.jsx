import { useState } from 'react';

export default function SafeImage({ src, alt, className, ...props }) {
  const [error, setError] = useState(false);

  if (!src) return <div className={`bg-forest-800 ${className}`} />;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-forest-800 text-eco-green/30 p-4 text-center">
          <span className="font-serif italic text-sm">{alt}</span>
        </div>
      )}
    </div>
  );
}
