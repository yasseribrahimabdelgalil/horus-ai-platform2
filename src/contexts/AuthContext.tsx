import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// ============================================================================
// AUTH TYPES - Role-based Access Control
// ============================================================================

export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'editor' 
  | 'viewer' 
  | 'support' 
  | 'finance' 
  | 'content_manager';

export type UserPlan = 'free' | 'premium' | 'enterprise';

export type AudienceType = 'company' | 'individual' | 'blogger' | 'seller';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role: UserRole;
  plan: UserPlan;
  audienceType: AudienceType;
  createdAt: number;
  lastLoginAt?: number;
  emailVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  user: UserProfile | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// ============================================================================
// ROLE PERMISSIONS MATRIX
// ============================================================================

export type Permission = 
  | 'view_dashboard'
  | 'view_reports'
  | 'view_ai_chat'
  | 'export_data'
  | 'manage_settings'
  | 'access_admin'
  | 'manage_team'
  | 'manage_billing'
  | 'manage_content'
  | 'view_analytics'
  | 'upload_files'
  | 'delete_data';

const rolePermissions: Record<UserRole, Permission[]> = {
  super_admin: [
    'view_dashboard', 'view_reports', 'view_ai_chat', 'export_data',
    'manage_settings', 'access_admin', 'manage_team', 'manage_billing',
    'manage_content', 'view_analytics', 'upload_files', 'delete_data'
  ],
  admin: [
    'view_dashboard', 'view_reports', 'view_ai_chat', 'export_data',
    'manage_settings', 'access_admin', 'manage_team', 'manage_content',
    'view_analytics', 'upload_files', 'delete_data'
  ],
  editor: [
    'view_dashboard', 'view_reports', 'view_ai_chat', 'export_data',
    'manage_content', 'view_analytics', 'upload_files'
  ],
  content_manager: [
    'view_dashboard', 'view_reports', 'view_ai_chat',
    'manage_content', 'upload_files'
  ],
  viewer: [
    'view_dashboard', 'view_reports', 'view_ai_chat', 'view_analytics'
  ],
  support: [
    'view_dashboard', 'view_reports', 'view_analytics'
  ],
  finance: [
    'view_dashboard', 'view_reports', 'view_analytics', 'manage_billing'
  ],
};

// ============================================================================
// PLAN LIMITS & FEATURES
// ============================================================================

export interface PlanLimits {
  dashboards: number | 'unlimited';
  reports: number | 'unlimited';
  aiQuestions: number | 'unlimited';
  exports: number | 'unlimited';
  uploads: number | 'unlimited';
  storageGB: number | 'unlimited';
  teamMembers: number | 'unlimited';
  retentionDays: number;
  persistRawFiles: boolean;
}

export const planLimits: Record<UserPlan, PlanLimits> = {
  free: {
    dashboards: 1,
    reports: 5,
    aiQuestions: 10,
    exports: 3,
    uploads: 5,
    storageGB: 0.1, // 100MB
    teamMembers: 1,
    retentionDays: 7,
    persistRawFiles: false, // Free users: raw files not persisted
  },
  premium: {
    dashboards: 'unlimited',
    reports: 'unlimited',
    aiQuestions: 'unlimited',
    exports: 'unlimited',
    uploads: 'unlimited',
    storageGB: 10,
    teamMembers: 10,
    retentionDays: 365,
    persistRawFiles: true, // Paid users: can persist
  },
  enterprise: {
    dashboards: 'unlimited',
    reports: 'unlimited',
    aiQuestions: 'unlimited',
    exports: 'unlimited',
    uploads: 'unlimited',
    storageGB: 'unlimited',
    teamMembers: 'unlimited',
    retentionDays: -1, // Forever
    persistRawFiles: true,
  },
};

// ============================================================================
// FEATURE FLAGS BY PLAN
// ============================================================================

export interface PlanFeatures {
  advancedCharts: boolean;
  customBranding: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  whiteLabeling: boolean;
  ssoIntegration: boolean;
  auditLogs: boolean;
  dataExportPdf: boolean;
  dataExportPptx: boolean;
  dataExportExcel: boolean;
  scheduledReports: boolean;
  customDashboards: boolean;
  collaborativeEditing: boolean;
}

export const planFeatures: Record<UserPlan, PlanFeatures> = {
  free: {
    advancedCharts: false,
    customBranding: false,
    apiAccess: false,
    prioritySupport: false,
    whiteLabeling: false,
    ssoIntegration: false,
    auditLogs: false,
    dataExportPdf: true,
    dataExportPptx: false,
    dataExportExcel: false,
    scheduledReports: false,
    customDashboards: false,
    collaborativeEditing: false,
  },
  premium: {
    advancedCharts: true,
    customBranding: true,
    apiAccess: true,
    prioritySupport: true,
    whiteLabeling: false,
    ssoIntegration: false,
    auditLogs: true,
    dataExportPdf: true,
    dataExportPptx: true,
    dataExportExcel: true,
    scheduledReports: true,
    customDashboards: true,
    collaborativeEditing: true,
  },
  enterprise: {
    advancedCharts: true,
    customBranding: true,
    apiAccess: true,
    prioritySupport: true,
    whiteLabeling: true,
    ssoIntegration: true,
    auditLogs: true,
    dataExportPdf: true,
    dataExportPptx: true,
    dataExportExcel: true,
    scheduledReports: true,
    customDashboards: true,
    collaborativeEditing: true,
  },
};

// ============================================================================
// AUTH CONTEXT TYPE
// ============================================================================

interface AuthContextType extends AuthState {
  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  
  // Permission checks
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  canAccessRoute: (route: string) => boolean;
  
  // Plan checks
  getPlanLimits: () => PlanLimits;
  getPlanFeatures: () => PlanFeatures;
  hasFeature: (feature: keyof PlanFeatures) => boolean;
  isWithinLimit: (resource: keyof PlanLimits, currentUsage: number) => boolean;
  canPersistFiles: () => boolean;
  
  // Admin access
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  getAdminEmails: () => string[];
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  audienceType: AudienceType;
}

// ============================================================================
// PROTECTED ROUTES CONFIG
// ============================================================================

export const protectedRoutes: Record<string, { requireAuth: boolean; roles?: UserRole[]; permissions?: Permission[] }> = {
  '/dashboard': { requireAuth: true, permissions: ['view_dashboard'] },
  '/reports': { requireAuth: true, permissions: ['view_reports'] },
  '/ai-chat': { requireAuth: true, permissions: ['view_ai_chat'] },
  '/admin': { requireAuth: true, roles: ['super_admin', 'admin'] },
  '/settings': { requireAuth: true, permissions: ['manage_settings'] },
};

// Admin emails list (Supabase-ready structure)
const adminEmailsList: string[] = [
  // Will be populated from Supabase/config
];

// ============================================================================
// CONTEXT IMPLEMENTATION
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Initialize auth state from storage (Supabase-ready)
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing session in storage
        const storedSession = localStorage.getItem('horus_session');
        const storedUser = localStorage.getItem('horus_user');
        
        if (storedSession && storedUser) {
          const session = JSON.parse(storedSession) as AuthSession;
          const user = JSON.parse(storedUser) as UserProfile;
          
          // Check if session is expired
          if (session.expiresAt > Date.now()) {
            setState({
              user,
              session,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            });
            return;
          }
        }
        
        setState(prev => ({ ...prev, isLoading: false }));
      } catch {
        setState(prev => ({ ...prev, isLoading: false, error: 'Failed to restore session' }));
      }
    };

    initAuth();
  }, []);

  // Login handler (Supabase-ready structure)
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // TODO: Replace with Supabase auth
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      // Mock login for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine role based on admin emails
      const isAdminEmail = adminEmailsList.includes(email.toLowerCase());
      const role: UserRole = isAdminEmail ? 'admin' : 'viewer';
      
      const mockUser: UserProfile = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        role,
        plan: 'free',
        audienceType: 'individual',
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        emailVerified: true,
      };

      const mockSession: AuthSession = {
        accessToken: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_${Date.now()}`,
        expiresAt: Date.now() + 3600000, // 1 hour
      };

      // Store in localStorage (will be replaced with Supabase session)
      localStorage.setItem('horus_session', JSON.stringify(mockSession));
      localStorage.setItem('horus_user', JSON.stringify(mockUser));

      setState({
        user: mockUser,
        session: mockSession,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      return false;
    }
  }, []);

  // Register handler (Supabase-ready structure)
  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // TODO: Replace with Supabase auth
      // const { data: authData, error } = await supabase.auth.signUp({
      //   email: data.email,
      //   password: data.password,
      //   options: { data: { name: data.name, audienceType: data.audienceType } }
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: UserProfile = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        role: 'viewer',
        plan: 'free',
        audienceType: data.audienceType,
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        emailVerified: false,
      };

      const mockSession: AuthSession = {
        accessToken: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_${Date.now()}`,
        expiresAt: Date.now() + 3600000,
      };

      localStorage.setItem('horus_session', JSON.stringify(mockSession));
      localStorage.setItem('horus_user', JSON.stringify(mockUser));

      setState({
        user: mockUser,
        session: mockSession,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      return false;
    }
  }, []);

  // Logout handler
  const logout = useCallback(async (): Promise<void> => {
    // TODO: Replace with Supabase auth
    // await supabase.auth.signOut();
    
    localStorage.removeItem('horus_session');
    localStorage.removeItem('horus_user');
    
    setState({
      user: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  }, []);

  // Refresh session
  const refreshSession = useCallback(async (): Promise<boolean> => {
    if (!state.session?.refreshToken) return false;
    
    try {
      // TODO: Replace with Supabase auth
      // const { data, error } = await supabase.auth.refreshSession();
      return true;
    } catch {
      await logout();
      return false;
    }
  }, [state.session, logout]);

  // Reset password
  const resetPassword = useCallback(async (email: string): Promise<boolean> => {
    try {
      // TODO: Replace with Supabase auth
      // const { error } = await supabase.auth.resetPasswordForEmail(email);
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch {
      return false;
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      // TODO: Replace with Supabase update
      const updatedUser = { ...state.user, ...data };
      localStorage.setItem('horus_user', JSON.stringify(updatedUser));
      setState(prev => ({ ...prev, user: updatedUser }));
      return true;
    } catch {
      return false;
    }
  }, [state.user]);

  // Permission check
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!state.user) return false;
    const userPermissions = rolePermissions[state.user.role] || [];
    return userPermissions.includes(permission);
  }, [state.user]);

  // Role check
  const hasRole = useCallback((role: UserRole | UserRole[]): boolean => {
    if (!state.user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(state.user.role);
  }, [state.user]);

  // Route access check
  const canAccessRoute = useCallback((route: string): boolean => {
    const routeConfig = protectedRoutes[route];
    if (!routeConfig) return true; // Public route
    if (!routeConfig.requireAuth) return true;
    if (!state.isAuthenticated) return false;
    
    if (routeConfig.roles && !hasRole(routeConfig.roles)) return false;
    if (routeConfig.permissions) {
      return routeConfig.permissions.every(p => hasPermission(p));
    }
    
    return true;
  }, [state.isAuthenticated, hasRole, hasPermission]);

  // Plan limits
  const getPlanLimits = useCallback((): PlanLimits => {
    const plan = state.user?.plan || 'free';
    return planLimits[plan];
  }, [state.user]);

  // Plan features
  const getPlanFeatures = useCallback((): PlanFeatures => {
    const plan = state.user?.plan || 'free';
    return planFeatures[plan];
  }, [state.user]);

  // Feature check
  const hasFeature = useCallback((feature: keyof PlanFeatures): boolean => {
    return getPlanFeatures()[feature];
  }, [getPlanFeatures]);

  // Limit check
  const isWithinLimit = useCallback((resource: keyof PlanLimits, currentUsage: number): boolean => {
    const limits = getPlanLimits();
    const limit = limits[resource];
    if (limit === 'unlimited') return true;
    if (typeof limit === 'number') return currentUsage < limit;
    return true;
  }, [getPlanLimits]);

  // Can persist files (business rule: free = no, paid = yes)
  const canPersistFiles = useCallback((): boolean => {
    return getPlanLimits().persistRawFiles;
  }, [getPlanLimits]);

  // Admin checks
  const isAdmin = useCallback((): boolean => {
    return hasRole(['super_admin', 'admin']);
  }, [hasRole]);

  const isSuperAdmin = useCallback((): boolean => {
    return hasRole('super_admin');
  }, [hasRole]);

  const getAdminEmails = useCallback((): string[] => {
    return adminEmailsList;
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshSession,
    resetPassword,
    updateProfile,
    hasPermission,
    hasRole,
    canAccessRoute,
    getPlanLimits,
    getPlanFeatures,
    hasFeature,
    isWithinLimit,
    canPersistFiles,
    isAdmin,
    isSuperAdmin,
    getAdminEmails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
