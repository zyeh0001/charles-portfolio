"use client";

import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

/**
 * Mount this component anywhere in the tree to activate scroll-triggered
 * `.in-view` class toggling on all `.reveal` elements in the document.
 */
export function ScrollRevealProvider() {
  useScrollReveal();
  return null;
}
