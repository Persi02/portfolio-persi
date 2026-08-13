import { notFound } from "next/navigation";

import { getProjects } from "@/lib/projects";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default function ProjectPage() {
  notFound();
}
