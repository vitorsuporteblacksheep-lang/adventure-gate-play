import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Calendar, Quote, Sparkles, Music, Clock, MapPin, Image, Video } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface ChapterDetailProps {
  chapter: ChapterData;
  onClose: () => void;
}

const ChapterDetail = ({ chapter, onClose }: ChapterDetailProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const hasVideo = !!chapter.videoUrl;

  // Autoplay Spotify URL - using theme=0 and autoplay=true for better compatibility
  const spotifyAutoplayUrl = chapter.spotifyEmbedUrl 
    ? chapter.spotifyEmbedUrl + (chapter.spotifyEmbedUrl.includes('?') ? '&theme=0&autoplay=true' : '?theme=0&autoplay=true')
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-wine-dark/60 backdrop-blur-md overscroll-none"
      onClick={onClose}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-card rounded-2xl max-w-md w-full shadow-card border border-wine/20 max-h-[90vh] overflow-hidden"
      >
        {/* Header with photo/video or gradient */}
        <div className="relative">
          {chapter.image ? (
            <div className="relative h-56 overflow-hidden">
              {showVideo && chapter.videoUrl ? (
                <video
                  src={chapter.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={chapter.image} 
                  alt={chapter.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-wine-dark via-wine-dark/40 to-transparent pointer-events-none" />
              
              {/* Top buttons */}
              <div className="absolute right-4 top-4 flex items-center gap-2">
                {hasVideo && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-sm"
                  >
                    {showVideo ? (
                      <Image className="w-5 h-5 text-white" />
                    ) : (
                      <Video className="w-5 h-5 text-white" />
                    )}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-4xl mb-2"
                >
                  {chapter.icon}
                </motion.div>
                
                <div className="flex items-center gap-2 text-gold-light mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-body">{chapter.date}</span>
                </div>

                <h2 className="font-display text-3xl text-white drop-shadow-lg">
                  {chapter.title}
                </h2>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-wine p-6 text-center relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-5xl mb-3"
              >
                {chapter.icon}
              </motion.div>
              
              <div className="flex items-center justify-center gap-2 text-gold-light mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-body">{chapter.date}</span>
              </div>

              <h2 className="font-display text-3xl text-primary-foreground">
                {chapter.title}
              </h2>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[45vh]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-foreground font-body leading-relaxed mb-6">
              {chapter.description}
            </p>

            {/* Memory box */}
            <div className="bg-gradient-soft rounded-xl p-5 border border-wine/10 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-wine" fill="currentColor" />
                <span className="font-display text-lg text-foreground">Memória Especial</span>
              </div>
              <p className="font-body text-foreground/80 leading-relaxed">
                {chapter.memory}
              </p>
            </div>

            {/* Quote */}
            <div className="bg-wine/5 rounded-xl p-4 border-l-4 border-wine mb-6">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <p className="font-body text-muted-foreground italic">
                  {chapter.quote}
                </p>
              </div>
            </div>

            {/* Spotify Player */}
            {chapter.spotifyEmbedUrl && (
              <div className="rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-5 h-5 text-wine" />
                  <span className="font-display text-lg text-foreground">Trilha Sonora</span>
                </div>
                <iframe
                  src={spotifyAutoplayUrl || ''}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-wine/10 bg-muted/30">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-wine text-primary-foreground rounded-xl font-body font-semibold shadow-wine flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Fechar Memória
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChapterDetail;
