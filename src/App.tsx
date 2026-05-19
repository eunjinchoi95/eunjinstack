import { motion, type Variants } from 'framer-motion';
import { portfolioData } from './data/portfolioData';

// Placeholder imports until we port the actual components
import Navbar from './components/Navbar';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';

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
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
              CHOI <span className="text-primary italic">EUN JIN</span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mt-8 tracking-tight leading-tight whitespace-pre-line max-w-4xl">
              {data.hero.greeting.split('\n').map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.split(' ').map((word, i) => (
                    word.includes('3D') || word.includes('디자이너') 
                      ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block mr-2">{word}</span> 
                      : <span key={i} className="inline-block mr-2">{word}</span>
                  ))}
                </span>
              ))}
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
      
      {/* Contact CTA */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/5 pointer-events-none" />
        <div className="container mx-auto px-6 text-center space-y-12 relative z-10">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            Let's <br /> <span className="text-primary italic">Work Together</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="space-y-2">
              <p className="opacity-40 text-sm font-black uppercase tracking-[0.4em]">Email</p>
              <a href="mailto:jin0946@gmail.com" className="text-2xl md:text-3xl font-black tracking-tight hover:text-primary transition-colors">jin0946@gmail.com</a>
            </div>
            <div className="space-y-2">
              <p className="opacity-40 text-sm font-black uppercase tracking-[0.4em]">Phone</p>
              <a href="tel:01082070946" className="text-2xl md:text-3xl font-black tracking-tight hover:text-primary transition-colors">010-8207-0946</a>
            </div>
          </div>
          <div className="pt-8">
            <a 
              href="mailto:jin0946@gmail.com"
              className="group relative px-16 py-6 bg-primary text-white rounded-full font-black text-xl hover:scale-105 transition-all inline-block shadow-2xl hover:shadow-primary/40 overflow-hidden"
            >
              <span className="relative z-10">Say Hello</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
