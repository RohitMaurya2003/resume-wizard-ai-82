import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Languages, Star } from 'lucide-react';
import { Language } from '@/types/resume';

interface LanguagesFormProps {
  languages: Language[];
  onAdd: (language: Omit<Language, 'id'>) => void;
  onUpdate: (id: string, language: Partial<Language>) => void;
  onDelete: (id: string) => void;
}

const proficiencyLevels = [
  { value: 'basic', label: 'Basic', description: 'Can understand and use familiar everyday expressions', stars: 1 },
  { value: 'conversational', label: 'Conversational', description: 'Can handle most situations in areas of immediate need', stars: 2 },
  { value: 'proficient', label: 'Proficient', description: 'Can use language flexibly and effectively for social and professional purposes', stars: 3 },
  { value: 'fluent', label: 'Fluent', description: 'Can express ideas fluently and spontaneously without searching for expressions', stars: 4 },
  { value: 'native', label: 'Native', description: 'Native speaker proficiency', stars: 5 }
];

const commonLanguages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian',
  'Chinese (Mandarin)', 'Chinese (Cantonese)', 'Japanese', 'Korean', 'Arabic', 'Hindi',
  'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Hebrew', 'Turkish', 'Polish', 'Swedish',
  'Norwegian', 'Danish', 'Finnish', 'Czech', 'Hungarian', 'Romanian', 'Bulgarian', 'Greek'
];

export const LanguagesForm = ({ languages, onAdd, onUpdate, onDelete }: LanguagesFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newLanguage, setNewLanguage] = useState<Omit<Language, 'id'>>({
    name: '',
    proficiency: 'conversational',
    certifications: [],
  });
  const [newCertification, setNewCertification] = useState('');

  const handleAdd = () => {
    if (newLanguage.name && newLanguage.proficiency) {
      onAdd(newLanguage);
      setNewLanguage({
        name: '',
        proficiency: 'conversational',
        certifications: [],
      });
      setIsAdding(false);
    }
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setNewLanguage({
        ...newLanguage,
        certifications: [...(newLanguage.certifications || []), newCertification.trim()]
      });
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setNewLanguage({
      ...newLanguage,
      certifications: newLanguage.certifications?.filter((_, i) => i !== index) || []
    });
  };

  const getProficiencyDisplay = (proficiency: Language['proficiency']) => {
    const level = proficiencyLevels.find(l => l.value === proficiency);
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < (level?.stars || 0) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{level?.label}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
          <Languages className="w-6 h-6 mr-2 text-primary" />
          Languages
        </h2>
        <p className="text-muted-foreground">Showcase your language skills and multilingual abilities.</p>
      </div>

      {/* Add New Language */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            Add Language
            <Button
              onClick={() => setIsAdding(!isAdding)}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isAdding && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language-name">Language *</Label>
                  <Select
                    value={newLanguage.name}
                    onValueChange={(value) => setNewLanguage({ ...newLanguage, name: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {commonLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language-proficiency">Proficiency Level *</Label>
                  <Select
                    value={newLanguage.proficiency}
                    onValueChange={(value: Language['proficiency']) => 
                      setNewLanguage({ ...newLanguage, proficiency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{level.label}</span>
                            <div className="flex ml-2">
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
              </div>
              
              <div className="space-y-3">
                <Label>Certifications (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="TOEFL, IELTS, DELE, etc."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCertification();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={addCertification}
                    variant="outline"
                    className="shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {newLanguage.certifications && newLanguage.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newLanguage.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {cert}
                        <button
                          onClick={() => removeCertification(index)}
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} className="bg-gradient-primary text-primary-foreground">
                Add Language
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Languages List */}
      {languages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map((language) => (
            <Card key={language.id} className="shadow-card border-border/50 transition-smooth hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{language.name}</h3>
                    {getProficiencyDisplay(language.proficiency)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(language.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                {language.certifications && language.certifications.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {language.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    {proficiencyLevels.find(l => l.value === language.proficiency)?.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {languages.length === 0 && (
        <Card className="shadow-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Languages className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Languages Added</h3>
            <p className="text-muted-foreground mb-4">Add your language skills to demonstrate your global communication abilities.</p>
            <Button onClick={() => setIsAdding(true)} className="bg-gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Language
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};