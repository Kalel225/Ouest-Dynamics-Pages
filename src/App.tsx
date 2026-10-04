import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
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

function MainApp() {
  const [modalOpen, setModalOpen] = useState(false);
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
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F4F6] selection:bg-[#D4AF37] selection:text-[#0B0B0B] font-body relative overflow-x-hidden pb-16 sm:pb-0">
      {/* Luxury Loading Screen with Animated Logo & Transition */}
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Automatic Device Language Translation Prompt */}
      <LanguagePromptBanner />

      {/* Executive Top Bar Navigation (with EN/FR Language Switcher) */}
      <Navbar
        onOpenProjectModal={() => handleOpenProjectModal()}
      />

      <main className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section 1 : Le Hero (Impact Visuel) */}
        <Hero
          onOpenProjectModal={() => handleOpenProjectModal()}
          onExploreServices={handleExploreServices}
          isLoaded={isLoaded}
        />

        {/* Section 2 : Le Triptyque des Expertises (Core Services) */}
        <Services onSelectService={handleSelectServiceFromCard} />

        {/* Section 3 : La Gouvernance & Méthodologie (Preuve de Sécurité) */}
        <Methodology />

        {/* Section 4 : Le Formulaire de Contact Exécutif */}
        <ContactForm preselectedService={selectedService} />
      </main>

      {/* Luxury Footer (Without Paris/Dakar, Only Abidjan, Without Replay Intro) */}
      <Footer />

      {/* Ergonomic Smartphone Bottom Action Bar */}
      <MobileBottomBar onOpenProjectModal={() => handleOpenProjectModal()} />

      {/* Project Initiation Scoping Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigateToForm={handleNavigateFromModal}
        initialService={selectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
