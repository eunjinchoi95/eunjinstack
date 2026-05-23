import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Remove dark mode class if it exists and clean up theme in local storage
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'CAREER', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#experience' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm border-b border-foreground/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-black tracking-tighter hover:text-primary transition-colors">
          EUNJIN<span className="text-primary italic">STACK</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-[13px] font-bold uppercase tracking-widest hover:text-primary transition-all rounded-full hover:bg-foreground/5"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-full hover:bg-foreground/5 transition-all"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-foreground/5 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-all rounded-xl hover:bg-foreground/5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
