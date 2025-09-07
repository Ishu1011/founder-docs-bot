import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Scale, 
  MessageSquare, 
  Grid3X3, 
  Settings, 
  Upload, 
  Users, 
  LogOut,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';
  
  const adminNavItems = [
    { name: 'Chatbot', href: '/admin/chat', icon: MessageSquare },
    { name: 'Ingest Files', href: '/admin/ingest', icon: Upload },
    { name: 'User Accounts', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const userNavItems = [
    { name: 'Chatbot', href: '/dashboard/chat', icon: MessageSquare },
    { name: 'Categories', href: '/dashboard/categories', icon: Grid3X3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md">
              <Scale className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              LegalDocs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-border/40">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name || user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-3 mt-3 border-t border-border/40 space-y-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user?.name || user?.email}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};