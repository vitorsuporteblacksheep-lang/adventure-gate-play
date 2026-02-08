import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

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

  return (
    <div className="min-h-screen pb-28 pt-6 px-4 bg-gradient-elegant">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
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
          className="font-body text-sm md:text-base text-muted-foreground italic mb-6 max-w-xs mx-auto leading-relaxed"
        >
          "O futuro não é uma promessa. É uma escolha diária."
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-3xl md:text-4xl text-foreground"
        >
          Coisas que ainda vamos viver
        </motion.h1>
      </motion.div>

      {/* Checklist */}
      <div className="max-w-md mx-auto space-y-3">
        {futureItems.map((item, index) => {
          const isChecked = !!checked[index];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.06 }}
              onClick={() => toggleItem(index)}
              className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
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
                className={`font-body text-sm md:text-base leading-relaxed transition-all duration-300 ${
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
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="ml-auto flex-shrink-0"
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
        transition={{ delay: 1.8 }}
        className="mt-12 text-center"
      >
        <p className="font-body text-xs text-muted-foreground/60 italic">
          Não é uma lista para terminar. É uma promessa para continuar.
        </p>
      </motion.div>
    </div>
  );
};

export default FutureSection;
