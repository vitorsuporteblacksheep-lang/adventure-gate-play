import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, ChevronRight, Gamepad2, Play, Pause, Volume2, Sparkles, Quote } from 'lucide-react';
import { ChapterData, GameState, completeChapterGame } from '@/lib/gameState';
import ChapterDetail from './ChapterDetail';
import ChapterGame from './games/ChapterGame';
import ChapterReveal from './ChapterReveal';

interface TimelineProps {
  chapters: ChapterData[];
  onChapterClick: (chapter: ChapterData) => void;
  correctAnswers: number;
  gameState: GameState;
  onStateChange: (state: GameState) => void;
}

// Background music URLs (royalty-free romantic music)
const chapterMusic = [
  'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
  'https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3',
  'https://assets.mixkit.co/music/preview/mixkit-feeling-happy-5.mp3',
  'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
  'https://assets.mixkit.co/music/preview/mixkit-sun-and-his-daughter-580.mp3',
  'https://assets.mixkit.co/music/preview/mixkit-sweet-love-138.mp3',
];

const Timeline = ({ 
  chapters, 
  onChapterClick, 
  correctAnswers,
  gameState,
  onStateChange 
}: TimelineProps) => {
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [revealChapter, setRevealChapter] = useState<ChapterData | null>(null);
  const [playingChapterId, setPlayingChapterId] = useState<string | null>(null);
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      // Show reveal animation
      setRevealChapter(chapter);
      setShowReveal(true);
    }
  };

  const handleRevealComplete = () => {
    setShowReveal(false);
    if (revealChapter) {
      setTimeout(() => setSelectedChapter(revealChapter), 300);
      setRevealChapter(null);
    }
  };

  const handleCloseGame = () => {
    setShowGame(false);
    setPlayingChapterId(null);
  };

  const toggleMusic = (chapterId: string, index: number) => {
    if (playingMusicId === chapterId) {
      audioRef.current?.pause();
      setPlayingMusicId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(chapterMusic[index]);
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play();
      setPlayingMusicId(chapterId);
    }
  };

  const playingChapter = chapters.find(ch => ch.id === playingChapterId);
  const completedCount = chapters.filter(ch => ch.gameCompleted).length;

  return (
    <div className="min-h-screen pb-28 pt-6 px-4 bg-gradient-elegant">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-wine" />
          <Heart className="w-6 h-6 text-wine" fill="currentColor" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-wine" />
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2 tracking-wide">
          Nossa História
        </h1>
        <p className="text-muted-foreground font-body">
          {completedCount} de {chapters.length} capítulos completos
        </p>
        
        {/* Progress bar */}
        <div className="max-w-xs mx-auto mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / chapters.length) * 100}%` }}
              className="h-full bg-gradient-wine rounded-full"
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Chapters */}
      <div className="max-w-lg mx-auto space-y-6">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
          >
            <motion.div
              whileHover={chapter.unlocked ? { scale: 1.02, y: -4 } : {}}
              whileTap={chapter.unlocked ? { scale: 0.98 } : {}}
              onClick={() => handleChapterClick(chapter)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${
                chapter.gameCompleted
                  ? 'bg-gradient-card shadow-card border border-wine/20'
                  : chapter.unlocked
                  ? 'bg-gradient-card shadow-elegant border border-gold/30 hover:border-gold'
                  : 'bg-muted/50 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Shimmer effect for unlocked but not completed */}
              {chapter.unlocked && !chapter.gameCompleted && (
                <div className="absolute inset-0 shimmer pointer-events-none" />
              )}

              <div className="p-5">
                {/* Chapter header */}
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                    chapter.gameCompleted
                      ? 'bg-gradient-wine shadow-wine'
                      : chapter.unlocked
                      ? 'bg-gradient-gold'
                      : 'bg-muted'
                  }`}>
                    {chapter.gameCompleted ? (
                      <span>{chapter.icon}</span>
                    ) : chapter.unlocked ? (
                      <Gamepad2 className="w-7 h-7 text-wine-dark" />
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-wine uppercase tracking-wider font-body">
                        {chapter.date}
                      </span>
                      {chapter.gameCompleted && (
                        <Sparkles className="w-4 h-4 text-gold" />
                      )}
                    </div>
                    
                    <h3 className={`font-display text-xl mb-1 ${
                      chapter.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {chapter.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 font-body">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {chapter.unlocked && (
                    <ChevronRight className={`w-6 h-6 mt-4 flex-shrink-0 ${
                      chapter.gameCompleted ? 'text-wine' : 'text-gold'
                    }`} />
                  )}
                </div>

                {/* Quote preview for completed chapters */}
                {chapter.gameCompleted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-wine/10"
                  >
                    <div className="flex items-start gap-2">
                      <Quote className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground italic font-body line-clamp-2">
                        {chapter.quote}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-4">
                  {chapter.unlocked && !chapter.gameCompleted && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 rounded-full text-xs text-gold font-semibold font-body">
                      <Gamepad2 className="w-3.5 h-3.5" />
                      Jogar para desbloquear
                    </span>
                  )}
                  
                  {chapter.gameCompleted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMusic(chapter.id, index);
                      }}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-all ${
                        playingMusicId === chapter.id
                          ? 'bg-wine text-primary-foreground'
                          : 'bg-wine/10 text-wine hover:bg-wine/20'
                      }`}
                    >
                      {playingMusicId === chapter.id ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          Pausar Música
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          Tocar Música
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Progress indicator */}
              {chapter.gameCompleted && (
                <div className="h-1 bg-gradient-wine" />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Music indicator */}
      <AnimatePresence>
        {playingMusicId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-wine text-primary-foreground rounded-full shadow-wine flex items-center gap-2 z-40"
          >
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-body">♪ Música tocando...</span>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Reveal Animation */}
      <AnimatePresence>
        {showReveal && revealChapter && (
          <ChapterReveal
            chapter={revealChapter}
            onComplete={handleRevealComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
