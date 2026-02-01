import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Play } from 'lucide-react';
import UnlockGameIntro from './games/UnlockGameIntro';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const [showGame, setShowGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handlePlayClick = () => {
    setShowGame(true);
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
    setTimeout(() => {
      onStart();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-soft"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart 
              className="text-rose-light" 
              size={10 + Math.random() * 20}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showGame ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center z-10 px-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <Heart className="w-20 h-20 text-rose mx-auto" fill="currentColor" />
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              Nossa História
            </h1>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              Uma jornada interativa pelos momentos mais especiais do nosso amor
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handlePlayClick}
                className="group relative px-8 py-4 bg-gradient-romantic text-primary-foreground rounded-full font-body font-semibold text-lg shadow-romantic hover:shadow-glow transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Play className="w-5 h-5" />
                <span>Começar Jornada</span>
                <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>

            <p className="text-sm text-muted-foreground mt-6">
              Complete um pequeno desafio para desbloquear a história
            </p>
          </motion.div>
        ) : !gameCompleted ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 w-full max-w-lg px-6"
          >
            <UnlockGameIntro onComplete={handleGameComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-24 h-24 text-rose mx-auto mb-4" fill="currentColor" />
            </motion.div>
            <h2 className="font-display text-3xl text-foreground">
              ❤️ História Desbloqueada!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LandingPage;
