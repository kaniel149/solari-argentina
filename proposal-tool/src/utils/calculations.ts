import type {
  Province,
  CustomerInput,
  SystemConfiguration,
  EnergyProduction,
  FinancialAnalysis,
  EnvironmentalImpact,
  YearProjection,
} from '../types';
import { getRecommendedPanel, getRecommendedInverter, installationCosts } from '../data/equipment';

// ============================================
// Solar System Design & Financial Calculator
// Argentina-specific calculations
// ============================================

const DEFAULT_EXCHANGE_RATE = 1440; // ARS per USD (blue/MEP rate Feb 2026)
const SYSTEM_DEGRADATION = 0.005; // 0.5% per year
const TARIFF_INCREASE_RATE = 0.08; // 8% annual USD-equivalent tariff increase
const DISCOUNT_RATE = 0.10; // 10% for NPV
const CO2_FACTOR = 0.44; // kg CO2 per kWh (Argentina grid factor)
const PERFORMANCE_RATIO = 0.80; // system losses (soiling, shading, wiring, etc.)

// Orientation factor: north=1.0 (best in southern hemisphere)
const orientationFactors: Record<string, number> = {
  north: 1.0,
  northeast: 0.95,
  northwest: 0.95,
  east: 0.85,
  west: 0.85,
};

// Monthly solar fraction (Southern hemisphere — more in summer Dec/Jan/Feb)
const monthlyFractions = [
  0.115, // Jan
  0.105, // Feb
  0.095, // Mar
  0.075, // Apr
  0.060, // May
  0.050, // Jun
  0.050, // Jul
  0.060, // Aug
  0.075, // Sep
  0.095, // Oct
  0.105, // Nov
  0.115, // Dec
];

export function getExchangeRate(): number {
  try {
    const stored = localStorage.getItem('solari_exchange_rate');
    if (stored) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch { /* localStorage unavailable */ }
  return DEFAULT_EXCHANGE_RATE;
}

/**
 * Estimate kWh consumption from monthly bill in ARS
 */
export function estimateConsumption(
  monthlyBillArs: number,
  province: Province,
  systemType: CustomerInput['systemType']
): number {
  const tariff = systemType === 'residential'
    ? province.residentialTariff
    : province.commercialTariff;

  const billAfterFixed = monthlyBillArs / (1 + tariff.taxRate) - tariff.fixedCharge;
  const estimatedKwh = Math.max(0, billAfterFixed / tariff.energyCharge);

  return Math.round(estimatedKwh);
}

/**
 * Design optimal system based on consumption
 */
export function designSystem(
  monthlyConsumptionKwh: number,
  province: Province,
  input: CustomerInput
): SystemConfiguration {
  const annualConsumption = monthlyConsumptionKwh * 12;
  const orientationFactor = orientationFactors[input.roofOrientation] || 0.9;

  // Calculate required system size
  // kWp = Annual_kWh / (Peak_Sun_Hours * 365 * Performance_Ratio * Orientation)
  const requiredKwp = annualConsumption /
    (province.solarIrradiation * 365 * PERFORMANCE_RATIO * orientationFactor);

  // Cap at 90% coverage for residential (grid dependency)
  const targetKwp = input.systemType === 'residential'
    ? Math.min(requiredKwp, requiredKwp * 0.95)
    : Math.min(requiredKwp, 500); // 500 kWp max for commercial DG

  // Select equipment
  const panel = getRecommendedPanel(input.budgetTier);
  const panelCount = Math.ceil((targetKwp * 1000) / panel.wattage);
  const actualKwp = (panelCount * panel.wattage) / 1000;

  const inverter = getRecommendedInverter(input.budgetTier, actualKwp);
  const inverterCount = Math.ceil(actualKwp / inverter.powerKw);

  // Calculate roof area needed
  const panelArea = panel.dimensions.width * panel.dimensions.height;
  const roofArea = panelArea * panelCount * 1.3; // 30% spacing factor

  return {
    panels: panel,
    panelCount,
    inverter,
    inverterCount,
    systemSizeKwp: Math.round(actualKwp * 100) / 100,
    roofAreaM2: Math.round(roofArea * 10) / 10,
    mountingType: input.roofType === 'flat' ? 'tilted' : 'flush',
    cabling: Math.round(panelCount * 3 + 20), // rough estimate
    protections: [
      'Protección contra sobretensión (SPD)',
      'Seccionador DC',
      'Interruptor automático AC',
      'Fusibles de string',
      'Puesta a tierra',
    ],
  };
}

/**
 * Calculate energy production
 */
export function calculateProduction(
  system: SystemConfiguration,
  province: Province,
  orientation: string,
  monthlyConsumptionKwh: number
): EnergyProduction {
  const orientationFactor = orientationFactors[orientation] || 0.9;

  // Annual production = kWp * PSH * 365 * PR * Orientation
  const annualProduction = system.systemSizeKwp *
    province.solarIrradiation * 365 * PERFORMANCE_RATIO * orientationFactor;

  // Monthly distribution
  const monthlyProduction = monthlyFractions.map(
    (fraction) => Math.round(annualProduction * fraction)
  );

  const coveragePercentage = Math.min(
    100,
    (annualProduction / (monthlyConsumptionKwh * 12)) * 100
  );

  const specificYield = annualProduction / system.systemSizeKwp;

  return {
    monthlyProductionKwh: monthlyProduction,
    annualProductionKwh: Math.round(annualProduction),
    coveragePercentage: Math.round(coveragePercentage * 10) / 10,
    specificYield: Math.round(specificYield),
    performanceRatio: PERFORMANCE_RATIO,
    degradationRate: SYSTEM_DEGRADATION * 100,
  };
}

/**
 * Full financial analysis
 */
export function calculateFinancials(
  system: SystemConfiguration,
  production: EnergyProduction,
  province: Province,
  input: CustomerInput
): FinancialAnalysis {
  const costs = installationCosts[input.budgetTier];
  const kwp = system.systemSizeKwp;

  // Cost breakdown in USD
  const panelsCost = system.panels.priceUsd * system.panelCount;
  const inverterCost = system.inverter.priceUsd * system.inverterCount;
  const mountingCost = costs.mountingPerKwp * kwp;
  const cablingCost = costs.cablingPerKwp * kwp;
  const protectionsCost = costs.protectionsPerKwp * kwp;
  const laborCost = costs.laborPerKwp * kwp;
  const designCost = costs.designPerKwp * kwp;
  const permitsCost = costs.permitsFlat;

  const totalCostUsd = panelsCost + inverterCost + mountingCost +
    cablingCost + protectionsCost + laborCost + designCost + permitsCost;

  // Current tariff per kWh in USD
  const tariff = input.systemType === 'residential'
    ? province.residentialTariff
    : province.commercialTariff;
  const currentTariffUsd = (tariff.energyCharge * (1 + tariff.taxRate)) / DEFAULT_EXCHANGE_RATE;

  // Annual savings year 1
  const annualSavingsUsd = production.annualProductionKwh * currentTariffUsd;
  const annualSavingsArs = annualSavingsUsd * DEFAULT_EXCHANGE_RATE;

  // 25-year projection
  const projection: YearProjection[] = [];
  let cumulativeSavings = 0;

  for (let year = 1; year <= 25; year++) {
    const degradedProduction = production.annualProductionKwh *
      Math.pow(1 - SYSTEM_DEGRADATION, year - 1);
    const escalatedTariff = currentTariffUsd *
      Math.pow(1 + TARIFF_INCREASE_RATE, year - 1);
    const yearlySavings = degradedProduction * escalatedTariff;
    cumulativeSavings += yearlySavings;

    projection.push({
      year,
      production: Math.round(degradedProduction),
      savings: Math.round(yearlySavings),
      cumulativeSavings: Math.round(cumulativeSavings),
      netPosition: Math.round(cumulativeSavings - totalCostUsd),
      tariffRate: Math.round(escalatedTariff * 10000) / 10000,
    });
  }

  // Payback period
  const paybackYear = projection.find((p) => p.netPosition >= 0);
  const paybackYears = paybackYear ? paybackYear.year : 25;

  // More precise payback calculation
  let precisePayback = paybackYears;
  if (paybackYear && paybackYears > 1) {
    const prevYear = projection[paybackYears - 2];
    const currentYear = projection[paybackYears - 1];
    const remainingAtPrevYear = totalCostUsd - (prevYear?.cumulativeSavings ?? 0);
    const yearSavings = currentYear.savings;
    precisePayback = (paybackYears - 1) + (remainingAtPrevYear / yearSavings);
  }

  // IRR calculation (Newton's method)
  const irr = calculateIRR(totalCostUsd, projection.map((p) => p.savings));

  // NPV at discount rate
  const npv = calculateNPV(totalCostUsd, projection.map((p) => p.savings), DISCOUNT_RATE);

  // LCOE
  const totalLifetimeProduction = projection.reduce((sum, p) => sum + p.production, 0);
  const lcoe = totalCostUsd / totalLifetimeProduction;

  return {
    systemCostUsd: Math.round(totalCostUsd),
    systemCostArs: Math.round(totalCostUsd * DEFAULT_EXCHANGE_RATE),
    installationCostUsd: Math.round(laborCost),
    permitsCostUsd: Math.round(permitsCost),
    totalInvestmentUsd: Math.round(totalCostUsd),
    totalInvestmentArs: Math.round(totalCostUsd * DEFAULT_EXCHANGE_RATE),
    costBreakdown: {
      panels: Math.round(panelsCost),
      inverter: Math.round(inverterCost),
      mounting: Math.round(mountingCost),
      cabling: Math.round(cablingCost),
      protections: Math.round(protectionsCost),
      installation: Math.round(laborCost),
      permits: Math.round(permitsCost),
      design: Math.round(designCost),
    },
    monthlySavingsArs: Math.round(annualSavingsArs / 12),
    annualSavingsArs: Math.round(annualSavingsArs),
    annualSavingsUsd: Math.round(annualSavingsUsd),
    paybackYears: Math.round(precisePayback * 10) / 10,
    roi25Years: Math.round(((cumulativeSavings - totalCostUsd) / totalCostUsd) * 100),
    irr: Math.round(irr * 100 * 10) / 10,
    npv: Math.round(npv),
    lcoe: Math.round(lcoe * 1000) / 1000,
    yearlyProjection: projection,
  };
}

/**
 * Environmental impact
 */
export function calculateEnvironmental(
  production: EnergyProduction
): EnvironmentalImpact {
  const annualCo2 = production.annualProductionKwh * CO2_FACTOR;
  const lifetime25 = annualCo2 * 25 * 0.94; // account for degradation

  return {
    annualCo2AvoidedKg: Math.round(annualCo2),
    lifetime25YearsCo2Kg: Math.round(lifetime25),
    treesEquivalent: Math.round(annualCo2 / 21), // ~21 kg CO2 per tree/year
    carsOffRoad: Math.round((annualCo2 / 4600) * 10) / 10, // ~4.6 tons CO2/car/year
    homesEquivalent: Math.round((production.annualProductionKwh / 3600) * 10) / 10, // avg Argentine home
  };
}

// === Internal helpers ===

function calculateIRR(investment: number, cashflows: number[]): number {
  let rate = 0.1;
  for (let i = 0; i < 100; i++) {
    let npv = -investment;
    let dnpv = 0;
    for (let t = 0; t < cashflows.length; t++) {
      const factor = Math.pow(1 + rate, t + 1);
      npv += cashflows[t] / factor;
      dnpv -= (t + 1) * cashflows[t] / (factor * (1 + rate));
    }
    if (Math.abs(npv) < 0.01) break;
    rate = rate - npv / dnpv;
    if (rate < -0.5 || rate > 2) rate = 0.1; // reset if diverges
  }
  return Math.max(0, rate);
}

function calculateNPV(
  investment: number,
  cashflows: number[],
  rate: number
): number {
  let npv = -investment;
  for (let t = 0; t < cashflows.length; t++) {
    npv += cashflows[t] / Math.pow(1 + rate, t + 1);
  }
  return npv;
}

/**
 * Format number with thousands separator
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('es-AR');
}

/**
 * Format USD amount
 */
export function formatUsd(n: number): string {
  return `US$ ${n.toLocaleString('en-US')}`;
}

/**
 * Format ARS amount
 */
export function formatArs(n: number): string {
  return `$ ${n.toLocaleString('es-AR')}`;
}
