import { SectionHeading } from "@/components/animations/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillCategory, SkillCategoryGroup } from "@/types";

const layout: Record<SkillCategory, string> = {
  frontend: "sm:col-span-2 lg:col-span-3",
  backend: "lg:col-span-3",
  database: "lg:col-span-2",
  tools: "lg:col-span-2",
  cms: "lg:col-span-2",
};

function SkillCard({
  group,
  className,
}: {
  group: SkillCategoryGroup;
  className?: string;
}) {
  const skills = [
    ...group.skills.filter((skill) => skill.priority),
    ...group.skills.filter((skill) => !skill.priority),
  ];

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border border-border bg-card p-4 shadow-card",
        className
      )}
    >
      <h3 className="text-sm font-medium">{group.label}</h3>
      <ul className="mt-3 space-y-2">
        {skills.map((skill) => (
          <li key={skill.name} className="flex items-center gap-2 text-sm">
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                skill.priority ? "bg-primary" : "bg-border"
              )}
            />
            {skill.priority ? (
              <span className="font-medium text-foreground">{skill.name}</span>
            ) : (
              <span className="text-muted-foreground">{skill.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const categories = skillCategories.filter(
    (group) => group.skills.length > 0
  );

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="Compétences"
          title="Un écosystème JavaScript / TypeScript"
        />

        <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-6">
          {categories.map((group) => (
            <StaggerItem key={group.category} className={layout[group.category]}>
              <SkillCard group={group} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
