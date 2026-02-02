import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, X, Check } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface QuizGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const quizQuestions: Record<string, { question: string; options: string[]; correct: number }[]> = {
  'chapter-1': [
    {
      question: 'O que você sentiu no primeiro momento que me viu?',
      options: ['Borboletas no estômago', 'Indiferença', 'Curiosidade', 'Um amor instantâneo'],
      correct: 0,
    },
  ],
  'chapter-3': [
    {
      question: 'Qual foi o primeiro filme que assistimos juntos?',
      options: ['Vingadores: Ultimato', 'Thor: Amor e Trovão', 'Homem-Aranha: Sem Volta para Casa', 'Doutor Estranho 2'],
      correct: 1,
    },
  ],
  'chapter-4': [
    {
      question: 'Qual o primeiro jogo que jogamos juntos?',
      options: ['The Last of Us', 'Until Dawn', 'Resident Evil', 'It Takes Two'],
      correct: 1,
    },
  ],
};

const QuizGame = ({ chapter, onComplete }: QuizGameProps) => {
  const questions = quizQuestions[chapter.id] || quizQuestions['chapter-1'];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setCompleted(true);
        setTimeout(onComplete, 1500);
      }
    }, 1500);
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
          Capítulo Desbloqueado!
        </h3>
        <p className="text-muted-foreground font-body">
          Você acertou {score} de {questions.length} perguntas
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: questions.length }).map((_, i) => (
            <Sparkles
              key={i}
              className={`w-6 h-6 ${i < score ? 'text-gold' : 'text-muted'}`}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-sm text-muted-foreground font-body">
          Pergunta {currentQuestion + 1} de {questions.length}
        </span>
        <div className="flex justify-center gap-2 mt-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < currentQuestion
                  ? 'bg-wine'
                  : i === currentQuestion
                  ? 'bg-gold w-6'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.h3
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-display text-xl text-foreground text-center"
      >
        {question.question}
      </motion.h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between font-body ${
              selectedAnswer === null
                ? 'bg-card hover:bg-wine/5 hover:border-wine/30 border border-wine/10 shadow-soft'
                : selectedAnswer === index
                ? index === question.correct
                  ? 'bg-wine text-primary-foreground border border-wine'
                  : 'bg-destructive/80 text-destructive-foreground border border-destructive'
                : index === question.correct && showResult
                ? 'bg-wine/20 border-2 border-wine'
                : 'bg-muted opacity-50 border border-transparent'
            }`}
          >
            <span className="font-medium">{option}</span>
            {showResult && selectedAnswer === index && (
              index === question.correct ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuizGame;
