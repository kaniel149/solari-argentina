// ============================================
// Argentina Province Bounding Boxes
// Used for auto-detecting province from map coordinates
// Approximate bounds based on official geographic data
// ============================================

export interface ProvinceBounds {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
}

export const provinceBounds: ProvinceBounds[] = [
  // Buenos Aires & AMBA
  {
    id: 'caba',
    name: 'Ciudad de Buenos Aires',
    center: { lat: -34.6037, lng: -58.3816 },
    bounds: { north: -34.53, south: -34.71, east: -58.33, west: -58.53 },
  },
  {
    id: 'buenosaires',
    name: 'Buenos Aires (Provincia)',
    center: { lat: -36.6769, lng: -59.6864 },
    bounds: { north: -33.26, south: -41.04, east: -56.66, west: -63.38 },
  },
  // Centro
  {
    id: 'cordoba',
    name: 'Córdoba',
    center: { lat: -31.4201, lng: -64.1888 },
    bounds: { north: -29.50, south: -35.01, east: -62.18, west: -65.77 },
  },
  // Litoral
  {
    id: 'santafe',
    name: 'Santa Fe',
    center: { lat: -31.6333, lng: -60.7000 },
    bounds: { north: -28.00, south: -34.33, east: -59.44, west: -62.89 },
  },
  {
    id: 'entrerios',
    name: 'Entre Ríos',
    center: { lat: -31.7413, lng: -59.6540 },
    bounds: { north: -30.16, south: -34.05, east: -57.80, west: -60.77 },
  },
  {
    id: 'misiones',
    name: 'Misiones',
    center: { lat: -27.3621, lng: -54.4310 },
    bounds: { north: -25.57, south: -28.17, east: -53.63, west: -55.93 },
  },
  {
    id: 'corrientes',
    name: 'Corrientes',
    center: { lat: -28.4696, lng: -57.8440 },
    bounds: { north: -27.26, south: -30.72, east: -55.62, west: -59.66 },
  },
  // Cuyo
  {
    id: 'mendoza',
    name: 'Mendoza',
    center: { lat: -34.6299, lng: -68.3300 },
    bounds: { north: -32.00, south: -37.57, east: -66.48, west: -70.59 },
  },
  {
    id: 'sanjuan',
    name: 'San Juan',
    center: { lat: -31.5375, lng: -68.5364 },
    bounds: { north: -28.42, south: -32.60, east: -66.80, west: -70.58 },
  },
  {
    id: 'sanluis',
    name: 'San Luis',
    center: { lat: -33.3017, lng: -66.3378 },
    bounds: { north: -31.79, south: -36.01, east: -64.64, west: -67.94 },
  },
  // Norte
  {
    id: 'salta',
    name: 'Salta',
    center: { lat: -24.7829, lng: -65.4232 },
    bounds: { north: -22.00, south: -26.38, east: -62.33, west: -68.56 },
  },
  {
    id: 'jujuy',
    name: 'Jujuy',
    center: { lat: -24.1858, lng: -65.2995 },
    bounds: { north: -21.78, south: -24.60, east: -64.20, west: -66.63 },
  },
  {
    id: 'tucuman',
    name: 'Tucumán',
    center: { lat: -26.8083, lng: -65.2176 },
    bounds: { north: -26.06, south: -28.00, east: -64.47, west: -66.17 },
  },
  {
    id: 'catamarca',
    name: 'Catamarca',
    center: { lat: -28.4696, lng: -65.7852 },
    bounds: { north: -25.07, south: -30.07, east: -64.76, west: -69.20 },
  },
  // Patagonia
  {
    id: 'neuquen',
    name: 'Neuquén',
    center: { lat: -38.9516, lng: -68.0591 },
    bounds: { north: -36.17, south: -41.07, east: -67.81, west: -71.96 },
  },
  {
    id: 'rionegro',
    name: 'Río Negro',
    center: { lat: -40.8135, lng: -66.9996 },
    bounds: { north: -38.00, south: -42.19, east: -62.80, west: -71.88 },
  },
  {
    id: 'chubut',
    name: 'Chubut',
    center: { lat: -43.3002, lng: -65.1023 },
    bounds: { north: -42.00, south: -46.00, east: -63.50, west: -72.17 },
  },
];

/**
 * Detect province ID from lat/lng coordinates.
 * Uses bounding box intersection, preferring smaller (more specific) provinces.
 * CABA is checked before Buenos Aires province since it's contained within it.
 */
export function detectProvinceFromCoords(lat: number, lng: number): string | null {
  // Check CABA first (small, contained within Buenos Aires province)
  const caba = provinceBounds.find((p) => p.id === 'caba');
  if (caba && isWithinBounds(lat, lng, caba.bounds)) {
    return 'caba';
  }

  // Check remaining provinces
  const matches = provinceBounds
    .filter((p) => p.id !== 'caba' && isWithinBounds(lat, lng, p.bounds))
    .sort((a, b) => {
      // Prefer smaller bounding box (more specific)
      const areaA = (a.bounds.north - a.bounds.south) * (a.bounds.east - a.bounds.west);
      const areaB = (b.bounds.north - b.bounds.south) * (b.bounds.east - b.bounds.west);
      return areaA - areaB;
    });

  return matches[0]?.id || null;
}

function isWithinBounds(
  lat: number,
  lng: number,
  bounds: { north: number; south: number; east: number; west: number }
): boolean {
  return (
    lat <= bounds.north &&
    lat >= bounds.south &&
    lng <= bounds.east &&
    lng >= bounds.west
  );
}

/**
 * Get the center coordinates for a province by ID
 */
export function getProvinceCenter(provinceId: string): { lat: number; lng: number } | null {
  const province = provinceBounds.find((p) => p.id === provinceId);
  return province?.center || null;
}
