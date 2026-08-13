export type ExperienceEntryType = "work" | "education";

export type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  period?: string;
  current?: boolean;
  type?: ExperienceEntryType;
  description?: string;
  technologies?: string[];
};
