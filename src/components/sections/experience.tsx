"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/animations/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger";
import { experiences } from "@/data/experience";
import type { ExperienceEntryType } from "@/types";

const typeLabels: Partial<Record<ExperienceEntryType, string>> = {
  work: "Expérience professionnelle",
  education: "Formation",
};

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lines = ref.current?.querySelectorAll<HTMLElement>(
        "[data-experience-line]"
      );
      lines?.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        "[data-experience-dot]",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: ref });

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="Expérience"
          title="Parcours & formation"
        />

        <StaggerContainer className="mt-10" stagger={0.1}>
          <ol>
            {experiences.map((entry, index) => {
              const isLast = index === experiences.length - 1;

              return (
                <StaggerItem key={entry.id}>
                  <li className="relative pb-10 ps-8 last:pb-0 sm:grid sm:grid-cols-[170px_1fr] sm:gap-x-8 sm:ps-10">
                    <span
                      data-experience-line
                      className={
                        isLast
                          ? "hidden"
                          : "absolute start-[3px] top-2 h-full w-px origin-top bg-border"
                      }
                      aria-hidden="true"
                    />
                    <span
                      data-experience-dot
                      className="absolute start-0 top-1.5 size-[7px] rounded-full border-2 border-primary bg-background"
                      aria-hidden="true"
                    />

                  <div className="sm:pt-0.5">
                    {entry.period ? (
                      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {entry.period}
                      </p>
                    ) : (
                      <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                        {entry.type ? typeLabels[entry.type] : "Parcours"}
                      </p>
                    )}
                    {entry.current ? (
                      <Badge variant="outline" className="mt-2">
                        En cours
                      </Badge>
                    ) : null}
                  </div>

                  <div className="mt-3 sm:mt-0">
                    <h3 className="text-base font-medium tracking-tight">
                      {entry.organization}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {entry.role}
                    </p>
                    {entry.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    ) : null}
                    {entry.technologies && entry.technologies.length > 0 ? (
                      <p className="mt-3 flex flex-wrap gap-1.5">
                        {entry.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                          >
                            {technology}
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </li>
                </StaggerItem>
              );
            })}
          </ol>
        </StaggerContainer>
      </div>
    </section>
  );
}
