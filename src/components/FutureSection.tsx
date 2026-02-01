import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Infinity } from 'lucide-react';

const FutureSection = () => {
  const dreams = [
    { icon: '🏠', title: 'Nossa casinha', description: 'Um lar cheio de amor' },
    { icon: '✈️', title: 'Viajar o mundo', description: 'Juntos em cada aventura' },
    { icon: '👶', title: 'Nossa família', description: 'Crescer juntos com amor' },
    { icon: '🌅', title: 'Envelhecer juntos', description: 'De mãos dadas, sempre' },
  ];

  return (
    <div className="min-h-screen pb-24 pt-8 px-4 bg-gradient-soft">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Sparkles className="w-10 h-10 text-gold mx-auto mb-2" />
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
          Nosso Futuro
        </h1>
        <p className="text-muted-foreground">
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
            whileHover={{ scale: 1.02 }}
            className="bg-card p-5 rounded-xl shadow-soft flex items-center gap-4"
          >
            <div className="text-4xl">{dream.icon}</div>
            <div className="flex-1">
              <h3 className="font-display text-lg text-foreground">
                {dream.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dream.description}
              </p>
            </div>
            <Star className="w-5 h-5 text-gold" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-romantic rounded-2xl shadow-romantic">
          <Heart className="w-6 h-6 text-primary-foreground" fill="currentColor" />
          <span className="font-display text-lg text-primary-foreground">
            Para sempre, eu e você
          </span>
          <Infinity className="w-6 h-6 text-primary-foreground" />
        </div>
      </motion.div>
    </div>
  );
};

export default FutureSection;
