import type { SolarPanel, Inverter } from '../types';

// ============================================
// Solar Equipment Catalog — Argentina Market
// Prices in USD (landed Argentina, including import + logistics)
// Source: Soluciones Renovables, SolarPool, Energia Verde (Q1 2025)
// Panel import duty: 0% (Decreto 864/18)
// Inverter import duty: 14%
// IVA: 21% (NOT included in prices below — added at proposal level)
// ============================================

export const solarPanels: SolarPanel[] = [
  // === ECONOMY TIER ===
  {
    id: 'amerisolar-410',
    brand: 'Amerisolar',
    model: 'AS-7M144-HC 410W',
    wattage: 410,
    efficiency: 21.0,
    dimensions: { width: 1.038, height: 1.909 },
    warranty: { product: 12, performance: 25 },
    tier: 'economy',
    priceUsd: 175, // ~$0.43/W (Soluciones Renovables)
  },
  {
    id: 'luxen-550',
    brand: 'Luxen',
    model: 'LNVU-550M Mono',
    wattage: 550,
    efficiency: 21.3,
    dimensions: { width: 1.134, height: 2.278 },
    warranty: { product: 12, performance: 25 },
    tier: 'economy',
    priceUsd: 229, // ~$0.42/W (Soluciones Renovables)
  },
  // === STANDARD TIER ===
  {
    id: 'longi-505',
    brand: 'LONGi',
    model: 'Hi-MO 5m LR5-66HPH-505M',
    wattage: 505,
    efficiency: 21.7,
    dimensions: { width: 1.134, height: 2.094 },
    warranty: { product: 15, performance: 25 },
    tier: 'standard',
    priceUsd: 218, // ~$0.43/W (Soluciones Renovables)
  },
  {
    id: 'trina-550',
    brand: 'Trina Solar',
    model: 'Vertex S+ TSM-NEG9R.28',
    wattage: 550,
    efficiency: 21.8,
    dimensions: { width: 1.134, height: 2.278 },
    warranty: { product: 15, performance: 25 },
    tier: 'standard',
    priceUsd: 240, // ~$0.44/W
  },
  {
    id: 'canadian-550',
    brand: 'Canadian Solar',
    model: 'HiKu7 CS7N-550MS',
    wattage: 550,
    efficiency: 21.6,
    dimensions: { width: 1.134, height: 2.278 },
    warranty: { product: 15, performance: 25 },
    tier: 'standard',
    priceUsd: 235, // ~$0.43/W
  },
  // === PREMIUM TIER ===
  {
    id: 'longi-580',
    brand: 'LONGi',
    model: 'Hi-MO 6m LR5-72HTH-580M',
    wattage: 580,
    efficiency: 22.3,
    dimensions: { width: 1.134, height: 2.278 },
    warranty: { product: 15, performance: 30 },
    tier: 'premium',
    priceUsd: 253, // ~$0.44/W (Soluciones Renovables)
  },
  {
    id: 'jinko-555',
    brand: 'JinkoSolar',
    model: 'Tiger Neo N-type JKM555N',
    wattage: 555,
    efficiency: 22.07,
    dimensions: { width: 1.134, height: 2.278 },
    warranty: { product: 15, performance: 30 },
    tier: 'premium',
    priceUsd: 260, // ~$0.47/W
  },
];

export const inverters: Inverter[] = [
  // === ECONOMY — Growatt (on-grid string) ===
  // Source: Soluciones Renovables, adjusted for on-grid (cheaper than hybrid)
  {
    id: 'growatt-3k',
    brand: 'Growatt',
    model: 'MIN 3000TL-X',
    powerKw: 3,
    type: 'string',
    phases: 1,
    warranty: 10,
    tier: 'economy',
    priceUsd: 580,
  },
  {
    id: 'growatt-5k',
    brand: 'Growatt',
    model: 'MIN 5000TL-X',
    powerKw: 5,
    type: 'string',
    phases: 1,
    warranty: 10,
    tier: 'economy',
    priceUsd: 750,
  },
  {
    id: 'growatt-8k',
    brand: 'Growatt',
    model: 'MOD 8000TL3-X',
    powerKw: 8,
    type: 'string',
    phases: 3,
    warranty: 10,
    tier: 'economy',
    priceUsd: 1100,
  },
  {
    id: 'growatt-10k',
    brand: 'Growatt',
    model: 'MOD 10000TL3-X',
    powerKw: 10,
    type: 'string',
    phases: 3,
    warranty: 10,
    tier: 'economy',
    priceUsd: 1350,
  },
  // === STANDARD — Solis / GoodWe ===
  {
    id: 'solis-5k',
    brand: 'Solis',
    model: 'S6-GR1P5K',
    powerKw: 5,
    type: 'string',
    phases: 1,
    warranty: 12,
    tier: 'standard',
    priceUsd: 850,
  },
  {
    id: 'goodwe-8k',
    brand: 'GoodWe',
    model: 'GW8K-DT',
    powerKw: 8,
    type: 'string',
    phases: 3,
    warranty: 10,
    tier: 'standard',
    priceUsd: 1200,
  },
  {
    id: 'goodwe-15k',
    brand: 'GoodWe',
    model: 'GW15KT-DT',
    powerKw: 15,
    type: 'string',
    phases: 3,
    warranty: 10,
    tier: 'standard',
    priceUsd: 1950,
  },
  {
    id: 'solis-25k',
    brand: 'Solis',
    model: 'S5-GR3P25K',
    powerKw: 25,
    type: 'string',
    phases: 3,
    warranty: 12,
    tier: 'standard',
    priceUsd: 2800,
  },
  // === PREMIUM — Fronius / Huawei ===
  // Source: Soluciones Renovables (Huawei 10kW hybrid = $3,780)
  {
    id: 'fronius-5k',
    brand: 'Fronius',
    model: 'Primo GEN24 5.0',
    powerKw: 5,
    type: 'string',
    phases: 1,
    warranty: 10,
    tier: 'premium',
    priceUsd: 1450,
  },
  {
    id: 'fronius-8k',
    brand: 'Fronius',
    model: 'Symo GEN24 8.0 Plus',
    powerKw: 8,
    type: 'hybrid',
    phases: 3,
    warranty: 10,
    tier: 'premium',
    priceUsd: 2400,
  },
  {
    id: 'huawei-5k',
    brand: 'Huawei',
    model: 'SUN2000-5KTL-L1',
    powerKw: 5,
    type: 'string',
    phases: 1,
    warranty: 10,
    tier: 'premium',
    priceUsd: 1200,
  },
  {
    id: 'huawei-10k',
    brand: 'Huawei',
    model: 'SUN2000-10KTL-M1',
    powerKw: 10,
    type: 'string',
    phases: 3,
    warranty: 10,
    tier: 'premium',
    priceUsd: 1900,
  },
  {
    id: 'huawei-30k',
    brand: 'Huawei',
    model: 'SUN2000-30KTL-M3',
    powerKw: 30,
    type: 'string',
    phases: 3,
    warranty: 10,
    tier: 'premium',
    priceUsd: 3200,
  },
];

// === Installation cost multipliers (USD per kWp) ===
// Target all-in cost: Economy ~$1,400/kWp, Standard ~$1,500/kWp, Premium ~$1,750/kWp
// Source: Market research Q1 2025 — Argentina BOS costs are high (small market, imports)
export const installationCosts = {
  economy: {
    mountingPerKwp: 80,
    cablingPerKwp: 40,
    protectionsPerKwp: 50,
    laborPerKwp: 250,
    designPerKwp: 30,
    permitsFlat: 300,
  },
  standard: {
    mountingPerKwp: 100,
    cablingPerKwp: 50,
    protectionsPerKwp: 60,
    laborPerKwp: 300,
    designPerKwp: 40,
    permitsFlat: 350,
  },
  premium: {
    mountingPerKwp: 130,
    cablingPerKwp: 60,
    protectionsPerKwp: 75,
    laborPerKwp: 380,
    designPerKwp: 55,
    permitsFlat: 450,
  },
};

// === Helper functions ===
export const getPanelsForTier = (tier: SolarPanel['tier']): SolarPanel[] =>
  solarPanels.filter((p) => p.tier === tier);

export const getInvertersForTier = (tier: Inverter['tier']): Inverter[] =>
  inverters.filter((i) => i.tier === tier);

export const getRecommendedPanel = (tier: SolarPanel['tier']): SolarPanel => {
  const panels = getPanelsForTier(tier);
  // Pick the one with best efficiency
  return panels.reduce((best, p) => (p.efficiency > best.efficiency ? p : best), panels[0]);
};

export const getRecommendedInverter = (
  tier: Inverter['tier'],
  systemSizeKwp: number
): Inverter => {
  const tierInverters = getInvertersForTier(tier);
  // Find the smallest inverter that can handle the system size
  const suitable = tierInverters
    .filter((inv) => inv.powerKw >= systemSizeKwp * 0.85)
    .sort((a, b) => a.powerKw - b.powerKw);

  if (suitable.length > 0) return suitable[0];

  // If no single inverter fits, return the largest available
  return tierInverters.reduce((best, inv) =>
    inv.powerKw > best.powerKw ? inv : best,
    tierInverters[0]
  );
};
