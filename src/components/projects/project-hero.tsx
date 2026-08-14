import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  getCategoryLabel,
  getStatusLabel,
} from "@/lib/projects";
import type { Project } from "@/types";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const {
    title,
    shortDescription,
    category,
    status,
    year,
    role,
    client,
    technologies,
    thumbnail,
  } = project;

  return (
    <div className="border-b border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Tous les projets
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{getCategoryLabel(category)}</Badge>
          {status ? <Badge variant="secondary">{getStatusLabel(status)}</Badge> : null}
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {shortDescription ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {shortDescription}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {year ? <span>{year}</span> : null}
          {role ? <span>Rôle&nbsp;: {role}</span> : null}
          {client ? <span>Client&nbsp;: {client}</span> : null}
        </div>

        {technologies && technologies.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
              >
                {technology}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {thumbnail ? (
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted/50 shadow-card">
            <Image
              src={thumbnail}
              alt={title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
