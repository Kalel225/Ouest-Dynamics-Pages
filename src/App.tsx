import React, { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PolesMatrix } from './components/PolesMatrix';
import { Methodology } from './components/Methodology';
import { PortfolioSection } from './components/PortfolioSection';
import { BriefConfigurator } from './components/BriefConfigurator';
import {
  AIConciergeDrawer,
  StructuredConciergeDiagnostic,
} from './components/AIConciergeDrawer';
import { LegalPortal, LegalTab } from './components/LegalPortal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Footer } from './components/Footer';
import {
  PoleId,
  TransverseModifierId,
  UrgencyTier,
} from './utils/pricingEngine';

function PlatformShell() {
  const { t, setLanguage } = useLanguage();
  const { setCurrency } = useCurrency();

  // Brief Configurator State (Shared with PolesMatrix, Portfolio & AI Concierge)
  const [selectedPoles, setSelectedPoles] = useState<PoleId[]>(['WEB']);
  const [selectedModifiers, setSelectedModifiers] = useState<TransverseModifierId[]>([]);
  const [urgency, setUrgency] = useState<UrgencyTier>('STANDARD');
  const [projectSummary, setProjectSummary] = useState<string>('');
  const [configuratorStep, setConfiguratorStep] = useState<number>(1);
  const [aiPrefilled, setAiPrefilled] = useState<boolean>(false);

  // Navigation & Overlays
  const [conciergeOpen, setConciergeOpen] = useState<boolean>(false);
  const [legalView, setLegalView] = useState<LegalTab | null>(null);
  const [forceCookieModal, setForceCookieModal] = useState<boolean>(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleTogglePole = useCallback((poleId: PoleId) => {
    setSelectedPoles((prev) => {
      if (prev.includes(poleId)) {
        return prev.length > 1 ? prev.filter((p) => p !== poleId) : prev;
      }
      return [...prev, poleId];
    });
  }, []);

  const handleToggleModifier = useCallback((modId: TransverseModifierId) => {
    setSelectedModifiers((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    );
  }, []);

  const handleTogglePoleAndScroll = useCallback(
    (poleId: PoleId) => {
      setSelectedPoles((prev) =>
        prev.includes(poleId) ? prev : [...prev, poleId]
      );
      setConfiguratorStep(1);
      scrollToSection('configurator');
    },
    [scrollToSection]
  );

  const handleToggleModifierAndScroll = useCallback(
    (modId: TransverseModifierId) => {
      setSelectedModifiers((prev) =>
        prev.includes(modId) ? prev : [...prev, modId]
      );
      setConfiguratorStep(2);
      scrollToSection('configurator');
    },
    [scrollToSection]
  );

  const handleSelectPoleFromPortfolio = useCallback(
    (poleId: PoleId) => {
      setSelectedPoles([poleId]);
      setConfiguratorStep(1);
      scrollToSection('configurator');
    },
    [scrollToSection]
  );

  // US-02: Apply Structured AI Concierge Diagnostic directly into the 4-Step Brief Configurator
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
      setConfiguratorStep(3);

      setTimeout(() => {
        scrollToSection('configurator');
      }, 80);
    },
    [scrollToSection, setCurrency, setLanguage]
  );

  const handleOpenLegalTab = useCallback((tab: LegalTab) => {
    setLegalView(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F4F4F6] selection:bg-[#D4AF37] selection:text-[#0B0D12] relative overflow-x-hidden">
      {/* 1. Unified Top Bar Navigation */}
      <Navbar
        onNavigateSection={scrollToSection}
        onOpenConcierge={() => setConciergeOpen(true)}
        isLegalView={legalView !== null}
        onExitLegalView={() => setLegalView(null)}
      />

      {legalView !== null ? (
        /* 8. Unified Legal Portal on Editorial Ivory Surface (#F8F6F1) */
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
          {/* 2. Sovereign Digital Architecture Hero Section */}
          <Hero
            onConfigureBrief={() => scrollToSection('configurator')}
            onOpenConcierge={() => setConciergeOpen(true)}
          />

          {/* 3. Matrix of 4 Execution Poles + 2 Transverse Engines */}
          <PolesMatrix
            selectedPoles={selectedPoles}
            selectedModifiers={selectedModifiers}
            onTogglePoleAndScroll={handleTogglePoleAndScroll}
            onToggleModifierAndScroll={handleToggleModifierAndScroll}
          />

          {/* 4. Core & Elastic Guilds Methodology & 4 Governance Clauses */}
          <Methodology />

          {/* 5. Sector Case Studies Portfolio (Filterable by Pole) */}
          <PortfolioSection onSelectPoleForBrief={handleSelectPoleFromPortfolio} />

          {/* 6. 4-Step Brief Configurator & Multi-Currency Budget Estimator */}
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
            activeStep={configuratorStep}
            onChangeStep={setConfiguratorStep}
            onOpenConcierge={() => setConciergeOpen(true)}
          />
        </main>
      )}

      {/* Footer with Unified Legal Portal & CMP Consent Mode v2 Access */}
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
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Floating Executive AI Concierge Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setConciergeOpen(true)}
          className="h-12 px-5 rounded-full bg-[#141821] hover:bg-[#1B202C] text-[#F4F4F6] border border-[#D4AF37] shadow-xl inline-flex items-center gap-2.5 transition-colors duration-180 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
            {t.nav.concierge}
          </span>
        </button>
      </div>

      {/* 7. Lateral Executive AI Concierge Drawer */}
      <AIConciergeDrawer
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        onApplyDiagnostic={handleApplyConciergeDiagnostic}
      />

      {/* 8. Granular CMP Consent Mode v2 Cookie Banner */}
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
