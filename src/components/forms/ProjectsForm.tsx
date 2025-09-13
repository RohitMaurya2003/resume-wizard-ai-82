import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit3, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onAdd: (project: Omit<Project, 'id'>) => void;
  onUpdate: (id: string, project: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

export const ProjectsForm = ({ projects, onAdd, onUpdate, onDelete }: ProjectsFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: [],
    url: '',
    github: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
      setIsAdding(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Projects</h2>
          <p className="text-muted-foreground">Showcase your personal and professional projects.</p>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        )}
      </div>

      {/* Existing Projects */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="shadow-card border-border/50 transition-smooth hover:shadow-elegant">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    {project.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(project.url, '_blank')}
                        className="p-1 h-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {project.github && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(project.github, '_blank')}
                        className="p-1 h-auto"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.startDate} - {project.endDate}
                  </p>
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {projects.length === 0 && !isAdding && (
        <Card className="shadow-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              No projects added yet. Add your first project to showcase your work.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Project' : 'Add Project'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Awesome Project"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this project does and your role in it..."
                  className="min-h-24"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies Used *</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies.join(', ')}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
                    }))}
                    placeholder="React, Node.js, MongoDB, AWS"
                    required
                  />
                  <p className="text-sm text-muted-foreground">Separate technologies with commas</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">Live URL (Optional)</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://myproject.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Repository (Optional)</Label>
                  <Input
                    id="github"
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                    placeholder="https://github.com/username/project"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-primary text-primary-foreground"
                >
                  {editingId ? 'Update' : 'Add'} Project
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
