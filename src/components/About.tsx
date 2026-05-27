import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import profileImage from '../assets/images/profile_new.webp';
import aboutMeImage from '../assets/images/about_me.webp';

export default function About() {
  const { about } = portfolioData;

  const [email, mobile] = about.contact.split(' | ');

  return (
    <section id="about" className="py-24 md:py-32 bg-background text-foreground overflow-hidden border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          {/* Left Side: Title, Profile Image & Details */}
          <div className="w-full lg:w-4/12 flex flex-col items-center lg:items-start space-y-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none self-start">
              About <span className="text-primary italic">Me</span>
            </h2>

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

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-full max-w-[260px] grid grid-cols-1 gap-y-6 pt-4"
            >
              <div className="space-y-1 group -mt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <MapPin size={14} /> Location
                </p>
                <p className="text-sm font-bold">{about.location}</p>
              </div>
              
              <div className="space-y-1 group mt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Mail size={14} /> Email
                </p>
                <p className="text-sm font-bold truncate">
                   <a href={`mailto:${email}`} className="hover:text-primary transition-all underline decoration-primary/20 underline-offset-4 hover:decoration-primary">
                     {email}
                   </a>
                </p>
              </div>
              
              <div className="space-y-1 group mt-4">
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
          
          {/* Right Side: Introduction Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full lg:w-12/12 pt-0 lg:pt-[88px]"
          >
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-foreground/5 shadow-2xl">
              <img 
                src={aboutMeImage} 
                alt="About Me Introduction" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 border-[6px] border-white/10 rounded-[2rem] pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
