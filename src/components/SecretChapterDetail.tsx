import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Calendar, Quote, Sparkles, Music, Moon, Star } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface SecretChapterDetailProps {
  chapter: ChapterData;
  onClose: () => void;
}

const SecretChapterDetail = ({ chapter, onClose }: SecretChapterDetailProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Autoplay Spotify URL - using theme=0 and autoplay=true for better compatibility
  const spotifyAutoplayUrl = chapter.spotifyEmbedUrl 
    ? chapter.spotifyEmbedUrl + (chapter.spotifyEmbedUrl.includes('?') ? '&theme=0&autoplay=true' : '?theme=0&autoplay=true')
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-start md:items-center justify-center p-4 overflow-y-auto py-8 overscroll-none"
      style={{
        background: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
      }}
      onClick={onClose}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Floating particles - Twilight atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating moons and stars */}
        <motion.div
          className="absolute top-10 right-10 text-amber-200/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <Moon className="w-24 h-24" />
        </motion.div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-amber-100/40"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${5 + Math.random() * 30}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-4 h-4" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(26,26,46,0.95) 0%, rgba(15,52,96,0.95) 100%)',
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 0 60px rgba(212,175,55,0.2), 0 0 120px rgba(79,70,229,0.1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-amber-200/10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-3"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 to-purple-600/20 border border-amber-200/30">
              <Moon className="w-8 h-8 text-amber-200" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span className="text-amber-200/80 font-body text-xs tracking-wider uppercase">
                Capítulo Secreto
              </span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-3 h-3 text-amber-200/60" />
              <span className="text-amber-200/60 font-body text-sm">{chapter.date}</span>
            </div>

            <h1 
              className="font-display text-3xl md:text-4xl bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent"
            >
              {chapter.title}
            </h1>
          </motion.div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 md:p-6"
        >
          <div 
            className="relative w-full rounded-2xl overflow-hidden border-2 border-amber-200/30"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(26,26,46,0.9) 100%)',
              boxShadow: '0 0 40px rgba(212,175,55,0.2), 0 0 80px rgba(147,112,219,0.1)',
            }}
          >
            {chapter.videoUrl ? (
              <video
                src={chapter.videoUrl}
                controls
                playsInline
                preload="auto"
                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                style={{
                  minHeight: '200px',
                }}
                onLoadedData={() => setVideoLoaded(true)}
              />
            ) : (
              <div 
                className="flex flex-col items-center justify-center text-amber-200/60 py-16"
                style={{ aspectRatio: '16/9' }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-3"
                >
                  <Heart className="w-12 h-12" fill="currentColor" />
                </motion.div>
                <p className="font-body text-base">Vídeo em breve...</p>
                <p className="font-body text-xs mt-1 text-amber-200/40">
                  Uma surpresa especial está sendo preparada
                </p>
              </div>
            )}
          </div>
          
          {/* Video caption */}
          {chapter.videoUrl && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-amber-200/60 text-xs mt-2 font-body"
            >
              🎬 Ative o som para a experiência completa
            </motion.p>
          )}
        </motion.div>

        {/* Description - if any */}
        {chapter.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-4 md:px-6 pb-4"
          >
            <p className="text-amber-100/80 font-body text-center text-base leading-relaxed max-w-xl mx-auto">
              {chapter.description}
            </p>
          </motion.div>
        )}

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-4 md:px-6 pb-4"
        >
          <div className="max-w-lg mx-auto p-4 rounded-xl bg-gradient-to-br from-amber-900/20 to-purple-900/20 border border-amber-200/10">
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
              <p className="font-body text-amber-100/70 italic text-base">
                {chapter.quote}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Memory box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="px-4 md:px-6 pb-4"
        >
          <div className="max-w-lg mx-auto p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-300/10">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-rose-300" fill="currentColor" />
              <span className="font-display text-base text-amber-100">Memória Eterna</span>
            </div>
            <p className="font-body text-amber-100/70 leading-relaxed text-sm">
              {chapter.memory}
            </p>
          </div>
        </motion.div>

        {/* Spotify Player */}
        {chapter.spotifyEmbedUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="px-4 md:px-6 pb-4"
          >
            <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-1">
                <Music className="w-4 h-4 text-amber-300" />
                <span className="font-display text-base text-amber-100">Trilha Sonora</span>
              </div>
              <p className="text-xs text-amber-200/60 mb-2 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Dê play para ouvir nossa música
              </p>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src={spotifyAutoplayUrl || ''}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="p-4 pb-10 md:pb-4 border-t border-amber-200/10 bg-black/20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full max-w-xs mx-auto py-3 rounded-xl font-body font-semibold flex items-center justify-center gap-2 transition-all text-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(147,112,219,0.3) 100%)',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#fef3c7',
            }}
          >
            <Moon className="w-4 h-4" />
            Guardar Esta Memória
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecretChapterDetail;
