/**
 * data.ts — typed adapter
 *
 * The only file you should ever edit is lib/content.json.
 * This file imports from it and re-exports everything with TypeScript types.
 * All components import from here, so nothing else needs to change.
 */
import content from "./content.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  caption: string;
  tags: string[];
  heroImage: string;
  galleryImages: string[];
  links: {
    type: "github" | "live" | "demo";
    url: string;
  }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  award?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
  };
}

// ─── Exports (same API as before — no component changes needed) ───────────────

export const personalInfo = content.personalInfo as PersonalInfo;
export const about = content.about as string;
export const experiences = content.experiences as Experience[];
export const education = content.education as Education[];
export const skills = content.skills as SkillCategory[];
export const projects = content.projects as Project[];
