import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Star, Sparkles, Heart } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';
import confetti from 'canvas-confetti';

interface SecretChapterRevealProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const SecretChapterReveal = ({ chapter, onComplete }: SecretChapterRevealProps) => {
  const [stage, setStage] = useState<'message' | 'reveal' | 'complete'>('message');

  useEffect(() => {
    if (stage === 'reveal') {
      // Twilight themed confetti
      const duration = 4000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#D4AF37', '#9370DB', '#4B0082', '#191970', '#FFD700'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#D4AF37', '#9370DB', '#4B0082', '#191970', '#FFD700'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      const timer = setTimeout(() => setStage('complete'), 4500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'complete') {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const handleContinue = () => {
    setStage('reveal');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background: `rgba(${212 + Math.random() * 43}, ${175 + Math.random() * 80}, ${55 + Math.random() * 100}, ${0.3 + Math.random() * 0.4})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 40}%`,
              color: `rgba(255, 248, 220, ${0.4 + Math.random() * 0.4})`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-3 h-3" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Message Stage - "Você achou que tinha acabado?" */}
        {stage === 'message' && (
          <motion.div
            key="message"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="text-center max-w-md px-4"
          >
            {/* Moon icon */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-8"
            >
              <div 
                className="inline-flex items-center justify-center w-24 h-24 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(147,112,219,0.3) 100%)',
                  boxShadow: '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(147,112,219,0.2)',
                }}
              >
                <Moon className="w-12 h-12" style={{ color: '#fef3c7' }} />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl md:text-4xl mb-4"
              style={{ color: '#fef3c7' }}
            >
              Você achou que tinha acabado?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-lg mb-8"
              style={{ color: 'rgba(254, 243, 199, 0.7)' }}
            >
              Nossa história ainda tem mais um capítulo secreto...
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="px-8 py-4 rounded-full font-display text-lg flex items-center gap-3 mx-auto transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.4) 0%, rgba(147,112,219,0.4) 100%)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  color: '#fef3c7',
                  boxShadow: '0 0 30px rgba(212,175,55,0.2)',
                }}
              >
                <Sparkles className="w-5 h-5" />
                Descobrir Segredo
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Reveal Stage */}
        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="text-center max-w-lg px-4"
          >
            {/* Glowing orb animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1, times: [0, 0.6, 1] }}
              className="relative mb-8"
            >
              {/* Outer glow */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(147,112,219,0.2) 50%, transparent 70%)',
                  transform: 'scale(2)',
                }}
              />
              
              {/* Inner icon */}
              <div 
                className="relative inline-flex items-center justify-center w-32 h-32 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.5) 0%, rgba(147,112,219,0.5) 100%)',
                  border: '2px solid rgba(254,243,199,0.4)',
                  boxShadow: '0 0 60px rgba(212,175,55,0.5)',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Moon className="w-16 h-16" style={{ color: '#fef3c7' }} />
                </motion.div>
              </div>

              {/* Orbiting hearts */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: 'linear',
                    delay: i * 0.5,
                  }}
                  style={{ 
                    transformOrigin: '0 0',
                  }}
                >
                  <div style={{ transform: `rotate(${deg}deg) translateX(80px)` }}>
                    <Heart className="w-6 h-6" fill="#D4AF37" style={{ color: '#D4AF37' }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" style={{ color: '#D4AF37' }} />
                <span className="font-body text-sm tracking-wider uppercase" style={{ color: 'rgba(212,175,55,0.8)' }}>
                  Capítulo Secreto Desbloqueado
                </span>
                <Sparkles className="w-5 h-5" style={{ color: '#D4AF37' }} />
              </div>

              <h2 
                className="font-display text-4xl md:text-5xl mb-4"
                style={{ 
                  background: 'linear-gradient(135deg, #fef3c7 0%, #D4AF37 50%, #9370DB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(212,175,55,0.3)',
                }}
              >
                {chapter.title}
              </h2>

              <p className="font-body text-lg italic" style={{ color: 'rgba(254,243,199,0.7)' }}>
                {chapter.date}
              </p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-8 flex items-center justify-center gap-2"
              style={{ color: 'rgba(254,243,199,0.5)' }}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#D4AF37' }}
              />
              <span className="text-sm font-body">Abrindo memória secreta...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SecretChapterReveal;
