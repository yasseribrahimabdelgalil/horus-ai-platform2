import { Building2, User, SquarePen as PenSquare, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AudienceCardsProps {
  onNavigate: (page: string) => void;
}

const audiences = [
  {
    key: 'companies',
    icon: Building2,
    page: 'companies',
    gradient: 'from-blue-600 to-blue-700',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-600',
    border: 'border-blue-100 hover:border-blue-300',
    accent: 'text-blue-600',
    features: ['featuresAr1', 'featuresAr2', 'featuresAr3'],
  },
  {
    key: 'individuals',
    icon: User,
    page: 'individuals',
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-500',
    border: 'border-blue-100 hover:border-blue-300',
    accent: 'text-blue-500',
    features: [],
  },
  {
    key: 'bloggers',
    icon: PenSquare,
    page: 'bloggers',
    gradient: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-600',
    border: 'border-blue-100 hover:border-blue-300',
    accent: 'text-blue-600',
    features: [],
  },
  {
    key: 'sellers',
    icon: ShoppingCart,
    page: 'sellers',
    gradient: 'from-blue-700 to-blue-800',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-700',
    border: 'border-blue-100 hover:border-blue-300',
    accent: 'text-blue-700',
    features: [],
  },
];

const audienceFeatures: Record<string, Record<string, string[]>> = {
  companies: {
    ar: ['تقارير تنفيذية', 'لوحة BI متقدمة', 'تحليل المنافسين'],
    en: ['Executive Reports', 'Advanced BI Dashboard', 'Competitor Analysis'],
  },
  individuals: {
    ar: ['تحليل شخصي', 'رؤى مالية', 'تتبع الأداء'],
    en: ['Personal Analysis', 'Financial Insights', 'Performance Tracking'],
  },
  bloggers: {
    ar: ['تحليل الجمهور', 'أداء المحتوى', 'نمو المتابعين'],
    en: ['Audience Analysis', 'Content Performance', 'Follower Growth'],
  },
  sellers: {
    ar: ['تحليل المبيعات', 'إدارة المخزون', 'سلوك العملاء'],
    en: ['Sales Analysis', 'Inventory Management', 'Customer Behavior'],
  },
};

export function AudienceCards({ onNavigate }: AudienceCardsProps) {
  const { t, lang, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">{isRTL ? 'لكل احتياج' : 'For Every Need'}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">{t('audience.title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">{t('audience.subtitle')}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            const features = audienceFeatures[audience.key]?.[lang] ?? [];

            return (
              <button
                key={audience.key}
                onClick={() => onNavigate(audience.page)}
                className={`group relative text-start bg-white rounded-2xl border-2 ${audience.border} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100 flex flex-col`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${audience.iconBg} rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {t(`audience.${audience.key}`)}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                  {t(`audience.${audience.key}.desc`)}
                </p>

                {/* Feature list */}
                <ul className="space-y-1.5 mb-5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`w-1.5 h-1.5 rounded-full ${audience.iconBg} shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${audience.accent} group-hover:gap-3 transition-all duration-300`}>
                  <span>{isRTL ? 'اعرف المزيد' : 'Learn More'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </div>

                {/* Top accent line */}
                <div className={`absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r ${audience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
