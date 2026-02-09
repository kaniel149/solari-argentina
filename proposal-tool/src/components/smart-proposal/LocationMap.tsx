import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Compass, ArrowLeft, Zap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { detectProvinceFromCoords, getProvinceCenter } from '../../data/provinceBounds';
import { provinces } from '../../data/provinces';

interface LocationMapProps {
  initialProvince?: string;
  onSubmit: (data: {
    lat: number;
    lng: number;
    province: string;
    roofType: 'tile' | 'metal' | 'concrete' | 'flat';
    orientation: 'north' | 'northeast' | 'northwest' | 'east' | 'west';
    budgetTier: 'economy' | 'standard' | 'premium';
  }) => void;
  onBack: () => void;
}

const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="width:32px;height:32px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:50%;border:3px solid white;box-shadow:0 2px 10px rgba(245,158,11,0.5);display:flex;align-items:center;justify-content:center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

type RoofType = 'tile' | 'metal' | 'concrete' | 'flat';
type Orientation = 'north' | 'northeast' | 'northwest' | 'east' | 'west';
type BudgetTier = 'economy' | 'standard' | 'premium';

const roofOptions: { value: RoofType; emoji: string; label: string }[] = [
  { value: 'tile', emoji: '🏠', label: 'Teja' },
  { value: 'metal', emoji: '🏭', label: 'Chapa' },
  { value: 'concrete', emoji: '🏗️', label: 'Hormigon' },
  { value: 'flat', emoji: '⬜', label: 'Plano' },
];

const orientationOptions: { value: Orientation; label: string; badge?: string }[] = [
  { value: 'north', label: 'Norte (N)', badge: 'Optimo' },
  { value: 'northeast', label: 'Noreste (NE)' },
  { value: 'northwest', label: 'Noroeste (NO)' },
  { value: 'east', label: 'Este (E)' },
  { value: 'west', label: 'Oeste (O)' },
];

const budgetOptions: { value: BudgetTier; emoji: string; label: string; range: string; badge?: string }[] = [
  { value: 'economy', emoji: '💰', label: 'Economico', range: 'US$ 1,400-1,550/kWp' },
  { value: 'standard', emoji: '⚖️', label: 'Estandar', range: 'US$ 1,550-1,700/kWp', badge: 'Recomendado' },
  { value: 'premium', emoji: '✨', label: 'Premium', range: 'US$ 1,700-1,900/kWp' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapCenterUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [map, center, zoom]);
  return null;
}

export function LocationMap({ initialProvince, onSubmit, onBack }: LocationMapProps) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedProvince, setDetectedProvince] = useState<string | null>(null);
  const [roofType, setRoofType] = useState<RoofType>('concrete');
  const [orientation, setOrientation] = useState<Orientation>('north');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('standard');

  const defaultCenter: [number, number] = [-38.4, -63.6];
  const defaultZoom = 4;

  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);

  useEffect(() => {
    if (initialProvince) {
      const center = getProvinceCenter(initialProvince);
      if (center) {
        setMapCenter([center.lat, center.lng]);
        setMapZoom(8);
      }
    }
  }, [initialProvince]);

  const handleMapClick = useCallback((lat: number, lng: number) => {
    setMarker({ lat, lng });
    const province = detectProvinceFromCoords(lat, lng);
    setDetectedProvince(province);
  }, []);

  const provinceName = detectedProvince
    ? provinces.find((p) => p.id === detectedProvince)?.name ?? detectedProvince
    : null;

  const canSubmit = marker !== null && detectedProvince !== null;

  const handleSubmit = () => {
    if (!marker || !detectedProvince) return;
    onSubmit({
      lat: marker.lat,
      lng: marker.lng,
      province: detectedProvince,
      roofType,
      orientation,
      budgetTier,
    });
  };

  return (
    <div className="space-y-6">
      {/* Map Section */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <GlassCard variant="default">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Ubicacion de la Propiedad</h3>
              <p className="text-sm text-dark-400">Haga clic en el mapa para marcar la ubicacion</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px]">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              className="w-full h-full"
              zoomControl={true}
              attributionControl={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <MapClickHandler onMapClick={handleMapClick} />
              <MapCenterUpdater center={mapCenter} zoom={mapZoom} />
              {marker && (
                <Marker position={[marker.lat, marker.lng]} icon={customIcon} />
              )}
            </MapContainer>
          </div>

          {/* Detected Province Badge */}
          <div className="mt-4 flex items-center gap-3">
            {marker ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark-400">
                  Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}
                </span>
                {provinceName ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {provinceName}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    Fuera de cobertura
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-dark-500 italic">
                Haga clic en el mapa para seleccionar ubicacion
              </span>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* Roof Type */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <GlassCard variant="default">
          <h3 className="text-base font-semibold text-white mb-3">Tipo de Techo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {roofOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRoofType(opt.value)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 cursor-pointer
                  ${roofType === opt.value
                    ? 'border-solar-500 bg-solar-500/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-dark-400 hover:border-white/20 hover:text-dark-300'
                  }
                `}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Orientation */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <GlassCard variant="default">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="w-5 h-5 text-solar-400" />
            <h3 className="text-base font-semibold text-white">Orientacion del Techo</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {orientationOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setOrientation(opt.value)}
                className={`
                  relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer
                  ${orientation === opt.value
                    ? 'border-solar-500 bg-solar-500/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-dark-400 hover:border-white/20 hover:text-dark-300'
                  }
                `}
              >
                {opt.badge && (
                  <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                    {opt.badge}
                  </span>
                )}
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-dark-500">
            En el hemisferio sur, la orientacion norte recibe la mayor radiacion solar.
          </p>
        </GlassCard>
      </motion.div>

      {/* Budget Tier */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <GlassCard variant="default">
          <h3 className="text-base font-semibold text-white mb-3">Nivel de Equipamiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBudgetTier(opt.value)}
                className={`
                  relative flex flex-col items-center gap-2 p-5 rounded-xl border transition-all duration-200 cursor-pointer
                  ${budgetTier === opt.value
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-dark-400 hover:border-white/20 hover:text-dark-300'
                  }
                `}
              >
                {opt.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold whitespace-nowrap">
                    {opt.badge}
                  </span>
                )}
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-sm font-semibold">{opt.label}</span>
                <span className="text-xs text-dark-500">{opt.range}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Button
          variant="ghost"
          size="lg"
          icon={<ArrowLeft className="w-5 h-5" />}
          onClick={onBack}
        >
          Volver
        </Button>
        <Button
          variant="amber"
          size="lg"
          fullWidth
          icon={<Zap className="w-5 h-5" />}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Generar Propuesta Premium
        </Button>
      </motion.div>
    </div>
  );
}
