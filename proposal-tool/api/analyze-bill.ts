import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided. Send { image: "base64string" }' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: image,
                },
              },
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(500).json({ error: 'AI analysis failed' });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Could not parse AI response', raw: text });
    }

    const result = JSON.parse(jsonMatch[0]);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Bill analysis error:', error);
    return res.status(500).json({ error: 'Analysis failed' });
  }
}
