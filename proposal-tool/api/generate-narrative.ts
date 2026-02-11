import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured', code: 'MISSING_API_KEY' });
  }

  // Validate request body
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Request body required', code: 'VALIDATION_ERROR' });
  }

  const {
    customerName,
    province,
    systemSize,
    panelCount,
    annualProduction,
    annualSavings,
    paybackYears,
    irr,
    co2Avoided,
    coverage,
  } = req.body;

  if (!systemSize || !annualProduction) {
    return res.status(400).json({ error: 'Missing required proposal data (systemSize, annualProduction)', code: 'VALIDATION_ERROR' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 512,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: `Write a compelling 3-paragraph executive summary in Spanish for a personalized solar energy proposal.

Client details:
- Name: ${customerName || 'Estimado cliente'}
- Location: ${province}, Argentina
- Proposed system: ${systemSize} kWp (${panelCount} solar panels)
- Annual production: ${annualProduction} kWh (covers ${coverage}% of consumption)
- Annual savings: US$ ${annualSavings}
- Payback period: ${paybackYears} years
- Internal Rate of Return (IRR): ${irr}%
- CO₂ avoided: ${co2Avoided} kg/year

Requirements:
- Write in professional but warm Spanish
- Paragraph 1: Describe the proposed system and its fit for the location
- Paragraph 2: Highlight the financial benefits (savings, payback, ROI)
- Paragraph 3: Emphasize environmental impact and regulatory support (Ley 27.424)
- Do NOT use markdown formatting, bullet points, or headers
- Keep it to exactly 3 paragraphs
- Address the client by name if provided`,
          },
        ],
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      return res.status(500).json({ error: 'Narrative generation failed', code: 'PARSE_ERROR' });
    }

    const data = await response.json();
    const narrative = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ narrative });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Narrative generation timeout');
      return res.status(504).json({ error: 'Generation timed out. Please try again.', code: 'TIMEOUT' });
    }
    console.error('Narrative generation error:', error);
    return res.status(500).json({ error: 'Generation failed', code: 'PARSE_ERROR' });
  }
}
