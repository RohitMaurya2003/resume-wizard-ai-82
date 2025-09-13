import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus, Sparkles } from 'lucide-react';
import { ProfessionalSummary } from '@/types/resume';

interface ProfessionalSummaryFormProps {
  data: ProfessionalSummary;
  onUpdate: (data: ProfessionalSummary) => void;
}

export const ProfessionalSummaryForm = ({ data, onUpdate }: ProfessionalSummaryFormProps) => {
  const [formData, setFormData] = useState(data);
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleContentChange = (content: string) => {
    const updated = { ...formData, content };
    setFormData(updated);
    onUpdate(updated);
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      const updated = { 
        ...formData, 
        keywords: [...formData.keywords, newKeyword.trim()] 
      };
      setFormData(updated);
      onUpdate(updated);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    const updated = { 
      ...formData, 
      keywords: formData.keywords.filter(k => k !== keyword) 
    };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-primary" />
          Professional Summary
        </h2>
        <p className="text-muted-foreground">Craft a compelling summary that highlights your key accomplishments and career objectives.</p>
      </div>

      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Summary Content</CardTitle>
          <CardDescription>
            Write a concise, impactful summary (3-4 sentences) that showcases your unique value proposition.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Professional Summary *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Results-driven professional with 5+ years of experience in software development. Proven track record of delivering innovative solutions and leading cross-functional teams to achieve business objectives..."
              className="min-h-32 transition-smooth focus:shadow-elegant"
            />
            <p className="text-sm text-muted-foreground">
              {formData.content.length} characters • Recommended: 300-500 characters
            </p>
          </div>

          <div className="space-y-3">
            <Label>Key Skills & Keywords</Label>
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add a key skill or keyword"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={addKeyword}
                variant="outline"
                className="shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg">
                {formData.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 transition-smooth hover:bg-primary/20"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="ml-1 hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Add relevant keywords to help your resume pass ATS systems and highlight your expertise.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};