import { motion } from 'framer-motion';
import { BookHeart, Images, Feather, Sparkles } from 'lucide-react';

type Section = 'timeline' | 'gallery' | 'letter' | 'future';

interface NavigationProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
  sectionUnlocks: {
    timeline: boolean;
    gallery: boolean;
    letter: boolean;
    future: boolean;
  };
}

const Navigation = ({ currentSection, onNavigate, sectionUnlocks }: NavigationProps) => {
  const navItems: { id: Section; label: string; icon: React.ReactNode; unlockMessage: string }[] = [
    { 
      id: 'timeline', 
      label: 'História', 
      icon: <BookHeart className="w-5 h-5" />,
      unlockMessage: ''
    },
    { 
      id: 'gallery', 
      label: 'Galeria', 
      icon: <Images className="w-5 h-5" />,
      unlockMessage: 'Complete toda a história'
    },
    { 
      id: 'letter', 
      label: 'Carta', 
      icon: <Feather className="w-5 h-5" />,
      unlockMessage: 'Complete toda a história'
    },
    { 
      id: 'future', 
      label: 'Futuro', 
      icon: <Sparkles className="w-5 h-5" />,
      unlockMessage: 'Complete toda a história'
    },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 glass-effect border-t border-wine/10 z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-lg mx-auto px-2 py-2">
        <div className="flex justify-around items-center bg-gradient-card rounded-2xl p-1.5 shadow-elegant">
          {navItems.map((item) => {
            const isUnlocked = sectionUnlocks[item.id];
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => isUnlocked && onNavigate(item.id)}
                disabled={!isUnlocked}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 font-body ${
                  isActive
                    ? 'text-primary-foreground bg-gradient-wine shadow-wine'
                    : isUnlocked
                    ? 'text-foreground hover:text-wine hover:bg-wine/5'
                    : 'text-muted-foreground/40 cursor-not-allowed'
                }`}
                title={!isUnlocked ? item.unlockMessage : item.label}
              >
                <motion.div
                  whileHover={isUnlocked ? { scale: 1.1 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                >
                  {item.icon}
                </motion.div>
                <span className="text-[10px] font-semibold">{item.label}</span>
                
                {!isUnlocked && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-muted rounded-full flex items-center justify-center border border-wine/20">
                    <span className="text-[10px]">🔒</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
