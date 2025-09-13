import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Trophy, Calendar, Star } from 'lucide-react';
import { Achievement } from '@/types/resume';

interface AchievementsFormProps {
  achievements: Achievement[];
  onAdd: (achievement: Omit<Achievement, 'id'>) => void;
  onUpdate: (id: string, achievement: Partial<Achievement>) => void;
  onDelete: (id: string) => void;
}

const achievementCategories = [
  'Performance & Results',
  'Leadership & Management',
  'Innovation & Creativity',
  'Team Collaboration',
  'Customer Success',
  'Process Improvement',
  'Technical Excellence',
  'Awards & Recognition',
  'Training & Development',
  'Community & Volunteer'
];

export const AchievementsForm = ({ achievements, onAdd, onUpdate, onDelete }: AchievementsFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    date: '',
    category: '',
  });

  const handleAdd = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.date && newAchievement.category) {
      onAdd(newAchievement);
      setNewAchievement({
        title: '',
        description: '',
        date: '',
        category: '',
      });
      setIsAdding(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  const achievementsByCategory = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Performance & Results':
        return <Star className="w-4 h-4" />;
      case 'Leadership & Management':
        return <Trophy className="w-4 h-4" />;
      case 'Awards & Recognition':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-primary" />
          Achievements
        </h2>
        <p className="text-muted-foreground">Showcase your key accomplishments and notable achievements.</p>
      </div>

      {/* Add New Achievement */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            Add Achievement
            <Button
              onClick={() => setIsAdding(!isAdding)}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isAdding && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="achievement-title">Achievement Title *</Label>
                  <Input
                    id="achievement-title"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                    placeholder="Increased team productivity by 40%"
                    className="transition-smooth focus:shadow-elegant"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="achievement-category">Category *</Label>
                  <Select
                    value={newAchievement.category}
                    onValueChange={(value) => setNewAchievement({ ...newAchievement, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {achievementCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="achievement-date">Date *</Label>
                <Input
                  id="achievement-date"
                  type="month"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="achievement-description">Description *</Label>
                <Textarea
                  id="achievement-description"
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  placeholder="Describe your achievement in detail, including context, actions taken, and measurable results..."
                  className="min-h-24 transition-smooth focus:shadow-elegant"
                />
                <p className="text-sm text-muted-foreground">
                  Include specific metrics and quantifiable results when possible.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} className="bg-gradient-primary text-primary-foreground">
                Add Achievement
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Achievements by Category */}
      {Object.keys(achievementsByCategory).length > 0 && (
        <div className="space-y-6">
          {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
            <Card key={category} className="shadow-card border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-primary flex items-center space-x-2">
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </CardTitle>
                <CardDescription>{categoryAchievements.length} achievement(s)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 bg-accent/30 rounded-lg border border-border/30 transition-smooth hover:shadow-card"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(achievement.date)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(achievement.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {achievements.length === 0 && (
        <Card className="shadow-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Trophy className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Achievements Added</h3>
            <p className="text-muted-foreground mb-4">Highlight your key accomplishments to stand out to employers.</p>
            <Button onClick={() => setIsAdding(true)} className="bg-gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Achievement
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};