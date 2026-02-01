import { motion } from 'framer-motion';
import { X, Heart, Calendar, Quote } from 'lucide-react';
import { ChapterData } from '@/lib/gameState';

interface ChapterDetailProps {
  chapter: ChapterData;
  onClose: () => void;
}

const ChapterDetail = ({ chapter, onClose }: ChapterDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl p-6 max-w-md w-full shadow-romantic max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Heart className="w-10 h-10 text-rose" fill="currentColor" />
          </motion.div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 text-rose mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{chapter.date}</span>
          </div>

          <h2 className="font-display text-2xl text-foreground mb-3">
            {chapter.title}
          </h2>

          <p className="text-muted-foreground mb-6">
            {chapter.description}
          </p>

          <div className="bg-gradient-soft rounded-xl p-4 border border-rose/10">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
              <p className="font-body text-foreground italic">
                "{chapter.memory}"
              </p>
            </div>
          </div>

          {chapter.image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 rounded-xl overflow-hidden"
            >
              <img
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-48 object-cover"
              />
            </motion.div>
          )}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gradient-romantic text-primary-foreground rounded-xl font-medium shadow-romantic"
        >
          Fechar Memória
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ChapterDetail;
