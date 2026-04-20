import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

export function Contact() {
  const { isRTL, t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const contactInfo = [
    { icon: Mail, labelAr: 'البريد الإلكتروني', labelEn: 'Email', value: 'hello@horusai.io' },
    { icon: Phone, labelAr: 'الهاتف', labelEn: 'Phone', value: '+966 11 000 0000' },
    { icon: MapPin, labelAr: 'العنوان', labelEn: 'Address', valueAr: 'الرياض، المملكة العربية السعودية', valueEn: 'Riyadh, Saudi Arabia' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">{isRTL ? 'تواصل معنا' : 'Contact Us'}</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">{t('contact.title')}</h1>
        <p className="text-lg text-slate-500">{t('contact.subtitle')}</p>
      </section>

      <section className="pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
        {/* Contact info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-sky-600 to-cyan-700 rounded-2xl p-8 text-white space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-1">{isRTL ? 'معلومات التواصل' : 'Contact Information'}</h3>
              <p className="text-blue-100 text-sm">{isRTL ? 'نحن هنا للإجابة على أسئلتك' : "We're here to answer your questions"}</p>
            </div>
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.labelEn} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">{isRTL ? item.labelAr : item.labelEn}</p>
                    <p className="text-sm font-semibold">{item.value ?? (isRTL ? item.valueAr : item.valueEn)}</p>
                  </div>
                </div>
              );
            })}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <MessageCircle className="w-4 h-4" />
                {isRTL ? 'وقت الرد: خلال ٢٤ ساعة' : 'Response time: within 24 hours'}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Send className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{isRTL ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}</h3>
              <p className="text-slate-500">{isRTL ? 'شكراً لتواصلك معنا. سيرد فريقنا خلال ٢٤ ساعة.' : 'Thank you for contacting us. Our team will reply within 24 hours.'}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">{isRTL ? 'الاسم' : 'Name'}</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder={isRTL ? 'محمد أحمد' : 'John Doe'} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">{isRTL ? 'البريد الإلكتروني' : 'Email'}</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="example@email.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">{isRTL ? 'الموضوع' : 'Subject'}</label>
                  <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder={isRTL ? 'كيف يمكنني مساعدتك؟' : 'How can I help you?'} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">{isRTL ? 'الرسالة' : 'Message'}</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none" placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'} />
                </div>
                <Button type="submit" size="lg" fullWidth>
                  <Send className="w-4 h-4" />
                  {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
