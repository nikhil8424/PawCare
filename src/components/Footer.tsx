import React from 'react';
import { 
  Heart, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  Mail,
  ExternalLink
} from 'lucide-react';
import { CareCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: CareCategory) => void;
  onOpenEmergencyModal: () => void;
  onNavigateToAIHealth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenEmergencyModal,
  onNavigateToAIHealth
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-20 md:pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                P
              </div>
              <span className="text-xl font-bold font-manrope text-teal-900">
                PawCare<span className="text-orange-500">+</span> India
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              India’s trusted animal healthcare discovery platform. Helping pet parents and animal rescuers find accredited veterinary clinics, 24/7 emergency care, ambulances, and understand pet medical records with AI.
            </p>

            <div className="flex items-center space-x-2 text-xs text-teal-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>VCI Verified & Accredited Network</span>
            </div>
          </div>

          {/* Col 3: Quick Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Animal Care Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('vet')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  Veterinary Clinics & Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('emergency')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  24/7 Critical Trauma Centers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ambulance')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  Animal Ambulance Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ngo')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  NGO Rescue & Animal Birth Control (ABC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('boarding')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  Pet Resorts & Luxury Boarding
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: AI & Diagnostics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              PawCare AI Health
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigateToAIHealth}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Medical Report Analyzer</span>
                </button>
              </li>
              <li>
                <span className="text-slate-400">Complete Blood Count (CBC)</span>
              </li>
              <li>
                <span className="text-slate-400">Serum Renal & Liver Panel</span>
              </li>
              <li>
                <span className="text-slate-400">Vet Discussion Generator</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Emergency 24/7 Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-600">
              Emergency Helpline (24/7)
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:1962"
                className="p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-2 text-red-700 font-bold hover:bg-red-100 transition-colors block cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>National Emergency: 1962</span>
              </a>
              <button
                onClick={onOpenEmergencyModal}
                className="w-full text-left p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
              >
                View Mumbai SOS Directory
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 PawCare Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Mumbai • Bengaluru • Delhi NCR • Pune</span>
            <span>•</span>
            <span className="text-teal-700 font-semibold">Crafted with Care for Pets</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
