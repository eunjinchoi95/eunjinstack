import { useEffect, lazy, Suspense } from 'react';
import { motion, type Variants } from 'framer-motion';
import { portfolioData } from './data/portfolioData';

// Placeholder imports until we port the actual components
import Navbar from './components/Navbar';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import TextType from './components/TextType';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Aurora는 ogl(WebGL) 기반 장식 배경이라 별도 청크로 분리해 초기 번들에서 제외
const Aurora = lazy(() => import('./components/Aurora'));

function App() {
  const data = portfolioData;

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Auto-scroll logic from Hero to About
  useEffect(() => {
    let isThrottled = false;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      
      if (isThrottled) {
        lastScrollY = currentScrollY;
        return;
      }
      
      const threshold = 50; // 50px 이상 스크롤 시 발동

      // 1. 최상단(0)에서 아래로 살짝 내릴 때만 자동 스크롤 발동
      if (isScrollingDown && currentScrollY > 0 && currentScrollY < threshold) {
        isThrottled = true;
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          isThrottled = false;
        }, 1000);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen px-6 overflow-hidden relative bg-[#030303]">
        {/* Dynamic Aurora Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <Suspense fallback={null}>
            <Aurora
              colorStops={["#9e9cff", "#524fee", "#2421d8"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </Suspense>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto py-24 md:py-32 relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-lg backdrop-blur-sm">
              PORTFOLIO
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white">
              CHOI <span className="text-primary italic">EUN JIN</span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mt-8 tracking-tight leading-relaxed whitespace-pre-line max-w-4xl h-[4em] flex items-center justify-center">
              <TextType 
                text={data.hero.greeting}
                typingSpeed={70}
                pauseDuration={3000}
                loop={true}
                cursorCharacter="_"
                cursorClassName="text-primary"
              />
            </motion.h2>
            
            <motion.p variants={itemVariants} className="max-w-[700px] text-lg md:text-xl text-white/60 font-medium leading-relaxed whitespace-pre-line mt-6">
              {data.hero.description}
            </motion.p>
            
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group transition-all"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 group-hover:text-white/70 transition-colors">Scroll</span>
          <div className="flex flex-col -space-y-2 mt-1">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <ChevronDown size={20} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </motion.div>
          </div>
        </motion.button>

      </section>

      {/* Sections */}
      <About />
      <Education />
      <Skills />
      <div className="container mx-auto px-6 max-w-6xl">
        <hr className="border-t border-foreground/5" />
      </div>
      <Experience work={data.experiences} projects={data.projects} />
      
      {/* Consolidated Footer Section - Black Background with Subtle Glow */}
      <section className="bg-black text-white py-40 md:py-60 relative overflow-hidden">
        {/* Unified Radial Glow with Hero color #524fee */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#524fee]/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#524fee]/25 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-24 relative z-10">
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter">
              Let's Work Together
            </h2>
            <p className="text-3xl md:text-4xl font-bold italic text-white/60">
              Thank you for watching.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="flex flex-col -space-y-3 mb-2">
                <ChevronUp size={28} className="text-white/40 group-hover:text-white transition-colors duration-300" />
                <ChevronUp size={28} className="text-white/40 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-sm font-black tracking-[0.4em] text-white/60 group-hover:text-white transition-colors duration-300 uppercase">
                Top
              </span>
            </button>
            
            <div className="mt-20 text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">
              © 2026 CHOI EUN JIN
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default App;
