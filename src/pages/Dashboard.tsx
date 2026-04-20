import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Filter,
  Calendar,
  Download,
  RefreshCw,
  ChevronDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Bell,
  Search,
  Menu,
  X,
  Home,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

// Sidebar Component
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
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 bg-slate-900 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-slate-800">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg font-black text-white">HORUS AI</span>
            </button>
          </div>

          {/* Navigation */}
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

          {/* User section */}
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

// KPI Card Component
function KPICard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  trend,
  color 
}: { 
  icon: typeof TrendingUp;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}) {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-black text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// Chart placeholder component
function ChartArea({ title, icon: Icon, children }: { title: string; icon: typeof BarChart3; children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  );
}

// Data table component
function DataTable({ isRTL }: { isRTL: boolean }) {
  const headers = isRTL 
    ? ['المنتج', 'المبيعات', 'الإيرادات', 'النمو']
    : ['Product', 'Sales', 'Revenue', 'Growth'];
  
  const data = [
    { product: isRTL ? 'المنتج أ' : 'Product A', sales: '1,234', revenue: '$12,340', growth: '+12%', positive: true },
    { product: isRTL ? 'المنتج ب' : 'Product B', sales: '856', revenue: '$8,560', growth: '+8%', positive: true },
    { product: isRTL ? 'المنتج ج' : 'Product C', sales: '654', revenue: '$6,540', growth: '-3%', positive: false },
    { product: isRTL ? 'المنتج د' : 'Product D', sales: '432', revenue: '$4,320', growth: '+15%', positive: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">{isRTL ? 'أداء المنتجات' : 'Product Performance'}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-5 py-3 text-start text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">{row.product}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{row.sales}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{row.revenue}</td>
                <td className="px-5 py-4">
                  <span className={`text-sm font-semibold ${row.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {row.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Insights panel
function InsightsPanel({ isRTL }: { isRTL: boolean }) {
  const insights = isRTL ? [
    { type: 'success', text: 'المبيعات زادت بنسبة 23% مقارنة بالشهر الماضي' },
    { type: 'warning', text: 'انخفاض في المخزون لـ 3 منتجات رئيسية' },
    { type: 'info', text: 'ذروة المبيعات المتوقعة في الأسبوع القادم' },
  ] : [
    { type: 'success', text: 'Sales increased by 23% compared to last month' },
    { type: 'warning', text: 'Low inventory for 3 key products' },
    { type: 'info', text: 'Peak sales expected next week' },
  ];

  const iconMap = {
    success: CheckCircle2,
    warning: AlertCircle,
    info: Activity,
  };

  const colorMap = {
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-4">{isRTL ? 'رؤى ذكية' : 'Smart Insights'}</h3>
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.type as keyof typeof iconMap];
          const colors = colorMap[insight.type as keyof typeof colorMap];
          return (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${colors}`}>
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{insight.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Loading state
function LoadingState({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="mt-4 text-slate-500">{isRTL ? 'جاري تحميل البيانات...' : 'Loading data...'}</p>
    </div>
  );
}

// Empty state
function EmptyState({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <BarChart3 className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{isRTL ? 'لا توجد بيانات' : 'No Data Yet'}</h3>
      <p className="text-sm text-slate-500 max-w-xs">{isRTL ? 'قم برفع ملف بيانات لبدء التحليل' : 'Upload a data file to start analysis'}</p>
    </div>
  );
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { isRTL } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading] = useState(false);
  const [hasData] = useState(true);

  const kpis = [
    { icon: DollarSign, label: isRTL ? 'إجمالي الإيرادات' : 'Total Revenue', value: isRTL ? '٢.٤ مليون' : '$2.4M', change: '+12.5%', trend: 'up' as const, color: 'bg-blue-100 text-blue-600' },
    { icon: Users, label: isRTL ? 'العملاء' : 'Customers', value: isRTL ? '١٨,٤٣٢' : '18,432', change: '+8.2%', trend: 'up' as const, color: 'bg-emerald-100 text-emerald-600' },
    { icon: ShoppingCart, label: isRTL ? 'الطلبات' : 'Orders', value: isRTL ? '٣,٢١٨' : '3,218', change: '+15.3%', trend: 'up' as const, color: 'bg-amber-100 text-amber-600' },
    { icon: Activity, label: isRTL ? 'معدل التحويل' : 'Conversion Rate', value: '3.7%', change: '-2.1%', trend: 'down' as const, color: 'bg-rose-100 text-rose-600' },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? 'lg:pr-64' : 'lg:pl-64'}`}>
      <Sidebar 
        onNavigate={onNavigate} 
        currentPage="dashboard" 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
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
              <h1 className="text-lg font-bold text-slate-900">{isRTL ? 'لوحة التحكم' : 'Dashboard'}</h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">{isRTL ? 'بحث' : 'Search'}</span>
              </button>
              <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 lg:p-8">
          {isLoading ? (
            <LoadingState isRTL={isRTL} />
          ) : !hasData ? (
            <EmptyState isRTL={isRTL} />
          ) : (
            <div className="space-y-6">
              {/* Filters / Slicers */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-300 transition-colors">
                  <Calendar className="w-4 h-4" />
                  {isRTL ? 'آخر 30 يوم' : 'Last 30 days'}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-300 transition-colors">
                  <Filter className="w-4 h-4" />
                  {isRTL ? 'تصفية' : 'Filter'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-300 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  {isRTL ? 'تحديث' : 'Refresh'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors ms-auto">
                  <Download className="w-4 h-4" />
                  {isRTL ? 'تصدير' : 'Export'}
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, i) => (
                  <KPICard key={i} {...kpi} />
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartArea title={isRTL ? 'اتجاه الإيرادات' : 'Revenue Trend'} icon={BarChart3}>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                    {/* Placeholder chart */}
                    <svg viewBox="0 0 300 150" className="w-full h-full p-4">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,120 L40,100 L80,110 L120,70 L160,80 L200,40 L240,50 L280,20 L300,30 L300,150 L0,150 Z" 
                        fill="url(#chartGradient)" 
                      />
                      <path 
                        d="M0,120 L40,100 L80,110 L120,70 L160,80 L200,40 L240,50 L280,20 L300,30" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                      />
                      <circle cx="200" cy="40" r="4" fill="#3b82f6" />
                    </svg>
                  </div>
                </ChartArea>

                <ChartArea title={isRTL ? 'توزيع المبيعات' : 'Sales Distribution'} icon={PieChart}>
                  <div className="h-64 flex items-center justify-center">
                    {/* Placeholder pie chart */}
                    <svg viewBox="0 0 150 150" className="w-40 h-40">
                      <circle cx="75" cy="75" r="60" fill="none" stroke="#e2e8f0" strokeWidth="20" />
                      <circle 
                        cx="75" cy="75" r="60" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="20" 
                        strokeDasharray="188.5 377"
                        strokeLinecap="round"
                        transform="rotate(-90 75 75)"
                      />
                      <circle 
                        cx="75" cy="75" r="60" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="20" 
                        strokeDasharray="94.25 377"
                        strokeDashoffset="-188.5"
                        strokeLinecap="round"
                        transform="rotate(-90 75 75)"
                      />
                      <circle 
                        cx="75" cy="75" r="60" 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="20" 
                        strokeDasharray="75.4 377"
                        strokeDashoffset="-282.75"
                        strokeLinecap="round"
                        transform="rotate(-90 75 75)"
                      />
                    </svg>
                    <div className="ms-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-slate-600">{isRTL ? 'الرياض' : 'Riyadh'} (50%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm text-slate-600">{isRTL ? 'جدة' : 'Jeddah'} (25%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="text-sm text-slate-600">{isRTL ? 'الدمام' : 'Dammam'} (20%)</span>
                      </div>
                    </div>
                  </div>
                </ChartArea>
              </div>

              {/* Data Table and Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DataTable isRTL={isRTL} />
                </div>
                <div>
                  <InsightsPanel isRTL={isRTL} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
