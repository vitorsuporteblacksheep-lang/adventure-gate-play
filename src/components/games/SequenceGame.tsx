import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface SequenceGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const sequence = ['💋', '🌹', '💍', '💑'];

const SequenceGame = ({ chapter, onComplete }: SequenceGameProps) => {
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [shuffledItems] = useState(() => 
    sequence.map((item, i) => ({ item, correctIndex: i })).sort(() => Math.random() - 0.5)
  );
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);

  const handleItemClick = (index: number) => {
    if (completed) return;
    
    const correctNextIndex = userSequence.length;
    const clickedItem = shuffledItems[index];
    
    if (clickedItem.correctIndex === correctNextIndex) {
      const newSequence = [...userSequence, index];
      setUserSequence(newSequence);
      setError(false);
      
      if (newSequence.length === sequence.length) {
        setCompleted(true);
        setTimeout(onComplete, 1500);
      }
    } else {
      setError(true);
      setTimeout(() => {
        setUserSequence([]);
        setError(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    setUserSequence([]);
    setError(false);
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
          Sequência Perfeita!
        </h3>
        <p className="text-muted-foreground">
          A ordem do nosso amor ❤️
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {sequence.map((item, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-3xl"
            >
              {item}
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
          Ordem do Amor
        </h3>
        <p className="text-sm text-muted-foreground">
          Toque nos símbolos na ordem correta do romance
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-3">
        {sequence.map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all ${
              i < userSequence.length
                ? 'border-rose bg-rose/20'
                : 'border-muted bg-muted/50'
            }`}
          >
            {i < userSequence.length && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xl"
              >
                {sequence[i]}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Items to click */}
      <div className="flex justify-center gap-4 flex-wrap">
        {shuffledItems.map((item, index) => {
          const isSelected = userSequence.includes(index);
          
          return (
            <motion.button
              key={index}
              onClick={() => handleItemClick(index)}
              disabled={isSelected}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              className={`w-16 h-16 rounded-xl text-3xl flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-rose/30 opacity-50'
                  : error
                  ? 'bg-destructive/20 border-2 border-destructive'
                  : 'bg-muted hover:bg-gradient-soft shadow-soft'
              }`}
            >
              {item.item}
            </motion.button>
          );
        })}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-destructive text-sm"
        >
          Ops! Tente novamente...
        </motion.p>
      )}

      <div className="text-center">
        <button
          onClick={resetGame}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Recomeçar
        </button>
      </div>
    </div>
  );
};

export default SequenceGame;
