import { useState, useEffect } from 'react';
import { User, Mail, Shield, Bell, Palette, Save, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/common/ThemeToggle';

interface UserProfile {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  queryResponses: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  queryHistory: boolean;
  dataSharing: boolean;
}

export const Settings = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { toast } = useToast();

  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    queryResponses: true,
    weeklyDigest: false,
    productUpdates: true
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'private',
    queryHistory: true,
    dataSharing: false
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords if changing
      if (profile.newPassword) {
        if (profile.newPassword !== profile.confirmPassword) {
          toast({
            title: 'Password Mismatch',
            description: 'New passwords do not match.',
            variant: 'destructive'
          });
          return;
        }
        if (profile.newPassword.length < 8) {
          toast({
            title: 'Weak Password',
            description: 'Password must be at least 8 characters long.',
            variant: 'destructive'
          });
          return;
        }
      }

      // In production, integrate with your backend
      // const response = await fetch(`http://localhost:8000/api/user/profile/${user?.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: profile.name,
      //     email: profile.email,
      //     currentPassword: profile.currentPassword,
      //     newPassword: profile.newPassword
      //   })
      // });

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });

      // Clear password fields
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      // In production, integrate with your backend
      // const response = await fetch(`http://localhost:8000/api/user/notifications/${user?.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(notifications)
      // });

      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: 'Notifications Updated',
        description: 'Your notification preferences have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update notifications. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setLoading(true);
    try {
      // In production, integrate with your backend
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: 'Privacy Settings Updated',
        description: 'Your privacy preferences have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update privacy settings. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, preferences, and privacy settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal information and change your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="transition-smooth"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? 'text' : 'password'}
                          value={profile.currentPassword}
                          onChange={(e) => setProfile(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Enter current password"
                          className="pr-10 transition-smooth"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? 'text' : 'password'}
                          value={profile.newPassword}
                          onChange={(e) => setProfile(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Enter new password"
                          className="pr-10 transition-smooth"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={profile.confirmPassword}
                          onChange={(e) => setProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Confirm new password"
                          className="pr-10 transition-smooth"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="gradient-primary text-primary-foreground btn-glow"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose what notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Query Responses</p>
                    <p className="text-sm text-muted-foreground">Get notified when your questions are answered</p>
                  </div>
                  <Switch
                    checked={notifications.queryResponses}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, queryResponses: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Weekly summary of platform updates</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, weeklyDigest: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Product Updates</p>
                    <p className="text-sm text-muted-foreground">News about new features and improvements</p>
                  </div>
                  <Switch
                    checked={notifications.productUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, productUpdates: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleNotificationUpdate}
                  disabled={loading}
                  className="gradient-primary text-primary-foreground btn-glow"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Privacy Settings</span>
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Query History</p>
                    <p className="text-sm text-muted-foreground">Keep a history of your queries for better experience</p>
                  </div>
                  <Switch
                    checked={privacy.queryHistory}
                    onCheckedChange={(checked) =>
                      setPrivacy(prev => ({ ...prev, queryHistory: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Sharing</p>
                    <p className="text-sm text-muted-foreground">Help improve our service by sharing anonymized usage data</p>
                  </div>
                  <Switch
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) =>
                      setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handlePrivacyUpdate}
                  disabled={loading}
                  className="gradient-primary text-primary-foreground btn-glow"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-primary" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    Currently using {theme} mode
                  </p>
                </div>
                <ThemeToggle />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Theme Preview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-background">
                    <div className="space-y-2">
                      <div className="h-4 bg-primary/20 rounded" />
                      <div className="h-3 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="space-y-2">
                      <div className="h-4 bg-accent/50 rounded" />
                      <div className="h-3 bg-muted/50 rounded w-3/4" />
                      <div className="h-3 bg-muted/50 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};