import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface MatchingGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const pairs = [
  { left: 'Eu', right: 'Você', emoji: '💑' },
  { left: 'Sol', right: 'Lua', emoji: '🌙' },
  { left: 'Pão', right: 'Queijo', emoji: '🧀' },
  { left: 'Amor', right: 'Eterno', emoji: '💝' },
];

const MatchingGame = ({ chapter, onComplete }: MatchingGameProps) => {
  const [leftSelected, setLeftSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrongMatch, setWrongMatch] = useState(false);
  const [completed, setCompleted] = useState(false);

  const shuffledRight = useState(() => 
    pairs.map((_, i) => i).sort(() => Math.random() - 0.5)
  )[0];

  const handleLeftClick = (index: number) => {
    if (matched.includes(index)) return;
    setLeftSelected(index);
    setWrongMatch(false);
  };

  const handleRightClick = (shuffledIndex: number) => {
    if (leftSelected === null) return;
    
    const rightOriginalIndex = shuffledRight[shuffledIndex];
    
    if (leftSelected === rightOriginalIndex) {
      const newMatched = [...matched, leftSelected];
      setMatched(newMatched);
      setLeftSelected(null);
      
      if (newMatched.length === pairs.length) {
        setCompleted(true);
        setTimeout(onComplete, 1500);
      }
    } else {
      setWrongMatch(true);
      setTimeout(() => {
        setLeftSelected(null);
        setWrongMatch(false);
      }, 800);
    }
  };

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
          Combinação Perfeita!
        </h3>
        <p className="text-muted-foreground font-body">
          Assim como nós dois 💕
        </p>
        <div className="flex justify-center gap-4 mt-4">
          {pairs.map((pair, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-3xl"
            >
              {pair.emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-xl text-foreground mb-1">
          Combinações do Amor
        </h3>
        <p className="text-sm text-muted-foreground font-body">
          Conecte as palavras que combinam
        </p>
      </div>

      <div className="flex justify-center items-center gap-6">
        {/* Left column */}
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <motion.button
              key={`left-${index}`}
              onClick={() => handleLeftClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={wrongMatch && leftSelected === index ? { x: [-3, 3, -3, 3, 0] } : {}}
              className={`w-24 py-3 rounded-xl font-body font-semibold transition-all shadow-soft ${
                matched.includes(index)
                  ? 'bg-wine text-primary-foreground'
                  : leftSelected === index
                  ? wrongMatch
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-gold text-wine-dark'
                  : 'bg-card border border-wine/20 hover:border-wine/50'
              }`}
            >
              {pair.left}
            </motion.button>
          ))}
        </div>

        {/* Connection indicator */}
        <div className="flex items-center">
          <ArrowRight className="w-6 h-6 text-wine/30" />
        </div>

        {/* Right column (shuffled) */}
        <div className="space-y-3">
          {shuffledRight.map((originalIndex, shuffledIndex) => (
            <motion.button
              key={`right-${shuffledIndex}`}
              onClick={() => handleRightClick(shuffledIndex)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={matched.includes(originalIndex)}
              className={`w-24 py-3 rounded-xl font-body font-semibold transition-all shadow-soft ${
                matched.includes(originalIndex)
                  ? 'bg-wine text-primary-foreground'
                  : 'bg-card border border-wine/20 hover:border-wine/50'
              }`}
            >
              {pairs[originalIndex].right}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {pairs.map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: matched.includes(i) ? 1 : 0.8 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-soft ${
              matched.includes(i) ? 'bg-wine' : 'bg-card border border-wine/20'
            }`}
          >
            {matched.includes(i) && (
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchingGame;
