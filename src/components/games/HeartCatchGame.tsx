import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Timer } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface HeartCatchGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

interface FallingHeart {
  id: number;
  x: number;
  caught: boolean;
}

const HeartCatchGame = ({ chapter, onComplete }: HeartCatchGameProps) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const targetScore = 10;

  const spawnHeart = useCallback(() => {
    const newHeart: FallingHeart = {
      id: Date.now() + Math.random(),
      x: 5 + Math.random() * 90,
      caught: false,
    };
    setHearts(prev => [...prev, newHeart]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 3000);
  }, []);

  useEffect(() => {
    if (!gameStarted || completed) return;

    const spawnInterval = setInterval(spawnHeart, 600);
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(spawnInterval);
          clearInterval(timerInterval);
          if (score < targetScore) {
            setTimeout(() => {
              setTimeLeft(15);
              setScore(0);
              setHearts([]);
            }, 1500);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
    };
  }, [gameStarted, completed, spawnHeart, score]);

  useEffect(() => {
    if (score >= targetScore && !completed) {
      setCompleted(true);
      setTimeout(onComplete, 1500);
    }
  }, [score, completed, onComplete]);

  const handleCatchHeart = (id: number) => {
    setHearts(prev =>
      prev.map(h => (h.id === id ? { ...h, caught: true } : h))
    );
    setScore(prev => prev + 1);
  };

  if (!gameStarted) {
    return (
      <div className="text-center py-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 blur-2xl bg-wine/20 rounded-full" />
          <Heart className="w-20 h-20 text-wine mx-auto mb-4 relative" fill="currentColor" />
        </motion.div>
        <h3 className="font-display text-2xl text-foreground mb-2">
          Capture os Corações
        </h3>
        <p className="text-muted-foreground mb-6 font-body">
          Capture {targetScore} corações em 15 segundos!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameStarted(true)}
          className="px-8 py-3 bg-gradient-wine text-primary-foreground rounded-xl font-body font-semibold shadow-wine"
        >
          Começar
        </motion.button>
      </div>
    );
  }

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 blur-2xl bg-wine/30 rounded-full" />
          <Heart className="w-20 h-20 text-wine mx-auto mb-4 relative" fill="currentColor" />
        </motion.div>
        <h3 className="font-display text-3xl text-foreground mb-2">
          Amor Capturado!
        </h3>
        <p className="text-muted-foreground font-body">
          Você capturou {score} corações! ❤️
        </p>
        <div className="flex justify-center mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Sparkles className="w-6 h-6 text-gold" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-card rounded-xl p-3 border border-wine/10">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-wine" fill="currentColor" />
          <span className="font-body font-semibold text-foreground">
            {score} / {targetScore}
          </span>
        </div>
        <div className={`flex items-center gap-2 font-body font-semibold ${
          timeLeft <= 5 ? 'text-destructive' : 'text-foreground'
        }`}>
          <Timer className="w-4 h-4" />
          {timeLeft}s
        </div>
      </div>

      <div className="relative h-64 bg-gradient-elegant rounded-xl overflow-hidden border border-wine/10">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(345 45% 25% / 0.2) 1px, transparent 0)`,
            backgroundSize: '25px 25px'
          }} />
        </div>

        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              initial={{ y: -50, opacity: 0 }}
              animate={
                heart.caught
                  ? { scale: 0, opacity: 0 }
                  : { y: 250, opacity: 1 }
              }
              exit={{ opacity: 0 }}
              transition={
                heart.caught
                  ? { duration: 0.2 }
                  : { duration: 3, ease: 'linear' }
              }
              onClick={() => handleCatchHeart(heart.id)}
              disabled={heart.caught}
              className="absolute cursor-pointer group"
              style={{ left: `${heart.x}%` }}
              whileHover={{ scale: 1.2 }}
            >
              <Heart
                className={`w-10 h-10 drop-shadow-lg transition-colors ${
                  heart.caught ? 'text-gold' : 'text-wine group-hover:text-gold'
                }`}
                fill="currentColor"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {timeLeft === 0 && score < targetScore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-2 font-body">
            Você capturou {score} corações. Tente novamente!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HeartCatchGame;
