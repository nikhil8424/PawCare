import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  User, 
  Stethoscope, 
  MapPin, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Provider, PetProfile } from '../types';
import { MOCK_USER_PETS } from '../data/sampleReports';

interface AppointmentModalProps {
  provider: Provider | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (bookingDetails: any) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  provider,
  isOpen,
  onClose,
  onBookingConfirmed
}) => {
  const [selectedPet, setSelectedPet] = useState<string>(MOCK_USER_PETS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 10:30 AM');
  const [visitReason, setVisitReason] = useState<string>('Routine Health Check & Vaccination');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !provider) return null;

  const DATES = [
    { label: 'Today (Walk-in Slot)', time: '4:30 PM - 5:00 PM', available: provider.isOpenNow },
    { label: 'Tomorrow (Morning)', time: '10:30 AM - 11:00 AM', available: true },
    { label: 'Tomorrow (Evening)', time: '6:00 PM - 6:30 PM', available: true },
    { label: 'Day After Tomorrow', time: '11:30 AM - 12:00 PM', available: true }
  ];

  const REASONS = [
    'Routine Health Check & Vaccination',
    'Fever, Lethargy, or Loss of Appetite',
    'Skin Allergy, Itching, or Fur Loss',
    'Stomach Upset or Vomiting',
    'Medical Report Discussion / Second Opinion',
    'Dental Scaling & Cleaning'
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    const pet = MOCK_USER_PETS.find((p) => p.id === selectedPet) || MOCK_USER_PETS[0];
    setTimeout(() => {
      onBookingConfirmed({
        id: 'book-' + Date.now(),
        providerName: provider.name,
        providerLocation: provider.location,
        petName: pet.name,
        petSpecies: pet.species,
        slot: selectedDate,
        reason: visitReason,
        fee: provider.consultationFee,
        phone: provider.phone
      });
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="appointment-booking-modal"
        className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative"
      >
        {/* Header */}
        <div className="bg-teal-700 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-teal-100 tracking-wider">
              Fast In-Clinic Booking
            </span>
            <h2 className="text-xl font-bold font-manrope">Book Appointment Slot</h2>
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-manrope">Appointment Confirmed!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              We’ve reserved your slot with <span className="font-bold">{provider.name}</span>. An SMS confirmation with clinic directions has been sent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-5">
            
            {/* Clinic Mini Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
              <img
                src={provider.imageUrl}
                alt={provider.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-900 truncate">{provider.name}</h4>
                <p className="text-[11px] text-slate-500 truncate flex items-center">
                  <MapPin className="w-3 h-3 text-teal-600 mr-1" />
                  {provider.location}
                </p>
                <p className="text-[11px] font-bold text-teal-700 mt-0.5">
                  Consultation: ₹{provider.consultationFee} (Pay at clinic)
                </p>
              </div>
            </div>

            {/* Step 1: Select Pet */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                1. Select Patient (Pet)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {MOCK_USER_PETS.map((pet) => (
                  <button
                    type="button"
                    key={pet.id}
                    id={`select-pet-${pet.id}`}
                    onClick={() => setSelectedPet(pet.id)}
                    className={`p-2.5 rounded-xl border flex items-center space-x-2.5 text-left transition-all cursor-pointer ${
                      selectedPet === pet.id
                        ? 'border-teal-600 bg-teal-50 text-teal-800 font-bold ring-2 ring-teal-600/20 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={pet.avatarUrl}
                      alt={pet.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold">{pet.name}</p>
                      <p className="text-[10px] text-slate-500">{pet.breed}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Date & Time Slot */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                2. Choose Time Slot
              </label>
              <div className="space-y-2">
                {DATES.map((slot, idx) => (
                  <label
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedDate === `${slot.label}, ${slot.time}`
                        ? 'border-teal-600 bg-teal-50/60 text-slate-900 ring-1 ring-teal-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="radio"
                        name="appointment_slot"
                        checked={selectedDate === `${slot.label}, ${slot.time}`}
                        onChange={() => setSelectedDate(`${slot.label}, ${slot.time}`)}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{slot.label}</span>
                        <span className="text-[11px] text-slate-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-teal-600" />
                          {slot.time}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
                      Available
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Reason for consultation */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                3. Reason for Visit
              </label>
              <select
                id="visit-reason-select"
                value={visitReason}
                onChange={(e) => setVisitReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {REASONS.map((r, idx) => (
                  <option key={idx} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                id="confirm-booking-submit-btn"
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Confirm Appointment (No Pre-Payment Required)
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-2 flex items-center justify-center">
                <ShieldCheck className="w-3 h-3 text-teal-600 mr-1" />
                Guaranteed slot booking. Free cancellation at any time.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
