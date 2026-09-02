import { AIReportResult } from '../types';

export const SAMPLE_TEST_DOCUMENTS = [
  {
    id: 'sample-cbc-max',
    title: 'Sample CBC Blood Panel (Max - Golden Retriever)',
    description: 'Complete Blood Count showing mild leukocytosis (elevated WBC) after a minor skin infection.',
    petName: 'Max',
    species: 'Canine (Dog)',
    breed: 'Golden Retriever',
    age: '4 Years',
    reportType: 'Complete Blood Count (CBC) with Differential',
    date: '28 Feb 2026',
    mockAnalysis: {
      id: 'report-sample-1',
      createdAt: new Date().toISOString(),
      fileName: 'Max_CBC_Report_Feb2026.pdf',
      petName: 'Max',
      species: 'Canine (Dog)',
      age: '4 Years',
      breed: 'Golden Retriever',
      reportType: 'Complete Blood Count (CBC)',
      date: '28 Feb 2026',
      summary: 'Max’s CBC shows normal red blood cell counts and healthy platelets, but exhibits mildly elevated White Blood Cells (Leukocytosis) with higher Segmented Neutrophils. This is typical of an active inflammatory response or localized infection (e.g., skin/ear irritation) and warrants a vet checkup for targeted treatment.',
      urgencyLevel: 'Moderate' as const,
      keyFindings: [
        'Hemoglobin (15.2 g/dL) and Hematocrit (45.1%) are well within optimal ranges (no anemia).',
        'White Blood Cell (WBC) count is elevated at 18.4 x10³/µL (reference: 6.0 - 17.0 x10³/µL).',
        'Neutrophils are mildly high at 13.8 x10³/µL, suggesting an active immune response to inflammation.',
        'Platelet count (280 x10³/µL) is normal, confirming healthy blood clotting.'
      ],
      abnormalValues: [
        {
          testName: 'Total Leukocyte Count (WBC)',
          value: '18.4',
          unit: 'x10³/µL',
          referenceRange: '6.0 - 17.0',
          explanation: 'Mildly elevated. Indicates the immune system is fighting inflammation or bacterial infection.'
        },
        {
          testName: 'Segmented Neutrophils',
          value: '13.8',
          unit: 'x10³/µL',
          referenceRange: '3.0 - 11.5',
          explanation: 'Higher than normal. Neutrophils are the body\'s first line of defense against pathogens.'
        }
      ],
      normalValues: [
        { testName: 'Hemoglobin (Hb)', value: '15.2', unit: 'g/dL', referenceRange: '12.0 - 18.0' },
        { testName: 'Hematocrit (PCV)', value: '45.1', unit: '%', referenceRange: '37.0 - 55.0' },
        { testName: 'Total Platelet Count', value: '280', unit: 'x10³/µL', referenceRange: '175 - 500' },
        { testName: 'Lymphocytes', value: '2.4', unit: 'x10³/µL', referenceRange: '1.0 - 4.8' },
        { testName: 'Monocytes', value: '0.6', unit: 'x10³/µL', referenceRange: '0.1 - 1.4' }
      ],
      recommendedQuestions: [
        'Could Max\'s elevated white blood cell count be linked to his recent skin scratching or ear scratching?',
        'Does Max require a short course of antibiotic therapy, anti-inflammatory support, or topical medication?',
        'Should we repeat the CBC in 10-14 days to ensure the leukocyte count normalizes?'
      ],
      disclaimer: 'AI-generated information for pet parents. This breakdown does not constitute a veterinary diagnosis or prescription. Always consult a licensed veterinarian before changing your pet\'s care regimen.',
      confidenceScore: 98
    }
  },
  {
    id: 'sample-biochem-bella',
    title: 'Sample Renal & Liver Panel (Bella - Persian Cat)',
    description: 'Biochemistry panel measuring BUN, Creatinine, ALT, and Alkaline Phosphatase.',
    petName: 'Bella',
    species: 'Feline (Cat)',
    breed: 'Persian',
    age: '7 Years',
    reportType: 'Serum Biochemistry Comprehensive Panel',
    date: '15 Feb 2026',
    mockAnalysis: {
      id: 'report-sample-2',
      createdAt: new Date().toISOString(),
      fileName: 'Bella_Renal_Biochem.pdf',
      petName: 'Bella',
      species: 'Feline (Cat)',
      age: '7 Years',
      breed: 'Persian Cat',
      reportType: 'Serum Biochemistry Panel (Renal & Hepatic)',
      date: '15 Feb 2026',
      summary: 'Bella’s liver enzymes (ALT, ALKP) and blood glucose are in ideal condition. Serum Creatinine is at the borderline upper limit (1.9 mg/dL) with slightly elevated Blood Urea Nitrogen (BUN 34 mg/dL), which could reflect mild dehydration or early kidney sensitivity common in mature cats. A urine specific gravity test and hydration check is recommended.',
      urgencyLevel: 'Moderate' as const,
      keyFindings: [
        'Liver enzymes (ALT 48 U/L, ALKP 32 U/L) are completely normal.',
        'Blood Urea Nitrogen (BUN) is mildly elevated at 34 mg/dL (reference: 16 - 36 mg/dL).',
        'Creatinine is borderline at 1.9 mg/dL (reference: 0.8 - 2.0 mg/dL for cats).',
        'Blood glucose and total protein levels are within normal physiological bounds.'
      ],
      abnormalValues: [
        {
          testName: 'Blood Urea Nitrogen (BUN)',
          value: '34',
          unit: 'mg/dL',
          referenceRange: '16 - 32',
          explanation: 'Slightly elevated. Can occur with mild dehydration, high protein intake, or early renal workload.'
        },
        {
          testName: 'Serum Creatinine',
          value: '1.9',
          unit: 'mg/dL',
          referenceRange: '0.8 - 1.8',
          explanation: 'At the upper limit of feline reference range. Worth monitoring with follow-up urinalysis and kidney diet discussion.'
        }
      ],
      normalValues: [
        { testName: 'Alanine Aminotransferase (ALT)', value: '48', unit: 'U/L', referenceRange: '12 - 130' },
        { testName: 'Alkaline Phosphatase (ALKP)', value: '32', unit: 'U/L', referenceRange: '14 - 111' },
        { testName: 'Total Protein', value: '7.2', unit: 'g/dL', referenceRange: '5.7 - 8.9' },
        { testName: 'Serum Albumin', value: '3.4', unit: 'g/dL', referenceRange: '2.1 - 3.9' },
        { testName: 'Blood Glucose', value: '102', unit: 'mg/dL', referenceRange: '74 - 159' }
      ],
      recommendedQuestions: [
        'Would you recommend checking Bella’s Urine Specific Gravity (USG) or SDMA to assess kidney filtration?',
        'Should we increase wet food intake or introduce a water fountain to support her hydration?',
        'At 7 years of age, what preventive renal diet or senior wellness check interval is best for Bella?'
      ],
      disclaimer: 'AI-generated summary. This report is for educational context to facilitate productive consultations with your vet. Do not administer home remedies or adjust prescription diets without veterinary approval.',
      confidenceScore: 96
    }
  }
];

export const MOCK_USER_PETS = [
  {
    id: 'pet-1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '4 Years',
    weight: '28.5 kg',
    gender: 'Male' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&auto=format&fit=crop&q=80',
    microchipId: '985141002348912',
    lastVaccination: '12 Dec 2025 (Annual 9-in-1 + Anti-Rabies)',
    bloodGroup: 'DEA 1.1 Positive',
    knownConditions: ['Seasonal Dermatitis', 'Grass Pollen Allergy']
  },
  {
    id: 'pet-2',
    name: 'Bella',
    species: 'Cat',
    breed: 'Persian Longhair',
    age: '7 Years',
    weight: '3.8 kg',
    gender: 'Female' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80',
    microchipId: '985141008891230',
    lastVaccination: '10 Jan 2026 (Tricat Trio + Rabies)',
    bloodGroup: 'Type A',
    knownConditions: ['Mild Hairball Sensitivity']
  }
];
