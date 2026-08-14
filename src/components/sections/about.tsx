import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger";

const highlights = [
  {
    title: "Full-stack JavaScript",
    description:
      "React, Next.js et Node.js, avec PostgreSQL, MySQL ou MongoDB côté données.",
  },
  {
    title: "Web Developer chez Bienfe",
    description:
      "Depuis 2026 : React, Next.js, TypeScript, Tailwind CSS, Shopify et WordPress.",
  },
  {
    title: "E-commerce & CMS",
    description:
      "Shopify, WordPress et WooCommerce — des sites et boutiques aux applications métier.",
  },
];

export function About({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            À propos
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Un profil frontend & full-stack
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn delay={0.1} className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Je suis Herinjaka, développeur Web dans l&apos;écosystème
              JavaScript / TypeScript. Je conçois des applications Web modernes
              de bout en bout : des interfaces soignées en React et Next.js
              jusqu&apos;au backend Node.js et aux bases de données.
            </p>
            <p>
              Actuellement Web Developer chez Bienfe, j&apos;ai auparavant
              travaillé chez Mtechniix en développement frontend puis comme
              Junior Developer. J&apos;accorde autant d&apos;attention à
              l&apos;expérience utilisateur qu&apos;à la robustesse du code :
              des interfaces claires, maintenables, pensées comme un tout.
            </p>
{showCta && (
               <Link
                 href="/about"
                 className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
               >
                 En savoir plus
                 <ArrowRight className="size-4" aria-hidden="true" />
               </Link>
             )}
          </FadeIn>

          <StaggerContainer className="grid gap-4">
            {highlights.map((highlight) => (
              <StaggerItem key={highlight.title}>
                <div className="rounded-lg border border-border bg-card p-4 shadow-card">
                  <h3 className="text-sm font-medium">{highlight.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {highlight.description}
                  </p>                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
