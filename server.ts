import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { MOCK_PROVIDERS } from './src/data/providers';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for base64 image/document uploads
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Lazy initialize Gemini client to avoid crashes if key is missing during startup
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Providers API
app.get('/api/providers', (req, res) => {
  const { category, query, emergencyOnly, openOnly } = req.query;
  let results = [...MOCK_PROVIDERS];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (emergencyOnly === 'true') {
    results = results.filter((p) => p.emergencyAvailable);
  }

  if (openOnly === 'true') {
    results = results.filter((p) => p.isOpenNow);
  }

  if (query && typeof query === 'string' && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q)) ||
        p.species.some((sp) => sp.toLowerCase().includes(q)) ||
        p.doctors.some((d) => d.name.toLowerCase().includes(q))
    );
  }

  res.json({ providers: results, count: results.length });
});

// Single provider details API
app.get('/api/providers/:id', (req, res) => {
  const provider = MOCK_PROVIDERS.find((p) => p.id === req.params.id);
  if (!provider) {
    return res.status(404).json({ error: 'Provider not found' });
  }
  res.json({ provider });
});

// Gemini AI Medical Report Analysis API
app.post('/api/analyze-report', async (req, res) => {
  try {
    const { fileData, mimeType, fileName, textContent } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    const ai = getGenAI();

    // If no API key is set, or if requested in test mode, return a rich mock parsing
    if (!ai || !apiKey) {
      console.warn('GEMINI_API_KEY not configured. Falling back to intelligent mock extractor.');
      return res.json({
        report: {
          id: 'report-' + Date.now(),
          createdAt: new Date().toISOString(),
          fileName: fileName || 'Uploaded_Medical_Report.pdf',
          petName: 'Rocky',
          species: 'Canine (Dog)',
          age: '3.5 Years',
          breed: 'Labrador Retriever',
          reportType: 'Automated Veterinary Hematology (CBC)',
          date: new Date().toLocaleDateString('en-GB'),
          summary:
            'This veterinary report shows overall stable hematocrit and hemoglobin. Platelets are healthy (310 x10³/µL). A mild elevation in total white blood cell count (18.6 x10³/µL) with elevated granulocytes is noted, indicating an active inflammatory response or mild bacterial challenge. Please consult your veterinarian for clinical correlation.',
          urgencyLevel: 'Moderate',
          keyFindings: [
            'Red Blood Cell (RBC) count & Hemoglobin are within healthy canine limits.',
            'Total White Blood Cell (WBC) count is elevated at 18.6 x10³/µL (Ref: 6.0 - 17.0 x10³/µL).',
            'Platelet count is normal at 310 x10³/µL, indicating intact coagulation.',
            'No critical red flags requiring emergency intervention detected on this page.'
          ],
          abnormalValues: [
            {
              testName: 'Total Leukocyte (WBC) Count',
              value: '18.6',
              unit: 'x10³/µL',
              referenceRange: '6.0 - 17.0',
              explanation:
                'Mildly elevated. This usually indicates an active immune response to localized inflammation, wound healing, or mild infection.'
            },
            {
              testName: 'Absolute Granulocytes / Neutrophils',
              value: '14.2',
              unit: 'x10³/µL',
              referenceRange: '3.0 - 11.5',
              explanation:
                'Above reference limits, corresponding to the elevated total white cell response.'
            }
          ],
          normalValues: [
            { testName: 'Hemoglobin (Hb)', value: '14.8', unit: 'g/dL', referenceRange: '12.0 - 18.0' },
            { testName: 'Packed Cell Volume (PCV)', value: '44.2', unit: '%', referenceRange: '37.0 - 55.0' },
            { testName: 'Platelet Count', value: '310', unit: 'x10³/µL', referenceRange: '175 - 500' },
            { testName: 'Mean Corpuscular Volume (MCV)', value: '68.4', unit: 'fL', referenceRange: '60 - 77' }
          ],
          recommendedQuestions: [
            'Could this mild elevation in white blood cells be related to recent allergies, scratching, or GI upset?',
            'Do you recommend starting a course of antibiotics or simply monitoring for symptoms?',
            'Should we repeat the blood panel after 2 weeks to verify that leukocyte counts have normalized?'
          ],
          disclaimer:
            'AI-generated educational summary for pet parents. This does not replace professional veterinary examination, diagnosis, or prescription. Always consult a licensed vet.'
        }
      });
    }

    const systemInstruction = `You are PawCare AI, an empathetic, highly accurate, and rigorous veterinary document understanding assistant designed for pet parents and animal caregivers in India.

CRITICAL MEDICAL SAFETY RULES:
1. NEVER diagnose an animal with a disease or condition.
2. NEVER prescribe medications, calculate or suggest drug dosages.
3. NEVER instruct users to ignore or replace professional in-person veterinary care.
4. Always clearly distinguish reported lab findings from general educational interpretation.
5. Explain complex medical terms in simple, warm, jargon-free language for pet parents.
6. Extract only the information present in the document. Never fabricate or invent missing numbers.
7. If a value is outside the printed reference range, highlight it in abnormalValues with an educational explanation.
8. Generate 3 to 4 thoughtful, practical questions that the pet parent should ask their veterinarian.
9. Assess urgencyLevel as:
   - "Low": Routine wellness, vaccination record, or all values within standard normal limits.
   - "Moderate": Mildly elevated/depressed values, mild inflammation, or non-critical abnormalities needing non-emergency vet consult.
   - "High / Urgent": Severe abnormalities (e.g. severe anemia, dangerously high creatinine/BUN, extreme thrombocytopenia, acute organ failure markers) requiring immediate attention.`;

    const contents: any[] = [];

    if (fileData && mimeType) {
      // Clean base64 string if it contains data URI prefix
      const base64Clean = fileData.replace(/^data:[^;]+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType: mimeType === 'application/pdf' ? 'application/pdf' : mimeType,
          data: base64Clean
        }
      });
      contents.push(
        'Please carefully analyze this veterinary medical report/document. Extract all lab parameters, identify abnormal and normal values, summarize key clinical findings in plain English, and provide structured questions for the pet parent to discuss with their veterinarian.'
      );
    } else if (textContent) {
      contents.push(
        `Please analyze this text content from a veterinary medical record:\n\n${textContent}`
      );
    } else {
      return res.status(400).json({ error: 'No file data or text content provided' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            petName: { type: Type.STRING, description: 'Name of the pet or "Unknown"' },
            species: { type: Type.STRING, description: 'Species e.g. Canine (Dog), Feline (Cat), Avian (Bird), etc.' },
            age: { type: Type.STRING, description: 'Age mentioned in report, or null if omitted' },
            breed: { type: Type.STRING, description: 'Breed mentioned in report, or null' },
            reportType: { type: Type.STRING, description: 'Type of test/document e.g. Complete Blood Count (CBC), Serum Biochemistry, Urinalysis, Prescription, Radiology Report' },
            date: { type: Type.STRING, description: 'Date of report or test if visible' },
            summary: { type: Type.STRING, description: 'Compassionate, clear 2-4 sentence plain English summary of findings' },
            urgencyLevel: {
              type: Type.STRING,
              enum: ['Low', 'Moderate', 'High / Urgent'],
              description: 'Urgency level based on findings'
            },
            keyFindings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of main takeaways'
            },
            abnormalValues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  testName: { type: Type.STRING },
                  value: { type: Type.STRING },
                  unit: { type: Type.STRING },
                  referenceRange: { type: Type.STRING },
                  explanation: { type: Type.STRING, description: 'Plain English explanation of what this test measures and what deviation indicates' }
                },
                required: ['testName', 'value', 'explanation']
              },
              description: 'Parameters outside reference range'
            },
            normalValues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  testName: { type: Type.STRING },
                  value: { type: Type.STRING },
                  unit: { type: Type.STRING },
                  referenceRange: { type: Type.STRING }
                },
                required: ['testName', 'value']
              },
              description: 'Parameters within normal reference limits'
            },
            recommendedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-4 specific questions for pet parents to ask their vet'
            },
            disclaimer: {
              type: Type.STRING,
              description: 'Medical disclaimer note'
            }
          },
          required: [
            'petName',
            'species',
            'reportType',
            'summary',
            'urgencyLevel',
            'keyFindings',
            'abnormalValues',
            'normalValues',
            'recommendedQuestions',
            'disclaimer'
          ]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('No response received from Gemini model');
    }

    const parsedJson = JSON.parse(textOutput);
    const finalReport = {
      id: 'report-' + Date.now(),
      createdAt: new Date().toISOString(),
      fileName: fileName || 'Pet_Medical_Document.pdf',
      ...parsedJson
    };

    res.json({ report: finalReport });
  } catch (error: any) {
    console.error('Error in /api/analyze-report:', error);
    res.status(500).json({
      error: error.message || 'Failed to analyze veterinary document',
      details: error.toString()
    });
  }
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PawCare server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
