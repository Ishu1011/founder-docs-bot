import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  isRegistering?: boolean;
}

export const LoginForm = ({ isRegistering = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = isRegistering 
        ? await register(email, password, name)
        : await login(email, password);

      if (success) {
        toast({
          title: isRegistering ? 'Account created!' : 'Welcome back!',
          description: isRegistering ? 'Your account has been created successfully.' : 'You have been logged in.',
        });
        
        // Redirect based on role (admin/user will be determined by email in demo)
        const isAdmin = email.includes('admin');
        navigate(isAdmin ? '/admin' : '/dashboard');
      } else {
        toast({
          title: 'Authentication failed',
          description: 'Please check your credentials and try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <Scale className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isRegistering 
                ? 'Join our legal document platform'
                : 'Sign in to access your account'
              }
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegistering}
                  className="transition-smooth"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 transition-smooth"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 transition-smooth"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground btn-glow transition-smooth"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isRegistering ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <Link
              to={isRegistering ? '/login' : '/register'}
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors underline"
            >
              {isRegistering ? 'Sign in here' : 'Create one here'}
            </Link>
          </div>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground">
              Demo: Use any email (include "admin" for admin access)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};