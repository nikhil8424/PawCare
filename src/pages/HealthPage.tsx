import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  AlertTriangle, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  HeartHandshake,
  Compass,
  ArrowRight
} from 'lucide-react';
import { AIReportResult } from '../types';
import { DocumentUploader } from '../components/DocumentUploader';
import { AIReportView } from '../components/AIReportView';
import { analyzeVeterinaryReport, analyzeSampleDocument } from '../services/geminiService';

interface HealthPageProps {
  onFindVet: () => void;
  onSaveReportToProfile?: (report: AIReportResult) => void;
}

type HealthState = 'empty' | 'uploading' | 'processing' | 'results' | 'error';

export const HealthPage: React.FC<HealthPageProps> = ({
  onFindVet,
  onSaveReportToProfile
}) => {
  const [currentState, setCurrentState] = useState<HealthState>('empty');
  const [progressStage, setProgressStage] = useState<string>('Initializing analysis...');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentReport, setCurrentReport] = useState<AIReportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setCurrentState('uploading');
      setProgressPercent(15);
      setProgressStage('Uploading and preparing document...');

      // Transition to processing
      setTimeout(() => {
        setCurrentState('processing');
      }, 700);

      const result = await analyzeVeterinaryReport(file, (stage, percent) => {
        setProgressStage(stage);
        setProgressPercent(percent);
      });

      setCurrentReport(result);
      setCurrentState('results');
      if (onSaveReportToProfile) {
        onSaveReportToProfile(result);
      }
    } catch (err: any) {
      console.error('Error analyzing document:', err);
      setErrorMessage(err.message || 'We could not analyze this document. Please ensure it is a clear image or PDF of a veterinary report.');
      setCurrentState('error');
    }
  };

  const handleSampleSelect = async (sampleId: string) => {
    try {
      setCurrentState('uploading');
      setProgressPercent(20);
      setProgressStage('Loading verified test document...');

      setTimeout(() => {
        setCurrentState('processing');
      }, 500);

      const result = await analyzeSampleDocument(sampleId, (stage, percent) => {
        setProgressStage(stage);
        setProgressPercent(percent);
      });

      setCurrentReport(result);
      setCurrentState('results');
      if (onSaveReportToProfile) {
        onSaveReportToProfile(result);
      }
    } catch (err: any) {
      console.error('Error with sample:', err);
      setErrorMessage('Failed to load sample report.');
      setCurrentState('error');
    }
  };

  const handleReset = () => {
    setCurrentState('empty');
    setCurrentReport(null);
    setErrorMessage(null);
    setProgressPercent(0);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>PawCare AI • Veterinary Document Understanding</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-manrope tracking-tight">
            Understand your pet’s medical report instantly.
          </h1>

          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
            Upload blood work (CBC), kidney/liver biochemistry, urinalysis, or prescriptions. PawCare AI highlights key findings, explains what deviations mean, and equips you with smart questions for your vet.
          </p>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <FileText className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* STATE 1: Empty State (Document Uploader & Presets) */}
      {currentState === 'empty' && (
        <DocumentUploader
          onFileUpload={handleFileUpload}
          onSampleSelect={handleSampleSelect}
          isLoading={false}
        />
      )}

      {/* STATE 2 & 3: Uploading & Processing State */}
      {(currentState === 'uploading' || currentState === 'processing') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center max-w-xl mx-auto space-y-6 shadow-md animate-in fade-in zoom-in-95">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            <div className="absolute inset-0 rounded-full border-4 border-teal-600 border-t-transparent animate-spin" />
            <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold font-manrope text-slate-900">
              {currentState === 'uploading' ? 'Uploading Veterinary Report...' : 'PawCare AI is Analyzing Your Report'}
            </h3>
            <p className="text-xs text-slate-500">{progressStage}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(15, progressPercent)}%` }}
            />
          </div>

          {/* Live Steps Breakdown */}
          <div className="grid grid-cols-1 gap-2.5 text-left text-xs text-slate-600 pt-4 border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className={`w-4 h-4 ${progressPercent >= 25 ? 'text-teal-600' : 'text-slate-300'}`} />
              <span>Scanning document structure & biomarkers</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className={`w-4 h-4 ${progressPercent >= 60 ? 'text-teal-600' : 'text-slate-300'}`} />
              <span>Cross-referencing species reference intervals</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className={`w-4 h-4 ${progressPercent >= 85 ? 'text-teal-600' : 'text-slate-300'}`} />
              <span>Translating jargon into plain English summary</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className={`w-4 h-4 ${progressPercent >= 95 ? 'text-teal-600' : 'text-slate-300'}`} />
              <span>Formulating high-value questions for your vet</span>
            </div>
          </div>
        </div>
      )}

      {/* STATE 4: Results State */}
      {currentState === 'results' && currentReport && (
        <AIReportView
          report={currentReport}
          onReset={handleReset}
          onFindVet={onFindVet}
        />
      )}

      {/* STATE 5: Error State */}
      {currentState === 'error' && (
        <div className="bg-white rounded-3xl border border-red-200 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-5 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold font-manrope text-red-700">
              Unable to Analyze Document
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {errorMessage || 'The document was illegible or could not be processed.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900">Helpful Upload Tips:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Ensure good lighting and avoid reflections on printed paper.</li>
              <li>Make sure text and numbers in lab tables are sharp and readable.</li>
              <li>Or try clicking one of our pre-verified sample reports above!</li>
            </ul>
          </div>

          <div className="pt-2 flex items-center justify-center space-x-3">
            <button
              id="try-again-upload-btn"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => handleSampleSelect('sample-cbc-max')}
              className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-teal-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              Load Demo Sample
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
