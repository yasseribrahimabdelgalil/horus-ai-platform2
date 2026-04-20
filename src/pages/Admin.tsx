import { Zap, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

interface AdminProps {
  onNavigate: (page: string) => void;
}

export function Admin({ onNavigate }: AdminProps) {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-2xl font-black text-white">HORUS AI</span>
        </button>

        {/* Lock Icon */}
        <div className="w-20 h-20 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
          <Lock className="w-10 h-10 text-slate-400" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-2xl font-black text-white">
            {isRTL ? 'Admin Studio' : 'Admin Studio'}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            {isRTL 
              ? 'لوحة تحكم الإدارة قيد التطوير. ستكون متاحة في المرحلة القادمة.'
              : 'Admin dashboard is under development. It will be available in the next phase.'
            }
          </p>
        </div>

        {/* CTA */}
        <Button onClick={() => onNavigate('dashboard')} className="shadow-lg shadow-blue-500/30">
          {isRTL ? 'العودة إلى لوحة التحكم' : 'Back to Dashboard'}
        </Button>
      </div>
    </div>
  );
}
