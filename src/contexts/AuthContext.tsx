import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  UserProfile,
  AuthState,
  LoginCredentials,
  RegisterData,
  UserRole,
  AudienceType,
  PlanType,
  Permission,
  hasPermission,
  canAccessRoute,
  isAdmin,
  canPersistData,
  PLAN_LIMITS,
  ROLE_PERMISSIONS,
} from '../types/auth';

// ============================================================================
// CONTEXT TYPE
// ============================================================================

interface AuthContextType extends AuthState {
  // Auth actions
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  
  // Password management
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  
  // Profile management
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  
  // Permission helpers
  hasPermission: (permission: Permission) => boolean;
  canAccessRoute: (route: string) => boolean;
  isAdmin: () => boolean;
  canPersistData: () => boolean;
  
  // Limit helpers
  checkLimit: (limitKey: 'dashboards' | 'reports' | 'aiQueries' | 'uploads' | 'exports') => {
    allowed: boolean;
    used: number;
    limit: number | 'unlimited';
    remaining: number | 'unlimited';
  };
  incrementUsage: (limitKey: 'dashboards' | 'reports' | 'aiQueries' | 'uploads' | 'exports') => void;
}

// ============================================================================
// DEFAULT STATE
// ============================================================================

const defaultAuthState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  USER: 'horus_user',
  SESSION: 'horus_session',
  REMEMBER: 'horus_remember',
};

// ============================================================================
// CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultAuthState);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedSession = localStorage.getItem(STORAGE_KEYS.SESSION);

        if (storedUser && storedSession) {
          const user = JSON.parse(storedUser) as UserProfile;
          const session = JSON.parse(storedSession);
          
          // Check if session is expired
          if (session.expiresAt > Date.now()) {
            setState({
              user,
              session,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return;
          }
        }

        setState({
          ...defaultAuthState,
          isLoading: false,
        });
      } catch {
        setState({
          ...defaultAuthState,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  // Login handler
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Supabase-ready: Replace this mock with actual Supabase auth
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: credentials.email,
      //   password: credentials.password,
      // });

      // Mock authentication for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create mock user based on email pattern
      const isAdminEmail = credentials.email.includes('admin');
      const mockUser: UserProfile = {
        id: `user_${Date.now()}`,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: isAdminEmail ? 'admin' : 'viewer',
        audienceType: 'company',
        plan: 'free',
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        emailVerified: true,
        preferences: {
          language: 'ar',
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            weekly_digest: true,
          },
        },
        limits: {
          dashboards: { used: 0, limit: PLAN_LIMITS.free.dashboards },
          reports: { used: 0, limit: PLAN_LIMITS.free.reports },
          aiQueries: { used: 0, limit: PLAN_LIMITS.free.aiQueries },
          uploads: { used: 0, limit: PLAN_LIMITS.free.uploads },
          storage: { usedBytes: 0, limitBytes: PLAN_LIMITS.free.storageBytes },
          exports: { used: 0, limit: PLAN_LIMITS.free.exports },
        },
      };

      const mockSession = {
        accessToken: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_${Date.now()}`,
        expiresAt: Date.now() + 3600000, // 1 hour
      };

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(mockSession));
      if (credentials.rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
      }

      setState({
        user: mockUser,
        session: mockSession,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Register handler
  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Supabase-ready: Replace with actual Supabase auth
      // const { data: authData, error } = await supabase.auth.signUp({
      //   email: data.email,
      //   password: data.password,
      //   options: { data: { name: data.name, audienceType: data.audienceType } }
      // });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        role: 'viewer',
        audienceType: data.audienceType,
        plan: 'free',
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        emailVerified: false,
        preferences: {
          language: 'ar',
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            weekly_digest: true,
          },
        },
        limits: {
          dashboards: { used: 0, limit: PLAN_LIMITS.free.dashboards },
          reports: { used: 0, limit: PLAN_LIMITS.free.reports },
          aiQueries: { used: 0, limit: PLAN_LIMITS.free.aiQueries },
          uploads: { used: 0, limit: PLAN_LIMITS.free.uploads },
          storage: { usedBytes: 0, limitBytes: PLAN_LIMITS.free.storageBytes },
          exports: { used: 0, limit: PLAN_LIMITS.free.exports },
        },
      };

      const newSession = {
        accessToken: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_${Date.now()}`,
        expiresAt: Date.now() + 3600000,
      };

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(newSession));

      setState({
        user: newUser,
        session: newSession,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Logout handler
  const logout = useCallback(async (): Promise<void> => {
    // Supabase-ready: await supabase.auth.signOut();
    
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER);

    setState({
      ...defaultAuthState,
      isLoading: false,
    });
  }, []);

  // Refresh session
  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      // Supabase-ready: const { data, error } = await supabase.auth.refreshSession();
      
      const storedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!storedSession) return false;

      const session = JSON.parse(storedSession);
      const newSession = {
        ...session,
        expiresAt: Date.now() + 3600000,
      };

      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(newSession));
      setState(prev => ({ ...prev, session: newSession }));

      return true;
    } catch {
      return false;
    }
  }, []);

  // Password reset request
  const requestPasswordReset = useCallback(async (_email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Supabase-ready: await supabase.auth.resetPasswordForEmail(_email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to send reset email' };
    }
  }, []);

  // Password reset confirm
  const confirmPasswordReset = useCallback(async (_token: string, _newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Supabase-ready: await supabase.auth.updateUser({ password: _newPassword });
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to reset password' };
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!state.user) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Supabase-ready: await supabase.from('profiles').update(updates).eq('id', user.id);
      
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setState(prev => ({ ...prev, user: updatedUser }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to update profile' };
    }
  }, [state.user]);

  // Permission helper
  const checkPermission = useCallback((permission: Permission): boolean => {
    if (!state.user) return false;
    return hasPermission(state.user.role, permission);
  }, [state.user]);

  // Route access helper
  const checkRouteAccess = useCallback((route: string): boolean => {
    if (!state.user) return false;
    return canAccessRoute(state.user.role, route);
  }, [state.user]);

  // Admin check helper
  const checkIsAdmin = useCallback((): boolean => {
    if (!state.user) return false;
    return isAdmin(state.user.role);
  }, [state.user]);

  // Persist data check helper
  const checkCanPersistData = useCallback((): boolean => {
    if (!state.user) return false;
    return canPersistData(state.user.plan);
  }, [state.user]);

  // Limit checker
  const checkLimit = useCallback((limitKey: 'dashboards' | 'reports' | 'aiQueries' | 'uploads' | 'exports'): {
    allowed: boolean;
    used: number;
    limit: number | 'unlimited';
    remaining: number | 'unlimited';
  } => {
    if (!state.user) {
      return { allowed: false, used: 0, limit: 0, remaining: 0 };
    }

    const limitData = state.user.limits[limitKey];
    const limit = limitData.limit;
    const used = limitData.used;

    if (limit === 'unlimited') {
      return { allowed: true, used, limit: 'unlimited', remaining: 'unlimited' };
    }

    const remaining = limit - used;
    return {
      allowed: remaining > 0,
      used,
      limit,
      remaining,
    };
  }, [state.user]);

  // Increment usage
  const incrementUsage = useCallback((limitKey: 'dashboards' | 'reports' | 'aiQueries' | 'uploads' | 'exports'): void => {
    if (!state.user) return;

    const updatedLimits = {
      ...state.user.limits,
      [limitKey]: {
        ...state.user.limits[limitKey],
        used: state.user.limits[limitKey].used + 1,
      },
    };

    const updatedUser = { ...state.user, limits: updatedLimits };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    setState(prev => ({ ...prev, user: updatedUser }));
  }, [state.user]);

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshSession,
    requestPasswordReset,
    confirmPasswordReset,
    updateProfile,
    hasPermission: checkPermission,
    canAccessRoute: checkRouteAccess,
    isAdmin: checkIsAdmin,
    canPersistData: checkCanPersistData,
    checkLimit,
    incrementUsage,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export types for convenience
export type { UserProfile, UserRole, AudienceType, PlanType, Permission };
export { ROLE_PERMISSIONS, PLAN_LIMITS };
