// ============================================================================
// PLATFORM CONFIG - HORUS AI Platform Configuration
// All platform settings configurable from Admin Studio
// ============================================================================

export interface PlatformBrand {
  name: {
    ar: string;
    en: string;
  };
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
}

export interface PlatformConfig {
  // Brand identity - editable from Admin Studio
  brand: PlatformBrand;
  
  // Feature flags
  features: {
    registration: boolean;
    socialLogin: boolean;
    emailVerification: boolean;
    twoFactorAuth: boolean;
    apiAccess: boolean;
    teamWorkspaces: boolean;
    whiteLabeling: boolean;
    customDomains: boolean;
  };

  // Default settings
  defaults: {
    language: 'ar' | 'en';
    theme: 'light' | 'dark' | 'system';
    currency: string;
    timezone: string;
  };

  // URLs
  urls: {
    app: string;
    api: string;
    docs: string;
    support: string;
    status: string;
  };

  // Contact info
  contact: {
    email: string;
    phone?: string;
    address?: {
      ar: string;
      en: string;
    };
  };

  // Social links
  social: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };

  // Legal
  legal: {
    companyName: string;
    registrationNumber?: string;
    vatNumber?: string;
  };
}

// ============================================================================
// DEFAULT PLATFORM CONFIG
// ============================================================================

export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  brand: {
    name: {
      ar: 'HORUS AI Platform',
      en: 'HORUS AI Platform',
    },
    colors: {
      primary: '#2563eb',
      secondary: '#0891b2',
      accent: '#f59e0b',
      background: '#0f172a',
      foreground: '#f8fafc',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
  },

  features: {
    registration: true,
    socialLogin: false,
    emailVerification: true,
    twoFactorAuth: false,
    apiAccess: true,
    teamWorkspaces: true,
    whiteLabeling: false,
    customDomains: false,
  },

  defaults: {
    language: 'ar',
    theme: 'light',
    currency: 'EGP',
    timezone: 'Africa/Cairo',
  },

  urls: {
    app: 'https://horus-ai.com',
    api: 'https://api.horus-ai.com',
    docs: 'https://docs.horus-ai.com',
    support: 'https://support.horus-ai.com',
    status: 'https://status.horus-ai.com',
  },

  contact: {
    email: 'support@horus-ai.com',
    phone: '+20 123 456 7890',
    address: {
      ar: 'القاهرة، مصر',
      en: 'Cairo, Egypt',
    },
  },

  social: {
    twitter: 'https://twitter.com/horusai',
    linkedin: 'https://linkedin.com/company/horusai',
    facebook: 'https://facebook.com/horusai',
  },

  legal: {
    companyName: 'HORUS AI Technologies',
  },
};

// ============================================================================
// ENV CONFIG - Environment variable mapping
// ============================================================================

export interface EnvConfig {
  // Supabase
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  // These should ONLY be used server-side
  // SUPABASE_SERVICE_ROLE_KEY - Never expose to frontend

  // AI/External Services (backend-only keys)
  // GEMINI_API_KEY - Never expose to frontend
  // OPENAI_API_KEY - Never expose to frontend

  // App
  APP_URL?: string;
  APP_ENV?: 'development' | 'staging' | 'production';

  // Feature flags from env
  ENABLE_REGISTRATION?: boolean;
  ENABLE_ANALYTICS?: boolean;
}

export function getEnvConfig(): EnvConfig {
  return {
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    APP_URL: import.meta.env.VITE_APP_URL || window.location.origin,
    APP_ENV: (import.meta.env.VITE_APP_ENV as EnvConfig['APP_ENV']) || 'development',
    ENABLE_REGISTRATION: import.meta.env.VITE_ENABLE_REGISTRATION !== 'false',
    ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

let platformConfig: PlatformConfig = DEFAULT_PLATFORM_CONFIG;

export function getPlatformConfig(): PlatformConfig {
  return platformConfig;
}

export function updatePlatformConfig(updates: Partial<PlatformConfig>): void {
  platformConfig = { ...platformConfig, ...updates };
  // Persist to localStorage for Admin Studio changes
  localStorage.setItem('horus_platform_config', JSON.stringify(platformConfig));
}

export function loadPlatformConfig(): void {
  try {
    const stored = localStorage.getItem('horus_platform_config');
    if (stored) {
      platformConfig = { ...DEFAULT_PLATFORM_CONFIG, ...JSON.parse(stored) };
    }
  } catch {
    platformConfig = DEFAULT_PLATFORM_CONFIG;
  }
}

export function getBrandName(lang: 'ar' | 'en'): string {
  return platformConfig.brand.name[lang];
}

// Initialize config on module load
loadPlatformConfig();
