import Link from "next/link";
import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";

export function ContactInfo() {
  const links = [
    {
      id: "email",
      label: "Email",
      value: site.email,
      href: site.email ? `mailto:${site.email}` : "",
    },
    {
      id: "github",
      label: "GitHub",
      value: site.githubUrl,
      href: site.githubUrl || "",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: site.linkedinUrl,
      href: site.linkedinUrl || "",
    },
  ].filter((link) => Boolean(link.href));

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          {...(link.id === "email"
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-elevated"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50">
            {link.id === "email" ? (
              <Mail className="size-4 text-primary" aria-hidden="true" />
            ) : link.id === "github" ? (
              <GitHubIcon className="size-4 text-primary" aria-hidden="true" />
            ) : (
              <LinkedInIcon className="size-4 text-primary" aria-hidden="true" />
            )}
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">
              {link.label}
            </span>
            <span className="block truncate text-sm font-medium transition-colors group-hover:text-primary">
              {link.id === "email" ? site.email : link.value.replace(/^https?:\/\//, "")}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
