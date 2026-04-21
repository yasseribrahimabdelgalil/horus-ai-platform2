// ============================================================================
// AUTH TYPES - Role-based access model for HORUS AI Platform
// ============================================================================

export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'editor' 
  | 'viewer' 
  | 'support' 
  | 'finance' 
  | 'content_manager';

export type AudienceType = 'company' | 'individual' | 'blogger' | 'seller';

export type PlanType = 'free' | 'premium' | 'enterprise';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role: UserRole;
  audienceType: AudienceType;
  plan: PlanType;
  planExpiresAt?: number;
  createdAt: number;
  lastLoginAt?: number;
  emailVerified: boolean;
  preferences: UserPreferences;
  limits: UserLimits;
}

export interface UserPreferences {
  language: 'ar' | 'en';
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    weekly_digest: boolean;
  };
  defaultDashboard?: string;
  timezone?: string;
}

export interface UserLimits {
  dashboards: { used: number; limit: number | 'unlimited' };
  reports: { used: number; limit: number | 'unlimited' };
  aiQueries: { used: number; limit: number | 'unlimited' };
  uploads: { used: number; limit: number | 'unlimited' };
  storage: { usedBytes: number; limitBytes: number | 'unlimited' };
  exports: { used: number; limit: number | 'unlimited' };
}

export interface AuthState {
  user: UserProfile | null;
  session: SessionInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SessionInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  audienceType: AudienceType;
  acceptedTerms: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// ============================================================================
// PERMISSION SYSTEM
// ============================================================================

export type Permission = 
  // Content permissions
  | 'content:view'
  | 'content:create'
  | 'content:edit'
  | 'content:delete'
  | 'content:publish'
  // Dashboard permissions
  | 'dashboard:view'
  | 'dashboard:create'
  | 'dashboard:edit'
  | 'dashboard:delete'
  | 'dashboard:export'
  // Reports permissions
  | 'reports:view'
  | 'reports:create'
  | 'reports:edit'
  | 'reports:delete'
  | 'reports:export'
  // AI Chat permissions
  | 'ai:use'
  | 'ai:unlimited'
  // Admin permissions
  | 'admin:access'
  | 'admin:settings'
  | 'admin:users'
  | 'admin:billing'
  | 'admin:security'
  // Team permissions
  | 'team:view'
  | 'team:invite'
  | 'team:manage'
  | 'team:remove';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'content:view', 'content:create', 'content:edit', 'content:delete', 'content:publish',
    'dashboard:view', 'dashboard:create', 'dashboard:edit', 'dashboard:delete', 'dashboard:export',
    'reports:view', 'reports:create', 'reports:edit', 'reports:delete', 'reports:export',
    'ai:use', 'ai:unlimited',
    'admin:access', 'admin:settings', 'admin:users', 'admin:billing', 'admin:security',
    'team:view', 'team:invite', 'team:manage', 'team:remove',
  ],
  admin: [
    'content:view', 'content:create', 'content:edit', 'content:delete', 'content:publish',
    'dashboard:view', 'dashboard:create', 'dashboard:edit', 'dashboard:delete', 'dashboard:export',
    'reports:view', 'reports:create', 'reports:edit', 'reports:delete', 'reports:export',
    'ai:use', 'ai:unlimited',
    'admin:access', 'admin:settings', 'admin:users',
    'team:view', 'team:invite', 'team:manage',
  ],
  editor: [
    'content:view', 'content:create', 'content:edit',
    'dashboard:view', 'dashboard:create', 'dashboard:edit',
    'reports:view', 'reports:create', 'reports:edit',
    'ai:use',
    'team:view',
  ],
  viewer: [
    'content:view',
    'dashboard:view',
    'reports:view',
    'ai:use',
    'team:view',
  ],
  support: [
    'content:view',
    'dashboard:view',
    'reports:view',
    'ai:use',
    'admin:access',
    'team:view',
  ],
  finance: [
    'content:view',
    'dashboard:view',
    'reports:view', 'reports:export',
    'admin:access', 'admin:billing',
    'team:view',
  ],
  content_manager: [
    'content:view', 'content:create', 'content:edit', 'content:publish',
    'dashboard:view',
    'reports:view',
    'ai:use',
    'team:view',
  ],
};

// ============================================================================
// PLAN LIMITS CONFIG
// ============================================================================

export const PLAN_LIMITS: Record<PlanType, Omit<UserLimits, 'dashboards' | 'reports' | 'aiQueries' | 'uploads' | 'storage' | 'exports'> & {
  dashboards: number | 'unlimited';
  reports: number | 'unlimited';
  aiQueries: number | 'unlimited';
  uploads: number | 'unlimited';
  storageBytes: number | 'unlimited';
  exports: number | 'unlimited';
  features: {
    persistData: boolean;
    advancedAnalytics: boolean;
    customBranding: boolean;
    apiAccess: boolean;
    prioritySupport: boolean;
    teamMembers: number | 'unlimited';
  };
}> = {
  free: {
    dashboards: 1,
    reports: 5,
    aiQueries: 10,
    uploads: 5,
    storageBytes: 104857600, // 100MB
    exports: 3,
    features: {
      persistData: false,
      advancedAnalytics: false,
      customBranding: false,
      apiAccess: false,
      prioritySupport: false,
      teamMembers: 1,
    },
  },
  premium: {
    dashboards: 'unlimited',
    reports: 'unlimited',
    aiQueries: 'unlimited',
    uploads: 'unlimited',
    storageBytes: 10737418240, // 10GB
    exports: 'unlimited',
    features: {
      persistData: true,
      advancedAnalytics: true,
      customBranding: false,
      apiAccess: true,
      prioritySupport: true,
      teamMembers: 10,
    },
  },
  enterprise: {
    dashboards: 'unlimited',
    reports: 'unlimited',
    aiQueries: 'unlimited',
    uploads: 'unlimited',
    storageBytes: 'unlimited',
    exports: 'unlimited',
    features: {
      persistData: true,
      advancedAnalytics: true,
      customBranding: true,
      apiAccess: true,
      prioritySupport: true,
      teamMembers: 'unlimited',
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canAccessRoute(role: UserRole, route: string): boolean {
  const protectedRoutes: Record<string, Permission[]> = {
    '/dashboard': ['dashboard:view'],
    '/reports': ['reports:view'],
    '/ai-chat': ['ai:use'],
    '/admin': ['admin:access'],
  };

  const requiredPermissions = protectedRoutes[route];
  if (!requiredPermissions) return true;
  
  return requiredPermissions.every(p => hasPermission(role, p));
}

export function isAdmin(role: UserRole): boolean {
  return role === 'super_admin' || role === 'admin';
}

export function canPersistData(plan: PlanType): boolean {
  return PLAN_LIMITS[plan].features.persistData;
}

export function getPlanLimit<K extends keyof typeof PLAN_LIMITS['free']>(
  plan: PlanType,
  key: K
): typeof PLAN_LIMITS['free'][K] {
  return PLAN_LIMITS[plan][key];
}
