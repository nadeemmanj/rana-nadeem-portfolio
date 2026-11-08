// Slim footer strip: copyright + quick links.
// (Navbar/Footer/BackToTop/ChatWidget are mounted in app/layout.jsx by Agent 1,
//  but this component is kept self-contained so it can render anywhere.)
"use client"; // year is computed in useEffect (Next 16 prerender rule)
import { useEffect, useState } from "react";
import { profile } from "../data/portfolio.js";

const QUICK_LINKS = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Portfolio", href: "#portfolio" },
  { title: "Contact", href: "#contact" },
];

export default function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => { setYear(String(new Date().getFullYear())); }, []);
  const name = profile?.name || "Rana Nadeem";

  return (
    <footer className="border-t border-[#1e2c52] bg-[#070d1f] py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
        <p className="text-sm text-[#93a1c0]">
          Copyright © {year} <span className="text-gradient font-semibold">{name}</span>. All Rights Reserved.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {QUICK_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#93a1c0] transition-colors hover:text-[#3b82f6]"
            >
              {l.title}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
