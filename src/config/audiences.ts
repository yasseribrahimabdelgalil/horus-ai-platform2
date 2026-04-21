// ============================================================================
// AUDIENCE CONFIGURATION - Audience-specific settings and features
// ============================================================================

import { AudienceType, PlanType } from '../types/auth';
import { DashboardWidget, ReportBlock, ConnectorType } from '../types/persistence';

// ============================================================================
// AUDIENCE DEFINITIONS
// ============================================================================

export interface AudienceDefinition {
  type: AudienceType;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  features: AudienceFeature[];
  defaultWidgets: DashboardWidget[];
  defaultReportBlocks: ReportBlock[];
  availableConnectors: ConnectorType[];
  planLimitOverrides?: Partial<Record<PlanType, Record<string, number | 'unlimited'>>>;
}

export interface AudienceFeature {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  requiredPlan: PlanType;
  enabled: boolean;
}

// ============================================================================
// COMPANIES AUDIENCE
// ============================================================================

const companiesAudience: AudienceDefinition = {
  type: 'company',
  nameAr: 'الشركات',
  nameEn: 'Companies',
  descriptionAr: 'تحليلات مؤسسية متقدمة، تقارير تنفيذية، ولوحات BI احترافية',
  descriptionEn: 'Advanced enterprise analytics, executive reports, and professional BI dashboards',
  icon: 'building2',
  color: '#2563eb',
  features: [
    {
      id: 'advanced_analytics',
      nameAr: 'تحليلات متقدمة',
      nameEn: 'Advanced Analytics',
      descriptionAr: 'تحليل عميق للبيانات مع ML',
      descriptionEn: 'Deep data analysis with ML',
      icon: 'bar-chart',
      requiredPlan: 'premium',
      enabled: true,
    },
    {
      id: 'executive_reports',
      nameAr: 'تقارير تنفيذية',
      nameEn: 'Executive Reports',
      descriptionAr: 'تقارير جاهزة لمجلس الإدارة',
      descriptionEn: 'Board-ready reports',
      icon: 'file-text',
      requiredPlan: 'free',
      enabled: true,
    },
    {
      id: 'team_workspaces',
      nameAr: 'مساحات عمل الفريق',
      nameEn: 'Team Workspaces',
      descriptionAr: 'تعاون الفريق على التحليلات',
      descriptionEn: 'Team collaboration on analytics',
      icon: 'users',
      requiredPlan: 'premium',
      enabled: true,
    },
    {
      id: 'api_access',
      nameAr: 'وصول API',
      nameEn: 'API Access',
      descriptionAr: 'تكامل مع الأنظمة الخارجية',
      descriptionEn: 'Integration with external systems',
      icon: 'code',
      requiredPlan: 'enterprise',
      enabled: true,
    },
  ],
  defaultWidgets: [
    { id: 'revenue', type: 'kpi', title: { ar: 'الإيرادات', en: 'Revenue' }, metric: 'revenue', order: 0, visible: true, width: 1 },
    { id: 'employees', type: 'kpi', title: { ar: 'الموظفين', en: 'Employees' }, metric: 'employees', order: 1, visible: true, width: 1 },
    { id: 'projects', type: 'kpi', title: { ar: 'المشاريع', en: 'Projects' }, metric: 'projects', order: 2, visible: true, width: 1 },
    { id: 'growth', type: 'kpi', title: { ar: 'النمو', en: 'Growth' }, metric: 'growth', order: 3, visible: true, width: 1 },
    { id: 'revenue-trend', type: 'chart', chartType: 'area', title: { ar: 'اتجاه الإيرادات', en: 'Revenue Trend' }, order: 4, visible: true, width: 2 },
    { id: 'department-performance', type: 'chart', chartType: 'bar', title: { ar: 'أداء الأقسام', en: 'Department Performance' }, order: 5, visible: true, width: 2 },
  ],
  defaultReportBlocks: [
    { id: 'header', type: 'header', title: { ar: 'تقرير تنفيذي', en: 'Executive Report' }, order: 0, visible: true },
    { id: 'summary', type: 'summary', title: { ar: 'ملخص تنفيذي', en: 'Executive Summary' }, order: 1, visible: true },
    { id: 'metrics', type: 'metrics', title: { ar: 'المؤشرات الرئيسية', en: 'Key Metrics' }, order: 2, visible: true },
    { id: 'insights', type: 'insights', title: { ar: 'الرؤى', en: 'Insights' }, order: 3, visible: true },
    { id: 'recommendations', type: 'recommendations', title: { ar: 'التوصيات', en: 'Recommendations' }, order: 4, visible: true },
  ],
  availableConnectors: ['google_analytics', 'webhook', 'api'],
};

// ============================================================================
// INDIVIDUALS AUDIENCE
// ============================================================================

const individualsAudience: AudienceDefinition = {
  type: 'individual',
  nameAr: 'الأفراد',
  nameEn: 'Individuals',
  descriptionAr: 'تحليل بياناتك الشخصية بسهولة واحصل على رؤى قيمة',
  descriptionEn: 'Easily analyze your personal data and gain valuable insights',
  icon: 'user',
  color: '#0891b2',
  features: [
    {
      id: 'personal_insights',
      nameAr: 'رؤى شخصية',
      nameEn: 'Personal Insights',
      descriptionAr: 'تحليل أنماطك الشخصية',
      descriptionEn: 'Analyze your personal patterns',
      icon: 'sparkles',
      requiredPlan: 'free',
      enabled: true,
    },
    {
      id: 'expense_tracking',
      nameAr: 'تتبع النفقات',
      nameEn: 'Expense Tracking',
      descriptionAr: 'تحليل مصاريفك ودخلك',
      descriptionEn: 'Analyze your expenses and income',
      icon: 'wallet',
      requiredPlan: 'free',
      enabled: true,
    },
    {
      id: 'goal_tracking',
      nameAr: 'تتبع الأهداف',
      nameEn: 'Goal Tracking',
      descriptionAr: 'تتبع تقدمك نحو أهدافك',
      descriptionEn: 'Track progress towards your goals',
      icon: 'target',
      requiredPlan: 'premium',
      enabled: true,
    },
  ],
  defaultWidgets: [
    { id: 'total-income', type: 'kpi', title: { ar: 'الدخل الكلي', en: 'Total Income' }, order: 0, visible: true, width: 1 },
    { id: 'total-expenses', type: 'kpi', title: { ar: 'المصروفات', en: 'Expenses' }, order: 1, visible: true, width: 1 },
    { id: 'savings', type: 'kpi', title: { ar: 'المدخرات', en: 'Savings' }, order: 2, visible: true, width: 1 },
    { id: 'budget-health', type: 'kpi', title: { ar: 'صحة الميزانية', en: 'Budget Health' }, order: 3, visible: true, width: 1 },
    { id: 'spending-trend', type: 'chart', chartType: 'line', title: { ar: 'اتجاه الإنفاق', en: 'Spending Trend' }, order: 4, visible: true, width: 2 },
    { id: 'category-breakdown', type: 'chart', chartType: 'pie', title: { ar: 'توزيع الفئات', en: 'Category Breakdown' }, order: 5, visible: true, width: 2 },
  ],
  defaultReportBlocks: [
    { id: 'header', type: 'header', title: { ar: 'تقرير شخصي', en: 'Personal Report' }, order: 0, visible: true },
    { id: 'summary', type: 'summary', title: { ar: 'ملخص', en: 'Summary' }, order: 1, visible: true },
    { id: 'insights', type: 'insights', title: { ar: 'الرؤى', en: 'Insights' }, order: 2, visible: true },
    { id: 'recommendations', type: 'recommendations', title: { ar: 'التوصيات', en: 'Recommendations' }, order: 3, visible: true },
  ],
  availableConnectors: ['google_analytics'],
};

// ============================================================================
// BLOGGERS AUDIENCE
// ============================================================================

const bloggersAudience: AudienceDefinition = {
  type: 'blogger',
  nameAr: 'البلوجر والمؤثرين',
  nameEn: 'Bloggers & Influencers',
  descriptionAr: 'افهم جمهورك، تتبع الأداء، وأنشئ محتوى مدعوماً بالبيانات',
  descriptionEn: 'Understand your audience, track performance, and create data-driven content',
  icon: 'video',
  color: '#ec4899',
  features: [
    {
      id: 'social_analytics',
      nameAr: 'تحليلات السوشيال',
      nameEn: 'Social Analytics',
      descriptionAr: 'تحليل أداء منصات التواصل',
      descriptionEn: 'Analyze social media performance',
      icon: 'share-2',
      requiredPlan: 'free',
      enabled: true,
    },
    {
      id: 'audience_insights',
      nameAr: 'رؤى الجمهور',
      nameEn: 'Audience Insights',
      descriptionAr: 'فهم عميق لجمهورك',
      descriptionEn: 'Deep understanding of your audience',
      icon: 'users',
      requiredPlan: 'premium',
      enabled: true,
    },
    {
      id: 'content_performance',
      nameAr: 'أداء المحتوى',
      nameEn: 'Content Performance',
      descriptionAr: 'تحليل كل منشور وفيديو',
      descriptionEn: 'Analyze every post and video',
      icon: 'trending-up',
      requiredPlan: 'premium',
      enabled: true,
    },
    {
      id: 'competitor_analysis',
      nameAr: 'تحليل المنافسين',
      nameEn: 'Competitor Analysis',
      descriptionAr: 'قارن أداءك بالمنافسين',
      descriptionEn: 'Compare your performance to competitors',
      icon: 'eye',
      requiredPlan: 'enterprise',
      enabled: true,
    },
  ],
  defaultWidgets: [
    { id: 'followers', type: 'kpi', title: { ar: 'المتابعين', en: 'Followers' }, order: 0, visible: true, width: 1 },
    { id: 'engagement', type: 'kpi', title: { ar: 'التفاعل', en: 'Engagement' }, order: 1, visible: true, width: 1 },
    { id: 'views', type: 'kpi', title: { ar: 'المشاهدات', en: 'Views' }, order: 2, visible: true, width: 1 },
    { id: 'growth-rate', type: 'kpi', title: { ar: 'معدل النمو', en: 'Growth Rate' }, order: 3, visible: true, width: 1 },
    { id: 'engagement-trend', type: 'chart', chartType: 'line', title: { ar: 'اتجاه التفاعل', en: 'Engagement Trend' }, order: 4, visible: true, width: 2 },
    { id: 'platform-breakdown', type: 'chart', chartType: 'pie', title: { ar: 'توزيع المنصات', en: 'Platform Breakdown' }, order: 5, visible: true, width: 2 },
    { id: 'top-content', type: 'table', title: { ar: 'أفضل المحتوى', en: 'Top Content' }, order: 6, visible: true, width: 4 },
  ],
  defaultReportBlocks: [
    { id: 'header', type: 'header', title: { ar: 'تقرير أداء المحتوى', en: 'Content Performance Report' }, order: 0, visible: true },
    { id: 'summary', type: 'summary', title: { ar: 'ملخص الأداء', en: 'Performance Summary' }, order: 1, visible: true },
    { id: 'metrics', type: 'metrics', title: { ar: 'مؤشرات الأداء', en: 'Performance Metrics' }, order: 2, visible: true },
    { id: 'insights', type: 'insights', title: { ar: 'رؤى المحتوى', en: 'Content Insights' }, order: 3, visible: true },
    { id: 'recommendations', type: 'recommendations', title: { ar: 'توصيات النمو', en: 'Growth Recommendations' }, order: 4, visible: true },
  ],
  availableConnectors: ['youtube', 'instagram', 'twitter', 'tiktok', 'google_analytics'],
  planLimitOverrides: {
    free: {
      connectors: 1,
    },
    premium: {
      connectors: 5,
    },
  },
};

// ============================================================================
// ONLINE SELLERS AUDIENCE
// ============================================================================

const sellersAudience: AudienceDefinition = {
  type: 'seller',
  nameAr: 'تجار أونلاين',
  nameEn: 'Online Sellers',
  descriptionAr: 'تحليل المبيعات، رصد المخزون، فهم سلوك العملاء',
  descriptionEn: 'Sales analysis, inventory monitoring, understanding customer behavior',
  icon: 'shopping-cart',
  color: '#f59e0b',
  features: [
    {
      id: 'sales_analytics',
      nameAr: 'تحليلات المبيعات',
      nameEn: 'Sales Analytics',
      descriptionAr: 'تتبع وتحليل المبيعات اليومية',
      descriptionEn: 'Track and analyze daily sales',
      icon: 'trending-up',
      requiredPlan: 'free',
      enabled: true,
    },
    {
      id: 'product_performance',
      nameAr: 'أداء المنتجات',
      nameEn: 'Product Performance',
      descriptionAr: 'تحليل أداء كل منتج',
      descriptionEn: 'Analyze each product performance',
      icon: 'package',
      requiredPlan: 'free',
      enabled: true,
    },
    {
      id: 'inventory_alerts',
      nameAr: 'تنبيهات المخزون',
      nameEn: 'Inventory Alerts',
      descriptionAr: 'تنبيهات ذكية للمخزون',
      descriptionEn: 'Smart inventory alerts',
      icon: 'bell',
      requiredPlan: 'premium',
      enabled: true,
    },
    {
      id: 'store_integrations',
      nameAr: 'ربط المتاجر',
      nameEn: 'Store Integrations',
      descriptionAr: 'ربط Shopify, سلة, زد والمزيد',
      descriptionEn: 'Connect Shopify, Salla, Zid and more',
      icon: 'link',
      requiredPlan: 'premium',
      enabled: true,
    },
    {
      id: 'pricing_optimization',
      nameAr: 'تحسين التسعير',
      nameEn: 'Pricing Optimization',
      descriptionAr: 'توصيات AI للتسعير',
      descriptionEn: 'AI pricing recommendations',
      icon: 'dollar-sign',
      requiredPlan: 'premium',
      enabled: true,
    },
    {
      id: 'marketplace_analytics',
      nameAr: 'تحليلات السوق',
      nameEn: 'Marketplace Analytics',
      descriptionAr: 'تحليل أداء Amazon, نون, جوميا',
      descriptionEn: 'Amazon, Noon, Jumia analytics',
      icon: 'globe',
      requiredPlan: 'enterprise',
      enabled: true,
    },
  ],
  defaultWidgets: [
    { id: 'total-sales', type: 'kpi', title: { ar: 'المبيعات', en: 'Total Sales' }, order: 0, visible: true, width: 1 },
    { id: 'orders', type: 'kpi', title: { ar: 'الطلبات', en: 'Orders' }, order: 1, visible: true, width: 1 },
    { id: 'aov', type: 'kpi', title: { ar: 'متوسط الطلب', en: 'AOV' }, order: 2, visible: true, width: 1 },
    { id: 'conversion', type: 'kpi', title: { ar: 'التحويل', en: 'Conversion' }, order: 3, visible: true, width: 1 },
    { id: 'sales-trend', type: 'chart', chartType: 'area', title: { ar: 'اتجاه المبيعات', en: 'Sales Trend' }, order: 4, visible: true, width: 2 },
    { id: 'category-sales', type: 'chart', chartType: 'bar', title: { ar: 'مبيعات الفئات', en: 'Category Sales' }, order: 5, visible: true, width: 2 },
    { id: 'top-products', type: 'table', title: { ar: 'أفضل المنتجات', en: 'Top Products' }, order: 6, visible: true, width: 2 },
    { id: 'low-stock', type: 'table', title: { ar: 'مخزون منخفض', en: 'Low Stock' }, order: 7, visible: true, width: 2 },
  ],
  defaultReportBlocks: [
    { id: 'header', type: 'header', title: { ar: 'تقرير أداء المتجر', en: 'Store Performance Report' }, order: 0, visible: true },
    { id: 'summary', type: 'summary', title: { ar: 'ملخص المبيعات', en: 'Sales Summary' }, order: 1, visible: true },
    { id: 'metrics', type: 'metrics', title: { ar: 'مؤشرات الأداء', en: 'Performance KPIs' }, order: 2, visible: true },
    { id: 'product-analysis', type: 'table', title: { ar: 'تحليل المنتجات', en: 'Product Analysis' }, order: 3, visible: true },
    { id: 'insights', type: 'insights', title: { ar: 'رؤى المبيعات', en: 'Sales Insights' }, order: 4, visible: true },
    { id: 'recommendations', type: 'recommendations', title: { ar: 'التوصيات', en: 'Recommendations' }, order: 5, visible: true },
  ],
  availableConnectors: ['shopify', 'woocommerce', 'salla', 'zid', 'amazon_seller', 'google_analytics'],
  planLimitOverrides: {
    free: {
      products: 50,
      orders_history_days: 30,
    },
    premium: {
      products: 'unlimited',
      orders_history_days: 365,
    },
  },
};

// ============================================================================
// AUDIENCE REGISTRY
// ============================================================================

export const AUDIENCE_DEFINITIONS: Record<AudienceType, AudienceDefinition> = {
  company: companiesAudience,
  individual: individualsAudience,
  blogger: bloggersAudience,
  seller: sellersAudience,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAudienceDefinition(type: AudienceType): AudienceDefinition {
  return AUDIENCE_DEFINITIONS[type];
}

export function getAudienceName(type: AudienceType, lang: 'ar' | 'en'): string {
  const def = AUDIENCE_DEFINITIONS[type];
  return lang === 'ar' ? def.nameAr : def.nameEn;
}

export function getAudienceFeatures(type: AudienceType, plan: PlanType): AudienceFeature[] {
  const def = AUDIENCE_DEFINITIONS[type];
  const planHierarchy: Record<PlanType, number> = { free: 0, premium: 1, enterprise: 2 };
  const userPlanLevel = planHierarchy[plan];
  
  return def.features.filter(f => {
    const featurePlanLevel = planHierarchy[f.requiredPlan];
    return f.enabled && featurePlanLevel <= userPlanLevel;
  });
}

export function getDefaultWidgets(type: AudienceType): DashboardWidget[] {
  return AUDIENCE_DEFINITIONS[type].defaultWidgets;
}

export function getDefaultReportBlocks(type: AudienceType): ReportBlock[] {
  return AUDIENCE_DEFINITIONS[type].defaultReportBlocks;
}

export function getAvailableConnectors(type: AudienceType): ConnectorType[] {
  return AUDIENCE_DEFINITIONS[type].availableConnectors;
}
