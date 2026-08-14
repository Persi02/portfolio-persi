import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAdjacentProjects } from "@/lib/projects";

type ProjectNavProps = {
  slug: string;
};

export function ProjectNav({ slug }: ProjectNavProps) {
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <nav
      aria-label="Navigation entre les projets"
      className="border-t border-border/60"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-card p-4 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Projet précédent
              </span>
              <span className="mt-2 text-sm font-medium transition-colors group-hover:text-primary">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-end rounded-lg border border-border bg-card p-4 text-right shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                Projet suivant
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 text-sm font-medium transition-colors group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/projects">
              Tous les projets
              <ArrowRight
                className="size-4"
                data-icon="inline-end"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
