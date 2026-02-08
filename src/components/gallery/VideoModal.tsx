import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface VideoModalProps {
  title: string;
  videoUrl: string;
  date: string;
  mood: string;
  onClose: () => void;
}

const VideoModal = ({ title, videoUrl, date, mood, onClose }: VideoModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-lg bg-gradient-card rounded-2xl overflow-hidden shadow-elegant border border-wine/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex items-center justify-between border-b border-wine/10">
          <h3 className="font-display text-lg text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center hover:bg-wine/20 transition-colors"
          >
            <X className="w-4 h-4 text-wine" />
          </button>
        </div>
        <div className="p-4">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full rounded-xl"
            playsInline
            preload="metadata"
          />
          <div className="mt-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-wine" fill="currentColor" />
            <span className="text-sm text-muted-foreground font-body">
              {date} • {mood}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoModal;
