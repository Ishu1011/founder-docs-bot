import { useState, useEffect } from 'react';
import { MessageSquare, Grid3X3, Search, TrendingUp, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardSkeleton } from '@/components/common/LoadingSkeleton';

interface UserStats {
  totalQueries: number;
  queriesThisWeek: number;
  favoriteCategory: string;
  recentQueries: RecentQuery[];
  recommendedCategories: RecommendedCategory[];
  quickTips: QuickTip[];
}

interface RecentQuery {
  id: string;
  question: string;
  category: string;
  timestamp: Date;
  helpful: boolean;
}

interface RecommendedCategory {
  name: string;
  description: string;
  icon: string;
  popularity: number;
}

interface QuickTip {
  id: string;
  title: string;
  content: string;
  category: string;
}

const mockUserStats: UserStats = {
  totalQueries: 23,
  queriesThisWeek: 5,
  favoriteCategory: 'Food & Restaurant',
  recentQueries: [
    {
      id: '1',
      question: 'What documents do I need for a restaurant in California?',
      category: 'Food & Restaurant',
      timestamp: new Date('2024-01-20'),
      helpful: true
    },
    {
      id: '2',
      question: 'How to get a liquor license for my restaurant?',
      category: 'Food & Restaurant',
      timestamp: new Date('2024-01-19'),
      helpful: true
    },
    {
      id: '3',
      question: 'Food safety certification requirements',
      category: 'Food & Restaurant',
      timestamp: new Date('2024-01-18'),
      helpful: false
    }
  ],
  recommendedCategories: [
    {
      name: 'Technology & Software',
      description: 'SaaS, apps, and tech startups',
      icon: '💻',
      popularity: 85
    },
    {
      name: 'Retail & E-commerce',
      description: 'Online and physical stores',
      icon: '🛍️',
      popularity: 72
    },
    {
      name: 'Consulting & Services',
      description: 'Professional services',
      icon: '💼',
      popularity: 68
    }
  ],
  quickTips: [
    {
      id: '1',
      title: 'Business Registration Timeline',
      content: 'Most business registrations take 1-2 weeks to process. Plan ahead!',
      category: 'General'
    },
    {
      id: '2',
      title: 'Common Mistake: Missing EIN',
      content: 'Don\'t forget to get your Employer Identification Number (EIN) from the IRS.',
      category: 'Tax'
    },
    {
      id: '3',
      title: 'Insurance is Key',
      content: 'General liability insurance is often required before you can operate.',
      category: 'Insurance'
    }
  ]
};

export const UserDashboard = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      // In production, integrate with your backend
      // const response = await fetch(`http://localhost:8000/api/user/dashboard/${user?.id}`);
      // const data = await response.json();
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockUserStats);
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your personalized legal document assistant is ready to help you navigate business requirements and regulations.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{stats.totalQueries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Questions asked
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{stats.queriesThisWeek}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Recent queries
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Favorite Category</CardTitle>
            <Star className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-lg font-bold line-clamp-1">{stats.favoriteCategory}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Most queried
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Start exploring or continue where you left off
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild className="h-auto p-6 gradient-primary text-primary-foreground btn-glow">
              <Link to="/dashboard/chat" className="flex flex-col items-center space-y-3">
                <MessageSquare className="w-8 h-8" />
                <div className="text-center">
                  <div className="font-medium text-lg">Ask a Question</div>
                  <div className="text-sm opacity-90">Get instant help with legal requirements</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-6 hover:bg-accent">
              <Link to="/dashboard/categories" className="flex flex-col items-center space-y-3">
                <Grid3X3 className="w-8 h-8" />
                <div className="text-center">
                  <div className="font-medium text-lg">Browse Categories</div>
                  <div className="text-sm text-muted-foreground">Explore business types and requirements</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Queries */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span>Recent Queries</span>
            </CardTitle>
            <CardDescription>
              Your latest questions and interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.recentQueries.length > 0 ? (
              <>
                {stats.recentQueries.map((query) => (
                  <div key={query.id} className="p-3 rounded-lg bg-accent/30 border space-y-2">
                    <p className="text-sm font-medium line-clamp-2">{query.question}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {query.category}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {query.timestamp.toLocaleDateString()}
                        </span>
                        {query.helpful ? (
                          <Badge variant="default" className="text-xs">
                            Helpful
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Needs feedback
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/dashboard/chat">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask Another Question
                  </Link>
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No queries yet</p>
                <Button asChild className="mt-4" size="sm">
                  <Link to="/dashboard/chat">Start Asking</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Categories */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Explore Categories</span>
            </CardTitle>
            <CardDescription>
              Popular business categories you might be interested in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.recommendedCategories.map((category) => (
              <div key={category.name} className="p-3 rounded-lg bg-accent/30 border">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{category.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-secondary rounded-full h-1.5 max-w-[60px]">
                          <div
                            className="bg-gradient-primary h-1.5 rounded-full"
                            style={{ width: `${category.popularity}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {category.popularity}% popular
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/dashboard/categories">
                <Grid3X3 className="w-4 h-4 mr-2" />
                View All Categories
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-warning" />
            <span>Quick Tips</span>
          </CardTitle>
          <CardDescription>
            Helpful insights for starting your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.quickTips.map((tip) => (
              <div key={tip.id} className="p-4 rounded-lg bg-accent/30 border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};