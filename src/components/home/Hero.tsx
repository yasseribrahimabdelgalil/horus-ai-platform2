import { ArrowLeft, ArrowRight, Play, Building2, User, MessageSquare, ShoppingCart, ChevronLeft, ChevronRight, Pencil, Plus, Check, Smartphone, BarChart3, TrendingUp, PieChart, Settings, Palette, Type, Layout, Eye } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';

interface HeroProps {
  onNavigate: (page: string) => void;
}

// Premium Dashboard Visual with floating elements
function DashboardVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto scale-90 lg:scale-100">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-300/18 to-blue-500/30 blur-3xl rounded-full scale-125" />
      
      {/* Energy trails / light paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="trail1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trail2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M50,200 Q150,100 200,200 T350,200" stroke="url(#trail1)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M100,300 Q200,150 300,250 T400,150" stroke="url(#trail2)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Main laptop/dashboard */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Screen header */}
        <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-xs text-slate-400 font-mono">HORUS AI</div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 space-y-3 bg-gradient-to-br from-slate-50 to-white">
          {/* Top KPIs */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'المبيعات', value: '2.4M', change: '+12%', color: 'blue' },
              { label: 'العملاء', value: '18.4K', change: '+8%', color: 'emerald' },
              { label: 'التحويل', value: '3.7%', change: '+2%', color: 'amber' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-lg p-2.5 border border-slate-100 shadow-sm">
                <p className="text-[10px] text-slate-400">{kpi.label}</p>
                <p className="text-sm font-bold text-slate-900">{kpi.value}</p>
                <span className="text-[10px] font-semibold text-emerald-600">{kpi.change}</span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-700">الإيرادات</p>
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <svg viewBox="0 0 200 50" className="w-full h-12">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,40 L30,32 L60,35 L90,18 L120,22 L150,10 L180,15 L200,8 L200,50 L0,50 Z" fill="url(#chartGrad)" />
              <path d="M0,40 L30,32 L60,35 L90,18 L120,22 L150,10 L180,15 L200,8" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
              <circle cx="150" cy="10" r="3" fill="#3b82f6" />
            </svg>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-600 rounded-lg p-2.5 text-white">
              <div className="flex items-center gap-1 mb-1">
                <BarChart3 className="w-3 h-3" />
                <p className="text-[10px]">المنتجات</p>
              </div>
              <div className="flex gap-0.5 items-end h-6">
                {[60, 40, 80, 55, 70, 90, 45].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/30 rounded-sm" />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-1 mb-1">
                <PieChart className="w-3 h-3 text-slate-500" />
                <p className="text-[10px] text-slate-600">المناطق</p>
              </div>
              <div className="space-y-0.5">
                {[['الرياض', '42%'], ['جدة', '28%'], ['الدمام', '30%']].map(([city, pct]) => (
                  <div key={city} className="flex items-center gap-1 text-[9px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-slate-600 flex-1">{city}</span>
                    <span className="font-semibold text-slate-800">{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards around dashboard */}
      <div className="absolute -top-4 -start-8 bg-white rounded-xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
          <Check className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-slate-800">تحليل مكتمل</p>
          <p className="text-[9px] text-slate-400">3 ثواني</p>
        </div>
      </div>

      <div className="absolute -bottom-2 -end-6 bg-white rounded-xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-slate-800">نمو 23%</p>
          <p className="text-[9px] text-slate-400">هذا الشهر</p>
        </div>
      </div>

      {/* Floating mini charts */}
      <div className="absolute top-1/4 -end-4 bg-white/90 backdrop-blur rounded-lg shadow-lg p-2 border border-slate-100">
        <PieChart className="w-6 h-6 text-blue-500" />
      </div>
      <div className="absolute bottom-1/3 -start-6 bg-white/90 backdrop-blur rounded-lg shadow-lg p-2 border border-slate-100">
        <BarChart3 className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  );
}

// Mobile Visual Component
function MobileVisual() {
  return (
    <div className="relative">
      <div className="w-32 bg-slate-900 rounded-2xl p-1 shadow-2xl transform -rotate-6">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="bg-blue-600 px-2 py-1.5 flex items-center justify-between">
            <span className="text-[8px] text-white font-medium">HORUS AI</span>
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-white/50" />
              <div className="w-1 h-1 rounded-full bg-white/50" />
            </div>
          </div>
          <div className="p-2 space-y-1.5">
            <div className="bg-blue-50 rounded p-1.5">
              <div className="text-[7px] text-slate-500">المبيعات</div>
              <div className="text-[10px] font-bold text-slate-900">+24%</div>
            </div>
            <div className="h-8 bg-gradient-to-t from-blue-100 to-blue-50 rounded flex items-end justify-around px-1 pb-1">
              {[40, 60, 45, 80, 55].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="w-1 bg-blue-500 rounded-t" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 -start-2 bg-emerald-500 text-white text-[8px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
        <Check className="w-2.5 h-2.5" />
        جاهز للنشر
      </div>
    </div>
  );
}

// Customization Panel Component
function CustomizationPanel() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 text-white shadow-2xl border border-blue-500/50 w-full max-w-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold">نظام تخصيص الصفحات</h4>
        <div className="flex gap-1.5 text-white/60 text-xs">
          <span className="cursor-pointer hover:text-white">−</span>
          <span className="cursor-pointer hover:text-white">×</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 text-[10px]">
        {['الأزرار', 'الألوان', 'التخطيط', 'الإعدادات'].map((tab, i) => (
          <button 
            key={tab} 
            className={`px-2 py-1 rounded-md transition-colors ${i === 0 ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toggle rows */}
      <div className="space-y-2">
        {[
          { label: 'ابدأ التحليل الآن', active: true },
          { label: 'شاهد كيفية العمل', active: true },
          { label: 'تواصل معنا', active: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
            <div className="w-4 h-4 flex items-center justify-center text-white/40">
              <span className="text-lg">⋮⋮</span>
            </div>
            <span className="flex-1 text-xs">{item.label}</span>
            <div className={`w-8 h-4 rounded-full transition-colors ${item.active ? 'bg-blue-400' : 'bg-white/20'}`}>
              <div className={`w-3 h-3 rounded-full bg-white shadow transform transition-transform mt-0.5 ${item.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <Pencil className="w-3 h-3 text-white/40" />
          </div>
        ))}
      </div>

      {/* Add button */}
      <button className="w-full mt-3 py-2 border border-dashed border-white/30 rounded-lg text-xs text-white/70 hover:text-white hover:border-white/50 transition-colors flex items-center justify-center gap-1">
        <Plus className="w-3 h-3" />
        إضافة جديد
      </button>

      {/* Save button */}
      <button className="w-full mt-2 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors">
        حفظ التغييرات
      </button>
    </div>
  );
}

// Bottom Floating Toolbar
function FloatingToolbar() {
  const items = [
    { icon: Eye, label: 'المعاينة' },
    { icon: Layout, label: 'التخطيط' },
    { icon: Type, label: 'الخطوط' },
    { icon: MessageSquare, label: 'الأزرار' },
    { icon: Palette, label: 'الألوان' },
    { icon: Settings, label: 'تخصيص' },
  ];

  return (
    <div className="inline-flex items-center gap-1 bg-slate-900 rounded-full px-3 py-2 shadow-2xl border border-slate-700">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <button 
            key={i} 
            className="flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-blue-600 transition-colors group"
            title={item.label}
          >
            <Icon className="w-4 h-4 text-white/70 group-hover:text-white" />
            <span className="text-[7px] text-white/50 group-hover:text-white mt-0.5">{item.label}</span>
          </button>
        );
      })}
      <button className="ms-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-full transition-colors">
        حفظ التغييرات
      </button>
    </div>
  );
}

export function Hero({ onNavigate }: HeroProps) {
  const { t, isRTL, lang } = useLanguage();
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  const audiences = [
    { 
      icon: Building2, 
      title: isRTL ? 'الشركات' : 'Companies',
      desc: isRTL ? 'تحليلات متقدمة لإدارة الأعمال' : 'Advanced analytics for business',
      page: 'companies',
      color: 'blue'
    },
    { 
      icon: User, 
      title: isRTL ? 'الأفراد' : 'Individuals',
      desc: isRTL ? 'تحليل شخصي لقرارات أفضل' : 'Personal analytics for better decisions',
      page: 'individuals',
      color: 'cyan'
    },
    { 
      icon: MessageSquare, 
      title: isRTL ? 'البلوجر' : 'Bloggers',
      desc: isRTL ? 'فهم جمهورك ونمو محتواك' : 'Understand your audience and grow',
      page: 'bloggers',
      color: 'teal'
    },
    { 
      icon: ShoppingCart, 
      title: isRTL ? 'تجار أونلاين' : 'Online Sellers',
      desc: isRTL ? 'زيادة المبيعات بقرارات ذكية' : 'Boost sales with smart decisions',
      page: 'online-sellers',
      color: 'amber'
    },
  ];

  const iconColors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    cyan: 'bg-blue-100 text-blue-600',
    teal: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 pt-20 lg:pt-24">
      {/* AI Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient orbs */}
        <div className="absolute top-20 start-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/3 end-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 start-1/3 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl translate-y-1/2" />
        
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(circle, #1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* Floating shapes */}
        <div className="absolute top-32 start-[15%] w-16 h-16 border border-blue-200/50 rounded-lg rotate-12 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-48 end-[20%] w-8 h-8 bg-blue-200/25 rounded-full animate-bounce" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-40 start-[10%] w-12 h-12 border border-blue-200/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          
          {/* Left Content */}
          <div className="lg:col-span-4 space-y-6 pt-4 lg:pt-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-700">
                {isRTL ? 'منصة مدعومة بالذكاء الاصطناعي' : 'AI-Powered Platform'}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-slate-900">{isRTL ? 'حلول تحليل البيانات' : 'Data Analytics Solutions'}</span>
                <br />
                <span className="text-blue-600">{isRTL ? 'بذكاء واحترافية' : 'Smart & Professional'}</span>
              </h1>
              <p className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-md">
                {isRTL 
                  ? 'حوّل بياناتك إلى رؤى قابلة للتنفيذ — بسرعة ودقة' 
                  : 'Transform your data into actionable insights — fast and accurate'}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => onNavigate('register')} className="gap-2 shadow-xl shadow-blue-200">
                {isRTL ? 'ابدأ التحليل الآن' : 'Start Analysis'}
                <ArrowIcon className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Play className="w-4 h-4 fill-current" />
                {isRTL ? 'شاهد كيفية العمل' : 'Watch Demo'}
              </Button>
            </div>

            {/* Mobile visual - small screens only */}
            <div className="lg:hidden flex justify-center py-8">
              <DashboardVisual />
            </div>
          </div>

          {/* Center - Dashboard Visual */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center py-8">
            <DashboardVisual />
          </div>

          {/* Right - Audience Cards */}
          <div className="lg:col-span-3 space-y-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <button
                  key={audience.page}
                  onClick={() => onNavigate(audience.page)}
                  className="group w-full bg-white hover:bg-blue-50/50 rounded-2xl border border-slate-100 hover:border-blue-200 p-4 transition-all duration-300 hover:shadow-lg text-start"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${iconColors[audience.color]} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm">{audience.title}</h3>
                      <p className="text-xs text-slate-500 truncate">{audience.desc}</p>
                    </div>
                    <ArrowIcon className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                  </div>
                </button>
              );
            })}

            {/* Customization Panel */}
            <div className="pt-4">
              <CustomizationPanel />
            </div>
          </div>
        </div>

        {/* Mobile Visual */}
        <div className="absolute bottom-32 start-8 hidden lg:block">
          <MobileVisual />
        </div>
      </div>

      {/* Floating Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
        <FloatingToolbar />
      </div>
    </section>
  );
}
