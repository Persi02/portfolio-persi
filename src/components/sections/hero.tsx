"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import { GitHubIcon } from "@/components/icons";
import { Magnetic } from "@/components/animations/magnetic";
import { HeroVisual } from "@/components/sections/hero-visual";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const title = ref.current?.querySelector("[data-hero-title]");
      const subtitle = ref.current?.querySelector("[data-hero-subtitle]");
      if (!title || !subtitle) return;

      const splitTitle = SplitText.create(title, {
        type: "words",
        mask: "words",
      });
      const splitSubtitle = SplitText.create(subtitle, {
        type: "words",
        mask: "words",
      });

      const ctaRow = ref.current?.querySelector("[data-hero-cta]");

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.from("[data-hero-eyebrow]", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          splitTitle.words,
          {
            yPercent: 120,
            rotateX: -45,
            duration: 0.9,
            stagger: 0.06,
            ease: "power4.out",
          },
          "+=0.15"
        )
        .from(
          splitSubtitle.words,
          {
            yPercent: 120,
            rotateX: -45,
            duration: 0.9,
            stagger: 0.05,
            ease: "power4.out",
          },
          "<0.2"
        )
        .from(
          "[data-hero-slash]",
          {
            opacity: 0,
            scale: 0.4,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "<0.3"
        )
        .from(
          "[data-hero-tagline]",
          { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" },
          "<0.2"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              if (ctaRow) {
                gsap.set(ctaRow, { clearProps: "opacity,transform" });
              }
            },
          },
          "<0.15"
        )
        .from(
          "[data-hero-visual]",
          {
            opacity: 0,
            y: 30,
            scale: 0.96,
            rotationY: 8,
            duration: 0.9,
            ease: "power3.out",
          },
          "<0.1"
        );

      gsap.to("[data-hero-parallax]", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return () => {
        splitTitle.revert();
        splitSubtitle.revert();
      };
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className="relative overflow-hidden">
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-5xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:pb-24 lg:pt-20"
      >
        <div className="flex flex-col items-start gap-4">
          <p
            data-hero-eyebrow
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {site.name}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            <span data-hero-title className="block">
              Web Developer
            </span>
            <span className="mt-1.5 block text-muted-foreground">
              <span aria-hidden="true" data-hero-slash className="text-primary">
                /{" "}
              </span>
              <span data-hero-subtitle>Full-Stack JavaScript Developer</span>
            </span>
          </h1>

          <p
            data-hero-tagline
            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {site.tagline}
          </p>

          <div
            data-hero-cta
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button size="lg" asChild>
                <Link href="/projects">
                  Voir les projets
                  <ArrowRight
                    className="size-4"
                    data-icon="inline-end"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Me contacter</Link>
              </Button>
            </Magnetic>
            {site.githubUrl ? (
              <Magnetic>
                <Button size="icon-lg" variant="outline" asChild>
                  <Link
                    href={site.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil GitHub"
                  >
                    <GitHubIcon className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
            ) : null}
          </div>
        </div>

        <div
          data-hero-visual
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <div data-hero-parallax>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
