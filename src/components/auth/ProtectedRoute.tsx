import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth, Permission, UserRole } from '../../contexts/AuthContext';

// ============================================================================
// PROTECTED ROUTE COMPONENT
// ============================================================================

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: Permission[];
  requiredRoles?: UserRole[];
  requireAuth?: boolean;
  fallbackPath?: string;
  showUnauthorized?: boolean;
}

export function ProtectedRoute({
  children,
  requiredPermissions,
  requiredRoles,
  requireAuth = true,
  fallbackPath = '/login',
  showUnauthorized = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasPermission, hasRole, user } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check roles
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = hasRole(requiredRoles);
    if (!hasRequiredRole) {
      if (showUnauthorized) {
        return <UnauthorizedPage onGoBack={() => window.history.back()} />;
      }
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Check permissions
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(p => hasPermission(p));
    if (!hasAllPermissions) {
      if (showUnauthorized) {
        return <UnauthorizedPage onGoBack={() => window.history.back()} />;
      }
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

// ============================================================================
// UNAUTHORIZED PAGE COMPONENT
// ============================================================================

function UnauthorizedPage({ onGoBack }: { onGoBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-500 mb-6">
          You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onGoBack}
            className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ADMIN ROUTE WRAPPER
// ============================================================================

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  return (
    <ProtectedRoute
      requiredRoles={['super_admin', 'admin']}
      requiredPermissions={['access_admin']}
    >
      {children}
    </ProtectedRoute>
  );
}

// ============================================================================
// FEATURE GATE COMPONENT
// ============================================================================

interface FeatureGateProps {
  children: ReactNode;
  feature: string;
  fallback?: ReactNode;
}

export function FeatureGate({ children, feature, fallback }: FeatureGateProps) {
  const { hasFeature } = useAuth();
  
  // Check if feature is enabled
  const isEnabled = hasFeature(feature as keyof ReturnType<typeof hasFeature>);
  
  if (!isEnabled) {
    return fallback ? <>{fallback}</> : <UpgradePrompt feature={feature} />;
  }
  
  return <>{children}</>;
}

// ============================================================================
// UPGRADE PROMPT COMPONENT
// ============================================================================

function UpgradePrompt({ feature }: { feature: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-6 text-center">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">Upgrade Required</h3>
      <p className="text-sm text-slate-600 mb-4">
        The <span className="font-semibold">{feature}</span> feature is available on Premium and Enterprise plans.
      </p>
      <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
        Upgrade Now
      </button>
    </div>
  );
}

// ============================================================================
// PLAN LIMIT GATE
// ============================================================================

interface PlanLimitGateProps {
  children: ReactNode;
  resource: 'dashboards' | 'reports' | 'aiQuestions' | 'exports' | 'uploads';
  currentUsage: number;
  onLimitReached?: () => void;
}

export function PlanLimitGate({ 
  children, 
  resource, 
  currentUsage,
  onLimitReached 
}: PlanLimitGateProps) {
  const { isWithinLimit, getPlanLimits } = useAuth();
  const limits = getPlanLimits();
  const withinLimit = isWithinLimit(resource, currentUsage);
  
  if (!withinLimit) {
    if (onLimitReached) {
      onLimitReached();
    }
    
    const limit = limits[resource];
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Limit Reached</h3>
        <p className="text-sm text-slate-600 mb-4">
          You&apos;ve used {currentUsage} of {limit} {resource}. Upgrade to continue.
        </p>
        <button className="px-5 py-2.5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors">
          Upgrade Plan
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
}
