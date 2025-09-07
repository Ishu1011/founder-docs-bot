import { Link } from 'react-router-dom';
import { Scale, MessageSquare, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Scale className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            LegalDocs AI
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your intelligent assistant for legal document requirements. Get instant, accurate guidance on what documents you need to start any business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground btn-glow px-8 py-6 text-lg">
              <Link to="/register">
                Get Started Free
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto">
          <Card className="category-card border-0 shadow-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>AI-Powered Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Ask questions in natural language and get instant, detailed responses about legal requirements for your business type.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="category-card border-0 shadow-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Comprehensive Database</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Access up-to-date legal document requirements across multiple jurisdictions and business categories.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="category-card border-0 shadow-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Expert Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get professional-level guidance on business formation, licensing, permits, and regulatory compliance.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
