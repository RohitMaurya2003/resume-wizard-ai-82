import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Code, Star } from 'lucide-react';
import { Technology } from '@/types/resume';

interface TechnologiesFormProps {
  technologies: Technology[];
  onAdd: (technology: Omit<Technology, 'id'>) => void;
  onUpdate: (id: string, technology: Partial<Technology>) => void;
  onDelete: (id: string) => void;
}

const techCategories = [
  'Programming Languages',
  'Frontend Frameworks',
  'Backend Frameworks',
  'Databases',
  'Cloud Platforms',
  'DevOps Tools',
  'Mobile Development',
  'Data Science & ML',
  'Design Tools',
  'Project Management'
];

const proficiencyLevels = [
  { value: 'beginner', label: 'Beginner', stars: 1 },
  { value: 'intermediate', label: 'Intermediate', stars: 2 },
  { value: 'advanced', label: 'Advanced', stars: 3 },
  { value: 'expert', label: 'Expert', stars: 4 }
];

export const TechnologiesForm = ({ technologies, onAdd, onUpdate, onDelete }: TechnologiesFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTechnology, setNewTechnology] = useState<Omit<Technology, 'id'>>({
    name: '',
    category: '',
    proficiency: 'intermediate',
    yearsOfExperience: 1,
  });

  const handleAdd = () => {
    if (newTechnology.name && newTechnology.category) {
      onAdd(newTechnology);
      setNewTechnology({
        name: '',
        category: '',
        proficiency: 'intermediate',
        yearsOfExperience: 1,
      });
      setIsAdding(false);
    }
  };

  const technologiesByCategory = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  const getProficiencyDisplay = (proficiency: Technology['proficiency']) => {
    const level = proficiencyLevels.find(l => l.value === proficiency);
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < (level?.stars || 0) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          {level?.label}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary" />
          Technologies & Tools
        </h2>
        <p className="text-muted-foreground">Showcase your technical expertise and proficiency levels.</p>
      </div>

      {/* Add New Technology */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            Add Technology
            <Button
              onClick={() => setIsAdding(!isAdding)}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Technology
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isAdding && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tech-name">Technology Name *</Label>
                <Input
                  id="tech-name"
                  value={newTechnology.name}
                  onChange={(e) => setNewTechnology({ ...newTechnology, name: e.target.value })}
                  placeholder="React, Python, AWS..."
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tech-category">Category *</Label>
                <Select
                  value={newTechnology.category}
                  onValueChange={(value) => setNewTechnology({ ...newTechnology, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {techCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tech-proficiency">Proficiency Level</Label>
                <Select
                  value={newTechnology.proficiency}
                  onValueChange={(value: Technology['proficiency']) => 
                    setNewTechnology({ ...newTechnology, proficiency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center space-x-2">
                          <span>{level.label}</span>
                          <div className="flex">
                            {Array.from({ length: level.stars }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tech-years">Years of Experience</Label>
                <Input
                  id="tech-years"
                  type="number"
                  min="0"
                  max="50"
                  value={newTechnology.yearsOfExperience}
                  onChange={(e) => setNewTechnology({ 
                    ...newTechnology, 
                    yearsOfExperience: Math.max(0, parseInt(e.target.value) || 0)
                  })}
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} className="bg-gradient-primary text-primary-foreground">
                Add Technology
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Technologies by Category */}
      {Object.keys(technologiesByCategory).length > 0 && (
        <div className="space-y-4">
          {Object.entries(technologiesByCategory).map(([category, techs]) => (
            <Card key={category} className="shadow-card border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary">{category}</CardTitle>
                <CardDescription>{techs.length} technology(ies)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {techs.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center justify-between p-3 bg-accent/30 rounded-lg border border-border/30 transition-smooth hover:shadow-card"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{tech.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {tech.yearsOfExperience}y
                          </Badge>
                        </div>
                        {getProficiencyDisplay(tech.proficiency)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(tech.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {technologies.length === 0 && (
        <Card className="shadow-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Code className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Technologies Added</h3>
            <p className="text-muted-foreground mb-4">Add your technical skills and tools to showcase your expertise.</p>
            <Button onClick={() => setIsAdding(true)} className="bg-gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Technology
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};