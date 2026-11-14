import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Check,
  Copy,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioProps {
  onSelectService: (serviceKey: string) => void;
}

const PROJECT_IMAGES: Record<string, string> = {
  'aura-living': '/src/assets/images/portfolio_aura_living_1794659550282.jpg',
  'kauri-pay': '/src/assets/images/portfolio_kauri_pay_1794659550670.jpg',
  'zenith-health': '/src/assets/images/portfolio_zenith_health_1794659553088.jpg',
  'sovereign-capital': '/src/assets/images/portfolio_sovereign_capital_1794659554890.jpg',
  'nomad-roasters': '/src/assets/images/portfolio_nomad_roasters_1794659556051.jpg',
  'pulse-fitness': '/src/assets/images/portfolio_pulse_fitness_1794659556842.jpg',
};

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectService }) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const filteredProjects = t.portfolio.items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const activeProject = t.portfolio.items.find((item) => item.id === activeModalId);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));

    const cardWidth = el.firstElementChild?.clientWidth || 400;
    const currentIndex = Math.round(scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(filteredProjects.length - 1, Math.max(0, currentIndex)));
  }, [filteredProjects.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, selectedCategory]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = Math.min(el.clientWidth * 0.85, 500);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    isDraggingRef.current = false;
    el.style.cursor = 'grab';
    el.style.removeProperty('user-select');
  };

  const handleCardClick = (projectId: string, e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      return;
    }
    setActiveModalId(projectId);
  };

  const handleCopyLink = (projectId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const fullUrl = `${window.location.origin}${window.location.pathname}#portfolio-${projectId}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedId(projectId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  useEffect(() => {
    if (activeModalId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalId]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#portfolio-')) {
      const targetId = hash.replace('#portfolio-', '');
      const found = t.portfolio.items.find((item) => item.id === targetId);
      if (found) {
        setActiveModalId(targetId);
      }
    }
  }, [t.portfolio.items]);

  const categoryFilters = [
    { id: 'all', label: t.portfolio.categories.all },
    { id: 'web', label: t.portfolio.categories.web },
    { id: 'mobile', label: t.portfolio.categories.mobile },
    { id: 'fintech', label: t.portfolio.categories.fintech },
    { id: 'design', label: t.portfolio.categories.design },
  ];

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-28 bg-[#181512] text-[#F7F4EE] border-b border-[#2C2621] overflow-hidden select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14"
      >
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#D49B6A] mb-3">
              {language === 'fr'
                ? 'Chapitre 02 · Études de Cas & Réalisations'
                : 'Chapter 02 · Selected Works & Case Studies'}
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F4EE] tracking-tight leading-[1.12] mb-4 [text-wrap:balance]">
              {t.portfolio.title}
            </h2>
            <p className="text-[#C8C1B6] text-sm sm:text-base leading-relaxed">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Horizontal Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-tabular text-[#C8C1B6] mr-2">
              <span className="text-[#F7F4EE] font-semibold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(filteredProjects.length).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                canScrollLeft
                  ? 'border-[#3D352E] bg-[#221E1A] text-[#F7F4EE] hover:bg-[#A64B2A] hover:border-[#A64B2A]'
                  : 'border-[#25201C] bg-[#1C1815] text-[#5C554E] cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                canScrollRight
                  ? 'border-[#3D352E] bg-[#221E1A] text-[#F7F4EE] hover:bg-[#A64B2A] hover:border-[#A64B2A]'
                  : 'border-[#25201C] bg-[#1C1815] text-[#5C554E] cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clean Segmented Filter Bar (Functional Buttons) */}
        <div className="mt-8 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1 p-1 bg-[#221E1A] rounded-lg border border-[#332C26]">
            {categoryFilters.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3.5 py-2 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#A64B2A] text-[#F7F4EE] font-semibold'
                      : 'text-[#C8C1B6] hover:text-[#F7F4EE]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Interactive Horizontal Scroll Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex gap-6 sm:gap-8 px-4 sm:px-8 lg:px-12 overflow-x-auto scroll-smooth scrollbar-none cursor-grab active:cursor-grabbing snap-x snap-mandatory sm:snap-none pb-8 pt-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {filteredProjects.map((project, index) => {
            const imgSrc = PROJECT_IMAGES[project.id];

            return (
              <article
                key={project.id}
                id={`portfolio-${project.id}`}
                onClick={(e) => handleCardClick(project.id, e)}
                className="group w-[86vw] max-w-[350px] sm:w-[410px] lg:w-[460px] shrink-0 snap-center rounded-xl bg-[#221E1A] border border-[#332C26] hover:border-[#A64B2A] transition-colors duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Editorial Monograph Image Frame */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#14110F] border-b border-[#332C26]">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={`${project.title} — ${project.categoryLabel}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-[#C8C1B6]">
                      {project.title}
                    </div>
                  )}

                  {/* Measured Contrast Scrim & Hover Quick Action Bar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 sm:p-5">
                    <div className="flex items-center justify-between text-xs font-mono-tabular text-[#F7F4EE]/90">
                      <span>
                        {String(index + 1).padStart(2, '0')} · {project.year}
                      </span>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[#F7F4EE] hover:text-[#D49B6A] underline underline-offset-4 transition-colors"
                      >
                        <span>{project.domainDisplay}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Hover CTA Reveal */}
                    <div className="flex items-center justify-between gap-2 pt-2">
                      <span className="text-xs font-medium text-[#D49B6A]">
                        {project.categoryLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#181512]/90 text-[#F7F4EE] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <span>{t.portfolio.caseStudy}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monograph Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#C8C1B6] mb-2">
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.tags.slice(0, 2).join(' / ')}</span>
                    </div>

                    <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#F7F4EE] group-hover:text-[#D49B6A] transition-colors duration-150 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#C8C1B6] leading-relaxed mb-5 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Quantitative Proof Metrics Row (Tabular Numerals) */}
                    <div className="grid grid-cols-3 gap-3 py-3.5 border-y border-[#332C26]">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx}>
                          <div className="font-mono-tabular text-sm sm:text-base font-semibold text-[#F7F4EE]">
                            {metric.value}
                          </div>
                          <div className="text-[11px] text-[#C8C1B6] truncate">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Links */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalId(project.id);
                      }}
                      className="text-xs font-semibold text-[#F7F4EE] hover:text-[#D49B6A] underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {t.portfolio.caseStudy}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(project.serviceId);
                      }}
                      className="text-xs font-semibold text-[#D49B6A] hover:text-[#F7F4EE] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>{t.portfolio.launchSimilar}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Minimalist Architectural Scroll Progress Line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-2">
          <div className="w-full bg-[#2C2621] h-[2px] overflow-hidden">
            <div
              className="h-full bg-[#A64B2A] transition-transform duration-150 origin-left"
              style={{ width: `${Math.max(16, scrollProgress)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-[#C8C1B6] mt-2.5">
            <span>{t.portfolio.dragHint}</span>
            <span>{t.portfolio.viewAllProjects}</span>
          </div>
        </div>
      </motion.div>

      {/* Case Study Monograph Lightbox Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs"
          onClick={() => setActiveModalId(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] bg-[#F7F4EE] text-[#161412] border border-[#E2DDD5] rounded-xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-8 py-5 bg-white border-b border-[#E2DDD5] flex items-center justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C554E] mb-1">
                  <span className="font-semibold text-[#A64B2A]">{activeProject.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{activeProject.year}</span>
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#161412]">
                  {activeProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(activeProject.id)}
                  title={t.portfolio.shareProject}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E2DDD5] bg-[#F7F4EE] text-[#5C554E] hover:text-[#161412] cursor-pointer"
                >
                  {copiedId === activeProject.id ? (
                    <Check className="w-4 h-4 text-[#A64B2A]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalId(null)}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E2DDD5] bg-[#F7F4EE] text-[#5C554E] hover:text-[#161412] cursor-pointer"
                  aria-label={t.portfolio.closeModal}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Monograph Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              {copiedId === activeProject.id && (
                <div className="p-3 rounded-lg bg-white border border-[#A64B2A] text-[#A64B2A] text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{t.portfolio.copyLinkSuccess}</span>
                </div>
              )}

              {/* High-Resolution Project Showcase Image */}
              {PROJECT_IMAGES[activeProject.id] && (
                <div className="h-56 sm:h-72 w-full rounded-lg overflow-hidden border border-[#E2DDD5] bg-[#181512]">
                  <img
                    src={PROJECT_IMAGES[activeProject.id]}
                    alt={activeProject.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}

              {/* Lead Summary */}
              <div>
                <p className="font-serif-display text-lg sm:text-xl font-medium text-[#161412] mb-2">
                  {activeProject.tagline}
                </p>
                <p className="text-sm text-[#5C554E] leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Quantified Results Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-[#E2DDD5]">
                {activeProject.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-serif-display font-semibold text-[#A64B2A] font-mono-tabular">
                      {metric.value}
                    </div>
                    <div className="text-xs text-[#5C554E]">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Challenge / Solution / Outcome */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-[#161412] mb-2">
                    01. {t.portfolio.challengeTitle}
                  </h4>
                  <p className="text-sm text-[#5C554E] leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#161412] mb-2">
                    02. {t.portfolio.solutionTitle}
                  </h4>
                  <p className="text-sm text-[#5C554E] leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-white border border-[#E2DDD5]">
                <h4 className="text-xs font-semibold text-[#A64B2A] mb-1.5">
                  03. {t.portfolio.outcomeTitle}
                </h4>
                <p className="text-sm text-[#161412] leading-relaxed">
                  {activeProject.outcome}
                </p>
              </div>

              {/* Attributable Client Testimonial */}
              <div className="p-5 rounded-lg bg-[#EFECE6] border border-[#E2DDD5]">
                <blockquote className="font-serif-display italic text-base text-[#161412] leading-relaxed mb-3">
                  “{activeProject.testimonial.quote}”
                </blockquote>
                <div className="text-xs text-[#5C554E]">
                  <span className="font-semibold text-[#161412]">
                    {activeProject.testimonial.author}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>{activeProject.testimonial.role}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{activeProject.testimonial.company}</span>
                </div>
              </div>

              {/* Unboxed Technical Stack */}
              <div className="text-xs text-[#5C554E] pt-2">
                <span className="font-semibold text-[#161412]">Architecture : </span>
                <span>{activeProject.tags.join(' · ')}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#E2DDD5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#E2DDD5] bg-[#F7F4EE] hover:border-[#161412] text-[#161412] text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.portfolio.visitLive}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A64B2A]" />
              </a>

              <button
                type="button"
                onClick={() => {
                  const serviceId = activeProject.serviceId;
                  setActiveModalId(null);
                  onSelectService(serviceId);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] text-[#F7F4EE] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t.portfolio.launchSimilar}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
