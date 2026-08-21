import type { SkillCategoryGroup } from "@/types";

export const skillCategories: SkillCategoryGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", priority: true },
      { name: "Next.js", priority: true },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "TanStack Query" },
      { name: "Axios" },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", priority: true },
      { name: "Express.js" },
      { name: "REST API" },
      { name: "JWT" },
    ],
  },
  {
    category: "database",
    label: "Database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Prisma" },
      { name: "Mongoose" },
    ],
  },
  {
    category: "tools",
    label: "Tools / DevOps",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "Vercel" },
    ],
  },
  {
    category: "cms",
    label: "CMS / E-commerce",
    skills: [
      { name: "Shopify" },
      { name: "WordPress" },
      { name: "WooCommerce" },
    ],
  },
];
