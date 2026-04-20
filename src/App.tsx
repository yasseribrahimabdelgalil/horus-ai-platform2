import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AudiencePage } from './pages/AudiencePage';
import { Pricing } from './pages/Pricing';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { HelpCenter } from './pages/HelpCenter';

type Page = 'home' | 'companies' | 'individuals' | 'bloggers' | 'sellers' | 'pricing' | 'blog' | 'contact' | 'help' | 'login' | 'register' | 'dashboard';

const NO_LAYOUT_PAGES: Page[] = ['login', 'register', 'dashboard'];

function PageContent({ page, onNavigate }: { page: Page; onNavigate: (p: string) => void }) {
  switch (page) {
    case 'home': return <Home onNavigate={onNavigate} />;
    case 'companies': return <AudiencePage type="companies" onNavigate={onNavigate} />;
    case 'individuals': return <AudiencePage type="individuals" onNavigate={onNavigate} />;
    case 'bloggers': return <AudiencePage type="bloggers" onNavigate={onNavigate} />;
    case 'sellers': return <AudiencePage type="sellers" onNavigate={onNavigate} />;
    case 'pricing': return <Pricing onNavigate={onNavigate} />;
    case 'blog': return <Blog />;
    case 'contact': return <Contact />;
    case 'help': return <HelpCenter />;
    case 'login': return <Login onNavigate={onNavigate} />;
    case 'register': return <Register onNavigate={onNavigate} />;
    case 'dashboard': return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Dashboard — Phase 2</h2>
          <p className="text-slate-500 text-sm">Coming in Phase 2 implementation</p>
          <button onClick={() => onNavigate('home')} className="text-sm text-blue-600 hover:underline">Back to Home</button>
        </div>
      </div>
    );
    default: return <Home onNavigate={onNavigate} />;
  }
}

function AppInner() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const valid: Page[] = ['home', 'companies', 'individuals', 'bloggers', 'sellers', 'pricing', 'blog', 'contact', 'help', 'login', 'register'];
    if (hash && valid.includes(hash as Page)) {
      setPage(hash as Page);
    }
  }, []);

  useEffect(() => {
    window.location.hash = page === 'home' ? '' : page;
  }, [page]);

  const showLayout = !NO_LAYOUT_PAGES.includes(page);

  return (
    <>
      {showLayout && <Navbar onNavigate={navigate} currentPage={page} />}
      <PageContent page={page} onNavigate={navigate} />
      {showLayout && <Footer onNavigate={navigate} />}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
