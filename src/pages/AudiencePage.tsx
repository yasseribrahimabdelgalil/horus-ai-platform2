import { Building2, User, SquarePen as PenSquare, ShoppingCart, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

type AudienceType = 'companies' | 'individuals' | 'bloggers' | 'sellers';

interface AudiencePageProps {
  type: AudienceType;
  onNavigate: (page: string) => void;
}

const config: Record<AudienceType, {
  icon: typeof Building2;
  gradient: string;
  light: string;
  iconColor: string;
  features: { ar: string; en: string }[];
  stats: { val: string; labelAr: string; labelEn: string }[];
}> = {
  companies: {
    icon: Building2,
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    features: [
      { ar: 'لوحة BI تفاعلية بمستوى مؤسسي', en: 'Enterprise-grade interactive BI dashboard' },
      { ar: 'تقارير تنفيذية بتنسيق PDF وPowerPoint', en: 'Executive reports in PDF & PowerPoint format' },
      { ar: 'تحليل اتجاهات السوق والمنافسين', en: 'Market trends and competitor analysis' },
      { ar: 'تنظيف البيانات تلقائياً مع السجل الكامل', en: 'Automatic data cleaning with full audit log' },
      { ar: 'مساعد AI لاستفسارات البيانات', en: 'AI assistant for data queries' },
      { ar: 'حفظ وأرشفة التحليلات السابقة', en: 'Save and archive previous analyses' },
    ],
    stats: [
      { val: '+٢٠٠٠', labelAr: 'شركة تستخدم المنصة', labelEn: 'Companies using the platform' },
      { val: '٩٨٪', labelAr: 'رضا العملاء المؤسسيين', labelEn: 'Enterprise customer satisfaction' },
      { val: '+٤٠٪', labelAr: 'زيادة في كفاءة التقارير', labelEn: 'Increase in reporting efficiency' },
    ],
  },
  individuals: {
    icon: User,
    gradient: 'from-blue-600 to-blue-900',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    features: [
      { ar: 'تحليل بيانات شخصية بسهولة تامة', en: 'Personal data analysis with complete ease' },
      { ar: 'رؤى مالية وتتبع العادات', en: 'Financial insights and habit tracking' },
      { ar: 'تقارير مرئية جذابة', en: 'Attractive visual reports' },
      { ar: 'واجهة بسيطة لا تحتاج خبرة تقنية', en: 'Simple interface requiring no technical expertise' },
      { ar: 'مساعد AI يجيب على أسئلتك', en: 'AI assistant that answers your questions' },
      { ar: 'خصوصية تامة لبياناتك', en: 'Full privacy for your data' },
    ],
    stats: [
      { val: '+٣٠٠٠', labelAr: 'فرد يستخدم المنصة', labelEn: 'Individuals using the platform' },
      { val: '٩٩٪', labelAr: 'سهولة الاستخدام', labelEn: 'Ease of use' },
      { val: '٥ دقائق', labelAr: 'متوسط وقت التحليل', labelEn: 'Average analysis time' },
    ],
  },
  bloggers: {
    icon: PenSquare,
    gradient: 'from-blue-500 to-blue-700',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    features: [
      { ar: 'تحليل أداء المحتوى والمقالات', en: 'Content and article performance analysis' },
      { ar: 'فهم سلوك القراء والجمهور', en: 'Understanding reader and audience behavior' },
      { ar: 'اقتراحات مدعومة بالبيانات لتحسين المحتوى', en: 'Data-driven suggestions for content improvement' },
      { ar: 'تتبع نمو المتابعين عبر الوقت', en: 'Follower growth tracking over time' },
      { ar: 'مقارنة أداء المحتوى المختلف', en: 'Comparing performance of different content' },
      { ar: 'تقارير قابلة للمشاركة مع الشركاء', en: 'Shareable reports for partners' },
    ],
    stats: [
      { val: '+٨٠٠', labelAr: 'مدوّن نشط', labelEn: 'Active bloggers' },
      { val: '٣x', labelAr: 'تحسّن في التفاعل', labelEn: 'Improvement in engagement' },
      { val: '+٢٥٪', labelAr: 'نمو في المتابعين', labelEn: 'Follower growth' },
    ],
  },
  sellers: {
    icon: ShoppingCart,
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    features: [
      { ar: 'تحليل المبيعات والإيرادات بدقة', en: 'Precise sales and revenue analysis' },
      { ar: 'رصد المخزون واكتشاف نقاط الضعف', en: 'Inventory monitoring and weakness detection' },
      { ar: 'فهم سلوك العملاء وأنماط الشراء', en: 'Understanding customer behavior and buying patterns' },
      { ar: 'تحسين استراتيجية التسعير', en: 'Pricing strategy optimization' },
      { ar: 'تتبع الأداء عبر المنصات المختلفة', en: 'Performance tracking across different platforms' },
      { ar: 'تقارير ربحية مفصلة', en: 'Detailed profitability reports' },
    ],
    stats: [
      { val: '+١٢٠٠', labelAr: 'بائع إلكتروني', labelEn: 'Online sellers' },
      { val: '+٣٠٪', labelAr: 'زيادة في المبيعات', labelEn: 'Increase in sales' },
      { val: '٢x', labelAr: 'سرعة اتخاذ القرار', labelEn: 'Decision-making speed' },
    ],
  },
};

const titleKeys: Record<AudienceType, string> = {
  companies: 'companies.title',
  individuals: 'individuals.title',
  bloggers: 'bloggers.title',
  sellers: 'sellers.title',
};

export function AudiencePage({ type, onNavigate }: AudiencePageProps) {
  const { t, lang, isRTL } = useLanguage();
  const c = config[type];
  const Icon = c.icon;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`pt-32 pb-20 bg-gradient-to-br ${c.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 end-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">{t(titleKeys[type])}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{t(`audience.${type}.desc`)}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button size="lg" className="bg-white hover:bg-blue-50 text-blue-700 border-0" onClick={() => onNavigate('register')}>
              {isRTL ? 'ابدأ مجاناً' : 'Start Analysis'}
              <ArrowIcon className="w-4 h-4" />
            </Button>
            <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/30" onClick={() => onNavigate('contact')}>
              {isRTL ? 'تحدث معنا' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {c.stats.map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                <p className="text-sm text-slate-500">{lang === 'ar' ? stat.labelAr : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{isRTL ? 'ما الذي تحصل عليه؟' : 'What Do You Get?'}</h2>
            <p className="text-slate-500">{isRTL ? 'كل الأدوات التي تحتاجها في مكان واحد' : 'All the tools you need in one place'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {c.features.map((feature, i) => (
              <div key={i} className={`flex items-start gap-3 p-5 rounded-2xl border ${c.light}`}>
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${c.iconColor.split(' ')[0]}`} />
                <p className="text-sm font-medium text-slate-700">{lang === 'ar' ? feature.ar : feature.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-black text-slate-900">{isRTL ? 'جاهز للبدء؟' : 'Ready to Start?'}</h2>
          <Button size="lg" onClick={() => onNavigate('register')}>
            {isRTL ? 'أنشئ حسابك المجاني' : 'Create Your Free Account'}
            <ArrowIcon className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
