import { CheckCircle2, Zap, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

interface PricingProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    key: 'free',
    priceAr: 'مجاناً',
    priceEn: 'Free',
    price: '$0',
    period: false,
    icon: null,
    features: {
      ar: ['ملف واحد لكل تحليل', 'تقرير PDF أساسي', '١٠ أسئلة للمساعد AI', 'تحليل تلقائي للبيانات', 'لوحة KPI بسيطة'],
      en: ['1 file per analysis', 'Basic PDF report', '10 AI assistant questions', 'Auto data analysis', 'Simple KPI dashboard'],
    },
    highlight: false,
    cta: { ar: 'ابدأ مجاناً', en: 'Start Free' },
  },
  {
    key: 'pro',
    priceAr: '$٢٩',
    priceEn: '$29',
    price: '$29',
    period: true,
    icon: Zap,
    features: {
      ar: ['ملفات غير محدودة', 'تقارير PDF وPowerPoint', 'مساعد AI غير محدود', 'لوحة BI تفاعلية متقدمة', 'حفظ وأرشفة التحليلات', 'فلاتر متقدمة', 'تصدير البيانات'],
      en: ['Unlimited files', 'PDF & PowerPoint reports', 'Unlimited AI assistant', 'Advanced interactive BI dashboard', 'Save & archive analyses', 'Advanced filters', 'Data export'],
    },
    highlight: true,
    cta: { ar: 'ابدأ الفترة التجريبية', en: 'Start Trial' },
  },
  {
    key: 'enterprise',
    priceAr: 'تواصل معنا',
    priceEn: 'Contact Us',
    price: null,
    period: false,
    icon: Building2,
    features: {
      ar: ['كل مميزات Pro', 'إدارة متعددة المستخدمين', 'تكامل API', 'دعم مخصص ٢٤/٧', 'SLA مضمون', 'تخصيص كامل للتقارير', 'تدريب الفريق'],
      en: ['Everything in Pro', 'Multi-user management', 'API integration', 'Dedicated 24/7 support', 'Guaranteed SLA', 'Full report customization', 'Team training'],
    },
    highlight: false,
    cta: { ar: 'تحدث مع فريقنا', en: 'Talk to Our Team' },
  },
];

export function Pricing({ onNavigate }: PricingProps) {
  const { t, lang, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">{isRTL ? 'الأسعار' : 'Pricing'}</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">{t('pricing.title')}</h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">{t('pricing.subtitle')}</p>
      </section>

      {/* Plans */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.key}
                className={`relative bg-white rounded-2xl border-2 p-7 flex flex-col ${plan.highlight ? 'border-blue-500 shadow-2xl shadow-sky-100 scale-105' : 'border-slate-100 shadow-sm'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="bg-sky-600 text-white text-xs font-bold px-4 py-1 rounded-full">{isRTL ? 'الأكثر شعبية' : 'Most Popular'}</span>
                  </div>
                )}

                <div className="space-y-1 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    {Icon && <div className={`w-8 h-8 rounded-lg ${plan.highlight ? 'bg-blue-100' : 'bg-slate-100'} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${plan.highlight ? 'text-blue-600' : 'text-slate-600'}`} />
                    </div>}
                    <h3 className="font-bold text-slate-900">{t(`pricing.${plan.key}`)}</h3>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {lang === 'ar' ? plan.priceAr : plan.priceEn}
                    </span>
                    {plan.period && <span className="text-slate-400 text-sm mb-1">{t('pricing.month')}</span>}
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {plan.features[lang].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-sky-500' : 'text-slate-400'}`} />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => onNavigate(plan.key === 'enterprise' ? 'contact' : 'register')}
                >
                  {lang === 'ar' ? plan.cta.ar : plan.cta.en}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-slate-400 mt-10">{isRTL ? 'جميع الأسعار بالدولار الأمريكي. لا توجد رسوم خفية.' : 'All prices in USD. No hidden fees.'}</p>
      </section>
    </div>
  );
}
