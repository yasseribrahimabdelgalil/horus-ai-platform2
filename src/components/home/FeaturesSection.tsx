import { Upload, Wand2, Brain, FileBarChart2, MessageSquare, LayoutDashboard, Target, Zap, Shield, Gauge } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const features = [
  { icon: Upload, key: 'upload', step: '01', color: 'blue' },
  { icon: Wand2, key: 'clean', step: '02', color: 'blue' },
  { icon: Brain, key: 'analysis', step: '03', color: 'blue' },
  { icon: FileBarChart2, key: 'reports', step: '04', color: 'blue' },
  { icon: MessageSquare, key: 'chat', step: '05', color: 'blue' },
  { icon: LayoutDashboard, key: 'dashboard', step: '06', color: 'blue' },
];

const colorClasses: Record<string, { icon: string; step: string; border: string }> = {
  blue: { icon: 'bg-blue-600 text-white', step: 'text-blue-300 bg-blue-50', border: 'group-hover:border-blue-200' },
};

export function FeaturesSection() {
  const { t, isRTL } = useLanguage();

  // Feature strip items (matches reference image)
  const featureStrip = [
    { icon: Target, label: isRTL ? 'دقة عالية' : 'High Accuracy', desc: isRTL ? 'تقارير موثوقة' : 'Reliable reports' },
    { icon: Zap, label: isRTL ? 'سرعة فائقة' : 'Super Fast', desc: isRTL ? 'نتائج فورية' : 'Instant results' },
    { icon: Brain, label: isRTL ? 'ذكاء اصطناعي' : 'AI Powered', desc: isRTL ? 'تحليل متقدم' : 'Advanced analysis' },
    { icon: Shield, label: isRTL ? 'أمان كامل' : 'Fully Secure', desc: isRTL ? 'حماية بيانات' : 'Data protection' },
  ];

  // Stats cards (matches reference image)
  const statsCards = [
    { value: '+10M', label: isRTL ? 'بيانات محللة' : 'Data Analyzed', color: 'blue' },
    { value: '+50K', label: isRTL ? 'مستخدم نشط' : 'Active Users', color: 'cyan' },
    { value: '+2K', label: isRTL ? 'شركات وثقت بنا' : 'Trusted Companies', color: 'blue' },
    { value: '99.9%', label: isRTL ? 'دقة التحليل' : 'Analysis Accuracy', color: 'emerald' },
  ];

  const statColors: Record<string, string> = {
    blue: 'text-blue-600',
    cyan: 'text-blue-600',
    teal: 'text-blue-600',
    emerald: 'text-emerald-600',
  };

  return (
    <section className="relative">
      {/* Curved Feature Strip */}
      <div className="relative bg-gradient-to-b from-blue-50/50 to-white">
        {/* Curved top edge SVG */}
        <div className="absolute top-0 inset-x-0 -translate-y-full">
          <svg viewBox="0 0 1440 80" className="w-full h-16 lg:h-20" preserveAspectRatio="none">
            <path 
              d="M0,80 L0,40 Q360,0 720,20 T1440,40 L1440,80 Z" 
              fill="rgb(239 246 255 / 0.5)" 
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 4 Feature Icons Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 mb-16">
            {featureStrip.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 p-6 text-center hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">{feature.label}</h4>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statsCards.map((stat, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl border border-slate-100 p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <p className={`text-4xl lg:text-5xl font-black ${statColors[stat.color]} mb-2`}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              {isRTL ? 'كيف يعمل' : 'How It Works'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">{t('features.title')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">{t('features.subtitle')}</p>
          </div>

          {/* Workflow indicator */}
          <div className="hidden lg:flex items-center justify-center mb-12 gap-0">
            {features.map((f, i) => (
              <div key={f.key} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {i + 1}
                </div>
                {i < features.length - 1 && (
                  <div className="w-12 lg:w-20 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200" />
                )}
              </div>
            ))}
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              const colors = colorClasses[feature.color];
              return (
                <div
                  key={feature.key}
                  className={`group bg-white rounded-2xl border-2 border-slate-100 ${colors.border} p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-3xl font-black ${colors.step} px-3 py-1 rounded-lg`}>{feature.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{t(`features.${feature.key}`)}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{t(`features.${feature.key}.desc`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
