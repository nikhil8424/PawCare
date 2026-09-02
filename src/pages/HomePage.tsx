import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  AlertTriangle, 
  ChevronRight, 
  ShieldCheck, 
  Stethoscope, 
  Ambulance, 
  HeartHandshake, 
  Building, 
  ArrowRight,
  Star,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Provider, CareCategory } from '../types';
import { ProviderCard } from '../components/ProviderCard';

interface HomePageProps {
  providers: Provider[];
  onSelectCategory: (category: CareCategory) => void;
  onSelectProvider: (provider: Provider) => void;
  onBookAppointment: (provider: Provider) => void;
  onNavigateToSearch: (query: string) => void;
  onNavigateToAIHealth: () => void;
  onOpenEmergencyModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  providers,
  onSelectCategory,
  onSelectProvider,
  onBookAppointment,
  onNavigateToSearch,
  onNavigateToAIHealth,
  onOpenEmergencyModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const POPULAR_SEARCHES = [
    'Vaccination',
    'Emergency Care',
    'Dog Surgery',
    'Cat Doctor',
    'Ambulance',
    'Ultrasound',
    'NGO Rescue',
    'Pet Boarding'
  ];

  const CATEGORIES = [
    {
      id: 'vet' as CareCategory,
      title: 'Vet Consult',
      subtitle: 'Top Clinics & Doctors',
      icon: <Stethoscope className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50/70 hover:bg-teal-50 border-teal-100',
      badge: '120+ Vets'
    },
    {
      id: 'emergency' as CareCategory,
      title: 'Emergency',
      subtitle: '24/7 Critical Trauma',
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      bg: 'bg-red-50/70 hover:bg-red-50 border-red-100',
      badge: '24/7 Open'
    },
    {
      id: 'ambulance' as CareCategory,
      title: 'Ambulance',
      subtitle: 'Rapid Pet Transit',
      icon: <Ambulance className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50/70 hover:bg-sky-50 border-sky-100',
      badge: 'Oxygen On-Board'
    },
    {
      id: 'ngo' as CareCategory,
      title: 'NGO & Rescue',
      subtitle: 'Stray Help & Adoption',
      icon: <HeartHandshake className="w-6 h-6 text-teal-700" />,
      bg: 'bg-slate-50 hover:bg-slate-100 border-slate-200',
      badge: 'Free / ABC'
    },
    {
      id: 'boarding' as CareCategory,
      title: 'Boarding',
      subtitle: 'Resorts & Daycare',
      icon: <Building className="w-6 h-6 text-orange-600" />,
      bg: 'bg-orange-50/70 hover:bg-orange-50 border-orange-100',
      badge: 'CCTV Access'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateToSearch(searchQuery.trim());
    } else {
      onNavigateToSearch('');
    }
  };

  const topRecommended = providers.slice(0, 4);

  return (
    <div className="space-y-10 sm:space-y-14 pb-12">
      
      {/* Hero Section with Dog Background Image */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white shadow-xl min-h-[460px] sm:min-h-[500px] flex items-center">
        
        {/* Background Image Layer */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoOk9Gp_T3oCV3STnUO4SpbSftk2JM1u1w1wpEiePhGLj9UECSFjHpuEp9Xf7nPHdKPhkIuQJXTcz22HsNrsEwTD_86ylUS9uJaEOskY9JrolqSEhcvJNa_FTPoHVmGtVaJSfrVputkjjyqRnP8LN9cFnBG8ZC5cu4vZu3oQzdKP3uUPlLKvPwdSC6HFTIJJSQgW5po1tR6OMoIk7yVzOaCHXdNcjPjlAllpdaS5zVZVtZQJdncZGyA"
          alt="PawCare Hero Dog"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-right opacity-35 mix-blend-luminosity"
        />

        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/80 to-transparent" />

        <div className="relative z-10 max-w-2xl px-6 sm:px-10 py-10 space-y-6">
          
          {/* 24/7 Care Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            <span>24/7 Verified Animal Healthcare Discovery in India</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-manrope tracking-tight leading-tight">
              Find the right care for your pet.
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed font-normal">
              Discover trusted veterinarians, 24/7 emergency hospitals, ambulances, and analyze complex pet medical reports instantly.
            </p>
          </div>

          {/* Search Box Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200"
          >
            <div className="flex items-center space-x-2.5 px-3 flex-1 w-full text-slate-800">
              <Search className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clinic, doctor, treatment, or area (e.g. Bandra)..."
                className="w-full text-xs sm:text-sm font-medium focus:outline-none bg-transparent py-2 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              id="hero-search-submit-btn"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center justify-center space-x-2 flex-shrink-0 cursor-pointer"
            >
              <span>Search Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Search Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-teal-100/80 font-medium text-[11px]">Popular:</span>
            {POPULAR_SEARCHES.slice(0, 5).map((term, idx) => (
              <button
                key={idx}
                id={`popular-tag-${idx}`}
                onClick={() => onNavigateToSearch(term)}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors backdrop-blur-xs cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* High-Priority 24/7 Emergency Care Banner */}
      <section className="bg-red-50/90 border-2 border-red-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                CRITICAL CARE
              </span>
              <h3 className="text-base sm:text-lg font-bold font-manrope text-red-700">
                Emergency? Find Help Now.
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-0.5 max-w-xl">
              Immediate medical attention for trauma, accidental poisoning, breathing distress, or ambulance transit across Mumbai.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 w-full md:w-auto">
          <button
            id="emergency-banner-sos-btn"
            onClick={onOpenEmergencyModal}
            className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>View 24/7 Vets & SOS</span>
          </button>
          <a
            id="emergency-banner-call-1962"
            href="tel:1962"
            className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-red-700 flex items-center justify-center space-x-1 cursor-pointer"
          >
            <span>Dial 1962</span>
          </a>
        </div>
      </section>

      {/* Category Discovery Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-manrope text-slate-900">
              Explore Animal Care Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse verified pet healthcare providers by specialty
            </p>
          </div>
          <button
            id="view-all-services-link"
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all group flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer ${cat.bg}`}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 font-manrope">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cat.subtitle}</p>
                </div>
              </div>

              <div className="pt-3 mt-2 flex items-center justify-between text-[11px] font-bold text-teal-700">
                <span>{cat.badge}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PawCare AI Spotlight Card */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white p-6 sm:p-10 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-semibold border border-orange-400/30">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>PawCare AI Document Analyzer</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-manrope leading-tight">
              Don’t let complex lab reports confuse you.
            </h2>

            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-xl">
              Upload your pet’s CBC blood panels, serum biochemistry reports, urinalysis, or prescriptions. PawCare AI translates clinical values into plain English and prepares smart questions to ask your veterinarian.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-try-ai-health-btn"
                onClick={onNavigateToAIHealth}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center space-x-2 transition-all transform active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upload Report & Analyze</span>
              </button>

              <button
                id="hero-sample-ai-btn"
                onClick={onNavigateToAIHealth}
                className="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold transition-colors backdrop-blur-xs cursor-pointer"
              >
                Try with Sample CBC
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-white/90 pb-2 border-b border-white/15">
                <span>Sample Report Preview</span>
                <span className="text-orange-300">Max (Canine)</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/10 flex items-center justify-between">
                  <span>WBC (White Blood Cells)</span>
                  <span className="font-bold text-red-200">18.4 (Mild High)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 flex items-center justify-between">
                  <span>Hemoglobin & Platelets</span>
                  <span className="font-bold text-teal-200">Normal Range</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/20 text-[11px] text-white/80">
                💡 <span className="font-semibold">AI Vet Question:</span> "Should we repeat CBC after 10 days to monitor inflammation?"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Providers Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-manrope text-slate-900">
              Top Recommended Vets in Mumbai
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Highest rated clinics with verified facilities and patient reviews
            </p>
          </div>

          <button
            id="view-all-recommended-btn"
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Explore All ({providers.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {topRecommended.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onSelect={onSelectProvider}
              onBook={onBookAppointment}
            />
          ))}
        </div>
      </section>

      {/* Why Pet Parents Trust PawCare */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-manrope text-slate-900">
            Designed for Indian Pet Parents & Rescuers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Empowering every animal lover with quick access to accredited doctors and transparent clinical insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-manrope">Verified Practitioners</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every clinic and veterinarian on PawCare has their VCI / State Veterinary Council credentials verified.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 border border-red-100 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-manrope">Rapid Emergency Network</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct hotlines and instant ambulance contacts for traumatic emergencies without bureaucratic delays.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 border border-orange-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-manrope">AI Medical Document Clarity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Demystify diagnostic blood panels, urinalysis, and X-ray summaries to have educated discussions with your vet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
