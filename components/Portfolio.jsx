"use client";
// Portfolio section: filterable project grid with hover overlays.
// All data comes from data/portfolio.js — no hardcoded portfolio text.
import { useMemo, useRef, useState } from "react";
import { projects } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";

const PAGE_SIZE = 6;

// GitHub mark (same canonical simple-icons path as Hero socials).
function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  );
}

// External-link icon for the hover overlay button.
function ExternalIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Portfolio() {
  // ALL + one pill per unique project category (data uses `categories` array).
  const categories = useMemo(
    () => ["ALL", ...new Set((projects ?? []).flatMap((p) => p.categories ?? []))],
    []
  );
  const [active, setActive] = useState("ALL");
  const [showAll, setShowAll] = useState(false);
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

  const filtered =
    active === "ALL"
      ? projects ?? []
      : (projects ?? []).filter((p) => (p.categories ?? []).includes(active));
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);

  const pick = (cat) => {
    setActive(cat);
    setShowAll(false); // reset expansion when the filter changes
  };

  return (
    <section id="portfolio" ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="WHAT I WILL DO FOR YOU" title="Latest Projects" />

        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => pick(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                active === cat
                  ? "bg-linear-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] text-[#070d1f] shadow-[0_0_20px_rgba(59,130,246,.45)]"
                  : "border border-[#1e2c52] text-[#93a1c0] hover:border-[#3b82f6] hover:text-[#e8eefc]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-col grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-[#1e2c52] bg-[#0e1830]/80 shadow-[0_0_25px_rgba(59,130,246,.12)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,.45)]">
                {/* 16:9 thumbnail (falls back to gradient + emoji when no image file) */}
                <SafeImage
                  src={`/projects/${p.slug}.jpg`}
                  alt={p.title}
                  className="aspect-video w-full bg-[#070d1f] object-contain"
                  fallback={
                    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-[#0e1830] via-[#14306b] to-[#1d4ed8]">
                      <span className="text-5xl">{p.emoji}</span>
                      <span className="px-4 text-center font-semibold text-[#e8eefc]">{p.title}</span>
                    </div>
                  }
                />
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3b82f6]">
                    {(p.categories ?? []).join(" · ")}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-[#e8eefc]">{p.title}</h3>
                  {/* Mobile / touch screens: hover nahi hota, is liye buttons yahin dikhao (desktop par overlay mein hain) */}
                  <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
                    {p.liveUrl && p.liveUrl !== "#" && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] px-4 py-1.5 text-xs font-semibold text-[#070d1f]"
                      >
                        <ExternalIcon size={14} /> Live Demo
                      </a>
                    )}
                    {p.githubUrl && p.githubUrl !== "#" && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#3b82f6] px-4 py-1.5 text-xs font-semibold text-[#e8eefc]"
                      >
                        <GitHubIcon size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover overlay: blue gradient + emoji, title, description, link button */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-[#1d4ed8]/95 via-[#3b82f6]/90 to-[#0e1830]/95 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100">
                  <span className="text-4xl">{p.emoji}</span>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="line-clamp-2 text-sm text-[#dbe7ff]">{p.description}</p>
                  <div className="mt-1 flex items-center gap-3">
                    {p.liveUrl && p.liveUrl !== "#" && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${p.title} live demo`}
                        title="Live demo"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1d4ed8] shadow-lg transition-transform hover:scale-110"
                      >
                        <ExternalIcon />
                      </a>
                    )}
                    {p.githubUrl && p.githubUrl !== "#" && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${p.title} source code on GitHub`}
                        title="GitHub"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#070d1f] text-white shadow-lg ring-1 ring-white/40 transition-transform hover:scale-110"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-[#93a1c0]">No projects in this category yet.</p>
        )}

        {/* More / Less toggle */}
        {filtered.length > PAGE_SIZE && (
          <div className="mt-10 text-center">
            <button
              onClick={toggleShowAll}
              className="rounded-full border border-[#3b82f6] px-8 py-2.5 text-sm font-semibold text-[#3b82f6] transition-colors hover:bg-[#3b82f6] hover:text-[#070d1f]"
            >
              {showAll ? "Show Less" : "More Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}