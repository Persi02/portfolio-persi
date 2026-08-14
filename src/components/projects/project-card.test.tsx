import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project, ProjectCategory } from "@/types";

const mockProject: Project = {
  id: "1",
  slug: "test-project",
  title: "Test Project",
  shortDescription: "A short description of the project",
  category: "frontend" as ProjectCategory,
  year: 2024,
  technologies: ["React", "TypeScript", "Tailwind CSS"],
  thumbnail: "/projects/test/cover.webp",
};

jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: function Link({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
      return <a href={href} {...props} data-testid="project-link">{children}</a>;
    },
  };
});

jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: function ({ alt, ...props }: { alt: string; [key: string]: unknown }) {
      return <img alt={alt} data-testid="project-image" {...props} />;
    },
  };
});

describe("ProjectCard", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders project title", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders short description", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("A short description of the project")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("renders year when present", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders technologies as tags", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });

  it("renders CTA with arrow", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Voir le projet")).toBeInTheDocument();
  });

  it("links to correct project slug", () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByTestId("project-link");
    expect(link).toHaveAttribute("href", "/projects/test-project");
  });

  it("displays placeholder when thumbnail is missing", () => {
    const projectWithoutThumb = { ...mockProject, thumbnail: undefined };
    render(<ProjectCard project={projectWithoutThumb} />);
    expect(screen.getByText("image à venir")).toBeInTheDocument();
  });

  it("does not render year when missing", () => {
    const projectWithoutYear = { ...mockProject, year: undefined };
    render(<ProjectCard project={projectWithoutYear} />);
    expect(screen.queryByText("2024")).not.toBeInTheDocument();
  });

  it("does not render technologies section when empty", () => {
    const projectWithoutTech = { ...mockProject, technologies: [] };
    render(<ProjectCard project={projectWithoutTech} />);
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("does not render technologies section when undefined", () => {
    const projectWithoutTech = { ...mockProject, technologies: undefined };
    render(<ProjectCard project={projectWithoutTech} />);
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("uses project title as image alt text", () => {
    render(<ProjectCard project={mockProject} />);
    const img = screen.getByTestId("project-image");
    expect(img).toHaveAttribute("alt", "Test Project");
  });
});