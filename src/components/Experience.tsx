import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ProjectModal from './ProjectModal';
import type { ProjectData } from './Projects';

// Shared Tech brand colors mapping
const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('autocad')) return 'bg-blue-600/10 text-blue-600 border-blue-600/20';
  if (t.includes('sketchup')) return 'bg-red-500/10 text-red-500 border-red-500/20';
  if (t.includes('3dsmax')) return 'bg-emerald-600/10 text-emerald-600 border-emerald-600/20';
  if (t.includes('photoshop')) return 'bg-blue-400/10 text-blue-500 border-blue-400/20';
  if (t.includes('v-ray')) return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
  if (t.includes('illustrator')) return 'bg-orange-600/10 text-orange-600 border-orange-600/20';
  return 'bg-foreground/5 text-foreground/60 border-foreground/10';
};

interface WorkItem {
  id: number;
  company: string;
  logo?: string;
  role: string;
  period: string;
  description: string;
}

interface ExperienceProps {
  work: WorkItem[];
  projects: ProjectData[];
}

export default function Experience({ projects }: ExperienceProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Group projects by category
  const categories = ["01. 학교 프로젝트", "02. 국보디자인 프로젝트", "03. 코스펙에이비 프로젝트", "04. 한맥아이티 프로젝트"];
  
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
            Project <span className="text-primary italic">Portfolio</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </motion.div>
        
        {categories.map((category) => {
          const categoryProjects = projects.filter(p => p.category === category);
          if (categoryProjects.length === 0) return null;

          return (
            <div key={category} className="mb-24 last:mb-0">
              <div className="flex items-center gap-4 mb-12">
                <h3 className="text-2xl font-black uppercase tracking-widest text-foreground/40 italic">{category.split('.')[0]}.</h3>
                <h3 className="text-2xl font-black uppercase tracking-widest">{category.split('.')[1].trim()}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryProjects.map((proj) => (
                  <motion.div 
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    key={proj.id} 
                    onClick={() => setSelectedProject(proj)}
                    className="group bg-white rounded-[2rem] border border-foreground/5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col h-full"
                  >
                    {/* Project Image Preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                      {proj.images && proj.images.length > 0 ? (
                        <img 
                          src={proj.images[0]} 
                          alt={proj.name} 
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20 font-black italic text-2xl">
                          NO IMAGE
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm text-foreground p-3 rounded-full shadow-xl">
                          <ExternalLink size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="mb-6">
                        <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight mb-2">
                          {proj.name}
                        </h4>
                        <p className="text-[11px] font-black text-primary/60 uppercase tracking-widest">
                          {proj.period}
                        </p>
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
}
