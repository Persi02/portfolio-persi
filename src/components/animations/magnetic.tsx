"use client";

import { useRef } from "react";
import { gsap } from "gsap";

import type { PointerEvent, ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
};

export function Magnetic({ children, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.3, ease: "power3.out", overwrite: "auto" });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
}
