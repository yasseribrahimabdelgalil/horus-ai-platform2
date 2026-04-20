import { Users, BarChart2, Building2, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function TrustStats() {
  const { isRTL } = useLanguage();

  const stats = [
    { 
      icon: BarChart2, 
      value: '+10M', 
      label: isRTL ? 'بيانات محللة' : 'Data Analyzed',
      color: 'blue'
    },
    { 
      icon: Users, 
      value: '+50K', 
      label: isRTL ? 'مستخدم نشط' : 'Active Users',
      color: 'cyan'
    },
    { 
      icon: Building2, 
      value: '+2K', 
      label: isRTL ? 'شركات وثقت بنا' : 'Trusted Companies',
      color: 'teal'
    },
    { 
      icon: Award, 
      value: '99.9%', 
      label: isRTL ? 'دقة التحليل' : 'Analysis Accuracy',
      color: 'emerald'
    },
  ];

  const colorMap: Record<string, { icon: string; text: string }> = {
    blue: { icon: 'bg-blue-100 text-blue-600', text: 'text-blue-600' },
    cyan: { icon: 'bg-blue-100 text-blue-600', text: 'text-blue-600' },
    teal: { icon: 'bg-blue-100 text-blue-600', text: 'text-blue-600' },
    emerald: { icon: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-600' },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 end-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 start-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
            {isRTL ? 'بالأرقام' : 'By The Numbers'}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            {isRTL ? 'منصة موثوقة تثق بها الآلاف' : 'A Platform Trusted by Thousands'}
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            {isRTL 
              ? 'انضم إلى آلاف الشركات والأفراد الذين يعتمدون على HORUS AI لتحليل بياناتهم' 
              : 'Join thousands of companies and individuals who rely on HORUS AI for their analytics'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colors = colorMap[stat.color];
            return (
              <div 
                key={stat.label} 
                className="bg-white rounded-2xl p-6 text-center space-y-4 hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                <div className={`w-14 h-14 rounded-2xl ${colors.icon} mx-auto flex items-center justify-center`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <p className={`text-4xl lg:text-5xl font-black ${colors.text}`}>{stat.value}</p>
                  <p className="text-sm text-slate-600 mt-2 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
