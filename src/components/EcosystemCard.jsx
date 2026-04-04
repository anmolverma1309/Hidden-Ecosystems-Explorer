import SafeImage from './SafeImage';

export default function EcosystemCard({ ecosystem }) {
  return (
    <div className="max-w-2xl w-full mx-auto glass-card overflow-hidden">
      <div className="relative h-64 sm:h-80 w-full group overflow-hidden">
        <SafeImage 
          src={ecosystem.image_url} 
          alt={ecosystem.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 drop-shadow-lg">{ecosystem.name}</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-4 py-1.5 bg-forest-900/80 backdrop-blur rounded-full text-text-secondary border border-forest-border shadow-sm">
              {ecosystem.region}, {ecosystem.country}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-white font-medium shadow-sm transition-colors ${
              ecosystem.threat_level === 'Endangered' ? 'bg-danger-red/90 hover:bg-danger-red' : 
              ecosystem.threat_level === 'Vulnerable' ? 'bg-amber/90 hover:bg-amber' : 'bg-eco-green/90 hover:bg-eco-green'
            } backdrop-blur`}>
              {ecosystem.threat_level}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
