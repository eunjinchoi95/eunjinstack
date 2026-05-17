import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Calendar, ExternalLink } from 'lucide-react';
import type { ProjectData } from './Projects';

// Tech brand colors mapping
const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('java') && !t.includes('script')) return 'bg-[#5382a1]/10 text-[#5382a1] border-[#5382a1]/30';
  if (t.includes('spring')) return 'bg-[#6db33f]/10 text-[#6db33f] border-[#6db33f]/30';
  if (t.includes('redis')) return 'bg-[#dc382d]/10 text-[#dc382d] border-[#dc382d]/30';
  if (t.includes('oracle')) return 'bg-[#f80000]/10 text-[#f80000] border-[#f80000]/30';
  if (t.includes('postgres')) return 'bg-[#336791]/10 text-[#336791] border-[#336791]/30';
  if (t.includes('kafka')) return 'bg-foreground/10 text-foreground/80 border-foreground/20';
  if (t.includes('api')) return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
  return 'bg-foreground/5 text-foreground/60 border-foreground/10';
};

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project || !mounted) return null;

  const detailImages = project.images || [];

  const renderDescriptionWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noreferrer" 
            className="text-primary hover:underline inline-flex items-center gap-1 font-bold"
          >
            {part} <ExternalLink size={14} />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl transition-colors duration-500 bg-background ring-1 ring-foreground/10`}
          >
            <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-foreground text-background transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
                title="Close Modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className={`h-full max-h-[90vh] overflow-y-auto custom-scrollbar`}>
              <div className="flex flex-col">
                <div className="p-8 md:p-12 pb-0 pt-16 transition-all bg-background">
                  <div className="space-y-3">
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs font-black text-primary uppercase tracking-[0.3em]"
                    >
                      {project.period}
                    </motion.p>
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none flex items-center gap-4"
                    >
                      {project.logo && <img src={project.logo} alt="logo" className="w-12 h-12 rounded-full bg-white border border-foreground/10 shadow-sm object-contain" />}
                      {project.name}
                    </motion.h2>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-16 transition-colors duration-500 bg-background text-foreground">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    <div className="md:col-span-2 space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        <h3 className="text-2xl font-black uppercase tracking-tight italic">Project Overview</h3>
                      </div>
                      <p className="text-lg leading-relaxed font-medium opacity-80 whitespace-pre-line">
                        {renderDescriptionWithLinks(project.detail)}
                      </p>
                    </div>

                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-primary">
                          <Tag className="h-4 w-4" />
                          Key Technologies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tech?.map((tag, i) => (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + (i * 0.05) }}
                              key={tag} 
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${getTechColor(tag)}`}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-primary">
                          <Calendar className="h-4 w-4" />
                          Period
                        </div>
                        <p className="font-bold text-sm uppercase tracking-tight opacity-60">
                          {project.period}
                        </p>
                      </div>
                    </div>
                  </div>

                  {detailImages.length > 0 && (
                    <div className="pt-16 border-t border-foreground/5">
                      <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black uppercase tracking-tight italic">Process & Details</h3>
                      </div>
                      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
                        {detailImages.map((image, index) => (
                          <div key={index} className="relative w-full overflow-hidden rounded-3xl bg-foreground/5">
                            <img
                              src={image}
                              alt={`${project.name} detail ${index + 1}`}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
