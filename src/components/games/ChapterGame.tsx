import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';
import QuizGame from './QuizGame';
import MemoryGame from './MemoryGame';
import SequenceGame from './SequenceGame';
import MatchingGame from './MatchingGame';
import PuzzleGame from './PuzzleGame';
import HeartCatchGame from './HeartCatchGame';

interface ChapterGameProps {
  chapter: ChapterData;
  onComplete: () => void;
  onClose: () => void;
}

const ChapterGame = ({ chapter, onComplete, onClose }: ChapterGameProps) => {
  const renderGame = () => {
    switch (chapter.gameType) {
      case 'quiz':
        return <QuizGame chapter={chapter} onComplete={onComplete} />;
      case 'memory':
        return <MemoryGame chapter={chapter} onComplete={onComplete} />;
      case 'sequence':
        return <SequenceGame chapter={chapter} onComplete={onComplete} />;
      case 'matching':
        return <MatchingGame chapter={chapter} onComplete={onComplete} />;
      case 'puzzle':
        return <PuzzleGame chapter={chapter} onComplete={onComplete} />;
      case 'heart-catch':
        return <HeartCatchGame chapter={chapter} onComplete={onComplete} />;
      default:
        return <QuizGame chapter={chapter} onComplete={onComplete} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-card rounded-2xl max-w-lg w-full shadow-romantic max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-soft">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose" fill="currentColor" />
            <span className="font-display text-lg text-foreground">
              {chapter.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Game Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {renderGame()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChapterGame;
