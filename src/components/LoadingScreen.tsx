import React, { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface LetterItem {
  id: string;
  char: string;
  word: 'ouest' | 'dynamics' | 'accent';
  isSquare?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  // All elements in the exact logo
  const elements: LetterItem[] = [
    { id: 'ouest-0', char: 'O', word: 'ouest' },
    { id: 'ouest-1', char: 'U', word: 'ouest' },
    { id: 'ouest-2', char: 'E', word: 'ouest' },
    { id: 'ouest-3', char: 'S', word: 'ouest' },
    { id: 'ouest-4', char: 'T', word: 'ouest' },
    { id: 'dynamics-0', char: 'D', word: 'dynamics' },
    { id: 'dynamics-1', char: 'Y', word: 'dynamics' },
    { id: 'dynamics-2', char: 'N', word: 'dynamics' },
    { id: 'dynamics-3', char: 'A', word: 'dynamics' },
    { id: 'dynamics-4', char: 'M', word: 'dynamics' },
    { id: 'dynamics-5', char: 'I', word: 'dynamics' },
    { id: 'dynamics-6', char: 'C', word: 'dynamics' },
    { id: 'dynamics-7', char: 'S', word: 'dynamics' },
    { id: 'dot', char: '.', word: 'accent' },
    { id: 'square', char: '■', word: 'accent', isSquare: true }
  ];

  // Visible letters during entrance
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Store letter coordinates for the transition
  const [transforms, setTransforms] = useState<Record<string, { dx: number; dy: number; scale: number }>>({});

  useEffect(() => {
    // 1. Lettres s'invitent individuellement mais rapidement
    const enterDelay = 42; // ms per letter
    const startOffset = 60;

    const timers: NodeJS.Timeout[] = [];

    elements.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleIndices((prev) => {
          const next = new Set(prev);
          next.add(idx);
          return next;
        });
      }, startOffset + idx * enterDelay);
      timers.push(timer);
    });

    // 2. Measure coordinates before transition starts
    const measureTimer = setTimeout(() => {
      const measuredTransforms: Record<string, { dx: number; dy: number; scale: number }> = {};

      elements.forEach((item) => {
        const centerEl = document.getElementById(`center-${item.id}`);
        const navEl = document.getElementById(`nav-${item.id}`);

        if (centerEl && navEl) {
          const centerRect = centerEl.getBoundingClientRect();
          const navRect = navEl.getBoundingClientRect();

          const scale = navRect.height / centerRect.height || 0.32;
          // Calculate delta from center to nav
          const dx = navRect.left - centerRect.left;
          const dy = navRect.top - centerRect.top;

          measuredTransforms[item.id] = { dx, dy, scale };
        } else {
          // Safe fallback if nav element is not measured yet
          const fallbackDx = -window.innerWidth / 2 + (window.innerWidth < 640 ? 40 : 120);
          const fallbackDy = -window.innerHeight / 2 + 35;
          measuredTransforms[item.id] = { dx: fallbackDx, dy: fallbackDy, scale: 0.32 };
        }
      });

      setTransforms(measuredTransforms);
    }, startOffset + elements.length * enterDelay + 300);
    timers.push(measureTimer);

    // 3. Transition lettre par lettre vers la nav
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, startOffset + elements.length * enterDelay + 550);
    timers.push(transitionTimer);

    // 4. Complete and unmount loading screen
    const finishTimer = setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, startOffset + elements.length * enterDelay + 550 + elements.length * 35 + 650);
    timers.push(finishTimer);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      onClick={() => {
        setIsDone(true);
        onComplete();
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0B] transition-opacity duration-700 select-none cursor-pointer ${
        isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        // Match the background gradient of the user's uploaded image exactly
        background: 'radial-gradient(ellipse at 50% 45%, #181818 0%, #0B0B0B 75%, #050505 100%)'
      }}
      title="Cliquez pour passer l'animation"
    >
      {/* UNIQUEMENT L'IMAGE DU LOGO : ABSOLUMENT RIEN D'AUTRE */}
      <div className="relative flex flex-col select-none -space-y-2 sm:-space-y-4">
        {/* LIGNE 1 : OUEST (Blanc Pur, Ultra-Bold) */}
        <div className="flex items-baseline font-display text-white text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.03em] leading-none">
          {elements.slice(0, 5).map((item, idx) => {
            const isVisible = visibleIndices.has(idx);
            const transform = transforms[item.id];
            const transDelay = isTransitioning ? `${idx * 32}ms` : '0ms';

            return (
              <span
                key={item.id}
                id={`center-${item.id}`}
                className="inline-block transition-all transform origin-top-left"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isTransitioning && transform
                    ? `translate3d(${transform.dx}px, ${transform.dy}px, 0) scale(${transform.scale})`
                    : isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(12px) scale(0.92)',
                  transitionProperty: 'transform, opacity',
                  transitionDuration: isTransitioning ? '620ms' : '180ms',
                  transitionTimingFunction: isTransitioning
                    ? 'cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transitionDelay: transDelay
                }}
              >
                {item.char}
              </span>
            );
          })}
        </div>

        {/* LIGNE 2 : DYNAMICS . ■ (Gris perle/argent avec espacement large et carré Or Champagne) */}
        <div className="flex items-baseline font-display leading-none mt-1 sm:mt-2">
          {/* DYNAMICS */}
          <div className="flex items-baseline text-[#A0A0A0] text-xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.26em] sm:tracking-[0.28em]">
            {elements.slice(5, 13).map((item, sliceIdx) => {
              const globalIdx = 5 + sliceIdx;
              const isVisible = visibleIndices.has(globalIdx);
              const transform = transforms[item.id];
              const transDelay = isTransitioning ? `${globalIdx * 32}ms` : '0ms';

              return (
                <span
                  key={item.id}
                  id={`center-${item.id}`}
                  className="inline-block transition-all transform origin-top-left"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isTransitioning && transform
                      ? `translate3d(${transform.dx}px, ${transform.dy}px, 0) scale(${transform.scale})`
                      : isVisible
                      ? 'translateY(0) scale(1)'
                      : 'translateY(8px) scale(0.9)',
                    transitionProperty: 'transform, opacity',
                    transitionDuration: isTransitioning ? '620ms' : '160ms',
                    transitionTimingFunction: isTransitioning
                      ? 'cubic-bezier(0.16, 1, 0.3, 1)'
                      : 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                    transitionDelay: transDelay
                  }}
                >
                  {item.char}
                </span>
              );
            })}
          </div>

          {/* POINT . */}
          {(() => {
            const dotIdx = 13;
            const item = elements[dotIdx];
            const isVisible = visibleIndices.has(dotIdx);
            const transform = transforms[item.id];
            const transDelay = isTransitioning ? `${dotIdx * 32}ms` : '0ms';

            return (
              <span
                key={item.id}
                id={`center-${item.id}`}
                className="text-[#A0A0A0] font-display text-xl sm:text-3xl md:text-4xl font-light inline-block transition-all transform origin-top-left"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isTransitioning && transform
                    ? `translate3d(${transform.dx}px, ${transform.dy}px, 0) scale(${transform.scale})`
                    : isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(6px) scale(0.9)',
                  transitionProperty: 'transform, opacity',
                  transitionDuration: isTransitioning ? '620ms' : '150ms',
                  transitionTimingFunction: isTransitioning
                    ? 'cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transitionDelay: transDelay
                }}
              >
                .
              </span>
            );
          })()}

          {/* CARRÉ OR CHAMPAGNE ■ */}
          {(() => {
            const squareIdx = 14;
            const item = elements[squareIdx];
            const isVisible = visibleIndices.has(squareIdx);
            const transform = transforms[item.id];
            const transDelay = isTransitioning ? `${squareIdx * 32}ms` : '0ms';

            return (
              <div
                key={item.id}
                id={`center-${item.id}`}
                className="inline-flex self-baseline ml-2.5 sm:ml-3 md:ml-4 mb-[2px] sm:mb-[3px] transition-all transform origin-top-left"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isTransitioning && transform
                    ? `translate3d(${transform.dx}px, ${transform.dy}px, 0) scale(${transform.scale})`
                    : isVisible
                    ? 'scale(1)'
                    : 'scale(0)',
                  transitionProperty: 'transform, opacity',
                  transitionDuration: isTransitioning ? '620ms' : '220ms',
                  transitionTimingFunction: isTransitioning
                    ? 'cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: transDelay
                }}
              >
                <span
                  className="inline-block bg-[#D4AF37] w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                  style={{ aspectRatio: '1/1' }}
                />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
