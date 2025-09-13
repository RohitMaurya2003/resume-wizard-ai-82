import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { Experience } from '@/types/resume';

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: (experience: Omit<Experience, 'id'>) => void;
  onUpdate: (id: string, experience: Partial<Experience>) => void;
  onDelete: (id: string) => void;
}

export const ExperienceForm = ({ experiences, onAdd, onUpdate, onDelete }: ExperienceFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: [''],
    location: '',
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
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      location: '',
    });
  };

  const handleEdit = (experience: Experience) => {
    setFormData(experience);
    setEditingId(experience.id);
    setIsAdding(true);
  };

  const addBulletPoint = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, '']
    }));
  };

  const updateBulletPoint = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.map((item, i) => i === index ? value : item)
    }));
  };

  const removeBulletPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Work Experience</h2>
          <p className="text-muted-foreground">Add your professional experience.</p>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        )}
      </div>

      {/* Existing Experiences */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id} className="shadow-card border-border/50 transition-smooth hover:shadow-elegant">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exp.position}</CardTitle>
                  <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(exp)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(exp.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {exp.description.map((desc, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{desc}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Experience' : 'Add Experience'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
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
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    disabled={formData.current}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="current"
                    checked={formData.current}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, current: checked as boolean }))}
                  />
                  <Label htmlFor="current">Currently working here</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Job Description</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addBulletPoint}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Point
                  </Button>
                </div>
                
                {formData.description.map((desc, index) => (
                  <div key={index} className="flex space-x-2">
                    <Textarea
                      value={desc}
                      onChange={(e) => updateBulletPoint(index, e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-16"
                    />
                    {formData.description.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBulletPoint(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
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
                  {editingId ? 'Update' : 'Add'} Experience
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
