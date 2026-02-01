import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
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
        >
          <Heart className="w-16 h-16 text-rose mx-auto mb-4" fill="currentColor" />
        </motion.div>
        <h3 className="font-display text-2xl text-foreground mb-2">
          Combinação Perfeita!
        </h3>
        <p className="text-muted-foreground">
          Assim como nós dois 💕
        </p>
        <div className="flex justify-center gap-3 mt-4">
          {pairs.map((pair, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-2xl"
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
        <h3 className="font-display text-lg text-foreground mb-1">
          Combinações do Amor
        </h3>
        <p className="text-sm text-muted-foreground">
          Conecte as palavras que combinam
        </p>
      </div>

      <div className="flex justify-center gap-8">
        {/* Left column */}
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <motion.button
              key={`left-${index}`}
              onClick={() => handleLeftClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={wrongMatch && leftSelected === index ? { x: [-3, 3, -3, 3, 0] } : {}}
              className={`w-24 py-3 rounded-xl font-medium transition-all ${
                matched.includes(index)
                  ? 'bg-rose text-primary-foreground'
                  : leftSelected === index
                  ? wrongMatch
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-gold text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {pair.left}
            </motion.button>
          ))}
        </div>

        {/* Connection indicator */}
        <div className="flex items-center">
          <Heart className="w-6 h-6 text-rose-light animate-pulse-soft" />
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
              className={`w-24 py-3 rounded-xl font-medium transition-all ${
                matched.includes(originalIndex)
                  ? 'bg-rose text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {pairs[originalIndex].right}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {pairs.map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: matched.includes(i) ? 1 : 0.8 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              matched.includes(i) ? 'bg-rose' : 'bg-muted'
            }`}
          >
            {matched.includes(i) && (
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchingGame;
