import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Shield, FileText, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TEST_CREDENTIALS } from '../services/mockApi';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination if user was redirected
  const from = location.state?.from || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success('Welcome back!', {
        description: 'You have been successfully logged in.',
      });
      // Navigation will happen automatically via RoleBasedRedirect or from location
      navigate(from === '/' ? '/' : from, { replace: true });
    } catch {
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
    clearError();
    toast.info('Credentials filled', {
      description: 'Click Sign In to continue.',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Login Form */}
        <Card className="flex-1 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 p-3 rounded-xl bg-primary/10 w-fit">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your document management dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-destructive flex-shrink-0 w-5 h-5" />
                <span className="text-destructive text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-10 h-11"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !email || !password}
                className="w-full h-11 font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Demo Mode</span>
              <Separator className="flex-1" />
            </div>

            {/* Quick Login Hint */}
            <p className="text-center text-sm text-muted-foreground">
              Click on a test account below to auto-fill credentials
            </p>
          </CardContent>
        </Card>

        {/* Test Credentials Panel */}
        <Card className="flex-1 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Test Credentials</CardTitle>
            </div>
            <CardDescription>
              Use these accounts to test different user roles and permissions
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {TEST_CREDENTIALS.map((cred, index) => (
              <button
                key={index}
                onClick={() => fillCredentials(cred.email, cred.password)}
                className="w-full text-left p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-accent/50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg transition-colors ${
                    cred.role === 'Admin' 
                      ? 'bg-purple-100 dark:bg-purple-900/50 group-hover:bg-purple-200 dark:group-hover:bg-purple-900' 
                      : 'bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-900'
                  }`}>
                    {cred.role === 'Admin' ? (
                      <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-foreground">
                        {cred.role}
                      </span>
                      <Badge variant={cred.role === 'Admin' ? 'default' : 'secondary'} className="text-xs">
                        {cred.role === 'Admin' ? 'Full Access' : 'Limited Access'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cred.description}
                    </p>
                    <div className="text-xs font-mono text-muted-foreground space-y-0.5">
                      <div className="truncate">Email: {cred.email}</div>
                      <div>Password: {cred.password}</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Info Box */}
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  How it works
                </h3>
              </div>
              <ul className="text-sm space-y-1.5 text-muted-foreground">
                <li>• <strong className="text-foreground">Admin</strong> can access all documents and manage users</li>
                <li>• <strong className="text-foreground">Users</strong> can only see their own documents</li>
                <li>• Sessions persist across page refreshes</li>
                <li>• Data is stored in localStorage (mock backend)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
