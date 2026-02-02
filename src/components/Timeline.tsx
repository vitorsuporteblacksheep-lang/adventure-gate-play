import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, ChevronRight, Gamepad2, Play, Sparkles, Quote, Moon } from 'lucide-react';
import { ChapterData, GameState, completeChapterGame } from '@/lib/gameState';
import ChapterDetail from './ChapterDetail';
import ChapterGame from './games/ChapterGame';
import ChapterReveal from './ChapterReveal';
import SecretChapterReveal from './SecretChapterReveal';
import SecretChapterDetail from './SecretChapterDetail';

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
  const [showReveal, setShowReveal] = useState(false);
  const [revealChapter, setRevealChapter] = useState<ChapterData | null>(null);
  const [playingChapterId, setPlayingChapterId] = useState<string | null>(null);
  const [showSecretReveal, setShowSecretReveal] = useState(false);
  const [secretChapter, setSecretChapter] = useState<ChapterData | null>(null);
  const [showSecretDetail, setShowSecretDetail] = useState(false);

  // Filter out secret chapters from the visible list
  const visibleChapters = chapters.filter(ch => !ch.isSecret);
  const secretChapterData = chapters.find(ch => ch.isSecret);
  const chapter11 = chapters.find(ch => ch.id === 'chapter-11');
  const secretUnlocked = secretChapterData?.unlocked || false;

  const handleChapterClick = (chapter: ChapterData) => {
    if (!chapter.unlocked) return;
    
    if (chapter.isSecret) {
      // Secret chapter - show secret detail
      setSelectedChapter(chapter);
      setShowSecretDetail(true);
      return;
    }
    
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

  // Handle closing chapter detail - triggers secret reveal for chapter 11
  const handleCloseChapterDetail = () => {
    const closingChapter = selectedChapter;
    setSelectedChapter(null);
    
    // If closing chapter 11, trigger secret reveal
    if (closingChapter?.isFinalChapter && secretChapterData && !secretUnlocked) {
      setTimeout(() => {
        setSecretChapter(secretChapterData);
        setShowSecretReveal(true);
        // Unlock secret chapter in state
        const updatedChapters = gameState.chapters.map(ch => 
          ch.id === 'chapter-12' ? { ...ch, unlocked: true, gameCompleted: true } : ch
        );
        onStateChange({ ...gameState, chapters: updatedChapters });
      }, 800);
    }
  };

  const handleSecretRevealComplete = () => {
    setShowSecretReveal(false);
    if (secretChapter) {
      setTimeout(() => {
        setSelectedChapter(secretChapter);
        setShowSecretDetail(true);
      }, 300);
      setSecretChapter(null);
    }
  };

  const handleCloseGame = () => {
    setShowGame(false);
    setPlayingChapterId(null);
  };

  // YouTube links for each chapter's song
  const chapterYouTubeLinks = [
    'https://www.youtube.com/watch?v=pMSwHRwbMEo', // Céu Azul - Charlie Brown Jr
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
  ];

  const openMusic = (index: number) => {
    window.open(chapterYouTubeLinks[index], '_blank');
  };

  const playingChapter = chapters.find(ch => ch.id === playingChapterId);
  const completedCount = visibleChapters.filter(ch => ch.gameCompleted).length;

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
          {completedCount} de {visibleChapters.length} capítulos completos
        </p>
        
        {/* Progress bar */}
        <div className="max-w-xs mx-auto mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / visibleChapters.length) * 100}%` }}
              className="h-full bg-gradient-wine rounded-full"
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Chapters */}
      <div className="max-w-lg mx-auto space-y-6">
        {visibleChapters.map((chapter, index) => (
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
                      {chapter.isFinalChapter && chapter.gameCompleted && (
                        <span className="text-xs px-2 py-0.5 bg-wine/20 text-wine rounded-full font-body">
                          Final
                        </span>
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
                        openMusic(index);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-all bg-wine/10 text-wine hover:bg-wine/20"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Ouvir Música
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

        {/* Secret Chapter Card - Only visible after unlocked */}
        {secretUnlocked && secretChapterData && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChapterClick(secretChapterData)}
              className="relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(15,52,96,0.95) 100%)',
                border: '1px solid rgba(212,175,55,0.4)',
                boxShadow: '0 0 30px rgba(212,175,55,0.2), 0 0 60px rgba(79,70,229,0.1)',
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />

              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(147,112,219,0.3) 100%)',
                      boxShadow: '0 0 20px rgba(212,175,55,0.3)',
                    }}
                  >
                    <Moon className="w-8 h-8" style={{ color: '#fef3c7' }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="text-xs font-semibold uppercase tracking-wider font-body"
                        style={{ color: '#D4AF37' }}
                      >
                        {secretChapterData.date}
                      </span>
                      <Sparkles className="w-4 h-4" style={{ color: '#D4AF37' }} />
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full font-body"
                        style={{ 
                          background: 'rgba(147,112,219,0.3)',
                          color: '#E9D5FF',
                        }}
                      >
                        Secreto
                      </span>
                    </div>
                    
                    <h3 
                      className="font-display text-xl mb-1"
                      style={{ color: '#fef3c7' }}
                    >
                      {secretChapterData.title}
                    </h3>
                    
                    <p 
                      className="text-sm font-body"
                      style={{ color: 'rgba(254,243,199,0.6)' }}
                    >
                      Um capítulo especial só para nós...
                    </p>
                  </div>

                  <ChevronRight className="w-6 h-6 mt-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                </div>
              </div>

              {/* Progress indicator - twilight themed */}
              <div 
                className="h-1"
                style={{
                  background: 'linear-gradient(90deg, #D4AF37 0%, #9370DB 50%, #4B0082 100%)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>


      {/* Chapter Detail Modal - Regular chapters */}
      <AnimatePresence>
        {selectedChapter && !selectedChapter.isSecret && !showSecretDetail && (
          <ChapterDetail
            chapter={selectedChapter}
            onClose={handleCloseChapterDetail}
          />
        )}
      </AnimatePresence>

      {/* Secret Chapter Detail Modal */}
      <AnimatePresence>
        {showSecretDetail && selectedChapter?.isSecret && (
          <SecretChapterDetail
            chapter={selectedChapter}
            onClose={() => {
              setShowSecretDetail(false);
              setSelectedChapter(null);
            }}
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

      {/* Reveal Animation - Regular */}
      <AnimatePresence>
        {showReveal && revealChapter && (
          <ChapterReveal
            chapter={revealChapter}
            onComplete={handleRevealComplete}
          />
        )}
      </AnimatePresence>

      {/* Secret Chapter Reveal Animation */}
      <AnimatePresence>
        {showSecretReveal && secretChapter && (
          <SecretChapterReveal
            chapter={secretChapter}
            onComplete={handleSecretRevealComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
