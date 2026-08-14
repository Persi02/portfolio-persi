import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
} from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectNav } from "@/components/projects/project-nav";
import { ProjectSection } from "@/components/projects/project-section";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { getProjectBySlug, getProjects } from "@/lib/projects";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      type: "article",
      locale: "fr_FR",
      title: project.title,
      description: project.shortDescription,
      url: site.url
        ? `${site.url}/projects/${project.slug}`
        : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { description, features, technologies, caseStudy } = project;
  const rawSections: ({ title: string; content: ReactNode } | null)[] = [
    description
      ? {
          title: "Overview",
          content: <p>{description}</p>,
        }
      : null,
    caseStudy?.context
      ? {
          title: "Contexte",
          content: <p>{caseStudy.context}</p>,
        }
      : null,
    caseStudy?.problem
      ? {
          title: "Problème",
          content: <p>{caseStudy.problem}</p>,
        }
      : null,
    caseStudy?.solution
      ? {
          title: "Solution",
          content: <p>{caseStudy.solution}</p>,
        }
      : null,
    features && features.length > 0
      ? {
          title: "Fonctionnalités",
          content: (
            <ul className="grid gap-2 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    technologies && technologies.length > 0
      ? {
          title: "Tech Stack",
          content: (
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md bg-muted px-2.5 py-1 font-mono text-sm text-muted-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>
          ),
        }
      : null,
    caseStudy?.architecture && caseStudy.architecture.length > 0
      ? {
          title: "Architecture",
          content: (
            <div className="max-w-sm">
              {caseStudy.architecture.map((layer, index) => (
                <div key={layer}>
                  {index > 0 ? (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="size-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                  ) : null}
                  <div className="rounded-md border border-border bg-card px-4 py-2.5 font-mono text-sm">
                    {layer}
                  </div>
                </div>
              ))}
            </div>
          ),
        }
      : null,
    caseStudy?.challenges && caseStudy.challenges.length > 0
      ? {
          title: "Défis rencontrés",
          content: (
            <ul className="space-y-2">
              {caseStudy.challenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-2">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    caseStudy?.results && caseStudy.results.length > 0
      ? {
          title: "Résultats",
          content: (
            <ul className="space-y-2">
              {caseStudy.results.map((result) => (
                <li key={result} className="flex items-start gap-2">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    project.images && project.images.length > 0
      ? {
          title: "Galerie",
          content: <ProjectGallery images={project.images} />,
        }
      : null,
    project.liveUrl || project.githubUrl
      ? {
          title: "Liens",
          content: (
            <div className="flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Button asChild>
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le site
                    <ArrowUpRight
                      className="size-4"
                      data-icon="inline-end"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button variant="outline" asChild>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon
                      className="size-4"
                      data-icon="inline-start"
                      aria-hidden="true"
                    />
                    Code source
                  </Link>
                </Button>
              ) : null}
            </div>
          ),
        }
      : null,
  ];

  const sections = rawSections.filter(
    (
      section: { title: string; content: ReactNode } | null,
    ): section is { title: string; content: ReactNode } =>
      section !== null,
  );

  return (
    <main className="flex flex-1 flex-col">
      <ProjectHero project={project} />

      {sections.map((section, index) => (
        <ProjectSection
          key={section.title}
          eyebrow={String(index + 1).padStart(2, "0")}
          title={section.title}
        >
          {section.content}
        </ProjectSection>
      ))}

      <ProjectNav slug={project.slug} />
    </main>
  );
}
