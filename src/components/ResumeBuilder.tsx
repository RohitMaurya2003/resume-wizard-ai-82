import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Sparkles, User, Briefcase, GraduationCap, Code, FolderOpen, FileText, Award, Trophy, Languages, BookOpen, Heart, Users } from 'lucide-react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ProfessionalSummaryForm } from './forms/ProfessionalSummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { TechnologiesForm } from './forms/TechnologiesForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { AchievementsForm } from './forms/AchievementsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { PublicationsForm } from './forms/PublicationsForm';
import { ResumePreview } from './ResumePreview';
import { AIOptimizer } from './AIOptimizer';
import { useResumeData } from '@/hooks/useResumeData';
import { exportToPDF } from '@/utils/pdfExport';
import { useToast } from '@/components/ui/use-toast';
import { ResumeTemplate } from '@/types/resume';

export const ResumeBuilder = () => {
  const { toast } = useToast();
  const { resumeData, updatePersonalInfo, updateProfessionalSummary, addExperience, updateExperience, deleteExperience, 
          addEducation, updateEducation, deleteEducation, addSkill, updateSkill, deleteSkill, addTechnology, updateTechnology, deleteTechnology,
          addProject, updateProject, deleteProject, addCertification, updateCertification, deleteCertification,
          addAchievement, updateAchievement, deleteAchievement, addLanguage, updateLanguage, deleteLanguage,
          addPublication, updatePublication, deletePublication } = useResumeData();
  
  const [activeTab, setActiveTab] = useState('personal');
  const [showAIOptimizer, setShowAIOptimizer] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('modern');

  const handleExportPDF = async () => {
    try {
      await exportToPDF(resumeData, selectedTemplate);
      toast({
        title: "Success!",
        description: "Resume exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export resume",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Resume Builder
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIOptimizer(true)}
              className="border-primary/20 text-primary hover:bg-primary/5"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Optimize
            </Button>
            <Button
              onClick={handleExportPDF}
              className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Forms */}
          <div className="space-y-6">
            <Card className="shadow-card border-border/50">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6 bg-muted/50 mb-6">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs">
                    <User className="w-3 h-3 mr-1" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs">
                    <Briefcase className="w-3 h-3 mr-1" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="education" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs">
                    <Code className="w-3 h-3 mr-1" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="more" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs">
                    <Trophy className="w-3 h-3 mr-1" />
                    More
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="personal" className="mt-0">
                    <PersonalInfoForm 
                      data={resumeData.personalInfo} 
                      onUpdate={updatePersonalInfo}
                    />
                  </TabsContent>

                  <TabsContent value="summary" className="mt-0">
                    <ProfessionalSummaryForm 
                      data={resumeData.professionalSummary} 
                      onUpdate={updateProfessionalSummary}
                    />
                  </TabsContent>
                  
                  <TabsContent value="experience" className="mt-0">
                    <ExperienceForm 
                      experiences={resumeData.experience}
                      onAdd={addExperience}
                      onUpdate={updateExperience}
                      onDelete={deleteExperience}
                    />
                  </TabsContent>
                  
                  <TabsContent value="education" className="mt-0">
                    <EducationForm 
                      education={resumeData.education}
                      onAdd={addEducation}
                      onUpdate={updateEducation}
                      onDelete={deleteEducation}
                    />
                  </TabsContent>
                  
                  <TabsContent value="skills" className="mt-0">
                    <div className="space-y-8">
                      <SkillsForm 
                        skills={resumeData.skills}
                        onAdd={addSkill}
                        onUpdate={updateSkill}
                        onDelete={deleteSkill}
                      />
                      <TechnologiesForm 
                        technologies={resumeData.technologies}
                        onAdd={addTechnology}
                        onUpdate={updateTechnology}
                        onDelete={deleteTechnology}
                      />
                      <ProjectsForm 
                        projects={resumeData.projects}
                        onAdd={addProject}
                        onUpdate={updateProject}
                        onDelete={deleteProject}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="more" className="mt-0">
                    <div className="space-y-8">
                      <CertificationsForm 
                        certifications={resumeData.certifications}
                        onAdd={addCertification}
                        onUpdate={updateCertification}
                        onDelete={deleteCertification}
                      />
                      <AchievementsForm 
                        achievements={resumeData.achievements}
                        onAdd={addAchievement}
                        onUpdate={updateAchievement}
                        onDelete={deleteAchievement}
                      />
                      <LanguagesForm 
                        languages={resumeData.languages}
                        onAdd={addLanguage}
                        onUpdate={updateLanguage}
                        onDelete={deleteLanguage}
                      />
                      <PublicationsForm 
                        publications={resumeData.publications}
                        onAdd={addPublication}
                        onUpdate={updatePublication}
                        onDelete={deletePublication}
                      />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <ResumePreview 
              data={resumeData} 
              template={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </div>
        </div>
      </div>

      {/* AI Optimizer Modal */}
      {showAIOptimizer && (
        <AIOptimizer 
          resumeData={resumeData}
          onClose={() => setShowAIOptimizer(false)}
          onOptimize={(optimizedData) => {
            // Apply AI optimizations to resume data
            if (optimizedData.professionalSummary) {
              updateProfessionalSummary({ 
                ...resumeData.professionalSummary, 
                content: optimizedData.professionalSummary,
                keywords: optimizedData.keywords || []
              });
            }
            setShowAIOptimizer(false);
            toast({
              title: "AI Optimization Complete!",
              description: "Your resume has been optimized for better impact.",
            });
          }}
        />
      )}
    </div>
  );
};