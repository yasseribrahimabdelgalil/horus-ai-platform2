import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Search, Bell, Sun, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const NAV_ITEMS = [
  { key: 'nav.home', page: 'home' },
  { key: 'nav.companies', page: 'companies' },
  { key: 'nav.individuals', page: 'individuals' },
  { key: 'nav.bloggers', page: 'bloggers' },
  { key: 'nav.sellers', page: 'online-sellers' },
  { key: 'nav.pricing', page: 'pricing' },
  { key: 'nav.blog', page: 'blog' },
  { key: 'nav.contact', page: 'contact' },
];

// Eye of Horus SVG Logo Component
function HorusLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
      {/* Outer circle */}
      <circle cx="24" cy="24" r="22" fill="url(#horusGrad)" />
      {/* Eye shape */}
      <ellipse cx="24" cy="22" rx="12" ry="8" fill="white" />
      {/* Pupil */}
      <circle cx="24" cy="22" r="4" fill="#1e40af" />
      <circle cx="25" cy="21" r="1.5" fill="white" />
      {/* Eye of Horus markings */}
      <path d="M12 22 C12 22 8 26 6 32" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M36 22 C36 22 40 26 42 32" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M18 30 L14 38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 30 L34 38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      {/* Eyebrow */}
      <path d="M10 16 Q24 8 38 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <defs>
        <linearGradient id="horusGrad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { t, lang, setLang, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 shrink-0">
            <HorusLogo />
            <span className="text-xl font-black text-slate-900 tracking-tight">HORUS AI</span>
          </button>

          {/* Desktop Nav - Center */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  currentPage === item.page 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t(item.key)}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Help Center */}
            <button 
              onClick={() => onNavigate('help-center')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{isRTL ? 'مركز المساعدة' : 'Help Center'}</span>
            </button>

            {/* Theme Toggle */}
            <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Sun className="w-[18px] h-[18px]" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Globe className="w-[18px] h-[18px]" />
            </button>

            {/* Notifications */}
            <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Bell className="w-[18px] h-[18px]" />
            </button>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-slate-200 mx-1" />

            {/* Login */}
            <button
              onClick={() => onNavigate('login')}
              className="hidden sm:block px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              {t('nav.login')}
            </button>

            {/* Register */}
            <Button size="sm" onClick={() => onNavigate('register')} className="shadow-lg shadow-blue-200">
              {t('nav.register')}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.key}
                onClick={() => { onNavigate(item.page); setMobileOpen(false); }} 
                className={`w-full text-start px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === item.page 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {t(item.key)}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-slate-500">{isRTL ? 'اللغة' : 'Language'}</span>
                <button 
                  onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
                  className="flex items-center gap-2 text-sm font-medium text-blue-600"
                >
                  <Globe className="w-4 h-4" />
                  {lang === 'ar' ? 'English' : 'العربية'}
                </button>
              </div>
              <Button variant="outline" fullWidth onClick={() => { onNavigate('login'); setMobileOpen(false); }}>
                {t('nav.login')}
              </Button>
              <Button fullWidth onClick={() => { onNavigate('register'); setMobileOpen(false); }}>
                {t('nav.register')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
