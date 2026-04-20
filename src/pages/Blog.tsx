import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const posts = [
  {
    id: 1,
    titleAr: 'كيف يمكن لتحليل البيانات أن يحول استراتيجية عملك',
    titleEn: 'How Data Analytics Can Transform Your Business Strategy',
    excerptAr: 'اكتشف كيف تستخدم الشركات الرائدة في المنطقة الذكاء الاصطناعي لاتخاذ قرارات أذكى وتحقيق نمو استثنائي.',
    excerptEn: 'Discover how leading companies in the region use AI to make smarter decisions and achieve exceptional growth.',
    category: { ar: 'تحليل البيانات', en: 'Data Analytics' },
    date: '١٥ يناير ٢٠٢٥',
    readTime: { ar: '٥ دقائق', en: '5 min read' },
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    titleAr: 'دليل المبتدئين لتنظيف البيانات باستخدام الذكاء الاصطناعي',
    titleEn: "Beginner's Guide to Data Cleaning with AI",
    excerptAr: 'تعرف على أهمية تنظيف البيانات وكيف تساعدك منصة HORUS AI على إنجازها في دقائق بدلاً من ساعات.',
    excerptEn: 'Learn why data cleaning matters and how HORUS helps you accomplish it in minutes instead of hours.',
    category: { ar: 'دليل تعليمي', en: 'Tutorial' },
    date: '١٠ يناير ٢٠٢٥',
    readTime: { ar: '٨ دقائق', en: '8 min read' },
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    titleAr: 'أفضل ممارسات لوحات BI للشركات المتوسطة',
    titleEn: 'Best BI Dashboard Practices for Mid-sized Companies',
    excerptAr: 'من اختيار مؤشرات الأداء الصحيحة إلى تصميم لوحات بيانات تحكي قصة واضحة لفريقك التنفيذي.',
    excerptEn: 'From choosing the right KPIs to designing dashboards that tell a clear story to your executive team.',
    category: { ar: 'لوحات BI', en: 'BI Dashboards' },
    date: '٥ يناير ٢٠٢٥',
    readTime: { ar: '٦ دقائق', en: '6 min read' },
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    titleAr: 'كيف يستخدم المدونون البيانات لزيادة قرّاءهم',
    titleEn: 'How Bloggers Use Data to Grow Their Readership',
    excerptAr: 'دراسة حالة حقيقية: كيف ضاعف مدوّنون من المنطقة العربية قرّاءهم باستخدام تحليل البيانات.',
    excerptEn: 'Real case study: how Arab bloggers doubled their readership using data analytics.',
    category: { ar: 'حالات نجاح', en: 'Success Stories' },
    date: '١ يناير ٢٠٢٥',
    readTime: { ar: '٧ دقائق', en: '7 min read' },
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    titleAr: 'مستقبل التجارة الإلكترونية: البيانات والذكاء الاصطناعي',
    titleEn: 'The Future of E-Commerce: Data and AI',
    excerptAr: 'اتجاهات ٢٠٢٥ في التجارة الإلكترونية وكيف يمكن للبائعين الاستعداد باستخدام أدوات تحليل متقدمة.',
    excerptEn: '2025 e-commerce trends and how sellers can prepare using advanced analytics tools.',
    category: { ar: 'التجارة الإلكترونية', en: 'E-Commerce' },
    date: '٢٨ ديسمبر ٢٠٢٤',
    readTime: { ar: '٩ دقائق', en: '9 min read' },
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    titleAr: 'كيف تقرأ بيانات مبيعاتك بشكل صحيح',
    titleEn: 'How to Read Your Sales Data Correctly',
    excerptAr: 'المؤشرات الأساسية التي يجب أن تتابعها كل شركة ناشئة لضمان نموّ مستدام.',
    excerptEn: 'The key metrics every startup should track to ensure sustainable growth.',
    category: { ar: 'نصائح', en: 'Tips' },
    date: '٢٠ ديسمبر ٢٠٢٤',
    readTime: { ar: '٤ دقائق', en: '4 min read' },
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export function Blog() {
  const { lang, isRTL, t } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-50 text-center px-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">{isRTL ? 'المدونة' : 'Blog'}</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">{t('blog.title')}</h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">{t('blog.subtitle')}</p>
      </section>

      {/* Posts grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
              <div className="relative overflow-hidden h-48">
                <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 start-3">
                  <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Tag className="w-3 h-3" />
                    {lang === 'ar' ? post.category.ar : post.category.en}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{lang === 'ar' ? post.readTime.ar : post.readTime.en}</span>
                </div>
                <h2 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? post.titleAr : post.titleEn}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
                  {lang === 'ar' ? post.excerptAr : post.excerptEn}
                </p>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:gap-2.5 transition-all">
                  {isRTL ? 'اقرأ المزيد' : 'Read More'}
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
