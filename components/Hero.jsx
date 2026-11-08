"use client";
import { useEffect, useState } from "react";
import { profile, socials } from "../data/portfolio";
import SafeImage from "./SafeImage";

// Brand icons (SVG) for the hero social buttons — GitHub / LinkedIn / Facebook / Instagram
const SOCIAL_ICONS = {
  GitHub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  ),
  Facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  ),
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  ),
};

// Hero — id="home". Two columns on desktop: intro text (left) + portrait (right).
// All portfolio content comes from data/portfolio.js — no hardcoded text.
export default function Hero() {
  const roles = profile?.roles?.length ? profile.roles : ["Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Staggered entrance on load
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Role flip (like the reference video): letters roll in one by one
  // with a 3D flip, hold ~2.3s, then the next role flips in.
  useEffect(() => {
    const word = roles[roleIndex] ?? "";
    const inTime = word.length * 50 + 500; // all letters flipped in
    const timer = setTimeout(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, inTime + 2300);
    return () => clearTimeout(timer);
  }, [roleIndex, roles]);

  // stagger helper: fade + slide up with a delay
  const anim = (delay) => ({
    className: `transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
    style: { transitionDelay: `${delay}ms` },
  });

  const initials = profile?.name
    ? profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "RN";

  return (
    <section id="home" className="min-h-screen flex items-center scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-5 w-full pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-30 lg:pb-28 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT: intro */}
        <div>
          <h1 {...anim(0)} className="text-4xl md:text-5xl font-bold text-[#e8eefc]">
            Hi! I&apos;m <span className="text-gradient">{profile?.name || "Rana Nadeem"}</span>
          </h1>
          <h2 {...anim(120)} className="mt-4 text-[15px] leading-snug text-[#93a1c0] min-[420px]:text-lg sm:text-xl md:mt-6 md:text-2xl md:leading-relaxed lg:text-3xl">
            And I&apos;m{" "}
            <span key={roleIndex} className="flip-word inline-block max-w-full text-blue-400 font-semibold md:tracking-wider" aria-label={roles[roleIndex]}>
              {(roles[roleIndex] ?? "").split("").map((ch, i) => (
                <span key={i} className={`flip-letter ${ch === " " ? "w-[0.3em] md:w-[0.5em]" : ""}`} style={{ animationDelay: `${i * 50}ms` }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </h2>
          <p {...anim(240)} className="text-[#93a1c0] mt-5 leading-relaxed md:mt-8 md:text-lg lg:leading-loose">
            {profile?.tagline}
          </p>

          {/* Contact info — ek line mein, dono clickable (reference jaisa) */}
          <div {...anim(360)} className="mt-6 flex flex-wrap gap-6">
            {profile?.email && (
              <div>
                <p className="text-blue-400 font-semibold mb-1">Email :</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-[#e8eefc] border-b border-transparent hover:text-blue-400 hover:border-blue-400 transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            )}
            {profile?.github && (
              <div>
                <p className="text-blue-400 font-semibold mb-1">GitHub :</p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#e8eefc] border-b border-transparent hover:text-blue-400 hover:border-blue-400 transition-colors"
                >
                  {String(profile.github).replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Buttons — ✏️ EDIT: "View CV" ko apne real CV ka link do, misal href="/RanaNadeem-CV.pdf" */}
          <div {...anim(480)} className="mt-8 flex flex-wrap gap-4">
            <a
              href="/Muhammad_Nadeem_Resume.pdf"
              className="px-8 py-3 rounded-full font-semibold text-[#070d1f] bg-linear-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] shadow-[0_0_20px_rgba(59,130,246,.45)] hover:opacity-90 transition"
            >
              View CV
            </a>
            <a
              href="#contact"
              className="btn-sweep btn-sweep-outline px-8 py-3 rounded-full font-semibold text-[#e8eefc] border-2 border-blue-500/70 shadow-[0_0_18px_rgba(59,130,246,.35)]"
            >
              Hire Me Now!
            </a>
          </div>

          {/* Social icon buttons — data/portfolio.js ke `socials` se, asli SVG brand icons */}
          <div {...anim(600)} className="mt-8 flex gap-3">
            {(socials ?? []).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 rounded-xl border border-blue-500/50 flex items-center justify-center text-blue-300 shadow-[0_0_14px_rgba(59,130,246,.35)] hover:bg-blue-500/10 hover:scale-105 transition"
              >
                {SOCIAL_ICONS[s.label] || s.label?.[0]}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: portrait in arch mask with ANIMATED rotating gradient border, floating */}
        <div {...anim(300)} className="flex justify-center">
          <div className="animate-[floatY_7s_ease-in-out_infinite]">
            <div className="photo-frame morph-shape relative p-0.75">
              <SafeImage
                src="/profile.png"
                alt={profile?.name || "Rana Nadeem"}
                className="morph-shape relative z-1 block h-85 w-64 object-cover sm:h-115 sm:w-90 md:h-130 md:w-105 lg:h-120 lg:w-115"
                fallback={
                  <div className="morph-shape relative z-1 flex h-85 w-64 items-center justify-center bg-[#0e1830] text-6xl font-bold text-blue-300 sm:h-115 sm:w-90 md:h-130 md:w-105 lg:h-140 lg:w-115">
                    {initials}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
