import { useState } from 'react';
import { Eye, EyeOff, Zap, Lock, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const { t, isRTL } = useLanguage();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-2xl font-black text-slate-900">HORUS AI</span>
          </button>
          <h1 className="text-2xl font-black text-slate-900">{t('login.title')}</h1>
          <p className="text-slate-500 mt-1.5 text-sm">{t('login.subtitle')}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">{t('login.email')}</label>
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'} w-4 h-4 text-slate-400`} />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all`}
                  placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">{t('login.password')}</label>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium">{t('login.forgot')}</button>
              </div>
              <div className="relative">
                <Lock className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'} w-4 h-4 text-slate-400`} />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3.5' : 'right-3.5'} text-slate-400 hover:text-slate-600`}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {isRTL ? 'جارٍ الدخول...' : 'Signing in...'}
                </span>
              ) : t('login.submit')}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-slate-500">
          {t('login.noAccount')}{' '}
          <button onClick={() => onNavigate('register')} className="text-blue-600 hover:text-blue-700 font-semibold">
            {t('login.register')}
          </button>
        </p>
      </div>
    </div>
  );
}
