import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  FileCheck, 
  AlertCircle, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SAMPLE_TEST_DOCUMENTS } from '../data/sampleReports';

interface DocumentUploaderProps {
  onFileUpload: (file: File) => void;
  onSampleSelect: (sampleId: string) => void;
  isLoading: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onFileUpload,
  onSampleSelect,
  isLoading
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Drag and Drop Dropzone */}
      <div
        id="report-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-teal-600 bg-teal-50/50 scale-[1.01]'
            : 'border-slate-200 hover:border-teal-500/50 bg-white hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />

        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold font-manrope text-slate-900">
              Upload Pet Medical Report or Prescription
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Drag & drop blood work, biochemistry panels, urinalysis, or vet prescriptions (PDF, JPG, PNG)
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              id="browse-files-btn"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs inline-flex items-center space-x-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Browse Documents</span>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-500 pt-2">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 mr-1" />
              100% Confidential & Secure
            </span>
            <span>•</span>
            <span>PDF, PNG, JPG up to 25MB</span>
          </div>
        </div>
      </div>

      {/* Preset Demo Reports for Quick 1-Click Evaluation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Or Test Instantly with Sample Medical Reports:
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-teal-700">1-Click Evaluation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SAMPLE_TEST_DOCUMENTS.map((sample) => (
            <button
              key={sample.id}
              id={`sample-report-btn-${sample.id}`}
              onClick={() => onSampleSelect(sample.id)}
              disabled={isLoading}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-500/50 bg-slate-50 hover:bg-white text-left transition-all group flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                    {sample.reportType}
                  </span>
                  <span className="text-[11px] text-slate-400">{sample.date}</span>
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 font-manrope group-hover:text-teal-700 transition-colors">
                  {sample.title}
                </h5>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                  {sample.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-200 text-xs font-semibold text-teal-700">
                <span>Analyze with PawCare AI</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
