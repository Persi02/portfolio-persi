import type { ReactNode } from "react";

type ProjectSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function ProjectSection({
  eyebrow,
  title,
  children,
}: ProjectSectionProps) {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              {title}
            </h2>
          </div>
          <div className="min-w-0 text-base leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
