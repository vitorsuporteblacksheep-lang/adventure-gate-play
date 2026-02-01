import { motion } from 'framer-motion';
import { BookHeart, Images, MessageCircleHeart, Sparkles } from 'lucide-react';

type Section = 'timeline' | 'gallery' | 'feelings' | 'future';

interface NavigationProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
  sectionUnlocks: {
    timeline: boolean;
    gallery: boolean;
    feelings: boolean;
    future: boolean;
  };
}

const Navigation = ({ currentSection, onNavigate, sectionUnlocks }: NavigationProps) => {
  const navItems: { id: Section; label: string; icon: React.ReactNode; unlockMessage: string }[] = [
    { 
      id: 'timeline', 
      label: 'Nossa História', 
      icon: <BookHeart className="w-5 h-5" />,
      unlockMessage: ''
    },
    { 
      id: 'gallery', 
      label: 'Galeria', 
      icon: <Images className="w-5 h-5" />,
      unlockMessage: 'Complete 2 capítulos'
    },
    { 
      id: 'feelings', 
      label: 'Sentimentos', 
      icon: <MessageCircleHeart className="w-5 h-5" />,
      unlockMessage: 'Complete 4 capítulos'
    },
    { 
      id: 'future', 
      label: 'Nosso Futuro', 
      icon: <Sparkles className="w-5 h-5" />,
      unlockMessage: 'Complete todos os capítulos'
    },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50"
    >
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isUnlocked = sectionUnlocks[item.id];
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => isUnlocked && onNavigate(item.id)}
                disabled={!isUnlocked}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : isUnlocked
                    ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
                <span className="text-xs font-medium">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
                
                {!isUnlocked && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-[8px]">🔒</span>
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
