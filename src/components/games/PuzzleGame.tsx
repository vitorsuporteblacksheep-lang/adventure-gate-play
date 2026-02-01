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

  const pieceLabels = ['💖', '💕', '💗', '💘', '💝', '💞', '💓', '💛'];

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
          Puzzle Completo!
        </h3>
        <p className="text-muted-foreground font-body">
          Você juntou as peças do nosso amor 💕
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-xl text-foreground mb-1">
          Puzzle do Amor
        </h3>
        <p className="text-sm text-muted-foreground font-body">
          Organize as peças clicando nas adjacentes ao espaço vazio
        </p>
      </div>

      <div className="flex justify-center">
        <div 
          className="grid gap-2 p-3 bg-gradient-wine rounded-xl shadow-wine"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {pieces.map((piece, index) => (
            <motion.button
              key={index}
              onClick={() => handlePieceClick(index)}
              whileHover={{ scale: piece !== totalPieces - 1 ? 1.05 : 1 }}
              whileTap={{ scale: piece !== totalPieces - 1 ? 0.95 : 1 }}
              layout
              className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-display text-xl transition-all ${
                piece === totalPieces - 1
                  ? 'bg-wine-dark/50'
                  : 'bg-gradient-card text-foreground shadow-soft border border-wine/20'
              }`}
            >
              {piece !== totalPieces - 1 && (
                <>
                  <span className="text-2xl">{pieceLabels[piece]}</span>
                  <span className="text-xs text-muted-foreground">{piece + 1}</span>
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={initializePuzzle}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mx-auto font-body"
        >
          <RotateCcw className="w-4 h-4" />
          Embaralhar
        </button>
      </div>
    </div>
  );
};

export default PuzzleGame;
