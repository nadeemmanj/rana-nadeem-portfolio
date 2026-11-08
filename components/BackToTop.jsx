"use client";
// Floating back-to-top button: blue gradient circle, bottom-right.
// Appears only after scrolling past ~80% of the first viewport (past the hero).
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#bfdbfe] via-[#3b82f6] to-[#1d4ed8] text-xl font-bold text-[#070d1f] shadow-[0_0_25px_rgba(59,130,246,.45)] transition-all duration-300 hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}
