import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Download,
  Printer,
  Share2,
  Calendar,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Zap,
  Bell,
  Menu,
  Loader2,
  FileSpreadsheet,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ReportsProps {
  onNavigate: (page: string) => void;
}

// Sidebar Component (shared with Dashboard)
function Sidebar({ onNavigate, currentPage, isOpen, onClose }: { 
  onNavigate: (page: string) => void; 
  currentPage: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isRTL } = useLanguage();
  
  const menuItems = [
    { icon: LayoutDashboard, label: isRTL ? 'لوحة التحكم' : 'Dashboard', page: 'dashboard' },
    { icon: FileText, label: isRTL ? 'التقارير' : 'Reports', page: 'reports' },
    { icon: MessageSquare, label: isRTL ? 'مساعد AI' : 'AI Chat', page: 'ai-chat' },
    { icon: Settings, label: isRTL ? 'الإعدادات' : 'Settings', page: 'settings' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 bg-slate-900 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-slate-800">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg font-black text-white">HORUS AI</span>
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {isRTL ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// Executive Summary Card
function ExecutiveSummary({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold mb-1">{isRTL ? 'الملخص التنفيذي' : 'Executive Summary'}</h2>
          <p className="text-sm text-blue-200">{isRTL ? 'أبريل 2026' : 'April 2026'}</p>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <Target className="w-5 h-5" />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-blue-100 mb-4">
        {isRTL 
          ? 'شهد الأداء العام تحسناً ملحوظاً بنسبة 23% مقارنة بالفترة السابقة. تم تحقيق أهداف المبيعات بنسبة 112% مع نمو قاعدة العملاء بـ 18%.'
          : 'Overall performance improved by 23% compared to the previous period. Sales targets were achieved at 112% with customer base growth of 18%.'
        }
      </p>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-black">{isRTL ? '٢.٤م' : '2.4M'}</p>
          <p className="text-xs text-blue-200">{isRTL ? 'الإيرادات' : 'Revenue'}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-black">112%</p>
          <p className="text-xs text-blue-200">{isRTL ? 'الأهداف' : 'Target'}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-black">+18%</p>
          <p className="text-xs text-blue-200">{isRTL ? 'النمو' : 'Growth'}</p>
        </div>
      </div>
    </div>
  );
}

// Key Metrics Section
function KeyMetrics({ isRTL }: { isRTL: boolean }) {
  const metrics = [
    { 
      label: isRTL ? 'إجمالي المبيعات' : 'Total Sales', 
      value: isRTL ? '٣,٢١٨' : '3,218', 
      change: '+15.3%', 
      trend: 'up' as const,
      icon: BarChart3 
    },
    { 
      label: isRTL ? 'متوسط قيمة الطلب' : 'Avg Order Value', 
      value: isRTL ? '٧٤٥ ر.س' : 'SAR 745', 
      change: '+8.2%', 
      trend: 'up' as const,
      icon: Target 
    },
    { 
      label: isRTL ? 'معدل الإرجاع' : 'Return Rate', 
      value: '2.3%', 
      change: '-0.5%', 
      trend: 'up' as const,
      icon: TrendingDown 
    },
    { 
      label: isRTL ? 'رضا العملاء' : 'Customer Satisfaction', 
      value: '4.8/5', 
      change: '+0.3', 
      trend: 'up' as const,
      icon: CheckCircle2 
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <h3 className="font-bold text-slate-900 mb-4">{isRTL ? 'المؤشرات الرئيسية' : 'Key Metrics'}</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">{metric.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-black text-slate-900">{metric.value}</span>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Key Insights Section
function KeyInsights({ isRTL }: { isRTL: boolean }) {
  const insights = isRTL ? [
    { type: 'success', title: 'نقطة قوة', text: 'نمو مستمر في قطاع الشركات بنسبة 28%' },
    { type: 'warning', title: 'يحتاج انتباه', text: 'انخفاض في مبيعات المنتج C بنسبة 12%' },
    { type: 'success', title: 'إنجاز', text: 'تم تحقيق هدف الإيرادات الشهري قبل الموعد' },
  ] : [
    { type: 'success', title: 'Strength', text: 'Continuous growth in enterprise segment at 28%' },
    { type: 'warning', title: 'Needs Attention', text: 'Decline in Product C sales by 12%' },
    { type: 'success', title: 'Achievement', text: 'Monthly revenue target achieved ahead of schedule' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="font-bold text-slate-900">{isRTL ? 'رؤى رئيسية' : 'Key Insights'}</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-xl border ${
              insight.type === 'success' 
                ? 'bg-emerald-50 border-emerald-100' 
                : 'bg-amber-50 border-amber-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {insight.type === 'success' 
                ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                : <AlertTriangle className="w-4 h-4 text-amber-600" />
              }
              <span className={`text-xs font-semibold ${
                insight.type === 'success' ? 'text-emerald-700' : 'text-amber-700'
              }`}>{insight.title}</span>
            </div>
            <p className="text-sm text-slate-700">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Recommendations Section
function Recommendations({ isRTL }: { isRTL: boolean }) {
  const recommendations = isRTL ? [
    { priority: 'high', title: 'زيادة ميزانية التسويق الرقمي', desc: 'بناءً على ROI العالي من الحملات السابقة' },
    { priority: 'medium', title: 'إعادة تقييم تسعير المنتج C', desc: 'لمعالجة انخفاض المبيعات' },
    { priority: 'low', title: 'توسيع فريق خدمة العملاء', desc: 'للحفاظ على مستوى الرضا العالي' },
  ] : [
    { priority: 'high', title: 'Increase digital marketing budget', desc: 'Based on high ROI from previous campaigns' },
    { priority: 'medium', title: 'Re-evaluate Product C pricing', desc: 'To address sales decline' },
    { priority: 'low', title: 'Expand customer service team', desc: 'To maintain high satisfaction levels' },
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const priorityLabels = {
    high: isRTL ? 'عالي' : 'High',
    medium: isRTL ? 'متوسط' : 'Medium',
    low: isRTL ? 'منخفض' : 'Low',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <h3 className="font-bold text-slate-900 mb-4">{isRTL ? 'التوصيات' : 'Recommendations'}</h3>
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl">
            <div className="flex items-start gap-3">
              <span className={`px-2 py-1 text-xs font-semibold rounded-lg border ${priorityColors[rec.priority as keyof typeof priorityColors]}`}>
                {priorityLabels[rec.priority as keyof typeof priorityLabels]}
              </span>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{rec.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{rec.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading state
function LoadingState({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="mt-4 text-slate-500">{isRTL ? 'جاري تحميل التقرير...' : 'Loading report...'}</p>
    </div>
  );
}

// Empty state
function EmptyState({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <FileSpreadsheet className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{isRTL ? 'لا توجد تقارير' : 'No Reports Yet'}</h3>
      <p className="text-sm text-slate-500 max-w-xs">{isRTL ? 'قم بتحليل البيانات أولاً لإنشاء التقارير' : 'Analyze data first to generate reports'}</p>
    </div>
  );
}

export function Reports({ onNavigate }: ReportsProps) {
  const { isRTL } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading] = useState(false);
  const [hasData] = useState(true);

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? 'lg:pr-64' : 'lg:pl-64'}`}>
      <Sidebar 
        onNavigate={onNavigate} 
        currentPage="reports" 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold text-slate-900">{isRTL ? 'التقارير' : 'Reports'}</h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Report content */}
        <main className="p-4 lg:p-8">
          {isLoading ? (
            <LoadingState isRTL={isRTL} />
          ) : !hasData ? (
            <EmptyState isRTL={isRTL} />
          ) : (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Report Header */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">{isRTL ? 'تقرير الأداء الشهري' : 'Monthly Performance Report'}</h2>
                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {isRTL ? 'أبريل 2026' : 'April 2026'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {isRTL ? 'آخر تحديث: اليوم' : 'Last updated: Today'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                      {isRTL ? 'مشاركة' : 'Share'}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                      <Printer className="w-4 h-4" />
                      {isRTL ? 'طباعة' : 'Print'}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <ExecutiveSummary isRTL={isRTL} />

              {/* Key Metrics + Insights Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <KeyMetrics isRTL={isRTL} />
                <KeyInsights isRTL={isRTL} />
              </div>

              {/* Recommendations */}
              <Recommendations isRTL={isRTL} />

              {/* Report Footer */}
              <div className="bg-slate-100 rounded-2xl p-6 text-center">
                <p className="text-sm text-slate-500">
                  {isRTL 
                    ? 'تم إنشاء هذا التقرير بواسطة HORUS AI — منصة تحليل البيانات الذكية'
                    : 'This report was generated by HORUS AI — Smart Data Analytics Platform'
                  }
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
