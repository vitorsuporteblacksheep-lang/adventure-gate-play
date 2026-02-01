import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface MemoryGameProps {
  chapter: ChapterData;
  onComplete: () => void;
}

const symbols = ['💕', '💖', '💗', '💘', '💝', '💞'];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = ({ chapter, onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameSymbols = symbols.slice(0, 6);
    const pairs = [...gameSymbols, ...gameSymbols];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    
    setCards(
      shuffled.map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
    );
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].symbol === cards[second].symbol) {
        setTimeout(() => {
          const matchedCards = cards.map((card, i) =>
            i === first || i === second
              ? { ...card, isMatched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(card => card.isMatched)) {
            setCompleted(true);
            setTimeout(onComplete, 1500);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = cards.map((card, i) =>
            i === first || i === second
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
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
        >
          <Heart className="w-16 h-16 text-rose mx-auto mb-4" fill="currentColor" />
        </motion.div>
        <h3 className="font-display text-2xl text-foreground mb-2">
          Memórias Conectadas!
        </h3>
        <p className="text-muted-foreground">
          Você completou em {moves} movimentos
        </p>
        <Sparkles className="w-8 h-8 text-gold mx-auto mt-4" />
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-display text-lg text-foreground mb-1">
          Jogo da Memória
        </h3>
        <p className="text-sm text-muted-foreground">
          Encontre os pares de corações! Movimentos: {moves}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-lg text-2xl flex items-center justify-center transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-gradient-romantic'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            <motion.span
              initial={false}
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                opacity: card.isFlipped || card.isMatched ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {card.isFlipped || card.isMatched ? card.symbol : ''}
            </motion.span>
            {!card.isFlipped && !card.isMatched && (
              <Heart className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
