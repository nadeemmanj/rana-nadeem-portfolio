// Certificates — id="certificates". Grid of certificate cards.
// All data comes from the `certificates` export in data/portfolio.js —
// no hardcoded portfolio text.
// ✏️ EDIT: apne real certificates data/portfolio.js mein likho
// (title, issuer, date). Agar certificate ki image ho to
// public/certificates/ mein rakho aur data mein `image` field add karo.
import { certificates } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Certificates() {
  const items = certificates ?? [];

  if (items.length === 0) return null;

  return (
    <section id="certificates" className="py-24 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="MY ACHIEVEMENTS" title="Certificates" />

        {/* 4-col grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c, i) => (
            <Reveal key={i} delay={(i % 4) * 80} className="h-full">
              <div className="glow-card flex h-full flex-col items-center rounded-2xl bg-[#0e1830] p-6 text-center">
                {/* Glowing trophy icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-500/60 bg-[#0e1830] text-3xl shadow-[0_0_24px_rgba(59,130,246,.45)]">
                  🏆
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug text-[#e8eefc]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-[#93a1c0]">{c.issuer}</p>
                {c.date && (
                  <span className="mt-3 rounded-full border border-blue-500/50 px-3 py-1 text-xs font-semibold text-blue-300">
                    {c.date}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
