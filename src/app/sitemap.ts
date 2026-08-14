import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) {
    return [];
  }

  const routes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];

  const now = new Date();

  return [
    ...routes.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...getProjects().map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: project.year ? new Date(String(project.year)) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
