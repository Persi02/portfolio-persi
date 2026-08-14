import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos",
  description: "Profil de Herinjaka Andriamananandro : Web Developer / Full-Stack JavaScript Developer, parcours, spécialisation et philosophie de travail.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          À propos de {site.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {site.tagline}
        </p>
      </div>
      <About showCta={false} />
      <Experience />
    </main>
  );
}