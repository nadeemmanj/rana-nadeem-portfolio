import Link from "next/link";
import { aboutExtended } from "../../data/portfolio";

// Separate /about route: extended bio. Same blue theme.
// Content comes from data/portfolio.js (aboutExtended).
export default function AboutPage() {
  return (
    <main className="min-h-screen text-[#e8eefc] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-5">
        <p className="text-blue-400 text-sm font-semibold tracking-[0.3em]">
          LET ME INTRODUCE MYSELF
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mt-3">
          {aboutExtended?.heading || "More About Me"}
        </h1>

        <div className="mt-6 space-y-5 text-[#93a1c0] leading-relaxed">
          {aboutExtended?.paragraphs?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {aboutExtended?.highlight && (
          <p className="mt-8 text-lg font-bold text-blue-400">
            {aboutExtended.highlight}
          </p>
        )}

        <Link
          href="/"
          className="inline-block mt-10 px-8 py-3 rounded-full font-semibold text-[#070d1f] bg-gradient-to-r from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] shadow-[0_0_20px_rgba(59,130,246,.45)] hover:opacity-90 transition"
        >
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
