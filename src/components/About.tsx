import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, BrainCircuit, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import profileImage from '../assets/images/profile_new.jpg';

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
      "공간을 실제 구현 가능한 형태로 시각화"
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
    <section id="about" className="py-16 md:py-24 bg-background text-foreground overflow-hidden border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Profile Image - Original Aspect Ratio */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-4/12 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px] bg-foreground/5 text-background rounded-3xl overflow-hidden shadow-xl group border border-foreground/5">
                <img
                  src={profileImage}
                  alt="CHOI EUN JIN"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 border-[4px] border-white/10 rounded-3xl pointer-events-none"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-8/12 space-y-10"
          >
            <div className="space-y-6 text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
                About <span className="text-primary">Me</span>
              </h2>
              
              <div className="space-y-4">
                {about.summary.map((text, i) => (
                  <p key={i} className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium text-left">
                    {renderHighlightedText(text)}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 pt-8 border-t border-foreground/5">
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <MapPin size={14} /> Location
                </p>
                <p className="text-base font-bold">{about.location}</p>
              </div>
              
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <BrainCircuit size={14} /> MBTI
                </p>
                <p className="text-base font-bold text-primary">{about.mbti}</p>
              </div>
              
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Mail size={14} /> Email
                </p>
                <p className="text-base font-bold truncate">
                   <a href={`mailto:${email}`} className="hover:text-primary transition-all underline decoration-primary/20 underline-offset-4 hover:decoration-primary">
                     {email}
                   </a>
                </p>
              </div>
              
              <div className="space-y-1 group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                   <Phone size={14} /> Contact
                </p>
                <p className="text-base font-bold">
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
