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
            className="space-y-5"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-wine to-wine-dark flex items-center justify-center shadow-lg"
            >
              <Heart className="w-12 h-12 text-primary-foreground" fill="currentColor" />
            </motion.div>
            
            <div>
              <h3 className="font-display text-2xl text-foreground mb-2">
                💓 Batimentos do Coração
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                Sincronize seu toque com as batidas de um coração apaixonado
              </p>
            </div>

            <div className="bg-gradient-to-br from-wine/5 to-gold/5 rounded-xl p-4 border border-wine/10">
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👀</span>
                  <p className="text-sm text-foreground/80 font-body">Observe o coração pulsando</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">👆</span>
                  <p className="text-sm text-foreground/80 font-body">Toque no momento exato da batida</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎯</span>
                  <p className="text-sm text-foreground/80 font-body">Acerte {requiredScore} batidas para desbloquear</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-wine to-wine-dark text-primary-foreground rounded-xl font-display text-lg shadow-lg"
            >
              Sentir o Ritmo 💕
            </motion.button>
          </motion.div>
        )}

        {phase === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-body">
                <span className="text-foreground font-medium">
                  💓 {score}/{requiredScore}
                </span>
                <AnimatePresence mode="wait">
                  {combo > 2 && (
                    <motion.span
                      key={combo}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className="text-gold font-bold flex items-center gap-1"
                    >
                      🔥 Combo x{combo}!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-wine to-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / requiredScore) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </div>
            </div>

            {/* Main heart area */}
            <div className="relative py-6">
              {/* Outer pulse ring */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border-2 border-wine/20"
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: beatInterval / 1000,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              
              {/* Inner pulse ring */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-gold/30"
                animate={{
                  scale: [1, 1.2],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: beatInterval / 1000,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.1,
                }}
              />

              {/* Heart button */}
              <motion.button
                onClick={handleTap}
                style={{ scale: heartScale }}
                className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-wine via-wine to-wine-dark flex items-center justify-center shadow-xl cursor-pointer border-4 border-wine/30"
                whileTap={{ scale: heartScale * 0.85 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-wine/20 blur-xl" />
                
                <Heart 
                  className="w-14 h-14 text-primary-foreground drop-shadow-lg relative z-10" 
                  fill="currentColor" 
                />
                
                {/* Feedback overlay */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-full flex items-center justify-center z-20"
                    >
                      <span className="text-4xl drop-shadow-lg">
                        {feedback === 'perfect' && '💖'}
                        {feedback === 'good' && '💕'}
                        {feedback === 'miss' && '💔'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Instruction */}
              <motion.p 
                className="mt-5 text-sm text-muted-foreground font-body"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Toque no ritmo do coração!
              </motion.p>
            </div>

            {/* Beat indicator dots */}
            <div className="flex justify-center items-center gap-3">
              <span className="text-xs text-muted-foreground font-body">Ritmo:</span>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  animate={{
                    backgroundColor: beatPhase < 0.15 
                      ? (i === 0 ? 'hsl(var(--wine))' : 'hsl(var(--muted))') 
                      : 'hsl(var(--muted))',
                    scale: beatPhase < 0.15 && i === 0 ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.05 }}
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
            className="space-y-5 py-6"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-wine to-gold flex items-center justify-center shadow-xl"
            >
              <Heart className="w-14 h-14 text-primary-foreground" fill="currentColor" />
            </motion.div>

            <div>
              <h3 className="font-display text-2xl text-foreground mb-2">
                Corações Sincronizados! 💕
              </h3>
              <p className="text-muted-foreground font-body">
                Vocês batem no mesmo ritmo...
              </p>
            </div>

            <div className="flex justify-center gap-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
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
