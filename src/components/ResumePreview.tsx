import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Layout } from 'lucide-react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
}

const templates = [
  { id: 'modern', name: 'Modern', component: ModernTemplate },
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
  { id: 'creative', name: 'Creative', component: ModernTemplate }, // Placeholder
  { id: 'professional', name: 'Professional', component: MinimalTemplate }, // Placeholder
] as const;

export const ResumePreview = ({ data, template, onTemplateChange }: ResumePreviewProps) => {
  const SelectedTemplate = templates.find(t => t.id === template)?.component || ModernTemplate;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Live Preview</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Layout className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Template:</span>
        </div>
      </div>

      {/* Template Selection */}
      <div className="grid grid-cols-2 gap-2">
        {templates.map((t) => (
          <Button
            key={t.id}
            variant={template === t.id ? "default" : "outline"}
            size="sm"
            onClick={() => onTemplateChange(t.id as ResumeTemplate)}
            className={template === t.id ? "bg-gradient-primary text-primary-foreground" : ""}
          >
            {t.name}
          </Button>
        ))}
      </div>

      {/* Resume Preview */}
      <Card className="shadow-card border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-white min-h-[800px] w-full" id="resume-preview">
            <SelectedTemplate data={data} />
          </div>
        </CardContent>
      </Card>

      {/* Template Info */}
      <Card className="shadow-card border-border/50 bg-accent/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
              {templates.find(t => t.id === template)?.name || 'Modern'}
            </Badge>
            <span className="text-sm text-muted-foreground">Selected Template</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your resume will be generated using the selected template. You can switch between different templates anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};