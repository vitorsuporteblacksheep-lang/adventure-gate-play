import { motion } from 'framer-motion';
import { Heart, Camera, Sparkles } from 'lucide-react';

interface GalleryProps {
  interactions: number;
  onInteraction: () => void;
}

const memories = [
  { id: 1, emoji: '📸', title: 'Nosso primeiro selfie juntos', date: 'Janeiro 2023' },
  { id: 2, emoji: '🌅', title: 'Pôr do sol na praia', date: 'Março 2023' },
  { id: 3, emoji: '🎂', title: 'Seu aniversário especial', date: 'Maio 2023' },
  { id: 4, emoji: '🎄', title: 'Nosso primeiro Natal', date: 'Dezembro 2023' },
  { id: 5, emoji: '✈️', title: 'Nossa viagem dos sonhos', date: 'Junho 2023' },
  { id: 6, emoji: '🌹', title: 'Dia dos Namorados', date: 'Junho 2023' },
];

const Gallery = ({ interactions, onInteraction }: GalleryProps) => {
  return (
    <div className="min-h-screen pb-24 pt-8 px-4 bg-gradient-soft">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Camera className="w-10 h-10 text-rose mx-auto mb-2" />
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
          Nossa Galeria
        </h1>
        <p className="text-muted-foreground">
          Momentos eternizados no coração
        </p>
      </motion.div>

      <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={onInteraction}
            className="bg-card rounded-xl p-4 shadow-soft cursor-pointer hover:shadow-romantic transition-shadow"
          >
            <div className="text-4xl mb-3">{memory.emoji}</div>
            <h3 className="font-display text-sm text-foreground mb-1">
              {memory.title}
            </h3>
            <p className="text-xs text-muted-foreground">{memory.date}</p>
            <Heart className="w-4 h-4 text-rose mt-2" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm text-muted-foreground">
            {interactions} momentos de amor
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
