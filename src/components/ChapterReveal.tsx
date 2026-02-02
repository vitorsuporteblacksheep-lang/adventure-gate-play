import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, Star } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';
import confetti from 'canvas-confetti';

interface ChapterRevealProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const ChapterReveal = ({ chapter, onComplete }: ChapterRevealProps) => {
  const [stage, setStage] = useState<'gift' | 'unwrap' | 'reveal' | 'complete'>('gift');

  useEffect(() => {
    if (stage === 'reveal') {
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#722F37', '#D4AF37', '#FFD700', '#FFF8E7'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#722F37', '#D4AF37', '#FFD700', '#FFF8E7'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Auto advance after reveal
      const timer = setTimeout(() => setStage('complete'), 3500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'complete') {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const handleUnwrap = () => {
    setStage('unwrap');
    setTimeout(() => setStage('reveal'), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-dark/80 backdrop-blur-lg"
    >
      <AnimatePresence mode="wait">
        {/* Gift Stage */}
        {stage === 'gift' && (
          <motion.div
            key="gift"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 12 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative mb-8"
            >
              {/* Floating sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 80}%`,
                    top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 80}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                >
                  <Star className="w-4 h-4 text-gold" fill="currentColor" />
                </motion.div>
              ))}

              {/* Gift box */}
              <div className="w-40 h-40 mx-auto relative">
                {/* Box body */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-28 bg-gradient-wine rounded-lg shadow-wine border-2 border-gold/30">
                  {/* Ribbon vertical */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-gold" />
                  {/* Ribbon horizontal */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 bg-gradient-gold" />
                </div>
                
                {/* Box lid */}
                <motion.div 
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-gradient-wine rounded-lg shadow-elegant border-2 border-gold/30"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {/* Ribbon on lid */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-gold" />
                </motion.div>

                {/* Bow */}
                <motion.div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-5xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🎀
                </motion.div>
              </div>
            </motion.div>

            <h2 className="font-display text-3xl text-primary-foreground mb-3">
              Nova Memória Desbloqueada!
            </h2>
            <p className="text-gold-light font-body mb-8">
              Você completou o desafio com sucesso
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnwrap}
              className="px-8 py-4 bg-gradient-gold text-wine-dark font-display text-xl rounded-full shadow-gold flex items-center gap-3 mx-auto"
            >
              <Gift className="w-6 h-6" />
              Abrir Presente
            </motion.button>
          </motion.div>
        )}

        {/* Unwrap Stage */}
        {stage === 'unwrap' && (
          <motion.div
            key="unwrap"
            className="relative"
          >
            {/* Exploding pieces */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-gradient-wine rounded-sm"
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(i * 30 * Math.PI / 180) * 200,
                  y: Math.sin(i * 30 * Math.PI / 180) * 200 - 100,
                  rotate: Math.random() * 360,
                  opacity: 0,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            ))}

            {/* Ribbon pieces */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`ribbon-${i}`}
                className="absolute w-4 h-12 bg-gradient-gold rounded-sm"
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: -150 + Math.random() * 100,
                  rotate: Math.random() * 720,
                  opacity: 0,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            ))}

            {/* Glowing center */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, times: [0, 0.3, 1] }}
              className="w-20 h-20 rounded-full bg-gold/50 blur-xl"
            />
          </motion.div>
        )}

        {/* Reveal Stage */}
        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="text-center max-w-sm"
          >
            {/* Photo frame */}
            {chapter.image && (
              <motion.div
                initial={{ y: 50, rotateX: 45 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 bg-gradient-gold rounded-2xl blur-xl opacity-50 scale-105" />
                <div className="relative p-2 bg-gradient-gold rounded-2xl shadow-gold">
                  <img 
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-64 h-64 object-cover rounded-xl mx-auto"
                  />
                </div>
                
                {/* Decorative hearts */}
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4"
                >
                  <Heart className="w-8 h-8 text-wine" fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5], rotate: [10, -10, 10] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4"
                >
                  <Heart className="w-6 h-6 text-gold" fill="currentColor" />
                </motion.div>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-gold font-body text-sm">{chapter.date}</span>
                <Sparkles className="w-5 h-5 text-gold" />
              </div>

              <h2 className="font-display text-4xl text-primary-foreground mb-4">
                {chapter.title}
              </h2>

              <p className="text-gold-light/80 font-body italic text-lg">
                {chapter.quote}
              </p>
            </motion.div>

            {/* Auto-continue indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8 flex items-center justify-center gap-2 text-muted-foreground"
            >
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-body">Carregando memória...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChapterReveal;
