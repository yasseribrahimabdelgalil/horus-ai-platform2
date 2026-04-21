// ============================================================================
// CONNECTORS SERVICE - Integration-ready connector architecture
// ============================================================================

import { ConnectorType, ConnectorConfig, ConnectorDefinition } from '../types/persistence';
import { AudienceType } from '../types/auth';

// ============================================================================
// CONNECTOR DEFINITIONS
// ============================================================================

export const CONNECTOR_DEFINITIONS: ConnectorDefinition[] = [
  // E-commerce Connectors (for Online Sellers)
  {
    type: 'shopify',
    nameAr: 'Shopify',
    nameEn: 'Shopify',
    descriptionAr: 'ربط متجر Shopify لاستيراد المنتجات والطلبات والتحليلات',
    descriptionEn: 'Connect Shopify store to import products, orders, and analytics',
    icon: 'shopify',
    category: 'ecommerce',
    audienceTypes: ['seller'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'store_url', labelAr: 'رابط المتجر', labelEn: 'Store URL', type: 'url', required: true },
      { key: 'api_key', labelAr: 'مفتاح API', labelEn: 'API Key', type: 'password', required: true },
    ],
  },
  {
    type: 'woocommerce',
    nameAr: 'WooCommerce',
    nameEn: 'WooCommerce',
    descriptionAr: 'ربط متجر WooCommerce لاستيراد البيانات',
    descriptionEn: 'Connect WooCommerce store to import data',
    icon: 'woocommerce',
    category: 'ecommerce',
    audienceTypes: ['seller'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'store_url', labelAr: 'رابط المتجر', labelEn: 'Store URL', type: 'url', required: true },
      { key: 'consumer_key', labelAr: 'Consumer Key', labelEn: 'Consumer Key', type: 'password', required: true },
      { key: 'consumer_secret', labelAr: 'Consumer Secret', labelEn: 'Consumer Secret', type: 'password', required: true },
    ],
  },
  {
    type: 'salla',
    nameAr: 'سلة',
    nameEn: 'Salla',
    descriptionAr: 'ربط متجر سلة للحصول على بيانات المبيعات',
    descriptionEn: 'Connect Salla store to get sales data',
    icon: 'salla',
    category: 'ecommerce',
    audienceTypes: ['seller'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'store_id', labelAr: 'معرف المتجر', labelEn: 'Store ID', type: 'text', required: true },
      { key: 'access_token', labelAr: 'رمز الوصول', labelEn: 'Access Token', type: 'password', required: true },
    ],
  },
  {
    type: 'zid',
    nameAr: 'زد',
    nameEn: 'Zid',
    descriptionAr: 'ربط متجر زد للحصول على بيانات المبيعات',
    descriptionEn: 'Connect Zid store to get sales data',
    icon: 'zid',
    category: 'ecommerce',
    audienceTypes: ['seller'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'store_id', labelAr: 'معرف المتجر', labelEn: 'Store ID', type: 'text', required: true },
      { key: 'api_key', labelAr: 'مفتاح API', labelEn: 'API Key', type: 'password', required: true },
    ],
  },
  {
    type: 'amazon_seller',
    nameAr: 'Amazon Seller',
    nameEn: 'Amazon Seller',
    descriptionAr: 'ربط حساب بائع أمازون',
    descriptionEn: 'Connect Amazon Seller account',
    icon: 'amazon',
    category: 'ecommerce',
    audienceTypes: ['seller'],
    requiredPlan: 'enterprise',
    configFields: [
      { key: 'seller_id', labelAr: 'معرف البائع', labelEn: 'Seller ID', type: 'text', required: true },
      { key: 'marketplace', labelAr: 'السوق', labelEn: 'Marketplace', type: 'select', required: true, options: [
        { value: 'ae', label: 'UAE' },
        { value: 'sa', label: 'Saudi Arabia' },
        { value: 'eg', label: 'Egypt' },
      ]},
    ],
  },

  // Social Media Connectors (for Bloggers)
  {
    type: 'youtube',
    nameAr: 'يوتيوب',
    nameEn: 'YouTube',
    descriptionAr: 'ربط قناة يوتيوب لتحليل أداء الفيديوهات',
    descriptionEn: 'Connect YouTube channel to analyze video performance',
    icon: 'youtube',
    category: 'social',
    audienceTypes: ['blogger'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'channel_id', labelAr: 'معرف القناة', labelEn: 'Channel ID', type: 'text', required: true },
    ],
  },
  {
    type: 'instagram',
    nameAr: 'انستجرام',
    nameEn: 'Instagram',
    descriptionAr: 'ربط حساب انستجرام لتحليل المنشورات والقصص',
    descriptionEn: 'Connect Instagram account to analyze posts and stories',
    icon: 'instagram',
    category: 'social',
    audienceTypes: ['blogger'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'username', labelAr: 'اسم المستخدم', labelEn: 'Username', type: 'text', required: true },
    ],
  },
  {
    type: 'twitter',
    nameAr: 'تويتر / X',
    nameEn: 'Twitter / X',
    descriptionAr: 'ربط حساب تويتر لتحليل التغريدات',
    descriptionEn: 'Connect Twitter account to analyze tweets',
    icon: 'twitter',
    category: 'social',
    audienceTypes: ['blogger'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'handle', labelAr: 'المعرف', labelEn: 'Handle', type: 'text', required: true },
    ],
  },
  {
    type: 'tiktok',
    nameAr: 'تيك توك',
    nameEn: 'TikTok',
    descriptionAr: 'ربط حساب تيك توك لتحليل الفيديوهات',
    descriptionEn: 'Connect TikTok account to analyze videos',
    icon: 'tiktok',
    category: 'social',
    audienceTypes: ['blogger'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'username', labelAr: 'اسم المستخدم', labelEn: 'Username', type: 'text', required: true },
    ],
  },

  // Analytics Connectors
  {
    type: 'google_analytics',
    nameAr: 'Google Analytics',
    nameEn: 'Google Analytics',
    descriptionAr: 'ربط Google Analytics لاستيراد بيانات الموقع',
    descriptionEn: 'Connect Google Analytics to import website data',
    icon: 'google',
    category: 'analytics',
    audienceTypes: ['company', 'individual', 'blogger', 'seller'],
    requiredPlan: 'premium',
    configFields: [
      { key: 'property_id', labelAr: 'معرف الموقع', labelEn: 'Property ID', type: 'text', required: true },
    ],
  },

  // Custom Connectors
  {
    type: 'webhook',
    nameAr: 'Webhook',
    nameEn: 'Webhook',
    descriptionAr: 'استقبال بيانات من مصادر خارجية عبر Webhook',
    descriptionEn: 'Receive data from external sources via Webhook',
    icon: 'webhook',
    category: 'custom',
    audienceTypes: ['company', 'individual', 'blogger', 'seller'],
    requiredPlan: 'enterprise',
    configFields: [
      { key: 'secret', labelAr: 'مفتاح سري', labelEn: 'Secret Key', type: 'password', required: true },
    ],
  },
  {
    type: 'api',
    nameAr: 'API مخصص',
    nameEn: 'Custom API',
    descriptionAr: 'ربط API مخصص لاستيراد البيانات',
    descriptionEn: 'Connect custom API to import data',
    icon: 'api',
    category: 'custom',
    audienceTypes: ['company', 'individual', 'blogger', 'seller'],
    requiredPlan: 'enterprise',
    configFields: [
      { key: 'endpoint', labelAr: 'نقطة النهاية', labelEn: 'Endpoint', type: 'url', required: true },
      { key: 'auth_type', labelAr: 'نوع المصادقة', labelEn: 'Auth Type', type: 'select', required: true, options: [
        { value: 'none', label: 'None' },
        { value: 'bearer', label: 'Bearer Token' },
        { value: 'api_key', label: 'API Key' },
        { value: 'basic', label: 'Basic Auth' },
      ]},
      { key: 'auth_value', labelAr: 'قيمة المصادقة', labelEn: 'Auth Value', type: 'password', required: false },
    ],
  },
];

// ============================================================================
// CONNECTOR SERVICE CLASS
// ============================================================================

class ConnectorService {
  private connectors: Map<string, ConnectorConfig> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  // Load connectors from localStorage
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('horus_connectors');
      if (stored) {
        const list = JSON.parse(stored) as ConnectorConfig[];
        list.forEach(c => this.connectors.set(c.id, c));
      }
    } catch {
      // Ignore errors
    }
  }

  // Save connectors to localStorage
  private saveToStorage(): void {
    const list = Array.from(this.connectors.values());
    localStorage.setItem('horus_connectors', JSON.stringify(list));
  }

  // Get connector definitions for an audience type
  getDefinitionsForAudience(audienceType: AudienceType): ConnectorDefinition[] {
    return CONNECTOR_DEFINITIONS.filter(d => 
      d.audienceTypes.includes(audienceType)
    );
  }

  // Get connector definition by type
  getDefinition(type: ConnectorType): ConnectorDefinition | undefined {
    return CONNECTOR_DEFINITIONS.find(d => d.type === type);
  }

  // Get all connectors for a user
  getUserConnectors(userId: string): ConnectorConfig[] {
    return Array.from(this.connectors.values())
      .filter(c => c.userId === userId);
  }

  // Get active connectors for a user
  getActiveConnectors(userId: string): ConnectorConfig[] {
    return this.getUserConnectors(userId).filter(c => c.isActive);
  }

  // Add a new connector
  addConnector(connector: Omit<ConnectorConfig, 'id' | 'createdAt'>): ConnectorConfig {
    const newConnector: ConnectorConfig = {
      ...connector,
      id: `conn_${Date.now()}`,
      createdAt: Date.now(),
    };
    this.connectors.set(newConnector.id, newConnector);
    this.saveToStorage();
    return newConnector;
  }

  // Update connector
  updateConnector(id: string, updates: Partial<ConnectorConfig>): ConnectorConfig | null {
    const existing = this.connectors.get(id);
    if (!existing) return null;

    const updated = { ...existing, ...updates };
    this.connectors.set(id, updated);
    this.saveToStorage();
    return updated;
  }

  // Delete connector
  deleteConnector(id: string): boolean {
    const deleted = this.connectors.delete(id);
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  // Toggle connector active state
  toggleConnector(id: string): ConnectorConfig | null {
    const existing = this.connectors.get(id);
    if (!existing) return null;

    return this.updateConnector(id, { isActive: !existing.isActive });
  }

  // Test connector connection (placeholder - would call actual API)
  async testConnection(_connector: ConnectorConfig): Promise<{ success: boolean; error?: string }> {
    // This would be implemented with actual API calls
    // For now, simulate a test
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock success
    return { success: true };
  }

  // Sync connector data (placeholder - would call actual API)
  async syncConnector(id: string): Promise<{ success: boolean; error?: string; recordsCount?: number }> {
    const connector = this.connectors.get(id);
    if (!connector) {
      return { success: false, error: 'Connector not found' };
    }

    // This would be implemented with actual API calls
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update last sync time
    this.updateConnector(id, { lastSyncAt: Date.now() });

    return { success: true, recordsCount: Math.floor(Math.random() * 100) + 10 };
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const connectorService = new ConnectorService();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getConnectorsByCategory(category: ConnectorDefinition['category']): ConnectorDefinition[] {
  return CONNECTOR_DEFINITIONS.filter(d => d.category === category);
}

export function getConnectorIcon(type: ConnectorType): string {
  const def = CONNECTOR_DEFINITIONS.find(d => d.type === type);
  return def?.icon || 'link';
}

export function getConnectorName(type: ConnectorType, lang: 'ar' | 'en'): string {
  const def = CONNECTOR_DEFINITIONS.find(d => d.type === type);
  return lang === 'ar' ? (def?.nameAr || type) : (def?.nameEn || type);
}
