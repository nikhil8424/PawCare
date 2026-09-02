import React, { useState, useEffect } from 'react';
import { CareCategory, Provider, AIReportResult } from './types';
import { MOCK_PROVIDERS } from './data/providers';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { HealthPage } from './pages/HealthPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProviderDetailModal } from './components/ProviderDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'health' | 'profile'>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai (All Areas)');
  const [selectedCategory, setSelectedCategory] = useState<CareCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProviderForDetail, setSelectedProviderForDetail] = useState<Provider | null>(null);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<Provider | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [savedReports, setSavedReports] = useState<AIReportResult[]>([]);
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([
    {
      id: 'init-bk-1',
      providerName: 'Dharma Veterinary Clinic',
      providerLocation: 'Bandra West, Mumbai',
      petName: 'Max',
      petSpecies: 'Dog',
      slot: 'Tomorrow, 10:30 AM',
      reason: 'Routine Health Check & Vaccination',
      fee: 800,
      phone: '+91 98201 44552'
    }
  ]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectCategoryFromHome = (category: CareCategory) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setActiveTab('explore');
  };

  const handleSearchFromHome = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
    setActiveTab('explore');
  };

  const handleSaveReportToProfile = (report: AIReportResult) => {
    setSavedReports((prev) => {
      if (prev.some((r) => r.id === report.id)) return prev;
      return [report, ...prev];
    });
  };

  const handleBookingConfirmed = (booking: any) => {
    setBookedAppointments((prev) => [booking, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5faf8] text-[#171d1c]">
      
      {/* Top Main Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomePage
            providers={MOCK_PROVIDERS}
            onSelectCategory={handleSelectCategoryFromHome}
            onSelectProvider={(p) => setSelectedProviderForDetail(p)}
            onBookAppointment={(p) => setSelectedProviderForBooking(p)}
            onNavigateToSearch={handleSearchFromHome}
            onNavigateToAIHealth={() => setActiveTab('health')}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            providers={MOCK_PROVIDERS}
            initialCategory={selectedCategory}
            initialQuery={searchQuery}
            onSelectProvider={(p) => setSelectedProviderForDetail(p)}
            onBookAppointment={(p) => setSelectedProviderForBooking(p)}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {activeTab === 'health' && (
          <HealthPage
            onFindVet={() => {
              setSelectedCategory('vet');
              setActiveTab('explore');
            }}
            onSaveReportToProfile={handleSaveReportToProfile}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            savedReports={savedReports}
            bookedAppointments={bookedAppointments}
            onViewReport={(rep) => {
              setActiveTab('health');
            }}
            onNavigateToAIHealth={() => setActiveTab('health')}
            onNavigateToExplore={() => setActiveTab('explore')}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('explore');
        }}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
        onNavigateToAIHealth={() => setActiveTab('health')}
      />

      {/* Provider Details Full Modal */}
      <ProviderDetailModal
        provider={selectedProviderForDetail}
        isOpen={Boolean(selectedProviderForDetail)}
        onClose={() => setSelectedProviderForDetail(null)}
        onBookAppointment={(p) => {
          setSelectedProviderForDetail(null);
          setSelectedProviderForBooking(p);
        }}
      />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        provider={selectedProviderForBooking}
        isOpen={Boolean(selectedProviderForBooking)}
        onClose={() => setSelectedProviderForBooking(null)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* 24/7 Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onSelectProvider={(p) => {
          setIsEmergencyModalOpen(false);
          setSelectedProviderForDetail(p);
        }}
      />
    </div>
  );
};

export default App;
