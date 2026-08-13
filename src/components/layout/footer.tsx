import Link from "next/link";
import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { navigationItems } from "@/data/navigation";
import { site } from "@/data/site";
import { socialLinks } from "@/data/social-links";
import { cn } from "@/lib/utils";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-tight">{site.name}</p>
          <p className="text-xs text-muted-foreground">{site.role}</p>
        </div>

        <nav
          className="flex flex-col gap-2"
          aria-label="Navigation pied de page"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className={cn(
                "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              )}
            >
              <Mail className="size-3.5" />
              {site.email}
            </a>
          ) : null}
          {socialLinks.map((link) => {
            if (!link.url) {
              return null;
            }
            const Icon = socialIcons[link.id as keyof typeof socialIcons];
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {Icon ? <Icon className="size-3.5" /> : null}
                {link.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="text-xs text-muted-foreground">
            © {year} {site.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground">{site.role}</p>
        </div>
      </div>
    </footer>
  );
}
