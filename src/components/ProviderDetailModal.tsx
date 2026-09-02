import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  Share2, 
  Check, 
  Navigation, 
  AlertTriangle,
  Stethoscope,
  Heart,
  CheckCircle2,
  Building,
  UserCheck
} from 'lucide-react';
import { Provider } from '../types';

interface ProviderDetailModalProps {
  provider: Provider | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (provider: Provider) => void;
}

export const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  provider,
  isOpen,
  onClose,
  onBookAppointment
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'reviews'>('overview');

  if (!isOpen || !provider) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(provider.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: provider.name,
        text: `${provider.name} - ${provider.location} on PawCare`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        id={`provider-detail-modal-${provider.id}`}
        className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]"
      >
        {/* Sticky Top Header with Close & Share */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          <button
            id="share-provider-btn"
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-md transition-all cursor-pointer"
            title="Share Clinic"
          >
            {copiedLink ? <Check className="w-5 h-5 text-teal-600" /> : <Share2 className="w-5 h-5" />}
          </button>
          <button
            id="close-provider-detail-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-md transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          
          {/* Hero Banner Section */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-100">
            <img
              src={provider.imageUrl}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Bottom Hero Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {provider.verified && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-600 text-white flex items-center space-x-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>PawCare Verified Clinic</span>
                  </span>
                )}
                {provider.emergencyAvailable && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-600 text-white flex items-center space-x-1 shadow-xs">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>24/7 Emergency Available</span>
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
                  {provider.type}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-manrope tracking-tight">
                {provider.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/90">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span className="font-bold text-white">{provider.rating}</span>
                  <span>({provider.reviewCount} verified pet parent reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-teal-300" />
                  <span>{provider.location} ({provider.distance} km away)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sub-Navigation Tabs */}
          <div className="border-b border-slate-200 px-6 flex items-center space-x-6 bg-slate-50">
            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview & Services
            </button>
            <button
              id="tab-doctors"
              onClick={() => setActiveTab('doctors')}
              className={`py-3.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'doctors'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Doctors & Team ({provider.doctors.length})
            </button>
            <button
              id="tab-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Reviews ({provider.reviews.length})
            </button>
          </div>

          {/* Content Body Grid */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Main Details */}
            <div className="lg:col-span-2 space-y-6">
              
              {activeTab === 'overview' && (
                <>
                  {/* Emergency Notification Alert (if applicable) */}
                  {provider.emergencyAvailable && provider.emergencyNote && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3 shadow-xs">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider">
                          Emergency Protocol
                        </h4>
                        <p className="text-xs text-slate-700 mt-0.5">{provider.emergencyNote}</p>
                      </div>
                    </div>
                  )}

                  {/* About Clinic */}
                  <div>
                    <h3 className="text-base font-bold font-manrope text-slate-900 mb-2">
                      About {provider.name}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{provider.about}</p>
                  </div>

                  {/* Services Provided */}
                  <div>
                    <h3 className="text-base font-bold font-manrope text-slate-900 mb-3">
                      Specialized Services & Procedures
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {provider.services.map((srv, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span className="text-xs font-semibold text-slate-900">{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animals Treated */}
                  <div>
                    <h3 className="text-base font-bold font-manrope text-slate-900 mb-2">
                      Animals Treated
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.species.map((sp, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-100 text-xs font-semibold"
                        >
                          🐾 {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Facilities & Infrastructure */}
                  {provider.facilities.length > 0 && (
                    <div>
                      <h3 className="text-base font-bold font-manrope text-slate-900 mb-2.5">
                        Clinic Facilities & Infrastructure
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {provider.facilities.map((fac, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center space-x-2 text-xs text-slate-700"
                          >
                            <Building className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Address & Timings */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-sm font-bold font-manrope text-slate-900">
                      Location & Working Hours
                    </h3>
                    
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">{provider.address}</p>
                          {provider.landmark && <p className="text-slate-500">Landmark: {provider.landmark}</p>}
                          <p className="text-slate-500">PIN: {provider.pincode}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span>{provider.openingHours}</span>
                      </div>
                    </div>

                    {/* Google Maps link */}
                    <a
                      id="google-maps-directions-link"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        provider.name + ' ' + provider.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:underline pt-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps for turn-by-turn directions</span>
                    </a>
                  </div>
                </>
              )}

              {activeTab === 'doctors' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold font-manrope text-slate-900">
                    Veterinary Doctors & Specialists
                  </h3>
                  {provider.doctors.length === 0 ? (
                    <p className="text-xs text-slate-500">Doctor details available on clinic visit.</p>
                  ) : (
                    provider.doctors.map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 shadow-xs"
                      >
                        <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center flex-shrink-0 font-bold text-lg font-manrope">
                          {doc.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-teal-700 border border-slate-200">
                              {doc.experience}
                            </span>
                          </div>
                          <p className="text-xs text-teal-700 font-semibold">{doc.designation}</p>
                          <p className="text-xs text-slate-500">{doc.degree}</p>
                          {doc.specialization && (
                            <p className="text-xs text-slate-700">Specialty: <span className="font-semibold">{doc.specialization}</span></p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold font-manrope text-slate-900">
                      Verified Pet Parent Experiences
                    </h3>
                    <div className="flex items-center space-x-1.5 text-sm font-bold text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{provider.rating} / 5.0</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {provider.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                              {rev.author[0]}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                                {rev.verifiedPatient && (
                                  <span className="text-[10px] text-teal-700 font-semibold flex items-center">
                                    <Check className="w-3 h-3 mr-0.5" /> Verified Patient
                                  </span>
                                )}
                              </div>
                              {rev.petType && (
                                <span className="text-[11px] text-slate-500">Pet: {rev.petType}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(rev.rating)
                                    ? 'fill-orange-400 text-orange-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                        <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Action Booking & Call Card */}
            <div className="space-y-4">
              <div className="sticky top-4 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Standard Consultation Fee
                  </span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 font-manrope">
                      ₹{provider.consultationFee}
                    </span>
                    <span className="text-xs text-slate-500">/ in-clinic visit</span>
                  </div>
                  <p className="text-[11px] text-teal-700 mt-1 font-semibold flex items-center">
                    <Check className="w-3 h-3 mr-1" /> No booking or convenience charge
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    id="modal-book-appointment-btn"
                    onClick={() => {
                      onClose();
                      onBookAppointment(provider);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment Slot</span>
                  </button>

                  <a
                    id="modal-call-clinic-direct-btn"
                    href={`tel:${provider.phone.replace(/\s+/g, '')}`}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 text-sm font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <PhoneCall className="w-4 h-4 text-teal-600" />
                    <span>Call: {provider.phone}</span>
                  </a>

                  {provider.emergencyPhone && (
                    <a
                      id="modal-emergency-direct-call"
                      href={`tel:${provider.emergencyPhone.replace(/\s+/g, '')}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>24/7 Emergency Line: {provider.emergencyPhone}</span>
                    </a>
                  )}
                </div>

                {/* Trust Highlights */}
                <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>PawCare Verified Credentials</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-teal-600" />
                    <span>Registered with VCI (Veterinary Council)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
