import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Infinity } from 'lucide-react';

const FutureSection = () => {
  const dreams = [
    { icon: '🏠', title: 'Nossa casinha', description: 'Um lar cheio de amor e paz' },
    { icon: '✈️', title: 'Viajar o mundo', description: 'Juntos em cada aventura' },
    { icon: '👶', title: 'Nossa família', description: 'Crescer juntos com amor' },
    { icon: '🌅', title: 'Envelhecer juntos', description: 'De mãos dadas, sempre' },
  ];

  return (
    <div className="min-h-screen pb-28 pt-6 px-4 bg-gradient-elegant">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-wine" />
          <Sparkles className="w-6 h-6 text-gold" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-wine" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Nosso Futuro
        </h1>
        <p className="text-muted-foreground font-body">
          Sonhos que vamos realizar juntos
        </p>
      </motion.div>

      <div className="max-w-md mx-auto space-y-4">
        {dreams.map((dream, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="bg-gradient-card p-5 rounded-2xl shadow-elegant flex items-center gap-4 border border-wine/10 hover:border-wine/30 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-wine flex items-center justify-center text-3xl shadow-wine">
              {dream.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl text-foreground">
                {dream.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                {dream.description}
              </p>
            </div>
            <Star className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-wine rounded-2xl shadow-wine">
          <Heart className="w-7 h-7 text-primary-foreground" fill="currentColor" />
          <span className="font-display text-xl text-primary-foreground">
            Para sempre, eu e você
          </span>
          <Infinity className="w-7 h-7 text-primary-foreground" />
        </div>
      </motion.div>
    </div>
  );
};

export default FutureSection;
