import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// ============================================================================
// TYPES - Admin Configuration System
// ============================================================================

export interface StyleConfig {
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  shadow?: string;
  width?: string;
  height?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  lineHeight?: string;
  letterSpacing?: string;
  alignment?: 'left' | 'center' | 'right';
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
  visibilityRules?: VisibilityRules;
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
  suggestedPrompts: Array<{ id: string; ar: string; en: string; visible: boolean }>;
  emptyStateText: { ar: string; en: string };
  assistantLabel: { ar: string; en: string };
  helperBlocks: Array<{
    id: string;
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    visible: boolean;
  }>;
}

export interface NavItemConfig {
  id: string;
  label: { ar: string; en: string };
  page: string;
  visible: boolean;
  order: number;
  isExternal?: boolean;
  externalUrl?: string;
}

export interface NavbarConfig {
  logo: { text: string; visible: boolean; imageUrl?: string };
  items: NavItemConfig[];
  style?: StyleConfig;
  ctaButton?: ButtonConfig;
  showAdminEntry?: boolean;
  adminEntryPosition?: 'navbar' | 'footer' | 'hidden';
}

export interface FooterColumnConfig {
  id: string;
  title: { ar: string; en: string };
  links: Array<{
    id: string;
    label: { ar: string; en: string };
    page: string;
    visible: boolean;
    isExternal?: boolean;
    externalUrl?: string;
  }>;
  visible: boolean;
  order: number;
}

export interface FooterConfig {
  columns: FooterColumnConfig[];
  contactInfo: {
    email: string;
    phone: string;
    address: { ar: string; en: string };
  };
  socialLinks: Array<{
    id: string;
    platform: string;
    url: string;
    visible: boolean;
  }>;
  copyright: { ar: string; en: string };
  style?: StyleConfig;
  showAdminEntry?: boolean;
}

export interface HeroConfig {
  headline: TextConfig;
  subheadline: TextConfig;
  ctaButton: ButtonConfig;
  secondaryButton?: ButtonConfig;
  audienceCards: Array<CardConfig & { id: string; page: string; order: number }>;
  style?: StyleConfig;
  backgroundImage?: string;
  backgroundPattern?: string;
}

export interface PageConfig {
  id: string;
  title: { ar: string; en: string };
  sections: SectionConfig[];
  style?: StyleConfig;
  seo?: SEOConfig;
  status?: 'active' | 'hidden' | 'maintenance' | 'draft';
  visibilityRules?: VisibilityRules;
  internalNotes?: string;
  lastModified?: number;
  lastModifiedBy?: string;
}

// ============================================================================
// TEAM & PERMISSIONS
// ============================================================================

export type Role = 'super_admin' | 'admin' | 'editor' | 'viewer' | 'content_manager' | 'support' | 'finance';

export type Permission = 
  | 'view' | 'edit' | 'publish' | 'restore' 
  | 'manage_media' | 'manage_pricing' | 'manage_policies' 
  | 'manage_team' | 'manage_seo' | 'manage_dashboard' 
  | 'manage_reports' | 'manage_ai_chat' | 'manage_settings'
  | 'manage_forms' | 'manage_content' | 'manage_visibility'
  | 'manage_snapshots' | 'manage_trash' | 'bulk_actions';

export interface TeamMember {
  id: string;
  email: string;
  name?: string;
  role: Role;
  status: 'active' | 'suspended' | 'pending';
  invitedAt: number;
  lastActiveAt?: number;
}

export interface PermissionMatrix {
  [role: string]: Permission[];
}

// ============================================================================
// BRAND & MEDIA
// ============================================================================

export interface BrandConfig {
  name: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  headingFontFamily: string;
  borderRadius: string;
  shadowIntensity: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundPatterns: string[];
  iconStyle: 'outline' | 'solid' | 'duotone';
}

export interface MediaAsset {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'icon' | 'background';
  alt?: string;
  title?: string;
  uploadedAt: number;
  usedIn: string[];
}

// ============================================================================
// PRICING & PLANS
// ============================================================================

export interface PlanFeature {
  id: string;
  name: { ar: string; en: string };
  included: boolean;
  limit?: number | 'unlimited';
  visible: boolean;
}

export interface PricingPlan {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  price: {
    monthly: number;
    yearly: number;
  };
  currency: string;
  features: PlanFeature[];
  badge?: { ar: string; en: string };
  visible: boolean;
  order: number;
  audienceSpecificText?: Record<string, { ar: string; en: string }>;
}

export interface LimitsConfig {
  free: {
    dashboards: number;
    reports: number;
    widgets: number;
    aiUsage: number;
    exports: number;
    uploads: number;
    storage: string;
  };
  premium: {
    dashboards: number | 'unlimited';
    reports: number | 'unlimited';
    widgets: number | 'unlimited';
    aiUsage: number | 'unlimited';
    exports: number | 'unlimited';
    uploads: number | 'unlimited';
    storage: string;
  };
}

export interface PaymentConfig {
  displayedCurrency: string;
  supportedCurrencies: string[];
  displayedMethods: string[];
  billingNotes: { ar: string; en: string };
  invoiceLabels: { ar: string; en: string };
  taxLabel: { ar: string; en: string };
  showMonthlyYearlyToggle: boolean;
  paymentInstructions: { ar: string; en: string };
  regionVisibility: Record<string, boolean>;
}

// ============================================================================
// SEO & META
// ============================================================================

export interface SEOConfig {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  ogTitle?: { ar: string; en: string };
  ogDescription?: { ar: string; en: string };
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  robots?: 'index' | 'noindex';
}

// ============================================================================
// FORMS & SUBMISSIONS
// ============================================================================

export interface FormFieldConfig {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';
  label: { ar: string; en: string };
  placeholder?: { ar: string; en: string };
  helperText?: { ar: string; en: string };
  required: boolean;
  visible: boolean;
  order: number;
  options?: Array<{ value: string; label: { ar: string; en: string } }>;
}

export interface FormConfig {
  id: string;
  name: string;
  fields: FormFieldConfig[];
  submitButton: { ar: string; en: string };
  successMessage: { ar: string; en: string };
  errorMessage: { ar: string; en: string };
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, string>;
  status: 'new' | 'in_progress' | 'resolved';
  notes?: string;
  assignedTo?: string;
  submittedAt: number;
}

// ============================================================================
// LEGAL & POLICIES
// ============================================================================

export interface PolicyPage {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  content: { ar: string; en: string };
  visible: boolean;
  lastUpdated: number;
}

// ============================================================================
// VISIBILITY & TOGGLES
// ============================================================================

export interface VisibilityRules {
  audienceTypes?: string[];
  plans?: string[];
  languages?: string[];
  deviceTypes?: ('desktop' | 'tablet' | 'mobile')[];
  loggedInOnly?: boolean;
  roles?: Role[];
}

export interface FeatureToggles {
  blog: boolean;
  pricing: boolean;
  reports: boolean;
  aiChat: boolean;
  audiencePages: boolean;
  exportButtons: boolean;
  supportBlocks: boolean;
  adminEntryButton: boolean;
  announcementBar: boolean;
  maintenanceMode: boolean;
}

// ============================================================================
// ANNOUNCEMENTS & SITE SAFETY
// ============================================================================

export interface AnnouncementConfig {
  visible: boolean;
  text: { ar: string; en: string };
  type: 'info' | 'warning' | 'promo' | 'emergency';
  dismissible: boolean;
  visibilityRules?: VisibilityRules;
}

export interface MaintenanceConfig {
  enabled: boolean;
  message: { ar: string; en: string };
  allowedEmails: string[];
}

// ============================================================================
// TRASH & SOFT DELETE
// ============================================================================

export interface TrashItem {
  id: string;
  type: 'section' | 'block' | 'widget' | 'page' | 'preset';
  data: unknown;
  deletedAt: number;
  deletedBy?: string;
  originalLocation: string;
}

// ============================================================================
// TEMPLATES & PRESETS
// ============================================================================

export interface BlockPreset {
  id: string;
  name: { ar: string; en: string };
  type: 'hero' | 'cta' | 'stats' | 'pricing' | 'widget' | 'section';
  config: unknown;
  createdAt: number;
}

// ============================================================================
// CONTENT WORKFLOW
// ============================================================================

export type ContentStatus = 'draft' | 'in_review' | 'approved' | 'published' | 'rejected' | 'scheduled';

export interface ContentWorkflowItem {
  id: string;
  type: string;
  status: ContentStatus;
  scheduledPublishAt?: number;
  reviewedBy?: string;
  reviewedAt?: number;
  comments?: string;
}

// ============================================================================
// SNAPSHOTS & VERSIONING
// ============================================================================

export interface Snapshot {
  id: string;
  name: string;
  timestamp: number;
  config: AdminConfig;
  createdBy?: string;
}

// ============================================================================
// FAVORITES & QUICK ACCESS
// ============================================================================

export interface FavoriteItem {
  id: string;
  type: 'page' | 'section' | 'setting' | 'widget';
  path: string;
  label: { ar: string; en: string };
}

// ============================================================================
// ACTIVITY & CHANGE TRACKING
// ============================================================================

export interface ActivityLogEntry {
  id: string;
  action: string;
  target: string;
  timestamp: number;
  user?: string;
  details?: string;
}

// ============================================================================
// REDIRECTS & NAVIGATION
// ============================================================================

export interface RedirectRule {
  id: string;
  from: string;
  to: string;
  type: 'permanent' | 'temporary';
  active: boolean;
}

// ============================================================================
// MAIN ADMIN CONFIG
// ============================================================================

export interface AdminConfig {
  // Core
  navbar: NavbarConfig;
  footer: FooterConfig;
  hero: HeroConfig;
  pages: Record<string, PageConfig>;
  
  // Workspaces
  dashboard: {
    widgets: WidgetConfig[];
    presets: Record<string, WidgetConfig[]>;
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
  
  // Brand & Visual
  brand: BrandConfig;
  media: MediaAsset[];
  
  // Pricing & Plans
  pricing: {
    plans: PricingPlan[];
    limits: LimitsConfig;
    payment: PaymentConfig;
    comparisonVisible: boolean;
  };
  
  // Legal
  policies: PolicyPage[];
  
  // Forms
  forms: {
    contact: FormConfig;
    support: FormConfig;
    login: {
      emailLabel: { ar: string; en: string };
      passwordLabel: { ar: string; en: string };
      submitLabel: { ar: string; en: string };
      forgotPasswordLabel: { ar: string; en: string };
    };
    register: {
      nameLabel: { ar: string; en: string };
      emailLabel: { ar: string; en: string };
      passwordLabel: { ar: string; en: string };
      confirmPasswordLabel: { ar: string; en: string };
      submitLabel: { ar: string; en: string };
    };
  };
  
  // SEO
  seo: Record<string, SEOConfig>;
  
  // Visibility & Features
  featureToggles: FeatureToggles;
  
  // Announcements
  announcement: AnnouncementConfig;
  maintenance: MaintenanceConfig;
  
  // Team
  team: TeamMember[];
  adminEmails: string[];
  permissionMatrix: PermissionMatrix;
  
  // Templates
  presets: BlockPreset[];
  
  // Navigation
  redirects: RedirectRule[];
  
  // Metadata
  lastPublished?: number;
  lastModified?: number;
}

// ============================================================================
// ADMIN STATE
// ============================================================================

export interface AdminState {
  // Core configs
  draftConfig: AdminConfig;
  publishedConfig: AdminConfig;
  
  // Snapshots
  snapshots: Snapshot[];
  
  // Trash
  trash: TrashItem[];
  
  // Submissions
  submissions: FormSubmission[];
  
  // Favorites
  favorites: FavoriteItem[];
  
  // Activity
  activityLog: ActivityLogEntry[];
  
  // UI State
  isPreviewMode: boolean;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  hasUnsavedChanges: boolean;
  selectedElement: string | null;
  searchQuery: string;
  currentUser?: { email: string; role: Role };
}

// ============================================================================
// CONTEXT TYPE
// ============================================================================

interface AdminContextType extends AdminState {
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
  compareSnapshots: (snapshotId1: string, snapshotId2: string) => { differences: string[] };
  
  // Trash operations
  moveToTrash: (type: TrashItem['type'], id: string, data: unknown, location: string) => void;
  restoreFromTrash: (trashId: string) => void;
  permanentDelete: (trashId: string) => void;
  emptyTrash: () => void;
  
  // Team operations
  inviteTeamMember: (email: string, role: Role) => void;
  removeTeamMember: (memberId: string) => void;
  updateMemberRole: (memberId: string, role: Role) => void;
  suspendMember: (memberId: string) => void;
  reactivateMember: (memberId: string) => void;
  
  // Favorites operations
  addFavorite: (item: Omit<FavoriteItem, 'id'>) => void;
  removeFavorite: (favoriteId: string) => void;
  
  // Submissions operations
  updateSubmissionStatus: (submissionId: string, status: FormSubmission['status']) => void;
  addSubmissionNote: (submissionId: string, note: string) => void;
  assignSubmission: (submissionId: string, assignee: string) => void;
  
  // Activity operations
  logActivity: (action: string, target: string, details?: string) => void;
  
  // Search
  setSearchQuery: (query: string) => void;
  searchResults: () => Array<{ type: string; id: string; label: string; path: string }>;
  
  // Preview
  setPreviewMode: (enabled: boolean) => void;
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  
  // Selection
  setSelectedElement: (elementId: string | null) => void;
  
  // Export/Import
  exportConfig: () => string;
  importConfig: (configJson: string) => boolean;
  
  // Permissions
  hasPermission: (permission: Permission) => boolean;
  
  // Get active config
  getActiveConfig: () => AdminConfig;
}

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

const defaultPermissionMatrix: PermissionMatrix = {
  super_admin: [
    'view', 'edit', 'publish', 'restore', 'manage_media', 'manage_pricing',
    'manage_policies', 'manage_team', 'manage_seo', 'manage_dashboard',
    'manage_reports', 'manage_ai_chat', 'manage_settings', 'manage_forms',
    'manage_content', 'manage_visibility', 'manage_snapshots', 'manage_trash', 'bulk_actions'
  ],
  admin: [
    'view', 'edit', 'publish', 'restore', 'manage_media', 'manage_pricing',
    'manage_policies', 'manage_seo', 'manage_dashboard', 'manage_reports',
    'manage_ai_chat', 'manage_settings', 'manage_forms', 'manage_content',
    'manage_visibility', 'manage_snapshots', 'manage_trash', 'bulk_actions'
  ],
  editor: [
    'view', 'edit', 'manage_media', 'manage_content', 'manage_seo'
  ],
  viewer: ['view'],
  content_manager: [
    'view', 'edit', 'manage_media', 'manage_content', 'manage_seo', 'manage_forms'
  ],
  support: ['view', 'manage_forms'],
  finance: ['view', 'manage_pricing']
};

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
    showAdminEntry: false,
    adminEntryPosition: 'hidden',
  },
  footer: {
    columns: [
      {
        id: 'platform',
        title: { ar: 'المنصة', en: 'Platform' },
        links: [
          { id: 'home', label: { ar: 'الرئيسية', en: 'Home' }, page: 'home', visible: true },
          { id: 'pricing', label: { ar: 'الأسعار', en: 'Pricing' }, page: 'pricing', visible: true },
          { id: 'blog', label: { ar: 'المدونة', en: 'Blog' }, page: 'blog', visible: true },
        ],
        visible: true,
        order: 0,
      },
      {
        id: 'solutions',
        title: { ar: 'الحلول', en: 'Solutions' },
        links: [
          { id: 'companies', label: { ar: 'للشركات', en: 'Companies' }, page: 'companies', visible: true },
          { id: 'individuals', label: { ar: 'للأفراد', en: 'Individuals' }, page: 'individuals', visible: true },
          { id: 'bloggers', label: { ar: 'للبلوجر', en: 'Bloggers' }, page: 'bloggers', visible: true },
          { id: 'sellers', label: { ar: 'لتجار أونلاين', en: 'Online Sellers' }, page: 'online-sellers', visible: true },
        ],
        visible: true,
        order: 1,
      },
      {
        id: 'legal',
        title: { ar: 'قانوني', en: 'Legal' },
        links: [
          { id: 'privacy', label: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' }, page: 'privacy', visible: true },
          { id: 'terms', label: { ar: 'الشروط والأحكام', en: 'Terms & Conditions' }, page: 'terms', visible: true },
          { id: 'refund', label: { ar: 'سياسة الاسترجاع', en: 'Refund Policy' }, page: 'refund', visible: true },
        ],
        visible: true,
        order: 2,
      },
    ],
    contactInfo: {
      email: 'support@horus-ai.com',
      phone: '+20 123 456 7890',
      address: { ar: 'القاهرة، مصر', en: 'Cairo, Egypt' },
    },
    socialLinks: [
      { id: 'twitter', platform: 'twitter', url: 'https://twitter.com/horusai', visible: true },
      { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/company/horusai', visible: true },
      { id: 'facebook', platform: 'facebook', url: 'https://facebook.com/horusai', visible: true },
    ],
    copyright: { ar: '© 2024 HORUS AI. جميع الحقوق محفوظة.', en: '© 2024 HORUS AI. All rights reserved.' },
    showAdminEntry: false,
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
      status: 'active',
    },
    individuals: {
      id: 'individuals',
      title: { ar: 'للأفراد', en: 'For Individuals' },
      sections: [
        { id: 'hero', type: 'hero', order: 0, visible: true },
        { id: 'benefits', type: 'benefits', order: 1, visible: true },
        { id: 'cta', type: 'cta', order: 2, visible: true },
      ],
      status: 'active',
    },
    bloggers: {
      id: 'bloggers',
      title: { ar: 'للبلوجر', en: 'For Bloggers' },
      sections: [
        { id: 'hero', type: 'hero', order: 0, visible: true },
        { id: 'benefits', type: 'benefits', order: 1, visible: true },
        { id: 'cta', type: 'cta', order: 2, visible: true },
      ],
      status: 'active',
    },
    sellers: {
      id: 'sellers',
      title: { ar: 'لتجار أونلاين', en: 'For Online Sellers' },
      sections: [
        { id: 'hero', type: 'hero', order: 0, visible: true },
        { id: 'benefits', type: 'benefits', order: 1, visible: true },
        { id: 'cta', type: 'cta', order: 2, visible: true },
      ],
      status: 'active',
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
    presets: {},
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
      { id: 'p1', ar: 'حلل أداء المبيعات هذا الشهر', en: 'Analyze sales performance this month', visible: true },
      { id: 'p2', ar: 'ما هي أفضل المنتجات أداءً؟', en: 'What are the top performing products?', visible: true },
      { id: 'p3', ar: 'قارن الإيرادات بالربع السابق', en: 'Compare revenue to last quarter', visible: true },
      { id: 'p4', ar: 'أنشئ تقريراً تنفيذياً', en: 'Generate an executive report', visible: true },
    ],
    emptyStateText: { ar: 'ابدأ محادثة جديدة مع المساعد الذكي', en: 'Start a new conversation with the AI assistant' },
    assistantLabel: { ar: 'مساعد HORUS', en: 'HORUS Assistant' },
    helperBlocks: [
      { id: 'quick-analysis', title: { ar: 'تحليل سريع', en: 'Quick Analysis' }, description: { ar: 'احصل على تحليل فوري لبياناتك', en: 'Get instant analysis of your data' }, visible: true },
      { id: 'reports', title: { ar: 'التقارير', en: 'Reports' }, description: { ar: 'أنشئ تقارير مخصصة', en: 'Generate custom reports' }, visible: true },
      { id: 'insights', title: { ar: 'الرؤى', en: 'Insights' }, description: { ar: 'اكتشف رؤى مخفية', en: 'Discover hidden insights' }, visible: true },
    ],
  },
  brand: {
    name: 'HORUS AI',
    primaryColor: '#2563eb',
    secondaryColor: '#0891b2',
    accentColor: '#f59e0b',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '12px',
    shadowIntensity: 'lg',
    backgroundPatterns: [],
    iconStyle: 'outline',
  },
  media: [],
  pricing: {
    plans: [
      {
        id: 'free',
        name: { ar: 'مجاني', en: 'Free' },
        description: { ar: 'للبدء واستكشاف المنصة', en: 'Get started and explore' },
        price: { monthly: 0, yearly: 0 },
        currency: 'EGP',
        features: [
          { id: 'f1', name: { ar: 'لوحة تحكم واحدة', en: '1 Dashboard' }, included: true, limit: 1, visible: true },
          { id: 'f2', name: { ar: '5 تقارير شهرياً', en: '5 Reports/month' }, included: true, limit: 5, visible: true },
          { id: 'f3', name: { ar: '10 استخدامات AI', en: '10 AI uses' }, included: true, limit: 10, visible: true },
        ],
        visible: true,
        order: 0,
      },
      {
        id: 'premium',
        name: { ar: 'مميز', en: 'Premium' },
        description: { ar: 'للمحترفين والشركات', en: 'For professionals and businesses' },
        price: { monthly: 299, yearly: 2990 },
        currency: 'EGP',
        features: [
          { id: 'f1', name: { ar: 'لوحات تحكم غير محدودة', en: 'Unlimited Dashboards' }, included: true, limit: 'unlimited', visible: true },
          { id: 'f2', name: { ar: 'تقارير غير محدودة', en: 'Unlimited Reports' }, included: true, limit: 'unlimited', visible: true },
          { id: 'f3', name: { ar: 'AI غير محدود', en: 'Unlimited AI' }, included: true, limit: 'unlimited', visible: true },
          { id: 'f4', name: { ar: 'دعم أولوية', en: 'Priority Support' }, included: true, visible: true },
        ],
        badge: { ar: 'الأفضل قيمة', en: 'Best Value' },
        visible: true,
        order: 1,
      },
    ],
    limits: {
      free: {
        dashboards: 1,
        reports: 5,
        widgets: 10,
        aiUsage: 10,
        exports: 3,
        uploads: 5,
        storage: '100MB',
      },
      premium: {
        dashboards: 'unlimited',
        reports: 'unlimited',
        widgets: 'unlimited',
        aiUsage: 'unlimited',
        exports: 'unlimited',
        uploads: 'unlimited',
        storage: '10GB',
      },
    },
    payment: {
      displayedCurrency: 'EGP',
      supportedCurrencies: ['EGP', 'USD'],
      displayedMethods: ['card', 'bank_transfer', 'vodafone_cash', 'instapay'],
      billingNotes: { ar: 'يتم الدفع شهرياً أو سنوياً', en: 'Billed monthly or yearly' },
      invoiceLabels: { ar: 'فاتورة', en: 'Invoice' },
      taxLabel: { ar: 'ضريبة القيمة المضافة', en: 'VAT' },
      showMonthlyYearlyToggle: true,
      paymentInstructions: { ar: 'اتبع التعليمات لإتمام الدفع', en: 'Follow instructions to complete payment' },
      regionVisibility: { EG: true, SA: true, AE: true },
    },
    comparisonVisible: true,
  },
  policies: [
    {
      id: 'privacy',
      slug: 'privacy',
      title: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
      content: { ar: 'محتوى سياسة الخصوصية...', en: 'Privacy policy content...' },
      visible: true,
      lastUpdated: Date.now(),
    },
    {
      id: 'terms',
      slug: 'terms',
      title: { ar: 'الشروط والأحكام', en: 'Terms & Conditions' },
      content: { ar: 'محتوى الشروط والأحكام...', en: 'Terms and conditions content...' },
      visible: true,
      lastUpdated: Date.now(),
    },
    {
      id: 'refund',
      slug: 'refund',
      title: { ar: 'سياسة الاسترجاع', en: 'Refund Policy' },
      content: { ar: 'محتوى سياسة الاسترجاع...', en: 'Refund policy content...' },
      visible: true,
      lastUpdated: Date.now(),
    },
  ],
  forms: {
    contact: {
      id: 'contact',
      name: 'Contact Form',
      fields: [
        { id: 'name', type: 'text', label: { ar: 'الاسم', en: 'Name' }, placeholder: { ar: 'اسمك الكامل', en: 'Your full name' }, required: true, visible: true, order: 0 },
        { id: 'email', type: 'email', label: { ar: 'البريد الإلكتروني', en: 'Email' }, placeholder: { ar: 'بريدك الإلكتروني', en: 'Your email' }, required: true, visible: true, order: 1 },
        { id: 'message', type: 'textarea', label: { ar: 'الرسالة', en: 'Message' }, placeholder: { ar: 'رسالتك', en: 'Your message' }, required: true, visible: true, order: 2 },
      ],
      submitButton: { ar: 'إرسال', en: 'Send' },
      successMessage: { ar: 'تم إرسال رسالتك بنجاح!', en: 'Message sent successfully!' },
      errorMessage: { ar: 'حدث خطأ. حاول مرة أخرى.', en: 'An error occurred. Please try again.' },
    },
    support: {
      id: 'support',
      name: 'Support Form',
      fields: [
        { id: 'name', type: 'text', label: { ar: 'الاسم', en: 'Name' }, required: true, visible: true, order: 0 },
        { id: 'email', type: 'email', label: { ar: 'البريد الإلكتروني', en: 'Email' }, required: true, visible: true, order: 1 },
        { id: 'subject', type: 'text', label: { ar: 'الموضوع', en: 'Subject' }, required: true, visible: true, order: 2 },
        { id: 'message', type: 'textarea', label: { ar: 'الرسالة', en: 'Message' }, required: true, visible: true, order: 3 },
      ],
      submitButton: { ar: 'إرسال الطلب', en: 'Submit Request' },
      successMessage: { ar: 'تم استلام طلبك!', en: 'Request received!' },
      errorMessage: { ar: 'حدث خطأ. حاول مرة أخرى.', en: 'An error occurred. Please try again.' },
    },
    login: {
      emailLabel: { ar: 'البريد الإلكتروني', en: 'Email' },
      passwordLabel: { ar: 'كلمة المرور', en: 'Password' },
      submitLabel: { ar: 'تسجيل الدخول', en: 'Login' },
      forgotPasswordLabel: { ar: 'نسيت كلمة المرور؟', en: 'Forgot password?' },
    },
    register: {
      nameLabel: { ar: 'الاسم', en: 'Name' },
      emailLabel: { ar: 'البريد الإلكتروني', en: 'Email' },
      passwordLabel: { ar: 'كلمة المرور', en: 'Password' },
      confirmPasswordLabel: { ar: 'تأكيد كلمة المرور', en: 'Confirm Password' },
      submitLabel: { ar: 'إنشاء حساب', en: 'Create Account' },
    },
  },
  seo: {
    home: {
      title: { ar: 'HORUS AI - منصة الذكاء الاصطناعي للتحليلات', en: 'HORUS AI - AI Analytics Platform' },
      description: { ar: 'حوّل بياناتك إلى قرارات ذكية مع HORUS AI', en: 'Transform your data into smart decisions with HORUS AI' },
    },
  },
  featureToggles: {
    blog: true,
    pricing: true,
    reports: true,
    aiChat: true,
    audiencePages: true,
    exportButtons: true,
    supportBlocks: true,
    adminEntryButton: false,
    announcementBar: false,
    maintenanceMode: false,
  },
  announcement: {
    visible: false,
    text: { ar: '', en: '' },
    type: 'info',
    dismissible: true,
  },
  maintenance: {
    enabled: false,
    message: { ar: 'الموقع تحت الصيانة. سنعود قريباً!', en: 'Site under maintenance. We will be back soon!' },
    allowedEmails: [],
  },
  team: [],
  adminEmails: [],
  permissionMatrix: defaultPermissionMatrix,
  presets: [],
  redirects: [],
};

// ============================================================================
// HELPERS
// ============================================================================

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

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

// ============================================================================
// CONTEXT
// ============================================================================

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  // Core state
  const [draftConfig, setDraftConfig] = useState<AdminConfig>(() => {
    try {
      const saved = localStorage.getItem('horus_admin_draft');
      return saved ? { ...deepClone(defaultConfig), ...JSON.parse(saved) } : deepClone(defaultConfig);
    } catch {
      return deepClone(defaultConfig);
    }
  });

  const [publishedConfig, setPublishedConfig] = useState<AdminConfig>(() => {
    try {
      const saved = localStorage.getItem('horus_admin_published');
      return saved ? { ...deepClone(defaultConfig), ...JSON.parse(saved) } : deepClone(defaultConfig);
    } catch {
      return deepClone(defaultConfig);
    }
  });

  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => {
    try {
      const saved = localStorage.getItem('horus_admin_snapshots');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [trash, setTrash] = useState<TrashItem[]>(() => {
    try {
      const saved = localStorage.getItem('horus_admin_trash');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [submissions, setSubmissions] = useState<FormSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('horus_admin_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('horus_admin_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('horus_admin_activity');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDeviceState] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser] = useState<{ email: string; role: Role } | undefined>(undefined);

  // Computed
  const hasUnsavedChanges = JSON.stringify(draftConfig) !== JSON.stringify(publishedConfig);

  // Persist state
  useEffect(() => {
    localStorage.setItem('horus_admin_draft', JSON.stringify(draftConfig));
  }, [draftConfig]);

  useEffect(() => {
    localStorage.setItem('horus_admin_published', JSON.stringify(publishedConfig));
  }, [publishedConfig]);

  useEffect(() => {
    localStorage.setItem('horus_admin_snapshots', JSON.stringify(snapshots));
  }, [snapshots]);

  useEffect(() => {
    localStorage.setItem('horus_admin_trash', JSON.stringify(trash));
  }, [trash]);

  useEffect(() => {
    localStorage.setItem('horus_admin_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('horus_admin_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('horus_admin_activity', JSON.stringify(activityLog.slice(-100)));
  }, [activityLog]);

  // Draft operations
  const updateDraft = useCallback((path: string, value: unknown) => {
    setDraftConfig(prev => {
      const newConfig = deepClone(prev);
      setByPath(newConfig as unknown as Record<string, unknown>, path, value);
      return newConfig;
    });
  }, []);

  const updateDraftDeep = useCallback((updates: Partial<AdminConfig>) => {
    setDraftConfig(prev => ({ ...deepClone(prev), ...updates }));
  }, []);

  const saveDraft = useCallback(() => {
    localStorage.setItem('horus_admin_draft', JSON.stringify(draftConfig));
  }, [draftConfig]);

  const publishChanges = useCallback(() => {
    const newConfig = { ...deepClone(draftConfig), lastPublished: Date.now() };
    setPublishedConfig(newConfig);
    setDraftConfig(newConfig);
    localStorage.setItem('horus_admin_published', JSON.stringify(newConfig));
  }, [draftConfig]);

  const discardDraft = useCallback(() => {
    setDraftConfig(deepClone(publishedConfig));
  }, [publishedConfig]);

  // Restore operations
  const restoreField = useCallback((path: string) => {
    const publishedValue = getByPath(publishedConfig as unknown as Record<string, unknown>, path);
    updateDraft(path, publishedValue);
  }, [publishedConfig, updateDraft]);

  const restoreComponent = useCallback((componentId: string) => {
    if (componentId === 'navbar') {
      updateDraft('navbar', deepClone(publishedConfig.navbar));
    } else if (componentId === 'hero') {
      updateDraft('hero', deepClone(publishedConfig.hero));
    } else if (componentId === 'footer') {
      updateDraft('footer', deepClone(publishedConfig.footer));
    }
  }, [publishedConfig, updateDraft]);

  const restoreSection = useCallback((pageId: string, sectionId: string) => {
    const publishedSections = publishedConfig.pages[pageId]?.sections || [];
    const section = publishedSections.find(s => s.id === sectionId);
    if (section) {
      setDraftConfig(prev => {
        const newConfig = deepClone(prev);
        const idx = newConfig.pages[pageId]?.sections.findIndex(s => s.id === sectionId);
        if (idx !== undefined && idx >= 0) {
          newConfig.pages[pageId].sections[idx] = deepClone(section);
        }
        return newConfig;
      });
    }
  }, [publishedConfig]);

  const restorePage = useCallback((pageId: string) => {
    const publishedPage = publishedConfig.pages[pageId];
    if (publishedPage) {
      updateDraft(`pages.${pageId}`, deepClone(publishedPage));
    }
  }, [publishedConfig, updateDraft]);

  const restoreDashboardLayout = useCallback(() => {
    updateDraft('dashboard', deepClone(publishedConfig.dashboard));
  }, [publishedConfig, updateDraft]);

  const restoreDefaults = useCallback(() => {
    setDraftConfig(deepClone(defaultConfig));
  }, []);

  const restoreLastPublished = useCallback(() => {
    setDraftConfig(deepClone(publishedConfig));
  }, [publishedConfig]);

  // Snapshot operations
  const createSnapshot = useCallback((name: string) => {
    const snapshot: Snapshot = {
      id: `snapshot_${Date.now()}`,
      name,
      timestamp: Date.now(),
      config: deepClone(draftConfig),
    };
    setSnapshots(prev => [...prev, snapshot]);
  }, [draftConfig]);

  const duplicateSnapshot = useCallback((snapshotId: string) => {
    const original = snapshots.find(s => s.id === snapshotId);
    if (original) {
      const duplicate: Snapshot = {
        id: `snapshot_${Date.now()}`,
        name: `${original.name} (copy)`,
        timestamp: Date.now(),
        config: deepClone(original.config),
      };
      setSnapshots(prev => [...prev, duplicate]);
    }
  }, [snapshots]);

  const revertToSnapshot = useCallback((snapshotId: string) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (snapshot) {
      setDraftConfig(deepClone(snapshot.config));
    }
  }, [snapshots]);

  const deleteSnapshot = useCallback((snapshotId: string) => {
    setSnapshots(prev => prev.filter(s => s.id !== snapshotId));
  }, []);

  const renameSnapshot = useCallback((snapshotId: string, newName: string) => {
    setSnapshots(prev => prev.map(s => s.id === snapshotId ? { ...s, name: newName } : s));
  }, []);

  const compareSnapshots = useCallback((snapshotId1: string, snapshotId2: string) => {
    const s1 = snapshots.find(s => s.id === snapshotId1);
    const s2 = snapshots.find(s => s.id === snapshotId2);
    const differences: string[] = [];
    if (s1 && s2) {
      const json1 = JSON.stringify(s1.config);
      const json2 = JSON.stringify(s2.config);
      if (json1 !== json2) {
        differences.push('Configuration differs');
      }
    }
    return { differences };
  }, [snapshots]);

  // Trash operations
  const moveToTrash = useCallback((type: TrashItem['type'], id: string, data: unknown, location: string) => {
    const item: TrashItem = {
      id: `trash_${Date.now()}`,
      type,
      data,
      deletedAt: Date.now(),
      originalLocation: location,
    };
    setTrash(prev => [...prev, item]);
  }, []);

  const restoreFromTrash = useCallback((trashId: string) => {
    const item = trash.find(t => t.id === trashId);
    if (item) {
      setTrash(prev => prev.filter(t => t.id !== trashId));
    }
    return item;
  }, [trash]);

  const permanentDelete = useCallback((trashId: string) => {
    setTrash(prev => prev.filter(t => t.id !== trashId));
  }, []);

  const emptyTrash = useCallback(() => {
    setTrash([]);
  }, []);

  // Team operations
  const inviteTeamMember = useCallback((email: string, role: Role) => {
    const member: TeamMember = {
      id: `member_${Date.now()}`,
      email,
      role,
      status: 'pending',
      invitedAt: Date.now(),
    };
    setDraftConfig(prev => ({
      ...prev,
      team: [...prev.team, member],
    }));
  }, []);

  const removeTeamMember = useCallback((memberId: string) => {
    setDraftConfig(prev => ({
      ...prev,
      team: prev.team.filter(m => m.id !== memberId),
    }));
  }, []);

  const updateMemberRole = useCallback((memberId: string, role: Role) => {
    setDraftConfig(prev => ({
      ...prev,
      team: prev.team.map(m => m.id === memberId ? { ...m, role } : m),
    }));
  }, []);

  const suspendMember = useCallback((memberId: string) => {
    setDraftConfig(prev => ({
      ...prev,
      team: prev.team.map(m => m.id === memberId ? { ...m, status: 'suspended' as const } : m),
    }));
  }, []);

  const reactivateMember = useCallback((memberId: string) => {
    setDraftConfig(prev => ({
      ...prev,
      team: prev.team.map(m => m.id === memberId ? { ...m, status: 'active' as const } : m),
    }));
  }, []);

  // Favorites operations
  const addFavorite = useCallback((item: Omit<FavoriteItem, 'id'>) => {
    const favorite: FavoriteItem = { ...item, id: `fav_${Date.now()}` };
    setFavorites(prev => [...prev, favorite]);
  }, []);

  const removeFavorite = useCallback((favoriteId: string) => {
    setFavorites(prev => prev.filter(f => f.id !== favoriteId));
  }, []);

  // Submissions operations
  const updateSubmissionStatus = useCallback((submissionId: string, status: FormSubmission['status']) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status } : s));
  }, []);

  const addSubmissionNote = useCallback((submissionId: string, note: string) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, notes: note } : s));
  }, []);

  const assignSubmission = useCallback((submissionId: string, assignee: string) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, assignedTo: assignee } : s));
  }, []);

  // Activity operations
  const logActivity = useCallback((action: string, target: string, details?: string) => {
    const entry: ActivityLogEntry = {
      id: `activity_${Date.now()}`,
      action,
      target,
      timestamp: Date.now(),
      details,
    };
    setActivityLog(prev => [...prev.slice(-99), entry]);
  }, []);

  // Search
  const searchResults = useCallback(() => {
    if (!searchQuery.trim()) return [];
    const results: Array<{ type: string; id: string; label: string; path: string }> = [];
    const q = searchQuery.toLowerCase();
    
    // Search pages
    Object.keys(draftConfig.pages).forEach(pageId => {
      const page = draftConfig.pages[pageId];
      if (page.title.en.toLowerCase().includes(q) || page.title.ar.includes(q)) {
        results.push({ type: 'page', id: pageId, label: page.title.en, path: `pages.${pageId}` });
      }
    });
    
    // Search widgets
    draftConfig.dashboard.widgets.forEach(widget => {
      if (widget.title.en.toLowerCase().includes(q) || widget.title.ar.includes(q)) {
        results.push({ type: 'widget', id: widget.id, label: widget.title.en, path: `dashboard.widgets.${widget.id}` });
      }
    });
    
    // Search nav items
    draftConfig.navbar.items.forEach(item => {
      if (item.label.en.toLowerCase().includes(q) || item.label.ar.includes(q)) {
        results.push({ type: 'nav', id: item.id, label: item.label.en, path: `navbar.items.${item.id}` });
      }
    });
    
    return results;
  }, [searchQuery, draftConfig]);

  // Preview
  const setPreviewMode = useCallback((enabled: boolean) => {
    setIsPreviewMode(enabled);
  }, []);

  const setPreviewDevice = useCallback((device: 'desktop' | 'tablet' | 'mobile') => {
    setPreviewDeviceState(device);
  }, []);

  // Export/Import
  const exportConfig = useCallback(() => {
    return JSON.stringify({ draft: draftConfig, published: publishedConfig, snapshots }, null, 2);
  }, [draftConfig, publishedConfig, snapshots]);

  const importConfig = useCallback((configJson: string) => {
    try {
      const data = JSON.parse(configJson);
      if (data.draft) setDraftConfig(data.draft);
      if (data.published) setPublishedConfig(data.published);
      if (data.snapshots) setSnapshots(data.snapshots);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Permissions
  const hasPermission = useCallback((permission: Permission) => {
    if (!currentUser) return true; // Allow all if no user context
    const rolePermissions = draftConfig.permissionMatrix[currentUser.role] || [];
    return rolePermissions.includes(permission);
  }, [currentUser, draftConfig.permissionMatrix]);

  // Get active config
  const getActiveConfig = useCallback(() => {
    return isPreviewMode ? publishedConfig : draftConfig;
  }, [isPreviewMode, draftConfig, publishedConfig]);

  return (
    <AdminContext.Provider
      value={{
        // State
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
        selectedElement,
        searchQuery,
        currentUser,
        
        // Draft operations
        updateDraft,
        updateDraftDeep,
        saveDraft,
        publishChanges,
        discardDraft,
        
        // Restore operations
        restoreField,
        restoreComponent,
        restoreSection,
        restorePage,
        restoreDashboardLayout,
        restoreDefaults,
        restoreLastPublished,
        
        // Snapshot operations
        createSnapshot,
        duplicateSnapshot,
        revertToSnapshot,
        deleteSnapshot,
        renameSnapshot,
        compareSnapshots,
        
        // Trash operations
        moveToTrash,
        restoreFromTrash,
        permanentDelete,
        emptyTrash,
        
        // Team operations
        inviteTeamMember,
        removeTeamMember,
        updateMemberRole,
        suspendMember,
        reactivateMember,
        
        // Favorites operations
        addFavorite,
        removeFavorite,
        
        // Submissions operations
        updateSubmissionStatus,
        addSubmissionNote,
        assignSubmission,
        
        // Activity operations
        logActivity,
        
        // Search
        setSearchQuery,
        searchResults,
        
        // Preview
        setPreviewMode,
        setPreviewDevice,
        
        // Selection
        setSelectedElement,
        
        // Export/Import
        exportConfig,
        importConfig,
        
        // Permissions
        hasPermission,
        
        // Get active config
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
