"use client";

import { useEffect, useState } from "react";

/**
 * Thin progress bar fixed at the bottom of the viewport.
 * Shows reading progress as a blue gradient bar.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(100);
        return;
      }
      const scrolled = Math.min((scrollTop / docHeight) * 100, 100);
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="h-0.5 bg-gray-100 dark:bg-oil-green-700">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(to right, var(--color-primary), var(--color-accent))`,
          }}
        />
      </div>
    </div>
  );
}
