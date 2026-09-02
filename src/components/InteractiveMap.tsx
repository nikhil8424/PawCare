import React, { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Minus, 
  Navigation, 
  Star, 
  PhoneCall, 
  ChevronRight, 
  ShieldCheck,
  Stethoscope,
  Ambulance,
  HeartHandshake,
  Building,
  AlertTriangle
} from 'lucide-react';
import { Provider } from '../types';

interface InteractiveMapProps {
  providers: Provider[];
  selectedProvider: Provider | null;
  onSelectProvider: (provider: Provider) => void;
  hoveredProviderId?: string | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  providers,
  selectedProvider,
  onSelectProvider,
  hoveredProviderId
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [userLocationActive, setUserLocationActive] = useState(true);

  // Approximate coordinate normalization for Mumbai visual area
  // Lat: 18.88 to 19.25, Lng: 72.80 to 73.00
  const minLat = 18.88;
  const maxLat = 19.25;
  const minLng = 72.80;
  const maxLng = 73.00;

  const getPinCoordinates = (lat: number, lng: number) => {
    // Map latitude and longitude to percentage coordinates on the canvas
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Invert Y because latitude goes up north, but screen Y goes down
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    // Keep within bounds
    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(8, Math.min(92, y))
    };
  };

  const getCategoryIcon = (category: Provider['category']) => {
    switch (category) {
      case 'emergency':
        return <AlertTriangle className="w-3 h-3 text-white" />;
      case 'ambulance':
        return <Ambulance className="w-3 h-3 text-white" />;
      case 'ngo':
        return <HeartHandshake className="w-3 h-3 text-white" />;
      case 'boarding':
        return <Building className="w-3 h-3 text-white" />;
      default:
        return <Stethoscope className="w-3 h-3 text-white" />;
    }
  };

  const getPinColor = (p: Provider) => {
    if (p.emergencyAvailable) return 'bg-[#ba1a1a] border-white text-white shadow-[#ba1a1a]/40';
    if (p.category === 'ngo') return 'bg-[#006194] border-white text-white shadow-[#006194]/40';
    if (p.category === 'boarding') return 'bg-[#fd761a] border-white text-white shadow-[#fd761a]/40';
    return 'bg-[#00685f] border-white text-white shadow-[#00685f]/40';
  };

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[580px] bg-[#e6edea] rounded-2xl overflow-hidden border border-[#eaefed] shadow-inner select-none flex flex-col justify-between">
      
      {/* Visual Map Background Layers (Stylized GIS view of Mumbai coast & arterial corridors) */}
      <svg 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-85" 
        preserveAspectRatio="none" 
        viewBox="0 0 800 600"
      >
        <defs>
          <linearGradient id="arabianSeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4e8e5" />
            <stop offset="100%" stopColor="#c5e0dc" />
          </linearGradient>
          <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3f8f6" />
            <stop offset="100%" stopColor="#ebf2ef" />
          </linearGradient>
        </defs>

        {/* Sea background */}
        <rect width="800" height="600" fill="url(#arabianSeaGrad)" />

        {/* Mumbai Peninsula Landmass Vector */}
        <path
          d="M 280,0 C 310,80 340,160 360,240 C 370,290 350,330 330,370 C 310,410 320,470 350,520 C 370,550 360,600 360,600 L 800,600 L 800,0 Z"
          fill="url(#landGrad)"
        />

        {/* Salsette Island / Thane Creek */}
        <path
          d="M 520,0 C 510,120 540,240 560,340 C 590,450 630,520 680,600"
          stroke="#c5e0dc"
          strokeWidth="16"
          fill="none"
        />

        {/* Major Expressways / Arterial Lines */}
        {/* Western Express Highway */}
        <path
          d="M 330,600 C 320,490 325,410 340,320 C 360,200 375,100 390,0"
          stroke="#cbdad5"
          strokeWidth="5"
          strokeDasharray="4 2"
          fill="none"
        />
        {/* Eastern Express Highway */}
        <path
          d="M 440,600 C 430,480 440,360 480,240 C 510,140 520,60 540,0"
          stroke="#cbdad5"
          strokeWidth="4"
          fill="none"
        />
        {/* Bandra-Worli Sea Link */}
        <path
          d="M 320,420 C 300,450 305,480 325,510"
          stroke="#00685f"
          strokeWidth="3"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Area Text Labels */}
        <text x="320" y="360" fill="#6d7a77" fontSize="11" fontWeight="600">Bandra West</text>
        <text x="350" y="270" fill="#6d7a77" fontSize="11" fontWeight="600">Andheri West</text>
        <text x="290" y="300" fill="#6d7a77" fontSize="11" fontWeight="600">Juhu Beach</text>
        <text x="330" y="560" fill="#6d7a77" fontSize="11" fontWeight="600">Colaba / Fort</text>
        <text x="470" y="290" fill="#6d7a77" fontSize="11" fontWeight="600">Powai Lake</text>
        <text x="510" y="110" fill="#6d7a77" fontSize="11" fontWeight="600">Thane MMR</text>
        <text x="120" y="280" fill="#006194" fontSize="12" fontWeight="700" opacity="0.4">Arabian Sea</text>
      </svg>

      {/* Top Map Bar: Status & Provider Count */}
      <div className="relative z-10 p-3 flex items-center justify-between pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#eaefed] shadow-xs flex items-center space-x-2 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-[#00685f] animate-ping" />
          <span className="text-xs font-bold text-[#171d1c]">
            {providers.length} Verified Providers in Area
          </span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#eaefed] text-[11px] font-semibold text-[#3d4947] pointer-events-auto">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00685f]" />
            <span>Clinic / Vet</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
            <span>24/7 Emergency</span>
          </div>
        </div>
      </div>

      {/* Map Interactive Canvas with Provider Markers */}
      <div className="relative flex-1 w-full h-full">
        {providers.map((p) => {
          const coords = getPinCoordinates(p.latitude, p.longitude);
          const isSelected = selectedProvider?.id === p.id;
          const isHovered = hoveredProviderId === p.id;
          const pinClass = getPinColor(p);

          return (
            <div
              key={p.id}
              id={`map-pin-${p.id}`}
              onClick={() => onSelectProvider(p)}
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                transform: `translate(-50%, -50%) scale(${isSelected || isHovered ? 1.25 : 1})`
              }}
              className="absolute z-20 cursor-pointer transition-all duration-200 group"
            >
              {/* Pin Bubble */}
              <div
                className={`relative px-2 py-1 rounded-full border-2 shadow-lg flex items-center space-x-1 transition-all ${pinClass} ${
                  isSelected ? 'ring-4 ring-black/20' : ''
                }`}
              >
                {getCategoryIcon(p.category)}
                <span className="text-[11px] font-bold whitespace-nowrap">
                  {p.name.split(' ')[0]}
                </span>
                {p.rating && (
                  <span className="text-[10px] opacity-90 font-medium">★{p.rating.toFixed(1)}</span>
                )}

                {/* Little triangle arrow below */}
                <div 
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                    p.emergencyAvailable ? 'bg-[#ba1a1a]' : 'bg-[#00685f]'
                  }`} 
                />
              </div>

              {/* Hover Tooltip */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-white rounded-xl shadow-xl border border-[#eaefed] text-left z-30 pointer-events-none animate-in fade-in">
                <p className="text-xs font-bold text-[#171d1c] line-clamp-1">{p.name}</p>
                <p className="text-[10px] text-[#6d7a77]">{p.location} • {p.distance} km</p>
                <div className="flex items-center justify-between mt-1 text-[11px] font-semibold text-[#00685f]">
                  <span>₹{p.consultationFee} fee</span>
                  <span>{p.isOpenNow ? 'Open Now' : 'Closed'}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* User Simulated Current Location Marker (Bandra Bandstand / Khar) */}
        {userLocationActive && (
          <div
            id="user-current-location-marker"
            style={{ left: '42%', top: '56%' }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#00685f]/20 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-[#00685f] border-2 border-white shadow-md flex items-center justify-center text-[8px] text-white font-bold" />
              <div className="absolute top-5 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                You are here (Khar W)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Controls & Selected Preview Card */}
      <div className="relative z-20 p-3 sm:p-4 flex flex-col space-y-3">
        
        {/* Map Utility Controls */}
        <div className="flex justify-end space-x-1.5">
          <button
            id="map-locate-btn"
            onClick={() => setUserLocationActive(!userLocationActive)}
            className="w-8 h-8 rounded-lg bg-white shadow-md border border-[#eaefed] flex items-center justify-center text-[#171d1c] hover:bg-[#f5faf8] transition-colors"
            title="My Location"
          >
            <Navigation className={`w-4 h-4 ${userLocationActive ? 'text-[#00685f]' : 'text-[#6d7a77]'}`} />
          </button>
          <button
            id="map-zoom-in-btn"
            onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
            className="w-8 h-8 rounded-lg bg-white shadow-md border border-[#eaefed] flex items-center justify-center text-[#171d1c] hover:bg-[#f5faf8] transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            id="map-zoom-out-btn"
            onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
            className="w-8 h-8 rounded-lg bg-white shadow-md border border-[#eaefed] flex items-center justify-center text-[#171d1c] hover:bg-[#f5faf8] transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Provider Bottom Drawer Card */}
        {selectedProvider && (
          <div
            id="map-selected-provider-preview"
            className="bg-white rounded-xl shadow-xl border border-[#eaefed] p-3 sm:p-4 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <img
                src={selectedProvider.imageUrl}
                alt={selectedProvider.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="overflow-hidden">
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#171d1c] truncate font-manrope">
                    {selectedProvider.name}
                  </h4>
                  {selectedProvider.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00685f] flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-[#6d7a77] truncate">
                  {selectedProvider.location} • {selectedProvider.distance} km away
                </p>
                <div className="flex items-center space-x-2 text-[11px] font-semibold mt-0.5">
                  <span className="text-[#fd761a]">★ {selectedProvider.rating} ({selectedProvider.reviewCount})</span>
                  <span>•</span>
                  <span className="text-[#00685f]">₹{selectedProvider.consultationFee}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 flex-shrink-0">
              <a
                id={`map-call-btn-${selectedProvider.id}`}
                href={`tel:${selectedProvider.phone.replace(/\s+/g, '')}`}
                className="p-2 rounded-lg bg-[#f5faf8] hover:bg-[#eaefed] border border-[#eaefed] text-[#00685f]"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <button
                id={`map-open-profile-btn-${selectedProvider.id}`}
                onClick={() => onSelectProvider(selectedProvider)}
                className="px-3 py-2 rounded-lg bg-[#00685f] hover:bg-[#008378] text-white text-xs font-bold flex items-center space-x-1 shadow-xs"
              >
                <span>Details</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
