import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Methodology } from './components/Methodology';
import { FAQ } from './components/FAQ';
import { CTABanner } from './components/CTABanner';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { LoadingScreen } from './components/LoadingScreen';
import { NotFoundPage } from './components/NotFoundPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { CookieBanner } from './components/CookieBanner';
import { LanguagePromptBanner } from './components/LanguagePromptBanner';
import { MobileBottomBar } from './components/MobileBottomBar';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { AIChatbot } from './components/AIChatbot';

type ViewMode = 'home' | 'privacy' | 'terms' | '404';

function resolveViewModeFromLocation(): ViewMode {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (
    hash === '#privacy' ||
    hash === '#/privacy' ||
    hash === '#politique-de-confidentialite' ||
    path === '/privacy' ||
    path === '/politique-de-confidentialite'
  ) {
    return 'privacy';
  }

  if (
    hash === '#terms' ||
    hash === '#/terms' ||
    hash === '#cgu' ||
    hash === '#/cgu' ||
    path === '/terms' ||
    path === '/cgu'
  ) {
    return 'terms';
  }

  if (hash === '#404' || hash === '#/404') {
    return '404';
  }

  if (path !== '/' && path !== '/index.html') {
    return '404';
  }

  return 'home';
}

function MainApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('web');
  const [viewMode, setViewMode] = useState<ViewMode>(resolveViewModeFromLocation);
  const [showLoading, setShowLoading] = useState<boolean>(
    () => resolveViewModeFromLocation() === 'home'
  );

  useEffect(() => {
    const syncRouteState = () => {
      setViewMode(resolveViewModeFromLocation());
    };
    window.addEventListener('popstate', syncRouteState);
    window.addEventListener('hashchange', syncRouteState);
    return () => {
      window.removeEventListener('popstate', syncRouteState);
      window.removeEventListener('hashchange', syncRouteState);
    };
  }, []);

  const handleReturnHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenPrivacyPage = useCallback(() => {
    window.history.pushState({}, '', '/#politique-de-confidentialite');
    setViewMode('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenTermsPage = useCallback(() => {
    window.history.pushState({}, '', '/#cgu');
    setViewMode('terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateSectionFrom404 = useCallback((sectionId: string) => {
    window.history.pushState({}, '', `/#${sectionId}`);
    setViewMode('home');
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  }, []);

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

  const handleScrollToContact = useCallback(() => {
    if (viewMode !== 'home') {
      window.history.pushState({}, '', '/#contact');
      setViewMode('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [viewMode]);

  const handleNavigateFromModal = useCallback(
    (serviceKey: string) => {
      setSelectedService(serviceKey);
      if (viewMode !== 'home') {
        window.history.pushState({}, '', '/#contact');
        setViewMode('home');
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [viewMode]
  );

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#161412] selection:bg-[#A64B2A] selection:text-[#F7F4EE] relative overflow-x-hidden w-full pb-16 sm:pb-0">
      {/* Architectural Letter-by-Letter Logo Transition Loading Screen */}
      {showLoading && viewMode === 'home' && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {viewMode === '404' ? (
        <NotFoundPage
          onReturnHome={handleReturnHome}
          onNavigateSection={handleNavigateSectionFrom404}
          onOpenProjectModal={() => handleOpenProjectModal()}
        />
      ) : viewMode === 'privacy' ? (
        <PrivacyPolicyPage
          onReturnHome={handleReturnHome}
          onNavigateTerms={handleOpenTermsPage}
        />
      ) : viewMode === 'terms' ? (
        <TermsPage
          onReturnHome={handleReturnHome}
          onNavigatePrivacy={handleOpenPrivacyPage}
        />
      ) : (
        <>
          {/* Device Language Translation Prompt (Delayed & Non-Intrusive) */}
          <LanguagePromptBanner />

          {/* Top Bar Contract Navigation */}
          <Navbar onOpenProjectModal={() => handleOpenProjectModal()} />

          <main>
            {/* Section 1 : Architectural Split Hero & 4-Column Quantitative Proof */}
            <Hero
              onOpenProjectModal={() => handleOpenProjectModal()}
              onExploreServices={handleExploreServices}
            />

            {/* Section 2 : Asymmetric Bento Grid — 4 Core Capabilities */}
            <Services onSelectService={handleSelectServiceFromCard} />

            {/* Section 3 : Interactive Horizontal Scroll Portfolio Monograph */}
            <Portfolio onSelectService={handleSelectServiceFromCard} />

            {/* Section 4 : Simplified 3-Row Editorial Methodology & Guarantees */}
            <Methodology />

            {/* Section 5 : Plain-Language Accordion FAQ */}
            <FAQ onScrollToContact={handleScrollToContact} />

            {/* Section 6 : High-Impact Architectural Call To Action (CTA) */}
            <CTABanner
              onOpenProjectModal={() => handleOpenProjectModal()}
              onScrollToContact={handleScrollToContact}
            />

            {/* Section 7 : Validated Consultation, Anti-Spam & Auto-Adapted Regional Currency Form */}
            <ContactForm
              preselectedService={selectedService}
              onOpenPrivacyPage={handleOpenPrivacyPage}
              onOpenTermsPage={handleOpenTermsPage}
            />
          </main>

          {/* Footer with Official Social Channels, Privacy Policy Page & CGU Links */}
          <Footer
            onOpenPrivacyPolicy={() => setPrivacyModalOpen(true)}
            onOpenPrivacyPage={handleOpenPrivacyPage}
            onOpenTermsPage={handleOpenTermsPage}
          />

          {/* Compact Mobile Bottom Action Bar */}
          <MobileBottomBar onOpenProjectModal={() => handleOpenProjectModal()} />
        </>
      )}

      {/* AI-Powered Interactive Chatbot Advisor */}
      <AIChatbot
        onOpenProjectModal={() => handleOpenProjectModal()}
        onScrollToContact={handleScrollToContact}
      />

      {/* Cookie Consent Banner (GDPR / CCPA) */}
      <CookieBanner onOpenPrivacyPage={handleOpenPrivacyPage} />

      {/* Project Scoping Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigateToForm={handleNavigateFromModal}
        initialService={selectedService}
      />

      {/* Global Privacy Policy & NDA Charter Modal */}
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
