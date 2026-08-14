"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import type { ReactNode } from "react";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-stagger-item]");
    if (items.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}
