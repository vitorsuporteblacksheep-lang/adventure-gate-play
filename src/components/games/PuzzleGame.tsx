import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface PuzzleGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const PuzzleGame = ({ chapter, onComplete }: PuzzleGameProps) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const gridSize = 3;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // Create a solvable puzzle
    let shuffled: number[];
    do {
      shuffled = Array.from({ length: totalPieces }, (_, i) => i);
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (isSolved(shuffled));
    
    setPieces(shuffled);
  };

  const isSolved = (arr: number[]) => {
    return arr.every((piece, index) => piece === index);
  };

  const handlePieceClick = (index: number) => {
    if (completed) return;
    
    const emptyIndex = pieces.indexOf(totalPieces - 1);
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);

      if (isSolved(newPieces)) {
        setCompleted(true);
        setTimeout(onComplete, 1500);
      }
    }
  };

  const colors = [
    'from-rose to-rose-light',
    'from-rose-light to-gold',
    'from-gold to-gold-light',
    'from-gold-light to-rose-light',
    'from-rose to-gold',
    'from-gold to-rose',
    'from-rose-light to-gold-light',
    'from-gold-light to-rose',
  ];

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
          Puzzle Completo!
        </h3>
        <p className="text-muted-foreground">
          Você juntou as peças do nosso amor 💕
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-lg text-foreground mb-1">
          Puzzle do Amor
        </h3>
        <p className="text-sm text-muted-foreground">
          Organize as peças clicando nas adjacentes ao espaço vazio
        </p>
      </div>

      <div className="flex justify-center">
        <div 
          className="grid gap-1 p-2 bg-muted rounded-xl"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {pieces.map((piece, index) => (
            <motion.button
              key={index}
              onClick={() => handlePieceClick(index)}
              whileHover={{ scale: piece !== totalPieces - 1 ? 1.05 : 1 }}
              whileTap={{ scale: piece !== totalPieces - 1 ? 0.95 : 1 }}
              layout
              className={`w-16 h-16 rounded-lg flex items-center justify-center font-display text-xl transition-all ${
                piece === totalPieces - 1
                  ? 'bg-transparent'
                  : `bg-gradient-to-br ${colors[piece % colors.length]} text-primary-foreground shadow-soft`
              }`}
            >
              {piece !== totalPieces - 1 && (
                <span>{piece + 1}</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={initializePuzzle}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Embaralhar
        </button>
      </div>
    </div>
  );
};

export default PuzzleGame;
