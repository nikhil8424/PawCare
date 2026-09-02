import { AIReportResult } from '../types';
import { SAMPLE_TEST_DOCUMENTS } from '../data/sampleReports';

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function analyzeVeterinaryReport(
  file: File,
  onProgress?: (stage: string, percent: number) => void
): Promise<AIReportResult> {
  if (onProgress) onProgress('Uploading and encoding veterinary document...', 20);

  const base64Data = await fileToBase64(file);

  if (onProgress) onProgress('Transmitting securely to PawCare AI engine...', 45);

  const response = await fetch('/api/analyze-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fileData: base64Data,
      mimeType: file.type || 'application/pdf',
      fileName: file.name
    })
  });

  if (onProgress) onProgress('Interpreting biological reference ranges & markers...', 75);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `Server returned ${response.status}: Failed to analyze document`);
  }

  const data = await response.json();
  if (onProgress) onProgress('Formatting clinical findings & vet questions...', 95);

  return data.report;
}

export async function analyzeSampleDocument(
  sampleId: string,
  onProgress?: (stage: string, percent: number) => void
): Promise<AIReportResult> {
  const sample = SAMPLE_TEST_DOCUMENTS.find((s) => s.id === sampleId) || SAMPLE_TEST_DOCUMENTS[0];

  if (onProgress) {
    onProgress('Loading sample laboratory document...', 25);
    await new Promise((r) => setTimeout(r, 450));
    onProgress('Extracting hematological & biochemistry panels...', 60);
    await new Promise((r) => setTimeout(r, 450));
    onProgress('Calibrating against feline & canine reference limits...', 85);
    await new Promise((r) => setTimeout(r, 400));
    onProgress('Finalizing structured summary...', 100);
  }

  return {
    ...sample.mockAnalysis,
    id: 'report-' + Date.now(),
    createdAt: new Date().toISOString()
  };
}
