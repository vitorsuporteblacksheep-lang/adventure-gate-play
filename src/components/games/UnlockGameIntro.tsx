import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check } from 'lucide-react';

interface UnlockGameIntroProps {
  onComplete: () => void;
}

const UnlockGameIntro = ({ onComplete }: UnlockGameIntroProps) => {
  const [hearts, setHearts] = useState<{ id: number; caught: boolean; x: number; delay: number }[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const targetCount = 5;

  useEffect(() => {
    const initialHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      caught: false,
      x: 10 + Math.random() * 80,
      delay: i * 0.5,
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
    <div className="bg-card rounded-2xl p-6 shadow-romantic">
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl text-foreground mb-2">
          Capture os Corações!
        </h2>
        <p className="text-muted-foreground text-sm">
          Toque em {targetCount} corações para desbloquear nossa história
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: targetCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: i < caughtCount ? 1 : 0.5 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i < caughtCount ? 'bg-rose text-primary-foreground' : 'bg-muted'
              }`}
            >
              {i < caughtCount ? (
                <Check className="w-4 h-4" />
              ) : (
                <Heart className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative h-64 bg-gradient-soft rounded-xl overflow-hidden">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              initial={{ y: -50, opacity: 0 }}
              animate={
                heart.caught
                  ? { scale: 0, opacity: 0 }
                  : {
                      y: [0, 220, 0],
                      opacity: 1,
                      rotate: [0, 10, -10, 0],
                    }
              }
              transition={
                heart.caught
                  ? { duration: 0.2 }
                  : {
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'easeInOut',
                      },
                      rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
              }
              onClick={() => handleCatchHeart(heart.id)}
              disabled={heart.caught}
              className="absolute cursor-pointer disabled:cursor-default"
              style={{ left: `${heart.x}%` }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Heart
                className={`w-10 h-10 transition-colors ${
                  heart.caught ? 'text-gold' : 'text-rose hover:text-rose-dark'
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
