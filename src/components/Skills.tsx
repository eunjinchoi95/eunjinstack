import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  icon?: string;
}

interface SkillsProps {
  skills: {
    tools: TechItem[];
  };
}

const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('autocad')) return 'bg-red-600/10 text-red-600 border-red-600/30';
  if (t.includes('sketchup')) return 'bg-red-500/10 text-red-500 border-red-500/30';
  if (t.includes('3dsmax')) return 'bg-cyan-600/10 text-cyan-600 border-cyan-600/30';
  if (t.includes('photoshop')) return 'bg-blue-600/10 text-blue-600 border-blue-600/30';
  if (t.includes('v-ray')) return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
  if (t.includes('d5 render')) return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30';
  return 'bg-foreground/5 text-foreground/60 border-foreground/10';
};

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-24 bg-background text-foreground border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-black tracking-tight uppercase">
            Design Tools & Skills
          </h2>
        </div>
        
        <div className="bg-foreground/[0.02] p-8 md:p-14 rounded-[2.5rem] border border-foreground/5 shadow-inner">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-wrap gap-4"
          >
            {skills.tools.map(item => (
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                }}
                key={item.name} 
                className={`flex items-center px-8 py-4 rounded-2xl text-lg font-bold shadow-sm border ${getTechColor(item.name)} transition-all hover:scale-105 hover:shadow-md`}
              >
                {item.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
