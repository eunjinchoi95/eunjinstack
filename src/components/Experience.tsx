import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import ProjectModal from './ProjectModal';
import type { ProjectData } from './Projects';

// Shared Tech brand colors mapping
const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('java') && !t.includes('script')) return 'bg-[#5382a1]/10 text-[#5382a1] border-[#5382a1]/20';
  if (t.includes('spring') || t.includes('jpa')) return 'bg-[#6db33f]/10 text-[#6db33f] border-[#6db33f]/20';
  if (t.includes('redis')) return 'bg-[#dc382d]/10 text-[#dc382d] border-[#dc382d]/20';
  if (t.includes('oracle')) return 'bg-[#f80000]/10 text-[#f80000] border-[#f80000]/20';
  if (t.includes('postgres')) return 'bg-[#336791]/10 text-[#336791] border-[#336791]/20';
  if (t.includes('kafka')) return 'bg-gray-800/10 text-gray-800 border-gray-800/20';
  if (t.includes('ext js') || t.includes('netjs')) return 'bg-[#86b81b]/10 text-[#86b81b] border-[#86b81b]/20';
  if (t.includes('api')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
  return 'bg-foreground/5 text-foreground/60 border-foreground/10';
};

interface WorkItem {
  id: number;
  company: string;
  logo: string;
  role: string;
  period: string;
  description: string;
}

interface ExperienceProps {
  work: WorkItem[];
  projects: ProjectData[];
}

export default function Experience({ work, projects }: ExperienceProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-24 bg-background text-foreground transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Career <span className="text-primary italic">Experience</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </motion.div>
        
        {/* Work Experience Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-2xl font-black uppercase tracking-widest text-foreground/40 italic">01.</h3>
            <h3 className="text-2xl font-black uppercase tracking-widest">Work Experience</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {work.map(exp => (
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                key={exp.id} 
                className="group bg-white p-8 md:p-12 rounded-[2.5rem] border border-foreground/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-bl-full pointer-events-none group-hover:bg-primary/[0.05] transition-colors duration-500" />
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    {exp.logo && (
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-background rounded-3xl border border-foreground/5 flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform duration-500">
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{exp.company}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">{exp.role}</span>
                        <span className="text-xs font-bold opacity-30 uppercase flex items-center gap-1">
                          <Calendar size={12} /> {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <p className="text-foreground/70 leading-relaxed text-lg font-medium md:pl-[6.5rem]">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project History Section */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-2xl font-black uppercase tracking-widest text-foreground/40 italic">02.</h3>
            <h3 className="text-2xl font-black uppercase tracking-widest">Project History</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {displayedProjects.map((proj) => (
                <motion.div 
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  key={proj.id} 
                  onClick={() => setSelectedProject(proj)}
                  className="group bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-6 right-6 text-foreground/10 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                    <ExternalLink size={24} />
                  </div>
                  
                  <div className="flex items-center gap-5 mb-6">
                    {proj.logo && (
                      <div className="w-14 h-14 bg-white rounded-2xl border border-foreground/5 flex items-center justify-center p-2.5 flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110">
                        <img src={proj.logo} alt={proj.name} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
                        {proj.name}
                      </h4>
                      <p className="text-[11px] font-black text-primary/60 uppercase tracking-widest mt-1">
                        {proj.period}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-foreground/60 text-[15px] leading-relaxed mb-8 flex-grow">
                    {proj.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-foreground/5">
                    {proj.tech?.map(tech => (
                      <span key={tech} className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-widest border transition-all duration-300 ${getTechColor(tech)}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {projects.length > 4 && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="group flex items-center gap-3 px-10 py-4 bg-foreground text-background font-black rounded-full hover:bg-primary transition-all duration-500 shadow-xl hover:shadow-primary/20 uppercase tracking-[0.2em] text-xs"
              >
                {showAllProjects ? (
                  <>Collapse <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show More Projects ({projects.length - 4}) <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
}
