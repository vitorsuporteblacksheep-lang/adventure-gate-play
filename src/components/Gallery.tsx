import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Sparkles, ImageIcon, Play, X } from 'lucide-react';

interface GalleryProps {
  interactions: number;
  onInteraction: () => void;
}

interface GalleryItem {
  id: number;
  emoji: string;
  title: string;
  date: string;
  mood: string;
  videoUrl?: string;
}

const memories: GalleryItem[] = [
  { id: 1, emoji: '💑', title: 'Primeira vez que saímos juntos de "casal"', date: 'Setembro 2022', mood: 'Amor', videoUrl: '/gallery/primeira-saida-casal.mp4' },
  { id: 2, emoji: '📸', title: 'Nosso primeiro selfie juntos', date: 'Janeiro 2023', mood: 'Felicidade' },
  { id: 3, emoji: '🌅', title: 'Pôr do sol na praia', date: 'Março 2023', mood: 'Paz' },
  { id: 4, emoji: '🎂', title: 'Seu aniversário especial', date: 'Maio 2023', mood: 'Celebração' },
  { id: 5, emoji: '🎄', title: 'Nosso primeiro Natal', date: 'Dezembro 2023', mood: 'Magia' },
  { id: 6, emoji: '✈️', title: 'Nossa viagem dos sonhos', date: 'Junho 2023', mood: 'Aventura' },
  { id: 7, emoji: '🌹', title: 'Dia dos Namorados', date: 'Junho 2023', mood: 'Romance' },
];

const Gallery = ({ interactions, onInteraction }: GalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);

  const handleCardClick = (memory: GalleryItem) => {
    onInteraction();
    if (memory.videoUrl) {
      setSelectedVideo(memory);
    }
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
            onClick={() => handleCardClick(memory)}
            className="bg-gradient-card rounded-2xl p-5 shadow-elegant cursor-pointer border border-wine/10 hover:border-wine/30 transition-all group relative"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{memory.emoji}</div>
              <div className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine/20 transition-colors">
                {memory.videoUrl ? (
                  <Play className="w-4 h-4 text-wine" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-wine" />
                )}
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

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-lg bg-gradient-card rounded-2xl overflow-hidden shadow-elegant border border-wine/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center justify-between border-b border-wine/10">
                <h3 className="font-display text-lg text-foreground">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center hover:bg-wine/20 transition-colors"
                >
                  <X className="w-4 h-4 text-wine" />
                </button>
              </div>
              <div className="p-4">
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full rounded-xl"
                  playsInline
                />
                <div className="mt-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-wine" fill="currentColor" />
                  <span className="text-sm text-muted-foreground font-body">
                    {selectedVideo.date} • {selectedVideo.mood}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
