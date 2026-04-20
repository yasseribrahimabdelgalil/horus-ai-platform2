import { Building2, User, SquarePen as PenSquare, ShoppingCart, CheckCircle2, ArrowLeft, ArrowRight, Sparkles, BarChart3, FileText, MessageSquare, TrendingUp, Shield, Zap, Target } from 'lucide-react';
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
  heroSubtitle: { ar: string; en: string };
  benefits: { icon: typeof BarChart3; ar: string; en: string }[];
  features: { ar: string; en: string }[];
  stats: { val: string; labelAr: string; labelEn: string }[];
  ctaText: { ar: string; en: string };
}> = {
  companies: {
    icon: Building2,
    gradient: 'from-blue-600 via-blue-700 to-blue-900',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    heroSubtitle: {
      ar: 'حوّل بيانات شركتك إلى قرارات استراتيجية مدعومة بالذكاء الاصطناعي. تقارير تنفيذية احترافية، لوحات BI متقدمة، ورؤى تنافسية في دقائق.',
      en: 'Transform your company data into AI-powered strategic decisions. Professional executive reports, advanced BI dashboards, and competitive insights in minutes.'
    },
    benefits: [
      { icon: BarChart3, ar: 'لوحات BI تفاعلية', en: 'Interactive BI Dashboards' },
      { icon: FileText, ar: 'تقارير تنفيذية', en: 'Executive Reports' },
      { icon: TrendingUp, ar: 'تحليل الاتجاهات', en: 'Trend Analysis' },
      { icon: Shield, ar: 'أمان مؤسسي', en: 'Enterprise Security' },
    ],
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
    ctaText: { ar: 'ابدأ تجربة الشركات', en: 'Start Enterprise Trial' },
  },
  individuals: {
    icon: User,
    gradient: 'from-blue-600 via-blue-800 to-slate-900',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    heroSubtitle: {
      ar: 'افهم بياناتك الشخصية بسهولة تامة. احصل على رؤى قيمة عن عاداتك المالية وأنماط حياتك — بدون أي خبرة تقنية.',
      en: 'Understand your personal data with complete ease. Get valuable insights about your financial habits and life patterns — no technical expertise required.'
    },
    benefits: [
      { icon: Target, ar: 'تتبع الأهداف', en: 'Goal Tracking' },
      { icon: TrendingUp, ar: 'رؤى مالية', en: 'Financial Insights' },
      { icon: MessageSquare, ar: 'مساعد شخصي', en: 'Personal Assistant' },
      { icon: Shield, ar: 'خصوصية تامة', en: 'Full Privacy' },
    ],
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
    ctaText: { ar: 'ابدأ مجاناً', en: 'Start Free' },
  },
  bloggers: {
    icon: PenSquare,
    gradient: 'from-blue-500 via-blue-600 to-blue-800',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    heroSubtitle: {
      ar: 'افهم جمهورك بعمق، تتبع أداء محتواك، واحصل على توصيات مدعومة بالبيانات لنمو قناتك وزيادة التفاعل.',
      en: 'Understand your audience deeply, track your content performance, and get data-driven recommendations to grow your channel and increase engagement.'
    },
    benefits: [
      { icon: TrendingUp, ar: 'تتبع النمو', en: 'Growth Tracking' },
      { icon: BarChart3, ar: 'تحليل الأداء', en: 'Performance Analysis' },
      { icon: Sparkles, ar: 'توصيات ذكية', en: 'Smart Recommendations' },
      { icon: Target, ar: 'فهم الجمهور', en: 'Audience Insights' },
    ],
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
    ctaText: { ar: 'حلل محتواك الآن', en: 'Analyze Your Content' },
  },
  sellers: {
    icon: ShoppingCart,
    gradient: 'from-blue-600 via-blue-700 to-slate-900',
    light: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
    heroSubtitle: {
      ar: 'حلل مبيعاتك، افهم عملاءك، وحسّن استراتيجيتك. كل ما تحتاجه لزيادة أرباحك وتنمية متجرك الإلكتروني.',
      en: 'Analyze your sales, understand your customers, and optimize your strategy. Everything you need to increase profits and grow your online store.'
    },
    benefits: [
      { icon: TrendingUp, ar: 'تحليل المبيعات', en: 'Sales Analysis' },
      { icon: Target, ar: 'فهم العملاء', en: 'Customer Insights' },
      { icon: BarChart3, ar: 'تتبع المخزون', en: 'Inventory Tracking' },
      { icon: Zap, ar: 'تسعير ذكي', en: 'Smart Pricing' },
    ],
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
    ctaText: { ar: 'حلل متجرك الآن', en: 'Analyze Your Store' },
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
      {/* Hero - Enhanced */}
      <section className={`pt-28 pb-20 bg-gradient-to-br ${c.gradient} relative overflow-hidden`}>
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 end-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 start-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-start space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-semibold text-white/90">
                  {isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'}
                </span>
              </div>
              
              <div className="inline-flex items-center justify-center lg:justify-start w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm">
                <Icon className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {t(titleKeys[type])}
              </h1>
              
              <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {lang === 'ar' ? c.heroSubtitle.ar : c.heroSubtitle.en}
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-blue-50 text-blue-700 border-0 shadow-xl shadow-black/20" 
                  onClick={() => onNavigate('register')}
                >
                  {lang === 'ar' ? c.ctaText.ar : c.ctaText.en}
                  <ArrowIcon className="w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm" 
                  onClick={() => onNavigate('contact')}
                >
                  {isRTL ? 'تحدث مع خبير' : 'Talk to Expert'}
                </Button>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 lg:ms-auto">
              {c.benefits.map((benefit, i) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors">
                    <BenefitIcon className="w-6 h-6 text-white mb-3" />
                    <p className="text-sm font-semibold text-white">{lang === 'ar' ? benefit.ar : benefit.en}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {c.stats.map((stat, i) => (
              <div key={i} className="text-center space-y-1 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
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
              <div key={i} className={`flex items-start gap-3 p-5 rounded-2xl border ${c.light} hover:shadow-md transition-shadow`}>
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${c.iconColor.split(' ')[0]}`} />
                <p className="text-sm font-medium text-slate-700">{lang === 'ar' ? feature.ar : feature.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 start-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-2">
            <Zap className="w-7 h-7 text-white fill-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{isRTL ? 'جاهز للبدء؟' : 'Ready to Start?'}</h2>
          <p className="text-slate-400">{isRTL ? 'انضم إلى آلاف المستخدمين الذين يثقون في HORUS AI' : 'Join thousands of users who trust HORUS AI'}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button size="lg" onClick={() => onNavigate('register')} className="shadow-lg shadow-blue-500/30">
              {isRTL ? 'أنشئ حسابك المجاني' : 'Create Your Free Account'}
              <ArrowIcon className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('pricing')} className="border-slate-600 text-white hover:bg-slate-800">
              {isRTL ? 'شاهد الأسعار' : 'View Pricing'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
