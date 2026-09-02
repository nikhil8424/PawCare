import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  FileText, 
  Calendar, 
  PhoneCall, 
  Plus, 
  Check, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  MapPin,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PetProfile, AIReportResult, Provider } from '../types';
import { MOCK_USER_PETS, SAMPLE_TEST_DOCUMENTS } from '../data/sampleReports';

interface ProfilePageProps {
  savedReports: AIReportResult[];
  bookedAppointments: any[];
  onViewReport: (report: AIReportResult) => void;
  onNavigateToAIHealth: () => void;
  onNavigateToExplore: () => void;
  onOpenEmergencyModal: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  savedReports,
  bookedAppointments,
  onViewReport,
  onNavigateToAIHealth,
  onNavigateToExplore,
  onOpenEmergencyModal
}) => {
  const [pets, setPets] = useState<PetProfile[]>(MOCK_USER_PETS as any);
  const [selectedPetId, setSelectedPetId] = useState<string>(pets[0]?.id || 'pet-1');
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState('Dog');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [newPetAge, setNewPetAge] = useState('');

  const activePet = pets.find((p) => p.id === selectedPetId) || pets[0];

  // Default sample history if user hasn't generated any yet
  const displayReports = savedReports.length > 0 
    ? savedReports 
    : SAMPLE_TEST_DOCUMENTS.map((s) => s.mockAnalysis as any);

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName.trim()) return;

    const newPet: PetProfile = {
      id: 'pet-' + Date.now(),
      name: newPetName.trim(),
      species: newPetSpecies,
      breed: newPetBreed.trim() || 'Indie / Mixed',
      age: newPetAge.trim() || '1 Year',
      weight: '12 kg',
      gender: 'Male',
      avatarUrl: newPetSpecies === 'Cat' 
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80',
      lastVaccination: 'Vaccination Due'
    };

    setPets([...pets, newPet]);
    setSelectedPetId(newPet.id);
    setShowAddPetModal(false);
    setNewPetName('');
    setNewPetBreed('');
    setNewPetAge('');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM5Kmkocxb_0PziBjeiIb3zRNM1Lzy7FjJszLnllFatNAU-9wwbocM2z-n635ramwpxOfslhu8IVbcSw4nHCNFw0j6F2VXmwBo1N1G8-XL3GpTkD7jCZ1ZHyxUDcL_xih0f9DyCcMkWHnWKHc-R6JepX0NvZdc9nKs1X4qru73teXjtqGrn0Fyq70rNfO40tl2Dr1dpHilq9x7r5e6kNpY8DoiR137rBFlH23x-B7sO1cnPH7ECPF2yA"
            alt="Rahul S."
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-teal-500/15 shadow-sm"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold font-manrope text-slate-900">
                Rahul Sharma
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                Verified Pet Parent
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bandra West, Mumbai • Member since 2024
            </p>
            <p className="text-xs text-teal-700 font-semibold mt-1">
              {pets.length} Registered Pets • {displayReports.length} AI Medical Records
            </p>
          </div>
        </div>

        <button
          id="sos-profile-top-btn"
          onClick={onOpenEmergencyModal}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-2 shadow-xs transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Mumbai Emergency Helpline (1962)</span>
        </button>
      </div>

      {/* Pet Selection Carousel & Switcher */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-manrope text-slate-900">
            My Pet Profiles
          </h2>
          <button
            id="add-pet-btn"
            onClick={() => setShowAddPetModal(true)}
            className="text-xs font-bold text-teal-700 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Pet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              id={`pet-card-${pet.id}`}
              onClick={() => setSelectedPetId(pet.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                selectedPetId === pet.id
                  ? 'bg-white border-teal-600 ring-2 ring-teal-600/20 shadow-md'
                  : 'bg-white/70 border-slate-200 hover:bg-white hover:border-teal-500/40 shadow-xs'
              }`}
            >
              <img
                src={pet.avatarUrl}
                alt={pet.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-200 flex-shrink-0"
              />
              <div className="overflow-hidden flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 font-manrope truncate">
                    {pet.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-teal-700 border border-slate-200">
                    {pet.species}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{pet.breed} • {pet.age}</p>
                <div className="flex items-center space-x-2 text-[11px] text-slate-600 pt-1">
                  <span>Weight: {pet.weight}</span>
                  {pet.bloodGroup && <span>• Blood: {pet.bloodGroup}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Pet Health Overview Card */}
      {activePet && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-manrope text-slate-900">
                  {activePet.name}'s Medical Profile & Care Log
                </h3>
                <p className="text-xs text-slate-500">Preventive schedule & identification details</p>
              </div>
            </div>

            <button
              onClick={onNavigateToAIHealth}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Analyze New Lab Test</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">Microchip / Tag ID</span>
              <p className="font-bold text-slate-900">{activePet.microchipId || 'Not registered'}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">Vaccination Status</span>
              <p className="font-bold text-teal-700">{activePet.lastVaccination || 'Up to date'}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">Allergies / Flags</span>
              <p className="font-bold text-orange-700">
                {activePet.knownConditions?.join(', ') || 'No known allergies'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Booked Appointments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-manrope text-slate-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <span>Upcoming Veterinary Appointments</span>
          </h2>
          <button
            onClick={onNavigateToExplore}
            className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
          >
            Find a Clinic
          </button>
        </div>

        {bookedAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500 space-y-2 shadow-xs">
            <p>No active upcoming appointments booked.</p>
            <button
              onClick={onNavigateToExplore}
              className="px-4 py-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 font-bold cursor-pointer hover:bg-teal-100 transition-colors"
            >
              Browse Nearby Clinics
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookedAppointments.map((bk, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-teal-600/30 p-5 space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                      Confirmed In-Clinic Slot
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-manrope mt-1">
                      {bk.providerName}
                    </h4>
                    <p className="text-xs text-slate-500">{bk.providerLocation}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">₹{bk.fee}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p><span className="font-bold">Patient:</span> {bk.petName} ({bk.petSpecies})</p>
                  <p><span className="font-bold">Slot:</span> {bk.slot}</p>
                  <p><span className="font-bold">Reason:</span> {bk.reason}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <a
                    href={`tel:${bk.phone}`}
                    className="text-teal-700 font-bold flex items-center space-x-1 hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Clinic</span>
                  </a>
                  <span className="text-[11px] text-slate-400">Pay at reception</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved AI Health Reports History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-manrope text-slate-900 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span>Saved PawCare AI Medical Summaries</span>
          </h2>
          <button
            onClick={onNavigateToAIHealth}
            className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
          >
            + Upload New Document
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayReports.map((rep) => (
            <div
              key={rep.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500/40 p-5 space-y-3 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                    {rep.reportType}
                  </span>
                  <span className="text-[11px] text-slate-400">{rep.date || 'Recent'}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 font-manrope">
                  {rep.petName} • {rep.species}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2">{rep.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${
                  rep.urgencyLevel === 'High / Urgent'
                    ? 'text-red-700'
                    : rep.urgencyLevel === 'Moderate'
                    ? 'text-orange-700'
                    : 'text-teal-700'
                }`}>
                  ● {rep.urgencyLevel} Urgency
                </span>

                <button
                  id={`view-saved-report-${rep.id}`}
                  onClick={() => onViewReport(rep)}
                  className="text-xs font-bold text-teal-700 hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Breakdown</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Pet Modal */}
      {showAddPetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold font-manrope text-slate-900">Add New Pet Profile</h3>
            
            <form onSubmit={handleAddPet} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Pet Name</label>
                <input
                  type="text"
                  required
                  value={newPetName}
                  onChange={(e) => setNewPetName(e.target.value)}
                  placeholder="e.g. Bruno, Coco, Simba"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Species</label>
                  <select
                    value={newPetSpecies}
                    onChange={(e) => setNewPetSpecies(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Age</label>
                  <input
                    type="text"
                    value={newPetAge}
                    onChange={(e) => setNewPetAge(e.target.value)}
                    placeholder="e.g. 2 Years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Breed (Optional)</label>
                <input
                  type="text"
                  value={newPetBreed}
                  onChange={(e) => setNewPetBreed(e.target.value)}
                  placeholder="e.g. Indie, Beagle, Persian"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPetModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
