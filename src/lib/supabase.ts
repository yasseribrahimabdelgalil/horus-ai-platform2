import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getEnvConfig } from '../config/platform';

// ============================================================================
// SUPABASE CLIENT - Ready for connection when credentials are provided
// ============================================================================

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;

  const env = getEnvConfig();
  
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    // Return null if Supabase is not configured
    // App will fall back to local storage
    return null;
  }

  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseClient;
}

export function isSupabaseConfigured(): boolean {
  const env = getEnvConfig();
  return !!(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
}

// ============================================================================
// DATABASE TYPES - Supabase-ready table structures
// ============================================================================

export interface Database {
  public: {
    Tables: {
      // User profiles
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          role: string;
          audience_type: string;
          plan: string;
          plan_expires_at: string | null;
          created_at: string;
          last_login_at: string | null;
          email_verified: boolean;
          preferences: Record<string, unknown>;
          limits: Record<string, unknown>;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };

      // Dashboards
      dashboards: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          audience_type: string;
          widgets: Record<string, unknown>[];
          layout: Record<string, unknown>;
          is_draft: boolean;
          is_template: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['dashboards']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['dashboards']['Insert']>;
      };

      // Reports
      reports: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          audience_type: string;
          blocks: Record<string, unknown>[];
          settings: Record<string, unknown>;
          is_draft: boolean;
          print_layout: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reports']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['reports']['Insert']>;
      };

      // AI Chat sessions
      ai_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          messages: Record<string, unknown>[];
          context: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ai_sessions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['ai_sessions']['Insert']>;
      };

      // Data uploads (metadata only - files stored in Blob/S3)
      uploads: {
        Row: {
          id: string;
          user_id: string;
          filename: string;
          file_type: string;
          file_size: number;
          storage_path: string;
          processed: boolean;
          analysis_result: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['uploads']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['uploads']['Insert']>;
      };

      // Page settings (admin-managed)
      page_settings: {
        Row: {
          id: string;
          page_key: string;
          config: Record<string, unknown>;
          published_config: Record<string, unknown> | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Omit<Database['public']['Tables']['page_settings']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['page_settings']['Insert']>;
      };

      // Section settings
      section_settings: {
        Row: {
          id: string;
          page_id: string;
          section_key: string;
          config: Record<string, unknown>;
          order: number;
          visible: boolean;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['section_settings']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['section_settings']['Insert']>;
      };

      // Widget settings
      widget_settings: {
        Row: {
          id: string;
          dashboard_id: string | null;
          report_id: string | null;
          widget_type: string;
          config: Record<string, unknown>;
          order: number;
          visible: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['widget_settings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['widget_settings']['Insert']>;
      };

      // Brand settings
      brand_settings: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          logo_url: string | null;
          favicon_url: string | null;
          colors: Record<string, string>;
          fonts: Record<string, string>;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['brand_settings']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['brand_settings']['Insert']>;
      };

      // Pricing plans
      pricing_plans: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          description_ar: string | null;
          description_en: string | null;
          price_monthly: number;
          price_yearly: number;
          currency: string;
          features: Record<string, unknown>[];
          limits: Record<string, unknown>;
          badge_ar: string | null;
          badge_en: string | null;
          visible: boolean;
          order: number;
        };
        Insert: Omit<Database['public']['Tables']['pricing_plans']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['pricing_plans']['Insert']>;
      };

      // Policy pages
      policy_pages: {
        Row: {
          id: string;
          slug: string;
          title_ar: string;
          title_en: string;
          content_ar: string;
          content_en: string;
          visible: boolean;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['policy_pages']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['policy_pages']['Insert']>;
      };

      // Connectors (integration settings)
      connectors: {
        Row: {
          id: string;
          user_id: string;
          connector_type: string;
          name: string;
          config: Record<string, unknown>;
          credentials_encrypted: string | null;
          is_active: boolean;
          last_sync_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['connectors']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['connectors']['Insert']>;
      };

      // Admin snapshots
      admin_snapshots: {
        Row: {
          id: string;
          name: string;
          config: Record<string, unknown>;
          created_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_snapshots']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['admin_snapshots']['Insert']>;
      };

      // Team access
      team_access: {
        Row: {
          id: string;
          email: string;
          role: string;
          status: string;
          invited_by: string | null;
          invited_at: string;
          last_active_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['team_access']['Row'], 'id' | 'invited_at'>;
        Update: Partial<Database['public']['Tables']['team_access']['Insert']>;
      };

      // Audit log
      audit_log: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          target_type: string;
          target_id: string | null;
          details: Record<string, unknown> | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['audit_log']['Row'], 'id' | 'created_at'>;
        Update: never;
      };

      // ============================================================
      // AUDIENCE-SPECIFIC TABLES
      // ============================================================

      // Online Sellers - Daily sales
      seller_daily_sales: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          total_orders: number;
          total_revenue: number;
          total_items: number;
          currency: string;
          source: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seller_daily_sales']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['seller_daily_sales']['Insert']>;
      };

      // Online Sellers - Product performance
      seller_products: {
        Row: {
          id: string;
          user_id: string;
          external_id: string | null;
          name: string;
          sku: string | null;
          category: string | null;
          price: number;
          cost: number | null;
          total_sold: number;
          total_revenue: number;
          stock_quantity: number | null;
          source: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seller_products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['seller_products']['Insert']>;
      };

      // Bloggers - Social media connections
      blogger_connections: {
        Row: {
          id: string;
          user_id: string;
          platform: string;
          platform_user_id: string | null;
          platform_username: string | null;
          access_token_encrypted: string | null;
          refresh_token_encrypted: string | null;
          token_expires_at: string | null;
          is_active: boolean;
          last_sync_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blogger_connections']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['blogger_connections']['Insert']>;
      };

      // Bloggers - Content analytics
      blogger_content: {
        Row: {
          id: string;
          user_id: string;
          connection_id: string;
          external_id: string;
          content_type: string;
          title: string | null;
          url: string | null;
          views: number;
          likes: number;
          comments: number;
          shares: number;
          engagement_rate: number | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blogger_content']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blogger_content']['Insert']>;
      };
    };
  };
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Tables = Database['public']['Tables'];
export type ProfileRow = Tables['profiles']['Row'];
export type DashboardRow = Tables['dashboards']['Row'];
export type ReportRow = Tables['reports']['Row'];
export type UploadRow = Tables['uploads']['Row'];
export type ConnectorRow = Tables['connectors']['Row'];
