// ============================================
// Utility Company → Province ID Mapping
// Maps utility names (including common variations) to province IDs
// ============================================

const utilityMap: Record<string, string> = {
  // Buenos Aires & AMBA
  'edenor': 'caba',
  'edesur': 'caba',
  'eden': 'buenosaires',
  'edes': 'buenosaires',
  'edea': 'buenosaires',

  // Centro
  'epec': 'cordoba',

  // Litoral
  'epe': 'santafe',
  'epe santa fe': 'santafe',
  'enersa': 'entrerios',
  'emsa': 'misiones',
  'dpec': 'corrientes',

  // Cuyo
  'edemsa': 'mendoza',
  'energia san juan': 'sanjuan',
  'energía san juan': 'sanjuan',
  'edesal': 'sanluis',

  // Norte
  'edesa': 'salta',
  'ejsed': 'jujuy',
  'edet': 'tucuman',
  'ec sapem': 'catamarca',

  // Patagonia
  'epen': 'neuquen',
  'edersa': 'rionegro',
  'servicios publicos se': 'chubut',
  'servicios públicos se': 'chubut',
};

/**
 * Detect province ID from utility company name (fuzzy match).
 * Returns province ID or null if not found.
 */
export function detectProvinceFromUtility(utilityName: string): string | null {
  if (!utilityName) return null;

  const normalized = utilityName.toLowerCase().trim();

  // Direct match
  if (utilityMap[normalized]) return utilityMap[normalized];

  // Partial match — check if input contains any known utility name
  for (const [key, provinceId] of Object.entries(utilityMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return provinceId;
    }
  }

  return null;
}

/**
 * Get all known utility names for reference
 */
export function getUtilityNames(): string[] {
  return Object.keys(utilityMap).map((k) => k.toUpperCase());
}
