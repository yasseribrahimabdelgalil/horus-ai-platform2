// ============================================================================
// PERSISTENCE TYPES - Supabase-ready data structures for HORUS AI Platform
// ============================================================================

import { AudienceType, PlanType } from './auth';

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'table' | 'insights' | 'custom';
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'donut' | 'scatter';
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
  style?: Record<string, unknown>;
  dataSource?: string;
  filters?: Record<string, unknown>;
}

export interface DashboardState {
  id: string;
  userId: string;
  name: string;
  description?: string;
  audienceType: AudienceType;
  widgets: DashboardWidget[];
  layout: {
    columns: number;
    gap: number;
  };
  filters: DashboardFilter[];
  slicers: DashboardSlicer[];
  isDraft: boolean;
  isTemplate: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface DashboardFilter {
  id: string;
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in' | 'between';
  value: unknown;
}

export interface DashboardSlicer {
  id: string;
  field: string;
  type: 'date-range' | 'select' | 'multi-select' | 'search';
  label: { ar: string; en: string };
  options?: Array<{ value: string; label: { ar: string; en: string } }>;
}

// ============================================================================
// REPORT TYPES
// ============================================================================

export interface ReportBlock {
  id: string;
  type: 'header' | 'summary' | 'metrics' | 'insights' | 'recommendations' | 'chart' | 'table' | 'text' | 'footer';
  title?: { ar: string; en: string };
  content?: { ar: string; en: string };
  order: number;
  visible: boolean;
  style?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface ReportState {
  id: string;
  userId: string;
  name: string;
  description?: string;
  audienceType: AudienceType;
  blocks: ReportBlock[];
  headerVisible: boolean;
  footerVisible: boolean;
  printLayout: 'portrait' | 'landscape';
  isDraft: boolean;
  exportFormats: ('pdf' | 'pptx' | 'print')[];
  createdAt: number;
  updatedAt: number;
}

// ============================================================================
// AI WORKSPACE TYPES
// ============================================================================

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: {
    model?: string;
    tokens?: number;
    latency?: number;
    sources?: string[];
  };
}

export interface AISession {
  id: string;
  userId: string;
  title?: string;
  messages: AIMessage[];
  context?: {
    dashboardId?: string;
    reportId?: string;
    uploadIds?: string[];
    audienceType?: AudienceType;
  };
  createdAt: number;
  updatedAt: number;
}

export interface AIWorkspaceSettings {
  suggestedPrompts: Array<{
    id: string;
    ar: string;
    en: string;
    visible: boolean;
    audienceTypes?: AudienceType[];
  }>;
  helperBlocks: Array<{
    id: string;
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    visible: boolean;
  }>;
  modelPreference?: string;
  temperature?: number;
  maxTokens?: number;
}

// ============================================================================
// UPLOAD / DATA TYPES
// ============================================================================

export interface UploadMetadata {
  id: string;
  userId: string;
  filename: string;
  fileType: 'csv' | 'xlsx' | 'xls' | 'json';
  fileSize: number;
  storagePath: string;
  processed: boolean;
  analysisResult?: DataAnalysisResult;
  createdAt: number;
  expiresAt?: number; // For free users - data expires
}

export interface DataAnalysisResult {
  rowCount: number;
  columnCount: number;
  columns: Array<{
    name: string;
    type: 'string' | 'number' | 'date' | 'boolean';
    nullCount: number;
    uniqueCount: number;
    sampleValues: unknown[];
  }>;
  summary?: {
    insights: string[];
    recommendations: string[];
  };
}

// ============================================================================
// ADMIN / SETTINGS TYPES
// ============================================================================

export interface PageSettings {
  id: string;
  pageKey: string;
  config: Record<string, unknown>;
  publishedConfig?: Record<string, unknown>;
  status: 'draft' | 'published' | 'hidden' | 'maintenance';
  updatedAt: number;
  updatedBy?: string;
}

export interface SectionSettings {
  id: string;
  pageId: string;
  sectionKey: string;
  config: Record<string, unknown>;
  order: number;
  visible: boolean;
  visibilityRules?: VisibilityRules;
  updatedAt: number;
}

export interface WidgetSettings {
  id: string;
  dashboardId?: string;
  reportId?: string;
  widgetType: string;
  config: Record<string, unknown>;
  order: number;
  visible: boolean;
  createdAt: number;
}

export interface VisibilityRules {
  audienceTypes?: AudienceType[];
  plans?: PlanType[];
  languages?: ('ar' | 'en')[];
  deviceTypes?: ('desktop' | 'tablet' | 'mobile')[];
  loggedInOnly?: boolean;
  roles?: string[];
}

// ============================================================================
// BRAND / MEDIA TYPES
// ============================================================================

export interface BrandSettings {
  id: string;
  nameAr: string;
  nameEn: string;
  logoUrl?: string;
  faviconUrl?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  updatedAt: number;
}

export interface MediaAsset {
  id: string;
  userId?: string;
  filename: string;
  url: string;
  type: 'image' | 'icon' | 'document' | 'video';
  mimeType: string;
  size: number;
  alt?: string;
  title?: string;
  usedIn: string[];
  uploadedAt: number;
}

// ============================================================================
// PRICING / PLAN TYPES
// ============================================================================

export interface PricingPlanSettings {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  features: Array<{
    id: string;
    nameAr: string;
    nameEn: string;
    included: boolean;
    limit?: number | 'unlimited';
    visible: boolean;
  }>;
  limits: {
    dashboards: number | 'unlimited';
    reports: number | 'unlimited';
    aiQueries: number | 'unlimited';
    uploads: number | 'unlimited';
    storage: number | 'unlimited';
    exports: number | 'unlimited';
  };
  badgeAr?: string;
  badgeEn?: string;
  visible: boolean;
  order: number;
}

export interface PaymentSettings {
  displayedCurrency: string;
  supportedCurrencies: string[];
  displayedMethods: string[];
  billingNotes: { ar: string; en: string };
  invoiceLabels: { ar: string; en: string };
  taxLabel: { ar: string; en: string };
  taxRate?: number;
  showMonthlyYearlyToggle: boolean;
  paymentInstructions: { ar: string; en: string };
  regionVisibility: Record<string, boolean>;
}

// ============================================================================
// CONNECTOR / INTEGRATION TYPES
// ============================================================================

export type ConnectorType = 
  // E-commerce
  | 'shopify'
  | 'woocommerce'
  | 'salla'
  | 'zid'
  | 'amazon_seller'
  | 'noon_seller'
  | 'jumia_seller'
  // Social Media
  | 'youtube'
  | 'instagram'
  | 'twitter'
  | 'tiktok'
  | 'facebook_page'
  | 'linkedin_page'
  // Analytics
  | 'google_analytics'
  | 'google_search_console'
  // Custom
  | 'webhook'
  | 'api';

export interface ConnectorConfig {
  id: string;
  userId: string;
  connectorType: ConnectorType;
  name: string;
  config: Record<string, unknown>;
  // Credentials are stored encrypted - never exposed to frontend
  credentialsEncrypted?: string;
  isActive: boolean;
  lastSyncAt?: number;
  syncFrequency?: 'hourly' | 'daily' | 'weekly' | 'manual';
  createdAt: number;
}

export interface ConnectorDefinition {
  type: ConnectorType;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  category: 'ecommerce' | 'social' | 'analytics' | 'custom';
  audienceTypes: AudienceType[];
  requiredPlan: PlanType;
  configFields: Array<{
    key: string;
    labelAr: string;
    labelEn: string;
    type: 'text' | 'password' | 'url' | 'select';
    required: boolean;
    options?: Array<{ value: string; label: string }>;
  }>;
}

// ============================================================================
// EXPORT-READY TYPES
// ============================================================================

export interface ExportConfig {
  format: 'pdf' | 'pptx' | 'csv' | 'xlsx' | 'print';
  orientation?: 'portrait' | 'landscape';
  paperSize?: 'a4' | 'letter' | 'a3';
  includeHeader?: boolean;
  includeFooter?: boolean;
  includeLogo?: boolean;
  customHeader?: { ar: string; en: string };
  customFooter?: { ar: string; en: string };
}

// ============================================================================
// SNAPSHOT / VERSIONING TYPES
// ============================================================================

export interface AdminSnapshot {
  id: string;
  name: string;
  config: Record<string, unknown>;
  createdBy?: string;
  createdAt: number;
}

// ============================================================================
// AUDIT / ACTIVITY TYPES
// ============================================================================

export interface AuditLogEntry {
  id: string;
  userId?: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: number;
}

// ============================================================================
// TEAM ACCESS TYPES
// ============================================================================

export interface TeamMemberAccess {
  id: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  invitedBy?: string;
  invitedAt: number;
  lastActiveAt?: number;
}

// ============================================================================
// AUDIENCE-SPECIFIC TYPES
// ============================================================================

// Online Sellers
export interface SellerDailySales {
  id: string;
  userId: string;
  date: string;
  totalOrders: number;
  totalRevenue: number;
  totalItems: number;
  currency: string;
  source?: string;
  createdAt: number;
}

export interface SellerProduct {
  id: string;
  userId: string;
  externalId?: string;
  name: string;
  sku?: string;
  category?: string;
  price: number;
  cost?: number;
  totalSold: number;
  totalRevenue: number;
  stockQuantity?: number;
  source?: string;
  createdAt: number;
  updatedAt: number;
}

// Bloggers
export interface BloggerConnection {
  id: string;
  userId: string;
  platform: string;
  platformUserId?: string;
  platformUsername?: string;
  isActive: boolean;
  lastSyncAt?: number;
  createdAt: number;
}

export interface BloggerContent {
  id: string;
  userId: string;
  connectionId: string;
  externalId: string;
  contentType: 'video' | 'post' | 'story' | 'reel' | 'article';
  title?: string;
  url?: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate?: number;
  publishedAt?: number;
  createdAt: number;
  updatedAt: number;
}
