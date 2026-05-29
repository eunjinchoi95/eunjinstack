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

  const groupImages = (images: string[]) => {
    // Basic grouping logic: assuming 1st is front, 2nd is left, 3rd is right
    // Handles 2 images cases too (front and alt)
    return {
      front: images[0] || null,
      left: images[1] || null,
      right: images[2] || null
    };
  };

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
                      className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none flex items-center gap-4"
                    >
                      {project.logo && <img loading="lazy" decoding="async" src={project.logo} alt="logo" className="w-12 h-12 rounded-full bg-white border border-foreground/10 shadow-sm object-contain" />}
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
                      <p className="text-base leading-relaxed font-medium opacity-80 whitespace-pre-line">
                        {renderDescriptionWithLinks(project.detail)}
                      </p>
                    </div>

                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-primary">
                          <Tag className="h-4 w-4" />
                          Program
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
                      
                      {/* Grid Layout for Image Sets (e.g., 4 images per set for Kukbo Design) */}
                      {project.id === 2 ? (
                        <div className="space-y-24">
                          {/* 1. Show Thumbnail First if it's the building exterior */}
                          <div className="space-y-4 mb-16">
                            <p className="text-[10px] font-black uppercase opacity-30 tracking-widest text-center">Project Exterior</p>
                            <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                              <img loading="lazy" decoding="async" src={detailImages[0]} alt="Thumbnail" className="w-full h-auto" />
                            </div>
                          </div>

                          {/* 2. Process Sets (Skip the first thumbnail image) */}
                          {Array.from({ length: (detailImages.length - 1) / 4 }).map((_, setIndex) => {
                            const setImages = detailImages.slice(setIndex * 4 + 1, setIndex * 4 + 5);
                            const sectionNames = ["Loyalty Gaming", "Main Column", "Mass Gaming Wall", "Secondary Entrance Door", "Secondary Entrance Wall"];
                            
                            return (
                              <div key={setIndex} className="space-y-8">
                                <div className="flex items-center gap-4">
                                  <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Area {setIndex + 1}</span>
                                  <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">{sectionNames[setIndex]}</h4>
                                </div>
                                
                                {/* 1. Plan & Perspective (Small, side-by-side, Same Height) */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase opacity-30 tracking-widest text-center">Floor Plan</p>
                                    <div className="relative overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 aspect-[4/3]">
                                      <img loading="lazy" decoding="async" src={setImages[0]} alt="Plan" className="w-full h-full object-cover object-center" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase opacity-30 tracking-widest text-center">Perspective View</p>
                                    <div className="relative overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 aspect-[4/3]">
                                      <img loading="lazy" decoding="async" src={setImages[1]} alt="Perspective" className="w-full h-full object-cover object-center" />
                                    </div>
                                  </div>
                                </div>
                                
                                {/* 2. Detail Images (Large, stacked) */}
                                <div className="space-y-6 pt-4">
                                  <p className="text-[10px] font-black uppercase opacity-30 tracking-widest text-center">Detail Visualization</p>
                                  <div className="relative overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5">
                                    <img loading="lazy" decoding="async" src={setImages[2]} alt="Detail 1" className="w-full h-auto" />
                                  </div>
                                  <div className="relative overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5">
                                    <img loading="lazy" decoding="async" src={setImages[3]} alt="Detail 2" className="w-full h-auto" />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : project.id === 3 ? (
                        <div className="space-y-24">
                          {[
                            { label: "중심 배치도", images: [detailImages[0], detailImages[1]] },
                            { label: "커뮤니티 배치도", images: [detailImages[2], detailImages[3]] },
                            { label: "경관 배치도", images: [detailImages[4], detailImages[5]] },
                            { label: "해안 배치도", images: [detailImages[6], detailImages[7]] },
                            { label: "단위 세대", images: [detailImages[8], detailImages[9]] },
                          ].map((group, groupIndex) => (
                            <div key={groupIndex} className="space-y-8">
                              <div className="flex items-center gap-4">
                                <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Section {groupIndex + 1}</span>
                                <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">{group.label}</h4>
                              </div>
                              <div className="grid grid-cols-1 gap-8">
                                {group.images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                                    <img loading="lazy" decoding="async" src={img} alt={`${group.label} ${imgIndex + 1}`} className="w-full h-auto" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : project.id === 4 ? (
                        <div className="space-y-24">
                          {[
                            { label: "스카이라운지 투시도", images: [detailImages[0]] },
                            { label: "주거단지 조감도", images: [detailImages[1]] },
                            { label: "커뮤니티 투시도", images: [detailImages[2]] },
                            { label: "문주 투시도", images: [detailImages[3], detailImages[4]] },
                            { label: "건물 시퀀스 투시도", images: [detailImages[5], detailImages[6], detailImages[7]] },
                          ].map((group, groupIndex) => (
                            <div key={groupIndex} className="space-y-8">
                              <div className="flex items-center gap-4">
                                <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">View {groupIndex + 1}</span>
                                <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">{group.label}</h4>
                              </div>
                              <div className="grid grid-cols-1 gap-8">
                                {group.label === "건물 시퀀스 투시도" ? (
                                  <>
                                    <div className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                                      <img loading="lazy" decoding="async" src={group.images[0]} alt={`${group.label} 1`} className="w-full h-auto" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="relative w-full overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 shadow-md aspect-[16/10]">
                                        <img loading="lazy" decoding="async" src={group.images[1]} alt={`${group.label} 2`} className="w-full h-full object-cover" />
                                      </div>
                                      <div className="relative w-full overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 shadow-md aspect-[16/10]">
                                        <img loading="lazy" decoding="async" src={group.images[2]} alt={`${group.label} 3`} className="w-full h-full object-cover" />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  group.images.map((img, imgIndex) => (
                                    <div key={imgIndex} className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                                      <img loading="lazy" decoding="async" src={img} alt={`${group.label} ${imgIndex + 1}`} className="w-full h-auto" />
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : project.id === 5 ? (
                        <div className="space-y-24">
                          <div className="space-y-8">
                            <div className="flex items-center gap-4">
                              <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Phase 1</span>
                              <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">3D 투시도 시안</h4>
                            </div>
                            <div className="flex flex-col gap-4">
                              {/* Front View */}
                              <div className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                                <p className="absolute top-4 left-6 z-10 text-[10px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full opacity-60">Front View</p>
                                <img loading="lazy" decoding="async" src={detailImages[0]} alt="Front View" className="w-full h-auto" />
                              </div>
                              {/* Left & Right Views */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="relative overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 shadow-md aspect-[16/10]">
                                  <p className="absolute top-3 left-4 z-10 text-[9px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-60">Left View</p>
                                  <img loading="lazy" decoding="async" src={detailImages[1]} alt="Left View" className="w-full h-full object-cover" />
                                </div>
                                <div className="relative overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 shadow-md aspect-[16/10]">
                                  <p className="absolute top-3 left-4 z-10 text-[9px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-60">Right View</p>
                                  <img loading="lazy" decoding="async" src={detailImages[2]} alt="Right View" className="w-full h-full object-cover" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-8">
                            <div className="flex items-center gap-4">
                              <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Phase 2</span>
                              <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">부스 설계 도면</h4>
                            </div>
                            <div className="flex flex-col gap-8">
                              {detailImages.slice(3, 7).map((img, i) => (
                                <div key={i} className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                                  <img loading="lazy" decoding="async" src={img} alt={`Drawing ${i + 1}`} className="w-full h-auto" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-8">
                            <div className="flex items-center gap-4">
                              <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Phase 3</span>
                              <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">가구 제작 도면</h4>
                            </div>
                            <div className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                              <img loading="lazy" decoding="async" src={detailImages[7]} alt="Furniture Detail Drawing" className="w-full h-auto" />
                            </div>
                          </div>
                        </div>
                      ) : project.id === 6 ? (
                        <div className="space-y-24">
                          {[
                            { label: "설계도", images: detailImages.slice(0, 4) },
                            { label: "결선도", images: detailImages.slice(4, 8) },
                            { label: "배치도", images: detailImages.slice(8, 12) },
                          ].map((group, groupIndex) => (
                            <div key={groupIndex} className="space-y-8">
                              <div className="flex items-center gap-4">
                                <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Type {groupIndex + 1}</span>
                                <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">{group.label}</h4>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {group.images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="relative w-full overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 shadow-md aspect-[4/3]">
                                    <img loading="lazy" decoding="async" src={img} alt={`${group.label} ${imgIndex + 1}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : project.id === 7 ? (
                        <div className="space-y-24">
                          {[
                            { label: "방송 스튜디오", images: groupImages(detailImages.slice(0, 2)) },
                            { label: "교회 대강당", images: groupImages(detailImages.slice(2, 5)) },
                            { label: "교회 소강당 (A)", images: groupImages(detailImages.slice(5, 8)) },
                            { label: "교회 소강당 (B)", images: groupImages(detailImages.slice(8, 11)) },
                            { label: "대형 교회 본당", images: groupImages(detailImages.slice(11, 14)) },
                            { label: "기업 로비", images: groupImages(detailImages.slice(14)) },
                          ].map((group, groupIndex) => (
                            <div key={groupIndex} className="space-y-8">
                              <div className="flex items-center gap-4">
                                <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Project {groupIndex + 1}</span>
                                <h4 className="text-xl font-bold uppercase tracking-tight opacity-80">{group.label}</h4>
                              </div>
                              <div className="flex flex-col gap-4">
                                {/* Front View - Large */}
                                {group.images.front && (
                                  <div className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                                    <p className="absolute top-4 left-6 z-10 text-[10px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full opacity-60">Front View</p>
                                    <img loading="lazy" decoding="async" src={group.images.front} alt={`${group.label} Front`} className="w-full h-auto" />
                                  </div>
                                )}
                                
                                {/* 방송 스튜디오 특수 레이아웃: 2번째 사진도 크게 (Top View) */}
                                {group.label === "방송 스튜디오" ? (
                                  group.images.left && (
                                    <div className="relative w-full overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 shadow-lg">
                                      <p className="absolute top-4 left-6 z-10 text-[10px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full opacity-60">Top View</p>
                                      <img loading="lazy" decoding="async" src={group.images.left} alt={`${group.label} Top`} className="w-full h-auto" />
                                    </div>
                                  )
                                ) : (
                                  /* Left & Right Views - Small Grid (기존 3장 구성용) */
                                  (group.images.left || group.images.right) && (
                                    <div className="grid grid-cols-2 gap-4">
                                      {group.images.left && (
                                        <div className="relative overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 shadow-md aspect-[16/10]">
                                          <p className="absolute top-3 left-4 z-10 text-[9px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-60">Left View</p>
                                          <img loading="lazy" decoding="async" src={group.images.left} alt={`${group.label} Left`} className="w-full h-full object-cover" />
                                        </div>
                                      )}
                                      {group.images.right && (
                                        <div className="relative overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/5 shadow-md aspect-[16/10]">
                                          <p className="absolute top-3 left-4 z-10 text-[9px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-60">Right View</p>
                                          <img loading="lazy" decoding="async" src={group.images.right} alt={`${group.label} Right`} className="w-full h-full object-cover" />
                                        </div>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : project.id === 8 ? (
                        <div className="space-y-32">
                          {Array.from({ length: detailImages.length / 2 }).map((_, i) => {
                            const labels = ["광장", "교회 (A)", "병원", "세미나실", "교회 (B)", "대학교", "매장", "관공서", "호텔"];
                            return (
                              <div key={i} className="space-y-10">
                                <div className="flex items-center gap-4 justify-center">
                                  <div className="h-px w-12 bg-primary/20" />
                                  <h4 className="text-xl font-black uppercase tracking-widest text-primary/60">{labels[i]}</h4>
                                  <div className="h-px w-12 bg-primary/20" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase opacity-30 tracking-widest text-center">Before</p>
                                    <div className="relative overflow-hidden rounded-[2rem] bg-foreground/5 border border-foreground/5 aspect-[4/3] shadow-inner">
                                      <img loading="lazy" decoding="async" src={detailImages[i * 2]} alt="Before" className="w-full h-full object-cover" />
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest text-center">After (Simulation)</p>
                                    <div className="relative overflow-hidden rounded-[2rem] bg-foreground/5 border border-primary/20 aspect-[4/3] shadow-2xl ring-4 ring-primary/5">
                                      <img loading="lazy" decoding="async" src={detailImages[i * 2 + 1]} alt="After" className="w-full h-full object-cover" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
                          {detailImages.map((image, index) => (
                            <div key={index} className="relative w-full overflow-hidden rounded-3xl bg-foreground/5">
                              <img
                                loading="lazy"
                                decoding="async"
                                src={image}
                                alt={`${project.name} detail ${index + 1}`}
                                className="w-full h-auto object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      )}
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
