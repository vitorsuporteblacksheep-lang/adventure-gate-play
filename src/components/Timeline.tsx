import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, ChevronRight, Gamepad2 } from 'lucide-react';
import { ChapterData, GameState, completeChapterGame } from '@/lib/gameState';
import ChapterDetail from './ChapterDetail';
import ChapterGame from './games/ChapterGame';

interface TimelineProps {
  chapters: ChapterData[];
  onChapterClick: (chapter: ChapterData) => void;
  correctAnswers: number;
  gameState: GameState;
  onStateChange: (state: GameState) => void;
}

const Timeline = ({ 
  chapters, 
  onChapterClick, 
  correctAnswers,
  gameState,
  onStateChange 
}: TimelineProps) => {
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [playingChapterId, setPlayingChapterId] = useState<string | null>(null);

  const handleChapterClick = (chapter: ChapterData) => {
    if (!chapter.unlocked) return;
    
    if (!chapter.gameCompleted) {
      setPlayingChapterId(chapter.id);
      setShowGame(true);
    } else {
      setSelectedChapter(chapter);
      onChapterClick(chapter);
    }
  };

  const handleGameComplete = (chapterId: string) => {
    const newState = completeChapterGame(gameState, chapterId);
    onStateChange(newState);
    setShowGame(false);
    setPlayingChapterId(null);
    
    const chapter = newState.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      setTimeout(() => setSelectedChapter(chapter), 500);
    }
  };

  const handleCloseGame = () => {
    setShowGame(false);
    setPlayingChapterId(null);
  };

  const playingChapter = chapters.find(ch => ch.id === playingChapterId);

  return (
    <div className="min-h-screen pb-24 pt-8 px-4 bg-gradient-soft">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
          Nossa História
        </h1>
        <p className="text-muted-foreground">
          {correctAnswers} de {chapters.length} capítulos completos
        </p>
        
        <div className="flex justify-center gap-1 mt-4">
          {chapters.map((ch, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`w-3 h-3 rounded-full ${
                ch.gameCompleted 
                  ? 'bg-rose' 
                  : ch.unlocked 
                  ? 'bg-gold animate-pulse' 
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </motion.div>

      <div className="max-w-md mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose via-gold to-muted" />

        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative mb-6 pl-14"
          >
            {/* Timeline dot */}
            <motion.div
              whileHover={chapter.unlocked ? { scale: 1.2 } : {}}
              className={`absolute left-4 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${
                chapter.gameCompleted
                  ? 'bg-rose border-rose-dark'
                  : chapter.unlocked
                  ? 'bg-gold border-gold-light animate-pulse'
                  : 'bg-muted border-border'
              }`}
            >
              {chapter.gameCompleted ? (
                <Heart className="w-3 h-3 text-primary-foreground" fill="currentColor" />
              ) : chapter.unlocked ? (
                <Gamepad2 className="w-3 h-3 text-primary-foreground" />
              ) : (
                <Lock className="w-2.5 h-2.5 text-muted-foreground" />
              )}
            </motion.div>

            <motion.button
              onClick={() => handleChapterClick(chapter)}
              disabled={!chapter.unlocked}
              whileHover={chapter.unlocked ? { scale: 1.02, x: 5 } : {}}
              whileTap={chapter.unlocked ? { scale: 0.98 } : {}}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                chapter.gameCompleted
                  ? 'bg-card shadow-romantic border border-rose/20'
                  : chapter.unlocked
                  ? 'bg-card/80 shadow-soft border border-gold/30 hover:border-gold'
                  : 'bg-muted/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span className="text-xs font-medium text-rose uppercase tracking-wider">
                    {chapter.date}
                  </span>
                  <h3 className={`font-display text-lg mt-1 ${
                    chapter.unlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {chapter.description}
                  </p>
                  
                  {chapter.unlocked && !chapter.gameCompleted && (
                    <span className="inline-flex items-center gap-1 mt-2 text-xs text-gold font-medium">
                      <Gamepad2 className="w-3 h-3" />
                      Jogar para desbloquear
                    </span>
                  )}
                </div>
                
                {chapter.unlocked && (
                  <ChevronRight className={`w-5 h-5 mt-4 ${
                    chapter.gameCompleted ? 'text-rose' : 'text-gold'
                  }`} />
                )}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Chapter Detail Modal */}
      <AnimatePresence>
        {selectedChapter && (
          <ChapterDetail
            chapter={selectedChapter}
            onClose={() => setSelectedChapter(null)}
          />
        )}
      </AnimatePresence>

      {/* Game Modal */}
      <AnimatePresence>
        {showGame && playingChapter && (
          <ChapterGame
            chapter={playingChapter}
            onComplete={() => handleGameComplete(playingChapter.id)}
            onClose={handleCloseGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
