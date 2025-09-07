import { useState, useEffect } from 'react';
import { Search, Eye, MessageSquare, Calendar, User, Mail, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DashboardSkeleton } from '@/components/common/LoadingSkeleton';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  joinDate: Date;
  lastActive: Date;
  queriesCount: number;
  recentQueries: Query[];
  status: 'active' | 'inactive';
}

interface Query {
  id: string;
  question: string;
  timestamp: Date;
  category: string;
}

interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  messageId: string;
  feedback: string;
  timestamp: Date;
  status: 'new' | 'reviewed' | 'resolved';
}

const mockUsers: UserAccount[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: new Date('2024-01-15'),
    lastActive: new Date('2024-01-20'),
    queriesCount: 15,
    status: 'active',
    recentQueries: [
      {
        id: '1',
        question: 'What documents do I need for a restaurant?',
        timestamp: new Date('2024-01-20'),
        category: 'Food & Restaurant'
      },
      {
        id: '2',
        question: 'How to get a liquor license?',
        timestamp: new Date('2024-01-19'),
        category: 'Food & Restaurant'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    joinDate: new Date('2024-01-10'),
    lastActive: new Date('2024-01-18'),
    queriesCount: 8,
    status: 'active',
    recentQueries: [
      {
        id: '3',
        question: 'SaaS startup legal requirements',
        timestamp: new Date('2024-01-18'),
        category: 'Technology & Software'
      }
    ]
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    joinDate: new Date('2024-01-05'),
    lastActive: new Date('2024-01-12'),
    queriesCount: 23,
    status: 'inactive',
    recentQueries: []
  }
];

const mockFeedback: Feedback[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    messageId: 'msg_123',
    feedback: 'The information about restaurant licensing was outdated for my state. Could you update it with the latest requirements?',
    timestamp: new Date('2024-01-20'),
    status: 'new'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Smith',
    userEmail: 'sarah@example.com',
    messageId: 'msg_456',
    feedback: 'Great response about SaaS requirements, but missing information about GDPR compliance for international businesses.',
    timestamp: new Date('2024-01-19'),
    status: 'reviewed'
  }
];

export const UserManagement = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [feedbackResponse, setFeedbackResponse] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // In production, integrate with your backend
      // const [usersResponse, feedbackResponse] = await Promise.all([
      //   fetch('http://localhost:8000/api/admin/users'),
      //   fetch('http://localhost:8000/api/admin/feedback')
      // ]);

      // Mock API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setFeedback(mockFeedback);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewUserDetails = (user: UserAccount) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const viewFeedbackDetails = (feedbackItem: Feedback) => {
    setSelectedFeedback(feedbackItem);
    setIsFeedbackDialogOpen(true);
  };

  const updateFeedbackStatus = async (feedbackId: string, status: Feedback['status']) => {
    setFeedback(prev =>
      prev.map(fb =>
        fb.id === feedbackId ? { ...fb, status } : fb
      )
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'new':
        return 'destructive';
      case 'reviewed':
        return 'secondary';
      case 'resolved':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          User Management
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Monitor registered users, view their queries, and manage feedback to improve the platform.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user.queriesCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all users
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Feedback</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedback.filter(f => f.status === 'new').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">User Accounts</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Search */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users List */}
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="shadow-md border-0 bg-gradient-to-r from-card to-card/80">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          Joined {user.joinDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status}
                        </Badge>
                        <p className="text-sm font-medium mt-1">{user.queriesCount} queries</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Last active: {user.lastActive.toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewUserDetails(user)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid gap-4">
            {feedback.map((feedbackItem) => (
              <Card key={feedbackItem.id} className="shadow-md border-0 bg-gradient-to-r from-card to-card/80">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{feedbackItem.userName}</h3>
                        <Badge variant={getStatusBadgeVariant(feedbackItem.status)}>
                          {feedbackItem.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {feedbackItem.userEmail} • {feedbackItem.timestamp.toLocaleDateString()}
                      </p>
                      <p className="text-sm line-clamp-2">{feedbackItem.feedback}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewFeedbackDetails(feedbackItem)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Full
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details: {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={getStatusBadgeVariant(selectedUser.status)}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Join Date</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.joinDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Queries</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.queriesCount}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recent Queries</h4>
                <div className="space-y-2">
                  {selectedUser.recentQueries.length > 0 ? (
                    selectedUser.recentQueries.map((query) => (
                      <Card key={query.id}>
                        <CardContent className="p-3">
                          <p className="text-sm font-medium">{query.question}</p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {query.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {query.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent queries</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Feedback Details Dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">User</p>
                  <p className="text-sm text-muted-foreground">{selectedFeedback.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFeedback.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Feedback</p>
                <Card>
                  <CardContent className="p-3">
                    <p className="text-sm">{selectedFeedback.feedback}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Status</p>
                <div className="flex space-x-2">
                  {(['new', 'reviewed', 'resolved'] as const).map((status) => (
                    <Button
                      key={status}
                      variant={selectedFeedback.status === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFeedbackStatus(selectedFeedback.id, status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Response (Optional)</p>
                <Textarea
                  value={feedbackResponse}
                  onChange={(e) => setFeedbackResponse(e.target.value)}
                  placeholder="Add a response to this feedback..."
                  rows={3}
                />
                <Button className="mt-2" size="sm">
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};