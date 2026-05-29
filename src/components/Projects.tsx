import { useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// 모달은 무거운 컴포넌트라 첫 오픈 시점까지 청크 로딩을 지연 (코드 스플릿)
const ProjectModal = lazy(() => import('./ProjectModal'));

export interface ProjectData {
  id: number;
  category?: string;
  name: string;
  logo?: string;
  thumbnail?: string;
  period: string;
  description: string;
  tech?: string[];
  detail: string;
  images?: string[];
}

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 한 번이라도 모달을 연 적 있으면 계속 마운트 유지 → exit 애니메이션 보존하면서도 첫 오픈 전까지 청크 미로딩
  const modalEverOpened = useRef(false);
  if (isModalOpen) modalEverOpened.current = true;

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-24 bg-background text-foreground transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">
              Selected <br /> <span className="text-primary">Projects</span>
            </h2>
            <p className="opacity-60 font-medium">실무에서 담당한 주요 프로젝트</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            const thumbnail = project.thumbnail || (project.images && project.images.length > 0 ? project.images[0] : project.logo);

            return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative aspect-[16/10] bg-foreground/5 rounded-3xl overflow-hidden border border-foreground/5 mb-6 transition-colors">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 bg-white"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 font-black text-4xl italic group-hover:scale-110 transition-transform duration-500 px-4 text-center">
                    {project.name}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-background text-foreground h-12 w-12 rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 px-2">
                <p className="text-xs font-black text-primary uppercase tracking-widest">{project.period}</p>
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.logo && <img src={project.logo} alt="logo" className="w-6 h-6 object-contain bg-white rounded-full" />}
                  {project.name}
                </h3>
                <p className="opacity-60 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>

      {modalEverOpened.current && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}
    </section>
  );
}
