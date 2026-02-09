// ============================================
// Solari Argentina — Solar Proposal Types
// ============================================

export interface Province {
  id: string;
  name: string;
  region: 'norte' | 'centro' | 'cuyo' | 'patagonia' | 'litoral' | 'buenos_aires';
  solarIrradiation: number; // kWh/m²/day (peak sun hours)
  annualIrradiation: number; // kWh/m²/year
  utility: string;
  hasNetMetering: boolean;
  netMeteringType: 'net_metering' | 'net_billing' | 'pending';
  residentialTariff: TariffStructure;
  commercialTariff: TariffStructure;
  avgTemperature: number; // °C annual average
  temperatureCoefficient: number; // performance loss per °C above 25°C
}

export interface TariffStructure {
  fixedCharge: number; // ARS/month
  energyCharge: number; // ARS/kWh (average across tiers)
  tiers?: TariffTier[];
  taxRate: number; // percentage (IVA + municipal)
  subsidyLevel: 'N1' | 'N2' | 'N3'; // N1=full subsidy, N3=no subsidy
}

export interface TariffTier {
  name: string;
  upToKwh: number;
  pricePerKwh: number; // ARS
}

export interface SolarPanel {
  id: string;
  brand: string;
  model: string;
  wattage: number; // Wp
  efficiency: number; // percentage
  dimensions: { width: number; height: number }; // meters
  warranty: { product: number; performance: number }; // years
  tier: 'economy' | 'standard' | 'premium';
  priceUsd: number; // per panel
}

export interface Inverter {
  id: string;
  brand: string;
  model: string;
  powerKw: number;
  type: 'string' | 'micro' | 'hybrid';
  phases: 1 | 3;
  warranty: number; // years
  tier: 'economy' | 'standard' | 'premium';
  priceUsd: number;
}

export interface SystemConfiguration {
  panels: SolarPanel;
  panelCount: number;
  inverter: Inverter;
  inverterCount: number;
  systemSizeKwp: number;
  roofAreaM2: number;
  mountingType: 'flush' | 'tilted' | 'ballasted';
  cabling: number; // meters estimated
  protections: string[]; // surge protector, disconnect, etc.
}

export interface CustomerInput {
  // Location
  province: string;
  city: string;

  // Consumption
  monthlyBillArs: number;
  monthlyConsumptionKwh?: number; // auto-calculated if not provided

  // Property
  systemType: 'residential' | 'commercial';
  roofType: 'tile' | 'metal' | 'concrete' | 'flat';
  roofOrientation: 'north' | 'northeast' | 'northwest' | 'east' | 'west'; // In southern hemisphere, north = best
  availableRoofAreaM2?: number;

  // Customer info
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;

  // Preferences
  budgetTier: 'economy' | 'standard' | 'premium';
  financingPreference: 'cash' | 'financing' | 'undecided';
}

export interface EnergyProduction {
  monthlyProductionKwh: number[];  // 12 months
  annualProductionKwh: number;
  coveragePercentage: number; // % of consumption covered
  specificYield: number; // kWh/kWp/year
  performanceRatio: number; // 0.75-0.85 typically
  degradationRate: number; // % per year (0.5-0.7%)
}

export interface FinancialAnalysis {
  // Costs
  systemCostUsd: number;
  systemCostArs: number;
  installationCostUsd: number;
  permitsCostUsd: number;
  totalInvestmentUsd: number;
  totalInvestmentArs: number;

  // Cost breakdown
  costBreakdown: {
    panels: number;
    inverter: number;
    mounting: number;
    cabling: number;
    protections: number;
    installation: number;
    permits: number;
    design: number;
  };

  // Savings
  monthlySavingsArs: number;
  annualSavingsArs: number;
  annualSavingsUsd: number;

  // Returns
  paybackYears: number;
  roi25Years: number; // percentage
  irr: number; // percentage
  npv: number; // USD at 10% discount rate
  lcoe: number; // USD/kWh (levelized cost of energy)

  // 25-year projection
  yearlyProjection: YearProjection[];
}

export interface YearProjection {
  year: number;
  production: number; // kWh (with degradation)
  savings: number; // USD
  cumulativeSavings: number; // USD
  netPosition: number; // cumulative savings - investment
  tariffRate: number; // estimated tariff (with annual increase)
}

export interface EnvironmentalImpact {
  annualCo2AvoidedKg: number;
  lifetime25YearsCo2Kg: number;
  treesEquivalent: number;
  carsOffRoad: number;
  homesEquivalent: number;
}

export interface Proposal {
  id: string;
  createdAt: string;
  customerInput: CustomerInput;
  province: Province;
  system: SystemConfiguration;
  production: EnergyProduction;
  financial: FinancialAnalysis;
  environmental: EnvironmentalImpact;
  exchangeRate: number; // ARS per USD
  validUntil: string; // 30 days
}

export type Step = 'location' | 'consumption' | 'property' | 'preferences' | 'loading' | 'proposal';

// Smart Proposal types
export type SmartStep = 'upload' | 'location' | 'loading' | 'proposal';

export interface BillExtractionResult {
  customerName: string;
  address: string;
  utility: string;
  monthlyKwh: number;
  monthlyBillArs: number;
  province: string; // province ID
  confidence: number; // 0-1
  rawText?: string;
}

export interface SmartProposal extends Proposal {
  billImage?: string; // base64
  coordinates?: { lat: number; lng: number };
  aiNarrative?: string;
  extractedBill?: BillExtractionResult;
}
