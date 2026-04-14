"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  once?: boolean;
}

const SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

/**
 * Two-observer bidirectional scroll reveal:
 *
 *  entryObserver  — low threshold (0.08): adds .in-view as soon as the
 *                   element peeks into the viewport → fast entry animation.
 *
 *  exitObserver   — high threshold (0.55): fires while the element is still
 *                   45 % visible when exiting the BOTTOM (scroll up) →
 *                   removes .in-view early so the reverse animation is obvious.
 *                   Elements exiting the TOP (already passed) are left alone.
 */
function createObservers(once: boolean) {
  const entryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          if (once) entryObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -10px 0px" }
  );

  const exitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && !once) {
          // top > 0  →  element is below viewport (user scrolled back up) → reverse
          // top < 0  →  element is above viewport (already scrolled past)  → keep visible
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("in-view");
          }
        }
      });
    },
    { threshold: 0.55 } // fires when only 45 % of the element is still in view
  );

  return { entryObserver, exitObserver };
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { once = false } = options;

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
    if (!elements.length) return;

    const { entryObserver, exitObserver } = createObservers(once);

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Already above fold → start revealed immediately
      if (rect.bottom < 0) {
        el.classList.add("in-view");
      } else {
        entryObserver.observe(el);
        if (!once) exitObserver.observe(el);
      }
    });

    return () => {
      entryObserver.disconnect();
      exitObserver.disconnect();
    };
  }, [once]);
}

export function useRevealRef<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const { once = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { entryObserver, exitObserver } = createObservers(once);

    entryObserver.observe(el);
    if (!once) exitObserver.observe(el);

    return () => {
      entryObserver.disconnect();
      exitObserver.disconnect();
    };
  }, [once]);

  return ref;
}
