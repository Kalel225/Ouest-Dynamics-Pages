import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BRAND_LETTERS } from './BrandLogo';

interface LoadingScreenProps {
  onHandoverLogo?: () => void;
  onComplete: () => void;
}

interface LetterTransform {
  dx: number;
  dy: number;
  scale: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onHandoverLogo,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'appear' | 'fly' | 'handover' | 'done'>('appear');
  const [transforms, setTransforms] = useState<Record<string, LetterTransform>>({});

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const measureTargets = () => {
      const measured: Record<string, LetterTransform> = {};

      BRAND_LETTERS.forEach((item) => {
        const centerEl = document.getElementById(`center-${item.id}`);
        const navEl = document.getElementById(`nav-${item.id}`);

        if (centerEl && navEl) {
          const centerRect = centerEl.getBoundingClientRect();
          const navRect = navEl.getBoundingClientRect();

          const centerFontSize = parseFloat(window.getComputedStyle(centerEl).fontSize) || 56;
          const navFontSize = parseFloat(window.getComputedStyle(navEl).fontSize) || 20;
          const scale = navFontSize / centerFontSize;

          const startCenterX = centerRect.left + centerRect.width / 2;
          const startCenterY = centerRect.top + centerRect.height / 2;
          const targetCenterX = navRect.left + navRect.width / 2;
          const targetCenterY = navRect.top + navRect.height / 2;

          measured[item.id] = {
            dx: targetCenterX - startCenterX,
            dy: targetCenterY - startCenterY,
            scale,
          };
        } else {
          measured[item.id] = {
            dx: -window.innerWidth * 0.35,
            dy: -window.innerHeight * 0.44,
            scale: 0.34,
          };
        }
      });

      setTransforms(measured);
    };

    // Measure once letters have settled at center, then start smooth flight
    const flyTimer = setTimeout(() => {
      measureTargets();
      setPhase('fly');
    }, 820);
    timers.push(flyTimer);

    // Trigger seamless cross-fade handover to the real navbar logo right as the last letter lands
    const handoverTimer = setTimeout(() => {
      onHandoverLogo?.();
      setPhase('handover');
    }, 1780);
    timers.push(handoverTimer);

    // Unmount overlay after cross-fade completes
    const finishTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1980);
    timers.push(finishTimer);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [onComplete, onHandoverLogo]);

  if (phase === 'done') return null;

  const isFlyingOrLater = phase === 'fly' || phase === 'handover';

  const renderAnimatedLetter = (
    item: (typeof BRAND_LETTERS)[number],
    globalIdx: number,
    extraClass = ''
  ) => {
    const t = transforms[item.id];

    return (
      <motion.span
        key={item.id}
        id={`center-${item.id}`}
        initial={{ opacity: 0, y: 16, filter: 'blur(5px)', scale: 0.96, x: 0 }}
        animate={
          isFlyingOrLater && t
            ? {
                opacity: phase === 'handover' ? 0 : 1,
                x: t.dx,
                y: t.dy,
                scale: t.scale,
                filter: 'blur(0px)',
              }
            : {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              }
        }
        transition={
          isFlyingOrLater
            ? {
                x: {
                  duration: 0.78,
                  delay: globalIdx * 0.016,
                  ease: [0.22, 1, 0.36, 1],
                },
                y: {
                  duration: 0.78,
                  delay: globalIdx * 0.016,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: 0.78,
                  delay: globalIdx * 0.016,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 0.18,
                  ease: 'easeOut',
                },
              }
            : {
                duration: 0.42,
                delay: globalIdx * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }
        }
        style={{
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
        className={`inline-block ${extraClass}`}
      >
        {item.char}
      </motion.span>
    );
  };

  return (
    <div
      onClick={() => {
        onHandoverLogo?.();
        setPhase('done');
        onComplete();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center select-none pointer-events-none"
    >
      {/* Warm Travertine Curtain — Dissolves smoothly as letters glide into the navbar */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isFlyingOrLater ? 0 : 1 }}
        transition={{
          duration: 0.68,
          delay: isFlyingOrLater ? 0.18 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 bg-[#F7F4EE]"
      />

      {/* ONLY THE LOGO — Appears letter-by-letter at center then glides into the top navbar */}
      <div className="relative z-10 font-serif-display font-semibold text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#161412] inline-flex items-baseline whitespace-nowrap">
        {/* Word 1: Ouest */}
        <span className="inline-flex">
          {BRAND_LETTERS.slice(0, 5).map((item, idx) =>
            renderAnimatedLetter(item, idx)
          )}
        </span>

        <span className="inline-block w-[0.28em]" aria-hidden="true">
          &nbsp;
        </span>

        {/* Word 2: Dynamics (Italic) */}
        <span className="italic font-normal inline-flex">
          {BRAND_LETTERS.slice(5, 13).map((item, sliceIdx) =>
            renderAnimatedLetter(item, 5 + sliceIdx)
          )}
        </span>

        {/* Terracotta Dot . */}
        {renderAnimatedLetter(BRAND_LETTERS[13], 13, 'font-bold text-[#A64B2A]')}
      </div>
    </div>
  );
};
