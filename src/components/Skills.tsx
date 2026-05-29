import { motion } from 'framer-motion';

import logo3dsMax from '../assets/tech_icons/3dsmax_logo.webp';
import logoSketchUp from '../assets/tech_icons/sketchup_logo.webp';
import logoD5Render from '../assets/tech_icons/d5render_logo.webp';
import logoAutoCAD from '../assets/tech_icons/Autocad_logo.webp';
import logoVRay from '../assets/tech_icons/v-ray_logo.webp';
import logoPhotoshop from '../assets/tech_icons/Adobe Photoshop_logo.webp';

const techItems = [
  { name: '3dsMax', icon: logo3dsMax },
  { name: 'SketchUp', icon: logoSketchUp },
  { name: 'D5 Render', icon: logoD5Render },
  { name: 'AutoCAD', icon: logoAutoCAD },
  { name: 'V-Ray', icon: logoVRay },
  { name: 'Photoshop', icon: logoPhotoshop },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background text-foreground border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Design Tools <span className="text-primary italic">& Skills</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techItems.map((item) => (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                }}
                key={item.name} 
                className="flex flex-col items-center justify-center p-6 bg-foreground/[0.02] rounded-3xl border border-foreground/5 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
              >
                <img src={item.icon} alt={item.name} loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
                <span className="text-xs font-bold mt-4 uppercase tracking-wider text-foreground/80 whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
}
