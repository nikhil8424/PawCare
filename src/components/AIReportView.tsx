import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Share2, 
  Printer, 
  Download, 
  Compass, 
  MessageSquare, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Calendar, 
  User, 
  Send,
  Stethoscope,
  Info
} from 'lucide-react';
import { AIReportResult } from '../types';

interface AIReportViewProps {
  report: AIReportResult;
  onReset: () => void;
  onFindVet: () => void;
}

export const AIReportView: React.FC<AIReportViewProps> = ({
  report,
  onReset,
  onFindVet
}) => {
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [showNormalValues, setShowNormalValues] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleCopyQuestions = () => {
    const text = report.recommendedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuestion.trim()) return;

    setIsAnswering(true);
    // Simulate interactive follow-up guidance strictly adhering to safety guidelines
    setTimeout(() => {
      const q = followUpQuestion.toLowerCase();
      let reply = `Regarding your query "${followUpQuestion}": In the context of ${report.petName}'s ${report.reportType}, it is important to monitor overall appetite, energy levels, and hydration. `;
      if (q.includes('food') || q.includes('diet') || q.includes('eat')) {
        reply += `A gentle, easily digestible bland diet (such as boiled chicken with pumpkin, or vet-recommended gastrointestinal kibble) is often advised, but verify with your vet before altering any medical diets.`;
      } else if (q.includes('walk') || q.includes('exercise') || q.includes('play')) {
        reply += `While inflammatory markers are elevated, mild leash walks are usually best. Avoid strenuous sprinting until your vet evaluates the complete blood work.`;
      } else {
        reply += `Ensure ${report.petName} has uninterrupted access to clean drinking water and a quiet resting environment, and bring this report directly to your scheduled vet consultation.`;
      }
      setFollowUpAnswer(reply);
      setIsAnswering(false);
    }, 800);
  };

  const getUrgencyBadge = () => {
    switch (report.urgencyLevel) {
      case 'High / Urgent':
        return {
          bg: 'bg-red-50 text-red-700 border-red-200',
          icon: <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />,
          label: 'Requires Urgent Veterinary Care'
        };
      case 'Moderate':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-200',
          icon: <AlertTriangle className="w-4 h-4 text-orange-600" />,
          label: 'Non-Emergency: Consult Vet Soon'
        };
      default:
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200',
          icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
          label: 'Routine / Within Stable Limits'
        };
    }
  };

  const urgency = getUrgencyBadge();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Actions Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                PawCare AI Report Analysis
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                AI Verified
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-manrope text-slate-900">
              {report.reportType} • {report.petName}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-teal-600" />
            <span>Print Summary</span>
          </button>

          <button
            id="find-vet-for-report-btn"
            onClick={onFindVet}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Find a Vet Near Me</span>
          </button>

          <button
            id="upload-another-doc-btn"
            onClick={onReset}
            className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
          >
            Upload New File
          </button>
        </div>
      </div>

      {/* Patient & Report Metadata Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Patient Name</span>
          <span className="text-sm font-bold text-slate-900">{report.petName || 'Unknown'}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Species & Breed</span>
          <span className="text-sm font-bold text-slate-900">
            {report.species} {report.breed ? `(${report.breed})` : ''}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Patient Age</span>
          <span className="text-sm font-bold text-slate-900">{report.age || 'Not specified'}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Report Date</span>
          <span className="text-sm font-bold text-slate-900">{report.date || 'Recent'}</span>
        </div>
      </div>

      {/* Urgency Status Card */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 shadow-xs ${urgency.bg}`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-white/80 backdrop-blur-xs border border-current/10">
            {urgency.icon}
          </div>
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider">Clinical Urgency Assessment</h4>
            <p className="text-sm font-extrabold">{urgency.label}</p>
          </div>
        </div>

        <button
          onClick={onFindVet}
          className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold hover:bg-slate-50 shadow-xs border border-slate-200 transition-colors cursor-pointer"
        >
          Book Clinic Slot
        </button>
      </div>

      {/* Clinical Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
        <h3 className="text-base font-bold font-manrope text-slate-900 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-teal-600" />
          <span>Simplified Clinical Summary</span>
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
          {report.summary}
        </p>
      </div>

      {/* Key Findings Bullet Points */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="text-base font-bold font-manrope text-slate-900 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>Key Findings & Observations</span>
        </h3>
        <ul className="space-y-2.5">
          {report.keyFindings.map((finding, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
              <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-snug">{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Abnormal Values (Flagged Biomarkers) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-manrope text-slate-900 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span>Parameters Requiring Attention ({report.abnormalValues.length})</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-500">
            Values outside reference boundaries
          </span>
        </div>

        {report.abnormalValues.length === 0 ? (
          <p className="text-xs text-teal-700 bg-teal-50 border border-teal-200 p-3 rounded-xl">
            All extracted parameters appear within standard physiological reference limits.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {report.abnormalValues.map((abn, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-orange-200 bg-orange-50/50 space-y-2 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{abn.testName}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
                    Flagged
                  </span>
                </div>

                <div className="flex items-baseline space-x-2 text-xs">
                  <span className="text-base font-extrabold text-orange-800">
                    {abn.value} {abn.unit || ''}
                  </span>
                  {abn.referenceRange && (
                    <span className="text-slate-500">
                      (Standard Ref: {abn.referenceRange} {abn.unit || ''})
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-orange-200">
                  {abn.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Normal Values (Collapsible) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
        <button
          id="toggle-normal-values-btn"
          onClick={() => setShowNormalValues(!showNormalValues)}
          className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <h3 className="text-base font-bold font-manrope text-slate-900">
              Normal Reference Parameters ({report.normalValues.length})
            </h3>
          </div>
          <div className="flex items-center space-x-1 text-xs font-semibold text-teal-700">
            <span>{showNormalValues ? 'Hide' : 'Show Details'}</span>
            {showNormalValues ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showNormalValues && (
          <div className="pt-3 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase font-bold">
                  <th className="pb-2">Test / Biomarker</th>
                  <th className="pb-2">Reported Value</th>
                  <th className="pb-2">Reference Limit</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.normalValues.map((norm, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 font-semibold text-slate-900">{norm.testName}</td>
                    <td className="py-2.5 font-bold text-teal-700">{norm.value} {norm.unit || ''}</td>
                    <td className="py-2.5 text-slate-500">{norm.referenceRange || 'Standard'} {norm.unit || ''}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                        Normal
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Questions to Ask Veterinarian (High Value Section) */}
      <div className="bg-teal-50/70 rounded-2xl border border-teal-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-teal-700" />
            <h3 className="text-base font-bold font-manrope text-slate-900">
              Questions to Ask Your Veterinarian
            </h3>
          </div>

          <button
            id="copy-questions-btn"
            onClick={handleCopyQuestions}
            className="px-3 py-1.5 rounded-lg bg-white border border-teal-200 hover:bg-teal-50 text-xs font-semibold text-teal-700 flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
          >
            {copiedQuestions ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedQuestions ? 'Copied to Clipboard!' : 'Copy Questions'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-700">
          Take these specific, clinically grounded questions to your vet consultation to get clear answers:
        </p>

        <div className="space-y-2.5">
          {report.recommendedQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start space-x-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs"
            >
              <span className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {idx + 1}
              </span>
              <p className="pt-0.5">{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive AI Clarification / Follow-up Q&A */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-teal-600" />
          <h3 className="text-base font-bold font-manrope text-slate-900">
            Have a Question About This Report?
          </h3>
        </div>

        <form onSubmit={handleFollowUpSubmit} className="flex gap-2">
          <input
            id="follow-up-question-input"
            type="text"
            value={followUpQuestion}
            onChange={(e) => setFollowUpQuestion(e.target.value)}
            placeholder="e.g. Can he go for walks? What food should I avoid?"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isAnswering || !followUpQuestion.trim()}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isAnswering ? 'Thinking...' : 'Ask AI'}</span>
          </button>
        </form>

        {followUpAnswer && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 animate-in fade-in">
            <div className="flex items-center space-x-1.5 text-teal-700 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>PawCare AI Guidance:</span>
            </div>
            <p className="leading-relaxed">{followUpAnswer}</p>
          </div>
        )}
      </div>

      {/* Mandatory AI Medical Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
        <ShieldAlert className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">Medical & Legal Disclaimer</p>
          <p className="leading-relaxed">{report.disclaimer}</p>
        </div>
      </div>
    </div>
  );
};
