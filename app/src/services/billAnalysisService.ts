import type { BillExtractionResult } from '../types';
import { detectProvinceFromUtility } from '../data/utilityMapping';

export interface BillAnalysisResponse {
  data: BillExtractionResult | null;
  error: string | null;
}

/**
 * Send bill image to AI for analysis.
 * Returns { data, error } — data is extracted bill info, error is user-friendly message.
 */
export async function analyzeBill(
  imageBase64: string,
  signal?: AbortSignal,
  mediaType?: string
): Promise<BillAnalysisResponse> {
  try {
    const response = await fetch('/api/analyze-bill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64, mediaType: mediaType || 'image/jpeg' }),
      signal,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const code = body.code || 'UNKNOWN';
      const messages: Record<string, string> = {
        MISSING_API_KEY: 'El servicio de análisis no está configurado.',
        INVALID_IMAGE: body.error || 'Imagen no válida.',
        PARSE_ERROR: 'No se pudo interpretar la factura. Ingrese los datos manualmente.',
        VALIDATION_ERROR: 'No se encontró consumo válido en la factura.',
        TIMEOUT: 'El análisis tardó demasiado. Intente de nuevo.',
      };
      return { data: null, error: messages[code] || 'Error al analizar la factura.' };
    }

    const data = await response.json();

    // Auto-detect province from utility name if not already set
    if (data.utility && !data.province) {
      const detectedProvince = detectProvinceFromUtility(data.utility);
      if (detectedProvince) {
        data.province = detectedProvince;
      }
    }

    const result: BillExtractionResult = {
      customerName: data.customerName || '',
      address: data.address || '',
      utility: data.utility || '',
      monthlyKwh: Number(data.monthlyKwh) || 0,
      monthlyBillArs: Number(data.monthlyBillArs) || 0,
      province: data.province || '',
      confidence: Number(data.confidence) || 0.5,
      rawText: data.rawText,
    };

    return { data: result, error: null };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { data: null, error: 'Análisis cancelado.' };
    }
    console.warn('Bill analysis failed:', error);
    return { data: null, error: 'No se pudo conectar al servicio de análisis.' };
  }
}
