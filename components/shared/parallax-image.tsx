"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** How strongly the parallax moves. 0 = none, 0.1 = subtle (default). */
  speed?: number;
  sizes?: string;
}

/**
 * Drop this inside any `relative overflow-hidden` container.
 * It fills the container absolutely and translates the image on scroll.
 */
export function ParallaxImage({ src, alt, speed = 0.1, sizes }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [speed]);

  return (
    // Use inline styles to avoid Tailwind cascade conflicts with `relative`
    <div
      ref={ref}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    >
      {/* Taller than the container so parallax has room to travel */}
      <div
        style={{
          transform: `translateY(${offset}px)`,
          willChange: "transform",
          position: "absolute",
          top: "-12%",
          bottom: "-12%",
          left: 0,
          right: 0,
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    </div>
  );
}
