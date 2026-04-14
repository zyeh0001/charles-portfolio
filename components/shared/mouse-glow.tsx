"use client";

import { useEffect } from "react";

/**
 * Two-layer mouse background interaction:
 *
 * 1. Spotlight — a full-viewport radial gradient centered on the cursor.
 *    The background "lights up" around the mouse like a torch on dark glass.
 *    Uses CSS custom properties (--mx, --my) so there are zero React re-renders.
 *
 * 2. Aurora blobs — three blurred color orbs that drift via CSS animation
 *    and softly follow the cursor at different speeds, creating a living
 *    ambient background.
 */
export function MouseGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    // Initialise to center so first render looks good
    root.style.setProperty("--mx", `${window.innerWidth / 2}px`);
    root.style.setProperty("--my", `${window.innerHeight / 2}px`);

    // Aurora blob targets
    let t1x = 25, t1y = 30, t2x = 70, t2y = 60, t3x = 50, t3y = 80;
    let c1x = t1x, c1y = t1y, c2x = t2x, c2y = t2y, c3x = t3x, c3y = t3y;
    let mouseNormX = 0.5, mouseNormY = 0.5;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      // Spotlight — direct, no lerp so it feels immediate
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
      mouseNormX = e.clientX / window.innerWidth;
      mouseNormY = e.clientY / window.innerHeight;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let frame = 0;
    const tick = () => {
      frame++;
      // Gentle drift so blobs feel alive even when the mouse isn't moving
      const drift  = Math.sin(frame * 0.003) * 5;
      const drift2 = Math.cos(frame * 0.002) * 6;
      const drift3 = Math.sin(frame * 0.0035 + 1) * 4;

      // Blobs track across most of the viewport (10–80% range)
      t1x = 10 + mouseNormX * 60 + drift;
      t1y = 10 + mouseNormY * 60 + drift;
      t2x = 30 + mouseNormX * 50 + drift2;
      t2y = 20 + mouseNormY * 55 + drift2;
      t3x = 20 + mouseNormX * 55 + drift3;
      t3y = 30 + mouseNormY * 50 + drift3;

      // Faster lerp so they visibly chase — blob1 quickest, blob2 slowest
      c1x = lerp(c1x, t1x, 0.06);
      c1y = lerp(c1y, t1y, 0.06);
      c2x = lerp(c2x, t2x, 0.035);
      c2y = lerp(c2y, t2y, 0.035);
      c3x = lerp(c3x, t3x, 0.05);
      c3y = lerp(c3y, t3y, 0.05);

      root.style.setProperty("--b1x", `${c1x}%`);
      root.style.setProperty("--b1y", `${c1y}%`);
      root.style.setProperty("--b2x", `${c2x}%`);
      root.style.setProperty("--b2y", `${c2y}%`);
      root.style.setProperty("--b3x", `${c3x}%`);
      root.style.setProperty("--b3y", `${c3y}%`);

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Spotlight layer: full-viewport gradient locked to cursor */}
      <div
        aria-hidden="true"
        className="mouse-spotlight"
      />

      {/* Aurora layer: three animated blobs */}
      <div aria-hidden="true" className="aurora-layer">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>
    </>
  );
}
