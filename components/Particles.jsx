"use client";

import { useEffect, useRef } from "react";

// Background + mouse effects (canvas), matching the reference video:
//  - starfield: tiny blue dots everywhere, twinkling + slow drift
//  - mouse sparkle trail: moving the mouse releases small glowing
//    sparkles that scatter around the cursor and fade out
// No rising bubbles, no custom cursor — exactly like the video.
// Behind all content, pointer-events none, DPR-aware, pauses on hidden tab.
export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let stars = [];
    let sparks = [];
    let lastSpark = 0;

    const small = window.innerWidth < 768;
    const STAR_COUNT = small ? 80 : 170;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.5,
        dx: (Math.random() - 0.5) * 0.12,
        rise: Math.random() * 0.35 + 0.15, // neeche se upar uthne ki speed
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 2.2 + 1.0,
      }));
    };

    const onMouseMove = (e) => {
      const now = performance.now();
      if (now - lastSpark < 24) return; // throttle
      lastSpark = now;
      // burst of 3 sparkles around the cursor
      for (let i = 0; i < 4; i++) {
        if (sparks.length > 220) break;
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6 - 0.3, // slight upward drift
          r: Math.random() * 2 + 0.9,
          life: 1,
          decay: Math.random() * 0.013 + 0.01,
          star: Math.random() < 0.3, // some draw as 4-point sparkles
        });
      }
    };

    const drawSparkle = (s) => {
      const a = s.life;
      if (s.star) {
        // 4-point star (✦) shape
        const r = s.r * 3.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - r);
        ctx.quadraticCurveTo(s.x, s.y, s.x + r, s.y);
        ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + r);
        ctx.quadraticCurveTo(s.x, s.y, s.x - r, s.y);
        ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - r);
        ctx.fillStyle = `rgba(147, 197, 253, ${(0.85 * a).toFixed(3)})`;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${(0.8 * a).toFixed(3)})`;
        ctx.fill();
      }
    };

    const draw = (t) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      // --- starfield ---
      for (const s of stars) {
        // neeche se upar ki taraf movement + halka sa lehrana
        s.x += s.dx + Math.sin(t / 1600 + s.phase) * 0.05;
        s.y -= s.rise;
        if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
        if (s.x < -4) s.x = W + 4;
        else if (s.x > W + 4) s.x = -4;
        const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((t / 1000) * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // --- mouse sparkles: scatter + fade ---
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.life -= s.decay;
        drawSparkle(s);
      }

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    const onResize = () => { resize(); makeStars(); };

    resize();
    makeStars();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
