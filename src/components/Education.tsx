import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 bg-foreground text-background transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Education Timeline */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Education
              </h2>
            </div>
            
            <div className="space-y-10 border-l-2 border-background/10 pl-10 ml-2">
              {education.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative space-y-2 group"
                >
                  <div className="absolute -left-[49px] top-1.5 h-5 w-5 rounded-full bg-foreground border-4 border-background group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">{item.period}</p>
                  <h3 className="text-xl md:text-2xl font-semibold text-background tracking-tight leading-tight">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Work Experience Summary Timeline */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Work Experience
            </h2>
            
            <div className="space-y-10 border-l-2 border-background/10 pl-10 ml-2">
              {portfolioData.experiences.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative space-y-2 group"
                >
                  <div className="absolute -left-[49px] top-1.5 h-5 w-5 rounded-full bg-foreground border-4 border-background group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">{item.period}</p>
                  <h3 className="text-xl md:text-2xl font-semibold text-background tracking-tight leading-tight">{item.company}</h3>
                  <p className="text-xs font-medium uppercase tracking-widest text-[#6f6f6f]">{item.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
