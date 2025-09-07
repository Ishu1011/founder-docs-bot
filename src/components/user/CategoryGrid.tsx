import { useState, useEffect } from 'react';
import { ChevronRight, Building2, Utensils, Code, Store, Truck, Heart, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CategoryGridSkeleton } from '@/components/common/LoadingSkeleton';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  documentCount: number;
  color: string;
}

interface CategoryDetails {
  id: string;
  name: string;
  description: string;
  documents: string[];
  requirements: string[];
  whoCanStart: string[];
  estimatedTime: string;
  averageCost: string;
}

const categoryIcons: { [key: string]: any } = {
  'restaurant': Utensils,
  'tech': Code,
  'retail': Store,
  'logistics': Truck,
  'healthcare': Heart,
  'education': GraduationCap,
  'consulting': Users,
  'manufacturing': Building2,
};

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Food & Restaurant',
    description: 'Restaurants, cafes, food trucks, and catering services',
    icon: 'restaurant',
    documentCount: 15,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: '2',
    name: 'Technology & Software',
    description: 'SaaS, mobile apps, web development, and IT services',
    icon: 'tech',
    documentCount: 12,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: '3',
    name: 'Retail & E-commerce',
    description: 'Online stores, physical retail, and marketplaces',
    icon: 'retail',
    documentCount: 18,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: '4',
    name: 'Logistics & Transportation',
    description: 'Shipping, delivery services, and transportation',
    icon: 'logistics',
    documentCount: 10,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: '5',
    name: 'Healthcare & Wellness',
    description: 'Medical practices, wellness centers, and health services',
    icon: 'healthcare',
    documentCount: 14,
    color: 'from-pink-500 to-red-500'
  },
  {
    id: '6',
    name: 'Education & Training',
    description: 'Online courses, tutoring, and educational services',
    icon: 'education',
    documentCount: 8,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: '7',
    name: 'Consulting & Services',
    description: 'Professional services, consulting, and freelancing',
    icon: 'consulting',
    documentCount: 11,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '8',
    name: 'Manufacturing',
    description: 'Product manufacturing and industrial services',
    icon: 'manufacturing',
    documentCount: 16,
    color: 'from-gray-500 to-slate-600'
  },
];

export const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // In production, integrate with your backend
      // const response = await fetch('http://localhost:8000/api/category');
      // const data = await response.json();
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCategories(mockCategories);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load categories. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryDetails = async (categoryId: string) => {
    setDetailsLoading(true);
    try {
      // In production, integrate with your backend
      // const response = await fetch(`http://localhost:8000/api/category/${categoryId}`);
      // const data = await response.json();
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const category = categories.find(c => c.id === categoryId);
      const mockDetails: CategoryDetails = {
        id: categoryId,
        name: category?.name || '',
        description: category?.description || '',
        documents: generateMockDocuments(category?.icon || ''),
        requirements: generateMockRequirements(category?.icon || ''),
        whoCanStart: generateMockEligibility(category?.icon || ''),
        estimatedTime: '2-4 weeks',
        averageCost: '$500 - $2,000'
      };

      setSelectedCategory(mockDetails);
      setIsDialogOpen(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load category details. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const generateMockDocuments = (type: string): string[] => {
    const common = ['Business Registration', 'Tax Registration (EIN)', 'Operating Agreement'];
    
    switch (type) {
      case 'restaurant':
        return [...common, 'Food Service License', 'Liquor License', 'Health Department Permit', 'Fire Department Certificate'];
      case 'tech':
        return [...common, 'Software License Agreement', 'Privacy Policy', 'Terms of Service', 'IP Protection Documents'];
      case 'retail':
        return [...common, 'Sales Tax Permit', 'Reseller License', 'Product Liability Insurance', 'Import/Export Documentation'];
      case 'healthcare':
        return [...common, 'Medical License', 'HIPAA Compliance Documentation', 'Professional Liability Insurance', 'DEA Registration'];
      default:
        return [...common, 'Professional License', 'Industry-Specific Permits', 'Insurance Documentation'];
    }
  };

  const generateMockRequirements = (type: string): string[] => {
    const common = ['Valid business address', 'Initial capital investment', 'Business plan'];
    
    switch (type) {
      case 'restaurant':
        return [...common, 'Food safety certification', 'Commercial kitchen space', 'Liquor license (if applicable)'];
      case 'tech':
        return [...common, 'Technical expertise', 'Development team', 'Intellectual property strategy'];
      case 'healthcare':
        return [...common, 'Medical degree and license', 'Malpractice insurance', 'HIPAA training'];
      default:
        return [...common, 'Industry experience', 'Professional credentials', 'Market research'];
    }
  };

  const generateMockEligibility = (type: string): string[] => {
    switch (type) {
      case 'restaurant':
        return ['Anyone 18+', 'Food service experience recommended', 'Food safety certification required'];
      case 'tech':
        return ['Technical background preferred', 'Coding skills or technical team', 'Understanding of software development'];
      case 'healthcare':
        return ['Licensed medical professional', 'Completed medical education', 'State licensing requirements'];
      default:
        return ['Adult (18+) with legal capacity', 'Relevant industry experience helpful', 'No criminal background restrictions'];
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Business Categories</h2>
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
        <CategoryGridSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Explore Business Categories
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover what legal documents and requirements you need for different types of businesses. 
          Click on any category to get detailed information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.icon] || Building2;
          
          return (
            <Card
              key={category.id}
              className="category-card cursor-pointer group overflow-hidden relative border-0 shadow-lg hover:shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              onClick={() => fetchCategoryDetails(category.id)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.documentCount} docs
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {category.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all"
                  disabled={detailsLoading}
                >
                  <span className="text-sm font-medium">
                    {detailsLoading ? 'Loading...' : 'View Details'}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          );
        })}
      </div>

      {/* Category Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedCategory?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCategory && (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                {selectedCategory.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Estimated Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{selectedCategory.estimatedTime}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Cost
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{selectedCategory.averageCost}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Required Documents</h4>
                  <div className="space-y-2">
                    {selectedCategory.documents.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Key Requirements</h4>
                  <div className="space-y-2">
                    {selectedCategory.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Who Can Start This Business</h4>
                  <div className="space-y-2">
                    {selectedCategory.whoCanStart.map((eligibility, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-sm">{eligibility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};