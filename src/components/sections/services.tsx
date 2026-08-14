import Link from "next/link";
import {
  AppWindow,
  Layers,
  Monitor,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/animations/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger";
import { services } from "@/data/services";

const serviceIcons: Record<string, LucideIcon> = {
  frontend: Monitor,
  "full-stack": Layers,
  "e-commerce": ShoppingBag,
  business: AppWindow,
};

export function Services() {
  if (services.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="Services"
          title="Ce que je peux réaliser pour vous"
        >
          Des interfaces aux applications complètes, des boutiques en ligne
          aux outils métier.
        </SectionHeading>

        <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.id] ?? Layers;

            return (
              <StaggerItem key={service.id} className="h-full">
                <Link
                  href="/contact"
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card transition-[transform,border-color,box-shadow] duration-300 motion-reduce:transition-none hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-primary/40 hover:shadow-elevated"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-muted/50">
                    <Icon
                      className="size-4.5 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-3 text-base font-medium tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
