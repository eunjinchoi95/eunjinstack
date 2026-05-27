import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, BrainCircuit, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import profileImage from '../assets/images/profile_new.webp';

export default function About() {
  const { about } = portfolioData;

  const renderHighlightedText = (text: string) => {
    const highlights = [
      "3D 디자이너",
      "실내건축디자인",
      "인테리어 설계",
      "건축 CG",
      "LED 설계",
      "AutoCAD",
      "SketchUp",
      "3dsMax",
      "Photoshop",
      "V-Ray",
      "도면 작업",
      "3D 시안",
      "공간을 실제 구현 가능한 형태로 시각화",
      "노션",
      "팀 내 시스템 구축",
      "도면 정리 시스템"
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
                <motion.span 
                  key={`${s}-${i}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mx-0.5 inline-flex font-light whitespace-nowrap"
                >
                  {s.split('').map((char, charIdx) => (
                    <span key={charIdx} className="relative inline-block px-[0.5px]">
                      {char !== ' ' && (
                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] bg-primary rounded-full" />
                      )}
                      {char}
                    </span>
                  ))}
                </motion.span>
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
    <section id="about" className="py-24 md:py-32 bg-background text-foreground overflow-hidden border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          {/* Left Side: Profile Image & Details */}
          <div className="w-full lg:w-4/12 flex flex-col items-center lg:items-start space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="w-full flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[240px] md:max-w-[260px] bg-foreground/5 rounded-[2rem] overflow-hidden shadow-2xl group border border-foreground/5">
                  <img
                    src={profileImage}
                    alt="CHOI EUN JIN"
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 border-[6px] border-white/10 rounded-[2rem] pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Details moved here (under profile image) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-full max-w-[260px] grid grid-cols-1 gap-y-6 pt-4"
            >
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <MapPin size={14} /> Location
                </p>
                <p className="text-sm font-bold">{about.location}</p>
              </div>
              
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <BrainCircuit size={14} /> MBTI
                </p>
                <p className="text-sm font-bold text-primary">{about.mbti}</p>
              </div>
              
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Mail size={14} /> Email
                </p>
                <p className="text-sm font-bold truncate">
                   <a href={`mailto:${email}`} className="hover:text-primary transition-all underline decoration-primary/20 underline-offset-4 hover:decoration-primary">
                     {email}
                   </a>
                </p>
              </div>
              
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                   <Phone size={14} /> Contact
                </p>
                <p className="text-sm font-bold">
                  <a href={`tel:${mobile.replace(/-/g, '')}`} className="hover:text-primary transition-all underline decoration-primary/20 underline-offset-4 hover:decoration-primary">
                    {mobile}
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side: Introduction Text */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full lg:w-8/12 space-y-12"
          >
            <div className="space-y-8 text-left">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">
                  About <span className="text-primary italic">Me</span>
                </h2>
              </div>
              
              <div className="space-y-12">
                {about.summary.map((text, i) => (
                  <motion.p 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
                    viewport={{ once: true }}
                    className="text-base md:text-lg text-foreground/80 font-light text-left"
                    style={{ lineHeight: 3.5 }}
                  >
                    {renderHighlightedText(text)}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
