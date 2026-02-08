import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Crown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import tributePhoto from '@/assets/tribute-photo.jpeg';

const futureItems = [
  'Um abraço que dure mais do que a pressa',
  'Uma conversa difícil que termine em carinho',
  'Um dia péssimo que fique suportável só porque estamos juntos',
  'Uma vitória sua que eu vou comemorar mais do que você',
  'Um silêncio confortável, sem precisar explicar nada',
  'Uma fase confusa que a gente vai atravessar de mãos dadas',
  'Uma risada fora de hora que vire memória',
  'Um momento em que o mundo pesa, e eu viro casa',
  'Um sonho seu que eu vou apoiar, mesmo com medo',
  'Um medo seu que você vai confiar em mim',
  'Uma noite simples que vai virar inesquecível',
  'Uma escolha diária de continuar, mesmo quando for difícil',
  'Um "a gente conseguiu" depois de quase desistir',
  'Uma versão nossa mais madura, mais calma e mais forte',
  'Um futuro que não precisa ser perfeito, só verdadeiro',
  'Um dia comum que vai ser especial só porque é com você',
  'Uma promessa silenciosa cumprida sem ninguém ver',
  'Um amor que cresce sem perder a doçura',
  'Um olhar que ainda vai dizer "é você"',
  'Um sempre que faça sentido, enquanto durar',
];

const FutureSection = () => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div
      className="min-h-screen pt-6 px-4 bg-gradient-elegant overflow-hidden"
      style={{ paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Tribute Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto mb-10"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-wine/15">
          <div className="relative aspect-[3/4] max-h-[70vh]">
            <img
              src={tributePhoto}
              alt="A mulher mais linda do Brasil"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute top-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-gold/20 backdrop-blur-sm rounded-full p-3 border border-gold/30">
                <Crown className="w-6 h-6 text-gold" />
              </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
                  <Sparkles className="w-4 h-4 text-gold" />
                  <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-white leading-snug mb-2 drop-shadow-lg">
                  Um tributo à mulher mais linda do Brasil
                </h2>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
                  <Heart className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                  <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-wine" />
          <Sparkles className="w-6 h-6 text-gold" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-wine" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-body text-sm md:text-base text-muted-foreground italic mb-5 max-w-xs mx-auto leading-relaxed"
        >
          "O futuro não é uma promessa. É uma escolha diária."
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-3xl md:text-4xl text-foreground mb-3"
        >
          Coisas que ainda vamos viver
        </motion.h1>

        {/* Subtle counter */}
        <AnimatePresence>
          {checkedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-wine/10 rounded-full border border-wine/20"
            >
              <Heart className="w-3.5 h-3.5 text-wine" fill="currentColor" />
              <span className="text-xs text-wine font-body font-medium">
                {checkedCount} {checkedCount === 1 ? 'momento escolhido' : 'momentos escolhidos'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Checklist */}
      <div className="max-w-md mx-auto space-y-2.5">
        {futureItems.map((item, index) => {
          const isChecked = !!checked[index];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.04, duration: 0.3 }}
              onClick={() => toggleItem(index)}
              className={`flex items-start gap-3.5 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 border active:scale-[0.98] ${
                isChecked
                  ? 'bg-wine/10 border-wine/30 shadow-wine'
                  : 'bg-gradient-card border-wine/10 hover:border-wine/20 shadow-elegant'
              }`}
            >
              <div className="pt-0.5 flex-shrink-0">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleItem(index)}
                  className="border-wine/40 data-[state=checked]:bg-wine data-[state=checked]:border-wine h-5 w-5"
                />
              </div>

              <span
                className={`font-body text-sm leading-relaxed transition-all duration-300 flex-1 ${
                  isChecked
                    ? 'text-wine font-medium'
                    : 'text-foreground/80'
                }`}
              >
                {item}
              </span>

              <AnimatePresence>
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 45 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <Heart className="w-4 h-4 text-wine" fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-wine/30" />
          <Star className="w-3.5 h-3.5 text-gold/50" fill="currentColor" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-wine/30" />
        </div>
        <p className="font-body text-xs text-muted-foreground/60 italic">
          Não é uma lista para terminar. É uma promessa para continuar.
        </p>
      </motion.div>
    </div>
  );
};

export default FutureSection;
