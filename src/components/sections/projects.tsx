import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/animations/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsEmpty } from "@/components/projects/projects-empty";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects";

export function Projects() {
  const featured = getFeaturedProjects();

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Projets" title="Selected Projects" />

        {featured.length > 0 ? (
          <StaggerContainer className="mt-8 grid gap-5 sm:grid-cols-2">
            {featured.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.1} className="mt-8">
            <ProjectsEmpty />
          </FadeIn>
        )}

        <FadeIn delay={0.15} className="mt-8">
          <Button variant="outline" asChild>
            <Link href="/projects">
              Tous les projets
              <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
