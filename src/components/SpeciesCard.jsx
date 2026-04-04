import SafeImage from './SafeImage';

export default function SpeciesCard({ species }) {
  return (
    <div className="group relative w-64 h-80 flex-shrink-0 cursor-pointer snap-center rounded-xl overflow-hidden glass-card transition-transform hover:-translate-y-2">
      {/* Front */}
      <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 group-hover:pointer-events-none bg-forest-800 flex flex-col z-10">
        <div className="relative h-48 w-full overflow-hidden">
          <SafeImage 
            src={species.image_url} 
            alt={species.common_name} 
            className="w-full h-full transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-800 to-transparent opacity-80" />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-end -mt-10 relative z-10">
          <h3 className="font-serif text-xl font-bold text-text-primary leading-tight drop-shadow-md">{species.common_name}</h3>
          <div className="mt-3">
             <span className="inline-block px-2 py-1 text-xs rounded bg-forest-900 text-eco-green border border-forest-border shadow-sm">
               {species.threat_status}
             </span>
          </div>
        </div>
      </div>
      
      {/* Back */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-forest-700/90 p-6 flex flex-col justify-center text-center z-0 border border-eco-green/30">
        <p className="font-mono text-sm text-eco-green-lime mb-4 italic">{species.scientific_name}</p>
        <p className="text-sm text-text-secondary leading-relaxed">{species.role}</p>
      </div>
    </div>
  );
}
