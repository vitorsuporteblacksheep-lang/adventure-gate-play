import { motion } from 'framer-motion';
import { Heart, Camera, Sparkles, ImageIcon } from 'lucide-react';

interface GalleryProps {
  interactions: number;
  onInteraction: () => void;
}

const memories = [
  { id: 1, emoji: '📸', title: 'Nosso primeiro selfie juntos', date: 'Janeiro 2023', mood: 'Felicidade' },
  { id: 2, emoji: '🌅', title: 'Pôr do sol na praia', date: 'Março 2023', mood: 'Paz' },
  { id: 3, emoji: '🎂', title: 'Seu aniversário especial', date: 'Maio 2023', mood: 'Celebração' },
  { id: 4, emoji: '🎄', title: 'Nosso primeiro Natal', date: 'Dezembro 2023', mood: 'Magia' },
  { id: 5, emoji: '✈️', title: 'Nossa viagem dos sonhos', date: 'Junho 2023', mood: 'Aventura' },
  { id: 6, emoji: '🌹', title: 'Dia dos Namorados', date: 'Junho 2023', mood: 'Romance' },
];

const Gallery = ({ interactions, onInteraction }: GalleryProps) => {
  return (
    <div className="min-h-screen pb-28 pt-6 px-4 bg-gradient-elegant">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-wine" />
          <Camera className="w-6 h-6 text-wine" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-wine" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Nossa Galeria
        </h1>
        <p className="text-muted-foreground font-body">
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
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={onInteraction}
            className="bg-gradient-card rounded-2xl p-5 shadow-elegant cursor-pointer border border-wine/10 hover:border-wine/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{memory.emoji}</div>
              <div className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine/20 transition-colors">
                <ImageIcon className="w-4 h-4 text-wine" />
              </div>
            </div>
            <h3 className="font-display text-base text-foreground mb-1 leading-tight">
              {memory.title}
            </h3>
            <p className="text-xs text-muted-foreground font-body mb-2">{memory.date}</p>
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-wine" fill="currentColor" />
              <span className="text-xs text-wine font-body font-medium">{memory.mood}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-card rounded-full shadow-elegant border border-wine/10">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm text-foreground font-body font-medium">
            {interactions} momentos de amor
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
