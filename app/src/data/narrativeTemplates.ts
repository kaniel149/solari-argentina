import type { Proposal } from '../types';
import { formatNumber, formatUsd } from '../utils/calculations';

/**
 * Generate a fallback Spanish narrative for the proposal
 * when no AI API key is available.
 * Personalized with customer data and province info.
 */
export function generateFallbackNarrative(proposal: Proposal): string {
  const { customerInput, province, system, production, financial, environmental } = proposal;
  const name = customerInput.customerName || 'Estimado cliente';
  const monthlySavingsArs = Math.round(financial.annualSavingsArs / 12);

  const paragraph1 = `${name}, hemos diseñado esta propuesta solar personalizada para su propiedad en ${province.name}. Con una radiación solar promedio de ${province.solarIrradiation} kWh/m²/día, su ubicación es ideal para la generación de energía solar fotovoltaica. El sistema propuesto de ${system.systemSizeKwp} kWp, compuesto por ${system.panelCount} paneles ${system.panels.brand} de ${system.panels.wattage}Wp, generará ${formatNumber(production.annualProductionKwh)} kWh de energía limpia por año, cubriendo el ${production.coveragePercentage}% de su consumo eléctrico actual.`;

  const paragraph2 = `Desde el punto de vista financiero, su inversión de ${formatUsd(financial.totalInvestmentUsd)} se recuperará en tan solo ${financial.paybackYears} años, con una tasa interna de retorno (TIR) del ${financial.irr}%. A lo largo de los 25 años de vida útil del sistema, usted ahorrará un total estimado de ${formatUsd(financial.yearlyProjection[24]?.cumulativeSavings || 0)}, lo que representa un retorno del ${financial.roi25Years}% sobre su inversión inicial. Su factura eléctrica mensual se reducirá en aproximadamente ${formatNumber(monthlySavingsArs)} pesos argentinos.`;

  const paragraph3 = `Además del beneficio económico, su sistema solar evitará la emisión de ${formatNumber(environmental.annualCo2AvoidedKg)} kg de CO₂ por año — equivalente a plantar ${environmental.treesEquivalent} árboles. En el contexto actual de Argentina, con tarifas eléctricas en constante aumento y el respaldo de la Ley 27.424 de Generación Distribuida, invertir en energía solar es una decisión inteligente tanto para su economía como para el medio ambiente.`;

  return `${paragraph1}\n\n${paragraph2}\n\n${paragraph3}`;
}
