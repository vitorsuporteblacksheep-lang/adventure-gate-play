import { motion } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';
import QuizGame from './QuizGame';
import MemoryGame from './MemoryGame';
import SequenceGame from './SequenceGame';
import MatchingGame from './MatchingGame';
import PuzzleGame from './PuzzleGame';
import HeartCatchGame from './HeartCatchGame';
import HeartbeatGame from './HeartbeatGame';

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
      case 'heartbeat':
        return <HeartbeatGame chapter={chapter} onComplete={onComplete} />;
      default:
        return <QuizGame chapter={chapter} onComplete={onComplete} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-dark/70 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-card rounded-2xl max-w-lg w-full shadow-card border border-wine/20 max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-wine/10 bg-gradient-wine flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-xl">
              {chapter.icon}
            </div>
            <div>
              <span className="font-display text-lg text-primary-foreground">
                {chapter.title}
              </span>
              <p className="text-xs text-primary-foreground/70 font-body">
                Complete o desafio para desbloquear
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Game Content */}
        <div className="p-5 overflow-y-auto flex-1 bg-gradient-soft">
          {renderGame()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChapterGame;
