import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AuthUser, AuthContextType } from '../types/auth';
import { mockApiService, initializeMockDatabase } from '../services/mockApi';

// Create the context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * Wraps the application and provides authentication state to all children
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Omit<AuthUser, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize mock database and check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize mock database with seed data if needed
        initializeMockDatabase();

        // Check for existing session
        const session = await mockApiService.getCurrentUser();
        
        if (session) {
          setUser(session.user);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        // Session is invalid, clear it
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function
   */
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApiService.login(email, password);
      
      if (response.success && response.session) {
        setUser(response.session.user);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout function
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await mockApiService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Even if logout fails, clear local state
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access auth context
 * Throws error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Custom hook to check if user has specific role
 */
export function useHasRole(requiredRole: 'admin' | 'user'): boolean {
  const { user } = useAuth();
  
  if (!user) return false;
  
  // Admin has access to everything
  if (user.role === 'admin') return true;
  
  // User only has access to user role
  return user.role === requiredRole;
}

/**
 * Custom hook to check if user is admin
 */
export function useIsAdmin(): boolean {
  const { user } = useAuth();
  return user?.role === 'admin';
}

export { AuthContext };
