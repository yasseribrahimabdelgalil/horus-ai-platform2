// ============================================================================
// STORAGE SERVICE - Abstracted storage layer for HORUS AI Platform
// Supports both localStorage (free users) and Supabase (premium users)
// ============================================================================

import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import {
  DashboardState,
  ReportState,
  AISession,
  UploadMetadata,
} from '../types/persistence';
import { PlanType } from '../types/auth';

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  DASHBOARDS: 'horus_dashboards',
  REPORTS: 'horus_reports',
  AI_SESSIONS: 'horus_ai_sessions',
  UPLOADS: 'horus_uploads',
  DRAFT_STATE: 'horus_draft_state',
} as const;

// ============================================================================
// STORAGE STRATEGY INTERFACE
// ============================================================================

interface StorageStrategy {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  list<T>(prefix: string): Promise<T[]>;
}

// ============================================================================
// LOCAL STORAGE STRATEGY (Free Users - Non-persistent)
// ============================================================================

class LocalStorageStrategy implements StorageStrategy {
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async list<T>(prefix: string): Promise<T[]> {
    const results: T[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            results.push(JSON.parse(item));
          }
        } catch {
          // Skip invalid items
        }
      }
    }
    return results;
  }
}

// ============================================================================
// SUPABASE STORAGE STRATEGY (Premium Users - Persistent)
// ============================================================================

class SupabaseStorageStrategy implements StorageStrategy {
  async get<T>(key: string): Promise<T | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    // Parse key to determine table and id
    const [table, id] = this.parseKey(key);
    if (!table || !id) return null;

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[Storage] Supabase get error:', error);
      return null;
    }

    return data as T;
  }

  async set<T>(key: string, value: T): Promise<void> {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const [table, id] = this.parseKey(key);
    if (!table) return;

    const { error } = await supabase
      .from(table)
      .upsert(value as Record<string, unknown>);

    if (error) {
      console.error('[Storage] Supabase set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const [table, id] = this.parseKey(key);
    if (!table || !id) return;

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Storage] Supabase delete error:', error);
    }
  }

  async list<T>(prefix: string): Promise<T[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const table = this.getTableFromPrefix(prefix);
    if (!table) return [];

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Storage] Supabase list error:', error);
      return [];
    }

    return (data || []) as T[];
  }

  private parseKey(key: string): [string | null, string | null] {
    const parts = key.split(':');
    if (parts.length >= 2) {
      return [parts[0], parts[1]];
    }
    return [null, null];
  }

  private getTableFromPrefix(prefix: string): string | null {
    const tableMap: Record<string, string> = {
      'dashboards': 'dashboards',
      'reports': 'reports',
      'ai_sessions': 'ai_sessions',
      'uploads': 'uploads',
    };
    return tableMap[prefix] || null;
  }
}

// ============================================================================
// STORAGE SERVICE CLASS
// ============================================================================

class StorageService {
  private localStrategy = new LocalStorageStrategy();
  private supabaseStrategy = new SupabaseStorageStrategy();

  // Get the appropriate strategy based on plan and configuration
  private getStrategy(plan: PlanType): StorageStrategy {
    // Free users always use local storage
    if (plan === 'free') {
      return this.localStrategy;
    }

    // Premium users use Supabase if configured, otherwise local
    if (isSupabaseConfigured()) {
      return this.supabaseStrategy;
    }

    return this.localStrategy;
  }

  // ============================================================================
  // DASHBOARD OPERATIONS
  // ============================================================================

  async getDashboard(id: string, plan: PlanType): Promise<DashboardState | null> {
    const strategy = this.getStrategy(plan);
    return strategy.get<DashboardState>(`dashboards:${id}`);
  }

  async saveDashboard(dashboard: DashboardState, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    await strategy.set(`dashboards:${dashboard.id}`, {
      ...dashboard,
      updatedAt: Date.now(),
    });
  }

  async deleteDashboard(id: string, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    await strategy.delete(`dashboards:${id}`);
  }

  async listDashboards(userId: string, plan: PlanType): Promise<DashboardState[]> {
    const strategy = this.getStrategy(plan);
    const all = await strategy.list<DashboardState>('dashboards');
    return all.filter(d => d.userId === userId);
  }

  // ============================================================================
  // REPORT OPERATIONS
  // ============================================================================

  async getReport(id: string, plan: PlanType): Promise<ReportState | null> {
    const strategy = this.getStrategy(plan);
    return strategy.get<ReportState>(`reports:${id}`);
  }

  async saveReport(report: ReportState, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    await strategy.set(`reports:${report.id}`, {
      ...report,
      updatedAt: Date.now(),
    });
  }

  async deleteReport(id: string, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    await strategy.delete(`reports:${id}`);
  }

  async listReports(userId: string, plan: PlanType): Promise<ReportState[]> {
    const strategy = this.getStrategy(plan);
    const all = await strategy.list<ReportState>('reports');
    return all.filter(r => r.userId === userId);
  }

  // ============================================================================
  // AI SESSION OPERATIONS
  // ============================================================================

  async getAISession(id: string, plan: PlanType): Promise<AISession | null> {
    const strategy = this.getStrategy(plan);
    return strategy.get<AISession>(`ai_sessions:${id}`);
  }

  async saveAISession(session: AISession, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    await strategy.set(`ai_sessions:${session.id}`, {
      ...session,
      updatedAt: Date.now(),
    });
  }

  async deleteAISession(id: string, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    await strategy.delete(`ai_sessions:${id}`);
  }

  async listAISessions(userId: string, plan: PlanType): Promise<AISession[]> {
    const strategy = this.getStrategy(plan);
    const all = await strategy.list<AISession>('ai_sessions');
    return all.filter(s => s.userId === userId);
  }

  // ============================================================================
  // UPLOAD METADATA OPERATIONS
  // ============================================================================

  async getUpload(id: string, plan: PlanType): Promise<UploadMetadata | null> {
    const strategy = this.getStrategy(plan);
    return strategy.get<UploadMetadata>(`uploads:${id}`);
  }

  async saveUploadMetadata(upload: UploadMetadata, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    
    // For free users, set expiration
    if (plan === 'free') {
      upload.expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    }
    
    await strategy.set(`uploads:${upload.id}`, upload);
  }

  async deleteUpload(id: string, plan: PlanType): Promise<void> {
    const strategy = this.getStrategy(plan);
    await strategy.delete(`uploads:${id}`);
  }

  async listUploads(userId: string, plan: PlanType): Promise<UploadMetadata[]> {
    const strategy = this.getStrategy(plan);
    const all = await strategy.list<UploadMetadata>('uploads');
    const userUploads = all.filter(u => u.userId === userId);
    
    // Filter out expired uploads for free users
    const now = Date.now();
    return userUploads.filter(u => !u.expiresAt || u.expiresAt > now);
  }

  // ============================================================================
  // DRAFT STATE (Always Local)
  // ============================================================================

  async getDraftState<T>(key: string): Promise<T | null> {
    return this.localStrategy.get<T>(`draft:${key}`);
  }

  async saveDraftState<T>(key: string, state: T): Promise<void> {
    await this.localStrategy.set(`draft:${key}`, state);
  }

  async clearDraftState(key: string): Promise<void> {
    await this.localStrategy.delete(`draft:${key}`);
  }

  // ============================================================================
  // DATA CLEANUP (Free Users)
  // ============================================================================

  async cleanupExpiredData(): Promise<void> {
    const now = Date.now();
    
    // Clean up expired uploads
    const uploads = await this.localStrategy.list<UploadMetadata>('uploads');
    for (const upload of uploads) {
      if (upload.expiresAt && upload.expiresAt < now) {
        await this.localStrategy.delete(`uploads:${upload.id}`);
      }
    }
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const storageService = new StorageService();
