import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Camera, Play, ImageIcon, MessageCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryItem {
  id: number;
  emoji: string;
  title: string;
  date: string;
  mood: string;
  videoUrl?: string;
  imageUrl?: string;
  chatMessages?: unknown[];
}

interface GalleryCardProps {
  memory: GalleryItem;
  index: number;
  onClick: () => void;
}

const GalleryCard = ({ memory, index, onClick }: GalleryCardProps) => {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const hasMedia = memory.imageUrl || memory.videoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -4 }}
      onClick={onClick}
      className="bg-gradient-card rounded-2xl overflow-hidden shadow-elegant cursor-pointer border border-wine/10 hover:border-wine/30 transition-all group relative"
    >
      {/* Thumbnail preview */}
      {hasMedia && (
        <div className="relative w-full h-28 overflow-hidden bg-wine/5">
          {memory.imageUrl && (
            <>
              {!thumbLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-wine/10" />
              )}
              <img
                src={memory.imageUrl}
                alt={memory.title}
                loading="lazy"
                onLoad={() => setThumbLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  thumbLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          )}
          {memory.videoUrl && !memory.imageUrl && (
            <div className="w-full h-full flex items-center justify-center bg-wine/10">
              <div className="w-12 h-12 rounded-full bg-wine/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-wine ml-0.5" />
              </div>
            </div>
          )}
          {/* Overlay icon */}
          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            {memory.videoUrl ? (
              <Play className="w-3.5 h-3.5 text-white" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-white" />
            )}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="text-3xl">{memory.emoji}</div>
          {!hasMedia && (
            <div className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine/20 transition-colors">
              {memory.chatMessages ? (
                <MessageCircle className="w-4 h-4 text-wine" />
              ) : (
                <ImageIcon className="w-4 h-4 text-wine" />
              )}
            </div>
          )}
        </div>
        <h3 className="font-display text-sm text-foreground mb-1 leading-tight line-clamp-2">
          {memory.title}
        </h3>
        <p className="text-xs text-muted-foreground font-body mb-2">{memory.date}</p>
        <div className="flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-wine" fill="currentColor" />
          <span className="text-xs text-wine font-body font-medium">{memory.mood}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
