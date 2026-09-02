import React, { useState } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Search, 
  FileText, 
  PhoneCall, 
  Compass, 
  Home, 
  User, 
  Sparkles,
  AlertTriangle,
  Heart
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'explore' | 'health' | 'profile';
  setActiveTab: (tab: 'home' | 'explore' | 'health' | 'profile') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onOpenEmergencyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  onOpenEmergencyModal
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const CITIES = [
    'Mumbai (All Areas)',
    'Bandra & Khar',
    'Andheri & Juhu',
    'South Mumbai (Colaba/Dadar)',
    'Thane & Navi Mumbai',
    'Bengaluru',
    'Delhi NCR',
    'Pune'
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo & City Selector */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-teal-600/20 group-hover:scale-105 transition-transform">
                P
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-teal-900 font-manrope">
                  PawCare<span className="text-orange-500">+</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 -mt-0.5 hidden sm:block">
                  India Animal Care
                </span>
              </div>
            </button>

            {/* Location selector dropdown */}
            <div className="relative">
              <button
                id="city-selector-btn"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span className="max-w-[120px] sm:max-w-[160px] truncate">{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showCityDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowCityDropdown(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Select Coverage Area
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        id={`city-option-${city.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                          selectedCity === city ? 'text-teal-700 font-bold bg-teal-50/80' : 'text-slate-700'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              id="nav-home"
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-teal-50 text-teal-700 border border-teal-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              id="nav-explore"
              onClick={() => setActiveTab('explore')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-teal-50 text-teal-700 border border-teal-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Find Vets & Clinics</span>
            </button>

            <button
              id="nav-health"
              onClick={() => setActiveTab('health')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 relative cursor-pointer ${
                activeTab === 'health'
                  ? 'bg-teal-50 text-teal-700 border border-teal-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>PawCare AI</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
                Report AI
              </span>
            </button>

            <button
              id="nav-profile"
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-teal-50 text-teal-700 border border-teal-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>My Pets & Records</span>
            </button>
          </nav>

          {/* Right Action: Emergency CTA & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              id="emergency-top-btn"
              onClick={onOpenEmergencyModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all transform active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">24/7 Emergency</span>
              <span className="sm:hidden">24/7 SOS</span>
            </button>

            <button
              id="header-user-profile-btn"
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM5Kmkocxb_0PziBjeiIb3zRNM1Lzy7FjJszLnllFatNAU-9wwbocM2z-n635ramwpxOfslhu8IVbcSw4nHCNFw0j6F2VXmwBo1N1G8-XL3GpTkD7jCZ1ZHyxUDcL_xih0f9DyCcMkWHnWKHc-R6JepX0NvZdc9nKs1X4qru73teXjtqGrn0Fyq70rNfO40tl2Dr1dpHilq9x7r5e6kNpY8DoiR137rBFlH23x-B7sO1cnPH7ECPF2yA"
                alt="Rahul S. & Max"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-600/20"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-tight">Rahul S.</span>
                <span className="text-[10px] text-slate-400">Max (Golden)</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          <button
            id="mobile-nav-home"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-teal-600 font-bold' : 'text-slate-400'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            id="mobile-nav-explore"
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
              activeTab === 'explore' ? 'text-teal-600 font-bold' : 'text-slate-400'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Find Vets</span>
          </button>

          <button
            id="mobile-nav-health"
            onClick={() => setActiveTab('health')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors relative ${
              activeTab === 'health' ? 'text-teal-600 font-bold' : 'text-slate-400'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-0.5 text-orange-500" />
            <span className="text-[10px]">Report AI</span>
            <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-orange-500" />
          </button>

          <button
            id="mobile-nav-profile"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'text-teal-600 font-bold' : 'text-slate-400'
            }`}
          >
            <Heart className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">My Pets</span>
          </button>
        </div>
      </div>
    </header>
  );
};
