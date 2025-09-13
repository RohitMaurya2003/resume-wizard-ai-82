import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, BookOpen, ExternalLink } from 'lucide-react';
import { Publication } from '@/types/resume';

interface PublicationsFormProps {
  publications: Publication[];
  onAdd: (publication: Omit<Publication, 'id'>) => void;
  onUpdate: (id: string, publication: Partial<Publication>) => void;
  onDelete: (id: string) => void;
}

export const PublicationsForm = ({ publications, onAdd, onUpdate, onDelete }: PublicationsFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newPublication, setNewPublication] = useState<Omit<Publication, 'id'>>({
    title: '',
    publisher: '',
    publishDate: '',
    url: '',
    description: '',
    coAuthors: [],
  });

  const handleAdd = () => {
    if (newPublication.title && newPublication.publisher && newPublication.publishDate) {
      onAdd(newPublication);
      setNewPublication({
        title: '',
        publisher: '',
        publishDate: '',
        url: '',
        description: '',
        coAuthors: [],
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary" />
          Publications
        </h2>
        <p className="text-muted-foreground">Showcase your published works, articles, and research.</p>
      </div>

      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            Add Publication
            <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Publication
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isAdding && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pub-title">Title *</Label>
                  <Input
                    id="pub-title"
                    value={newPublication.title}
                    onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
                    placeholder="Publication title"
                    className="transition-smooth focus:shadow-elegant"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pub-publisher">Publisher *</Label>
                  <Input
                    id="pub-publisher"
                    value={newPublication.publisher}
                    onChange={(e) => setNewPublication({ ...newPublication, publisher: e.target.value })}
                    placeholder="Journal, magazine, or website"
                    className="transition-smooth focus:shadow-elegant"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pub-date">Publish Date *</Label>
                  <Input
                    id="pub-date"
                    type="month"
                    value={newPublication.publishDate}
                    onChange={(e) => setNewPublication({ ...newPublication, publishDate: e.target.value })}
                    className="transition-smooth focus:shadow-elegant"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pub-url">URL</Label>
                  <Input
                    id="pub-url"
                    type="url"
                    value={newPublication.url}
                    onChange={(e) => setNewPublication({ ...newPublication, url: e.target.value })}
                    placeholder="https://..."
                    className="transition-smooth focus:shadow-elegant"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pub-description">Description</Label>
                <Textarea
                  id="pub-description"
                  value={newPublication.description}
                  onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}
                  placeholder="Brief description of the publication..."
                  className="min-h-20 transition-smooth focus:shadow-elegant"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAdd} className="bg-gradient-primary text-primary-foreground">
                Add Publication
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {publications.length > 0 && (
        <div className="space-y-4">
          {publications.map((pub) => (
            <Card key={pub.id} className="shadow-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{pub.title}</h3>
                    <p className="text-primary font-medium mb-2">{pub.publisher}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Published: {new Date(pub.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                    {pub.description && <p className="text-sm text-muted-foreground mb-3">{pub.description}</p>}
                    {pub.url && (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-sm text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        <span>View Publication</span>
                      </a>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(pub.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {publications.length === 0 && (
        <Card className="shadow-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Publications Added</h3>
            <p className="text-muted-foreground mb-4">Add your published works to showcase your expertise.</p>
            <Button onClick={() => setIsAdding(true)} className="bg-gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Publication
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};