import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  Calendar, 
  AlertCircle, 
  ChevronRight,
  Stethoscope,
  Heart
} from 'lucide-react';
import { Provider } from '../types';

interface ProviderCardProps {
  provider: Provider;
  onSelect: (provider: Provider) => void;
  onBook: (provider: Provider) => void;
  isHighlighted?: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onSelect,
  onBook,
  isHighlighted = false
}) => {
  const primaryDoctor = provider.doctors[0];

  return (
    <div
      id={`provider-card-${provider.id}`}
      className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-md ${
        isHighlighted
          ? 'border-teal-600 ring-2 ring-teal-600/20 shadow-md'
          : 'border-slate-200 hover:border-teal-600/40'
      }`}
    >
      <div>
        {/* Card Header & Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
          <img
            src={provider.imageUrl}
            alt={provider.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              {provider.verified && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-teal-700 shadow-xs flex items-center space-x-1 backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Verified</span>
                </span>
              )}
              {provider.emergencyAvailable && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600 text-white shadow-xs flex items-center space-x-1 animate-pulse">
                  <span>24/7 Care</span>
                </span>
              )}
            </div>

            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur-md">
              {provider.type}
            </span>
          </div>

          {/* Bottom Overlay Info (Rating & Distance) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
            <div className="flex items-center space-x-1.5 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
              <span className="text-xs font-bold">{provider.rating.toFixed(1)}</span>
              <span className="text-[10px] text-white/80">({provider.reviewCount})</span>
            </div>

            <div className="flex items-center space-x-1 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-md text-xs font-semibold">
              <MapPin className="w-3 h-3 text-teal-400" />
              <span>{provider.distance} km away</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          
          {/* Clinic Name & Location */}
          <div>
            <h3 
              onClick={() => onSelect(provider)}
              className="text-base sm:text-lg font-bold text-slate-900 font-manrope group-hover:text-teal-700 transition-colors cursor-pointer line-clamp-1"
            >
              {provider.name}
            </h3>
            <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
              <span>{provider.location}</span>
              <span>•</span>
              <span className={provider.isOpenNow ? 'text-teal-600 font-semibold' : 'text-red-600 font-semibold'}>
                {provider.isOpenNow ? (provider.closesAt ? `Open until ${provider.closesAt.replace('today', '')}` : 'Open Now') : 'Closed'}
              </span>
            </p>
          </div>

          {/* Lead Doctor or Specialization snippet */}
          {primaryDoctor ? (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 border border-teal-100">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 truncate">{primaryDoctor.name}</p>
                <p className="text-[11px] text-slate-500 truncate">
                  {primaryDoctor.degree} • {primaryDoctor.experience}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-600 line-clamp-2">{provider.tagline}</p>
          )}

          {/* Key Services Tags */}
          <div className="flex flex-wrap gap-1.5">
            {provider.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
              >
                {service}
              </span>
            ))}
            {provider.services.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md text-[11px] font-semibold text-slate-400">
                +{provider.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 border-t border-slate-100 mt-2">
        <div className="flex items-center justify-between pt-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Consultation Fee</span>
            <span className="text-sm font-bold text-slate-900">
              ₹{provider.consultationFee} <span className="text-[10px] font-normal text-slate-500">onwards</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              id={`call-provider-${provider.id}`}
              href={`tel:${provider.phone.replace(/\s+/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
              title="Call Clinic"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            <button
              id={`view-details-${provider.id}`}
              onClick={() => onSelect(provider)}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
            >
              <span>View Clinic</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
