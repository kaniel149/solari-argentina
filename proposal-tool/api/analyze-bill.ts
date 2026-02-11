import type { VercelRequest, VercelResponse } from '@vercel/node';

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
const VALID_PDF_TYPE = 'application/pdf';
const ALL_VALID_TYPES = [...VALID_IMAGE_TYPES, VALID_PDF_TYPE];
const MAX_BODY_SIZE = 6 * 1024 * 1024; // 6MB base64 (PDFs can be larger)

function parseJsonFromText(text: string): Record<string, unknown> | null {
  // 1. Try direct JSON.parse
  try {
    return JSON.parse(text);
  } catch { /* continue */ }

  // 2. Try markdown code block extraction
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch { /* continue */ }
  }

  // 3. Try regex extraction of JSON object
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch { /* continue */ }
  }

  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured', code: 'MISSING_API_KEY' });
  }

  const { image, mediaType } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided. Send { image: "base64string" }', code: 'INVALID_IMAGE' });
  }

  // Validate request body size (base64 string length)
  if (typeof image !== 'string' || image.length > MAX_BODY_SIZE) {
    return res.status(400).json({ error: 'Image too large. Maximum 4MB base64 payload.', code: 'INVALID_IMAGE' });
  }

  // Validate media type if provided
  const resolvedMediaType = mediaType || 'image/jpeg';
  if (!ALL_VALID_TYPES.includes(resolvedMediaType)) {
    return res.status(400).json({
      error: `Invalid format. Supported: ${ALL_VALID_TYPES.join(', ')}`,
      code: 'INVALID_IMAGE',
    });
  }

  const isPdf = resolvedMediaType === VALID_PDF_TYPE;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    // Build content block — PDF uses "document" type, images use "image" type
    const fileContent = isPdf
      ? {
          type: 'document' as const,
          source: {
            type: 'base64' as const,
            media_type: 'application/pdf' as const,
            data: image,
          },
        }
      : {
          type: 'image' as const,
          source: {
            type: 'base64' as const,
            media_type: resolvedMediaType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
            data: image,
          },
        };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              fileContent,
              {
                type: 'text',
                text: `Analyze this Argentine electricity bill (factura de luz). Extract the following information and return ONLY valid JSON (no markdown, no explanation):

{
  "customerName": "full name of the account holder (titular)",
  "address": "full service address",
  "utility": "utility company name (e.g., EDENOR, EDESUR, EPEC, EDEMSA, etc.)",
  "monthlyKwh": estimated monthly kWh consumption (number, look for 'kWh' or 'Energía consumida'),
  "monthlyBillArs": total bill amount in ARS (number, look for 'Total' or 'Total a pagar'),
  "province": "province name (e.g., Buenos Aires, Córdoba, Mendoza)",
  "confidence": your confidence score from 0 to 1 (1 = very confident, 0.3 = uncertain)
}

Important:
- If the bill shows bimonthly data, divide by 2 for monthly values
- Look for "kWh" consumption data, not just the bill amount
- If you can't read some fields clearly, still provide your best estimate and lower the confidence
- The bill might be in Spanish`,
              },
            ],
          },
        ],
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(500).json({ error: 'AI analysis failed', code: 'PARSE_ERROR' });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    const result = parseJsonFromText(text);
    if (!result) {
      return res.status(500).json({ error: 'Could not parse AI response', code: 'PARSE_ERROR' });
    }

    // Validate extracted data
    const monthlyKwh = Number(result.monthlyKwh);
    if (!monthlyKwh || monthlyKwh <= 0) {
      return res.status(422).json({
        error: 'Could not extract valid kWh consumption from bill',
        code: 'VALIDATION_ERROR',
        partial: result,
      });
    }

    return res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Bill analysis timeout');
      return res.status(504).json({ error: 'Analysis timed out. Please try again.', code: 'TIMEOUT' });
    }
    console.error('Bill analysis error:', error);
    return res.status(500).json({ error: 'Analysis failed', code: 'PARSE_ERROR' });
  }
}
