import { site } from "./site";
import type { SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", url: site.githubUrl || undefined },
  { id: "linkedin", label: "LinkedIn", url: site.linkedinUrl || undefined },
];
