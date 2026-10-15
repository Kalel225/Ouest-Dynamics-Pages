import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Methodology } from './components/Methodology';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { LoadingScreen } from './components/LoadingScreen';
import { LanguagePromptBanner } from './components/LanguagePromptBanner';
import { MobileBottomBar } from './components/MobileBottomBar';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';

function MainApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('web');
  const [showLoading, setShowLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsLoaded(true);
  };

  const handleOpenProjectModal = (serviceKey?: string) => {
    if (serviceKey) {
      setSelectedService(serviceKey);
    }
    setModalOpen(true);
  };

  const handleSelectServiceFromCard = (serviceKey: string) => {
    setSelectedService(serviceKey);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    const servicesSection = document.getElementById('expertises');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateFromModal = (serviceKey: string) => {
    setSelectedService(serviceKey);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F4F6] selection:bg-[#D4AF37] selection:text-[#0B0B0B] font-body relative overflow-x-hidden w-full pb-20 sm:pb-0">
      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Device Language Translation Banner */}
      <LanguagePromptBanner />

      {/* Top Navbar */}
      <Navbar
        onOpenProjectModal={() => handleOpenProjectModal()}
      />

      <main className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section 1 : Hero */}
        <Hero
          onOpenProjectModal={() => handleOpenProjectModal()}
          onExploreServices={handleExploreServices}
          isLoaded={isLoaded}
        />

        {/* Section 2 : 4 Main Services */}
        <Services onSelectService={handleSelectServiceFromCard} />

        {/* Section 3 : 3-Step Simple Methodology & Guarantees */}
        <Methodology />

        {/* Section 4 : Simple & Reassuring Contact Form */}
        <ContactForm preselectedService={selectedService} />
      </main>

      {/* Footer with Social Links & Privacy Policy */}
      <Footer onOpenPrivacyPolicy={() => setPrivacyModalOpen(true)} />

      {/* Mobile Ergonomic Bottom Action Bar */}
      <MobileBottomBar onOpenProjectModal={() => handleOpenProjectModal()} />

      {/* Project Scoping Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigateToForm={handleNavigateFromModal}
        initialService={selectedService}
      />

      {/* On-Demand Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <MainApp />
      </CurrencyProvider>
    </LanguageProvider>
  );
}
