import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  icon?: string;
}

interface SkillsProps {
  skills: {
    backend: TechItem[];
    database: TechItem[];
    infrastructure?: TechItem[];
    frontend?: TechItem[];
  };
}

const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('java') && !t.includes('script')) return 'bg-[#5382a1]/10 text-[#5382a1] border-[#5382a1]/30';
  if (t.includes('spring') || t.includes('jpa')) return 'bg-[#6db33f]/10 text-[#6db33f] border-[#6db33f]/30';
  if (t.includes('redis')) return 'bg-[#dc382d]/10 text-[#dc382d] border-[#dc382d]/30';
  if (t.includes('oracle')) return 'bg-[#f80000]/10 text-[#f80000] border-[#f80000]/30';
  if (t.includes('postgres')) return 'bg-[#336791]/10 text-[#336791] border-[#336791]/30';
  if (t.includes('kafka')) return 'bg-foreground/10 text-foreground/80 border-foreground/20';
  if (t.includes('ext js') || t.includes('flex') || t.includes('netjs')) return 'bg-[#86b81b]/10 text-[#86b81b] border-[#86b81b]/30';
  return 'bg-foreground/5 text-foreground/60 border-foreground/10';
};

export default function Skills({ skills }: SkillsProps) {
  const StackCategory = ({ title, items }: { title: string, items?: TechItem[] }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-12 w-full">
        <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-foreground/10 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full"></span>
          {title}
        </h3>
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
          {items.map(item => (
            <motion.span 
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
              }}
              key={item.name} 
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-base font-bold shadow-sm border ${getTechColor(item.name)} transition-all hover:scale-105 hover:shadow-md`}
            >
              {item.icon && <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain bg-white rounded-full p-1 shadow-inner" />}
              {item.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-background text-foreground border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-black tracking-tight uppercase">
            Tech Stack
          </h2>
        </div>
        
        <div className="flex flex-col bg-foreground/[0.02] p-8 md:p-14 rounded-[2.5rem] border border-foreground/5 shadow-inner">
          <StackCategory title="Backend" items={skills.backend} />
          <StackCategory title="Database" items={skills.database} />
          <StackCategory title="Infrastructure" items={skills.infrastructure} />
          <StackCategory title="Frontend" items={skills.frontend} />
        </div>
      </div>
    </section>
  );
}
