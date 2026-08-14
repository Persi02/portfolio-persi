import type { ExperienceEntry } from "@/types";

export const experiences: ExperienceEntry[] = [
  {
    id: "bienfe",
    organization: "Bienfe",
    role: "Web Developer",
    period: "2026 — aujourd'hui",
    current: true,
    type: "work",
    technologies: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Shopify",
      "WordPress",
      "WooCommerce",
    ],
  },
  {
    id: "mtechniix-frontend",
    organization: "Mtechniix",
    role: "Frontend Developer",
    type: "work",
    technologies: ["React", "JavaScript", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    id: "mtechniix-junior",
    organization: "Mtechniix",
    role: "Intégrateur XML",
    period: "2024",
    type: "work",
  },
  {
    id: "universite-ankatso",
    organization: "Université d'Ankatso",
    role: "Diplôme en informatique",
    period: "2019 — 2022",
    type: "education",
  },
  {
    id: "saha-academy",
    organization: "Saha Academy",
    role: "Frontend Developer",
    type: "education",
  },
];
