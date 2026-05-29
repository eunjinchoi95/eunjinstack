import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { BookOpen, ExternalLink, Image as ImageIcon, X, Bot, FileText } from 'lucide-react';

interface ExtraProps {
  training: any[];
  blogPosts?: any[];
  aiProjects?: any[];
}

// Shared Tech brand colors mapping
const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('java') && !t.includes('script')) return 'bg-[#5382a1]/10 text-[#5382a1] border-[#5382a1]/20';
  if (t.includes('spring')) return 'bg-[#6db33f]/10 text-[#6db33f] border-[#6db33f]/20';
  if (t.includes('redis')) return 'bg-[#dc382d]/10 text-[#dc382d] border-[#dc382d]/20';
  if (t.includes('oracle')) return 'bg-[#f80000]/10 text-[#f80000] border-[#f80000]/20';
  if (t.includes('postgres')) return 'bg-[#336791]/10 text-[#336791] border-[#336791]/20';
  if (t.includes('kafka')) return 'bg-gray-800/10 text-gray-800 border-gray-800/20';
  if (t.includes('ext js') || t.includes('netjs')) return 'bg-[#86b81b]/10 text-[#86b81b] border-[#86b81b]/20';
  if (t.includes('api')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
  return 'bg-foreground/5 text-foreground/60 border-foreground/10';
};

export default function Extra({ training, blogPosts = [], aiProjects = [] }: ExtraProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 px-4 bg-background text-foreground transition-colors duration-500 border-t border-foreground/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Training / Certificates */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black uppercase tracking-widest text-foreground/40 italic">03.</h3>
              <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                <span className="p-1.5 bg-primary/10 text-primary rounded-lg shadow-sm"><BookOpen size={20} /></span>
                Training & Courses
              </h3>
            </div>
            
            <ul className="space-y-5 flex-grow">
              {training.map(course => (
                <motion.li 
                  variants={itemVariants}
                  key={course.id} 
                  onClick={() => course.image && setSelectedImg(course.image)}
                  className={`group relative bg-white p-6 rounded-3xl border border-foreground/5 transition-all duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.02)] ${course.image ? 'cursor-pointer hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1' : ''}`}
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                      <span className="font-black text-foreground text-sm md:text-base leading-snug block mb-2 group-hover:text-primary transition-colors">{course.title}</span>
                      <div className="flex items-center flex-wrap gap-2 mt-1 uppercase tracking-widest opacity-60">
                        <span className="text-[10px] font-black">{course.provider}</span>
                        {course.period && <span className="text-[10px] font-black">| {course.period}</span>}
                      </div>
                      <div className="mt-5">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all duration-300 ${getTechColor(course.tech)}`}>{course.tech}</span>
                      </div>
                    </div>
                    {course.image && (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-foreground/5 flex-shrink-0 shadow-sm relative group-hover:shadow-primary/20 transition-all">
                        <img src={course.image} alt={course.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                          <ImageIcon size={20} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech Blog & AI Projects */}
          <div className="space-y-12">
              {blogPosts && blogPosts.length > 0 && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-black uppercase tracking-widest text-foreground/40 italic">04.</h3>
                    <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                      <span className="p-1.5 bg-orange-500/10 text-orange-500 rounded-lg shadow-sm"><FileText size={20} /></span>
                      Tech Blog Posts
                    </h3>
                  </div>
                  <ul className="space-y-5 flex-grow">
                    {blogPosts.map((post) => (
                      <motion.li variants={itemVariants} key={post.id}>
                        <a 
                          href={post.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="block bg-white p-6 rounded-3xl border border-foreground/5 hover:border-orange-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative"
                        >
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500/10 group-hover:bg-orange-500 transition-colors"></div>
                          <div className="pl-4 flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex gap-2 mb-3">
                                 {post.tags.map((tag: string) => (
                                   <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/5 px-2.5 py-1 rounded-md border border-orange-500/10">{tag}</span>
                                 ))}
                              </div>
                              <div className="font-black text-foreground group-hover:text-orange-500 transition-colors line-clamp-2 text-base leading-snug mb-3 tracking-tight">
                                {post.title}
                              </div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-foreground/30 group-hover:text-foreground/50 flex items-center gap-1 transition-colors">
                                Read on Tistory <ExternalLink size={12} />
                              </div>
                            </div>
                          </div>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {aiProjects && aiProjects.length > 0 && (
                <div className={`space-y-12 ${blogPosts && blogPosts.length > 0 ? 'pt-12' : ''}`}>
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-black uppercase tracking-widest text-foreground/40 italic">05.</h3>
                    <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                      <span className="p-1.5 bg-purple-500/10 text-purple-500 rounded-lg shadow-sm"><Bot size={20} /></span>
                      AI Agent Projects
                    </h3>
                  </div>
                  <ul className="space-y-5 flex-grow">
                    {aiProjects.map((post) => {
                    const hasLink = post.link && post.link !== '#';
                    const hasImage = !!post.image;

                    return (
                      <motion.li variants={itemVariants} key={post.id}>
                        <div 
                          onClick={() => {
                            if (hasLink) {
                              window.open(post.link, '_blank', 'noreferrer');
                            } else if (hasImage) {
                              setSelectedImg(post.image);
                            }
                          }}
                          className={`block bg-white p-6 rounded-3xl border border-foreground/5 transition-all duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group overflow-hidden relative cursor-pointer hover:border-purple-500/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1`}
                        >
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500/10 group-hover:bg-purple-500 transition-colors"></div>
                          <div className="pl-4 flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex gap-2 mb-3">
                                 {post.tags.map((tag: string) => (
                                   <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-purple-500 bg-purple-500/5 px-2.5 py-1 rounded-md border border-purple-500/10">{tag}</span>
                                 ))}
                              </div>
                              <div className="font-black text-foreground group-hover:text-purple-500 transition-colors line-clamp-2 text-base leading-snug mb-3 tracking-tight flex items-center gap-2">
                                {post.title}
                                {hasLink && <ExternalLink size={14} className="opacity-40" />}
                              </div>
                              <div className="text-[11px] font-bold text-foreground/50 leading-relaxed group-hover:text-foreground/70 transition-colors mb-4">
                                {post.description}
                              </div>
                            </div>
                            {hasImage && (
                              <div 
                                onClick={(e) => {
                                  if (hasLink) {
                                    e.stopPropagation();
                                    setSelectedImg(post.image);
                                  }
                                }}
                                className="w-16 h-16 rounded-2xl overflow-hidden border border-foreground/5 flex-shrink-0 shadow-sm relative transition-all group-hover:shadow-purple-500/20"
                              >
                                <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                  <ImageIcon size={20} className="text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Image Modal (Certificates & AI Projects) */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl z-[110] rounded-3xl overflow-hidden shadow-2xl bg-white border border-foreground/10"
            >
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-3 text-foreground bg-foreground/10 hover:bg-foreground/20 rounded-full transition-all duration-300 z-50 backdrop-blur-md"
              >
                <X size={24} />
              </button>
              <div className="p-4 sm:p-8 flex items-center justify-center">
                <img
                  src={selectedImg}
                  alt="Detail View"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
