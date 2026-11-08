"use client";
import { useEffect, useState } from "react";

// Fixed top navbar — compact (~64px). Transparent over the hero,
// turns solid dark with a hairline border once scrolled.
// Scrollspy highlights the active section link as a glowing blue pill.
const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // scrollspy: last section whose top passed the navbar offset
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = (id) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
      active === id
        ? "text-blue-300 border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,.45)] bg-blue-500/10"
        : "text-[#93a1c0] hover:text-white border border-transparent"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070d1fEE] border-b border-blue-500/20 shadow-[0_4px_20px_rgba(0,0,0,.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo only — naam hata diya, sirf logo */}
        <a href="#home" aria-label="Rana Nadeem — home">
          <img
            src="/logo.png"
            alt="Rana Nadeem logo"
            width="44"
            height="44"
            className="h-11 w-11 rounded-xl ring-1 ring-blue-500/40 shadow-[0_0_16px_rgba(59,130,246,.5)] transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkCls(l.href.slice(1))}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block w-6 h-0.5 bg-white rounded transition-all ${open ? "opacity-0" : ""}`} />
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={`lg:hidden fixed top-16 right-0 bottom-0 w-64 bg-[#0e1830] border-l border-blue-500/20 p-6 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={`${linkCls(l.href.slice(1))} block text-center`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
