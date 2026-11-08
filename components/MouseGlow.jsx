"use client";

import { useEffect, useRef, useState } from "react";

// Soft blue radial glow (300px) that follows the mouse with lerp smoothing.
// mix-blend-screen so it lightens content beneath; hidden on touch devices.
// NOTE: z-0 inside the layout's z-10 content wrapper —
// the old -z-10 version hid behind the body background and never showed.
export default function MouseGlow() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // touch devices (phones/tablets) have no mouse — skip entirely
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const el = ref.current;
    let tx = -400, ty = -400; // target (mouse)
    let x = -400, y = -400;   // current (lerped)
    let raf = 0;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      // lerp: move 20% of the remaining distance each frame = tez magar smooth follow
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (el) el.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[300px] w-[300px] rounded-full mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)",
      }}
    />
  );
}
