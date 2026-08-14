import "@testing-library/jest-dom";
import type { Project, ProjectCategory, ProjectStatus } from "@/types";

const mockProjects: Project[] = [
  {
    id: "1",
    slug: "project-1",
    title: "Project 1",
    shortDescription: "Description 1",
    category: "frontend" as ProjectCategory,
    featured: true,
    year: 2024,
    status: "completed" as ProjectStatus,
    technologies: ["React", "TypeScript"],
  },
  {
    id: "2",
    slug: "project-2",
    title: "Project 2",
    shortDescription: "Description 2",
    category: "full-stack" as ProjectCategory,
    featured: false,
    year: 2023,
    status: "in-progress" as ProjectStatus,
    technologies: ["Node.js", "PostgreSQL"],
  },
  {
    id: "3",
    slug: "project-3",
    title: "Project 3",
    shortDescription: "Description 3",
    category: "business" as ProjectCategory,
    featured: true,
    year: 2022,
    status: "archived" as ProjectStatus,
    technologies: ["React", "Node.js"],
  },
];

jest.mock("@/data/projects", () => ({
  projects: mockProjects,
}));

import { getProjects, getProjectBySlug, getFeaturedProjects, getAdjacentProjects, getCategoryLabel, getStatusLabel } from "@/lib/projects";

describe("lib/projects helpers", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("getCategoryLabel", () => {
    it("returns correct label for each category", () => {
      expect(getCategoryLabel("frontend")).toBe("Frontend");
      expect(getCategoryLabel("full-stack")).toBe("Full-stack");
      expect(getCategoryLabel("e-commerce")).toBe("E-commerce");
      expect(getCategoryLabel("business")).toBe("Application métier");
      expect(getCategoryLabel("other")).toBe("Autre");
    });
  });

  describe("getStatusLabel", () => {
    it("returns correct label for each status", () => {
      expect(getStatusLabel("completed")).toBe("Terminé");
      expect(getStatusLabel("in-progress")).toBe("En cours");
      expect(getStatusLabel("archived")).toBe("Archivé");
    });
  });

  describe("getProjects", () => {
    it("returns all projects", () => {
      const projects = getProjects();
      expect(projects).toHaveLength(3);
      expect(projects[0].slug).toBe("project-1");
    });
  });

  describe("getProjectBySlug", () => {
    it("returns project when slug exists", () => {
      const project = getProjectBySlug("project-2");
      expect(project).toBeDefined();
      expect(project?.slug).toBe("project-2");
      expect(project?.title).toBe("Project 2");
    });

    it("returns undefined when slug does not exist", () => {
      const project = getProjectBySlug("non-existent");
      expect(project).toBeUndefined();
    });
  });

  describe("getFeaturedProjects", () => {
    it("returns only featured projects", () => {
      const featured = getFeaturedProjects();
      expect(featured).toHaveLength(2);
      expect(featured.every((p) => p.featured === true)).toBe(true);
      expect(featured.map((p) => p.slug)).toEqual(["project-1", "project-3"]);
    });
  });

  describe("getAdjacentProjects", () => {
    it("returns previous and next for middle project", () => {
      const { previous, next } = getAdjacentProjects("project-2");
      expect(previous?.slug).toBe("project-1");
      expect(next?.slug).toBe("project-3");
    });

    it("returns only next for first project", () => {
      const { previous, next } = getAdjacentProjects("project-1");
      expect(previous).toBeUndefined();
      expect(next?.slug).toBe("project-2");
    });

    it("returns only previous for last project", () => {
      const { previous, next } = getAdjacentProjects("project-3");
      expect(previous?.slug).toBe("project-2");
      expect(next).toBeUndefined();
    });

    it("returns empty for non-existent slug", () => {
      const { previous, next } = getAdjacentProjects("non-existent");
      expect(previous).toBeUndefined();
      expect(next).toBeUndefined();
    });
  });
});