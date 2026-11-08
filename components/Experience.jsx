import { experience } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Experience — id="experience". Vertical alternating timeline:
// glowing blue center line (desktop) / left line (mobile) + glowing node dots.
// Cards come from the `experience` export in data/portfolio.js.
export default function Experience() {
  const items = experience || [];

  return (
    <section id="experience" className="py-24 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-5">
        <SectionHeading eyebrow="PROFESSIONAL JOURNEY" title="Work Experience" />

        <div className="relative mt-14">
          {/* Glowing center/left line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-[#3b82f6] via-[#3b82f6] to-[#1d4ed8] shadow-[0_0_12px_rgba(59,130,246,.8)]" />

          {items.map((exp, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={i} delay={(i % 2) * 120}>
                <div
                  className={`relative mb-10 pl-12 md:pl-0 md:w-1/2 ${
                    left ? "md:pr-12" : "md:ml-auto md:pl-12"
                  }`}
                >
                  {/* Glowing node dot on the line */}
                  <span
                    className={`absolute top-7 w-4 h-4 rounded-full bg-[#3b82f6] shadow-[0_0_14px_rgba(59,130,246,.9)] left-4 -translate-x-1/2 ${
                      left
                        ? "md:left-full md:-translate-x-1/2"
                        : "md:left-0 md:-translate-x-1/2"
                    }`}
                  />
                  <div className="glow-card rounded-2xl bg-[#0e1830] p-6">
                    <h3 className="text-lg font-semibold text-blue-300">{exp.title}</h3>
                    <p className="text-[#e8eefc] font-medium mt-1">{exp.org}</p>
                    <p className="text-[#93a1c0] text-sm mt-2">
                      <span>📅 {exp.period}</span>
                      {exp.location && <span className="ml-4">📍 {exp.location}</span>}
                    </p>
                    <p className="text-[#93a1c0] text-sm mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
