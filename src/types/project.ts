export type ProjectCategory =
  | "frontend"
  | "full-stack"
  | "e-commerce"
  | "business"
  | "other";

export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectCaseStudy = {
  context?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  challenges?: string[];
  results?: string[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: ProjectCategory;
  featured?: boolean;
  year?: number;
  role?: string;
  client?: string;
  status?: ProjectStatus;
  thumbnail?: string;
  images?: ProjectImage[];
  technologies?: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: ProjectCaseStudy;
};
