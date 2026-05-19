import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  icon?: string;
}

interface SkillsProps {
  skills: {
    design: TechItem[];
    adobe: TechItem[];
    office: TechItem[];
  };
}

const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('autocad')) return 'bg-blue-600/10 text-blue-600 border-blue-600/30';
  if (t.includes('sketchup')) return 'bg-red-500/10 text-red-500 border-red-500/30';
  if (t.includes('3dsmax')) return 'bg-emerald-600/10 text-emerald-600 border-emerald-600/30';
  if (t.includes('photoshop')) return 'bg-blue-400/10 text-blue-500 border-blue-400/30';
  if (t.includes('v-ray')) return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
  if (t.includes('illustrator')) return 'bg-orange-600/10 text-orange-600 border-orange-600/30';
  return 'bg-foreground/5 text-foreground/60 border-foreground/10';
};

export default function Skills({ skills }: SkillsProps) {
  const StackCategory = ({ title, items }: { title: string, items?: TechItem[] }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-12 w-full last:mb-0">
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
            Design Tools & Skills
          </h2>
        </div>
        
        <div className="flex flex-col bg-foreground/[0.02] p-8 md:p-14 rounded-[2.5rem] border border-foreground/5 shadow-inner">
          <StackCategory title="Design Tools" items={skills.design} />
          <StackCategory title="Adobe Suite" items={skills.adobe} />
          <StackCategory title="Office Suite" items={skills.office} />
        </div>
      </div>
    </section>
  );
}
