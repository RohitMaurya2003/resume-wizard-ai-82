import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Award, ExternalLink, Calendar, Shield } from 'lucide-react';
import { Certification } from '@/types/resume';

interface CertificationsFormProps {
  certifications: Certification[];
  onAdd: (certification: Omit<Certification, 'id'>) => void;
  onUpdate: (id: string, certification: Partial<Certification>) => void;
  onDelete: (id: string) => void;
}

export const CertificationsForm = ({ certifications, onAdd, onUpdate, onDelete }: CertificationsFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCertification, setNewCertification] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    dateObtained: '',
    expiryDate: '',
    credentialId: '',
    verificationUrl: '',
  });

  const handleAdd = () => {
    if (newCertification.name && newCertification.issuer && newCertification.dateObtained) {
      onAdd(newCertification);
      setNewCertification({
        name: '',
        issuer: '',
        dateObtained: '',
        expiryDate: '',
        credentialId: '',
        verificationUrl: '',
      });
      setIsAdding(false);
    }
  };

  const isExpired = (expiryDate: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
          <Award className="w-6 h-6 mr-2 text-primary" />
          Certifications
        </h2>
        <p className="text-muted-foreground">Highlight your professional certifications and credentials.</p>
      </div>

      {/* Add New Certification */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            Add Certification
            <Button
              onClick={() => setIsAdding(!isAdding)}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isAdding && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cert-name">Certification Name *</Label>
                <Input
                  id="cert-name"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  placeholder="AWS Certified Solutions Architect"
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cert-issuer">Issuing Organization *</Label>
                <Input
                  id="cert-issuer"
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cert-date">Date Obtained *</Label>
                <Input
                  id="cert-date"
                  type="month"
                  value={newCertification.dateObtained}
                  onChange={(e) => setNewCertification({ ...newCertification, dateObtained: e.target.value })}
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cert-expiry">Expiry Date</Label>
                <Input
                  id="cert-expiry"
                  type="month"
                  value={newCertification.expiryDate}
                  onChange={(e) => setNewCertification({ ...newCertification, expiryDate: e.target.value })}
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cert-id">Credential ID</Label>
                <Input
                  id="cert-id"
                  value={newCertification.credentialId}
                  onChange={(e) => setNewCertification({ ...newCertification, credentialId: e.target.value })}
                  placeholder="ABC123XYZ"
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cert-url">Verification URL</Label>
                <Input
                  id="cert-url"
                  type="url"
                  value={newCertification.verificationUrl}
                  onChange={(e) => setNewCertification({ ...newCertification, verificationUrl: e.target.value })}
                  placeholder="https://verify.example.com/cert/123"
                  className="transition-smooth focus:shadow-elegant"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} className="bg-gradient-primary text-primary-foreground">
                Add Certification
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Certifications List */}
      {certifications.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {certifications.map((cert) => (
            <Card key={cert.id} className="shadow-card border-border/50 transition-smooth hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
                        <p className="text-primary font-medium">{cert.issuer}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Obtained: {formatDate(cert.dateObtained)}</span>
                      </div>
                      {cert.expiryDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Expires: {formatDate(cert.expiryDate)}
                            {isExpired(cert.expiryDate) && (
                              <Badge variant="destructive" className="ml-2 text-xs">
                                Expired
                              </Badge>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {cert.credentialId && (
                        <Badge variant="outline" className="text-xs">
                          ID: {cert.credentialId}
                        </Badge>
                      )}
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-xs text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Verify</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(cert.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {certifications.length === 0 && (
        <Card className="shadow-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Award className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Certifications Added</h3>
            <p className="text-muted-foreground mb-4">Add your professional certifications to validate your expertise.</p>
            <Button onClick={() => setIsAdding(true)} className="bg-gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Certification
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};