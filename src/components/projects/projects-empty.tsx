import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function ProjectsEmpty() {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
      <div className="mx-auto flex size-10 items-center justify-center rounded-full border border-border bg-card">
        <FolderOpen className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Bientôt disponible
      </p>
      <h3 className="mt-2 text-base font-medium">
        Les projets sont en cours d&apos;ajout
      </h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
        Les vrais projets, avec leurs informations et captures d&apos;écran,
        seront publiés ici dès qu&apos;ils seront prêts.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/contact">Me contacter</Link>
        </Button>
        {site.githubUrl ? (
          <Button variant="outline" asChild>
            <Link
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir GitHub
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
