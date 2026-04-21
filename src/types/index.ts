// ============================================================================
// TYPES INDEX - Central export for all HORUS AI Platform types
// ============================================================================

// Auth types
export type {
  UserRole,
  AudienceType,
  PlanType,
  UserProfile,
  UserPreferences,
  UserLimits,
  AuthState,
  SessionInfo,
  LoginCredentials,
  RegisterData,
  Permission,
} from './auth';

export {
  ROLE_PERMISSIONS,
  PLAN_LIMITS,
  hasPermission,
  canAccessRoute,
  isAdmin,
  canPersistData,
  getPlanLimit,
} from './auth';

// Persistence types
export type {
  DashboardWidget,
  DashboardState,
  DashboardFilter,
  DashboardSlicer,
  ReportBlock,
  ReportState,
  AIMessage,
  AISession,
  AIWorkspaceSettings,
  UploadMetadata,
  DataAnalysisResult,
  PageSettings,
  SectionSettings,
  WidgetSettings,
  VisibilityRules,
  BrandSettings,
  MediaAsset,
  PricingPlanSettings,
  PaymentSettings,
  ConnectorType,
  ConnectorConfig,
  ConnectorDefinition,
  ExportConfig,
  AdminSnapshot,
  AuditLogEntry,
  TeamMemberAccess,
  SellerDailySales,
  SellerProduct,
  BloggerConnection,
  BloggerContent,
} from './persistence';
