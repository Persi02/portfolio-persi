"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const titleEl = el?.querySelector("[data-section-heading-title]");
    if (!el || !titleEl) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(titleEl, {
        type: "words",
        mask: "words",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      tl.from("[data-section-heading-eyebrow]", {
        opacity: 0,
        x: -8,
        duration: 0.4,
        ease: "power3.out",
      }).from(
        split.words,
        {
          yPercent: 120,
          rotateX: -30,
          duration: 0.7,
          stagger: 0.04,
          ease: "power4.out",
        },
        "-=0.1"
      );

      const desc = el.querySelector("[data-section-heading-desc]");
      if (desc) {
        tl.from(
          desc,
          { opacity: 0, y: 12, duration: 0.5, ease: "power3.out" },
          "<0.2"
        );
      }

      return () => {
        split.revert();
      };
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <div ref={ref}>
      <p
        data-section-heading-eyebrow
        className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
      >
        {eyebrow}
      </p>
      <h2
        data-section-heading-title
        className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        {title}
      </h2>
      {children ? (
        <div
          data-section-heading-desc
          className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
