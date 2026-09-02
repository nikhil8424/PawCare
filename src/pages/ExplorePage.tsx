import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  List, 
  Map as MapIcon, 
  AlertTriangle, 
  ShieldCheck, 
  Check, 
  X, 
  ChevronDown,
  Sparkles,
  Stethoscope,
  Building,
  Ambulance,
  HeartHandshake
} from 'lucide-react';
import { Provider, CareCategory, FilterState } from '../types';
import { ProviderCard } from '../components/ProviderCard';
import { InteractiveMap } from '../components/InteractiveMap';

interface ExplorePageProps {
  providers: Provider[];
  initialCategory: CareCategory;
  initialQuery?: string;
  onSelectProvider: (provider: Provider) => void;
  onBookAppointment: (provider: Provider) => void;
  onOpenEmergencyModal: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  providers,
  initialCategory,
  initialQuery = '',
  onSelectProvider,
  onBookAppointment,
  onOpenEmergencyModal
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CareCategory>(initialCategory);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number | null>(null); // null means all
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'distance' | 'rating' | 'fee_low'>('recommended');
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [mapSelectedProvider, setMapSelectedProvider] = useState<Provider | null>(null);

  const CATEGORY_TABS = [
    { id: 'all' as CareCategory, label: 'All Services', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'vet' as CareCategory, label: 'Vet Clinics', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'emergency' as CareCategory, label: '24/7 Emergency', icon: <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> },
    { id: 'ambulance' as CareCategory, label: 'Ambulances', icon: <Ambulance className="w-3.5 h-3.5 text-sky-600" /> },
    { id: 'ngo' as CareCategory, label: 'NGO / Rescue', icon: <HeartHandshake className="w-3.5 h-3.5 text-teal-700" /> },
    { id: 'boarding' as CareCategory, label: 'Boarding', icon: <Building className="w-3.5 h-3.5 text-orange-600" /> }
  ];

  const SPECIES_OPTIONS = ['Dogs', 'Cats', 'Birds', 'Rabbits', 'Exotics', 'Community Animals'];

  // Filter & Sort Logic
  const filteredProviders = useMemo(() => {
    return providers
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchLoc = p.location.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
          const matchService = p.services.some((s) => s.toLowerCase().includes(q));
          const matchSpecies = p.species.some((sp) => sp.toLowerCase().includes(q));
          const matchDoctor = p.doctors.some((d) => d.name.toLowerCase().includes(q));
          if (!matchName && !matchLoc && !matchService && !matchSpecies && !matchDoctor) {
            return false;
          }
        }

        // Open Now
        if (openNowOnly && !p.isOpenNow) {
          return false;
        }

        // Emergency Only
        if (emergencyOnly && !p.emergencyAvailable) {
          return false;
        }

        // Max Distance
        if (maxDistance !== null && p.distance > maxDistance) {
          return false;
        }

        // Species
        if (selectedSpecies.length > 0) {
          const hasSpecies = selectedSpecies.every((sp) => p.species.includes(sp));
          if (!hasSpecies) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') return a.distance - b.distance;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fee_low') return a.consultationFee - b.consultationFee;
        // Default recommended: verified first, then rating
        return b.rating * (b.verified ? 1.2 : 1.0) - a.rating * (a.verified ? 1.2 : 1.0);
      });
  }, [
    providers,
    selectedCategory,
    searchQuery,
    openNowOnly,
    emergencyOnly,
    maxDistance,
    selectedSpecies,
    sortBy
  ]);

  const toggleSpecies = (sp: string) => {
    if (selectedSpecies.includes(sp)) {
      setSelectedSpecies(selectedSpecies.filter((s) => s !== sp));
    } else {
      setSelectedSpecies([...selectedSpecies, sp]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOpenNowOnly(false);
    setEmergencyOnly(false);
    setMaxDistance(null);
    setSelectedSpecies([]);
    setSortBy('recommended');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Search Header & Filter Controls Bar */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        
        {/* Search Input and View Switcher */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-teal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="explore-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by clinic name, doctor, area (e.g. Bandra, Andheri), or service..."
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch sm:self-auto justify-center">
            <button
              id="view-mode-split"
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'split' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split</span>
            </button>
            <button
              id="view-mode-list"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
            <button
              id="view-mode-map"
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'map' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              id={`filter-cat-${tab.id}`}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 transition-all flex-shrink-0 cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Chips & Sort Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-200">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Open Now Chip */}
            <button
              id="filter-open-now"
              onClick={() => setOpenNowOnly(!openNowOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                openNowOnly
                  ? 'bg-teal-50 text-teal-700 border border-teal-300'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {openNowOnly && <Check className="w-3 h-3 text-teal-600" />}
              <span>Open Now</span>
            </button>

            {/* Emergency 24/7 Chip */}
            <button
              id="filter-emergency-only"
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                emergencyOnly
                  ? 'bg-red-600 text-white border border-red-600'
                  : 'bg-white border border-slate-200 text-red-600 hover:bg-red-50'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>24/7 Emergency</span>
            </button>

            {/* Distance Filter */}
            <button
              id="filter-distance-5km"
              onClick={() => setMaxDistance(maxDistance === 5 ? null : 5)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                maxDistance === 5
                  ? 'bg-teal-50 text-teal-700 border border-teal-300'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Within 5 km</span>
            </button>

            {/* Species Dropdown / Quick Chips */}
            <div className="flex items-center space-x-1">
              {['Dogs', 'Cats'].map((sp) => (
                <button
                  key={sp}
                  id={`filter-species-${sp.toLowerCase()}`}
                  onClick={() => toggleSpecies(sp)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedSpecies.includes(sp)
                      ? 'bg-teal-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>

            {(openNowOnly || emergencyOnly || maxDistance || selectedSpecies.length > 0 || searchQuery) && (
              <button
                id="clear-all-filters-btn"
                onClick={clearFilters}
                className="text-xs text-red-600 font-semibold hover:underline ml-1 cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Sort By Select */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort:</span>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
            >
              <option value="recommended">Recommended & Verified</option>
              <option value="distance">Nearest Distance (km)</option>
              <option value="rating">Highest User Rating</option>
              <option value="fee_low">Consultation Fee (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Counter Bar */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-500">
          Showing <span className="font-bold text-slate-900">{filteredProviders.length}</span> animal care providers in Mumbai
        </p>

        <button
          onClick={onOpenEmergencyModal}
          className="text-xs font-bold text-red-600 hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Need Emergency Help?</span>
        </button>
      </div>

      {/* Main Content Layout (Split / List / Map) */}
      {filteredProviders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-manrope text-slate-900">No animal care providers matched your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try loosening your search terms, expanding distance, or clearing category filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* List Column */}
          <div
            className={`space-y-4 ${
              viewMode === 'map'
                ? 'hidden'
                : viewMode === 'list'
                ? 'lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0'
                : 'lg:col-span-7'
            }`}
          >
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                onMouseEnter={() => setHoveredProviderId(provider.id)}
                onMouseLeave={() => setHoveredProviderId(null)}
              >
                <ProviderCard
                  provider={provider}
                  onSelect={onSelectProvider}
                  onBook={onBookAppointment}
                  isHighlighted={mapSelectedProvider?.id === provider.id || hoveredProviderId === provider.id}
                />
              </div>
            ))}
          </div>

          {/* Interactive Map Column (Sticky on Desktop) */}
          <div
            className={`sticky top-24 ${
              viewMode === 'list'
                ? 'hidden'
                : viewMode === 'map'
                ? 'lg:col-span-12 h-[75vh]'
                : 'lg:col-span-5 h-[580px] lg:h-[720px]'
            }`}
          >
            <InteractiveMap
              providers={filteredProviders}
              selectedProvider={mapSelectedProvider}
              onSelectProvider={(p) => {
                setMapSelectedProvider(p);
                onSelectProvider(p);
              }}
              hoveredProviderId={hoveredProviderId}
            />
          </div>
        </div>
      )}
    </div>
  );
};
