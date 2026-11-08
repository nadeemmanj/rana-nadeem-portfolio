"use client";
// Skills section: technical bars (left) + professional radial rings (right).
// All data comes from data/portfolio.js — no hardcoded portfolio text.
import { useEffect, useRef, useState } from "react";
import { skills } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Runs once when the element scrolls into view.
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// One glowing radial ring with count-up percentage.
function Ring({ name, level, active, id }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      setPct(Math.round(eased * level));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, level]);

  const r = 54;
  const C = 2 * Math.PI * r;
  const offset = C * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="drop-shadow-[0_0_18px_rgba(59,130,246,.45)]"
        >
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {/* dark track */}
          <circle cx="70" cy="70" r={r} fill="none" stroke="#0e1830" strokeWidth="12" />
          {/* animated blue progress */}
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 70 70)"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#e8eefc]">
          {pct}%
        </span>
      </div>
      <span className="text-center text-sm text-[#93a1c0]">{name}</span>
    </div>
  );
}

export default function Skills() {
  const [showAll, setShowAll] = useState(false);
  const [techRef, techInView] = useInView(0.2);
  const [proRef, proInView] = useInView(0.3);
  const sectionRef = useRef(null);

  const toggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      // collapsing shrinks the page — scroll back to the section top
      // so the button stays in line instead of the page jumping down
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      setShowAll(true);
    }
  };

  const technical = skills?.technical ?? [];
  const technicalMore = skills?.technicalMore ?? [];
  const professional = skills?.professional ?? [];
  // First 4 bars by default; toggle reveals the rest.
  const visibleTech = showAll ? [...technical, ...technicalMore] : technical.slice(0, 4);

  return (
    <section id="skills" ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="TECHNICAL AND PROFESSIONAL" title="My Skills" />

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {/* LEFT: technical bars */}
          <Reveal>
            <h3 className="mb-6 text-xl font-semibold text-[#e8eefc]">Technical Skills</h3>
            <div ref={techRef} className="space-y-5">
              {visibleTech.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-[#e8eefc]">{s.name}</span>
                    <span className="text-[#93a1c0]">{s.level}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full border border-[#1e2c52] bg-[#070d1f]">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] transition-[width] duration-1000 ease-out"
                      style={{ width: techInView ? `${s.level}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {technicalMore.length > 0 && (
              <button
                onClick={toggleShowAll}
                className="mt-6 rounded-full border border-[#3b82f6] px-6 py-2 text-sm font-semibold text-[#3b82f6] transition-colors hover:bg-[#3b82f6] hover:text-[#070d1f]"
              >
                {showAll ? "Show Less" : "More Skills"}
              </button>
            )}
          </Reveal>

          {/* RIGHT: professional rings */}
          <Reveal delay={120}>
            <h3 className="mb-6 text-xl font-semibold text-[#e8eefc]">Professional Skills</h3>
            <div ref={proRef} className="grid grid-cols-2 gap-8">
              {professional.slice(0, 4).map((s, i) => (
                <Ring key={s.name} name={s.name} level={s.level} active={proInView} id={`ringGrad-${i}`} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
