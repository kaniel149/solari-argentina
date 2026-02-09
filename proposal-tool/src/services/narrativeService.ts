import type { Proposal } from '../types';
import { generateFallbackNarrative } from '../data/narrativeTemplates';

/**
 * Generate an AI-powered executive narrative in Spanish.
 * Falls back to template-based narrative if API is unavailable.
 */
export async function generateNarrative(proposal: Proposal): Promise<string> {
  try {
    const response = await fetch('/api/generate-narrative', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: proposal.customerInput.customerName,
        province: proposal.province.name,
        systemSize: proposal.system.systemSizeKwp,
        panelCount: proposal.system.panelCount,
        annualProduction: proposal.production.annualProductionKwh,
        annualSavings: proposal.financial.annualSavingsUsd,
        paybackYears: proposal.financial.paybackYears,
        irr: proposal.financial.irr,
        co2Avoided: proposal.environmental.annualCo2AvoidedKg,
        coverage: proposal.production.coveragePercentage,
      }),
    });

    if (!response.ok) {
      console.warn('Narrative API returned', response.status);
      return generateFallbackNarrative(proposal);
    }

    const data = await response.json();
    return data.narrative || generateFallbackNarrative(proposal);
  } catch (error) {
    console.warn('Narrative generation failed, using fallback:', error);
    return generateFallbackNarrative(proposal);
  }
}
