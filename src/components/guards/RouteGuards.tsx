import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Permission } from '../../types/auth';
import { Loader2, Lock, AlertTriangle, ShieldAlert } from 'lucide-react';

// ============================================================================
// LOADING STATE
// ============================================================================

function LoadingScreen() {
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
      <p className="text-slate-500 text-sm">
        {isRTL ? 'جاري التحميل...' : 'Loading...'}
      </p>
    </div>
  );
}

// ============================================================================
// ERROR STATES
// ============================================================================

function UnauthorizedScreen({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          {isRTL ? 'يرجى تسجيل الدخول' : 'Login Required'}
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          {isRTL 
            ? 'يجب عليك تسجيل الدخول للوصول إلى هذه الصفحة'
            : 'You need to be logged in to access this page'
          }
        </p>
        <button
          onClick={() => onNavigate?.('login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          {isRTL ? 'تسجيل الدخول' : 'Login'}
        </button>
      </div>
    </div>
  );
}

function ForbiddenScreen({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          {isRTL ? 'غير مصرح' : 'Access Denied'}
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          {isRTL 
            ? 'ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة'
            : 'You do not have permission to access this page'
          }
        </p>
        <button
          onClick={() => onNavigate?.('dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          {isRTL ? 'الذهاب للوحة التحكم' : 'Go to Dashboard'}
        </button>
      </div>
    </div>
  );
}

function ErrorScreen({ message, onNavigate }: { message?: string; onNavigate?: (page: string) => void }) {
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          {isRTL ? 'حدث خطأ' : 'Something went wrong'}
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          {message || (isRTL ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred')}
        </p>
        <button
          onClick={() => onNavigate?.('home')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          {isRTL ? 'العودة للرئيسية' : 'Go Home'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PROTECTED ROUTE GUARD
// ============================================================================

interface ProtectedRouteProps {
  children: ReactNode;
  onNavigate?: (page: string) => void;
  requiredPermissions?: Permission[];
  requireAdmin?: boolean;
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  onNavigate,
  requiredPermissions = [],
  requireAdmin = false,
  fallbackPath = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasPermission, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading while checking auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // If we have onNavigate, use it. Otherwise, use Navigate
    if (onNavigate) {
      return <UnauthorizedScreen onNavigate={onNavigate} />;
    }
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin()) {
    if (onNavigate) {
      return <ForbiddenScreen onNavigate={onNavigate} />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Check specific permissions
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(p => hasPermission(p));
    if (!hasAllPermissions) {
      if (onNavigate) {
        return <ForbiddenScreen onNavigate={onNavigate} />;
      }
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

// ============================================================================
// ADMIN ROUTE GUARD
// ============================================================================

interface AdminRouteProps {
  children: ReactNode;
  onNavigate?: (page: string) => void;
}

export function AdminRoute({ children, onNavigate }: AdminRouteProps) {
  return (
    <ProtectedRoute 
      requireAdmin 
      onNavigate={onNavigate}
      requiredPermissions={['admin:access']}
    >
      {children}
    </ProtectedRoute>
  );
}

// ============================================================================
// GUEST ROUTE GUARD (for login/register pages)
// ============================================================================

interface GuestRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function GuestRoute({ children, redirectTo = '/dashboard' }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

// ============================================================================
// PLAN-GATED ROUTE
// ============================================================================

interface PlanGatedRouteProps {
  children: ReactNode;
  requiredPlan: 'premium' | 'enterprise';
  onNavigate?: (page: string) => void;
}

export function PlanGatedRoute({ children, requiredPlan, onNavigate }: PlanGatedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { isRTL } = useLanguage();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return <UnauthorizedScreen onNavigate={onNavigate} />;
  }

  const planHierarchy = { free: 0, premium: 1, enterprise: 2 };
  const userPlanLevel = planHierarchy[user.plan] || 0;
  const requiredPlanLevel = planHierarchy[requiredPlan] || 0;

  if (userPlanLevel < requiredPlanLevel) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            {isRTL ? 'ميزة مميزة' : 'Premium Feature'}
          </h1>
          <p className="text-slate-500 text-sm mb-6">
            {isRTL 
              ? `هذه الميزة متاحة فقط لمشتركي الخطة ${requiredPlan === 'enterprise' ? 'المؤسسية' : 'المميزة'}`
              : `This feature is only available on the ${requiredPlan} plan`
            }
          </p>
          <button
            onClick={() => onNavigate?.('pricing')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            {isRTL ? 'ترقية الخطة' : 'Upgrade Plan'}
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ============================================================================
// EXPORTS
// ============================================================================

export { LoadingScreen, UnauthorizedScreen, ForbiddenScreen, ErrorScreen };
