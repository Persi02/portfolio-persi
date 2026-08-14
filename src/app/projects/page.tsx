import type { Metadata } from "next";

import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsEmpty } from "@/components/projects/projects-empty";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Les projets Web de Herinjaka Andriamananandro : applications React, Next.js et Node.js, de l'interface à la base de données.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Projets
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Tous les projets
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Une sélection d&apos;applications Web, de l&apos;interface jusqu&apos;au
          backend et à la base de données.
        </p>

        {projects.length > 0 ? (
          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <StaggerItem key={project.id} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="mt-10">
            <ProjectsEmpty />
          </div>
        )}
      </div>
    </main>
  );
}
