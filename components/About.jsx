import Link from "next/link";
import { profile, about, stats } from "../data/portfolio";
import SafeImage from "../components/SafeImage";
import Reveal from "../components/Reveal";

// About — id="about". Two columns: portrait with stat badges (left),
// intro text + pull quote + Read More button (right).
// All content comes from data/portfolio.js — no hardcoded portfolio text.
export default function About() {
  // 3 overlapping badge positions around the portrait —
  // labels ke hisaab se adjust: upar-wala right corner par,
  // darmiyan wala left kinare par, neeche wala bilkul center mein.
  const badgePos = [
    "-top-4 right-2 md:-top-2 md:-right-4",
    "top-1/2 -left-2 md:-left-7",
    "-bottom-4 left-1/2 -translate-x-1/2 md:-bottom-5",
  ];

  return (
    <section id="about" className="py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5">
        {/* Eyebrow */}
        <Reveal>
          <p className="text-center text-blue-400 text-sm font-semibold tracking-[0.3em]">
            LET ME INTRODUCE MYSELF
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
          {/* LEFT: portrait with overlapping stat badges.
              `group` = mouse aane par halki si hover animation:
              photo halki zoom, card ki glow tez, badges halke se barhte hain. */}
          <Reveal className="flex justify-center">
            <div className="group relative transition-transform duration-500 hover:-translate-y-1.5">
              <div className="rounded-2xl border border-blue-500/40 shadow-[0_0_30px_rgba(44, 125, 255, 0.35)] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_0_55px_rgba(59,130,246,.6)]">
                <SafeImage
                  src="/about.jpg"
                  alt={profile?.name || "About"}
                  className="w-72 h-80 sm:w-[320px] sm:h-100 md:w-126 md:h-115 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  fallback={
                    <div className="w-72 h-80 sm:w-[320px] sm:h-100 md:w-85 md:h-105 bg-[#0e1830] flex items-center justify-center text-6xl font-bold text-blue-300">
                      {(profile?.name || "RN").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                    </div>
                  }
                />
              </div>
              {/* 3 dark stat badges overlapping the portrait */}
              {(stats ?? []).slice(0, 3).map((s, i) => (
                <div
                  key={i}
                  className={`absolute ${badgePos[i % badgePos.length]} bg-[#0e1830] border border-blue-500/40 rounded-xl px-2.5 py-1.5 text-center md:rounded-2xl md:px-4 md:py-2 shadow-[0_0_18px_rgba(59,130,246,.4)] transition-all duration-500 group-hover:scale-110 group-hover:border-blue-400/70`}
                >
                  <div className="text-blue-300 font-bold text-sm leading-tight md:text-lg">{s.value}</div>
                  <div className="text-[#93a1c0] text-[9px] md:text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* RIGHT: heading, paragraphs, pull quote, button */}
          <Reveal delay={150}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#e8eefc]">
              Hi, I&apos;m <span className="text-gradient">{profile?.name || "Rana Nadeem"}</span>
            </h2>
            <div className="mt-5 space-y-4 text-[#93a1c0] leading-relaxed">
              {about?.paragraphs?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {about?.quote && (
              <blockquote className="mt-6 pl-4 border-l-2 border-blue-500 italic text-blue-300">
                &ldquo;{about.quote}&rdquo;
              </blockquote>
            )}
            <Link
              href="/about"
              className="btn-sweep btn-sweep-primary inline-block mt-7 px-8 py-3 rounded-full font-semibold text-[#070d1f] bg-linear-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] shadow-[0_0_20px_rgba(59,130,246,.45)]"
            >
              Read More!
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
