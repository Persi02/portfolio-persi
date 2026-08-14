import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.role} — ${site.name}`,
  description: site.tagline,
};

type PersonLd = {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
  sameAs?: string[];
};

function personJsonLd() {
  const data: PersonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.tagline,
  };
  if (site.url) {
    data.url = site.url;
  }
  const sameAs = [site.githubUrl, site.linkedinUrl].filter(Boolean);
  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLd() }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
