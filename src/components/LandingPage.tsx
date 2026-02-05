import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Play, Star, Cake } from 'lucide-react';
import UnlockGameIntro from './games/UnlockGameIntro';
import birthdayPhoto from '@/assets/birthday-photo.png';
import confetti from 'canvas-confetti';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const [showGame, setShowGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handlePlayClick = () => {
    // Trigger celebration confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#722F37', '#D4AF37', '#FFD700', '#FFF8E7', '#8B1538'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#722F37', '#D4AF37', '#FFD700', '#FFF8E7', '#8B1538'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

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

      {/* Floating stars and hearts decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              y: [0, -20, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 3 === 0 ? (
              <Star 
                className="text-gold-light" 
                size={6 + Math.random() * 12}
                fill="currentColor"
              />
            ) : (
              <Heart 
                className="text-gold-light" 
                size={6 + Math.random() * 12}
                fill="currentColor"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-8 left-8 opacity-30"
        animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Cake className="w-16 h-16 text-gold" />
      </motion.div>
      <motion.div 
        className="absolute bottom-16 right-8 opacity-30"
        animate={{ rotate: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <Star className="w-14 h-14 text-gold-light" fill="currentColor" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!showGame ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-center z-10 px-6 max-w-lg"
          >
            {/* Photo frame with glow effect */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8 relative mx-auto"
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 blur-2xl bg-gold/30 rounded-full" />
              
              {/* Photo container */}
              <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden border-4 border-gold/50 shadow-glow">
                <img 
                  src={birthdayPhoto} 
                  alt="Foto de aniversário"
                  className="w-full h-full object-cover"
                />
                
                {/* Shimmer overlay */}
                <div className="absolute inset-0 shimmer opacity-30" />
              </div>

              {/* Floating decorations around photo */}
              <motion.div 
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 text-gold" fill="currentColor" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-1 -left-1"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-gold-light" fill="currentColor" />
              </motion.div>
            </motion.div>

            {/* Age badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6"
            >
              <Cake className="w-4 h-4 text-gold" />
              <span className="font-display text-2xl md:text-3xl text-gold font-semibold">24 anos</span>
              <Sparkles className="w-4 h-4 text-gold" />
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground mb-3 tracking-wide">
              Feliz Aniversário
            </h1>
            
            <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
              Meu Amor ✨
            </h2>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <Heart className="w-4 h-4 text-gold" fill="currentColor" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            
            <p className="font-body text-base md:text-lg text-primary-foreground/80 mb-8 max-w-sm mx-auto leading-relaxed">
              Uma jornada especial celebrando você e cada momento lindo que vivemos juntos
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
                <span className="relative z-10">Abrir Presente</span>
                <Heart className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" fill="currentColor" />
              </button>
            </motion.div>

            <p className="text-sm text-primary-foreground/60 mt-6 font-body">
              🎁 Complete um pequeno desafio para desbloquear sua surpresa
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
              <Cake className="w-28 h-28 text-gold mx-auto mb-6" />
            </motion.div>
            <h2 className="font-display text-4xl text-primary-foreground">
              Presente Desbloqueado!
            </h2>
            <p className="text-primary-foreground/70 mt-2">🎉 Prepare-se para celebrar nossos momentos 🎉</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LandingPage;
