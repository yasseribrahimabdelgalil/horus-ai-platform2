import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';

interface CTASectionProps {
  onNavigate: (page: string) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 end-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 start-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div
              className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
            />
          </div>

          <div className="relative px-8 sm:px-16 py-20 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {t('cta.title')}
              </h2>
              <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed font-medium">
                {t('cta.subtitle')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-700 border-0 shadow-lg hover:shadow-xl"
                onClick={() => onNavigate('register')}
              >
                {t('cta.button')}
                <ArrowIcon className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 shadow-none"
                onClick={() => onNavigate('contact')}
              >
                <MessageCircle className="w-4 h-4" />
                {t('cta.button2')}
              </Button>
            </div>

            {/* Trust line */}
            <p className="text-blue-150 text-sm font-medium">
              {isRTL ? 'لا حاجة لبطاقة ائتمان • ابدأ مجاناً • لا خبرة تقنية مطلوبة' : 'No credit card required • Start free • No technical expertise needed'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
