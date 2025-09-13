export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
  github?: string;
  website?: string;
}

export interface ProfessionalSummary {
  id: string;
  content: string;
  keywords: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateObtained: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'proficient' | 'fluent' | 'native';
  certifications?: string[];
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  publishDate: string;
  url?: string;
  description: string;
  coAuthors?: string[];
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
}

export interface Hobby {
  id: string;
  name: string;
  description?: string;
  category: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  technologies: Technology[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
  publications: Publication[];
  awards: Award[];
  hobbies: Hobby[];
  references: Reference[];
}

export interface TemplateCustomization {
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
  fontFamily: 'inter' | 'roboto' | 'opensans' | 'playfair' | 'merriweather';
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
  accentColor: string;
}

export type ResumeTemplate = 'modern' | 'minimal' | 'creative' | 'professional' | 'executive' | 'academic';

export interface AIOptimization {
  jobDescription: string;
  optimizedContent: {
    professionalSummary?: string;
    skills?: string[];
    technologies?: string[];
    bulletPoints?: Record<string, string[]>;
    keywords?: string[];
  };
}