import React from 'react';
import { 
  X, 
  PhoneCall, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Ambulance, 
  Stethoscope, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { MOCK_PROVIDERS } from '../data/providers';
import { Provider } from '../types';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProvider: (provider: Provider) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onSelectProvider
}) => {
  if (!isOpen) return null;

  const emergencyProviders = MOCK_PROVIDERS.filter((p) => p.emergencyAvailable);

  const HELPLINES = [
    {
      title: 'National Animal Emergency Helpline',
      number: '1962',
      description: 'Toll-free emergency animal transit & medical response across India',
      badge: 'Toll-Free 24x7'
    },
    {
      title: 'Mumbai Animal Rescue Central Control',
      number: '+91 98200 66779',
      description: 'Stray & pet trauma dispatch in Mumbai MMR',
      badge: 'Rapid Dispatch'
    },
    {
      title: 'Pet Poison & Toxin Emergency Helpline',
      number: '+91 98199 11220',
      description: 'Immediate antidote & stabilization protocol guidance',
      badge: 'Clinical Advice'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="emergency-sos-dialog"
        className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-red-200 overflow-hidden relative"
      >
        {/* Header with Emergency High-Contrast Theme */}
        <div className="bg-red-600 text-white px-6 py-5 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center space-x-3 z-10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-manrope leading-tight">
                24/7 Animal Emergency & Ambulance
              </h2>
              <p className="text-xs text-white/90">
                Immediate critical trauma, poisoning, breathing distress, or ambulance transport
              </p>
            </div>
          </div>
          <button
            id="close-emergency-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Quick Helpline Numbers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Direct Emergency Lines (Tap to Call)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HELPLINES.map((h, idx) => (
                <a
                  key={idx}
                  id={`helpline-call-${idx}`}
                  href={`tel:${h.number.replace(/\s+/g, '')}`}
                  className="p-3.5 rounded-xl bg-red-50 hover:bg-red-100/70 border border-red-200 flex flex-col justify-between transition-all group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-red-700">{h.title}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                      {h.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-2">{h.description}</p>
                  <div className="flex items-center space-x-1.5 text-sm font-bold text-red-600">
                    <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{h.number}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 24/7 Verified Emergency Hospitals Nearby */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span>24/7 Hospitals & Ambulances Ready in Mumbai</span>
              </h3>
              <span className="text-[11px] font-semibold text-teal-700">
                {emergencyProviders.length} facilities open now
              </span>
            </div>

            <div className="space-y-3">
              {emergencyProviders.map((p) => (
                <div
                  key={p.id}
                  id={`emergency-provider-card-${p.id}`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-teal-500/40 bg-white hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 font-manrope">{p.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                          24/7 Open
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 text-teal-600 mr-1" />
                          {p.location} ({p.distance} km)
                        </span>
                        <span>•</span>
                        <span className="text-teal-700 font-semibold">★ {p.rating}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">{p.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:flex-shrink-0">
                    <a
                      id={`emergency-call-btn-${p.id}`}
                      href={`tel:${(p.emergencyPhone || p.phone).replace(/\s+/g, '')}`}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                    <button
                      id={`emergency-view-btn-${p.id}`}
                      onClick={() => {
                        onClose();
                        onSelectProvider(p);
                      }}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-900 transition-colors cursor-pointer"
                    >
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Pet Emergency First-Aid Advice */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-orange-500" />
              <span>While in Transit (First-Aid Tips):</span>
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>Keep the pet warm and wrapped gently in a towel or blanket.</li>
              <li>Do NOT offer food, water, or human pain medications (like Paracetamol/Ibuprofen, which are toxic).</li>
              <li>Keep their head elevated if experiencing labored breathing.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            id="emergency-modal-close-footer"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
