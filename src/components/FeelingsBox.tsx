import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, MessageCircleHeart } from 'lucide-react';

interface FeelingsBoxProps {
  interactions: number;
  onInteraction: () => void;
}

const FeelingsBox = ({ interactions, onInteraction }: FeelingsBoxProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([
    'Você é a melhor parte do meu dia ❤️',
    'Cada momento contigo é especial',
    'Meu amor por você cresce a cada dia',
  ]);
  const [showHeart, setShowHeart] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([message, ...messages]);
    setMessage('');
    onInteraction();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1500);
  };

  return (
    <div className="min-h-screen pb-24 pt-8 px-4 bg-gradient-soft">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <MessageCircleHeart className="w-10 h-10 text-rose mx-auto mb-2" />
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
          Caixinha de Sentimentos
        </h1>
        <p className="text-muted-foreground">
          Deixe seu amor em palavras
        </p>
      </motion.div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escreva algo especial..."
            className="w-full px-4 py-3 pr-12 bg-card rounded-xl border border-border focus:border-rose focus:ring-2 focus:ring-rose/20 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-romantic text-primary-foreground disabled:opacity-50 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Floating heart animation */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{ opacity: 1, y: -50, scale: 1.5 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <Heart className="w-12 h-12 text-rose" fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-4 rounded-xl shadow-soft"
            >
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" fill="currentColor" />
                <p className="text-foreground font-body">{msg}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeelingsBox;
