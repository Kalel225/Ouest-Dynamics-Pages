import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BRAND_LETTERS } from './BrandLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'appear' | 'letterExit' | 'curtainFade' | 'done'>('appear');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // 1. Logo appears at the center (0ms -> 550ms)
    // 2. Letter-by-letter upward transition on the loading screen (580ms -> 1120ms)
    const letterExitTimer = setTimeout(() => {
      setPhase('letterExit');
    }, 580);

    // 3. Smoothly fade out the #F7F4EE curtain to reveal the static main page (1100ms -> 1500ms)
    const curtainTimer = setTimeout(() => {
      setPhase('curtainFade');
    }, 1100);

    // 4. Unmount cleanly once curtain fade is complete (1520ms)
    const finishTimer = setTimeout(() => {
      setPhase('done');
      onCompleteRef.current();
    }, 1520);

    return () => {
      clearTimeout(letterExitTimer);
      clearTimeout(curtainTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  if (phase === 'done') return null;

  const isExitingLetters = phase === 'letterExit' || phase === 'curtainFade';
  const isFadingCurtain = phase === 'curtainFade';

  const renderAnimatedLetter = (
    item: (typeof BRAND_LETTERS)[number],
    globalIdx: number,
    extraClass = ''
  ) => {
    return (
      <motion.span
        key={item.id}
        initial={{ opacity: 0, y: 12 }}
        animate={
          isExitingLetters
            ? { opacity: 0, y: -18 }
            : { opacity: 1, y: 0 }
        }
        transition={
          isExitingLetters
            ? {
                duration: 0.28,
                delay: globalIdx * 0.022,
                ease: [0.22, 1, 0.36, 1],
              }
            : {
                duration: 0.34,
                delay: globalIdx * 0.018,
                ease: [0.22, 1, 0.36, 1],
              }
        }
        style={{ willChange: 'transform, opacity' }}
        className={`inline-block ${extraClass}`}
      >
        {item.char}
      </motion.span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingCurtain ? 0 : 1 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => {
        setPhase('done');
        onCompleteRef.current();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F7F4EE] select-none pointer-events-none"
    >
      {/* Centered Wordmark: Appears cleanly, then transitions letter-by-letter before revealing the main page */}
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
    </motion.div>
  );
};
