import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface HeartbeatGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const HeartbeatGame = ({ chapter, onComplete }: HeartbeatGameProps) => {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'success'>('intro');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [heartScale, setHeartScale] = useState(1);
  const [feedback, setFeedback] = useState<'perfect' | 'good' | 'miss' | null>(null);
  const [beatPhase, setBeatPhase] = useState(0); // 0-1 representing beat cycle
  
  const requiredScore = 10;
  const beatInterval = 600; // 100 BPM - passionate heartbeat
  const perfectWindow = 100; // ms
  const goodWindow = 200; // ms
  
  const lastBeatTime = useRef(0);
  const animationRef = useRef<number>();
  const gameStartTime = useRef(0);

  // Heart animation loop
  useEffect(() => {
    if (phase !== 'playing') return;

    gameStartTime.current = Date.now();
    lastBeatTime.current = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastBeatTime.current;
      
      // Calculate beat phase (0-1)
      const phase = (elapsed % beatInterval) / beatInterval;
      setBeatPhase(phase);
      
      // Heart pulse animation - quick expand, slow contract
      if (phase < 0.15) {
        // Systole - quick expansion
        setHeartScale(1 + (phase / 0.15) * 0.3);
      } else if (phase < 0.3) {
        // Quick contraction
        setHeartScale(1.3 - ((phase - 0.15) / 0.15) * 0.2);
      } else {
        // Diastole - slow relaxation
        setHeartScale(1.1 - ((phase - 0.3) / 0.7) * 0.1);
      }

      // Update last beat time when cycle completes
      if (elapsed >= beatInterval) {
        lastBeatTime.current = now - (elapsed % beatInterval);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase]);

  const handleTap = useCallback(() => {
    if (phase !== 'playing') return;

    const now = Date.now();
    const elapsed = (now - lastBeatTime.current) % beatInterval;
    
    // Check timing - perfect is near the start of the beat (the "lub")
    const distanceFromBeat = Math.min(elapsed, beatInterval - elapsed);
    
    if (distanceFromBeat <= perfectWindow) {
      // Perfect!
      setFeedback('perfect');
      setScore(s => s + 1);
      setCombo(c => c + 1);
    } else if (distanceFromBeat <= goodWindow) {
      // Good
      setFeedback('good');
      setScore(s => s + 1);
      setCombo(c => c + 1);
    } else {
      // Miss
      setFeedback('miss');
      setCombo(0);
    }

    setTimeout(() => setFeedback(null), 300);
  }, [phase]);

  // Check for win
  useEffect(() => {
    if (score >= requiredScore && phase === 'playing') {
      setPhase('success');
      setTimeout(onComplete, 2000);
    }
  }, [score, phase, onComplete]);

  const startGame = () => {
    setPhase('playing');
    setScore(0);
    setCombo(0);
  };

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-wine flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
            </div>
            
            <div>
              <h3 className="font-display text-2xl text-foreground mb-2">
                Batimentos do Coração
              </h3>
              <p className="text-muted-foreground font-body">
                Sinta o ritmo de um coração apaixonado e toque no momento certo!
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2">
              <p className="text-sm text-muted-foreground font-body">
                💓 Observe o coração pulsando
              </p>
              <p className="text-sm text-muted-foreground font-body">
                👆 Toque no ritmo das batidas
              </p>
              <p className="text-sm text-muted-foreground font-body">
                ✨ Acerte {requiredScore} batidas para desbloquear
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="w-full py-4 bg-gradient-wine text-primary-foreground rounded-xl font-display text-lg shadow-wine"
            >
              Começar 💕
            </motion.button>
          </motion.div>
        )}

        {phase === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">Batidas: {score}/{requiredScore}</span>
                {combo > 2 && (
                  <span className="text-gold font-semibold">Combo x{combo}! 🔥</span>
                )}
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-wine rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / requiredScore) * 100}%` }}
                />
              </div>
            </div>

            {/* Heart button */}
            <div className="relative py-8">
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: beatInterval / 1000,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <div className="w-40 h-40 rounded-full border-2 border-wine/30" />
              </motion.div>

              <motion.button
                onClick={handleTap}
                style={{ scale: heartScale }}
                className="relative w-32 h-32 mx-auto rounded-full bg-gradient-wine flex items-center justify-center shadow-wine cursor-pointer active:brightness-110 transition-all"
                whileTap={{ scale: heartScale * 0.9 }}
              >
                <Heart 
                  className="w-16 h-16 text-primary-foreground drop-shadow-lg" 
                  fill="currentColor" 
                />
                
                {/* Feedback overlay */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className={`absolute inset-0 rounded-full flex items-center justify-center ${
                        feedback === 'perfect' 
                          ? 'bg-gold/30' 
                          : feedback === 'good' 
                          ? 'bg-wine/30' 
                          : 'bg-muted/50'
                      }`}
                    >
                      <span className="text-2xl font-display text-primary-foreground">
                        {feedback === 'perfect' && '💖'}
                        {feedback === 'good' && '💕'}
                        {feedback === 'miss' && '💔'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Timing guide */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground font-body">
                  Toque quando o coração pulsar!
                </p>
              </div>
            </div>

            {/* Visual beat indicator */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-wine/30"
                  animate={{
                    backgroundColor: beatPhase < 0.15 && i === 0 
                      ? 'hsl(var(--wine))' 
                      : 'hsl(var(--wine) / 0.3)',
                    scale: beatPhase < 0.15 && i === 0 ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
              }}
              className="w-24 h-24 mx-auto rounded-full bg-gradient-wine flex items-center justify-center shadow-wine"
            >
              <Heart className="w-12 h-12 text-primary-foreground" fill="currentColor" />
            </motion.div>

            <div>
              <h3 className="font-display text-2xl text-foreground mb-2">
                Corações Sincronizados! 💕
              </h3>
              <p className="text-muted-foreground font-body">
                Vocês batem no mesmo ritmo...
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeartbeatGame;
