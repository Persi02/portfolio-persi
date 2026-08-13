export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "cms";

export type Skill = {
  name: string;
  priority?: boolean;
};

export type SkillCategoryGroup = {
  category: SkillCategory;
  label: string;
  skills: Skill[];
};
