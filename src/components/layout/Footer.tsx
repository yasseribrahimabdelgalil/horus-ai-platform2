import { Zap, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t, isRTL } = useLanguage();
  const year = new Date().getFullYear();

  const platformLinks = [
    { label: t('nav.home'), page: 'home' },
    { label: t('nav.pricing'), page: 'pricing' },
    { label: t('nav.blog'), page: 'blog' },
    { label: t('nav.dashboard'), page: 'dashboard' },
  ];

  const companyLinks = [
    { label: t('footer.about'), page: 'contact' },
    { label: t('footer.careers'), page: 'contact' },
    { label: t('nav.contact'), page: 'contact' },
    { label: t('nav.help'), page: 'help-center' },
  ];

  const solutionLinks = [
    { label: t('nav.companies'), page: 'companies' },
    { label: t('nav.individuals'), page: 'individuals' },
    { label: t('nav.bloggers'), page: 'bloggers' },
    { label: t('nav.sellers'), page: 'online-sellers' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Zap className="w-5.5 h-5.5 text-white fill-white" />
              </div>
              <span className="text-lg font-black text-white">HORUS AI</span>
            </button>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">{t('footer.desc')}</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>hello@horusai.io</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+966 11 000 0000</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">{t('footer.platform')}</h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">{isRTL ? 'الحلول' : 'Solutions'}</h4>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <button onClick={() => onNavigate(link.page)} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} HORUS AI. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-xs text-slate-500 hover:text-blue-400 transition-colors">{t('footer.privacy')}</button>
            <button className="text-xs text-slate-500 hover:text-blue-400 transition-colors">{t('footer.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
