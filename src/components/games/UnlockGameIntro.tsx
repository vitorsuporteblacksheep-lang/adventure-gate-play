import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, Sparkles } from 'lucide-react';

interface UnlockGameIntroProps {
  onComplete: () => void;
}

const UnlockGameIntro = ({ onComplete }: UnlockGameIntroProps) => {
  const [hearts, setHearts] = useState<{ id: number; caught: boolean; x: number; delay: number }[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const targetCount = 5;

  useEffect(() => {
    const initialHearts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      caught: false,
      x: 5 + Math.random() * 90,
      delay: i * 0.4,
    }));
    setHearts(initialHearts);
  }, []);

  const handleCatchHeart = (id: number) => {
    if (hearts.find(h => h.id === id)?.caught) return;
    
    setHearts(prev => prev.map(h => 
      h.id === id ? { ...h, caught: true } : h
    ));
    
    const newCount = caughtCount + 1;
    setCaughtCount(newCount);
    
    if (newCount >= targetCount) {
      setTimeout(onComplete, 500);
    }
  };

  return (
    <div className="bg-gradient-card rounded-2xl p-6 shadow-card border border-wine/20 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-gold" />
          <h2 className="font-display text-2xl text-foreground">
            Capture os Corações!
          </h2>
          <Sparkles className="w-5 h-5 text-gold" />
        </div>
        <p className="text-muted-foreground text-sm font-body">
          Toque em {targetCount} corações para desbloquear nossa história
        </p>
        
        <div className="flex items-center justify-center gap-3 mt-5">
          {Array.from({ length: targetCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: i < caughtCount ? 1 : 0.7 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                i < caughtCount 
                  ? 'bg-gradient-wine text-primary-foreground shadow-wine' 
                  : 'bg-muted border-2 border-wine/20'
              }`}
            >
              {i < caughtCount ? (
                <Check className="w-5 h-5" />
              ) : (
                <Heart className="w-4 h-4 text-wine/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative h-72 bg-gradient-elegant rounded-xl overflow-hidden border border-wine/10">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(345 45% 25% / 0.2) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              initial={{ y: -60, opacity: 0 }}
              animate={
                heart.caught
                  ? { scale: 0, opacity: 0 }
                  : {
                      y: [0, 260, 0],
                      opacity: 1,
                      rotate: [0, 15, -15, 0],
                    }
              }
              transition={
                heart.caught
                  ? { duration: 0.3 }
                  : {
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'easeInOut',
                      },
                      rotate: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
              }
              onClick={() => handleCatchHeart(heart.id)}
              disabled={heart.caught}
              className="absolute cursor-pointer disabled:cursor-default group"
              style={{ left: `${heart.x}%` }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.7 }}
            >
              <Heart
                className={`w-12 h-12 transition-all duration-200 ${
                  heart.caught 
                    ? 'text-gold' 
                    : 'text-wine group-hover:text-gold drop-shadow-lg'
                }`}
                fill="currentColor"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UnlockGameIntro;
