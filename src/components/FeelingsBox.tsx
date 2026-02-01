import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, MessageCircleHeart, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen pb-28 pt-6 px-4 bg-gradient-elegant">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-wine" />
          <MessageCircleHeart className="w-6 h-6 text-wine" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-wine" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Caixinha de Sentimentos
        </h1>
        <p className="text-muted-foreground font-body">
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
            className="w-full px-5 py-4 pr-14 bg-gradient-card rounded-2xl border border-wine/20 focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-all font-body shadow-soft"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-gradient-wine text-primary-foreground disabled:opacity-50 transition-all shadow-wine hover:shadow-glow"
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 pointer-events-none z-50"
            >
              <Heart className="w-16 h-16 text-wine" fill="currentColor" />
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
              className="bg-gradient-card p-4 rounded-2xl shadow-elegant border border-wine/10"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-wine" fill="currentColor" />
                </div>
                <p className="text-foreground font-body pt-1">{msg}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeelingsBox;
