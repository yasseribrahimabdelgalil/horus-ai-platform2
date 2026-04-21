// ============================================================================
// SUPABASE DATABASE TYPES
// Defines the structure for all tables - ready for Supabase integration
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // -----------------------------------------------------------------------
      // USERS TABLE - Extended auth.users with profile data
      // -----------------------------------------------------------------------
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'support' | 'finance' | 'content_manager'
          plan: 'free' | 'premium' | 'enterprise'
          audience_type: 'company' | 'individual' | 'blogger' | 'seller'
          email_verified: boolean
          created_at: string
          updated_at: string
          last_login_at: string | null
          metadata: Json | null
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'support' | 'finance' | 'content_manager'
          plan?: 'free' | 'premium' | 'enterprise'
          audience_type?: 'company' | 'individual' | 'blogger' | 'seller'
          email_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'support' | 'finance' | 'content_manager'
          plan?: 'free' | 'premium' | 'enterprise'
          audience_type?: 'company' | 'individual' | 'blogger' | 'seller'
          email_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          metadata?: Json | null
        }
      }

      // -----------------------------------------------------------------------
      // UPLOADED FILES TABLE
      // -----------------------------------------------------------------------
      uploaded_files: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_type: string
          file_size: number
          storage_path: string | null  // null = not persisted (free users)
          parsed_data: Json | null
          status: 'pending' | 'processing' | 'processed' | 'error'
          expires_at: string | null  // Free users: files expire after X days
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_type: string
          file_size: number
          storage_path?: string | null
          parsed_data?: Json | null
          status?: 'pending' | 'processing' | 'processed' | 'error'
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_type?: string
          file_size?: number
          storage_path?: string | null
          parsed_data?: Json | null
          status?: 'pending' | 'processing' | 'processed' | 'error'
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // -----------------------------------------------------------------------
      // DASHBOARDS TABLE
      // -----------------------------------------------------------------------
      dashboards: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          config: Json
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          config?: Json
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          config?: Json
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // -----------------------------------------------------------------------
      // REPORTS TABLE
      // -----------------------------------------------------------------------
      reports: {
        Row: {
          id: string
          user_id: string
          title: string
          type: 'executive' | 'detailed' | 'summary' | 'custom'
          content: Json
          file_id: string | null
          generated_at: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          type?: 'executive' | 'detailed' | 'summary' | 'custom'
          content?: Json
          file_id?: string | null
          generated_at?: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          type?: 'executive' | 'detailed' | 'summary' | 'custom'
          content?: Json
          file_id?: string | null
          generated_at?: string
          expires_at?: string | null
          created_at?: string
        }
      }

      // -----------------------------------------------------------------------
      // AI CHAT SESSIONS TABLE
      // -----------------------------------------------------------------------
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // -----------------------------------------------------------------------
      // AI CHAT MESSAGES TABLE
      // -----------------------------------------------------------------------
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: 'user' | 'assistant' | 'system'
          content?: string
          metadata?: Json | null
          created_at?: string
        }
      }

      // -----------------------------------------------------------------------
      // USAGE TRACKING TABLE
      // -----------------------------------------------------------------------
      usage_tracking: {
        Row: {
          id: string
          user_id: string
          resource_type: 'dashboard' | 'report' | 'ai_question' | 'export' | 'upload'
          period_start: string
          period_end: string
          count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_type: 'dashboard' | 'report' | 'ai_question' | 'export' | 'upload'
          period_start: string
          period_end: string
          count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_type?: 'dashboard' | 'report' | 'ai_question' | 'export' | 'upload'
          period_start?: string
          period_end?: string
          count?: number
          created_at?: string
          updated_at?: string
        }
      }

      // -----------------------------------------------------------------------
      // ADMIN CONFIGURATION TABLE
      // -----------------------------------------------------------------------
      admin_config: {
        Row: {
          id: string
          key: string
          value: Json
          version: number
          is_published: boolean
          created_at: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          version?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          version?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
          updated_by?: string | null
        }
      }

      // -----------------------------------------------------------------------
      // CONTACT SUBMISSIONS TABLE
      // -----------------------------------------------------------------------
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          status: 'new' | 'in_progress' | 'resolved'
          assigned_to: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          status?: 'new' | 'in_progress' | 'resolved'
          assigned_to?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          status?: 'new' | 'in_progress' | 'resolved'
          assigned_to?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // -----------------------------------------------------------------------
      // SUBSCRIPTIONS TABLE
      // -----------------------------------------------------------------------
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'free' | 'premium' | 'enterprise'
          status: 'active' | 'cancelled' | 'past_due' | 'trialing'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan?: 'free' | 'premium' | 'enterprise'
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: 'free' | 'premium' | 'enterprise'
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      // Add views if needed
    }
    Functions: {
      // Add functions if needed
    }
    Enums: {
      user_role: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'support' | 'finance' | 'content_manager'
      user_plan: 'free' | 'premium' | 'enterprise'
      audience_type: 'company' | 'individual' | 'blogger' | 'seller'
      file_status: 'pending' | 'processing' | 'processed' | 'error'
      report_type: 'executive' | 'detailed' | 'summary' | 'custom'
      message_role: 'user' | 'assistant' | 'system'
      resource_type: 'dashboard' | 'report' | 'ai_question' | 'export' | 'upload'
      submission_status: 'new' | 'in_progress' | 'resolved'
      subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing'
    }
  }
}

// Helper type for table names
export type TableName = keyof Database['public']['Tables']

// Helper type for row data
export type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row']

// Helper type for insert data
export type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert']

// Helper type for update data
export type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update']
