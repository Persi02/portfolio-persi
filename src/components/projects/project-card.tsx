import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Project, ProjectCategory } from "@/types";

const categoryLabels: Record<ProjectCategory, string> = {
  frontend: "Frontend",
  "full-stack": "Full-stack",
  "e-commerce": "E-commerce",
  business: "Application métier",
  other: "Autre",
};

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

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-[transform,box-shadow,border-color] duration-300 motion-reduce:transition-none hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:border-primary/40 hover:shadow-elevated"
    >
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

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline">{categoryLabels[category]}</Badge>
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
