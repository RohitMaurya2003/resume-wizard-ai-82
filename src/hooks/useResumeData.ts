import { useState } from 'react';
import { ResumeData, PersonalInfo, Experience, Education, Skill, Project } from '@/types/resume';

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  portfolio: '',
  summary: '',
};

const defaultResumeData: ResumeData = {
  personalInfo: defaultPersonalInfo,
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: info }));
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

  return {
    resumeData,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
  };
};