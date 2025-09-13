import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Code, Palette, Users, Zap } from 'lucide-react';
import { Skill } from '@/types/resume';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill, 'id'>) => void;
  onUpdate: (id: string, skill: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}

const skillCategories = [
  { value: 'technical', label: 'Technical', icon: Code },
  { value: 'design', label: 'Design', icon: Palette },
  { value: 'soft', label: 'Soft Skills', icon: Users },
  { value: 'tools', label: 'Tools & Software', icon: Zap },
];

const skillLevels = [
  { value: 'beginner', label: 'Beginner', color: 'bg-red-100 text-red-800' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'advanced', label: 'Advanced', color: 'bg-blue-100 text-blue-800' },
  { value: 'expert', label: 'Expert', color: 'bg-green-100 text-green-800' },
];

export const SkillsForm = ({ skills, onAdd, onUpdate, onDelete }: SkillsFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'intermediate',
    category: 'technical',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'intermediate',
      category: 'technical',
    });
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getLevelColor = (level: string) => {
    return skillLevels.find(l => l.value === level)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Skills</h2>
          <p className="text-muted-foreground">Add your technical and soft skills.</p>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        )}
      </div>

      {/* Existing Skills by Category */}
      <div className="space-y-6">
        {skillCategories.map((category) => {
          const categorySkills = groupedSkills[category.value] || [];
          const CategoryIcon = category.icon;
          
          if (categorySkills.length === 0) return null;
          
          return (
            <Card key={category.value} className="shadow-card border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <CategoryIcon className="w-5 h-5 mr-2 text-primary" />
                  {category.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative"
                    >
                      <Badge
                        variant="outline"
                        className={`${getLevelColor(skill.level)} transition-smooth cursor-pointer hover:shadow-elegant`}
                      >
                        {skill.name}
                        <span className="ml-2 text-xs opacity-70">
                          {skillLevels.find(l => l.value === skill.level)?.label}
                        </span>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(skill.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-smooth"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {skills.length === 0 && !isAdding && (
        <Card className="shadow-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Code className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No skills added yet. Add your first skill to get started.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add Form */}
      {isAdding && (
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle>Add Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skillName">Skill Name *</Label>
                  <Input
                    id="skillName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. React, Python, Leadership"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center">
                            <category.icon className="w-4 h-4 mr-2" />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Proficiency Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, level: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <span className={`px-2 py-1 rounded-md text-xs ${level.color}`}>
                            {level.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-primary text-primary-foreground"
                >
                  Add Skill
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
