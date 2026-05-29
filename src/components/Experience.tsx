import { useRef, useState, lazy, Suspense } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { ProjectData } from './Projects';

// 모달은 무거운 컴포넌트라 첫 오픈 시점까지 청크 로딩을 지연 (코드 스플릿)
const ProjectModal = lazy(() => import('./ProjectModal'));

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
  // 한 번이라도 모달을 연 적 있으면 계속 마운트 유지 → exit 애니메이션 보존하면서도 첫 오픈 전까지 청크 미로딩
  const modalEverOpened = useRef(false);
  if (selectedProject) modalEverOpened.current = true;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="experience" className="py-24 bg-background text-foreground transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Project <span className="text-primary italic">Portfolio</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
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
                {proj.thumbnail || (proj.images && proj.images.length > 0) ? (
                  <img
                    src={proj.thumbnail || (proj.images ? proj.images[0] : '')}
                    alt={proj.name}
                    loading="lazy"
                    decoding="async"
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
                  {proj.category && (
                    <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] mb-2">
                      {proj.category}
                    </p>
                  )}
                  <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight mb-2">
                    {proj.name}
                  </h4>
                  <p className="text-[11px] font-black text-foreground/40 uppercase tracking-widest">
                    {proj.period}
                  </p>
                </div>
                
                <p className="text-foreground/60 text-[15px] leading-relaxed flex-grow">
                  {proj.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {modalEverOpened.current && (
        <Suspense fallback={null}>
          <ProjectModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            project={selectedProject}
          />
        </Suspense>
      )}
    </section>
  );
}
