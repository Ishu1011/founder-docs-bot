import { useState, useRef } from 'react';
import { Upload, File, X, Plus, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  file: File;
  id: string;
}

const categories = [
  'Food & Restaurant',
  'Technology & Software', 
  'Retail & E-commerce',
  'Logistics & Transportation',
  'Healthcare & Wellness',
  'Education & Training',
  'Consulting & Services',
  'Manufacturing',
  'Real Estate',
  'Financial Services'
];

const countries = [
  'United States',
  'Canada',
  'United Kingdom', 
  'Australia',
  'Germany',
  'France',
  'India',
  'Japan',
  'Singapore',
  'Netherlands'
];

export const FileIngest = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const addCustomTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      setCustomTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setCustomTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !category || !location || files.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields and select at least one file.',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      
      // Add files
      files.forEach((fileObj, index) => {
        formData.append(`files`, fileObj.file);
      });

      // Add metadata
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('location', location);
      formData.append('tags', JSON.stringify(customTags));

      // In production, integrate with your backend
      // const response = await fetch('http://localhost:8000/api/ingest', {
      //   method: 'POST',
      //   body: formData
      // });

      // Mock upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Upload Successful!',
        description: `Successfully uploaded ${files.length} file(s) with metadata.`,
      });

      // Reset form
      setFiles([]);
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setCustomTags([]);
      setNewTag('');
      
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload files. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Document Ingestion
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload legal documents with categorization and metadata to help users find relevant information for their business needs.
        </p>
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>Upload Documents</span>
          </CardTitle>
          <CardDescription>
            Provide document details and upload files that will be processed and made available for querying.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="required">Document Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Restaurant Licensing Requirements"
                  required
                  className="transition-smooth"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="required">Location/Country</Label>
                <Select value={location} onValueChange={setLocation} required>
                  <SelectTrigger className="transition-smooth">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{country}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of the document contents..."
                rows={3}
                className="transition-smooth"
              />
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="required">Business Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="transition-smooth">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4" />
                          <span>{cat}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Additional Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add custom tags..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                    className="transition-smooth"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addCustomTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {customTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {customTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <Label>Documents</Label>
              
              {/* Drop Zone */}
              <div
                className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileSelect(e.dataTransfer.files);
                }}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground">
                  Support for PDF, DOC, DOCX, TXT files up to 10MB each
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Files ({files.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {files.map(fileObj => (
                      <div
                        key={fileObj.id}
                        className="flex items-center justify-between p-3 bg-accent/30 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <File className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{fileObj.file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(fileObj.file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileObj.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={uploading || files.length === 0 || !title.trim() || !category || !location}
                className="gradient-primary text-primary-foreground btn-glow min-w-[120px]"
              >
                {uploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Documents</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};