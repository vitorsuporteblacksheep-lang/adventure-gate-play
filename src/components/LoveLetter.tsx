import { motion } from 'framer-motion';
import { Heart, Feather, Sparkles } from 'lucide-react';

const LoveLetter = () => {
  return (
    <div className="min-h-screen pb-28 pt-6 px-4 bg-gradient-elegant">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-wine" />
          <Feather className="w-6 h-6 text-wine" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-wine" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Uma Carta pra Você
        </h1>
        <p className="text-muted-foreground font-body text-sm">
          Com todo o meu amor
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        className="max-w-lg mx-auto"
      >
        {/* Letter envelope opening effect */}
        <div className="relative">
          {/* Decorative top flourish */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-gold animate-sparkle" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <Heart className="w-5 h-5 text-wine animate-heart-beat" fill="currentColor" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <Sparkles className="w-4 h-4 text-gold animate-sparkle" style={{ animationDelay: '1s' }} />
          </div>

          {/* Letter body */}
          <div
            className="relative bg-gradient-card rounded-2xl border border-wine/15 shadow-elegant overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(145deg, hsl(345 20% 99%) 0%, hsl(40 40% 97%) 50%, hsl(345 20% 99%) 100%)
              `,
            }}
          >
            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Gold line at top */}
            <div className="h-1 bg-gradient-gold" />

            <div className="relative px-6 py-8 md:px-10 md:py-10">
              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-display text-2xl md:text-3xl text-wine mb-8 text-center italic"
              >
                Parabéns, meu amor.
              </motion.p>

              {/* Letter paragraphs */}
              <div className="space-y-6 font-body text-foreground/85 text-[15px] md:text-base leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Que a vida te abrace nesse novo ciclo que começa hoje. Eu sei que ele vem carregado de responsabilidades, questões familiares, desafios acadêmicos e momentos que cansam mas também vem cheio de possibilidades. E eu desejo, do fundo do coração, que você nunca perca quem você é no meio disso tudo.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  Que você continue sendo essa luz rara, que ilumina sem perceber, que acolhe, que transforma. Você é especial de um jeito que não se explica, só se sente.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  E quando pesar, lembra de mim. Lembra que eu tô aqui. Do seu lado pra te ouvir, te proteger, te apoiar e caminhar com você. Como amigo, confidente, companheiro e namorado. Sempre.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="italic text-muted-foreground text-center"
                >
                  Que seja bom enquanto durar e que dure enquanto for verdadeiro.
                </motion.p>
              </div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
                className="mt-10 flex flex-col items-end gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl md:text-2xl text-wine italic">
                    Minha gata
                  </span>
                  <Heart className="w-5 h-5 text-wine" fill="currentColor" />
                </div>
                <div className="h-px w-24 bg-gradient-to-r from-wine/30 to-transparent" />
              </motion.div>
            </div>

            {/* Gold line at bottom */}
            <div className="h-1 bg-gradient-gold" />
          </div>

          {/* Decorative bottom flourish */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-wine/30" />
            <Heart className="w-3 h-3 text-wine/40" fill="currentColor" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-wine/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoveLetter;
