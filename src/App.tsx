import { motion, type Variants } from 'framer-motion';
import { portfolioData } from './data/portfolioData';

// Placeholder imports until we port the actual components
import Navbar from './components/Navbar';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import ScrollFloat from './components/ScrollFloat';
import TextType from './components/TextType';

function App() {
  const data = portfolioData;

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
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto py-24 md:py-32 relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-foreground text-background rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-lg">
              PORTFOLIO
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
              CHOI <span className="text-primary italic">EUN JIN</span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mt-8 tracking-tight leading-relaxed whitespace-pre-line max-w-4xl h-[4em] flex items-center justify-center">
              <TextType 
                text={data.hero.greeting}
                typingSpeed={70}
                pauseDuration={3000}
                loop={true}
                cursorCharacter="_"
                cursorClassName="text-primary"
              />
            </motion.h2>
            
            <motion.p variants={itemVariants} className="max-w-[700px] text-lg md:text-xl opacity-50 font-medium leading-relaxed whitespace-pre-line mt-6">
              {data.hero.description}
            </motion.p>
            
          </div>
        </motion.div>

      </section>

      {/* Sections */}
      <About />
      <Education />
      <Skills skills={data.techStack} />
      <div className="container mx-auto px-6 max-w-6xl">
        <hr className="border-t border-foreground/5" />
      </div>
      <Experience work={data.experiences} projects={data.projects} />
      
      {/* Contact CTA - White Background (Forced even in dark mode as requested) */}
      <section className="py-24 md:py-32 bg-white text-foreground relative overflow-hidden">
        <div className="container mx-auto px-6 text-center space-y-4 relative z-10">
          <ScrollFloat 
            containerClassName="flex justify-center my-0"
            textClassName="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-[#1512ca]"
            scrollStart="top 90%"
            scrollEnd="bottom 60%"
          >
            Let's Work Together
          </ScrollFloat>
          <ScrollFloat 
            containerClassName="flex justify-center my-0"
            textClassName="text-3xl md:text-4xl font-bold italic mt-4 text-[#1512ca]"
            scrollStart="top 90%"
            scrollEnd="bottom 60%"
          >
            Thank you for watching.
          </ScrollFloat>
        </div>
      </section>

      {/* Blank Space - Black Background (Forced even in dark mode as requested) */}
      <section className="h-[30vh] bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/5 pointer-events-none" />
      </section>
    </div>
  );
}

export default App;
