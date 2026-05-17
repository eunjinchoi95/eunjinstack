import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, BrainCircuit, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import profileImage from '../assets/images/profile.jpeg';

export default function About() {
  const { about } = portfolioData;

  const renderHighlightedText = (text: string) => {
    const highlights = [
      "6년 차 백엔드 개발자",
      "Java",
      "Spring Framework",
      "Spring Boot",
      "Spring Batch",
      "Oracle",
      "Redis를 직접 도입",
      "데이터 적재 아키텍처",
      "캐싱 및 검색 성능을 크게 개선",
      "AI 에이전트",
      "비즈니스 가치 및 개발 생산성 증가"
    ];
    
    let parts: (string | React.ReactNode)[] = [text];

    highlights.forEach(highlight => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${highlight})`, 'g');
          const splitText = part.split(regex);
          splitText.forEach((s, i) => {
            if (s === highlight) {
              newParts.push(
                <span key={`${s}-${i}`} className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded-lg shadow-[0_2px_0_0_rgba(59,130,246,0.3)] mx-1 inline-block mb-1">
                  {s}
                </span>
              );
            } else if (s !== '') {
              newParts.push(s);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  const [email, mobile] = about.contact.split(' | ');

  return (
    <section id="about" className="py-16 md:py-32 bg-background text-foreground overflow-hidden border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
          {/* Profile Image - Optimized for all screens */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 flex justify-center lg:sticky lg:top-32"
          >
            <div className="relative aspect-square w-full max-w-[320px] md:max-w-[420px] lg:max-w-full bg-foreground/5 text-background rounded-[2.5rem] overflow-hidden shadow-2xl group border border-foreground/5">
                <img
                  src={profileImage}
                  alt="KIM YOUNG UNG"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 border-[8px] border-white/10 rounded-[2.5rem] pointer-events-none"></div>
            </div>
          </motion.div>
          
          {/* Text Content - Clear spacing on mobile */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12 space-y-12"
          >
            <div className="space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <p className="text-primary font-black uppercase tracking-[0.2em] text-sm">Professional Profile</p>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
                  About <span className="text-primary">Me</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                {about.summary.map((text, i) => (
                  <p key={i} className="text-[17px] md:text-lg text-foreground/80 leading-relaxed font-medium text-justify lg:text-left">
                    {renderHighlightedText(text)}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 pt-10 border-t border-foreground/5">
              <div className="space-y-2 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <MapPin size={14} /> Location
                </p>
                <p className="text-lg font-bold">{about.location}</p>
              </div>
              
              <div className="space-y-2 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <BrainCircuit size={14} /> MBTI
                </p>
                <p className="text-lg font-bold text-primary">{about.mbti}</p>
              </div>
              
              <div className="space-y-2 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Mail size={14} /> Email
                </p>
                <p className="text-lg font-bold truncate">
                   <a href={`mailto:${email}`} className="hover:text-primary transition-all underline decoration-primary/20 underline-offset-4 hover:decoration-primary">
                     {email}
                   </a>
                </p>
              </div>
              
              <div className="space-y-2 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                   <Phone size={14} /> Contact
                </p>
                <p className="text-lg font-bold">
                  <a href={`tel:${mobile.replace(/-/g, '')}`} className="hover:text-primary transition-all underline decoration-primary/20 underline-offset-4 hover:decoration-primary">
                    {mobile}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
