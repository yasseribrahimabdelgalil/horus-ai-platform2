import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types for the admin configuration system
export interface StyleConfig {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  shadow?: string;
  width?: string;
  height?: string;
  gap?: string;
  alignment?: 'left' | 'center' | 'right';
  // Responsive
  desktop?: Partial<StyleConfig>;
  tablet?: Partial<StyleConfig>;
  mobile?: Partial<StyleConfig>;
}

export interface ButtonConfig extends StyleConfig {
  text: { ar: string; en: string };
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  visible?: boolean;
}

export interface TextConfig extends StyleConfig {
  text: { ar: string; en: string };
  visible?: boolean;
}

export interface CardConfig extends StyleConfig {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  icon?: string;
  visible?: boolean;
}

export interface SectionConfig {
  id: string;
  type: string;
  order: number;
  visible: boolean;
  style?: StyleConfig;
  content?: Record<string, unknown>;
}

export interface WidgetConfig {
  id: string;
  type: 'kpi' | 'chart' | 'table' | 'insights';
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'donut';
  title: { ar: string; en: string };
  subtitle?: { ar: string; en: string };
  metric?: string;
  dimension?: string;
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
  sorting?: 'asc' | 'desc';
  showLegend?: boolean;
  showLabels?: boolean;
  order: number;
  visible: boolean;
  width?: 1 | 2 | 3 | 4;
  height?: 1 | 2;
  style?: StyleConfig;
}

export interface ReportBlockConfig {
  id: string;
  type: 'header' | 'summary' | 'metrics' | 'insights' | 'recommendations' | 'footer';
  title?: { ar: string; en: string };
  content?: { ar: string; en: string };
  order: number;
  visible: boolean;
  style?: StyleConfig;
}

export interface AIChatConfig {
  introText: { ar: string; en: string };
  suggestedPrompts: Array<{ ar: string; en: string }>;
  emptyStateText: { ar: string; en: string };
  assistantLabel: { ar: string; en: string };
  helperBlocks: Array<{
    id: string;
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    visible: boolean;
  }>;
}

export interface NavbarConfig {
  logo: { text: string; visible: boolean };
  items: Array<{
    id: string;
    label: { ar: string; en: string };
    page: string;
    visible: boolean;
    order: number;
  }>;
  style?: StyleConfig;
  ctaButton?: ButtonConfig;
}

export interface HeroConfig {
  headline: TextConfig;
  subheadline: TextConfig;
  ctaButton: ButtonConfig;
  secondaryButton?: ButtonConfig;
  audienceCards: Array<CardConfig & { id: string; page: string; order: number }>;
  style?: StyleConfig;
}

export interface PageConfig {
  id: string;
  title: { ar: string; en: string };
  sections: SectionConfig[];
  style?: StyleConfig;
}

export interface AdminConfig {
  navbar: NavbarConfig;
  hero: HeroConfig;
  pages: Record<string, PageConfig>;
  dashboard: {
    widgets: WidgetConfig[];
    style?: StyleConfig;
  };
  reports: {
    blocks: ReportBlockConfig[];
    headerVisible: boolean;
    footerVisible: boolean;
    printLayout: 'portrait' | 'landscape';
    style?: StyleConfig;
  };
  aiChat: AIChatConfig;
  global: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    headingFontFamily: string;
    borderRadius: string;
    shadowIntensity: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  };
}

export interface Snapshot {
  id: string;
  name: string;
  timestamp: number;
  config: AdminConfig;
}

interface AdminContextType {
  // State
  draftConfig: AdminConfig;
  publishedConfig: AdminConfig;
  snapshots: Snapshot[];
  isPreviewMode: boolean;
  hasUnsavedChanges: boolean;
  selectedElement: string | null;
  
  // Draft operations
  updateDraft: (path: string, value: unknown) => void;
  updateDraftDeep: (updates: Partial<AdminConfig>) => void;
  
  // Publish operations
  saveDraft: () => void;
  publishChanges: () => void;
  discardDraft: () => void;
  
  // Restore operations
  restoreField: (path: string) => void;
  restoreComponent: (componentId: string) => void;
  restoreSection: (pageId: string, sectionId: string) => void;
  restorePage: (pageId: string) => void;
  restoreDashboardLayout: () => void;
  restoreDefaults: () => void;
  restoreLastPublished: () => void;
  
  // Snapshot operations
  createSnapshot: (name: string) => void;
  duplicateSnapshot: (snapshotId: string) => void;
  revertToSnapshot: (snapshotId: string) => void;
  deleteSnapshot: (snapshotId: string) => void;
  renameSnapshot: (snapshotId: string, newName: string) => void;
  
  // Preview
  setPreviewMode: (enabled: boolean) => void;
  
  // Selection
  setSelectedElement: (elementId: string | null) => void;
  
  // Get active config (draft in edit mode, published in preview)
  getActiveConfig: () => AdminConfig;
}

// Default configuration
const defaultConfig: AdminConfig = {
  navbar: {
    logo: { text: 'HORUS AI', visible: true },
    items: [
      { id: 'home', label: { ar: 'الرئيسية', en: 'Home' }, page: 'home', visible: true, order: 0 },
      { id: 'companies', label: { ar: 'للشركات', en: 'For Companies' }, page: 'companies', visible: true, order: 1 },
      { id: 'individuals', label: { ar: 'للأفراد', en: 'Individuals' }, page: 'individuals', visible: true, order: 2 },
      { id: 'bloggers', label: { ar: 'للبلوجر', en: 'Bloggers' }, page: 'bloggers', visible: true, order: 3 },
      { id: 'sellers', label: { ar: 'لتجار أونلاين', en: 'Online Sellers' }, page: 'online-sellers', visible: true, order: 4 },
      { id: 'pricing', label: { ar: 'الأسعار', en: 'Pricing' }, page: 'pricing', visible: true, order: 5 },
      { id: 'blog', label: { ar: 'المدونة', en: 'Blog' }, page: 'blog', visible: true, order: 6 },
      { id: 'contact', label: { ar: 'تواصل معنا', en: 'Contact' }, page: 'contact', visible: true, order: 7 },
    ],
    ctaButton: {
      text: { ar: 'ابدأ مجاناً', en: 'Start Free' },
      variant: 'primary',
      size: 'md',
      visible: true,
    },
  },
  hero: {
    headline: {
      text: { ar: 'حوّل بياناتك إلى قرارات ذكية', en: 'Transform Your Data Into Smart Decisions' },
      fontSize: '4xl',
      fontWeight: 'bold',
      visible: true,
    },
    subheadline: {
      text: { ar: 'منصة ذكاء اصطناعي متكاملة لتحليل البيانات', en: 'AI-powered platform for data analytics' },
      fontSize: 'xl',
      visible: true,
    },
    ctaButton: {
      text: { ar: 'ابدأ مجاناً', en: 'Start Free' },
      variant: 'primary',
      size: 'lg',
      visible: true,
    },
    secondaryButton: {
      text: { ar: 'شاهد العرض', en: 'Watch Demo' },
      variant: 'outline',
      size: 'lg',
      visible: true,
    },
    audienceCards: [
      { id: 'companies', title: { ar: 'الشركات', en: 'Companies' }, description: { ar: 'تحليلات متقدمة', en: 'Advanced analytics' }, page: 'companies', order: 0, visible: true },
      { id: 'individuals', title: { ar: 'الأفراد', en: 'Individuals' }, description: { ar: 'تحليل شخصي', en: 'Personal analytics' }, page: 'individuals', order: 1, visible: true },
      { id: 'bloggers', title: { ar: 'البلوجر', en: 'Bloggers' }, description: { ar: 'فهم جمهورك', en: 'Understand audience' }, page: 'bloggers', order: 2, visible: true },
      { id: 'sellers', title: { ar: 'تجار أونلاين', en: 'Online Sellers' }, description: { ar: 'زيادة المبيعات', en: 'Boost sales' }, page: 'online-sellers', order: 3, visible: true },
    ],
  },
  pages: {
    companies: {
      id: 'companies',
      title: { ar: 'للشركات', en: 'For Companies' },
      sections: [
        { id: 'hero', type: 'hero', order: 0, visible: true },
        { id: 'benefits', type: 'benefits', order: 1, visible: true },
        { id: 'cta', type: 'cta', order: 2, visible: true },
      ],
    },
    individuals: {
      id: 'individuals',
      title: { ar: 'للأفراد', en: 'For Individuals' },
      sections: [
        { id: 'hero', type: 'hero', order: 0, visible: true },
        { id: 'benefits', type: 'benefits', order: 1, visible: true },
        { id: 'cta', type: 'cta', order: 2, visible: true },
      ],
    },
    bloggers: {
      id: 'bloggers',
      title: { ar: 'للبلوجر', en: 'For Bloggers' },
      sections: [
        { id: 'hero', type: 'hero', order: 0, visible: true },
        { id: 'benefits', type: 'benefits', order: 1, visible: true },
        { id: 'cta', type: 'cta', order: 2, visible: true },
      ],
    },
    sellers: {
      id: 'sellers',
      title: { ar: 'لتجار أونلاين', en: 'For Online Sellers' },
      sections: [
        { id: 'hero', type: 'hero', order: 0, visible: true },
        { id: 'benefits', type: 'benefits', order: 1, visible: true },
        { id: 'cta', type: 'cta', order: 2, visible: true },
      ],
    },
  },
  dashboard: {
    widgets: [
      { id: 'revenue', type: 'kpi', title: { ar: 'الإيرادات', en: 'Revenue' }, metric: 'revenue', order: 0, visible: true, width: 1 },
      { id: 'users', type: 'kpi', title: { ar: 'المستخدمين', en: 'Users' }, metric: 'users', order: 1, visible: true, width: 1 },
      { id: 'orders', type: 'kpi', title: { ar: 'الطلبات', en: 'Orders' }, metric: 'orders', order: 2, visible: true, width: 1 },
      { id: 'growth', type: 'kpi', title: { ar: 'النمو', en: 'Growth' }, metric: 'growth', order: 3, visible: true, width: 1 },
      { id: 'revenue-chart', type: 'chart', chartType: 'line', title: { ar: 'اتجاه الإيرادات', en: 'Revenue Trend' }, metric: 'revenue', dimension: 'date', order: 4, visible: true, width: 2, showLegend: true, showLabels: true },
      { id: 'sales-pie', type: 'chart', chartType: 'pie', title: { ar: 'توزيع المبيعات', en: 'Sales Distribution' }, metric: 'sales', dimension: 'category', order: 5, visible: true, width: 2, showLegend: true },
      { id: 'products-table', type: 'table', title: { ar: 'أداء المنتجات', en: 'Product Performance' }, order: 6, visible: true, width: 4 },
      { id: 'insights', type: 'insights', title: { ar: 'رؤى ذكية', en: 'Smart Insights' }, order: 7, visible: true, width: 4 },
    ],
  },
  reports: {
    blocks: [
      { id: 'header', type: 'header', title: { ar: 'تقرير تنفيذي', en: 'Executive Report' }, order: 0, visible: true },
      { id: 'summary', type: 'summary', title: { ar: 'ملخص تنفيذي', en: 'Executive Summary' }, order: 1, visible: true },
      { id: 'metrics', type: 'metrics', title: { ar: 'المؤشرات الرئيسية', en: 'Key Metrics' }, order: 2, visible: true },
      { id: 'insights', type: 'insights', title: { ar: 'الرؤى', en: 'Insights' }, order: 3, visible: true },
      { id: 'recommendations', type: 'recommendations', title: { ar: 'التوصيات', en: 'Recommendations' }, order: 4, visible: true },
      { id: 'footer', type: 'footer', order: 5, visible: true },
    ],
    headerVisible: true,
    footerVisible: true,
    printLayout: 'portrait',
  },
  aiChat: {
    introText: { ar: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟', en: 'Hello! I am your AI assistant. How can I help you today?' },
    suggestedPrompts: [
      { ar: 'حلل أداء المبيعات هذا الشهر', en: 'Analyze sales performance this month' },
      { ar: 'ما هي أفضل المنتجات أداءً؟', en: 'What are the top performing products?' },
      { ar: 'قارن الإيرادات بالربع السابق', en: 'Compare revenue to last quarter' },
      { ar: 'أنشئ تقريراً تنفيذياً', en: 'Generate an executive report' },
    ],
    emptyStateText: { ar: 'ابدأ محادثة جديدة مع المساعد الذكي', en: 'Start a new conversation with the AI assistant' },
    assistantLabel: { ar: 'مساعد HORUS', en: 'HORUS Assistant' },
    helperBlocks: [
      { id: 'quick-analysis', title: { ar: 'تحليل سريع', en: 'Quick Analysis' }, description: { ar: 'احصل على تحليل فوري لبياناتك', en: 'Get instant analysis of your data' }, visible: true },
      { id: 'reports', title: { ar: 'التقارير', en: 'Reports' }, description: { ar: 'أنشئ تقارير مخصصة', en: 'Generate custom reports' }, visible: true },
      { id: 'insights', title: { ar: 'الرؤى', en: 'Insights' }, description: { ar: 'اكتشف رؤى مخفية', en: 'Discover hidden insights' }, visible: true },
    ],
  },
  global: {
    primaryColor: '#2563eb',
    secondaryColor: '#0891b2',
    accentColor: '#f59e0b',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '12px',
    shadowIntensity: 'lg',
  },
};

const AdminContext = createContext<AdminContextType | null>(null);

// Helper to deep clone objects
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Helper to set nested value by path
function setByPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

// Helper to get nested value by path
function getByPath(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  // Load initial state from localStorage
  const [draftConfig, setDraftConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('horus_admin_draft');
    return saved ? JSON.parse(saved) : deepClone(defaultConfig);
  });

  const [publishedConfig, setPublishedConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('horus_admin_published');
    return saved ? JSON.parse(saved) : deepClone(defaultConfig);
  });

  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => {
    const saved = localStorage.getItem('horus_admin_snapshots');
    return saved ? JSON.parse(saved) : [];
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // Check for unsaved changes
  const hasUnsavedChanges = JSON.stringify(draftConfig) !== JSON.stringify(publishedConfig);

  // Save to localStorage whenever state changes
  const persistState = useCallback(() => {
    localStorage.setItem('horus_admin_draft', JSON.stringify(draftConfig));
    localStorage.setItem('horus_admin_published', JSON.stringify(publishedConfig));
    localStorage.setItem('horus_admin_snapshots', JSON.stringify(snapshots));
  }, [draftConfig, publishedConfig, snapshots]);

  // Update draft by path
  const updateDraft = useCallback((path: string, value: unknown) => {
    setDraftConfig(prev => {
      const newConfig = deepClone(prev);
      setByPath(newConfig as unknown as Record<string, unknown>, path, value);
      localStorage.setItem('horus_admin_draft', JSON.stringify(newConfig));
      return newConfig;
    });
  }, []);

  // Update draft with deep merge
  const updateDraftDeep = useCallback((updates: Partial<AdminConfig>) => {
    setDraftConfig(prev => {
      const newConfig = { ...deepClone(prev), ...updates };
      localStorage.setItem('horus_admin_draft', JSON.stringify(newConfig));
      return newConfig;
    });
  }, []);

  // Save draft (persist to localStorage)
  const saveDraft = useCallback(() => {
    localStorage.setItem('horus_admin_draft', JSON.stringify(draftConfig));
  }, [draftConfig]);

  // Publish changes
  const publishChanges = useCallback(() => {
    setPublishedConfig(deepClone(draftConfig));
    localStorage.setItem('horus_admin_published', JSON.stringify(draftConfig));
  }, [draftConfig]);

  // Discard draft
  const discardDraft = useCallback(() => {
    setDraftConfig(deepClone(publishedConfig));
    localStorage.setItem('horus_admin_draft', JSON.stringify(publishedConfig));
  }, [publishedConfig]);

  // Restore field from published
  const restoreField = useCallback((path: string) => {
    const publishedValue = getByPath(publishedConfig as unknown as Record<string, unknown>, path);
    updateDraft(path, publishedValue);
  }, [publishedConfig, updateDraft]);

  // Restore component
  const restoreComponent = useCallback((componentId: string) => {
    // Find and restore the component from published config
    if (componentId === 'navbar') {
      updateDraft('navbar', deepClone(publishedConfig.navbar));
    } else if (componentId === 'hero') {
      updateDraft('hero', deepClone(publishedConfig.hero));
    }
  }, [publishedConfig, updateDraft]);

  // Restore section
  const restoreSection = useCallback((pageId: string, sectionId: string) => {
    const publishedSections = publishedConfig.pages[pageId]?.sections || [];
    const section = publishedSections.find(s => s.id === sectionId);
    if (section) {
      setDraftConfig(prev => {
        const newConfig = deepClone(prev);
        const pageIndex = newConfig.pages[pageId]?.sections.findIndex(s => s.id === sectionId);
        if (pageIndex !== undefined && pageIndex >= 0) {
          newConfig.pages[pageId].sections[pageIndex] = deepClone(section);
        }
        localStorage.setItem('horus_admin_draft', JSON.stringify(newConfig));
        return newConfig;
      });
    }
  }, [publishedConfig]);

  // Restore page
  const restorePage = useCallback((pageId: string) => {
    const publishedPage = publishedConfig.pages[pageId];
    if (publishedPage) {
      updateDraft(`pages.${pageId}`, deepClone(publishedPage));
    }
  }, [publishedConfig, updateDraft]);

  // Restore dashboard layout
  const restoreDashboardLayout = useCallback(() => {
    updateDraft('dashboard', deepClone(publishedConfig.dashboard));
  }, [publishedConfig, updateDraft]);

  // Restore defaults
  const restoreDefaults = useCallback(() => {
    setDraftConfig(deepClone(defaultConfig));
    localStorage.setItem('horus_admin_draft', JSON.stringify(defaultConfig));
  }, []);

  // Restore last published
  const restoreLastPublished = useCallback(() => {
    setDraftConfig(deepClone(publishedConfig));
    localStorage.setItem('horus_admin_draft', JSON.stringify(publishedConfig));
  }, [publishedConfig]);

  // Create snapshot
  const createSnapshot = useCallback((name: string) => {
    const snapshot: Snapshot = {
      id: `snapshot_${Date.now()}`,
      name,
      timestamp: Date.now(),
      config: deepClone(draftConfig),
    };
    setSnapshots(prev => {
      const newSnapshots = [...prev, snapshot];
      localStorage.setItem('horus_admin_snapshots', JSON.stringify(newSnapshots));
      return newSnapshots;
    });
  }, [draftConfig]);

  // Duplicate snapshot
  const duplicateSnapshot = useCallback((snapshotId: string) => {
    const original = snapshots.find(s => s.id === snapshotId);
    if (original) {
      const duplicate: Snapshot = {
        id: `snapshot_${Date.now()}`,
        name: `${original.name} (copy)`,
        timestamp: Date.now(),
        config: deepClone(original.config),
      };
      setSnapshots(prev => {
        const newSnapshots = [...prev, duplicate];
        localStorage.setItem('horus_admin_snapshots', JSON.stringify(newSnapshots));
        return newSnapshots;
      });
    }
  }, [snapshots]);

  // Revert to snapshot
  const revertToSnapshot = useCallback((snapshotId: string) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (snapshot) {
      setDraftConfig(deepClone(snapshot.config));
      localStorage.setItem('horus_admin_draft', JSON.stringify(snapshot.config));
    }
  }, [snapshots]);

  // Delete snapshot
  const deleteSnapshot = useCallback((snapshotId: string) => {
    setSnapshots(prev => {
      const newSnapshots = prev.filter(s => s.id !== snapshotId);
      localStorage.setItem('horus_admin_snapshots', JSON.stringify(newSnapshots));
      return newSnapshots;
    });
  }, []);

  // Rename snapshot
  const renameSnapshot = useCallback((snapshotId: string, newName: string) => {
    setSnapshots(prev => {
      const newSnapshots = prev.map(s => 
        s.id === snapshotId ? { ...s, name: newName } : s
      );
      localStorage.setItem('horus_admin_snapshots', JSON.stringify(newSnapshots));
      return newSnapshots;
    });
  }, []);

  // Set preview mode
  const setPreviewMode = useCallback((enabled: boolean) => {
    setIsPreviewMode(enabled);
  }, []);

  // Get active config
  const getActiveConfig = useCallback(() => {
    return isPreviewMode ? publishedConfig : draftConfig;
  }, [isPreviewMode, draftConfig, publishedConfig]);

  return (
    <AdminContext.Provider
      value={{
        draftConfig,
        publishedConfig,
        snapshots,
        isPreviewMode,
        hasUnsavedChanges,
        selectedElement,
        updateDraft,
        updateDraftDeep,
        saveDraft,
        publishChanges,
        discardDraft,
        restoreField,
        restoreComponent,
        restoreSection,
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
        setSelectedElement,
        getActiveConfig,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export { defaultConfig };
