"use client";
import { useState } from "react";
import { services } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Services — id="services". 2x2 grid (1 col on mobile).
// Each card: glowing circular emoji icon, title, 2-line description,
// and a gradient "Read More" button that expands details inline.
export default function Services() {
  const [open, setOpen] = useState(null); // index of expanded card, or null
  const items = services || [];

  return (
    <section id="services" className="py-24 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-5">
        <SectionHeading eyebrow="WHAT I WILL DO FOR YOU" title="Our Services" />

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {items.map((s, i) => (
            <Reveal key={i} delay={(i % 2) * 120} className="h-full">
              <div className="glow-card rounded-2xl bg-[#0e1830] p-8 text-center h-full flex flex-col">
                {/* Glowing circular icon */}
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-blue-500/60 flex items-center justify-center text-4xl bg-[#0e1830] shadow-[0_0_24px_rgba(59,130,246,.45)]">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold mt-5 text-[#e8eefc]">{s.title}</h3>
                <p className="text-[#93a1c0] mt-3 line-clamp-2">{s.description}</p>

                {/* Expanded details */}
                {open === i && (
                  <p className="text-[#93a1c0] mt-3 text-sm leading-relaxed">
                    {s.details}
                  </p>
                )}

                <div className="mt-auto pt-5">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="px-6 py-2 rounded-full text-sm font-semibold text-[#070d1f] bg-linear-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] shadow-[0_0_16px_rgba(59,130,246,.4)] hover:opacity-90 transition"
                  >
                    {open === i ? "Show Less" : "Read More"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
