import type { BillExtractionResult } from '../types';
import { detectProvinceFromUtility } from '../data/utilityMapping';

/**
 * Send bill image to AI for analysis.
 * Returns extracted data or null if API unavailable.
 */
export async function analyzeBill(imageBase64: string): Promise<BillExtractionResult | null> {
  try {
    const response = await fetch('/api/analyze-bill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64 }),
    });

    if (!response.ok) {
      console.warn('Bill analysis API returned', response.status);
      return null;
    }

    const data = await response.json();

    // Auto-detect province from utility name if not already set
    if (data.utility && !data.province) {
      const detectedProvince = detectProvinceFromUtility(data.utility);
      if (detectedProvince) {
        data.province = detectedProvince;
      }
    }

    return {
      customerName: data.customerName || '',
      address: data.address || '',
      utility: data.utility || '',
      monthlyKwh: Number(data.monthlyKwh) || 0,
      monthlyBillArs: Number(data.monthlyBillArs) || 0,
      province: data.province || '',
      confidence: Number(data.confidence) || 0.5,
      rawText: data.rawText,
    };
  } catch (error) {
    console.warn('Bill analysis failed:', error);
    return null;
  }
}
