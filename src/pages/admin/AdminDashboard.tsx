import { useState, useEffect } from 'react';
import { Users, FileText, MessageSquare, TrendingUp, Upload, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DashboardSkeleton } from '@/components/common/LoadingSkeleton';

interface DashboardStats {
  totalUsers: number;
  totalDocuments: number;
  totalQueries: number;
  pendingFeedback: number;
  recentUploads: RecentUpload[];
  popularCategories: PopularCategory[];
}

interface RecentUpload {
  id: string;
  title: string;
  category: string;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'failed';
}

interface PopularCategory {
  name: string;
  queryCount: number;
  percentage: number;
}

const mockStats: DashboardStats = {
  totalUsers: 1247,
  totalDocuments: 89,
  totalQueries: 3456,
  pendingFeedback: 12,
  recentUploads: [
    {
      id: '1',
      title: 'Restaurant Licensing Guide - California',
      category: 'Food & Restaurant',
      uploadDate: new Date('2024-01-20'),
      status: 'completed'
    },
    {
      id: '2',
      title: 'SaaS Startup Legal Requirements',
      category: 'Technology & Software',
      uploadDate: new Date('2024-01-19'),
      status: 'processing'
    },
    {
      id: '3',
      title: 'E-commerce Business Registration',
      category: 'Retail & E-commerce',
      uploadDate: new Date('2024-01-18'),
      status: 'completed'
    }
  ],
  popularCategories: [
    { name: 'Food & Restaurant', queryCount: 845, percentage: 24.5 },
    { name: 'Technology & Software', queryCount: 692, percentage: 20.0 },
    { name: 'Retail & E-commerce', queryCount: 534, percentage: 15.5 },
    { name: 'Healthcare & Wellness', queryCount: 412, percentage: 11.9 },
    { name: 'Consulting & Services', queryCount: 389, percentage: 11.3 }
  ]
};

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // In production, integrate with your backend
      // const response = await fetch('http://localhost:8000/api/admin/dashboard');
      // const data = await response.json();
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'processing':
        return 'text-warning';
      case 'failed':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'processing':
        return 'bg-warning/10 text-warning';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
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
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Monitor platform activity, manage documents, and oversee user interactions from your centralized control panel.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered accounts
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Legal documents indexed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            <MessageSquare className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{stats.totalQueries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Questions answered
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Pending Feedback</CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{stats.pendingFeedback}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Common administrative tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 gradient-primary text-primary-foreground btn-glow">
              <Link to="/admin/ingest" className="flex flex-col items-center space-y-2">
                <Upload className="w-6 h-6" />
                <span className="font-medium">Upload Documents</span>
                <span className="text-xs opacity-90">Add new legal documents</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 hover:bg-accent">
              <Link to="/admin/users" className="flex flex-col items-center space-y-2">
                <Users className="w-6 h-6" />
                <span className="font-medium">Manage Users</span>
                <span className="text-xs text-muted-foreground">View user accounts</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 hover:bg-accent">
              <Link to="/admin/chat" className="flex flex-col items-center space-y-2">
                <MessageSquare className="w-6 h-6" />
                <span className="font-medium">Test Chatbot</span>
                <span className="text-xs text-muted-foreground">Query the system</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Uploads */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-success" />
              <span>Recent Uploads</span>
            </CardTitle>
            <CardDescription>
              Latest document uploads and processing status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border">
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">{upload.title}</h4>
                  <p className="text-xs text-muted-foreground">{upload.category}</p>
                  <p className="text-xs text-muted-foreground">
                    {upload.uploadDate.toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(upload.status)}`}>
                  {upload.status}
                </div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/admin/ingest">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Popular Categories</span>
            </CardTitle>
            <CardDescription>
              Most queried business categories this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.popularCategories.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">{category.queryCount}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({category.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/admin/users">
                <Eye className="w-4 h-4 mr-2" />
                View Detailed Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};