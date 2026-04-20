import { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Send,
  Sparkles,
  BarChart3,
  TrendingUp,
  PieChart,
  Lightbulb,
  Zap,
  Bell,
  Menu,
  Loader2,
  User,
  Bot,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AIChatProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Sidebar Component
function Sidebar({ onNavigate, currentPage, isOpen, onClose }: { 
  onNavigate: (page: string) => void; 
  currentPage: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isRTL } = useLanguage();
  
  const menuItems = [
    { icon: LayoutDashboard, label: isRTL ? 'لوحة التحكم' : 'Dashboard', page: 'dashboard' },
    { icon: FileText, label: isRTL ? 'التقارير' : 'Reports', page: 'reports' },
    { icon: MessageSquare, label: isRTL ? 'مساعد AI' : 'AI Chat', page: 'ai-chat' },
    { icon: Settings, label: isRTL ? 'الإعدادات' : 'Settings', page: 'settings' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 bg-slate-900 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-slate-800">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg font-black text-white">HORUS AI</span>
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {isRTL ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// Suggested Prompt Card
function SuggestedPrompt({ icon: Icon, title, description, onClick }: {
  icon: typeof BarChart3;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all text-start"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </button>
  );
}

// Chat Message Component
function ChatMessage({ message, isRTL }: { message: Message; isRTL: boolean }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gradient-to-br from-blue-500 to-blue-700 text-white'
      }`}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      <div className={`flex-1 ${isUser ? 'text-end' : ''}`}>
        <div className={`inline-block max-w-[85%] p-4 rounded-2xl ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-sm' 
            : 'bg-white border border-slate-200 text-slate-900 rounded-tl-sm'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        {!isUser && (
          <div className={`flex items-center gap-2 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Typing indicator
function TypingIndicator({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shrink-0">
        <Bot className="w-5 h-5" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// Empty state
function EmptyState({ isRTL, onSelectPrompt }: { isRTL: boolean; onSelectPrompt: (prompt: string) => void }) {
  const prompts = isRTL ? [
    { icon: BarChart3, title: 'تحليل المبيعات', description: 'ما هي أفضل المنتجات أداءً هذا الشهر؟', prompt: 'ما هي أفضل المنتجات أداءً هذا الشهر؟' },
    { icon: TrendingUp, title: 'التوقعات', description: 'ما هي توقعات المبيعات للربع القادم؟', prompt: 'ما هي توقعات المبيعات للربع القادم؟' },
    { icon: PieChart, title: 'توزيع العملاء', description: 'كيف يتوزع العملاء حسب المنطقة؟', prompt: 'كيف يتوزع العملاء حسب المنطقة؟' },
    { icon: Lightbulb, title: 'توصيات', description: 'ما هي توصياتك لتحسين الأداء؟', prompt: 'ما هي توصياتك لتحسين الأداء؟' },
  ] : [
    { icon: BarChart3, title: 'Sales Analysis', description: 'What are the top performing products this month?', prompt: 'What are the top performing products this month?' },
    { icon: TrendingUp, title: 'Forecasting', description: 'What are the sales forecasts for next quarter?', prompt: 'What are the sales forecasts for next quarter?' },
    { icon: PieChart, title: 'Customer Distribution', description: 'How are customers distributed by region?', prompt: 'How are customers distributed by region?' },
    { icon: Lightbulb, title: 'Recommendations', description: 'What are your recommendations to improve performance?', prompt: 'What are your recommendations to improve performance?' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-xl font-black text-slate-900 mb-2">{isRTL ? 'مساعد HORUS AI' : 'HORUS AI Assistant'}</h2>
      <p className="text-sm text-slate-500 text-center max-w-md mb-8">
        {isRTL 
          ? 'اسأل أي سؤال عن بياناتك وسأساعدك في التحليل والحصول على رؤى قيمة'
          : 'Ask any question about your data and I will help you analyze and get valuable insights'
        }
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {prompts.map((prompt, i) => (
          <SuggestedPrompt 
            key={i} 
            {...prompt} 
            onClick={() => onSelectPrompt(prompt.prompt)}
          />
        ))}
      </div>
    </div>
  );
}

export function AIChat({ onNavigate }: AIChatProps) {
  const { isRTL } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = isRTL ? [
        'بناءً على تحليل البيانات المتاحة، أستطيع أن أخبرك أن المبيعات شهدت نمواً بنسبة 23% مقارنة بالفترة السابقة. المنتج الأكثر مبيعاً هو المنتج A بإجمالي 1,234 وحدة مباعة.',
        'أرى أن هناك فرصة كبيرة لتحسين الأداء في منطقة جدة. بناءً على الاتجاهات الحالية، أقترح زيادة الاستثمار في التسويق الرقمي بنسبة 15%.',
        'تحليل سلوك العملاء يظهر أن 65% من المشتريات تتم في أيام الأحد والاثنين. يمكن استغلال هذه المعلومة في جدولة العروض الترويجية.',
      ] : [
        'Based on the available data analysis, I can tell you that sales have grown by 23% compared to the previous period. The best-selling product is Product A with a total of 1,234 units sold.',
        'I see there is a great opportunity to improve performance in the Jeddah region. Based on current trends, I suggest increasing digital marketing investment by 15%.',
        'Customer behavior analysis shows that 65% of purchases are made on Sundays and Mondays. This information can be used to schedule promotional offers.',
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? 'lg:pr-64' : 'lg:pl-64'}`}>
      <Sidebar 
        onNavigate={onNavigate} 
        currentPage="ai-chat" 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h1 className="text-lg font-bold text-slate-900">{isRTL ? 'مساعد AI' : 'AI Assistant'}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleNewChat}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'محادثة جديدة' : 'New Chat'}</span>
              </button>
              <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {messages.length === 0 ? (
            <EmptyState isRTL={isRTL} onSelectPrompt={handleSend} />
          ) : (
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} isRTL={isRTL} />
              ))}
              {isTyping && <TypingIndicator isRTL={isRTL} />}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input area */}
          <div className="border-t border-slate-100 bg-white p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isRTL ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                    className="w-full px-4 py-3 pe-12 border border-slate-200 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center mt-3">
                {isRTL 
                  ? 'HORUS AI قد يعطي إجابات غير دقيقة. تحقق من المعلومات المهمة.'
                  : 'HORUS AI may give inaccurate answers. Verify important information.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
