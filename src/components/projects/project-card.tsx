"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { Badge } from "@/components/ui/badge";
import { getCategoryLabel } from "@/lib/projects";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const {
    slug,
    title,
    category,
    shortDescription,
    thumbnail,
    technologies,
    year,
  } = project;

  const ref = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const card = ref.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!window.matchMedia("(hover: hover)").matches) return;

      const xTo = gsap.quickTo(glow, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(glow, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      const onEnter = () => {
        gsap.to(card, {
          y: -4,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(glow, { opacity: 1, duration: 0.3 });
      };

      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(glow, { opacity: 0, duration: 0.3 });
      };

      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        xTo(event.clientX - rect.left - glow.offsetWidth / 2);
        yTo(event.clientY - rect.top - glow.offsetHeight / 2);
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("pointermove", onMove);

      return () => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("pointermove", onMove);
      };
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <Link
      ref={ref}
      href={`/projects/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-[box-shadow,border-color] duration-300 motion-reduce:transition-none hover:border-primary/40 hover:shadow-elevated"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <span
          ref={glowRef}
          className="absolute left-0 top-0 size-60 rounded-full opacity-0 transition-opacity duration-300 motion-reduce:transition-none [background:radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_18%,transparent)_0%,transparent_65%)]"
        />
      </span>

      <div className="relative aspect-[16/10] overflow-hidden bg-muted/50">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-xs text-muted-foreground">
              image à venir
            </span>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline">{getCategoryLabel(category)}</Badge>
          {year ? (
            <span className="text-xs text-muted-foreground">{year}</span>
          ) : null}
        </div>

        <h3 className="mt-2 text-base font-medium tracking-tight">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {shortDescription}
        </p>

        {technologies && technologies.length > 0 ? (
          <p className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {technology}
              </span>
            ))}
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary md:opacity-0 md:transition-opacity md:duration-300 md:motion-reduce:transition-none md:group-hover:opacity-100">
          Voir le projet
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
