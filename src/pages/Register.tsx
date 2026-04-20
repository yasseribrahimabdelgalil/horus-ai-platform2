import { useState } from 'react';
import { Eye, EyeOff, Zap, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

const accountTypes = [
  { value: 'company', ar: 'شركة', en: 'Company' },
  { value: 'individual', ar: 'فرد', en: 'Individual' },
  { value: 'blogger', ar: 'مدوّن', en: 'Blogger' },
  { value: 'seller', ar: 'بائع إلكتروني', en: 'Online Seller' },
];

const benefits = [
  { ar: 'تحليل مجاني لملف واحد', en: 'Free analysis for one file' },
  { ar: 'تقرير كامل ومفصّل', en: 'Full detailed report' },
  { ar: 'مساعد AI متاح', en: 'AI assistant available' },
  { ar: 'لا حاجة لبطاقة ائتمان', en: 'No credit card required' },
];

export function Register({ onNavigate }: RegisterProps) {
  const { t, lang, isRTL } = useLanguage();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', type: 'company' });

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
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-10 items-center">

        {/* Left/Right: benefits */}
        <div className="hidden lg:block space-y-8 order-2 lg:order-1">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{isRTL ? 'انضم إلى مجتمع HORUS AI' : 'Join the HORUS AI Community'}</h2>
            <p className="text-slate-500 text-sm leading-relaxed">{isRTL ? 'أكثر من ٥٠٠٠ محترف يثقون في HORUS AI لتحليل بياناتهم واتخاذ قرارات أذكى.' : 'Over 5,000 professionals trust HORUS AI to analyze their data and make smarter decisions.'}</p>
          </div>
          <ul className="space-y-3">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{lang === 'ar' ? b.ar : b.en}</span>
              </li>
            ))}
          </ul>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2">
            <p className="text-sm font-semibold text-blue-800">{isRTL ? 'الخطة المجانية تشمل:' : 'Free plan includes:'}</p>
            <p className="text-xs text-blue-600">{isRTL ? '١ ملف — ١ تقرير — ١٠ أسئلة للمساعد AI' : '1 file — 1 report — 10 AI assistant questions'}</p>
          </div>
        </div>

        {/* Form card */}
        <div className="order-1 lg:order-2">
          <div className="text-center mb-6">
            <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
                <Zap className="w-4.5 h-4.5 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-slate-900">HORUS AI</span>
            </button>
            <h1 className="text-2xl font-black text-slate-900">{t('register.title')}</h1>
            <p className="text-slate-500 mt-1 text-sm">{t('register.subtitle')}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">{t('register.name')}</label>
                <div className="relative">
                  <User className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'} w-4 h-4 text-slate-400`} />
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all`}
                    placeholder={isRTL ? 'محمد أحمد' : 'John Doe'}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">{t('register.email')}</label>
                <div className="relative">
                  <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'} w-4 h-4 text-slate-400`} />
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all`}
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">{t('register.password')}</label>
                <div className="relative">
                  <Lock className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'} w-4 h-4 text-slate-400`} />
                  <input
                    type={showPass ? 'text' : 'password'} required value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`w-full ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3.5' : 'right-3.5'} text-slate-400 hover:text-slate-600`}>
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Account type */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">{t('register.type')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {accountTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setForm({ ...form, type: type.value })}
                      className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${form.type === type.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    >
                      {lang === 'ar' ? type.ar : type.en}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" fullWidth size="lg" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {isRTL ? 'جارٍ الإنشاء...' : 'Creating...'}
                  </span>
                ) : t('register.submit')}
              </Button>

              <p className="text-xs text-center text-slate-400 leading-relaxed">
                {t('register.agree')}{' '}
                <button type="button" className="text-blue-600 hover:underline">{t('register.terms')}</button>
                {' '}{t('register.and')}{' '}
                <button type="button" className="text-blue-600 hover:underline">{t('register.privacy')}</button>
              </p>
            </form>
          </div>

          <p className="text-center mt-5 text-sm text-slate-500">
            {t('register.hasAccount')}{' '}
            <button onClick={() => onNavigate('login')} className="text-blue-600 hover:text-blue-700 font-semibold">
              {t('register.login')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
