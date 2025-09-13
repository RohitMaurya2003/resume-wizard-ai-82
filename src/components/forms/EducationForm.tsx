import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { Education } from '@/types/resume';

interface EducationFormProps {
  education: Education[];
  onAdd: (education: Omit<Education, 'id'>) => void;
  onUpdate: (id: string, education: Partial<Education>) => void;
  onDelete: (id: string) => void;
}

export const EducationForm = ({ education, onAdd, onUpdate, onDelete }: EducationFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    honors: [],
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
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: [],
    });
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Education</h2>
          <p className="text-muted-foreground">Add your educational background.</p>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        )}
      </div>

      {/* Existing Education */}
      <div className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id} className="shadow-card border-border/50 transition-smooth hover:shadow-elegant">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{edu.degree} in {edu.field}</CardTitle>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                  {edu.honors && edu.honors.length > 0 && (
                    <div className="mt-2">
                      {edu.honors.map((honor, index) => (
                        <span key={index} className="inline-block bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md mr-2 mb-1">
                          {honor}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(edu)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(edu.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Education' : 'Add Education'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="institution">Institution *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="University of California, Berkeley"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree *</Label>
                  <Input
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                    placeholder="Bachelor of Science"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study *</Label>
                  <Input
                    id="field"
                    value={formData.field}
                    onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                    placeholder="Computer Science"
                    required
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
                
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA (Optional)</Label>
                  <Input
                    id="gpa"
                    value={formData.gpa}
                    onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                    placeholder="3.8"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="honors">Honors (Optional)</Label>
                  <Input
                    id="honors"
                    value={formData.honors?.join(', ')}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      honors: e.target.value.split(',').map(h => h.trim()).filter(h => h) 
                    }))}
                    placeholder="Magna Cum Laude, Dean's List"
                  />
                  <p className="text-sm text-muted-foreground">Separate multiple honors with commas</p>
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
                  {editingId ? 'Update' : 'Add'} Education
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
