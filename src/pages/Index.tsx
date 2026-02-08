import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '@/components/LandingPage';
import Navigation from '@/components/Navigation';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import LoveLetter from '@/components/LoveLetter';
import FutureSection from '@/components/FutureSection';
import { 
  loadState, 
  recordInteraction,
  unlockStory,
  GameState,
  ChapterData
} from '@/lib/gameState';

type Section = 'timeline' | 'gallery' | 'letter' | 'future';

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('timeline');
  const [gameState, setGameState] = useState<GameState>(() => loadState());

  useEffect(() => {
    if (gameState.visitCount > 1 && gameState.storyUnlocked) {
      // Returning visitor who already unlocked the story
    }
  }, [gameState.visitCount, gameState.storyUnlocked]);

  const handleStart = () => {
    setHasStarted(true);
    const newState = unlockStory(recordInteraction(gameState));
    setGameState(newState);
  };

  const handleNavigate = (section: Section) => {
    if (gameState.sectionUnlocks[section]) {
      setCurrentSection(section);
      const newState = recordInteraction(gameState);
      setGameState(newState);
    }
  };

  const handleChapterClick = (chapter: ChapterData) => {
    const newState = recordInteraction(gameState);
    setGameState(newState);
  };

  const handleLetterInteraction = () => {
    const newState = recordInteraction(gameState);
    setGameState(newState);
  };

  const handleStateChange = (newState: GameState) => {
    setGameState(newState);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'timeline':
        return (
          <Timeline 
            chapters={gameState.chapters} 
            onChapterClick={handleChapterClick}
            correctAnswers={gameState.quizProgress.correctAnswers}
            gameState={gameState}
            onStateChange={handleStateChange}
          />
        );
      case 'gallery':
        return (
          <Gallery 
            interactions={gameState.totalInteractions} 
            onInteraction={handleLetterInteraction} 
          />
        );
      case 'letter':
        return <LoveLetter />;
      case 'future':
        return <FutureSection />;
      default:
        return (
          <Timeline 
            chapters={gameState.chapters} 
            onChapterClick={handleChapterClick}
            correctAnswers={gameState.quizProgress.correctAnswers}
            gameState={gameState}
            onStateChange={handleStateChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <LandingPage key="landing" onStart={handleStart} />
        ) : (
          <div key="app">
            {renderSection()}
            <Navigation 
              currentSection={currentSection} 
              onNavigate={handleNavigate}
              sectionUnlocks={gameState.sectionUnlocks}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
