import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { ResumeData, AIOptimization } from '@/types/resume';
import { useToast } from '@/components/ui/use-toast';

interface AIOptimizerProps {
  resumeData: ResumeData;
  onClose: () => void;
  onOptimize: (optimizedData: AIOptimization['optimizedContent']) => void;
}

export const AIOptimizer = ({ resumeData, onClose, onOptimize }: AIOptimizerProps) => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<AIOptimization['optimizedContent'] | null>(null);

  const handleOptimize = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please provide a job description to optimize your resume",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    
    try {
      // Simulate AI optimization process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock AI optimization results
      const mockOptimization: AIOptimization['optimizedContent'] = {
        professionalSummary: generateOptimizedSummary(resumeData, jobDescription),
        skills: generateOptimizedSkills(resumeData, jobDescription),
        technologies: generateOptimizedTechnologies(resumeData, jobDescription),
        bulletPoints: generateOptimizedBulletPoints(resumeData, jobDescription),
        keywords: extractKeywords(jobDescription),
      };
      
      setOptimizationResult(mockOptimization);
      
      toast({
        title: "Optimization Complete!",
        description: "Your resume has been analyzed and optimized for the job description.",
      });
    } catch (error) {
      toast({
        title: "Optimization Failed",
        description: "Failed to optimize your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyOptimizations = () => {
    if (optimizationResult) {
      onOptimize(optimizationResult);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>AI Resume Optimizer</span>
          </DialogTitle>
          <DialogDescription>
            Optimize your resume content for a specific job by providing the job description below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Description Input */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-32 transition-smooth focus:shadow-elegant"
              disabled={isOptimizing}
            />
            <p className="text-sm text-muted-foreground">
              Provide the complete job description to get the best optimization results.
            </p>
          </div>

          {/* Optimization Actions */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              AI will analyze your resume and suggest improvements based on the job requirements.
            </p>
            <Button
              onClick={handleOptimize}
              disabled={isOptimizing || !jobDescription.trim()}
              className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimize Resume
                </>
              )}
            </Button>
          </div>

          {/* Optimization Results */}
          {optimizationResult && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Optimization Complete!</span>
              </div>

              {/* Optimized Summary */}
              {optimizationResult.professionalSummary && (
                <Card className="shadow-card border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-green-800">Optimized Professional Summary</h4>
                    <p className="text-sm text-muted-foreground mb-2">Original:</p>
                    <p className="text-sm bg-gray-100 p-2 rounded mb-2">{resumeData.professionalSummary.content || 'No summary provided'}</p>
                    <p className="text-sm text-muted-foreground mb-2">Optimized:</p>
                    <p className="text-sm bg-green-50 p-2 rounded border border-green-200">{optimizationResult.professionalSummary}</p>
                  </CardContent>
                </Card>
              )}

              {/* Optimized Technologies */}
              {optimizationResult.technologies && optimizationResult.technologies.length > 0 && (
                <Card className="shadow-card border-indigo-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-indigo-800">Recommended Technologies to Add</h4>
                    <div className="flex flex-wrap gap-2">
                      {optimizationResult.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-50 text-indigo-800 text-xs rounded border border-indigo-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Optimized Skills */}
              {optimizationResult.skills && optimizationResult.skills.length > 0 && (
                <Card className="shadow-card border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-blue-800">Recommended Skills to Add</h4>
                    <div className="flex flex-wrap gap-2">
                      {optimizationResult.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Optimized Bullet Points */}
              {optimizationResult.bulletPoints && Object.keys(optimizationResult.bulletPoints).length > 0 && (
                <Card className="shadow-card border-purple-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-purple-800">Optimized Experience Descriptions</h4>
                    <div className="space-y-3">
                      {Object.entries(optimizationResult.bulletPoints).map(([company, bullets]) => (
                        <div key={company}>
                          <p className="text-sm font-medium text-purple-700">{company}</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1">
                            {bullets.map((bullet, index) => (
                              <li key={index}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Apply Changes */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleApplyOptimizations}
                  className="bg-gradient-primary text-primary-foreground"
                >
                  Apply Optimizations
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Mock AI optimization functions
function generateOptimizedSummary(resumeData: ResumeData, jobDescription: string): string {
  const keywords = extractKeywords(jobDescription);
  const currentSummary = resumeData.professionalSummary.content || '';
  
  return `Results-driven professional with proven expertise in ${keywords.slice(0, 3).join(', ')}, bringing ${resumeData.experience.length}+ years of experience in delivering innovative solutions. Demonstrated success in ${keywords.slice(3, 5).join(' and ')}, with a strong track record of achieving measurable results and driving business growth through strategic initiatives and collaborative leadership.`;
}

function generateOptimizedSkills(resumeData: ResumeData, jobDescription: string): string[] {
  const keywords = extractKeywords(jobDescription);
  const existingSkills = resumeData.skills.map(s => s.name.toLowerCase());
  
  return keywords.filter(keyword => !existingSkills.includes(keyword.toLowerCase())).slice(0, 5);
}

function generateOptimizedTechnologies(resumeData: ResumeData, jobDescription: string): string[] {
  const keywords = extractKeywords(jobDescription);
  const existingTechnologies = resumeData.technologies.map(t => t.name.toLowerCase());
  
  return keywords.filter(keyword => !existingTechnologies.includes(keyword.toLowerCase())).slice(0, 5);
}

function generateOptimizedBulletPoints(resumeData: ResumeData, jobDescription: string): Record<string, string[]> {
  const keywords = extractKeywords(jobDescription);
  const result: Record<string, string[]> = {};
  
  resumeData.experience.slice(0, 2).forEach(exp => {
    result[exp.company] = [
      `Leveraged ${keywords[0]} and ${keywords[1]} to deliver high-impact solutions, resulting in 25% improvement in operational efficiency`,
      `Collaborated with cross-functional teams using ${keywords[2]} methodologies to achieve project objectives ahead of schedule`,
      `Implemented ${keywords[3]} best practices, leading to enhanced ${keywords[4]} and measurable business outcomes`
    ];
  });
  
  return result;
}

function extractKeywords(jobDescription: string): string[] {
  // Mock keyword extraction - in a real app, this would use NLP
  const commonTechKeywords = [
    'React', 'JavaScript', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Node.js', 'TypeScript',
    'MongoDB', 'PostgreSQL', 'Git', 'CI/CD', 'Microservices', 'REST APIs', 'GraphQL',
    'Machine Learning', 'Data Analysis', 'Agile', 'Scrum', 'Leadership', 'Project Management'
  ];
  
  const descLower = jobDescription.toLowerCase();
  return commonTechKeywords.filter(keyword => 
    descLower.includes(keyword.toLowerCase())
  ).slice(0, 8);
}