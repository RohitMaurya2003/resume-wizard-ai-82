import { useState } from 'react';
import { ResumeData, PersonalInfo, Experience, Education, Skill, Project, ProfessionalSummary, Technology, Certification, Achievement, Language, Publication, Award, Hobby, Reference } from '@/types/resume';

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  portfolio: '',
  github: '',
  website: '',
};

const defaultProfessionalSummary: ProfessionalSummary = {
  id: '1',
  content: '',
  keywords: [],
};

const defaultResumeData: ResumeData = {
  personalInfo: defaultPersonalInfo,
  professionalSummary: defaultProfessionalSummary,
  experience: [],
  education: [],
  skills: [],
  technologies: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  publications: [],
  awards: [],
  hobbies: [],
  references: [],
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateProfessionalSummary = (summary: ProfessionalSummary) => {
    setResumeData(prev => ({ ...prev, professionalSummary: summary }));
  };

  // Experience methods
  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      experience: [...prev.experience, newExperience] 
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...experience } : exp
      )
    }));
  };

  const deleteExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Education methods
  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      education: [...prev.education, newEducation] 
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...education } : edu
      )
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Skills methods
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      skills: [...prev.skills, newSkill] 
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(s => 
        s.id === id ? { ...s, ...skill } : s
      )
    }));
  };

  const deleteSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Projects methods
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      projects: [...prev.projects, newProject] 
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === id ? { ...p, ...project } : p
      )
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Technology methods
  const addTechnology = (technology: Omit<Technology, 'id'>) => {
    const newTechnology = { ...technology, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      technologies: [...prev.technologies, newTechnology] 
    }));
  };

  const updateTechnology = (id: string, technology: Partial<Technology>) => {
    setResumeData(prev => ({
      ...prev,
      technologies: prev.technologies.map(tech => 
        tech.id === id ? { ...tech, ...technology } : tech
      )
    }));
  };

  const deleteTechnology = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech.id !== id)
    }));
  };

  // Certification methods
  const addCertification = (certification: Omit<Certification, 'id'>) => {
    const newCertification = { ...certification, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      certifications: [...prev.certifications, newCertification] 
    }));
  };

  const updateCertification = (id: string, certification: Partial<Certification>) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, ...certification } : cert
      )
    }));
  };

  const deleteCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  // Achievement methods
  const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = { ...achievement, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      achievements: [...prev.achievements, newAchievement] 
    }));
  };

  const updateAchievement = (id: string, achievement: Partial<Achievement>) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map(ach => 
        ach.id === id ? { ...ach, ...achievement } : ach
      )
    }));
  };

  const deleteAchievement = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(ach => ach.id !== id)
    }));
  };

  // Language methods
  const addLanguage = (language: Omit<Language, 'id'>) => {
    const newLanguage = { ...language, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      languages: [...prev.languages, newLanguage] 
    }));
  };

  const updateLanguage = (id: string, language: Partial<Language>) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === id ? { ...lang, ...language } : lang
      )
    }));
  };

  const deleteLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

  // Publication methods
  const addPublication = (publication: Omit<Publication, 'id'>) => {
    const newPublication = { ...publication, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      publications: [...prev.publications, newPublication] 
    }));
  };

  const updatePublication = (id: string, publication: Partial<Publication>) => {
    setResumeData(prev => ({
      ...prev,
      publications: prev.publications.map(pub => 
        pub.id === id ? { ...pub, ...publication } : pub
      )
    }));
  };

  const deletePublication = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      publications: prev.publications.filter(pub => pub.id !== id)
    }));
  };

  // Award methods
  const addAward = (award: Omit<Award, 'id'>) => {
    const newAward = { ...award, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      awards: [...prev.awards, newAward] 
    }));
  };

  const updateAward = (id: string, award: Partial<Award>) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.map(a => 
        a.id === id ? { ...a, ...award } : a
      )
    }));
  };

  const deleteAward = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.filter(a => a.id !== id)
    }));
  };

  // Hobby methods
  const addHobby = (hobby: Omit<Hobby, 'id'>) => {
    const newHobby = { ...hobby, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      hobbies: [...prev.hobbies, newHobby] 
    }));
  };

  const updateHobby = (id: string, hobby: Partial<Hobby>) => {
    setResumeData(prev => ({
      ...prev,
      hobbies: prev.hobbies.map(h => 
        h.id === id ? { ...h, ...hobby } : h
      )
    }));
  };

  const deleteHobby = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h.id !== id)
    }));
  };

  // Reference methods
  const addReference = (reference: Omit<Reference, 'id'>) => {
    const newReference = { ...reference, id: Date.now().toString() };
    setResumeData(prev => ({ 
      ...prev, 
      references: [...prev.references, newReference] 
    }));
  };

  const updateReference = (id: string, reference: Partial<Reference>) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map(ref => 
        ref.id === id ? { ...ref, ...reference } : ref
      )
    }));
  };

  const deleteReference = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  return {
    resumeData,
    updatePersonalInfo,
    updateProfessionalSummary,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addTechnology,
    updateTechnology,
    deleteTechnology,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    addPublication,
    updatePublication,
    deletePublication,
    addAward,
    updateAward,
    deleteAward,
    addHobby,
    updateHobby,
    deleteHobby,
    addReference,
    updateReference,
    deleteReference,
  };
};