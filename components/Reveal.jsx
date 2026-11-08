"use client";

import { useEffect, useRef } from "react";

// IntersectionObserver wrapper: fades/slides children IN when scrolled into
// view and OUT again when scrolled away (toggles .visible both directions).
// Props: children, className, delay (transition-delay in ms for staggering).
export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el); // keep observing -> fades out on scroll-up too
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
