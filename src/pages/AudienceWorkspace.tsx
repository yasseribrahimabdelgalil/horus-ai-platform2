import { useState, useCallback } from 'react';
import { 
  Upload, FileSpreadsheet, Link2, ArrowRight, ArrowLeft, 
  CheckCircle2, AlertCircle, Sparkles, BarChart3, FileText, 
  MessageSquare, Trash2, RefreshCw, Download, ChevronDown, ChevronUp,
  Building2, User, ShoppingCart, PenSquare, Loader2, X, Plus,
  TrendingUp, Target, Package, DollarSign, Users, Eye, ThumbsUp, MessageCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

// =============================================================================
// TYPES
// =============================================================================

type AudienceType = 'companies' | 'individuals' | 'bloggers' | 'sellers';
type WorkflowStage = 'input' | 'cleaning' | 'analysis' | 'results' | 'chat';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'ready' | 'processing' | 'error';
  progress?: number;
  data?: unknown[];
}

interface CleaningResult {
  duplicatesRemoved: number;
  missingValuesHandled: number;
  columnsAdded: string[];
  columnsMerged: string[];
  columnsNormalized: string[];
  rowsFixed: number;
  rowsRemoved: number;
  formattingFixes: string[];
  totalIssuesFound: number;
  totalIssuesFixed: number;
}

interface AnalysisResult {
  summary: {
    totalRecords: number;
    columns: number;
    dateRange?: string;
  };
  insights: string[];
  recommendations: string[];
  kpis: Array<{
    label: { ar: string; en: string };
    value: string;
    change?: number;
    icon: typeof TrendingUp;
  }>;
  charts: Array<{
    id: string;
    type: 'bar' | 'line' | 'pie' | 'donut';
    title: { ar: string; en: string };
    data: unknown[];
  }>;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AudienceWorkspaceProps {
  type: AudienceType;
  onNavigate: (page: string) => void;
}

// =============================================================================
// CONFIG
// =============================================================================

const audienceConfig: Record<AudienceType, {
  icon: typeof Building2;
  gradient: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  dataTypes: { ar: string; en: string }[];
  sampleInsights: string[];
  connectors: Array<{
    id: string;
    name: { ar: string; en: string };
    icon: string;
    available: boolean;
  }>;
}> = {
  companies: {
    icon: Building2,
    gradient: 'from-blue-600 to-blue-800',
    title: { ar: 'مساحة عمل الشركات', en: 'Companies Workspace' },
    subtitle: { ar: 'حلل بيانات شركتك واحصل على رؤى استراتيجية', en: 'Analyze your company data and get strategic insights' },
    dataTypes: [
      { ar: 'بيانات المبيعات', en: 'Sales Data' },
      { ar: 'التقارير المالية', en: 'Financial Reports' },
      { ar: 'بيانات العملاء', en: 'Customer Data' },
      { ar: 'تقارير الأداء', en: 'Performance Reports' },
    ],
    sampleInsights: [
      'Revenue increased by 23% compared to last quarter',
      'Top performing product category: Electronics',
      'Customer retention rate improved to 87%',
    ],
    connectors: [
      { id: 'google_sheets', name: { ar: 'جداول بيانات Google', en: 'Google Sheets' }, icon: '📊', available: true },
      { id: 'excel_online', name: { ar: 'Excel Online', en: 'Excel Online' }, icon: '📗', available: false },
      { id: 'salesforce', name: { ar: 'Salesforce', en: 'Salesforce' }, icon: '☁️', available: false },
    ],
  },
  individuals: {
    icon: User,
    gradient: 'from-blue-500 to-slate-700',
    title: { ar: 'مساحة العمل الشخصية', en: 'Personal Workspace' },
    subtitle: { ar: 'افهم بياناتك الشخصية بسهولة تامة', en: 'Understand your personal data with ease' },
    dataTypes: [
      { ar: 'بيانات مالية شخصية', en: 'Personal Financial Data' },
      { ar: 'تتبع النفقات', en: 'Expense Tracking' },
      { ar: 'بيانات الصحة', en: 'Health Data' },
      { ar: 'سجلات متنوعة', en: 'Various Records' },
    ],
    sampleInsights: [
      'Monthly expenses reduced by 15%',
      'Highest spending category: Food & Dining',
      'Savings goal progress: 67%',
    ],
    connectors: [
      { id: 'google_sheets', name: { ar: 'جداول بيانات Google', en: 'Google Sheets' }, icon: '📊', available: true },
      { id: 'bank_import', name: { ar: 'استيراد بنكي', en: 'Bank Import' }, icon: '🏦', available: false },
    ],
  },
  sellers: {
    icon: ShoppingCart,
    gradient: 'from-blue-600 to-slate-800',
    title: { ar: 'مساحة عمل البائعين', en: 'Sellers Workspace' },
    subtitle: { ar: 'حلل مبيعاتك وحسّن استراتيجيتك', en: 'Analyze sales and optimize your strategy' },
    dataTypes: [
      { ar: 'جدول المبيعات اليومية', en: 'Daily Sales Table' },
      { ar: 'أداء المنتجات', en: 'Product Performance' },
      { ar: 'بيانات الطلبات', en: 'Order Data' },
      { ar: 'تقارير المخزون', en: 'Inventory Reports' },
    ],
    sampleInsights: [
      'Best selling product: Wireless Headphones',
      'Average order value increased by 18%',
      'Peak sales hours: 7PM - 10PM',
    ],
    connectors: [
      { id: 'google_sheets', name: { ar: 'جداول بيانات Google', en: 'Google Sheets' }, icon: '📊', available: true },
      { id: 'shopify', name: { ar: 'Shopify', en: 'Shopify' }, icon: '🛍️', available: false },
      { id: 'woocommerce', name: { ar: 'WooCommerce', en: 'WooCommerce' }, icon: '🛒', available: false },
      { id: 'salla', name: { ar: 'سلة', en: 'Salla' }, icon: '🏪', available: false },
      { id: 'amazon', name: { ar: 'Amazon Seller', en: 'Amazon Seller' }, icon: '📦', available: false },
    ],
  },
  bloggers: {
    icon: PenSquare,
    gradient: 'from-blue-500 to-blue-700',
    title: { ar: 'مساحة عمل صناع المحتوى', en: 'Content Creators Workspace' },
    subtitle: { ar: 'حلل أداء محتواك وافهم جمهورك', en: 'Analyze content performance and understand your audience' },
    dataTypes: [
      { ar: 'إحصائيات القناة', en: 'Channel Statistics' },
      { ar: 'أداء الفيديوهات', en: 'Video Performance' },
      { ar: 'تحليل المنشورات', en: 'Post Analysis' },
      { ar: 'بيانات الجمهور', en: 'Audience Data' },
    ],
    sampleInsights: [
      'Engagement rate increased by 34%',
      'Best performing content type: Tutorials',
      'Optimal posting time: 6PM on weekdays',
    ],
    connectors: [
      { id: 'google_sheets', name: { ar: 'جداول بيانات Google', en: 'Google Sheets' }, icon: '📊', available: true },
      { id: 'youtube', name: { ar: 'YouTube Analytics', en: 'YouTube Analytics' }, icon: '📺', available: false },
      { id: 'instagram', name: { ar: 'Instagram Insights', en: 'Instagram Insights' }, icon: '📸', available: false },
      { id: 'tiktok', name: { ar: 'TikTok Analytics', en: 'TikTok Analytics' }, icon: '🎵', available: false },
    ],
  },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AudienceWorkspace({ type, onNavigate }: AudienceWorkspaceProps) {
  const { lang, isRTL } = useLanguage();
  const { user } = useAuth();
  const config = audienceConfig[type];
  const Icon = config.icon;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // State
  const [stage, setStage] = useState<WorkflowStage>('input');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [cleaningResult, setCleaningResult] = useState<CleaningResult | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [showCleaningDetails, setShowCleaningDetails] = useState(true);
  const [connectorModalOpen, setConnectorModalOpen] = useState(false);

  // ==========================================================================
  // FILE HANDLING
  // ==========================================================================

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: 'ready', progress: 100 } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress } : f
            )
          );
        }
      }, 200);
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // ==========================================================================
  // DATA CLEANING
  // ==========================================================================

  const runDataCleaning = useCallback(async () => {
    setIsProcessing(true);
    
    // Simulate cleaning process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock cleaning result
    const result: CleaningResult = {
      duplicatesRemoved: Math.floor(Math.random() * 50) + 5,
      missingValuesHandled: Math.floor(Math.random() * 100) + 20,
      columnsAdded: ['calculated_total', 'date_formatted'],
      columnsMerged: ['first_name + last_name → full_name'],
      columnsNormalized: ['email', 'phone', 'date'],
      rowsFixed: Math.floor(Math.random() * 30) + 10,
      rowsRemoved: Math.floor(Math.random() * 10) + 2,
      formattingFixes: [
        isRTL ? 'تنسيق التواريخ إلى ISO' : 'Dates formatted to ISO',
        isRTL ? 'توحيد صيغة الأرقام' : 'Numbers standardized',
        isRTL ? 'إزالة المسافات الزائدة' : 'Extra whitespace removed',
      ],
      totalIssuesFound: 0,
      totalIssuesFixed: 0,
    };
    result.totalIssuesFound = result.duplicatesRemoved + result.missingValuesHandled + result.rowsFixed + result.rowsRemoved;
    result.totalIssuesFixed = result.totalIssuesFound;
    
    setCleaningResult(result);
    setStage('cleaning');
    setIsProcessing(false);
  }, [isRTL]);

  // ==========================================================================
  // DATA ANALYSIS
  // ==========================================================================

  const runAnalysis = useCallback(async () => {
    setIsProcessing(true);
    
    // Simulate analysis process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Mock analysis result based on audience type
    const kpiConfigs: Record<AudienceType, AnalysisResult['kpis']> = {
      companies: [
        { label: { ar: 'إجمالي الإيرادات', en: 'Total Revenue' }, value: '$1.2M', change: 23, icon: DollarSign },
        { label: { ar: 'عدد العملاء', en: 'Total Customers' }, value: '2,847', change: 12, icon: Users },
        { label: { ar: 'متوسط قيمة الطلب', en: 'Avg Order Value' }, value: '$458', change: 8, icon: Target },
        { label: { ar: 'معدل النمو', en: 'Growth Rate' }, value: '18%', change: 5, icon: TrendingUp },
      ],
      individuals: [
        { label: { ar: 'إجمالي النفقات', en: 'Total Expenses' }, value: '$3,240', change: -15, icon: DollarSign },
        { label: { ar: 'المدخرات', en: 'Savings' }, value: '$1,450', change: 22, icon: Target },
        { label: { ar: 'عدد المعاملات', en: 'Transactions' }, value: '127', change: 3, icon: TrendingUp },
        { label: { ar: 'أكبر فئة إنفاق', en: 'Top Category' }, value: isRTL ? 'طعام' : 'Food', icon: Package },
      ],
      sellers: [
        { label: { ar: 'إجمالي المبيعات', en: 'Total Sales' }, value: '$45,820', change: 28, icon: DollarSign },
        { label: { ar: 'عدد الطلبات', en: 'Total Orders' }, value: '1,234', change: 15, icon: Package },
        { label: { ar: 'متوسط قيمة الطلب', en: 'Avg Order Value' }, value: '$37', change: 11, icon: Target },
        { label: { ar: 'المنتج الأكثر مبيعاً', en: 'Best Seller' }, value: 'SKU-001', icon: TrendingUp },
      ],
      bloggers: [
        { label: { ar: 'إجمالي المشاهدات', en: 'Total Views' }, value: '125K', change: 34, icon: Eye },
        { label: { ar: 'معدل التفاعل', en: 'Engagement Rate' }, value: '8.4%', change: 12, icon: ThumbsUp },
        { label: { ar: 'المتابعون الجدد', en: 'New Followers' }, value: '+2,340', change: 18, icon: Users },
        { label: { ar: 'التعليقات', en: 'Comments' }, value: '890', change: 25, icon: MessageCircle },
      ],
    };

    const result: AnalysisResult = {
      summary: {
        totalRecords: Math.floor(Math.random() * 5000) + 1000,
        columns: Math.floor(Math.random() * 15) + 8,
        dateRange: 'Jan 2024 - Dec 2024',
      },
      insights: config.sampleInsights.map((insight) => 
        isRTL ? insight : insight
      ),
      recommendations: [
        isRTL ? 'ركز على تحسين معدل التحويل في الفترة المسائية' : 'Focus on improving conversion rate during evening hours',
        isRTL ? 'استثمر أكثر في الفئات الأكثر ربحية' : 'Invest more in the most profitable categories',
        isRTL ? 'راجع استراتيجية التسعير للمنتجات منخفضة الأداء' : 'Review pricing strategy for underperforming products',
      ],
      kpis: kpiConfigs[type],
      charts: [
        { id: '1', type: 'bar', title: { ar: 'الأداء الشهري', en: 'Monthly Performance' }, data: [] },
        { id: '2', type: 'pie', title: { ar: 'التوزيع حسب الفئة', en: 'Distribution by Category' }, data: [] },
        { id: '3', type: 'line', title: { ar: 'الاتجاه العام', en: 'Overall Trend' }, data: [] },
      ],
    };
    
    setAnalysisResult(result);
    setStage('results');
    setIsProcessing(false);
  }, [type, config.sampleInsights, isRTL]);

  // ==========================================================================
  // AI CHAT
  // ==========================================================================

  const sendChatMessage = useCallback(async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: chatInput,
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsProcessing(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: isRTL 
        ? `بناءً على تحليل بياناتك، يمكنني أن أخبرك أن ${config.sampleInsights[0]}. هل تريد معرفة المزيد عن جانب معين؟`
        : `Based on your data analysis, I can tell you that ${config.sampleInsights[0]}. Would you like to know more about a specific aspect?`,
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, aiResponse]);
    setIsProcessing(false);
  }, [chatInput, config.sampleInsights, isRTL]);

  // ==========================================================================
  // RENDER HELPERS
  // ==========================================================================

  const renderProgressBar = () => {
    const stages: WorkflowStage[] = ['input', 'cleaning', 'analysis', 'results', 'chat'];
    const currentIndex = stages.indexOf(stage);

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i <= currentIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {i + 1}
            </div>
            {i < stages.length - 1 && (
              <div
                className={`w-12 h-1 mx-1 transition-all ${
                  i < currentIndex ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const hasReadyFiles = files.some((f) => f.status === 'ready');

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${config.gradient} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {lang === 'ar' ? config.title.ar : config.title.en}
              </h1>
              <p className="text-white/80 text-sm">
                {lang === 'ar' ? config.subtitle.ar : config.subtitle.en}
              </p>
            </div>
            {user && (
              <div className="ms-auto text-sm text-white/70">
                {isRTL ? `مرحباً، ${user.name}` : `Welcome, ${user.name}`}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Stage: Data Input */}
        {stage === 'input' && (
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                {isRTL ? 'رفع البيانات' : 'Upload Data'}
              </h2>

              {/* Upload Area */}
              <label className="block border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls,.json"
                  multiple
                  onChange={handleFileUpload}
                />
                <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-700 font-medium">
                  {isRTL ? 'اسحب الملفات هنا أو انقر للاختيار' : 'Drag files here or click to browse'}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {isRTL ? 'CSV, Excel, JSON (حتى 50MB)' : 'CSV, Excel, JSON (up to 50MB)'}
                </p>
              </label>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      {file.status === 'uploading' && file.progress !== undefined && (
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                      {file.status === 'ready' && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Expected Data Types */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600 mb-2">
                  {isRTL ? 'أنواع البيانات المدعومة:' : 'Supported data types:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {config.dataTypes.map((dt, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {lang === 'ar' ? dt.ar : dt.en}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connectors Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-blue-600" />
                {isRTL ? 'ربط مصدر بيانات' : 'Connect Data Source'}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {config.connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => connector.available && setConnectorModalOpen(true)}
                    disabled={!connector.available}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      connector.available
                        ? 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                        : 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-2xl block mb-2">{connector.icon}</span>
                    <p className="text-sm font-medium text-slate-700">
                      {lang === 'ar' ? connector.name.ar : connector.name.en}
                    </p>
                    {!connector.available && (
                      <span className="text-xs text-slate-400 mt-1 block">
                        {isRTL ? 'قريباً' : 'Coming Soon'}
                      </span>
                    )}
                  </button>
                ))}
                <button
                  className="p-4 rounded-xl border border-dashed border-slate-300 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                >
                  <Plus className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">
                    {isRTL ? 'طلب موصل جديد' : 'Request Connector'}
                  </p>
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <Button
                size="lg"
                disabled={!hasReadyFiles || isProcessing}
                onClick={runDataCleaning}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isRTL ? 'جارٍ المعالجة...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    {isRTL ? 'تنظيف البيانات' : 'Clean Data'}
                    <ArrowIcon className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Stage: Cleaning Results */}
        {stage === 'cleaning' && cleaningResult && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  {isRTL ? 'تقرير تنظيف البيانات' : 'Data Cleaning Report'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCleaningDetails(!showCleaningDetails)}
                >
                  {showCleaningDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-700">{cleaningResult.totalIssuesFixed}</p>
                  <p className="text-sm text-green-600">
                    {isRTL ? 'مشكلة تم إصلاحها' : 'Issues Fixed'}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-700">{cleaningResult.duplicatesRemoved}</p>
                  <p className="text-sm text-blue-600">
                    {isRTL ? 'تكرارات محذوفة' : 'Duplicates Removed'}
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-amber-700">{cleaningResult.missingValuesHandled}</p>
                  <p className="text-sm text-amber-600">
                    {isRTL ? 'قيم ناقصة معالجة' : 'Missing Values Handled'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-slate-700">{cleaningResult.rowsFixed}</p>
                  <p className="text-sm text-slate-600">
                    {isRTL ? 'صفوف مُصحَّحة' : 'Rows Fixed'}
                  </p>
                </div>
              </div>

              {/* Detailed Results */}
              {showCleaningDetails && (
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  {cleaningResult.columnsAdded.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Plus className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {isRTL ? 'أعمدة مُضافة:' : 'Columns Added:'}
                        </p>
                        <p className="text-sm text-slate-500">{cleaningResult.columnsAdded.join(', ')}</p>
                      </div>
                    </div>
                  )}
                  {cleaningResult.columnsMerged.length > 0 && (
                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {isRTL ? 'أعمدة مدمجة:' : 'Columns Merged:'}
                        </p>
                        <p className="text-sm text-slate-500">{cleaningResult.columnsMerged.join(', ')}</p>
                      </div>
                    </div>
                  )}
                  {cleaningResult.columnsNormalized.length > 0 && (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {isRTL ? 'أعمدة موحدة:' : 'Columns Normalized:'}
                        </p>
                        <p className="text-sm text-slate-500">{cleaningResult.columnsNormalized.join(', ')}</p>
                      </div>
                    </div>
                  )}
                  {cleaningResult.formattingFixes.length > 0 && (
                    <div className="flex items-start gap-3">
                      <FileSpreadsheet className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {isRTL ? 'إصلاحات التنسيق:' : 'Formatting Fixes:'}
                        </p>
                        <ul className="text-sm text-slate-500 list-disc list-inside">
                          {cleaningResult.formattingFixes.map((fix, i) => (
                            <li key={i}>{fix}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {cleaningResult.rowsRemoved > 0 && (
                    <div className="flex items-start gap-3">
                      <Trash2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {isRTL ? 'صفوف محذوفة:' : 'Rows Removed:'}
                        </p>
                        <p className="text-sm text-slate-500">{cleaningResult.rowsRemoved}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStage('input')}>
                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
              <Button size="lg" disabled={isProcessing} onClick={runAnalysis}>
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isRTL ? 'جارٍ التحليل...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {isRTL ? 'تحليل البيانات' : 'Analyze Data'}
                    <ArrowIcon className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Stage: Analysis Results (Dashboard + Report) */}
        {stage === 'results' && analysisResult && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                {isRTL ? 'ملخص التحليل' : 'Analysis Summary'}
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">{analysisResult.summary.totalRecords.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">{isRTL ? 'إجمالي السجلات' : 'Total Records'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">{analysisResult.summary.columns}</p>
                  <p className="text-sm text-slate-500">{isRTL ? 'الأعمدة' : 'Columns'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">{analysisResult.summary.dateRange}</p>
                  <p className="text-sm text-slate-500">{isRTL ? 'نطاق التاريخ' : 'Date Range'}</p>
                </div>
              </div>
            </div>

            {/* KPIs Dashboard */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                {isRTL ? 'لوحة المؤشرات' : 'KPI Dashboard'}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {analysisResult.kpis.map((kpi, i) => {
                  const KpiIcon = kpi.icon;
                  return (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <KpiIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        {kpi.change !== undefined && (
                          <span className={`text-xs font-medium ${kpi.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                          </span>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                      <p className="text-sm text-slate-500">
                        {lang === 'ar' ? kpi.label.ar : kpi.label.en}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analysisResult.charts.map((chart) => (
                <div key={chart.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900 mb-4">
                    {lang === 'ar' ? chart.title.ar : chart.title.en}
                  </h3>
                  <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-slate-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Insights & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  {isRTL ? 'الرؤى الرئيسية' : 'Key Insights'}
                </h2>
                <ul className="space-y-3">
                  {analysisResult.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  {isRTL ? 'التوصيات' : 'Recommendations'}
                </h2>
                <ul className="space-y-3">
                  {analysisResult.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {isRTL ? 'تصدير التقرير' : 'Export Report'}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4" />
                  PowerPoint
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4" />
                  {isRTL ? 'طباعة' : 'Print'}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStage('cleaning')}>
                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
              <Button size="lg" onClick={() => setStage('chat')}>
                <MessageSquare className="w-4 h-4" />
                {isRTL ? 'الدردشة مع AI' : 'Chat with AI'}
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Stage: AI Chat */}
        {stage === 'chat' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <h2 className="font-semibold">
                  {isRTL ? 'مساعد HORUS AI' : 'HORUS AI Assistant'}
                </h2>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {isRTL ? 'سياق البيانات محمّل' : 'Data context loaded'}
                </span>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">
                      {isRTL 
                        ? 'اسأل أي سؤال عن بياناتك وسأساعدك في فهمها'
                        : 'Ask any question about your data and I\'ll help you understand it'}
                    </p>
                  </div>
                )}
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder={isRTL ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button onClick={sendChatMessage} disabled={!chatInput.trim() || isProcessing}>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Back to Results */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStage('results')}>
                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {isRTL ? 'العودة للنتائج' : 'Back to Results'}
              </Button>
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                {isRTL ? 'الذهاب للوحة التحكم الكاملة' : 'Go to Full Dashboard'}
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Connector Modal Placeholder */}
        {connectorModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                {isRTL ? 'ربط Google Sheets' : 'Connect Google Sheets'}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {isRTL 
                  ? 'سيتم توجيهك لتسجيل الدخول باستخدام حساب Google الخاص بك'
                  : 'You will be redirected to sign in with your Google account'}
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setConnectorModalOpen(false)}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button onClick={() => setConnectorModalOpen(false)}>
                  {isRTL ? 'متابعة' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
