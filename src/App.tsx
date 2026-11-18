import React, { useState, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PolesMatrix } from './components/PolesMatrix';
import { PortfolioSection } from './components/PortfolioSection';
import { Methodology } from './components/Methodology';
import { BriefConfigurator } from './components/BriefConfigurator';
import {
  AIConciergeDrawer,
  StructuredConciergeDiagnostic,
} from './components/AIConciergeDrawer';
import { LegalPortal, LegalTab } from './components/LegalPortal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Footer } from './components/Footer';
import { useLanguage } from './context/LanguageContext';
import {
  PoleId,
  TransverseModifierId,
  UrgencyTier,
} from './utils/pricingEngine';

function PlatformShell() {
  const { setLanguage } = useLanguage();
  const { setCurrency } = useCurrency();

  const [selectedPoles, setSelectedPoles] = useState<PoleId[]>(['WEB']);
  const [selectedModifiers, setSelectedModifiers] = useState<TransverseModifierId[]>([]);
  const [urgency, setUrgency] = useState<UrgencyTier>('STANDARD');
  const [projectSummary, setProjectSummary] = useState('');
  const [aiPrefilled, setAiPrefilled] = useState(false);

  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [legalView, setLegalView] = useState<LegalTab | null>(null);
  const [forceCookieModal, setForceCookieModal] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleTogglePole = useCallback((poleId: PoleId) => {
    setSelectedPoles((prev) =>
      prev.includes(poleId) ? prev.filter((p) => p !== poleId) : [...prev, poleId]
    );
  }, []);

  const handleToggleModifier = useCallback((modId: TransverseModifierId) => {
    setSelectedModifiers((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    );
  }, []);

  const handleEstimateSimilar = useCallback(
    (poleId: PoleId) => {
      setSelectedPoles([poleId]);
      scrollToSection('estimate');
    },
    [scrollToSection]
  );

  const handleApplyConciergeDiagnostic = useCallback(
    (diag: StructuredConciergeDiagnostic) => {
      if (Array.isArray(diag.recommended_poles) && diag.recommended_poles.length > 0) {
        setSelectedPoles(diag.recommended_poles);
      }
      if (Array.isArray(diag.recommended_modifiers)) {
        setSelectedModifiers(diag.recommended_modifiers);
      }
      if (diag.urgency_tier === 'FAST_TRACK_48H' || diag.urgency_tier === 'STANDARD') {
        setUrgency(diag.urgency_tier);
      }
      if (
        diag.suggested_currency === 'XOF' ||
        diag.suggested_currency === 'EUR' ||
        diag.suggested_currency === 'USD'
      ) {
        setCurrency(diag.suggested_currency);
      }
      if (diag.detected_language === 'fr' || diag.detected_language === 'en') {
        setLanguage(diag.detected_language);
      }
      if (diag.synthesized_project_summary) {
        setProjectSummary(diag.synthesized_project_summary);
      }

      setAiPrefilled(true);
      setConciergeOpen(false);
      setLegalView(null);
      setTimeout(() => scrollToSection('estimate'), 80);
    },
    [scrollToSection, setCurrency, setLanguage]
  );

  const handleOpenLegalTab = useCallback((tab: LegalTab) => {
    setLegalView(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0B241D] relative overflow-x-hidden">
      <Navbar
        onNavigate={(id) => {
          if (legalView !== null) {
            setLegalView(null);
            setTimeout(() => scrollToSection(id), 60);
          } else {
            scrollToSection(id);
          }
        }}
      />

      {legalView !== null ? (
        <main>
          <LegalPortal
            activeTab={legalView}
            onChangeTab={setLegalView}
            onBackToMain={() => {
              setLegalView(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        <main>
          <Hero
            onEstimate={() => scrollToSection('estimate')}
            onOpenConcierge={() => setConciergeOpen(true)}
          />

          <PolesMatrix
            selectedPoles={selectedPoles}
            onTogglePole={handleTogglePole}
            onSeeEstimate={() => scrollToSection('estimate')}
          />

          <PortfolioSection onEstimateSimilar={handleEstimateSimilar} />

          <Methodology />

          <BriefConfigurator
            selectedPoles={selectedPoles}
            onTogglePole={handleTogglePole}
            selectedModifiers={selectedModifiers}
            onToggleModifier={handleToggleModifier}
            urgency={urgency}
            onChangeUrgency={setUrgency}
            projectSummary={projectSummary}
            onChangeProjectSummary={setProjectSummary}
            aiPrefilled={aiPrefilled}
            onOpenConcierge={() => setConciergeOpen(true)}
            onOpenPrivacy={() => handleOpenLegalTab('privacy')}
          />
        </main>
      )}

      <Footer
        onNavigateSection={(id) => {
          if (legalView !== null) {
            setLegalView(null);
            setTimeout(() => scrollToSection(id), 60);
          } else {
            scrollToSection(id);
          }
        }}
        onOpenLegalTab={handleOpenLegalTab}
        onOpenCookiePreferences={() => setForceCookieModal(true)}
      />

      <AIConciergeDrawer
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        onApplyDiagnostic={handleApplyConciergeDiagnostic}
        onEstimateDirect={() => {
          setConciergeOpen(false);
          scrollToSection('estimate');
        }}
      />

      <CookieConsentBanner
        forceOpen={forceCookieModal}
        onCloseForceOpen={() => setForceCookieModal(false)}
        onOpenLegalPrivacy={() => handleOpenLegalTab('privacy')}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <PlatformShell />
      </CurrencyProvider>
    </LanguageProvider>
  );
}
