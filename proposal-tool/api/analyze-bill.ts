import type { VercelRequest, VercelResponse } from '@vercel/node';
import pdf from 'pdf-parse';

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VALID_PDF_TYPE = 'application/pdf';
const ALL_VALID_TYPES = [...VALID_IMAGE_TYPES, VALID_PDF_TYPE];
const MAX_BODY_SIZE = 6 * 1024 * 1024; // 6MB base64

function parseJsonFromText(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text);
  } catch { /* continue */ }

  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch { /* continue */ }
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch { /* continue */ }
  }

  return null;
}

/**
 * Analyze a bill image using Groq vision model
 */
async function analyzeWithVision(apiKey: string, image: string, mediaType: string, signal: AbortSignal) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    signal,
    body: JSON.stringify({
      model: 'llama-3.2-90b-vision-preview',
      max_tokens: 1024,
      temperature: 0.1,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${mediaType};base64,${image}`,
              },
            },
            {
              type: 'text',
              text: EXTRACTION_PROMPT,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq vision API error:', response.status, errorText);
    return null;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Analyze a PDF bill by extracting text and using Groq text model
 */
async function analyzeWithText(apiKey: string, base64Pdf: string, signal: AbortSignal) {
  // Extract text from PDF
  const buffer = Buffer.from(base64Pdf, 'base64');
  const pdfData = await pdf(buffer);
  const extractedText = pdfData.text;

  if (!extractedText || extractedText.trim().length < 20) {
    return null; // PDF has no extractable text (scanned image)
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    signal,
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: `Here is the raw text extracted from an Argentine electricity bill (factura de luz). Analyze it and extract the data as JSON.\n\n--- BILL TEXT ---\n${extractedText.substring(0, 4000)}\n--- END ---\n\n${EXTRACTION_PROMPT}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq text API error:', response.status, errorText);
    return null;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

const EXTRACTION_PROMPT = `Extract the following information and return ONLY valid JSON (no markdown, no explanation):

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
- The bill might be in Spanish
- Return ONLY the JSON object, nothing else`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured', code: 'MISSING_API_KEY' });
  }

  const { image, mediaType } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided', code: 'INVALID_IMAGE' });
  }

  if (typeof image !== 'string' || image.length > MAX_BODY_SIZE) {
    return res.status(400).json({ error: 'File too large. Maximum 4MB.', code: 'INVALID_IMAGE' });
  }

  const resolvedMediaType = mediaType || 'image/jpeg';
  if (!ALL_VALID_TYPES.includes(resolvedMediaType)) {
    return res.status(400).json({
      error: `Formato no soportado: ${resolvedMediaType}. Use JPEG, PNG, WebP o PDF.`,
      code: 'INVALID_IMAGE',
    });
  }

  const isPdf = resolvedMediaType === VALID_PDF_TYPE;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    let responseText: string | null;

    if (isPdf) {
      // PDF → extract text → Groq text model
      responseText = await analyzeWithText(apiKey, image, controller.signal);
    } else {
      // Image → Groq vision model
      responseText = await analyzeWithVision(apiKey, image, resolvedMediaType, controller.signal);
    }

    clearTimeout(timeout);

    if (!responseText) {
      return res.status(500).json({ error: 'AI analysis failed', code: 'PARSE_ERROR' });
    }

    const result = parseJsonFromText(responseText);
    if (!result) {
      return res.status(500).json({ error: 'Could not parse AI response', code: 'PARSE_ERROR' });
    }

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
      return res.status(504).json({ error: 'Analysis timed out', code: 'TIMEOUT' });
    }
    console.error('Bill analysis error:', error);
    return res.status(500).json({ error: 'Analysis failed', code: 'PARSE_ERROR' });
  }
}
