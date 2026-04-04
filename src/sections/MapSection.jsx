import { motion } from 'framer-motion';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapSection({ product }) {
  if (!product) return null;

  const geoJsonKey = product.ecosystem.id;
  const geoJsonData = product.ecosystem.geojson_region;
  
  const coords = geoJsonData.coordinates[0];
  const avgLat = coords.reduce((sum, p) => sum + p[1], 0) / coords.length;
  const avgLng = coords.reduce((sum, p) => sum + p[0], 0) / coords.length;
  const center = [avgLat, avgLng];

  const geoJsonStyle = {
    color: '#34d974',
    weight: 2,
    opacity: 0.8,
    fillColor: '#84cc16',
    fillOpacity: 0.2,
    className: 'animate-pulse'
  };

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center py-24 px-6 bg-forest-900 section-snap">
      <div className="max-w-6xl w-full h-[70vh] flex flex-col md:flex-row gap-12 items-stretch">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Where It Comes From
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            The {product.ecosystem.name} in {product.ecosystem.country} is the origin point. Protecting this region protects the entire supply chain.
          </p>
          <div className="glass-card p-6 border-l-4 border-l-eco-green">
            <h4 className="font-serif font-bold text-white text-2xl mb-2">{product.ecosystem.region}</h4>
            <p className="text-sm text-text-secondary font-mono">
              Coords: {Math.abs(avgLat).toFixed(2)}{avgLat >= 0 ? '°N' : '°S'}, {Math.abs(avgLng).toFixed(2)}{avgLng >= 0 ? '°E' : '°W'}
            </p>
            <p className="text-sm mt-4 text-amber font-bold">Threat Level: {product.ecosystem.threat_level}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-2/3 rounded-2xl overflow-hidden glass-card p-2 shadow-2xl"
        >
          <div className="w-full h-full rounded-xl overflow-hidden bg-forest-800">
             <MapContainer key={product.id} center={center} zoom={4} scrollWheelZoom={false} className="w-full h-full z-0 leaflet-container">
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <GeoJSON key={geoJsonKey} data={geoJsonData} style={geoJsonStyle}>
                  <Tooltip sticky className="bg-forest-900 text-white border-forest-border font-serif text-lg p-2 rounded">
                    {product.ecosystem.name}, {product.ecosystem.country}
                  </Tooltip>
                </GeoJSON>
              </MapContainer>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
