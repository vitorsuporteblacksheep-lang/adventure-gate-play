import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface SequenceGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const sequence = ['💋', '🌹', '💍', '💑'];
const sequenceLabels = ['Beijo', 'Romance', 'Compromisso', 'União'];

const SequenceGame = ({ chapter, onComplete }: SequenceGameProps) => {
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [shuffledItems] = useState(() => 
    sequence.map((item, i) => ({ item, correctIndex: i, label: sequenceLabels[i] })).sort(() => Math.random() - 0.5)
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
          className="relative inline-block"
        >
          <div className="absolute inset-0 blur-2xl bg-wine/30 rounded-full" />
          <Heart className="w-20 h-20 text-wine mx-auto mb-4 relative" fill="currentColor" />
        </motion.div>
        <h3 className="font-display text-3xl text-foreground mb-2">
          Sequência Perfeita!
        </h3>
        <p className="text-muted-foreground font-body">
          A ordem do nosso amor ❤️
        </p>
        <div className="flex justify-center gap-3 mt-4">
          {sequence.map((item, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-4xl"
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
        <h3 className="font-display text-xl text-foreground mb-1">
          Ordem do Amor
        </h3>
        <p className="text-sm text-muted-foreground font-body">
          Toque nos símbolos na ordem correta do romance
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-4">
        {sequence.map((_, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all shadow-soft ${
              i < userSequence.length
                ? 'border-wine bg-wine/10'
                : 'border-wine/20 bg-card'
            }`}
          >
            {i < userSequence.length && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl"
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
              className={`w-20 h-20 rounded-xl text-4xl flex flex-col items-center justify-center transition-all shadow-soft ${
                isSelected
                  ? 'bg-wine/20 opacity-50 border border-wine/30'
                  : error
                  ? 'bg-destructive/10 border-2 border-destructive'
                  : 'bg-card border border-wine/20 hover:border-wine/50 hover:bg-wine/5'
              }`}
            >
              <span>{item.item}</span>
              <span className="text-[10px] text-muted-foreground mt-1 font-body">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-destructive text-sm font-body"
        >
          Ops! Ordem incorreta, tente novamente...
        </motion.p>
      )}

      <div className="text-center">
        <button
          onClick={resetGame}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mx-auto font-body"
        >
          <RotateCcw className="w-4 h-4" />
          Recomeçar
        </button>
      </div>
    </div>
  );
};

export default SequenceGame;
