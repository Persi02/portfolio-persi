"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const FIREFLY_COUNT = 26;

type Firefly = {
  size: number;
  left: number;
  top: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  opacity: number;
  halo: number;
};

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function createFireflies(): Firefly[] {
  return Array.from({ length: FIREFLY_COUNT }, (_, index) => ({
    size: 3 + pseudoRandom(index * 2 + 1) * 3,
    left: 2 + pseudoRandom(index * 2 + 2) * 96,
    top: 2 + pseudoRandom(index * 2 + 3) * 96,
    driftX: -260 + pseudoRandom(index * 2 + 4) * 520,
    driftY: -200 + pseudoRandom(index * 2 + 5) * 400,
    duration: 3 + pseudoRandom(index * 2 + 6) * 5,
    delay: pseudoRandom(index * 2 + 7) * 3,
    opacity: 0.45 + pseudoRandom(index * 2 + 8) * 0.45,
    halo: 16 + pseudoRandom(index * 2 + 9) * 18,
  }));
}

const FIREFLIES = createFireflies();

export function Fireflies() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    el.querySelectorAll<HTMLElement>("[data-firefly]").forEach((dot, index) => {
      const firefly = FIREFLIES[index] ?? FIREFLIES[0];
      gsap.set(dot, {
        left: `${firefly.left}%`,
        top: `${firefly.top}%`,
        width: firefly.size,
        height: firefly.size,
        opacity: firefly.opacity,
        borderRadius: "50%",
        boxShadow: `0 0 ${firefly.halo}px 2px color-mix(in oklch, var(--primary) 45%, transparent)`,
        background:
          "radial-gradient(circle, var(--primary) 0%, color-mix(in oklch, var(--primary) 40%, transparent) 40%, transparent 70%)",
      });
    });

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const dots = el.querySelectorAll<HTMLElement>("[data-firefly]");
      const tweens = Array.from(dots).flatMap((dot, index) => {
        const firefly = FIREFLIES[index] ?? FIREFLIES[0];

        const drift = gsap.to(dot, {
          x: firefly.driftX,
          y: firefly.driftY,
          duration: firefly.duration,
          delay: firefly.delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        const pulse = gsap.to(dot, {
          opacity: 0.25,
          scale: 0.7,
          duration: firefly.duration / 2,
          delay: firefly.delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        return [drift, pulse];
      });

      const handleVisibility = () => {
        const paused = document.hidden;
        tweens.forEach((tween) => {
          if (paused) {
            tween.pause();
          } else {
            tween.resume();
          }
        });
      };

      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      el.querySelectorAll<HTMLElement>("[data-firefly]").forEach((dot) => {
        gsap.set(dot, { opacity: 0.35 });
      });
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
    >
      {FIREFLIES.map((firefly, index) => (
        <span key={index} data-firefly className="absolute" />
      ))}
    </div>
  );
}
