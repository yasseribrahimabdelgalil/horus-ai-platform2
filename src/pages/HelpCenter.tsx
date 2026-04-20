import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Book, Video, MessageCircle, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const faqs = [
  {
    qAr: 'كيف أبدأ استخدام HORUS؟',
    qEn: 'How do I start using HORUS?',
    aAr: 'أنشئ حساباً مجانياً، ارفع ملف البيانات الخاص بك (CSV أو Excel)، واتبع خطوات التحليل البسيطة. لا تحتاج إلى أي خبرة تقنية.',
    aEn: 'Create a free account, upload your data file (CSV or Excel), and follow the simple analysis steps. No technical expertise required.',
  },
  {
    qAr: 'ما أنواع الملفات المدعومة؟',
    qEn: 'What file types are supported?',
    aAr: 'ندعم حالياً ملفات CSV وExcel (xlsx, xls). نعمل على إضافة دعم لمزيد من الأنواع قريباً.',
    aEn: 'We currently support CSV and Excel files (xlsx, xls). We are working on adding support for more types soon.',
  },
  {
    qAr: 'هل بياناتي آمنة على المنصة؟',
    qEn: 'Is my data safe on the platform?',
    aAr: 'نعم. نستخدم تشفيراً من الدرجة المؤسسية. بالنسبة للمستخدمين المجانيين، لا نخزن الملفات الأصلية ونعالج البيانات بشكل مؤقت فقط.',
    aEn: 'Yes. We use enterprise-grade encryption. For free users, we do not store original files and process data temporarily only.',
  },
  {
    qAr: 'ما الفرق بين الخطة المجانية والمدفوعة؟',
    qEn: 'What is the difference between free and paid plans?',
    aAr: 'الخطة المجانية تتيح ملفاً واحداً وتقريراً أساسياً و١٠ أسئلة للمساعد AI. الخطة المدفوعة تتيح ملفات غير محدودة وتقارير متقدمة ومساعداً AI كاملاً وحفظ التحليلات.',
    aEn: 'The free plan allows one file, a basic report, and 10 AI assistant questions. The paid plan offers unlimited files, advanced reports, full AI assistant, and saved analyses.',
  },
  {
    qAr: 'كيف أستخدم مساعد AI؟',
    qEn: 'How do I use the AI assistant?',
    aAr: 'بعد رفع بياناتك وتحليلها، ستجد نافذة المساعد AI في لوحة التحليل. اكتب سؤالك بالعربية أو الإنجليزية وسيجيبك المساعد بناءً على بياناتك.',
    aEn: 'After uploading and analyzing your data, you will find the AI assistant panel in the analysis dashboard. Write your question in Arabic or English and the assistant will answer based on your data.',
  },
  {
    qAr: 'هل يمكنني تصدير التقارير؟',
    qEn: 'Can I export reports?',
    aAr: 'نعم، في الخطة المدفوعة يمكنك تصدير التقارير بصيغة PDF وPowerPoint. الخطة المجانية تدعم تصدير PDF الأساسي.',
    aEn: 'Yes, in the paid plan you can export reports in PDF and PowerPoint format. The free plan supports basic PDF export.',
  },
];

const categories = [
  { icon: Book, labelAr: 'دليل البدء', labelEn: 'Getting Started', count: 12 },
  { icon: Video, labelAr: 'فيديوهات تعليمية', labelEn: 'Video Tutorials', count: 8 },
  { icon: HelpCircle, labelAr: 'الأسئلة الشائعة', labelEn: 'FAQs', count: 24 },
  { icon: MessageCircle, labelAr: 'الدعم المباشر', labelEn: 'Live Support', count: null },
];

export function HelpCenter() {
  const { isRTL, lang, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter((faq) => {
    const q = lang === 'ar' ? faq.qAr : faq.qEn;
    return q.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-sky-600 to-cyan-700 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{t('help.title')}</h1>
        <p className="text-blue-100 text-lg mb-8">{t('help.subtitle')}</p>
        <div className="max-w-xl mx-auto relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-slate-400`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isRTL ? 'ابحث في مركز المساعدة...' : 'Search the help center...'}
            className={`w-full ${isRTL ? 'pr-12 pl-5' : 'pl-12 pr-5'} py-4 bg-white rounded-2xl text-sm focus:outline-none shadow-xl focus:ring-2 focus:ring-blue-300`}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.labelEn} className="bg-white rounded-2xl border border-slate-100 p-6 text-center hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group space-y-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{isRTL ? cat.labelAr : cat.labelEn}</p>
                  {cat.count && <p className="text-xs text-slate-400 mt-0.5">{cat.count} {isRTL ? 'مقال' : 'articles'}</p>}
                  {!cat.count && <p className="text-xs text-blue-600 mt-0.5">{isRTL ? 'متاح الآن' : 'Available now'}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">{isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
              >
                <span className="font-semibold text-slate-800 text-sm">{lang === 'ar' ? faq.qAr : faq.qEn}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-sky-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                  {lang === 'ar' ? faq.aAr : faq.aEn}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>{isRTL ? 'لا توجد نتائج للبحث' : 'No results found'}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
