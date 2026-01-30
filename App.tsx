
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Moon, Sun, 
  ArrowRight, Mail, Phone, 
  MessageCircle, Send,
  Layers, Smartphone, Monitor, Box, Sparkles,
  Search, PenTool, CheckCircle2,
  ChevronDown, Award, Rocket,
  ChevronLeft
} from 'lucide-react';
import { Category, PortfolioItem } from './types';
import { PORTFOLIO_ITEMS, SERVICES } from './constants';

const ITEMS_PER_PAGE = 9;

// --- Components ---

const Logo: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-40 h-14 group transition-transform duration-500 hover:scale-105">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#007AFF">
                <animate attributeName="stop-color" values="#007AFF;#FF2D55;#34C759;#007AFF" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#FF2D55">
                <animate attributeName="stop-color" values="#FF2D55;#34C759;#007AFF;#FF2D55" dur="6s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <motion.ellipse 
            cx="80" cy="40" rx="65" ry="32" 
            stroke="url(#neonGradient)" 
            strokeWidth="1.5" 
            fill="none"
            strokeDasharray="200 100"
            filter="url(#neonGlow)"
            initial={{ rotate: -15 }}
            animate={{ 
              rotate: [-15, -12, -15],
              strokeDashoffset: [0, -300]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              strokeDashoffset: { duration: 10, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.ellipse 
            cx="80" cy="40" rx="55" ry="25" 
            stroke="white" 
            strokeWidth="0.5" 
            strokeOpacity="0.2"
            fill="none"
            initial={{ rotate: 10 }}
            animate={{ rotate: [10, 15, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-[-0.02em] text-slate-900 dark:text-white flex items-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            元启设计
            <span className="text-[10px] font-bold self-start ml-0.5 opacity-40">®</span>
          </span>
        </div>
        <div className="mt-[-2px]">
          <span className="text-[8px] font-black tracking-[0.45em] text-slate-500 dark:text-white/40 uppercase pl-1">
            YUAN QI DESIGN
          </span>
        </div>
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-20 pointer-events-none"
        animate={{ left: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const CustomSelect: React.FC<{
  label: string;
  options: string[];
  placeholder: string;
  onChange?: (value: string) => void;
}> = ({ label, options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-1.5 relative" ref={containerRef}>
      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 cursor-pointer flex justify-between items-center transition-all hover:bg-white/10 ${isOpen ? 'border-tech-blue/50 ring-4 ring-tech-blue/10' : ''}`}
      >
        <span className={`text-[14px] ${selected ? 'text-white' : 'text-white/40'}`}>
          {selected || placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={14} className="opacity-30" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute z-[60] w-full mt-1 glass rounded-xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl py-2"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                  if (onChange) onChange(option);
                }}
                className={`px-5 py-3 text-[14px] cursor-pointer transition-colors hover:bg-white/10 ${selected === option ? 'text-tech-blue bg-tech-blue/5 font-bold' : 'text-white/80'}`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SectionHeader: React.FC<{ 
  tag: string; 
  title: string; 
  subtitle: string; 
  watermark: string;
  accentColor?: string;
}> = ({ tag, title, subtitle, watermark, accentColor = "bg-tech-blue" }) => (
  <div className="relative mb-12 md:mb-16 flex flex-col items-center text-center">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 0.03, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute -top-6 md:-top-8 pointer-events-none select-none"
    >
      <span className="text-[3.5rem] md:text-[6rem] font-black italic tracking-tighter text-transparent dark:text-white" 
            style={{ WebkitTextStroke: '1px currentColor' }}>
        {watermark}
      </span>
    </motion.div>
    <div className="relative z-10 flex flex-col items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-tech-blue font-black text-[9px] md:text-[10px] mb-3 tracking-[0.5em] uppercase flex items-center gap-2"
      >
        <span className="w-5 h-[1px] bg-tech-blue/30"></span>
        {tag}
        <span className="w-5 h-[1px] bg-tech-blue/30"></span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-4xl font-black tracking-tighter leading-none mb-6"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '40px', opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`h-1 ${accentColor} rounded-full mb-6 shadow-[0_0_10px_rgba(0,122,255,0.3)]`}
      ></motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="opacity-20 text-[11px] md:text-[13px] font-medium max-w-xl leading-relaxed tracking-wider"
      >
        {subtitle}
      </motion.p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<Category>('全部');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const worksSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredItems = useMemo(() => {
    return activeTab === '全部' 
      ? PORTFOLIO_ITEMS 
      : PORTFOLIO_ITEMS.filter(item => item.category === activeTab);
  }, [activeTab]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const scrollToWorks = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (worksSectionRef.current) {
      const topOffset = worksSectionRef.current.offsetTop - 120;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (contactSectionRef.current) {
      const topOffset = contactSectionRef.current.offsetTop - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    scrollToWorks();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-tech-blue selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-20"></div>
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90vw] h-[40vh] bg-tech-blue/15 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[5%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] bg-tech-pink/10 blur-[100px] rounded-full"></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass shadow-xl' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Logo />
          </div>
          <div className="hidden md:flex items-center gap-6 font-bold">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg glass hover:scale-110 transition-transform">
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={scrollToContact} className="px-5 py-2.5 bg-digital-gradient text-white rounded-lg text-[13px] font-black hover:scale-105 transition-all shadow-lg shadow-tech-blue/20 tracking-tight">设计咨询</button>
          </div>
          <div className="md:hidden flex items-center gap-4">
             <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 glass rounded-lg">
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 glass rounded-lg">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white dark:bg-dark-base pt-28 px-8 flex flex-col md:hidden">
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
              <span className="text-sm font-bold opacity-30 tracking-[0.3em] uppercase">Digital Experience Designer</span>
              <h2 className="text-4xl font-black text-center tracking-tighter leading-none bg-digital-gradient bg-clip-text text-transparent">界面有形，体验无界</h2>
            </div>
            <div className="mt-auto pb-12">
              <button onClick={scrollToContact} className="w-full py-5 block text-center bg-digital-gradient text-white rounded-2xl text-xl font-black shadow-2xl tracking-tight">设计咨询</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section id="首页" className="min-h-screen flex flex-col items-center pt-24 pb-12 px-6 text-center scroll-mt-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 0.3, y: 0 }} transition={{ duration: 1 }} className="mt-8 md:mt-16 mb-8">
            <div className="inline-block px-6 py-2 text-[9px] md:text-[10px] font-bold tracking-[0.6em] text-tech-cyan bg-tech-blue/5 rounded-md border border-tech-blue/10 backdrop-blur-xl uppercase">
              SENIOR UI/UX DESIGNER
            </div>
          </motion.div>
          <div className="flex-grow flex flex-col items-center justify-start w-full max-w-none pt-16 md:pt-40">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
              <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] font-black mb-16 leading-[0.8] tracking-[0.1em] bg-digital-gradient bg-clip-text text-transparent drop-shadow-2xl saturate-150">
                界面有形 <span className="italic">体验无界</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-2xl opacity-50 mb-24 max-w-none lg:whitespace-nowrap mx-auto font-medium px-4 tracking-wider">
                用设计构建产品与用户的情感桥梁。我不仅是界面创作者，更是数字体验的造梦师。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button onClick={scrollToWorks} className="w-full sm:w-auto group px-12 py-5 bg-digital-gradient text-white rounded-2xl font-black flex items-center justify-center gap-4 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(0,122,255,0.3)] text-xl tracking-tight">
                  查看设计案例 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <button onClick={scrollToContact} className="w-full sm:w-auto px-12 py-5 glass rounded-2xl font-black hover:bg-slate-50 dark:hover:bg-white/10 transition-all text-xl tracking-tight">
                  设计咨询
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="作品" ref={worksSectionRef} className="py-24 px-6 sm:px-10 lg:px-16 bg-slate-50/20 dark:bg-transparent scroll-mt-20 overflow-hidden">
          <div className="container mx-auto max-w-screen-xl">
            <SectionHeader tag="Selected Works" title="精选设计作品" subtitle="探索每一个像素背后的逻辑与美学" watermark="GALLERY" />
            <div className="flex flex-nowrap md:justify-center gap-3 no-scrollbar overflow-x-auto pb-8 w-full max-w-5xl mx-auto mb-12 px-4">
              {['全部', 'App界面', 'Web网页', 'B端后台', '可视化大屏', '品牌视觉', 'AI作品'].map((cat) => (
                <button key={cat} onClick={() => setActiveTab(cat as Category)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[13px] font-black transition-all tracking-tight shrink-0 ${
                    activeTab === cat ? 'bg-digital-gradient text-white shadow-xl scale-105' : 'glass hover:bg-white dark:hover:bg-slate-800'
                  }`}>{cat}</button>
              ))}
            </div>
            
            <div className="relative min-h-[600px] mb-16">
              <AnimatePresence mode='wait'>
                <motion.div 
                  key={`${activeTab}-${currentPage}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {paginatedItems.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: idx * 0.04, 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      whileHover={{ y: -8 }}
                      className="group relative rounded-2xl overflow-visible transition-all duration-500 cursor-pointer p-1"
                      onClick={() => setSelectedProject(item)}
                    >
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 blur-3xl transition-all duration-500 rounded-2xl bg-digital-gradient -inset-2 group-hover:scale-110"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none rounded-2xl"
                        style={{ 
                          padding: '1px', 
                          background: 'linear-gradient(135deg, #007AFF 0%, #FF2D55 100%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude'
                        }}></div>
                      <div className="relative bg-white dark:bg-dark-surface rounded-2xl overflow-hidden z-10 border border-slate-100 dark:border-white/5 shadow-sm">
                        <div className="p-4 pb-0">
                          <div className="aspect-[16/10] overflow-hidden rounded-xl relative shadow-inner">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_infinite] pointer-events-none"></div>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[8px] font-black tracking-widest text-tech-blue bg-tech-blue/5 px-2 py-0.5 rounded uppercase border border-tech-blue/20">{item.category}</span>
                            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-tech-blue" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black mb-2 tracking-tight transition-all duration-300 text-slate-900 dark:text-white group-hover:bg-digital-gradient group-hover:bg-clip-text group-hover:text-transparent">
                            {item.title}
                          </h3>
                          <p className="opacity-50 text-[12px] md:text-[13px] font-medium line-clamp-2 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pb-8">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-4 glass rounded-2xl text-slate-400 hover:text-tech-blue disabled:opacity-20 transition-all hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-14 h-14 rounded-2xl text-sm font-black transition-all relative overflow-hidden group/page ${
                      currentPage === pageNum 
                        ? 'bg-digital-gradient text-white shadow-xl scale-110' 
                        : 'glass text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="relative z-10">{pageNum}</span>
                    {currentPage !== pageNum && (
                      <div className="absolute inset-0 bg-digital-gradient opacity-0 group-hover/page:opacity-10 transition-opacity"></div>
                    )}
                  </button>
                ))}

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-4 glass rounded-2xl text-slate-400 hover:text-tech-blue disabled:opacity-20 transition-all hover:scale-110 active:scale-95"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="服务" className="py-24 px-6 sm:px-10 lg:px-16 scroll-mt-20 relative overflow-visible">
          <div className="container mx-auto max-w-screen-xl">
            <SectionHeader tag="Service Workflow" title="全链路设计服务" subtitle="标准化的设计体系，确保每一个项目都能高效产出顶尖品质" watermark="PROCESS" />
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {SERVICES.map((s, idx) => (
                <ServiceCard key={s.phase} service={s} index={idx} />
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-[12px] md:text-[14px] font-bold opacity-20 tracking-[0.2em] uppercase italic">
                从策略规划到落地交付，全链路保障设计质量
              </p>
            </motion.div>
          </div>
        </section>

        <section id="关于" ref={contactSectionRef} className="py-24 px-6 sm:px-10 lg:px-16 scroll-mt-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-tech-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tech-pink/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto max-w-screen-xl">
            <div className="bg-slate-900 dark:bg-slate-800/40 text-white rounded-[2rem] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
              <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none"></div>
              <div className="p-8 md:p-12 lg:p-14 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start relative z-10">
                <div className="relative space-y-8">
                  <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -top-8 -left-8 w-16 h-16 glass rounded-2xl border-white/10 flex items-center justify-center -rotate-12 shadow-2xl backdrop-blur-md opacity-40 lg:opacity-100">
                    <Layers className="text-tech-cyan" size={24} />
                  </motion.div>
                  <div className="relative">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-4">
                       <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tighter">
                        聊聊你的<br />
                        <span className="relative inline-block pb-3">
                          <span className="text-white">下一个</span>
                          <span className="text-4xl md:text-5xl lg:text-6xl mx-2 scale-110 inline-block bg-neon-gradient bg-clip-text text-transparent italic filter drop-shadow-[0_0_8px_rgba(90,200,250,0.4)]">「爆款」</span>
                          <span className="bg-neon-gradient bg-clip-text text-transparent italic filter drop-shadow-[0_0_6px_rgba(52,199,89,0.3)]">创意✨</span>
                          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-800 rounded-full overflow-hidden mt-3">
                             <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-gradient-to-r from-transparent via-tech-cyan to-transparent shadow-[0_0_15px_rgba(90,200,250,0.8)]"></motion.div>
                          </div>
                        </span>
                      </h2>
                    </motion.div>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[14px] md:text-base opacity-40 mt-8 max-w-md font-medium tracking-wide leading-relaxed">
                      我已经准备好接受新的挑战，无论是从0到1的新产品，还是旧貌换新颜的优化。期待与您碰撞出数字体验的新火花。
                    </motion.p>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-4 relative group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tech-blue/20 to-tech-cyan/20 flex items-center justify-center text-tech-cyan">
                        <Award size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-2xl font-black tracking-tighter">5+ 年</div>
                        <div className="text-[10px] font-bold opacity-30 tracking-tight">全链路设计沉淀</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tech-pink/20 to-orange-500/20 flex items-center justify-center text-tech-pink">
                        <Rocket size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-2xl font-black tracking-tighter">100+ 个</div>
                        <div className="text-[10px] font-bold opacity-30 tracking-tight">成功案例验证</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[0.5px] bg-white/10 my-4"></div>
                  <div className="space-y-4 pt-2">
                    <ContactItem icon={MessageCircle} label="Wechat ID" value="guo10525555" colorClass="text-tech-green" />
                    <ContactItem icon={Phone} label="Contact Phone" value="18798034963" colorClass="text-tech-cyan" />
                    <ContactItem icon={Mail} label="Email Address" value="guoyuan1052@163.com" colorClass="text-tech-blue" />
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="relative">
                  <div className="absolute -inset-4 bg-tech-blue/10 blur-[60px] rounded-[2rem] opacity-40"></div>
                  <div className="glass p-6 md:p-10 rounded-[1.5rem] border-white/10 shadow-2xl relative z-10 backdrop-blur-2xl">
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputGroup label="姓名" placeholder="请输入" required />
                        <InputGroup label="公司 / 产品名" placeholder="请输入" required />
                        <InputGroup label="联系方式" placeholder="请输入" required />
                        <CustomSelect 
                          label="项目类型" 
                          placeholder="请选择" 
                          options={['App 移动端设计', 'Web 站点设计', 'B端管理后台', '可视化大屏', '品牌视觉 / Logo', 'AI 创意作品']} 
                        />
                        <CustomSelect 
                          label="设计阶段" 
                          placeholder="请选择" 
                          options={['全新设计 (从0到1)', '优化迭代 (旧貌换新颜)']} 
                        />
                        <CustomSelect 
                          label="预算范围" 
                          placeholder="请选择" 
                          options={['￥100 - ￥500', '￥500 - ￥1000', '￥1000 - ￥2000', '￥1000 - ￥5000', '￥5000以上']} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">项目描述</label>
                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-tech-blue/50 focus:ring-4 focus:ring-tech-blue/10 outline-none text-[14px] resize-none transition-all placeholder:text-white/40" placeholder="请输入内容描述"></textarea>
                      </div>
                      <button type="submit" disabled={formSubmitted} className="w-full py-4 bg-digital-gradient rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl text-lg disabled:opacity-50 tracking-tight">
                        {formSubmitted ? "发送成功！" : "立即开启我们的创意合作"} <Send size={20} />
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-16 px-6 border-t border-slate-100 dark:border-white/5">
          <div className="container mx-auto max-w-screen-xl flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center">
               <span className="text-2xl font-black tracking-tighter bg-digital-gradient bg-clip-text text-transparent">元启设计.</span>
            </div>
            <p className="text-[14px] italic font-medium opacity-30 text-center tracking-wide">"设计不仅是像素的排列，更是灵魂的对话。"</p>
            <div className="flex gap-4">
              {[Smartphone, Monitor, Box, Sparkles].map((Icon, i) => (
                <div key={i} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-tech-blue transition-all cursor-pointer hover:scale-110"><Icon size={18} /></div>
              ))}
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedProject(null)}>
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 50 }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-w-screen-xl bg-white dark:bg-dark-surface rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Weakened Top Close Button with a touch of color - Absolute positioned */}
              <div className="absolute top-8 right-8 z-[110]">
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-tech-pink/30 group flex-shrink-0 shadow-lg backdrop-blur-md"
                >
                  <X size={20} className="text-white/20 group-hover:text-tech-pink transition-colors group-hover:scale-110" />
                </button>
              </div>

              {/* Modal Content - Scrollable Area containing everything to follow scroll */}
              <div className="flex-grow overflow-y-auto no-scrollbar pb-12">
                <div className="p-8 md:p-14">
                  {/* Modal Header inside scrollable area */}
                  <div className="space-y-6 max-w-4xl mb-12">
                     {/* Removed Pill Indicator and Category Name as requested */}
                     
                     <div className="space-y-4">
                      {/* Reduced font size by approx 8px scale (one tailwind step down) */}
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white drop-shadow-lg">
                        {selectedProject.title}
                      </h2>
                      {/* Removed italic style from introduction */}
                      <p className="text-lg md:text-2xl opacity-50 leading-relaxed font-medium tracking-wide text-white/80">
                        {selectedProject.description}
                      </p>
                     </div>
                  </div>

                  {/* Main Image - Clean, no shadow, smaller border-radius */}
                  <div className="w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 relative">
                    <img 
                      src={selectedProject.imageUrl} 
                      className="w-full h-auto block" 
                      alt={selectedProject.title} 
                    />
                  </div>

                  {/* Footer Branding */}
                  <div className="mt-20 pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-8">
                      <Logo />
                      <div className="hidden lg:block w-[1px] h-10 bg-slate-200 dark:bg-white/10"></div>
                      <span className="hidden lg:block text-[13px] font-bold opacity-20 italic tracking-widest uppercase">YUAN QI DESIGN Portfolio</span>
                    </div>
                    {/* Only showing closing note for better flow */}
                    <div className="opacity-20 text-[12px] font-black tracking-[0.2em] uppercase">
                      End of Presentation
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const ContactItem: React.FC<{ icon: any; label: string; value: string; colorClass: string }> = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex items-center gap-4 group cursor-pointer w-fit">
    <div className={`w-10 h-10 glass rounded-xl flex items-center justify-center group-hover:bg-white/5 transition-all group-hover:scale-110 shadow-lg border-white/10 ${colorClass}`}>
      <Icon size={18} />
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">{label}</span>
      <span className="font-bold text-[14px] md:text-base">{value}</span>
    </div>
  </div>
);

const InputGroup: React.FC<{ label: string; placeholder: string; required?: boolean }> = ({ label, placeholder, required }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{label}</label>
    <input required={required} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-tech-blue/50 focus:ring-4 focus:ring-tech-blue/10 outline-none text-[14px] transition-all placeholder:text-white/40" placeholder={placeholder} />
  </div>
);

const ServiceCard: React.FC<{ service: any; index: number }> = ({ service, index }) => {
  const accent = index === 0 ? 'tech-blue' : index === 1 ? 'tech-pink' : 'tech-green';
  const gradBase = index === 0 ? 'rgba(0,122,255,0.08)' : index === 1 ? 'rgba(255,45,85,0.08)' : 'rgba(52,199,89,0.08)';
  const borderHoverClass = index === 0 ? 'group-hover:border-tech-blue/40' : index === 1 ? 'group-hover:border-tech-pink/40' : 'group-hover:border-tech-green/40';
  const subTitles = ['「精准定位・夯实设计根基」', '「沉浸体验・打造视觉记忆点」', '「高效落地・保障开发一致性」'];

  const getIconAnimation = (): any => {
    switch (index) {
      case 0: return { animate: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }, transition: { duration: 2, repeat: Infinity } };
      case 1: return { animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }, transition: { duration: 2.5, repeat: Infinity } };
      case 2: return { animate: { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }, transition: { duration: 3, repeat: Infinity } };
      default: return {};
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="group relative rounded-[2rem] h-full transition-all duration-500">
      <div className="absolute -top-6 -left-4 text-7xl font-black leading-none italic select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-all duration-700">0{index + 1}</div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-3xl transition-all duration-700 rounded-[2rem] -inset-1 group-hover:scale-105 pointer-events-none" style={{ background: `linear-gradient(135deg, ${index === 0 ? '#007AFF' : index === 1 ? '#FF2D55' : '#34C759'} 0%, transparent 100%)` }}></div>
      <div 
        className={`relative z-10 glass p-8 md:p-10 rounded-[2rem] border border-white/10 ${borderHoverClass} transition-all duration-500 h-full flex flex-col shadow-2xl overflow-hidden`}
        style={{ 
          background: `linear-gradient(165deg, ${gradBase} 0%, rgba(15,23,42,0) 100%)`,
          boxShadow: `inset 0 0 50px rgba(255,255,255,0.04)`
        }}
      >
        <div className="flex justify-between items-start mb-8 md:mb-10">
          <motion.div {...getIconAnimation()} className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all bg-white/5 border-white/10 text-${accent} shadow-inner`}>
            {index === 0 ? <Search size={26} /> : index === 1 ? <PenTool size={26} /> : <CheckCircle2 size={26} />}
          </motion.div>
          <div className="text-right">
            <div className="text-[9px] font-black opacity-30 tracking-[0.2em] uppercase mb-1">Timeframe</div>
            <div className={`font-black text-[12px] tracking-widest text-${accent}`}>{service.duration}</div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-2">{service.phase}</h3>
          <p className={`text-[11px] font-black tracking-tight opacity-40 text-${accent}`}>{subTitles[index]}</p>
        </div>
        <div className="space-y-4 md:space-y-5 mb-10 flex-grow">
          {service.outputs.map((out: string) => (
            <div key={out} className="flex items-center gap-4 group/item opacity-40 hover:opacity-100 transition-all duration-300">
              <div className={`w-1.5 h-1.5 rounded-full bg-${accent} shadow-[0_0_12px_${index === 0 ? '#007AFF' : index === 1 ? '#FF2D55' : '#34C759'}] group-hover/item:scale-150 transition-transform`}></div>
              <span className="text-[14px] md:text-[15px] font-bold tracking-tight leading-tight">{out}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 cursor-pointer group/btn opacity-20 hover:opacity-100 transition-all duration-300 mt-auto">
          <div className="text-[10px] font-black tracking-[0.4em] uppercase">Phase Details</div>
          <div className={`w-8 h-[1px] group-hover/btn:w-16 transition-all bg-${accent}`}></div>
          <ArrowRight size={14} className="opacity-0 -translate-x-3 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

export default App;
