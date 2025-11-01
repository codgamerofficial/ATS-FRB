export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  languages?: string[];
  hobbies?: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview_url?: string;
  is_premium: boolean;
  created_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: ResumeData;
  template_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface TemplatePreferences {
  selectedTemplateId?: string;
  customizations?: {
    colors?: Partial<TemplateColors>;
    fonts?: Partial<TemplateFonts>;
  };
}

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

export interface TemplateFonts {
  heading: string;
  body: string;
}