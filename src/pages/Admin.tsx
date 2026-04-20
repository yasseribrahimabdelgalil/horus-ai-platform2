import { useState, useCallback } from 'react';
import { 
  Zap, ChevronLeft, ChevronRight, Eye, EyeOff, Save, Upload, RotateCcw, 
  History, Copy, Trash2, Plus, GripVertical, Settings, Palette, Type, 
  Layout, BarChart3, FileText, MessageSquare, Home, Navigation, 
  Image, Layers, Box, PanelLeft, Sparkles, Monitor, Tablet, Smartphone,
  ChevronDown, ChevronUp, Check, X, RefreshCw, Camera, Clock, Edit3,
  AlignLeft, AlignCenter, AlignRight, Bold, Sun, Moon, Maximize2,
  Grid3X3, Table, PieChart, TrendingUp, Activity
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin, WidgetConfig, ReportBlockConfig, SectionConfig } from '../contexts/AdminContext';

interface AdminProps {
  onNavigate: (page: string) => void;
}

type EditorTab = 'pages' | 'dashboard' | 'reports' | 'ai-chat' | 'global' | 'snapshots';
type PageEditorSection = 'navbar' | 'hero' | 'sections' | 'style';

// Reusable Components
function ToggleRow({ 
  label, 
  labelAr, 
  checked, 
  onChange 
}: { 
  label: string; 
  labelAr: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}) {
  const { isRTL } = useLanguage();
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-slate-800/50 rounded-lg">
      <span className="text-sm text-slate-300">{isRTL ? labelAr : label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-colors relative ${
          checked ? 'bg-blue-500' : 'bg-slate-600'
        }`}
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
}: {
  label: string;
  labelAr: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'color';
  placeholder?: string;
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
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
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

function SliderField({
  label,
  labelAr,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
}: {
  label: string;
  labelAr: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) {
  const { isRTL } = useLanguage();
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs text-slate-400 font-medium">{isRTL ? labelAr : label}</label>
        <span className="text-xs text-slate-500">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
}

function AccordionSection({
  title,
  titleAr,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  titleAr: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
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

export function Admin({ onNavigate }: AdminProps) {
  const { isRTL } = useLanguage();
  const {
    draftConfig,
    publishedConfig,
    snapshots,
    isPreviewMode,
    hasUnsavedChanges,
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
    setPreviewMode,
  } = useAdmin();

  // UI State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>('pages');
  const [activePage, setActivePage] = useState('home');
  const [activePageSection, setActivePageSection] = useState<PageEditorSection>('navbar');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [snapshotName, setSnapshotName] = useState('');
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState<string | null>(null);

  // Handlers
  const handlePublish = useCallback(() => {
    publishChanges();
    setShowPublishConfirm(false);
  }, [publishChanges]);

  const handleCreateSnapshot = useCallback(() => {
    if (snapshotName.trim()) {
      createSnapshot(snapshotName.trim());
      setSnapshotName('');
    }
  }, [createSnapshot, snapshotName]);

  const handleRestore = useCallback((type: string) => {
    switch (type) {
      case 'navbar':
        restoreComponent('navbar');
        break;
      case 'hero':
        restoreComponent('hero');
        break;
      case 'dashboard':
        restoreDashboardLayout();
        break;
      case 'page':
        restorePage(activePage);
        break;
      case 'defaults':
        restoreDefaults();
        break;
      case 'published':
        restoreLastPublished();
        break;
    }
    setShowRestoreConfirm(null);
  }, [restoreComponent, restorePage, restoreDashboardLayout, restoreDefaults, restoreLastPublished, activePage]);

  // Sidebar Navigation
  const sidebarItems = [
    { id: 'pages', icon: Layout, label: 'Pages', labelAr: 'الصفحات' },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', labelAr: 'لوحة التحكم' },
    { id: 'reports', icon: FileText, label: 'Reports', labelAr: 'التقارير' },
    { id: 'ai-chat', icon: MessageSquare, label: 'AI Chat', labelAr: 'محادثة AI' },
    { id: 'global', icon: Palette, label: 'Global Style', labelAr: 'الأنماط العامة' },
    { id: 'snapshots', icon: History, label: 'Snapshots', labelAr: 'النسخ' },
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

  // Render Page Editor
  const renderPageEditor = () => (
    <div className="space-y-4">
      {/* Page Selector */}
      <SelectField
        label="Select Page"
        labelAr="اختر الصفحة"
        value={activePage}
        onChange={setActivePage}
        options={pageOptions}
      />

      {/* Section Tabs */}
      <div className="flex gap-1 p-1 bg-slate-800/50 rounded-lg">
        {(['navbar', 'hero', 'sections', 'style'] as const).map(section => (
          <button
            key={section}
            onClick={() => setActivePageSection(section)}
            className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activePageSection === section
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {section === 'navbar' && (isRTL ? 'القائمة' : 'Navbar')}
            {section === 'hero' && (isRTL ? 'الهيرو' : 'Hero')}
            {section === 'sections' && (isRTL ? 'الأقسام' : 'Sections')}
            {section === 'style' && (isRTL ? 'الأنماط' : 'Style')}
          </button>
        ))}
      </div>

      {/* Navbar Editor */}
      {activePageSection === 'navbar' && (
        <div className="space-y-3">
          <AccordionSection title="Logo" titleAr="الشعار" icon={Sparkles} defaultOpen>
            <InputField
              label="Logo Text"
              labelAr="نص الشعار"
              value={draftConfig.navbar.logo.text}
              onChange={(v) => updateDraft('navbar.logo.text', v)}
            />
            <ToggleRow
              label="Visible"
              labelAr="مرئي"
              checked={draftConfig.navbar.logo.visible}
              onChange={(v) => updateDraft('navbar.logo.visible', v)}
            />
          </AccordionSection>

          <AccordionSection title="Navigation Items" titleAr="عناصر التنقل" icon={Navigation} defaultOpen>
            <div className="space-y-2">
              {draftConfig.navbar.items
                .sort((a, b) => a.order - b.order)
                .map((item, idx) => (
                  <DraggableItem
                    key={item.id}
                    visible={item.visible}
                    canMoveUp={idx > 0}
                    canMoveDown={idx < draftConfig.navbar.items.length - 1}
                    onMoveUp={() => {
                      const items = [...draftConfig.navbar.items].sort((a, b) => a.order - b.order);
                      if (idx > 0) {
                        const temp = items[idx].order;
                        items[idx].order = items[idx - 1].order;
                        items[idx - 1].order = temp;
                        updateDraft('navbar.items', items);
                      }
                    }}
                    onMoveDown={() => {
                      const items = [...draftConfig.navbar.items].sort((a, b) => a.order - b.order);
                      if (idx < items.length - 1) {
                        const temp = items[idx].order;
                        items[idx].order = items[idx + 1].order;
                        items[idx + 1].order = temp;
                        updateDraft('navbar.items', items);
                      }
                    }}
                    onToggleVisibility={() => {
                      const items = [...draftConfig.navbar.items];
                      const itemIdx = items.findIndex(i => i.id === item.id);
                      items[itemIdx].visible = !items[itemIdx].visible;
                      updateDraft('navbar.items', items);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={isRTL ? item.label.ar : item.label.en}
                        onChange={(e) => {
                          const items = [...draftConfig.navbar.items];
                          const itemIdx = items.findIndex(i => i.id === item.id);
                          if (isRTL) {
                            items[itemIdx].label.ar = e.target.value;
                          } else {
                            items[itemIdx].label.en = e.target.value;
                          }
                          updateDraft('navbar.items', items);
                        }}
                        className="flex-1 px-2 py-1 bg-slate-700/50 border border-slate-600 rounded text-xs text-white"
                      />
                    </div>
                  </DraggableItem>
                ))}
            </div>
          </AccordionSection>

          <AccordionSection title="CTA Button" titleAr="زر الدعوة" icon={Box}>
            <InputField
              label={isRTL ? 'النص (عربي)' : 'Text (Arabic)'}
              labelAr="النص (عربي)"
              value={draftConfig.navbar.ctaButton?.text.ar || ''}
              onChange={(v) => updateDraft('navbar.ctaButton.text.ar', v)}
            />
            <InputField
              label={isRTL ? 'النص (انجليزي)' : 'Text (English)'}
              labelAr="النص (انجليزي)"
              value={draftConfig.navbar.ctaButton?.text.en || ''}
              onChange={(v) => updateDraft('navbar.ctaButton.text.en', v)}
            />
            <SelectField
              label="Variant"
              labelAr="النوع"
              value={draftConfig.navbar.ctaButton?.variant || 'primary'}
              onChange={(v) => updateDraft('navbar.ctaButton.variant', v)}
              options={[
                { value: 'primary', label: 'Primary', labelAr: 'أساسي' },
                { value: 'secondary', label: 'Secondary', labelAr: 'ثانوي' },
                { value: 'outline', label: 'Outline', labelAr: 'محدد' },
                { value: 'ghost', label: 'Ghost', labelAr: 'شفاف' },
              ]}
            />
            <SelectField
              label="Size"
              labelAr="الحجم"
              value={draftConfig.navbar.ctaButton?.size || 'md'}
              onChange={(v) => updateDraft('navbar.ctaButton.size', v)}
              options={[
                { value: 'sm', label: 'Small', labelAr: 'صغير' },
                { value: 'md', label: 'Medium', labelAr: 'متوسط' },
                { value: 'lg', label: 'Large', labelAr: 'كبير' },
              ]}
            />
            <ToggleRow
              label="Visible"
              labelAr="مرئي"
              checked={draftConfig.navbar.ctaButton?.visible ?? true}
              onChange={(v) => updateDraft('navbar.ctaButton.visible', v)}
            />
          </AccordionSection>

          {/* Restore Navbar */}
          <button
            onClick={() => setShowRestoreConfirm('navbar')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isRTL ? 'استعادة القائمة' : 'Restore Navbar'}</span>
          </button>
        </div>
      )}

      {/* Hero Editor */}
      {activePageSection === 'hero' && (
        <div className="space-y-3">
          <AccordionSection title="Headline" titleAr="العنوان الرئيسي" icon={Type} defaultOpen>
            <InputField
              label="Arabic"
              labelAr="عربي"
              value={draftConfig.hero.headline.text.ar}
              onChange={(v) => updateDraft('hero.headline.text.ar', v)}
            />
            <InputField
              label="English"
              labelAr="انجليزي"
              value={draftConfig.hero.headline.text.en}
              onChange={(v) => updateDraft('hero.headline.text.en', v)}
            />
            <SelectField
              label="Font Size"
              labelAr="حجم الخط"
              value={draftConfig.hero.headline.fontSize || '4xl'}
              onChange={(v) => updateDraft('hero.headline.fontSize', v)}
              options={[
                { value: 'xl', label: 'XL', labelAr: 'XL' },
                { value: '2xl', label: '2XL', labelAr: '2XL' },
                { value: '3xl', label: '3XL', labelAr: '3XL' },
                { value: '4xl', label: '4XL', labelAr: '4XL' },
                { value: '5xl', label: '5XL', labelAr: '5XL' },
                { value: '6xl', label: '6XL', labelAr: '6XL' },
              ]}
            />
            <SelectField
              label="Font Weight"
              labelAr="سمك الخط"
              value={draftConfig.hero.headline.fontWeight || 'bold'}
              onChange={(v) => updateDraft('hero.headline.fontWeight', v)}
              options={[
                { value: 'normal', label: 'Normal', labelAr: 'عادي' },
                { value: 'medium', label: 'Medium', labelAr: 'متوسط' },
                { value: 'semibold', label: 'Semibold', labelAr: 'شبه سميك' },
                { value: 'bold', label: 'Bold', labelAr: 'سميك' },
                { value: 'extrabold', label: 'Extra Bold', labelAr: 'سميك جداً' },
              ]}
            />
            <ToggleRow
              label="Visible"
              labelAr="مرئي"
              checked={draftConfig.hero.headline.visible ?? true}
              onChange={(v) => updateDraft('hero.headline.visible', v)}
            />
          </AccordionSection>

          <AccordionSection title="Subheadline" titleAr="العنوان الفرعي" icon={Type}>
            <InputField
              label="Arabic"
              labelAr="عربي"
              value={draftConfig.hero.subheadline.text.ar}
              onChange={(v) => updateDraft('hero.subheadline.text.ar', v)}
            />
            <InputField
              label="English"
              labelAr="انجليزي"
              value={draftConfig.hero.subheadline.text.en}
              onChange={(v) => updateDraft('hero.subheadline.text.en', v)}
            />
            <ToggleRow
              label="Visible"
              labelAr="مرئي"
              checked={draftConfig.hero.subheadline.visible ?? true}
              onChange={(v) => updateDraft('hero.subheadline.visible', v)}
            />
          </AccordionSection>

          <AccordionSection title="CTA Button" titleAr="الزر الرئيسي" icon={Box}>
            <InputField
              label="Arabic"
              labelAr="عربي"
              value={draftConfig.hero.ctaButton.text.ar}
              onChange={(v) => updateDraft('hero.ctaButton.text.ar', v)}
            />
            <InputField
              label="English"
              labelAr="انجليزي"
              value={draftConfig.hero.ctaButton.text.en}
              onChange={(v) => updateDraft('hero.ctaButton.text.en', v)}
            />
            <SelectField
              label="Variant"
              labelAr="النوع"
              value={draftConfig.hero.ctaButton.variant || 'primary'}
              onChange={(v) => updateDraft('hero.ctaButton.variant', v)}
              options={[
                { value: 'primary', label: 'Primary', labelAr: 'أساسي' },
                { value: 'secondary', label: 'Secondary', labelAr: 'ثانوي' },
                { value: 'outline', label: 'Outline', labelAr: 'محدد' },
              ]}
            />
            <SelectField
              label="Size"
              labelAr="الحجم"
              value={draftConfig.hero.ctaButton.size || 'lg'}
              onChange={(v) => updateDraft('hero.ctaButton.size', v)}
              options={[
                { value: 'sm', label: 'Small', labelAr: 'صغير' },
                { value: 'md', label: 'Medium', labelAr: 'متوسط' },
                { value: 'lg', label: 'Large', labelAr: 'كبير' },
              ]}
            />
            <ToggleRow
              label="Visible"
              labelAr="مرئي"
              checked={draftConfig.hero.ctaButton.visible ?? true}
              onChange={(v) => updateDraft('hero.ctaButton.visible', v)}
            />
          </AccordionSection>

          <AccordionSection title="Secondary Button" titleAr="الزر الثانوي" icon={Box}>
            <InputField
              label="Arabic"
              labelAr="عربي"
              value={draftConfig.hero.secondaryButton?.text.ar || ''}
              onChange={(v) => updateDraft('hero.secondaryButton.text.ar', v)}
            />
            <InputField
              label="English"
              labelAr="انجليزي"
              value={draftConfig.hero.secondaryButton?.text.en || ''}
              onChange={(v) => updateDraft('hero.secondaryButton.text.en', v)}
            />
            <ToggleRow
              label="Visible"
              labelAr="مرئي"
              checked={draftConfig.hero.secondaryButton?.visible ?? true}
              onChange={(v) => updateDraft('hero.secondaryButton.visible', v)}
            />
          </AccordionSection>

          <AccordionSection title="Audience Cards" titleAr="بطاقات الجمهور" icon={Layers}>
            <div className="space-y-2">
              {draftConfig.hero.audienceCards
                .sort((a, b) => a.order - b.order)
                .map((card, idx) => (
                  <DraggableItem
                    key={card.id}
                    visible={card.visible}
                    canMoveUp={idx > 0}
                    canMoveDown={idx < draftConfig.hero.audienceCards.length - 1}
                    onMoveUp={() => {
                      const cards = [...draftConfig.hero.audienceCards].sort((a, b) => a.order - b.order);
                      if (idx > 0) {
                        const temp = cards[idx].order;
                        cards[idx].order = cards[idx - 1].order;
                        cards[idx - 1].order = temp;
                        updateDraft('hero.audienceCards', cards);
                      }
                    }}
                    onMoveDown={() => {
                      const cards = [...draftConfig.hero.audienceCards].sort((a, b) => a.order - b.order);
                      if (idx < cards.length - 1) {
                        const temp = cards[idx].order;
                        cards[idx].order = cards[idx + 1].order;
                        cards[idx + 1].order = temp;
                        updateDraft('hero.audienceCards', cards);
                      }
                    }}
                    onToggleVisibility={() => {
                      const cards = [...draftConfig.hero.audienceCards];
                      const cardIdx = cards.findIndex(c => c.id === card.id);
                      cards[cardIdx].visible = !cards[cardIdx].visible;
                      updateDraft('hero.audienceCards', cards);
                    }}
                  >
                    <div className="text-xs text-slate-300">{isRTL ? card.title.ar : card.title.en}</div>
                  </DraggableItem>
                ))}
            </div>
          </AccordionSection>

          {/* Restore Hero */}
          <button
            onClick={() => setShowRestoreConfirm('hero')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isRTL ? 'استعادة الهيرو' : 'Restore Hero'}</span>
          </button>
        </div>
      )}

      {/* Sections Editor */}
      {activePageSection === 'sections' && activePage !== 'home' && (
        <div className="space-y-3">
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
        </div>
      )}

      {activePageSection === 'sections' && activePage === 'home' && (
        <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
          <p className="text-sm text-slate-400">
            {isRTL ? 'الصفحة الرئيسية محمية ولا يمكن تعديل ترتيب أقسامها' : 'Homepage is protected. Section order cannot be modified.'}
          </p>
        </div>
      )}

      {/* Style Editor */}
      {activePageSection === 'style' && (
        <div className="space-y-3">
          <AccordionSection title="Page Background" titleAr="خلفية الصفحة" icon={Image} defaultOpen>
            <ColorPicker
              label="Background Color"
              labelAr="لون الخلفية"
              value={draftConfig.pages[activePage]?.style?.backgroundColor || draftConfig.global.backgroundColor}
              onChange={(v) => updateDraft(`pages.${activePage}.style.backgroundColor`, v)}
            />
          </AccordionSection>

          <AccordionSection title="Typography" titleAr="الخطوط" icon={Type}>
            <SelectField
              label="Text Alignment"
              labelAr="محاذاة النص"
              value={draftConfig.pages[activePage]?.style?.alignment || 'center'}
              onChange={(v) => updateDraft(`pages.${activePage}.style.alignment`, v)}
              options={[
                { value: 'left', label: 'Left', labelAr: 'يسار' },
                { value: 'center', label: 'Center', labelAr: 'وسط' },
                { value: 'right', label: 'Right', labelAr: 'يمين' },
              ]}
            />
          </AccordionSection>

          <AccordionSection title="Spacing" titleAr="المسافات" icon={Box}>
            <InputField
              label="Padding"
              labelAr="الحشو"
              value={draftConfig.pages[activePage]?.style?.padding || '0'}
              onChange={(v) => updateDraft(`pages.${activePage}.style.padding`, v)}
            />
            <InputField
              label="Gap"
              labelAr="الفجوة"
              value={draftConfig.pages[activePage]?.style?.gap || '0'}
              onChange={(v) => updateDraft(`pages.${activePage}.style.gap`, v)}
            />
          </AccordionSection>
        </div>
      )}
    </div>
  );

  // Render Dashboard Editor
  const renderDashboardEditor = () => (
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

      {/* Widget Settings */}
      {draftConfig.dashboard.widgets.length > 0 && (
        <AccordionSection title="Widget Settings" titleAr="إعدادات العناصر" icon={Settings}>
          {draftConfig.dashboard.widgets.map(widget => (
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
                <>
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
                      { value: 'bar', label: 'Bar', labelAr: 'عمودي' },
                      { value: 'pie', label: 'Pie', labelAr: 'دائري' },
                      { value: 'area', label: 'Area', labelAr: 'منطقة' },
                      { value: 'donut', label: 'Donut', labelAr: 'حلقي' },
                    ]}
                  />
                  <ToggleRow
                    label="Show Legend"
                    labelAr="إظهار الدليل"
                    checked={widget.showLegend ?? true}
                    onChange={(v) => {
                      const widgets = [...draftConfig.dashboard.widgets];
                      const wIdx = widgets.findIndex(w => w.id === widget.id);
                      widgets[wIdx].showLegend = v;
                      updateDraft('dashboard.widgets', widgets);
                    }}
                  />
                  <ToggleRow
                    label="Show Labels"
                    labelAr="إظهار التسميات"
                    checked={widget.showLabels ?? true}
                    onChange={(v) => {
                      const widgets = [...draftConfig.dashboard.widgets];
                      const wIdx = widgets.findIndex(w => w.id === widget.id);
                      widgets[wIdx].showLabels = v;
                      updateDraft('dashboard.widgets', widgets);
                    }}
                  />
                </>
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
                  { value: '4', label: 'Full Width', labelAr: 'عرض كامل' },
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
        <span>{isRTL ? 'استعادة لوحة التحكم' : 'Restore Dashboard Layout'}</span>
      </button>
    </div>
  );

  // Render Reports Editor
  const renderReportsEditor = () => (
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
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 capitalize">{block.type}</span>
                  {block.title && (
                    <span className="text-xs text-slate-500">({isRTL ? block.title.ar : block.title.en})</span>
                  )}
                </div>
              </DraggableItem>
            ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Block Settings" titleAr="إعدادات الكتل" icon={Settings}>
        {draftConfig.reports.blocks.map(block => (
          <div key={block.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-2">
            <div className="text-xs font-medium text-white capitalize">{block.type}</div>
            {block.title && (
              <>
                <InputField
                  label="Title (Arabic)"
                  labelAr="العنوان (عربي)"
                  value={block.title.ar}
                  onChange={(v) => {
                    const blocks = [...draftConfig.reports.blocks];
                    const bIdx = blocks.findIndex(b => b.id === block.id);
                    if (blocks[bIdx].title) {
                      blocks[bIdx].title!.ar = v;
                    }
                    updateDraft('reports.blocks', blocks);
                  }}
                />
                <InputField
                  label="Title (English)"
                  labelAr="العنوان (انجليزي)"
                  value={block.title.en}
                  onChange={(v) => {
                    const blocks = [...draftConfig.reports.blocks];
                    const bIdx = blocks.findIndex(b => b.id === block.id);
                    if (blocks[bIdx].title) {
                      blocks[bIdx].title!.en = v;
                    }
                    updateDraft('reports.blocks', blocks);
                  }}
                />
              </>
            )}
          </div>
        ))}
      </AccordionSection>

      <AccordionSection title="Print Settings" titleAr="إعدادات الطباعة" icon={FileText}>
        <ToggleRow
          label="Show Header"
          labelAr="إظهار الترويسة"
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

  // Render AI Chat Editor
  const renderAIChatEditor = () => (
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
      </AccordionSection>

      <AccordionSection title="Assistant Label" titleAr="تسمية المساعد" icon={Sparkles}>
        <InputField
          label="Arabic"
          labelAr="عربي"
          value={draftConfig.aiChat.assistantLabel.ar}
          onChange={(v) => updateDraft('aiChat.assistantLabel.ar', v)}
        />
        <InputField
          label="English"
          labelAr="انجليزي"
          value={draftConfig.aiChat.assistantLabel.en}
          onChange={(v) => updateDraft('aiChat.assistantLabel.en', v)}
        />
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

      <AccordionSection title="Suggested Prompts" titleAr="المقترحات" icon={Type}>
        <div className="space-y-2">
          {draftConfig.aiChat.suggestedPrompts.map((prompt, idx) => (
            <div key={idx} className="p-2 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-2">
              <InputField
                label={`Prompt ${idx + 1} (Arabic)`}
                labelAr={`مقترح ${idx + 1} (عربي)`}
                value={prompt.ar}
                onChange={(v) => {
                  const prompts = [...draftConfig.aiChat.suggestedPrompts];
                  prompts[idx].ar = v;
                  updateDraft('aiChat.suggestedPrompts', prompts);
                }}
              />
              <InputField
                label={`Prompt ${idx + 1} (English)`}
                labelAr={`مقترح ${idx + 1} (انجليزي)`}
                value={prompt.en}
                onChange={(v) => {
                  const prompts = [...draftConfig.aiChat.suggestedPrompts];
                  prompts[idx].en = v;
                  updateDraft('aiChat.suggestedPrompts', prompts);
                }}
              />
              <button
                onClick={() => {
                  const prompts = draftConfig.aiChat.suggestedPrompts.filter((_, i) => i !== idx);
                  updateDraft('aiChat.suggestedPrompts', prompts);
                }}
                className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3 h-3" />
                <span>{isRTL ? 'حذف' : 'Delete'}</span>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const prompts = [...draftConfig.aiChat.suggestedPrompts, { ar: '', en: '' }];
            updateDraft('aiChat.suggestedPrompts', prompts);
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm text-blue-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إضافة مقترح' : 'Add Prompt'}</span>
        </button>
      </AccordionSection>

      <AccordionSection title="Helper Blocks" titleAr="كتل المساعدة" icon={Layers}>
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
    </div>
  );

  // Render Global Style Editor
  const renderGlobalEditor = () => (
    <div className="space-y-4">
      <AccordionSection title="Colors" titleAr="الألوان" icon={Palette} defaultOpen>
        <ColorPicker
          label="Primary Color"
          labelAr="اللون الأساسي"
          value={draftConfig.global.primaryColor}
          onChange={(v) => updateDraft('global.primaryColor', v)}
        />
        <ColorPicker
          label="Secondary Color"
          labelAr="اللون الثانوي"
          value={draftConfig.global.secondaryColor}
          onChange={(v) => updateDraft('global.secondaryColor', v)}
        />
        <ColorPicker
          label="Accent Color"
          labelAr="لون التمييز"
          value={draftConfig.global.accentColor}
          onChange={(v) => updateDraft('global.accentColor', v)}
        />
        <ColorPicker
          label="Background Color"
          labelAr="لون الخلفية"
          value={draftConfig.global.backgroundColor}
          onChange={(v) => updateDraft('global.backgroundColor', v)}
        />
        <ColorPicker
          label="Text Color"
          labelAr="لون النص"
          value={draftConfig.global.textColor}
          onChange={(v) => updateDraft('global.textColor', v)}
        />
      </AccordionSection>

      <AccordionSection title="Typography" titleAr="الخطوط" icon={Type}>
        <InputField
          label="Body Font"
          labelAr="خط النص"
          value={draftConfig.global.fontFamily}
          onChange={(v) => updateDraft('global.fontFamily', v)}
        />
        <InputField
          label="Heading Font"
          labelAr="خط العناوين"
          value={draftConfig.global.headingFontFamily}
          onChange={(v) => updateDraft('global.headingFontFamily', v)}
        />
      </AccordionSection>

      <AccordionSection title="Shape" titleAr="الشكل" icon={Box}>
        <InputField
          label="Border Radius"
          labelAr="نصف قطر الحدود"
          value={draftConfig.global.borderRadius}
          onChange={(v) => updateDraft('global.borderRadius', v)}
        />
        <SelectField
          label="Shadow Intensity"
          labelAr="شدة الظل"
          value={draftConfig.global.shadowIntensity}
          onChange={(v) => updateDraft('global.shadowIntensity', v)}
          options={[
            { value: 'none', label: 'None', labelAr: 'بدون' },
            { value: 'sm', label: 'Small', labelAr: 'صغير' },
            { value: 'md', label: 'Medium', labelAr: 'متوسط' },
            { value: 'lg', label: 'Large', labelAr: 'كبير' },
            { value: 'xl', label: 'Extra Large', labelAr: 'كبير جداً' },
          ]}
        />
      </AccordionSection>

      {/* Restore Defaults */}
      <button
        onClick={() => setShowRestoreConfirm('defaults')}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-sm text-amber-400 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span>{isRTL ? 'استعادة الإعدادات الافتراضية' : 'Restore Defaults'}</span>
      </button>
    </div>
  );

  // Render Snapshots
  const renderSnapshots = () => (
    <div className="space-y-4">
      {/* Create Snapshot */}
      <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Camera className="w-4 h-4 text-blue-400" />
          <span>{isRTL ? 'إنشاء نسخة جديدة' : 'Create New Snapshot'}</span>
        </div>
        <InputField
          label="Snapshot Name"
          labelAr="اسم النسخة"
          value={snapshotName}
          onChange={setSnapshotName}
          placeholder={isRTL ? 'أدخل اسم النسخة...' : 'Enter snapshot name...'}
        />
        <button
          onClick={handleCreateSnapshot}
          disabled={!snapshotName.trim()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-white font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إنشاء نسخة' : 'Create Snapshot'}</span>
        </button>
      </div>

      {/* Snapshots List */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 font-medium px-1">
          {isRTL ? 'النسخ المحفوظة' : 'Saved Snapshots'} ({snapshots.length})
        </div>
        {snapshots.length === 0 ? (
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
            <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">
              {isRTL ? 'لا توجد نسخ محفوظة' : 'No snapshots saved'}
            </p>
          </div>
        ) : (
          snapshots.map(snapshot => (
            <div key={snapshot.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white">{snapshot.name}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(snapshot.timestamp).toLocaleString(isRTL ? 'ar-EG' : 'en-US')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => revertToSnapshot(snapshot.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded text-xs text-blue-400"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isRTL ? 'استعادة' : 'Revert'}</span>
                </button>
                <button
                  onClick={() => duplicateSnapshot(snapshot.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded text-xs text-slate-300"
                >
                  <Copy className="w-3 h-3" />
                  <span>{isRTL ? 'نسخ' : 'Duplicate'}</span>
                </button>
                <button
                  onClick={() => deleteSnapshot(snapshot.id)}
                  className="flex items-center justify-center p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Restore Last Published */}
      <button
        onClick={() => setShowRestoreConfirm('published')}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span>{isRTL ? 'استعادة آخر نسخة منشورة' : 'Restore Last Published'}</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="text-sm font-black text-white">HORUS AI</div>
                <div className="text-[10px] text-slate-500">Admin Studio</div>
              </div>
            )}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as EditorTab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">{isRTL ? item.labelAr : item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-slate-800">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-4">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white">
              {sidebarItems.find(i => i.id === activeTab)?.[isRTL ? 'labelAr' : 'label']}
            </h1>
            {hasUnsavedChanges && (
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                {isRTL ? 'تغييرات غير محفوظة' : 'Unsaved Changes'}
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Device Preview */}
            <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-lg">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Toggle */}
            <button
              onClick={() => setPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isPreviewMode
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isPreviewMode ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isPreviewMode ? (isRTL ? 'معاينة' : 'Preview') : (isRTL ? 'تعديل' : 'Edit')}</span>
            </button>

            {/* Save Draft */}
            <button
              onClick={saveDraft}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isRTL ? 'حفظ المسودة' : 'Save Draft'}</span>
            </button>

            {/* Discard */}
            {hasUnsavedChanges && (
              <button
                onClick={discardDraft}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                <span>{isRTL ? 'تجاهل' : 'Discard'}</span>
              </button>
            )}

            {/* Publish */}
            <button
              onClick={() => setShowPublishConfirm(true)}
              disabled={!hasUnsavedChanges}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-white font-medium transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>{isRTL ? 'نشر' : 'Publish'}</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Inspector Panel */}
          <aside className="w-80 bg-slate-900/30 border-r border-slate-800 overflow-y-auto">
            <div className="p-4 space-y-4">
              {activeTab === 'pages' && renderPageEditor()}
              {activeTab === 'dashboard' && renderDashboardEditor()}
              {activeTab === 'reports' && renderReportsEditor()}
              {activeTab === 'ai-chat' && renderAIChatEditor()}
              {activeTab === 'global' && renderGlobalEditor()}
              {activeTab === 'snapshots' && renderSnapshots()}
            </div>
          </aside>

          {/* Preview Area */}
          <main className="flex-1 bg-slate-950 p-6 overflow-auto">
            <div className={`mx-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl ${
              previewDevice === 'desktop' ? 'max-w-6xl' : previewDevice === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
            }`}>
              {/* Preview Header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="px-3 py-1 bg-slate-700/50 rounded text-xs text-slate-400 text-center">
                    horus-ai.app/{activePage === 'home' ? '' : activePage}
                  </div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="h-[600px] overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white fill-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isPreviewMode 
                      ? (isRTL ? 'وضع المعاينة' : 'Preview Mode')
                      : (isRTL ? 'وضع التعديل' : 'Edit Mode')
                    }
                  </h2>
                  <p className="text-slate-400 text-sm mb-4">
                    {isPreviewMode
                      ? (isRTL ? 'معاينة التغييرات المنشورة' : 'Viewing published changes')
                      : (isRTL ? 'تعديل المسودة الحالية' : 'Editing current draft')
                    }
                  </p>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-left">
                    <div className="text-xs text-slate-500 mb-2">{isRTL ? 'الصفحة النشطة:' : 'Active Page:'}</div>
                    <div className="text-sm text-white font-medium">
                      {pageOptions.find(p => p.value === activePage)?.[isRTL ? 'labelAr' : 'label']}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Upload className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{isRTL ? 'نشر التغييرات' : 'Publish Changes'}</h3>
                <p className="text-sm text-slate-400">{isRTL ? 'هل أنت متأكد من نشر هذه التغييرات؟' : 'Are you sure you want to publish these changes?'}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPublishConfirm(false)}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 font-medium transition-colors"
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm text-white font-medium transition-colors"
              >
                {isRTL ? 'نشر' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {showRestoreConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{isRTL ? 'استعادة' : 'Restore'}</h3>
                <p className="text-sm text-slate-400">{isRTL ? 'سيتم استبدال التغييرات الحالية' : 'Current changes will be replaced'}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRestoreConfirm(null)}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 font-medium transition-colors"
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => handleRestore(showRestoreConfirm)}
                className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm text-white font-medium transition-colors"
              >
                {isRTL ? 'استعادة' : 'Restore'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
