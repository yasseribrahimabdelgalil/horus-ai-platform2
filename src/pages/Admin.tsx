import { useState, useCallback, useEffect } from 'react';
import { 
  Zap, ChevronLeft, ChevronRight, Eye, EyeOff, Save, Upload, RotateCcw, 
  History, Copy, Trash2, Plus, GripVertical, Settings, Palette, Type, 
  Layout, BarChart3, FileText, MessageSquare, Navigation, 
  Image, Layers, Box, Sparkles, Monitor, Tablet, Smartphone,
  ChevronDown, ChevronUp, Check, X, RefreshCw, Clock,
  Users, Shield, CreditCard, Globe, Mail, Bell, Search,
  Star, StarOff, Download, UploadCloud, AlertTriangle, Info,
  Lock, Unlock, ExternalLink, Tag, DollarSign, FileCode,
  Megaphone, Database, Activity, Archive, Link, Hash, Briefcase,
  Building2, User, HelpCircle, BookOpen, Scale, Folder,
  PieChart, TrendingUp, Table, Grid3X3, ToggleLeft, ToggleRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  useAdmin, 
  WidgetConfig, 
  ReportBlockConfig, 
  SectionConfig,
  TeamMember,
  Role,
  FormSubmission,
  TrashItem,
  PolicyPage,
  PricingPlan,
  BlockPreset
} from '../contexts/AdminContext';

interface AdminProps {
  onNavigate: (page: string) => void;
}

type MainTab = 
  | 'overview' | 'pages' | 'dashboard' | 'reports' | 'ai-chat' 
  | 'brand' | 'content' | 'navbar-footer' | 'pricing' | 'forms'
  | 'seo' | 'media' | 'visibility' | 'team' | 'policies'
  | 'submissions' | 'redirects' | 'presets' | 'snapshots' | 'trash'
  | 'settings' | 'activity';

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function ToggleRow({ 
  label, 
  labelAr, 
  checked, 
  onChange,
  disabled = false
}: { 
  label: string; 
  labelAr: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const { isRTL } = useLanguage();
  return (
    <div className={`flex items-center justify-between py-2 px-3 bg-slate-800/50 rounded-lg ${disabled ? 'opacity-50' : ''}`}>
      <span className="text-sm text-slate-300">{isRTL ? labelAr : label}</span>
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`w-10 h-5 rounded-full transition-colors relative ${
          checked ? 'bg-blue-500' : 'bg-slate-600'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
}

function InputField({
  label,
  labelAr,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
}: {
  label: string;
  labelAr: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'color' | 'email' | 'url';
  placeholder?: string;
  disabled?: boolean;
}) {
  const { isRTL } = useLanguage();
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-slate-400 font-medium">{isRTL ? labelAr : label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-50"
      />
    </div>
  );
}

function TextareaField({
  label,
  labelAr,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  labelAr: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  const { isRTL } = useLanguage();
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-slate-400 font-medium">{isRTL ? labelAr : label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
      />
    </div>
  );
}

function SelectField({
  label,
  labelAr,
  value,
  onChange,
  options,
}: {
  label: string;
  labelAr: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; labelAr: string }[];
}) {
  const { isRTL } = useLanguage();
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-slate-400 font-medium">{isRTL ? labelAr : label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {isRTL ? opt.labelAr : opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorPicker({
  label,
  labelAr,
  value,
  onChange,
}: {
  label: string;
  labelAr: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const { isRTL } = useLanguage();
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-slate-400 font-medium">{isRTL ? labelAr : label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
    </div>
  );
}

function AccordionSection({
  title,
  titleAr,
  icon: Icon,
  children,
  defaultOpen = false,
  badge,
}: {
  title: string;
  titleAr: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { isRTL } = useLanguage();

  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-white">{isRTL ? titleAr : title}</span>
          {badge && (
            <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">{badge}</span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-3 space-y-3 bg-slate-900/50">
          {children}
        </div>
      )}
    </div>
  );
}

function DraggableItem({
  children,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
  onToggleVisibility,
  visible,
  canMoveUp,
  canMoveDown,
}: {
  children: React.ReactNode;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onToggleVisibility?: () => void;
  visible?: boolean;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}) {
  return (
    <div className={`group flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 ${
      visible === false ? 'opacity-50' : ''
    }`}>
      <div className="flex flex-col gap-0.5">
        <button
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="p-0.5 text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="p-0.5 text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      <GripVertical className="w-4 h-4 text-slate-600" />
      <div className="flex-1 min-w-0">{children}</div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onToggleVisibility && (
          <button
            onClick={onToggleVisibility}
            className="p-1 text-slate-500 hover:text-white"
            title={visible ? 'Hide' : 'Show'}
          >
            {visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        )}
        {onDuplicate && (
          <button onClick={onDuplicate} className="p-1 text-slate-500 hover:text-white" title="Duplicate">
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="p-1 text-slate-500 hover:text-red-400" title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    suspended: 'bg-red-500/20 text-red-400',
    new: 'bg-blue-500/20 text-blue-400',
    in_progress: 'bg-amber-500/20 text-amber-400',
    resolved: 'bg-green-500/20 text-green-400',
    draft: 'bg-slate-500/20 text-slate-400',
    published: 'bg-green-500/20 text-green-400',
    hidden: 'bg-slate-500/20 text-slate-400',
    maintenance: 'bg-orange-500/20 text-orange-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-slate-500/20 text-slate-400'}`}>
      {status}
    </span>
  );
}

function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  danger = false,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  danger?: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm text-white transition-colors ${
              danger 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN ADMIN COMPONENT
// ============================================================================

export function Admin({ onNavigate }: AdminProps) {
  const { isRTL } = useLanguage();
  const {
    draftConfig,
    publishedConfig,
    snapshots,
    trash,
    submissions,
    favorites,
    activityLog,
    isPreviewMode,
    previewDevice,
    hasUnsavedChanges,
    searchQuery,
    updateDraft,
    saveDraft,
    publishChanges,
    discardDraft,
    restoreComponent,
    restorePage,
    restoreDashboardLayout,
    restoreDefaults,
    restoreLastPublished,
    createSnapshot,
    duplicateSnapshot,
    revertToSnapshot,
    deleteSnapshot,
    renameSnapshot,
    moveToTrash,
    restoreFromTrash,
    permanentDelete,
    emptyTrash,
    inviteTeamMember,
    removeTeamMember,
    updateMemberRole,
    suspendMember,
    reactivateMember,
    addFavorite,
    removeFavorite,
    updateSubmissionStatus,
    setSearchQuery,
    searchResults,
    setPreviewMode,
    setPreviewDevice,
    exportConfig,
    importConfig,
    logActivity,
  } = useAdmin();

  // UI State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<MainTab>('overview');
  const [activePage, setActivePage] = useState('home');
  const [snapshotName, setSnapshotName] = useState('');
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState<string | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('editor');
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  // Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handlers
  const handlePublish = useCallback(() => {
    publishChanges();
    logActivity('publish', 'all', 'Published all changes');
    setShowPublishConfirm(false);
  }, [publishChanges, logActivity]);

  const handleCreateSnapshot = useCallback(() => {
    if (snapshotName.trim()) {
      createSnapshot(snapshotName.trim());
      logActivity('snapshot', snapshotName.trim(), 'Created snapshot');
      setSnapshotName('');
    }
  }, [createSnapshot, snapshotName, logActivity]);

  const handleRestore = useCallback((type: string) => {
    switch (type) {
      case 'navbar':
        restoreComponent('navbar');
        logActivity('restore', 'navbar', 'Restored navbar');
        break;
      case 'hero':
        restoreComponent('hero');
        logActivity('restore', 'hero', 'Restored hero');
        break;
      case 'footer':
        restoreComponent('footer');
        logActivity('restore', 'footer', 'Restored footer');
        break;
      case 'dashboard':
        restoreDashboardLayout();
        logActivity('restore', 'dashboard', 'Restored dashboard layout');
        break;
      case 'page':
        restorePage(activePage);
        logActivity('restore', activePage, 'Restored page');
        break;
      case 'defaults':
        restoreDefaults();
        logActivity('restore', 'defaults', 'Restored all defaults');
        break;
      case 'published':
        restoreLastPublished();
        logActivity('restore', 'published', 'Restored last published state');
        break;
    }
    setShowRestoreConfirm(null);
  }, [restoreComponent, restorePage, restoreDashboardLayout, restoreDefaults, restoreLastPublished, activePage, logActivity]);

  const handleExport = useCallback(() => {
    const config = exportConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `horus-admin-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logActivity('export', 'config', 'Exported configuration');
  }, [exportConfig, logActivity]);

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const result = importConfig(evt.target?.result as string);
        if (result) {
          logActivity('import', 'config', 'Imported configuration');
        }
      };
      reader.readAsText(file);
    }
  }, [importConfig, logActivity]);

  const handleInviteTeamMember = useCallback(() => {
    if (inviteEmail.trim()) {
      inviteTeamMember(inviteEmail.trim(), inviteRole);
      logActivity('invite', inviteEmail.trim(), `Invited as ${inviteRole}`);
      setInviteEmail('');
    }
  }, [inviteTeamMember, inviteEmail, inviteRole, logActivity]);

  // Sidebar Navigation
  const sidebarSections = [
    {
      title: isRTL ? 'عام' : 'General',
      items: [
        { id: 'overview', icon: Layout, label: 'Overview', labelAr: 'نظرة عامة' },
        { id: 'activity', icon: Activity, label: 'Activity', labelAr: 'النشاط', badge: activityLog.length > 0 ? `${Math.min(activityLog.length, 99)}` : undefined },
      ],
    },
    {
      title: isRTL ? 'المحتوى' : 'Content',
      items: [
        { id: 'pages', icon: FileText, label: 'Pages', labelAr: 'الصفحات' },
        { id: 'content', icon: Type, label: 'CMS', labelAr: 'إدارة المحتوى' },
        { id: 'navbar-footer', icon: Navigation, label: 'Nav & Footer', labelAr: 'القائمة والتذييل' },
        { id: 'media', icon: Image, label: 'Media', labelAr: 'الوسائط' },
      ],
    },
    {
      title: isRTL ? 'التطبيقات' : 'Apps',
      items: [
        { id: 'dashboard', icon: BarChart3, label: 'Dashboard', labelAr: 'لوحة التحكم' },
        { id: 'reports', icon: FileCode, label: 'Reports', labelAr: 'التقارير' },
        { id: 'ai-chat', icon: MessageSquare, label: 'AI Chat', labelAr: 'محادثة AI' },
      ],
    },
    {
      title: isRTL ? 'العلامة التجارية' : 'Branding',
      items: [
        { id: 'brand', icon: Palette, label: 'Brand', labelAr: 'العلامة التجارية' },
        { id: 'seo', icon: Globe, label: 'SEO', labelAr: 'تحسين محركات البحث' },
      ],
    },
    {
      title: isRTL ? 'الأعمال' : 'Business',
      items: [
        { id: 'pricing', icon: DollarSign, label: 'Pricing', labelAr: 'التسعير' },
        { id: 'forms', icon: Mail, label: 'Forms', labelAr: 'النماذج' },
        { id: 'submissions', icon: Database, label: 'Inbox', labelAr: 'البريد الوارد', badge: submissions.filter(s => s.status === 'new').length > 0 ? `${submissions.filter(s => s.status === 'new').length}` : undefined },
        { id: 'policies', icon: Scale, label: 'Policies', labelAr: 'السياسات' },
      ],
    },
    {
      title: isRTL ? 'الإدارة' : 'Admin',
      items: [
        { id: 'team', icon: Users, label: 'Team', labelAr: 'الفريق' },
        { id: 'visibility', icon: Eye, label: 'Visibility', labelAr: 'الرؤية' },
        { id: 'presets', icon: Layers, label: 'Presets', labelAr: 'القوالب' },
        { id: 'redirects', icon: Link, label: 'Redirects', labelAr: 'التوجيهات' },
      ],
    },
    {
      title: isRTL ? 'النظام' : 'System',
      items: [
        { id: 'snapshots', icon: History, label: 'Snapshots', labelAr: 'النسخ', badge: snapshots.length > 0 ? `${snapshots.length}` : undefined },
        { id: 'trash', icon: Trash2, label: 'Trash', labelAr: 'المحذوفات', badge: trash.length > 0 ? `${trash.length}` : undefined },
        { id: 'settings', icon: Settings, label: 'Settings', labelAr: 'الإعدادات' },
      ],
    },
  ];

  const pageOptions = [
    { value: 'home', label: 'Homepage', labelAr: 'الرئيسية' },
    { value: 'companies', label: 'Companies', labelAr: 'الشركات' },
    { value: 'individuals', label: 'Individuals', labelAr: 'الأفراد' },
    { value: 'bloggers', label: 'Bloggers', labelAr: 'البلوجر' },
    { value: 'sellers', label: 'Online Sellers', labelAr: 'تجار أونلاين' },
    { value: 'pricing', label: 'Pricing', labelAr: 'الأسعار' },
    { value: 'blog', label: 'Blog', labelAr: 'المدونة' },
    { value: 'contact', label: 'Contact', labelAr: 'تواصل معنا' },
  ];

  const roleOptions: { value: Role; label: string; labelAr: string }[] = [
    { value: 'super_admin', label: 'Super Admin', labelAr: 'مدير عام' },
    { value: 'admin', label: 'Admin', labelAr: 'مدير' },
    { value: 'editor', label: 'Editor', labelAr: 'محرر' },
    { value: 'viewer', label: 'Viewer', labelAr: 'مشاهد' },
    { value: 'content_manager', label: 'Content Manager', labelAr: 'مدير محتوى' },
    { value: 'support', label: 'Support', labelAr: 'دعم' },
    { value: 'finance', label: 'Finance', labelAr: 'مالية' },
  ];

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  // Overview Panel
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{Object.keys(draftConfig.pages).length}</div>
              <div className="text-xs text-slate-400">{isRTL ? 'صفحات' : 'Pages'}</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Grid3X3 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{draftConfig.dashboard.widgets.length}</div>
              <div className="text-xs text-slate-400">{isRTL ? 'عناصر' : 'Widgets'}</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{draftConfig.team.length}</div>
              <div className="text-xs text-slate-400">{isRTL ? 'أعضاء الفريق' : 'Team Members'}</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <History className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{snapshots.length}</div>
              <div className="text-xs text-slate-400">{isRTL ? 'نسخ احتياطية' : 'Snapshots'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <AccordionSection title="Quick Actions" titleAr="إجراءات سريعة" icon={Zap} defaultOpen>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('pages')}
            className="flex items-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>{isRTL ? 'تعديل الصفحات' : 'Edit Pages'}</span>
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className="flex items-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <Palette className="w-4 h-4 text-pink-400" />
            <span>{isRTL ? 'تعديل العلامة التجارية' : 'Edit Brand'}</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-green-400" />
            <span>{isRTL ? 'إدارة لوحة التحكم' : 'Manage Dashboard'}</span>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className="flex items-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>{isRTL ? 'إدارة الفريق' : 'Manage Team'}</span>
          </button>
        </div>
      </AccordionSection>

      {/* Favorites */}
      {favorites.length > 0 && (
        <AccordionSection title="Favorites" titleAr="المفضلة" icon={Star} defaultOpen>
          <div className="space-y-2">
            {favorites.map(fav => (
              <div key={fav.id} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                <span className="text-sm text-white">{isRTL ? fav.label.ar : fav.label.en}</span>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="p-1 text-slate-500 hover:text-yellow-400"
                >
                  <StarOff className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </AccordionSection>
      )}

      {/* Recent Activity */}
      <AccordionSection title="Recent Activity" titleAr="النشاط الأخير" icon={Clock}>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {activityLog.slice(-10).reverse().map(entry => (
            <div key={entry.id} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg text-xs">
              <span className="text-slate-300">{entry.action}: {entry.target}</span>
              <span className="text-slate-500">{new Date(entry.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
          {activityLog.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-4">{isRTL ? 'لا يوجد نشاط' : 'No activity yet'}</p>
          )}
        </div>
      </AccordionSection>

      {/* System Status */}
      <AccordionSection title="System Status" titleAr="حالة النظام" icon={Info}>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
            <span className="text-sm text-slate-300">{isRTL ? 'آخر نشر' : 'Last Published'}</span>
            <span className="text-xs text-slate-500">
              {draftConfig.lastPublished 
                ? new Date(draftConfig.lastPublished).toLocaleString()
                : isRTL ? 'لم يتم النشر' : 'Not published yet'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
            <span className="text-sm text-slate-300">{isRTL ? 'تغييرات غير محفوظة' : 'Unsaved Changes'}</span>
            <StatusBadge status={hasUnsavedChanges ? 'pending' : 'published'} />
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
            <span className="text-sm text-slate-300">{isRTL ? 'وضع الصيانة' : 'Maintenance Mode'}</span>
            <StatusBadge status={draftConfig.maintenance.enabled ? 'maintenance' : 'active'} />
          </div>
        </div>
      </AccordionSection>
    </div>
  );

  // Pages Panel
  const renderPages = () => (
    <div className="space-y-4">
      <SelectField
        label="Select Page"
        labelAr="اختر الصفحة"
        value={activePage}
        onChange={setActivePage}
        options={pageOptions}
      />

      {activePage !== 'home' && (
        <>
          {/* Page Status */}
          <AccordionSection title="Page Status" titleAr="حالة الصفحة" icon={Tag} defaultOpen>
            <SelectField
              label="Status"
              labelAr="الحالة"
              value={draftConfig.pages[activePage]?.status || 'active'}
              onChange={(v) => updateDraft(`pages.${activePage}.status`, v)}
              options={[
                { value: 'active', label: 'Active', labelAr: 'نشط' },
                { value: 'hidden', label: 'Hidden', labelAr: 'مخفي' },
                { value: 'draft', label: 'Draft', labelAr: 'مسودة' },
                { value: 'maintenance', label: 'Maintenance', labelAr: 'صيانة' },
              ]}
            />
            <TextareaField
              label="Internal Notes"
              labelAr="ملاحظات داخلية"
              value={draftConfig.pages[activePage]?.internalNotes || ''}
              onChange={(v) => updateDraft(`pages.${activePage}.internalNotes`, v)}
              rows={2}
            />
          </AccordionSection>

          {/* Page Sections */}
          <AccordionSection title="Page Sections" titleAr="أقسام الصفحة" icon={Layers} defaultOpen>
            <div className="space-y-2">
              {(draftConfig.pages[activePage]?.sections || [])
                .sort((a: SectionConfig, b: SectionConfig) => a.order - b.order)
                .map((section: SectionConfig, idx: number) => (
                  <DraggableItem
                    key={section.id}
                    visible={section.visible}
                    canMoveUp={idx > 0}
                    canMoveDown={idx < (draftConfig.pages[activePage]?.sections.length || 0) - 1}
                    onMoveUp={() => {
                      const sections = [...(draftConfig.pages[activePage]?.sections || [])].sort((a, b) => a.order - b.order);
                      if (idx > 0) {
                        const temp = sections[idx].order;
                        sections[idx].order = sections[idx - 1].order;
                        sections[idx - 1].order = temp;
                        updateDraft(`pages.${activePage}.sections`, sections);
                      }
                    }}
                    onMoveDown={() => {
                      const sections = [...(draftConfig.pages[activePage]?.sections || [])].sort((a, b) => a.order - b.order);
                      if (idx < sections.length - 1) {
                        const temp = sections[idx].order;
                        sections[idx].order = sections[idx + 1].order;
                        sections[idx + 1].order = temp;
                        updateDraft(`pages.${activePage}.sections`, sections);
                      }
                    }}
                    onToggleVisibility={() => {
                      const sections = [...(draftConfig.pages[activePage]?.sections || [])];
                      const sectionIdx = sections.findIndex(s => s.id === section.id);
                      sections[sectionIdx].visible = !sections[sectionIdx].visible;
                      updateDraft(`pages.${activePage}.sections`, sections);
                    }}
                    onDuplicate={() => {
                      const sections = [...(draftConfig.pages[activePage]?.sections || [])];
                      const newSection = {
                        ...JSON.parse(JSON.stringify(section)),
                        id: `${section.id}_copy_${Date.now()}`,
                        order: sections.length,
                      };
                      sections.push(newSection);
                      updateDraft(`pages.${activePage}.sections`, sections);
                    }}
                    onDelete={() => {
                      const sectionData = draftConfig.pages[activePage]?.sections.find(s => s.id === section.id);
                      if (sectionData) {
                        moveToTrash('section', section.id, sectionData, `pages.${activePage}.sections`);
                      }
                      const sections = (draftConfig.pages[activePage]?.sections || []).filter(s => s.id !== section.id);
                      updateDraft(`pages.${activePage}.sections`, sections);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-300 capitalize">{section.type}</span>
                      <span className="text-xs text-slate-500">({section.id})</span>
                    </div>
                  </DraggableItem>
                ))}
            </div>
            <button
              onClick={() => {
                const sections = [...(draftConfig.pages[activePage]?.sections || [])];
                sections.push({
                  id: `section_${Date.now()}`,
                  type: 'custom',
                  order: sections.length,
                  visible: true,
                });
                updateDraft(`pages.${activePage}.sections`, sections);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm text-blue-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isRTL ? 'إضافة قسم' : 'Add Section'}</span>
            </button>
          </AccordionSection>

          {/* Restore Page */}
          <button
            onClick={() => setShowRestoreConfirm('page')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isRTL ? 'استعادة الصفحة' : 'Restore Page'}</span>
          </button>
        </>
      )}

      {activePage === 'home' && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-400">{isRTL ? 'الصفحة الرئيسية محمية' : 'Homepage Protected'}</h4>
              <p className="text-xs text-slate-400 mt-1">
                {isRTL 
                  ? 'الصفحة الرئيسية محمية ولا يمكن تعديل هيكلها. استخدم محرر المحتوى لتعديل النصوص.'
                  : 'Homepage structure is protected. Use Content CMS to edit text content.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Brand Panel
  const renderBrand = () => (
    <div className="space-y-4">
      <AccordionSection title="Brand Identity" titleAr="هوية العلامة التجارية" icon={Sparkles} defaultOpen>
        <InputField
          label="Brand Name"
          labelAr="اسم العلامة التجارية"
          value={draftConfig.brand.name}
          onChange={(v) => updateDraft('brand.name', v)}
        />
        <InputField
          label="Logo URL"
          labelAr="رابط الشعار"
          value={draftConfig.brand.logoUrl || ''}
          onChange={(v) => updateDraft('brand.logoUrl', v)}
          type="url"
        />
        <InputField
          label="Favicon URL"
          labelAr="رابط الأيقونة"
          value={draftConfig.brand.faviconUrl || ''}
          onChange={(v) => updateDraft('brand.faviconUrl', v)}
          type="url"
        />
      </AccordionSection>

      <AccordionSection title="Colors" titleAr="الألوان" icon={Palette} defaultOpen>
        <ColorPicker
          label="Primary Color"
          labelAr="اللون الأساسي"
          value={draftConfig.brand.primaryColor}
          onChange={(v) => updateDraft('brand.primaryColor', v)}
        />
        <ColorPicker
          label="Secondary Color"
          labelAr="اللون الثانوي"
          value={draftConfig.brand.secondaryColor}
          onChange={(v) => updateDraft('brand.secondaryColor', v)}
        />
        <ColorPicker
          label="Accent Color"
          labelAr="اللون المميز"
          value={draftConfig.brand.accentColor}
          onChange={(v) => updateDraft('brand.accentColor', v)}
        />
        <ColorPicker
          label="Background Color"
          labelAr="لون الخلفية"
          value={draftConfig.brand.backgroundColor}
          onChange={(v) => updateDraft('brand.backgroundColor', v)}
        />
        <ColorPicker
          label="Text Color"
          labelAr="لون النص"
          value={draftConfig.brand.textColor}
          onChange={(v) => updateDraft('brand.textColor', v)}
        />
      </AccordionSection>

      <AccordionSection title="Typography" titleAr="الخطوط" icon={Type}>
        <InputField
          label="Body Font"
          labelAr="خط النص"
          value={draftConfig.brand.fontFamily}
          onChange={(v) => updateDraft('brand.fontFamily', v)}
        />
        <InputField
          label="Heading Font"
          labelAr="خط العناوين"
          value={draftConfig.brand.headingFontFamily}
          onChange={(v) => updateDraft('brand.headingFontFamily', v)}
        />
      </AccordionSection>

      <AccordionSection title="Style" titleAr="الأنماط" icon={Box}>
        <InputField
          label="Border Radius"
          labelAr="انحناء الحدود"
          value={draftConfig.brand.borderRadius}
          onChange={(v) => updateDraft('brand.borderRadius', v)}
        />
        <SelectField
          label="Shadow Intensity"
          labelAr="شدة الظل"
          value={draftConfig.brand.shadowIntensity}
          onChange={(v) => updateDraft('brand.shadowIntensity', v)}
          options={[
            { value: 'none', label: 'None', labelAr: 'بدون' },
            { value: 'sm', label: 'Small', labelAr: 'صغير' },
            { value: 'md', label: 'Medium', labelAr: 'متوسط' },
            { value: 'lg', label: 'Large', labelAr: 'كبير' },
            { value: 'xl', label: 'Extra Large', labelAr: 'كبير جداً' },
          ]}
        />
        <SelectField
          label="Icon Style"
          labelAr="نمط الأيقونات"
          value={draftConfig.brand.iconStyle}
          onChange={(v) => updateDraft('brand.iconStyle', v)}
          options={[
            { value: 'outline', label: 'Outline', labelAr: 'محدد' },
            { value: 'solid', label: 'Solid', labelAr: 'مملوء' },
            { value: 'duotone', label: 'Duotone', labelAr: 'ثنائي' },
          ]}
        />
      </AccordionSection>
    </div>
  );

  // Dashboard Panel
  const renderDashboard = () => (
    <div className="space-y-4">
      <AccordionSection title="Dashboard Widgets" titleAr="عناصر لوحة التحكم" icon={Grid3X3} defaultOpen>
        <div className="space-y-2">
          {draftConfig.dashboard.widgets
            .sort((a, b) => a.order - b.order)
            .map((widget, idx) => (
              <DraggableItem
                key={widget.id}
                visible={widget.visible}
                canMoveUp={idx > 0}
                canMoveDown={idx < draftConfig.dashboard.widgets.length - 1}
                onMoveUp={() => {
                  const widgets = [...draftConfig.dashboard.widgets].sort((a, b) => a.order - b.order);
                  if (idx > 0) {
                    const temp = widgets[idx].order;
                    widgets[idx].order = widgets[idx - 1].order;
                    widgets[idx - 1].order = temp;
                    updateDraft('dashboard.widgets', widgets);
                  }
                }}
                onMoveDown={() => {
                  const widgets = [...draftConfig.dashboard.widgets].sort((a, b) => a.order - b.order);
                  if (idx < widgets.length - 1) {
                    const temp = widgets[idx].order;
                    widgets[idx].order = widgets[idx + 1].order;
                    widgets[idx + 1].order = temp;
                    updateDraft('dashboard.widgets', widgets);
                  }
                }}
                onToggleVisibility={() => {
                  const widgets = [...draftConfig.dashboard.widgets];
                  const wIdx = widgets.findIndex(w => w.id === widget.id);
                  widgets[wIdx].visible = !widgets[wIdx].visible;
                  updateDraft('dashboard.widgets', widgets);
                }}
                onDuplicate={() => {
                  const widgets = [...draftConfig.dashboard.widgets];
                  const newWidget: WidgetConfig = {
                    ...JSON.parse(JSON.stringify(widget)),
                    id: `${widget.id}_copy_${Date.now()}`,
                    order: widgets.length,
                  };
                  widgets.push(newWidget);
                  updateDraft('dashboard.widgets', widgets);
                }}
                onDelete={() => {
                  moveToTrash('widget', widget.id, widget, 'dashboard.widgets');
                  const widgets = draftConfig.dashboard.widgets.filter(w => w.id !== widget.id);
                  updateDraft('dashboard.widgets', widgets);
                }}
              >
                <div className="flex items-center gap-2">
                  {widget.type === 'kpi' && <Activity className="w-3.5 h-3.5 text-blue-400" />}
                  {widget.type === 'chart' && <TrendingUp className="w-3.5 h-3.5 text-green-400" />}
                  {widget.type === 'table' && <Table className="w-3.5 h-3.5 text-amber-400" />}
                  {widget.type === 'insights' && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                  <span className="text-xs text-slate-300">{isRTL ? widget.title.ar : widget.title.en}</span>
                </div>
              </DraggableItem>
            ))}
        </div>
        <button
          onClick={() => {
            const widgets = [...draftConfig.dashboard.widgets];
            const newWidget: WidgetConfig = {
              id: `widget_${Date.now()}`,
              type: 'kpi',
              title: { ar: 'عنصر جديد', en: 'New Widget' },
              order: widgets.length,
              visible: true,
              width: 1,
            };
            widgets.push(newWidget);
            updateDraft('dashboard.widgets', widgets);
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm text-blue-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إضافة عنصر' : 'Add Widget'}</span>
        </button>
      </AccordionSection>

      {/* Widget Editor */}
      {draftConfig.dashboard.widgets.length > 0 && (
        <AccordionSection title="Widget Settings" titleAr="إعدادات العناصر" icon={Settings}>
          {draftConfig.dashboard.widgets.slice(0, 4).map(widget => (
            <div key={widget.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-2">
              <div className="text-xs font-medium text-white">{isRTL ? widget.title.ar : widget.title.en}</div>
              <InputField
                label="Title (Arabic)"
                labelAr="العنوان (عربي)"
                value={widget.title.ar}
                onChange={(v) => {
                  const widgets = [...draftConfig.dashboard.widgets];
                  const wIdx = widgets.findIndex(w => w.id === widget.id);
                  widgets[wIdx].title.ar = v;
                  updateDraft('dashboard.widgets', widgets);
                }}
              />
              <InputField
                label="Title (English)"
                labelAr="العنوان (انجليزي)"
                value={widget.title.en}
                onChange={(v) => {
                  const widgets = [...draftConfig.dashboard.widgets];
                  const wIdx = widgets.findIndex(w => w.id === widget.id);
                  widgets[wIdx].title.en = v;
                  updateDraft('dashboard.widgets', widgets);
                }}
              />
              <SelectField
                label="Type"
                labelAr="النوع"
                value={widget.type}
                onChange={(v) => {
                  const widgets = [...draftConfig.dashboard.widgets];
                  const wIdx = widgets.findIndex(w => w.id === widget.id);
                  widgets[wIdx].type = v as WidgetConfig['type'];
                  updateDraft('dashboard.widgets', widgets);
                }}
                options={[
                  { value: 'kpi', label: 'KPI', labelAr: 'مؤشر' },
                  { value: 'chart', label: 'Chart', labelAr: 'رسم بياني' },
                  { value: 'table', label: 'Table', labelAr: 'جدول' },
                  { value: 'insights', label: 'Insights', labelAr: 'رؤى' },
                ]}
              />
              {widget.type === 'chart' && (
                <SelectField
                  label="Chart Type"
                  labelAr="نوع الرسم"
                  value={widget.chartType || 'line'}
                  onChange={(v) => {
                    const widgets = [...draftConfig.dashboard.widgets];
                    const wIdx = widgets.findIndex(w => w.id === widget.id);
                    widgets[wIdx].chartType = v as WidgetConfig['chartType'];
                    updateDraft('dashboard.widgets', widgets);
                  }}
                  options={[
                    { value: 'line', label: 'Line', labelAr: 'خطي' },
                    { value: 'bar', label: 'Bar', labelAr: 'أعمدة' },
                    { value: 'pie', label: 'Pie', labelAr: 'دائري' },
                    { value: 'area', label: 'Area', labelAr: 'منطقة' },
                    { value: 'donut', label: 'Donut', labelAr: 'حلقي' },
                  ]}
                />
              )}
              <SelectField
                label="Width"
                labelAr="العرض"
                value={String(widget.width || 1)}
                onChange={(v) => {
                  const widgets = [...draftConfig.dashboard.widgets];
                  const wIdx = widgets.findIndex(w => w.id === widget.id);
                  widgets[wIdx].width = Number(v) as WidgetConfig['width'];
                  updateDraft('dashboard.widgets', widgets);
                }}
                options={[
                  { value: '1', label: '1 Column', labelAr: 'عمود واحد' },
                  { value: '2', label: '2 Columns', labelAr: 'عمودين' },
                  { value: '3', label: '3 Columns', labelAr: '3 أعمدة' },
                  { value: '4', label: 'Full Width', labelAr: 'العرض الكامل' },
                ]}
              />
            </div>
          ))}
        </AccordionSection>
      )}

      {/* Restore Dashboard */}
      <button
        onClick={() => setShowRestoreConfirm('dashboard')}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span>{isRTL ? 'استعادة لوحة التحكم' : 'Restore Dashboard'}</span>
      </button>
    </div>
  );

  // Reports Panel
  const renderReports = () => (
    <div className="space-y-4">
      <AccordionSection title="Report Blocks" titleAr="كتل التقرير" icon={FileText} defaultOpen>
        <div className="space-y-2">
          {draftConfig.reports.blocks
            .sort((a, b) => a.order - b.order)
            .map((block, idx) => (
              <DraggableItem
                key={block.id}
                visible={block.visible}
                canMoveUp={idx > 0}
                canMoveDown={idx < draftConfig.reports.blocks.length - 1}
                onMoveUp={() => {
                  const blocks = [...draftConfig.reports.blocks].sort((a, b) => a.order - b.order);
                  if (idx > 0) {
                    const temp = blocks[idx].order;
                    blocks[idx].order = blocks[idx - 1].order;
                    blocks[idx - 1].order = temp;
                    updateDraft('reports.blocks', blocks);
                  }
                }}
                onMoveDown={() => {
                  const blocks = [...draftConfig.reports.blocks].sort((a, b) => a.order - b.order);
                  if (idx < blocks.length - 1) {
                    const temp = blocks[idx].order;
                    blocks[idx].order = blocks[idx + 1].order;
                    blocks[idx + 1].order = temp;
                    updateDraft('reports.blocks', blocks);
                  }
                }}
                onToggleVisibility={() => {
                  const blocks = [...draftConfig.reports.blocks];
                  const bIdx = blocks.findIndex(b => b.id === block.id);
                  blocks[bIdx].visible = !blocks[bIdx].visible;
                  updateDraft('reports.blocks', blocks);
                }}
                onDuplicate={() => {
                  const blocks = [...draftConfig.reports.blocks];
                  const newBlock: ReportBlockConfig = {
                    ...JSON.parse(JSON.stringify(block)),
                    id: `${block.id}_copy_${Date.now()}`,
                    order: blocks.length,
                  };
                  blocks.push(newBlock);
                  updateDraft('reports.blocks', blocks);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 capitalize">{block.type}</span>
                  {block.title && <span className="text-xs text-slate-500">- {isRTL ? block.title.ar : block.title.en}</span>}
                </div>
              </DraggableItem>
            ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Report Settings" titleAr="إعدادات التقرير" icon={Settings}>
        <ToggleRow
          label="Show Header"
          labelAr="إظهار الرأس"
          checked={draftConfig.reports.headerVisible}
          onChange={(v) => updateDraft('reports.headerVisible', v)}
        />
        <ToggleRow
          label="Show Footer"
          labelAr="إظهار التذييل"
          checked={draftConfig.reports.footerVisible}
          onChange={(v) => updateDraft('reports.footerVisible', v)}
        />
        <SelectField
          label="Print Layout"
          labelAr="تخطيط الطباعة"
          value={draftConfig.reports.printLayout}
          onChange={(v) => updateDraft('reports.printLayout', v)}
          options={[
            { value: 'portrait', label: 'Portrait', labelAr: 'عمودي' },
            { value: 'landscape', label: 'Landscape', labelAr: 'أفقي' },
          ]}
        />
      </AccordionSection>
    </div>
  );

  // AI Chat Panel
  const renderAIChat = () => (
    <div className="space-y-4">
      <AccordionSection title="Introduction" titleAr="المقدمة" icon={MessageSquare} defaultOpen>
        <InputField
          label="Intro Text (Arabic)"
          labelAr="نص المقدمة (عربي)"
          value={draftConfig.aiChat.introText.ar}
          onChange={(v) => updateDraft('aiChat.introText.ar', v)}
        />
        <InputField
          label="Intro Text (English)"
          labelAr="نص المقدمة (انجليزي)"
          value={draftConfig.aiChat.introText.en}
          onChange={(v) => updateDraft('aiChat.introText.en', v)}
        />
        <InputField
          label="Assistant Label (Arabic)"
          labelAr="اسم المساعد (عربي)"
          value={draftConfig.aiChat.assistantLabel.ar}
          onChange={(v) => updateDraft('aiChat.assistantLabel.ar', v)}
        />
        <InputField
          label="Assistant Label (English)"
          labelAr="اسم المساعد (انجليزي)"
          value={draftConfig.aiChat.assistantLabel.en}
          onChange={(v) => updateDraft('aiChat.assistantLabel.en', v)}
        />
      </AccordionSection>

      <AccordionSection title="Suggested Prompts" titleAr="الاقتراحات" icon={Sparkles}>
        <div className="space-y-2">
          {draftConfig.aiChat.suggestedPrompts.map((prompt, idx) => (
            <DraggableItem
              key={prompt.id}
              visible={prompt.visible}
              canMoveUp={idx > 0}
              canMoveDown={idx < draftConfig.aiChat.suggestedPrompts.length - 1}
              onToggleVisibility={() => {
                const prompts = [...draftConfig.aiChat.suggestedPrompts];
                prompts[idx].visible = !prompts[idx].visible;
                updateDraft('aiChat.suggestedPrompts', prompts);
              }}
              onDelete={() => {
                const prompts = draftConfig.aiChat.suggestedPrompts.filter((_, i) => i !== idx);
                updateDraft('aiChat.suggestedPrompts', prompts);
              }}
            >
              <span className="text-xs text-slate-300">{isRTL ? prompt.ar : prompt.en}</span>
            </DraggableItem>
          ))}
        </div>
        <button
          onClick={() => {
            const prompts = [...draftConfig.aiChat.suggestedPrompts];
            prompts.push({
              id: `prompt_${Date.now()}`,
              ar: 'اقتراح جديد',
              en: 'New prompt',
              visible: true,
            });
            updateDraft('aiChat.suggestedPrompts', prompts);
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm text-blue-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إضافة اقتراح' : 'Add Prompt'}</span>
        </button>
      </AccordionSection>

      <AccordionSection title="Helper Blocks" titleAr="كتل المساعدة" icon={HelpCircle}>
        <div className="space-y-2">
          {draftConfig.aiChat.helperBlocks.map((block, idx) => (
            <DraggableItem
              key={block.id}
              visible={block.visible}
              canMoveUp={idx > 0}
              canMoveDown={idx < draftConfig.aiChat.helperBlocks.length - 1}
              onToggleVisibility={() => {
                const blocks = [...draftConfig.aiChat.helperBlocks];
                blocks[idx].visible = !blocks[idx].visible;
                updateDraft('aiChat.helperBlocks', blocks);
              }}
            >
              <span className="text-xs text-slate-300">{isRTL ? block.title.ar : block.title.en}</span>
            </DraggableItem>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Empty State" titleAr="الحالة الفارغة" icon={Box}>
        <InputField
          label="Empty State (Arabic)"
          labelAr="الحالة الفارغة (عربي)"
          value={draftConfig.aiChat.emptyStateText.ar}
          onChange={(v) => updateDraft('aiChat.emptyStateText.ar', v)}
        />
        <InputField
          label="Empty State (English)"
          labelAr="الحالة الفارغة (انجليزي)"
          value={draftConfig.aiChat.emptyStateText.en}
          onChange={(v) => updateDraft('aiChat.emptyStateText.en', v)}
        />
      </AccordionSection>
    </div>
  );

  // Team Panel
  const renderTeam = () => (
    <div className="space-y-4">
      <AccordionSection title="Admin Emails" titleAr="بريد المديرين" icon={Shield} defaultOpen>
        <div className="space-y-2">
          {draftConfig.adminEmails.map((email, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
              <span className="text-sm text-white">{email}</span>
              <button
                onClick={() => {
                  const emails = draftConfig.adminEmails.filter((_, i) => i !== idx);
                  updateDraft('adminEmails', emails);
                }}
                className="p-1 text-slate-500 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={isRTL ? 'بريد المدير' : 'Admin email'}
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    updateDraft('adminEmails', [...draftConfig.adminEmails, input.value.trim()]);
                    input.value = '';
                  }
                }
              }}
            />
          </div>
        </div>
      </AccordionSection>

      <AccordionSection title="Team Members" titleAr="أعضاء الفريق" icon={Users} defaultOpen>
        <div className="space-y-2">
          {draftConfig.team.map((member: TeamMember) => (
            <div key={member.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-white">{member.email}</div>
                  <div className="text-xs text-slate-500">{member.name || 'No name'}</div>
                </div>
                <StatusBadge status={member.status} />
              </div>
              <div className="flex items-center gap-2">
                <SelectField
                  label=""
                  labelAr=""
                  value={member.role}
                  onChange={(v) => updateMemberRole(member.id, v as Role)}
                  options={roleOptions}
                />
                <button
                  onClick={() => member.status === 'suspended' ? reactivateMember(member.id) : suspendMember(member.id)}
                  className={`p-2 rounded-lg ${member.status === 'suspended' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}
                >
                  {member.status === 'suspended' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => removeTeamMember(member.id)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Invite Member" titleAr="دعوة عضو" icon={Mail}>
        <InputField
          label="Email"
          labelAr="البريد الإلكتروني"
          value={inviteEmail}
          onChange={setInviteEmail}
          type="email"
        />
        <SelectField
          label="Role"
          labelAr="الدور"
          value={inviteRole}
          onChange={(v) => setInviteRole(v as Role)}
          options={roleOptions}
        />
        <button
          onClick={handleInviteTeamMember}
          disabled={!inviteEmail.trim()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إرسال دعوة' : 'Send Invite'}</span>
        </button>
      </AccordionSection>
    </div>
  );

  // Visibility/Feature Toggles Panel
  const renderVisibility = () => (
    <div className="space-y-4">
      <AccordionSection title="Feature Toggles" titleAr="تبديل الميزات" icon={ToggleLeft} defaultOpen>
        <ToggleRow
          label="Blog"
          labelAr="المدونة"
          checked={draftConfig.featureToggles.blog}
          onChange={(v) => updateDraft('featureToggles.blog', v)}
        />
        <ToggleRow
          label="Pricing Page"
          labelAr="صفحة الأسعار"
          checked={draftConfig.featureToggles.pricing}
          onChange={(v) => updateDraft('featureToggles.pricing', v)}
        />
        <ToggleRow
          label="Reports"
          labelAr="التقارير"
          checked={draftConfig.featureToggles.reports}
          onChange={(v) => updateDraft('featureToggles.reports', v)}
        />
        <ToggleRow
          label="AI Chat"
          labelAr="محادثة AI"
          checked={draftConfig.featureToggles.aiChat}
          onChange={(v) => updateDraft('featureToggles.aiChat', v)}
        />
        <ToggleRow
          label="Audience Pages"
          labelAr="صفحات الجمهور"
          checked={draftConfig.featureToggles.audiencePages}
          onChange={(v) => updateDraft('featureToggles.audiencePages', v)}
        />
        <ToggleRow
          label="Export Buttons"
          labelAr="أزرار التصدير"
          checked={draftConfig.featureToggles.exportButtons}
          onChange={(v) => updateDraft('featureToggles.exportButtons', v)}
        />
        <ToggleRow
          label="Support Blocks"
          labelAr="كتل الدعم"
          checked={draftConfig.featureToggles.supportBlocks}
          onChange={(v) => updateDraft('featureToggles.supportBlocks', v)}
        />
        <ToggleRow
          label="Admin Entry Button"
          labelAr="زر دخول المدير"
          checked={draftConfig.featureToggles.adminEntryButton}
          onChange={(v) => updateDraft('featureToggles.adminEntryButton', v)}
        />
      </AccordionSection>

      <AccordionSection title="Announcement Bar" titleAr="شريط الإعلان" icon={Megaphone}>
        <ToggleRow
          label="Show Announcement"
          labelAr="إظهار الإعلان"
          checked={draftConfig.announcement.visible}
          onChange={(v) => updateDraft('announcement.visible', v)}
        />
        <InputField
          label="Text (Arabic)"
          labelAr="النص (عربي)"
          value={draftConfig.announcement.text.ar}
          onChange={(v) => updateDraft('announcement.text.ar', v)}
        />
        <InputField
          label="Text (English)"
          labelAr="النص (انجليزي)"
          value={draftConfig.announcement.text.en}
          onChange={(v) => updateDraft('announcement.text.en', v)}
        />
        <SelectField
          label="Type"
          labelAr="النوع"
          value={draftConfig.announcement.type}
          onChange={(v) => updateDraft('announcement.type', v)}
          options={[
            { value: 'info', label: 'Info', labelAr: 'معلومات' },
            { value: 'warning', label: 'Warning', labelAr: 'تحذير' },
            { value: 'promo', label: 'Promo', labelAr: 'ترويج' },
            { value: 'emergency', label: 'Emergency', labelAr: 'طوارئ' },
          ]}
        />
        <ToggleRow
          label="Dismissible"
          labelAr="قابل للإغلاق"
          checked={draftConfig.announcement.dismissible}
          onChange={(v) => updateDraft('announcement.dismissible', v)}
        />
      </AccordionSection>

      <AccordionSection title="Maintenance Mode" titleAr="وضع الصيانة" icon={AlertTriangle}>
        <ToggleRow
          label="Enable Maintenance"
          labelAr="تفعيل الصيانة"
          checked={draftConfig.maintenance.enabled}
          onChange={(v) => updateDraft('maintenance.enabled', v)}
        />
        <InputField
          label="Message (Arabic)"
          labelAr="الرسالة (عربي)"
          value={draftConfig.maintenance.message.ar}
          onChange={(v) => updateDraft('maintenance.message.ar', v)}
        />
        <InputField
          label="Message (English)"
          labelAr="الرسالة (انجليزي)"
          value={draftConfig.maintenance.message.en}
          onChange={(v) => updateDraft('maintenance.message.en', v)}
        />
      </AccordionSection>
    </div>
  );

  // Pricing Panel
  const renderPricing = () => (
    <div className="space-y-4">
      <AccordionSection title="Plans" titleAr="الخطط" icon={CreditCard} defaultOpen>
        <div className="space-y-3">
          {draftConfig.pricing.plans.map((plan: PricingPlan) => (
            <div key={plan.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{isRTL ? plan.name.ar : plan.name.en}</span>
                <ToggleRow
                  label=""
                  labelAr=""
                  checked={plan.visible}
                  onChange={(v) => {
                    const plans = [...draftConfig.pricing.plans];
                    const pIdx = plans.findIndex(p => p.id === plan.id);
                    plans[pIdx].visible = v;
                    updateDraft('pricing.plans', plans);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  label="Monthly"
                  labelAr="شهري"
                  value={String(plan.price.monthly)}
                  onChange={(v) => {
                    const plans = [...draftConfig.pricing.plans];
                    const pIdx = plans.findIndex(p => p.id === plan.id);
                    plans[pIdx].price.monthly = Number(v);
                    updateDraft('pricing.plans', plans);
                  }}
                  type="number"
                />
                <InputField
                  label="Yearly"
                  labelAr="سنوي"
                  value={String(plan.price.yearly)}
                  onChange={(v) => {
                    const plans = [...draftConfig.pricing.plans];
                    const pIdx = plans.findIndex(p => p.id === plan.id);
                    plans[pIdx].price.yearly = Number(v);
                    updateDraft('pricing.plans', plans);
                  }}
                  type="number"
                />
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Payment Settings" titleAr="إعدادات الدفع" icon={DollarSign}>
        <SelectField
          label="Display Currency"
          labelAr="العملة المعروضة"
          value={draftConfig.pricing.payment.displayedCurrency}
          onChange={(v) => updateDraft('pricing.payment.displayedCurrency', v)}
          options={[
            { value: 'EGP', label: 'EGP (Egyptian Pound)', labelAr: 'جنيه مصري' },
            { value: 'USD', label: 'USD (US Dollar)', labelAr: 'دولار أمريكي' },
          ]}
        />
        <ToggleRow
          label="Show Monthly/Yearly Toggle"
          labelAr="إظهار تبديل شهري/سنوي"
          checked={draftConfig.pricing.payment.showMonthlyYearlyToggle}
          onChange={(v) => updateDraft('pricing.payment.showMonthlyYearlyToggle', v)}
        />
        <ToggleRow
          label="Show Comparison Table"
          labelAr="إظهار جدول المقارنة"
          checked={draftConfig.pricing.comparisonVisible}
          onChange={(v) => updateDraft('pricing.comparisonVisible', v)}
        />
      </AccordionSection>

      <AccordionSection title="Limits" titleAr="الحدود" icon={Database}>
        <div className="text-xs text-slate-400 mb-2">{isRTL ? 'الخطة المجانية' : 'Free Plan'}</div>
        <div className="grid grid-cols-2 gap-2">
          <InputField
            label="Dashboards"
            labelAr="لوحات"
            value={String(draftConfig.pricing.limits.free.dashboards)}
            onChange={(v) => updateDraft('pricing.limits.free.dashboards', Number(v))}
            type="number"
          />
          <InputField
            label="Reports"
            labelAr="تقارير"
            value={String(draftConfig.pricing.limits.free.reports)}
            onChange={(v) => updateDraft('pricing.limits.free.reports', Number(v))}
            type="number"
          />
          <InputField
            label="AI Usage"
            labelAr="استخدام AI"
            value={String(draftConfig.pricing.limits.free.aiUsage)}
            onChange={(v) => updateDraft('pricing.limits.free.aiUsage', Number(v))}
            type="number"
          />
          <InputField
            label="Widgets"
            labelAr="عناصر"
            value={String(draftConfig.pricing.limits.free.widgets)}
            onChange={(v) => updateDraft('pricing.limits.free.widgets', Number(v))}
            type="number"
          />
        </div>
      </AccordionSection>
    </div>
  );

  // Snapshots Panel
  const renderSnapshots = () => (
    <div className="space-y-4">
      <AccordionSection title="Create Snapshot" titleAr="إنشاء نسخة" icon={Camera} defaultOpen>
        <InputField
          label="Snapshot Name"
          labelAr="اسم النسخة"
          value={snapshotName}
          onChange={setSnapshotName}
          placeholder={isRTL ? 'اسم النسخة الاحتياطية' : 'Backup name'}
        />
        <button
          onClick={handleCreateSnapshot}
          disabled={!snapshotName.trim()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إنشاء نسخة' : 'Create Snapshot'}</span>
        </button>
      </AccordionSection>

      <AccordionSection title="Saved Snapshots" titleAr="النسخ المحفوظة" icon={History} defaultOpen badge={`${snapshots.length}`}>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {snapshots.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">{isRTL ? 'لا توجد نسخ' : 'No snapshots yet'}</p>
          ) : (
            snapshots.map(snapshot => (
              <div key={snapshot.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{snapshot.name}</span>
                  <span className="text-xs text-slate-500">{new Date(snapshot.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => revertToSnapshot(snapshot.id)}
                    className="flex-1 px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs"
                  >
                    {isRTL ? 'استعادة' : 'Revert'}
                  </button>
                  <button
                    onClick={() => duplicateSnapshot(snapshot.id)}
                    className="p-1 text-slate-500 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSnapshot(snapshot.id)}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </AccordionSection>

      <AccordionSection title="Restore Options" titleAr="خيارات الاستعادة" icon={RotateCcw}>
        <button
          onClick={() => setShowRestoreConfirm('published')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors mb-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{isRTL ? 'استعادة آخر نشر' : 'Restore Last Published'}</span>
        </button>
        <button
          onClick={() => setShowRestoreConfirm('defaults')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-sm text-red-400 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{isRTL ? 'استعادة الافتراضيات' : 'Restore Defaults'}</span>
        </button>
      </AccordionSection>
    </div>
  );

  // Trash Panel
  const renderTrash = () => (
    <div className="space-y-4">
      <AccordionSection title="Deleted Items" titleAr="العناصر المحذوفة" icon={Trash2} defaultOpen badge={`${trash.length}`}>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {trash.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">{isRTL ? 'سلة المحذوفات فارغة' : 'Trash is empty'}</p>
          ) : (
            trash.map((item: TrashItem) => (
              <div key={item.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm text-white capitalize">{item.type}</span>
                    <span className="text-xs text-slate-500 ml-2">{item.originalLocation}</span>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(item.deletedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => restoreFromTrash(item.id)}
                    className="flex-1 px-2 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-xs"
                  >
                    {isRTL ? 'استعادة' : 'Restore'}
                  </button>
                  <button
                    onClick={() => permanentDelete(item.id)}
                    className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs"
                  >
                    {isRTL ? 'حذف نهائي' : 'Delete Forever'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {trash.length > 0 && (
          <button
            onClick={emptyTrash}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-sm text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isRTL ? 'إفراغ السلة' : 'Empty Trash'}</span>
          </button>
        )}
      </AccordionSection>
    </div>
  );

  // Submissions/Inbox Panel
  const renderSubmissions = () => (
    <div className="space-y-4">
      <AccordionSection 
        title="Contact Submissions" 
        titleAr="رسائل التواصل" 
        icon={Mail} 
        defaultOpen 
        badge={submissions.filter(s => s.status === 'new').length > 0 ? `${submissions.filter(s => s.status === 'new').length}` : undefined}
      >
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {submissions.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">{isRTL ? 'لا توجد رسائل' : 'No submissions yet'}</p>
          ) : (
            submissions.map((sub: FormSubmission) => (
              <div key={sub.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{sub.data.email || 'No email'}</span>
                  <StatusBadge status={sub.status} />
                </div>
                <p className="text-xs text-slate-400 mb-2 line-clamp-2">{sub.data.message || 'No message'}</p>
                <div className="flex items-center gap-2">
                  <SelectField
                    label=""
                    labelAr=""
                    value={sub.status}
                    onChange={(v) => updateSubmissionStatus(sub.id, v as FormSubmission['status'])}
                    options={[
                      { value: 'new', label: 'New', labelAr: 'جديد' },
                      { value: 'in_progress', label: 'In Progress', labelAr: 'قيد التقدم' },
                      { value: 'resolved', label: 'Resolved', labelAr: 'تم الحل' },
                    ]}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </AccordionSection>
    </div>
  );

  // Settings Panel
  const renderSettings = () => (
    <div className="space-y-4">
      <AccordionSection title="Admin Entry" titleAr="دخول المدير" icon={Shield} defaultOpen>
        <ToggleRow
          label="Show Admin Entry in Navbar"
          labelAr="إظهار زر المدير في القائمة"
          checked={draftConfig.navbar.showAdminEntry || false}
          onChange={(v) => updateDraft('navbar.showAdminEntry', v)}
        />
        <ToggleRow
          label="Show Admin Entry in Footer"
          labelAr="إظهار زر المدير في التذييل"
          checked={draftConfig.footer.showAdminEntry || false}
          onChange={(v) => updateDraft('footer.showAdminEntry', v)}
        />
        <SelectField
          label="Admin Entry Position"
          labelAr="موقع زر المدير"
          value={draftConfig.navbar.adminEntryPosition || 'hidden'}
          onChange={(v) => updateDraft('navbar.adminEntryPosition', v)}
          options={[
            { value: 'navbar', label: 'Navbar', labelAr: 'القائمة' },
            { value: 'footer', label: 'Footer', labelAr: 'التذييل' },
            { value: 'hidden', label: 'Hidden', labelAr: 'مخفي' },
          ]}
        />
      </AccordionSection>

      <AccordionSection title="Export / Import" titleAr="تصدير / استيراد" icon={UploadCloud}>
        <button
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors mb-2"
        >
          <Download className="w-4 h-4" />
          <span>{isRTL ? 'تصدير الإعدادات' : 'Export Settings'}</span>
        </button>
        <label className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{isRTL ? 'استيراد الإعدادات' : 'Import Settings'}</span>
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>
      </AccordionSection>

      <AccordionSection title="Danger Zone" titleAr="منطقة الخطر" icon={AlertTriangle}>
        <button
          onClick={() => setShowRestoreConfirm('defaults')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-sm text-red-400 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{isRTL ? 'إعادة تعيين كل شيء' : 'Reset Everything'}</span>
        </button>
      </AccordionSection>
    </div>
  );

  // Activity Panel
  const renderActivity = () => (
    <div className="space-y-4">
      <AccordionSection title="Activity Log" titleAr="سجل النشاط" icon={Activity} defaultOpen>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {activityLog.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">{isRTL ? 'لا يوجد نشاط' : 'No activity yet'}</p>
          ) : (
            activityLog.slice().reverse().map(entry => (
              <div key={entry.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white capitalize">{entry.action}</span>
                  <span className="text-xs text-slate-500">{new Date(entry.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-400">{entry.target}</p>
                {entry.details && <p className="text-xs text-slate-500 mt-1">{entry.details}</p>}
              </div>
            ))
          )}
        </div>
      </AccordionSection>
    </div>
  );

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'pages': return renderPages();
      case 'brand': return renderBrand();
      case 'dashboard': return renderDashboard();
      case 'reports': return renderReports();
      case 'ai-chat': return renderAIChat();
      case 'team': return renderTeam();
      case 'visibility': return renderVisibility();
      case 'pricing': return renderPricing();
      case 'snapshots': return renderSnapshots();
      case 'trash': return renderTrash();
      case 'submissions': return renderSubmissions();
      case 'settings': return renderSettings();
      case 'activity': return renderActivity();
      default: return renderOverview();
    }
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-slate-950 flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">Admin Studio</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRTL ? 'بحث...' : 'Search...'}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            {searchQuery && searchResults().length > 0 && (
              <div className="absolute mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {searchResults().map(result => (
                  <button
                    key={result.id}
                    onClick={() => {
                      setSearchQuery('');
                      // Navigate to result
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700"
                  >
                    <span className="text-xs text-slate-500 mr-2">{result.type}</span>
                    {result.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Nav Sections */}
        <div className="flex-1 overflow-y-auto py-2">
          {sidebarSections.map((section, sIdx) => (
            <div key={sIdx} className="mb-4">
              {!sidebarCollapsed && (
                <div className="px-4 py-1">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{section.title}</span>
                </div>
              )}
              <div className="space-y-0.5 px-2">
                {section.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as MainTab)}
                    className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} gap-2 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    title={sidebarCollapsed ? (isRTL ? item.labelAr : item.label) : undefined}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {!sidebarCollapsed && <span className="text-sm">{isRTL ? item.labelAr : item.label}</span>}
                    </div>
                    {!sidebarCollapsed && item.badge && (
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Site */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {!sidebarCollapsed && <span>{isRTL ? 'العودة للموقع' : 'Back to Site'}</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white capitalize">
              {sidebarSections.flatMap(s => s.items).find(i => i.id === activeTab)?.label || 'Admin Studio'}
            </h1>
            {hasUnsavedChanges && (
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                {isRTL ? 'تغييرات غير محفوظة' : 'Unsaved Changes'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Preview Device Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Mode Toggle */}
            <button
              onClick={() => setPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                isPreviewMode 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
              }`}
            >
              {isPreviewMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{isPreviewMode ? (isRTL ? 'معاينة' : 'Preview') : (isRTL ? 'تحرير' : 'Edit')}</span>
            </button>

            {/* Discard */}
            <button
              onClick={() => hasUnsavedChanges ? setShowDiscardConfirm(true) : null}
              disabled={!hasUnsavedChanges}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <X className="w-4 h-4" />
              <span>{isRTL ? 'تجاهل' : 'Discard'}</span>
            </button>

            {/* Save Draft */}
            <button
              onClick={saveDraft}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isRTL ? 'حفظ' : 'Save'}</span>
            </button>

            {/* Publish */}
            <button
              onClick={() => setShowPublishConfirm(true)}
              disabled={!hasUnsavedChanges}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-white transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>{isRTL ? 'نشر' : 'Publish'}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Inspector Panel */}
          <div className="w-80 bg-slate-900/50 border-r border-slate-800 overflow-y-auto p-4">
            {renderTabContent()}
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-6 overflow-auto">
            <div 
              className={`mx-auto bg-slate-900 rounded-xl border border-slate-800 overflow-hidden transition-all duration-300 ${
                previewDevice === 'desktop' ? 'w-full' : 
                previewDevice === 'tablet' ? 'max-w-2xl' : 
                'max-w-sm'
              }`}
            >
              <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="px-3 py-1 bg-slate-700 rounded text-xs text-slate-400 text-center">
                    {isPreviewMode ? 'Published Preview' : 'Draft Preview'}
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{draftConfig.brand.name}</h3>
                  <p className="text-sm text-slate-400">
                    {isRTL ? 'معاينة التغييرات تظهر هنا' : 'Changes preview appears here'}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <StatusBadge status={isPreviewMode ? 'published' : 'draft'} />
                    <span className="text-xs text-slate-500">{previewDevice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPublishConfirm && (
        <ConfirmModal
          title={isRTL ? 'نشر التغييرات' : 'Publish Changes'}
          message={isRTL ? 'هل أنت متأكد من نشر جميع التغييرات؟' : 'Are you sure you want to publish all changes?'}
          onConfirm={handlePublish}
          onCancel={() => setShowPublishConfirm(false)}
          confirmLabel={isRTL ? 'نشر' : 'Publish'}
        />
      )}

      {showRestoreConfirm && (
        <ConfirmModal
          title={isRTL ? 'استعادة' : 'Restore'}
          message={isRTL ? 'هل أنت متأكد من الاستعادة؟ سيتم فقدان التغييرات الحالية.' : 'Are you sure? Current changes will be lost.'}
          onConfirm={() => handleRestore(showRestoreConfirm)}
          onCancel={() => setShowRestoreConfirm(null)}
          confirmLabel={isRTL ? 'استعادة' : 'Restore'}
          danger
        />
      )}

      {showDiscardConfirm && (
        <ConfirmModal
          title={isRTL ? 'تجاهل التغييرات' : 'Discard Changes'}
          message={isRTL ? 'هل أنت متأكد من تجاهل جميع التغييرات غير المحفوظة؟' : 'Are you sure you want to discard all unsaved changes?'}
          onConfirm={() => {
            discardDraft();
            setShowDiscardConfirm(false);
          }}
          onCancel={() => setShowDiscardConfirm(false)}
          confirmLabel={isRTL ? 'تجاهل' : 'Discard'}
          danger
        />
      )}

      {showUnsavedWarning && (
        <ConfirmModal
          title={isRTL ? 'تغييرات غير محفوظة' : 'Unsaved Changes'}
          message={isRTL ? 'لديك تغييرات غير محفوظة. هل تريد المتابعة؟' : 'You have unsaved changes. Do you want to continue?'}
          onConfirm={() => setShowUnsavedWarning(false)}
          onCancel={() => setShowUnsavedWarning(false)}
          confirmLabel={isRTL ? 'متابعة' : 'Continue'}
          danger
        />
      )}
    </div>
  );
}
