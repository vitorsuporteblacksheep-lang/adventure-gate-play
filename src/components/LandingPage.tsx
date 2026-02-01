import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Play, Wine } from 'lucide-react';
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
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-dark-wine"
    >
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(38 65% 55% / 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [0, -30, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart 
              className="text-gold-light" 
              size={8 + Math.random() * 16}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Decorative wine elements */}
      <motion.div 
        className="absolute top-10 left-10 opacity-20"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Wine className="w-20 h-20 text-gold" />
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-10 opacity-20"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      >
        <Wine className="w-16 h-16 text-gold-light" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!showGame ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-center z-10 px-6"
          >
            {/* Logo/Icon */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-10 relative"
            >
              <div className="absolute inset-0 blur-3xl bg-gold/20 rounded-full" />
              <Heart className="w-24 h-24 text-gold relative" fill="currentColor" />
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground mb-4 tracking-wide">
              Nossa História
            </h1>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <Sparkles className="w-5 h-5 text-gold" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
            
            <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-md mx-auto leading-relaxed">
              Uma jornada interativa pelos momentos mais especiais do nosso amor
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handlePlayClick}
                className="group relative px-10 py-4 bg-gradient-gold text-wine-dark rounded-full font-body font-bold text-lg shadow-wine hover:shadow-glow transition-all duration-500 flex items-center gap-4 mx-auto overflow-hidden"
              >
                <div className="absolute inset-0 shimmer" />
                <Play className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Começar Jornada</span>
                <Heart className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" fill="currentColor" />
              </button>
            </motion.div>

            <p className="text-sm text-primary-foreground/60 mt-8 font-body">
              ✨ Complete um pequeno desafio para desbloquear a história
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
              <Heart className="w-28 h-28 text-gold mx-auto mb-6" fill="currentColor" />
            </motion.div>
            <h2 className="font-display text-4xl text-primary-foreground">
              História Desbloqueada!
            </h2>
            <p className="text-primary-foreground/70 mt-2">✨ Prepare-se para reviver nossos momentos ✨</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LandingPage;
