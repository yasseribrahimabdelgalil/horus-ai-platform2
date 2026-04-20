export type Lang = 'ar' | 'en';

export const t: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.home': { ar: 'الرئيسية', en: 'Home' },
  'nav.companies': { ar: 'الشركات', en: 'Companies' },
  'nav.individuals': { ar: 'الأفراد', en: 'Individuals' },
  'nav.bloggers': { ar: 'المدونون', en: 'Bloggers' },
  'nav.sellers': { ar: 'البائعون', en: 'Online Sellers' },
  'nav.pricing': { ar: 'الأسعار', en: 'Pricing' },
  'nav.blog': { ar: 'المدونة', en: 'Blog' },
  'nav.contact': { ar: 'تواصل معنا', en: 'Contact' },
  'nav.help': { ar: 'المساعدة', en: 'Help' },
  'nav.login': { ar: 'تسجيل الدخول', en: 'Login' },
  'nav.register': { ar: 'ابدأ مجاناً', en: 'Get Started' },
  'nav.dashboard': { ar: 'لوحة التحكم', en: 'Dashboard' },

  // Hero
  'hero.badge': { ar: 'منصة الذكاء الاصطناعي #1 في المنطقة', en: '#1 AI Platform in the Region' },
  'hero.title1': { ar: 'حوّل بياناتك إلى', en: 'Transform Your Data into' },
  'hero.title2': { ar: 'قرارات ذكية', en: 'Smart Decisions' },
  'hero.subtitle': { ar: 'منصة HORUS AI تحلل بياناتك بالذكاء الاصطناعي وتقدم تقارير احترافية وتوصيات دقيقة في دقائق. بدون خبرة تقنية مطلوبة.', en: 'HORUS AI analyzes your data with AI and delivers professional reports and precise recommendations in minutes. No technical expertise required.' },
  'hero.cta1': { ar: 'ابدأ التحليل الآن', en: 'Start Analysis Now' },
  'hero.cta2': { ar: 'شاهد كيف يعمل', en: 'See How It Works' },
  'hero.trust1': { ar: '+٥٠٠٠ مستخدم نشط', en: '+5,000 Active Users' },
  'hero.trust2': { ar: '+١٢٠ ألف تحليل', en: '+120K Analyses' },
  'hero.trust3': { ar: '٩٩.٩٪ دقة', en: '99.9% Accuracy' },

  // Audience
  'audience.title': { ar: 'مصمم لكل احتياجاتك', en: 'Designed for Every Need' },
  'audience.subtitle': { ar: 'اختر الفئة التي تناسبك واستكشف كيف تساعدك HORUS على النجاح', en: 'Choose your category and discover how HORUS helps you succeed' },
  'audience.companies': { ar: 'الشركات', en: 'Companies' },
  'audience.companies.desc': { ar: 'تحليلات مؤسسية متقدمة، تقارير تنفيذية، ولوحات BI احترافية لدعم القرارات الاستراتيجية.', en: 'Advanced enterprise analytics, executive reports, and professional BI dashboards to support strategic decisions.' },
  'audience.individuals': { ar: 'الأفراد', en: 'Individuals' },
  'audience.individuals.desc': { ar: 'تحليل بياناتك الشخصية بسهولة، احصل على رؤى قيمة ووصف دقيق لأنماطك وعاداتك.', en: 'Easily analyze your personal data, gain valuable insights and accurate descriptions of your patterns and habits.' },
  'audience.bloggers': { ar: 'البلوجر', en: 'Bloggers' },
  'audience.bloggers.desc': { ar: 'افهم جمهورك، تتبع الأداء، وأنشئ محتوى مدعوماً بالبيانات يحقق التفاعل والنمو.', en: 'Understand your audience, track performance, and create data-driven content that achieves engagement and growth.' },
  'audience.sellers': { ar: 'تجار أونلاين', en: 'Online Sellers' },
  'audience.sellers.desc': { ar: 'تحليل المبيعات، رصد المخزون، فهم سلوك العملاء، وتحسين استراتيجية التسعير والمبيعات.', en: 'Sales analysis, inventory monitoring, understanding customer behavior, and optimizing pricing and sales strategy.' },

  // Stats
  'stats.users': { ar: 'مستخدم نشط', en: 'Active Users' },
  'stats.analyses': { ar: 'تحليل مكتمل', en: 'Analyses Completed' },
  'stats.reports': { ar: 'تقرير احترافي', en: 'Professional Reports' },
  'stats.satisfaction': { ar: 'رضا العملاء', en: 'Customer Satisfaction' },
  'stats.users.val': { ar: '+٥٠٠٠', en: '5,000+' },
  'stats.analyses.val': { ar: '+١٢٠ ألف', en: '120K+' },
  'stats.reports.val': { ar: '+٣٠ ألف', en: '30K+' },
  'stats.satisfaction.val': { ar: '٩٨٪', en: '98%' },

  // Features
  'features.title': { ar: 'كل ما تحتاجه في منصة واحدة', en: 'Everything You Need in One Platform' },
  'features.subtitle': { ar: 'من رفع البيانات إلى التقارير التنفيذية — HORUS يغطي الرحلة بالكامل', en: 'From data upload to executive reports — HORUS covers the full journey' },
  'features.upload': { ar: 'رفع البيانات', en: 'Data Upload' },
  'features.upload.desc': { ar: 'ارفع ملفات CSV وExcel والمزيد بسهولة', en: 'Upload CSV, Excel files and more with ease' },
  'features.clean': { ar: 'تنظيف تلقائي', en: 'Auto Cleaning' },
  'features.clean.desc': { ar: 'كشف وإصلاح مشاكل البيانات تلقائياً', en: 'Detect and fix data issues automatically' },
  'features.analysis': { ar: 'تحليل ذكي', en: 'Smart Analysis' },
  'features.analysis.desc': { ar: 'رؤى متعمقة مدعومة بالذكاء الاصطناعي', en: 'Deep insights powered by AI' },
  'features.reports': { ar: 'تقارير احترافية', en: 'Professional Reports' },
  'features.reports.desc': { ar: 'تقارير جاهزة للتصدير بتنسيق PDF وPowerPoint', en: 'Export-ready reports in PDF & PowerPoint' },
  'features.chat': { ar: 'مساعد AI', en: 'AI Assistant' },
  'features.chat.desc': { ar: 'اسأل أسئلتك عن بياناتك بلغة طبيعية', en: 'Ask questions about your data in natural language' },
  'features.dashboard': { ar: 'لوحة BI متقدمة', en: 'Advanced BI Dashboard' },
  'features.dashboard.desc': { ar: 'مخططات تفاعلية وفلاتر ومؤشرات أداء', en: 'Interactive charts, filters, and KPI indicators' },

  // CTA
  'cta.title': { ar: 'جاهز لتحويل بياناتك؟', en: 'Ready to Transform Your Data?' },
  'cta.subtitle': { ar: 'انضم إلى آلاف المستخدمين الذين يثقون في HORUS لاتخاذ قراراتهم', en: 'Join thousands of users who trust HORUS for their decisions' },
  'cta.button': { ar: 'ابدأ مجاناً', en: 'Start Free' },
  'cta.button2': { ar: 'تحدث مع فريقنا', en: 'Talk to Our Team' },

  // Footer
  'footer.desc': { ar: 'منصة الذكاء الاصطناعي المتخصصة في تحليل البيانات وتقديم الرؤى الاستراتيجية للشركات والأفراد.', en: 'The AI platform specialized in data analysis and strategic insights for companies and individuals.' },
  'footer.platform': { ar: 'المنصة', en: 'Platform' },
  'footer.company': { ar: 'الشركة', en: 'Company' },
  'footer.support': { ar: 'الدعم', en: 'Support' },
  'footer.rights': { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
  'footer.privacy': { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
  'footer.terms': { ar: 'شروط الاستخدام', en: 'Terms of Service' },
  'footer.about': { ar: 'من نحن', en: 'About Us' },
  'footer.careers': { ar: 'الوظائف', en: 'Careers' },

  // Login
  'login.title': { ar: 'مرحباً بعودتك', en: 'Welcome Back' },
  'login.subtitle': { ar: 'سجّل دخولك للوصول إلى منصة HORUS', en: 'Sign in to access HORUS platform' },
  'login.email': { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'login.password': { ar: 'كلمة المرور', en: 'Password' },
  'login.forgot': { ar: 'نسيت كلمة المرور؟', en: 'Forgot password?' },
  'login.submit': { ar: 'تسجيل الدخول', en: 'Sign In' },
  'login.noAccount': { ar: 'ليس لديك حساب؟', en: "Don't have an account?" },
  'login.register': { ar: 'أنشئ حساباً', en: 'Create Account' },

  // Register
  'register.title': { ar: 'أنشئ حسابك', en: 'Create Your Account' },
  'register.subtitle': { ar: 'ابدأ رحلتك مع HORUS مجاناً', en: 'Start your HORUS journey for free' },
  'register.name': { ar: 'الاسم الكامل', en: 'Full Name' },
  'register.email': { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'register.password': { ar: 'كلمة المرور', en: 'Password' },
  'register.type': { ar: 'نوع الحساب', en: 'Account Type' },
  'register.submit': { ar: 'إنشاء الحساب', en: 'Create Account' },
  'register.hasAccount': { ar: 'لديك حساب بالفعل؟', en: 'Already have an account?' },
  'register.login': { ar: 'تسجيل الدخول', en: 'Sign In' },
  'register.agree': { ar: 'بالتسجيل، أوافق على', en: 'By registering, I agree to the' },
  'register.terms': { ar: 'شروط الاستخدام', en: 'Terms of Service' },
  'register.and': { ar: 'و', en: 'and' },
  'register.privacy': { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },

  // Pricing
  'pricing.title': { ar: 'أسعار شفافة وبسيطة', en: 'Transparent, Simple Pricing' },
  'pricing.subtitle': { ar: 'اختر الخطة التي تناسب احتياجاتك', en: 'Choose the plan that fits your needs' },
  'pricing.free': { ar: 'مجاني', en: 'Free' },
  'pricing.pro': { ar: 'الاحترافي', en: 'Professional' },
  'pricing.enterprise': { ar: 'المؤسسي', en: 'Enterprise' },
  'pricing.month': { ar: '/شهر', en: '/month' },
  'pricing.cta': { ar: 'ابدأ الآن', en: 'Get Started' },

  // Contact
  'contact.title': { ar: 'تواصل معنا', en: 'Contact Us' },
  'contact.subtitle': { ar: 'نحن هنا للمساعدة', en: "We're here to help" },

  // Blog
  'blog.title': { ar: 'المدونة', en: 'Blog' },
  'blog.subtitle': { ar: 'مقالات وأفكار حول تحليل البيانات والذكاء الاصطناعي', en: 'Articles and insights on data analysis and AI' },

  // Help
  'help.title': { ar: 'مركز المساعدة', en: 'Help Center' },
  'help.subtitle': { ar: 'ابحث في قاعدة المعرفة أو تواصل مع فريق الدعم', en: 'Search the knowledge base or contact our support team' },

  // Audience pages
  'companies.title': { ar: 'حلول ذكاء اصطناعي للشركات', en: 'AI Solutions for Companies' },
  'individuals.title': { ar: 'تحليل بيانات للأفراد', en: 'Data Analytics for Individuals' },
  'bloggers.title': { ar: 'أدوات ذكية للمدونين', en: 'Smart Tools for Bloggers' },
  'sellers.title': { ar: 'تحليلات للبائعين الإلكترونيين', en: 'Analytics for Online Sellers' },
};

export function translate(key: string, lang: Lang): string {
  return t[key]?.[lang] ?? key;
}
