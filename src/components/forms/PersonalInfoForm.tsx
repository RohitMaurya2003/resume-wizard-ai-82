import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfo } from '@/types/resume';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Tell us about yourself to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="transition-smooth focus:shadow-elegant"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className="transition-smooth focus:shadow-elegant"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-smooth focus:shadow-elegant"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="transition-smooth focus:shadow-elegant"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedIn">LinkedIn Profile</Label>
          <Input
            id="linkedIn"
            value={formData.linkedIn || ''}
            onChange={(e) => handleChange('linkedIn', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="transition-smooth focus:shadow-elegant"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio Website</Label>
          <Input
            id="portfolio"
            value={formData.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="johndoe.com"
            className="transition-smooth focus:shadow-elegant"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a brief summary of your professional experience and career goals..."
          className="min-h-24 transition-smooth focus:shadow-elegant"
        />
        <p className="text-sm text-muted-foreground">
          A compelling summary that highlights your key skills and experience.
        </p>
      </div>
    </div>
  );
};