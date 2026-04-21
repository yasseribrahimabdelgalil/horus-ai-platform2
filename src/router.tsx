import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AudiencePage } from './pages/AudiencePage';
import { AudienceWorkspace } from './pages/AudienceWorkspace';
import { Pricing } from './pages/Pricing';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { HelpCenter } from './pages/HelpCenter';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { AIChat } from './pages/AIChat';
import { Admin } from './pages/Admin';
import { ProtectedRoute, AdminRoute, GuestRoute, ErrorScreen } from './components/guards/RouteGuards';

// Layout with Navbar and Footer
function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.replace('/', '') || 'home';
  
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <Outlet context={{ onNavigate: handleNavigate }} />
      <Footer onNavigate={handleNavigate} />
    </>
  );
}

// Layout without Navbar and Footer (for auth/workspace pages)
function MinimalLayout() {
  return <Outlet />;
}

// Protected Workspace Layout
function WorkspaceLayout() {
  const navigate = useNavigate();
  
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ProtectedRoute onNavigate={handleNavigate}>
      <Outlet context={{ onNavigate: handleNavigate }} />
    </ProtectedRoute>
  );
}

// Admin Layout with enhanced protection
function AdminLayout() {
  const navigate = useNavigate();
  
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AdminRoute onNavigate={handleNavigate}>
      <Outlet context={{ onNavigate: handleNavigate }} />
    </AdminRoute>
  );
}

// Wrapper components to pass navigation props
function HomeWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Home onNavigate={handleNavigate} />;
}

function AudienceWrapper({ type }: { type: 'companies' | 'individuals' | 'bloggers' | 'sellers' }) {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <AudiencePage type={type} onNavigate={handleNavigate} />;
}

function PricingWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Pricing onNavigate={handleNavigate} />;
}

function LoginWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <GuestRoute redirectTo="/dashboard">
      <Login onNavigate={handleNavigate} />
    </GuestRoute>
  );
}

function RegisterWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <GuestRoute redirectTo="/dashboard">
      <Register onNavigate={handleNavigate} />
    </GuestRoute>
  );
}

function DashboardWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Dashboard onNavigate={handleNavigate} />;
}

function ReportsWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Reports onNavigate={handleNavigate} />;
}

function AIChatWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <AIChat onNavigate={handleNavigate} />;
}

function AdminWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Admin onNavigate={handleNavigate} />;
}

// Error boundary fallback
function ErrorBoundaryFallback() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
  };
  return <ErrorScreen onNavigate={handleNavigate} />;
}

// Not found page
function NotFound() {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
  };
  return <ErrorScreen message="Page not found" onNavigate={handleNavigate} />;
}

const router = createBrowserRouter([
  // Public routes with navbar/footer
  {
    element: <PublicLayout />,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      { path: '/', element: <HomeWrapper /> },
      { path: '/companies', element: <AudienceWrapper type="companies" /> },
      { path: '/individuals', element: <AudienceWrapper type="individuals" /> },
      { path: '/bloggers', element: <AudienceWrapper type="bloggers" /> },
      { path: '/online-sellers', element: <AudienceWrapper type="sellers" /> },
      { path: '/pricing', element: <PricingWrapper /> },
      { path: '/blog', element: <Blog /> },
      { path: '/contact', element: <Contact /> },
      { path: '/help-center', element: <HelpCenter /> },
    ],
  },
  // Auth routes (minimal layout, guest only)
  {
    element: <MinimalLayout />,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      { path: '/login', element: <LoginWrapper /> },
      { path: '/register', element: <RegisterWrapper /> },
    ],
  },
  // Protected workspace routes
  {
    element: <WorkspaceLayout />,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      { path: '/dashboard', element: <DashboardWrapper /> },
      { path: '/reports', element: <ReportsWrapper /> },
      { path: '/ai-chat', element: <AIChatWrapper /> },
    ],
  },
  // Admin routes (requires admin role)
  {
    element: <AdminLayout />,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      { path: '/admin', element: <AdminWrapper /> },
    ],
  },
  // Catch-all 404
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function AppRouter() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AdminProvider>
          <RouterProvider router={router} />
        </AdminProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
