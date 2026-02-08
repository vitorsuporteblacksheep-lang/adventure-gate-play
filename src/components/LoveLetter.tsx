import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Feather, Sparkles, Music } from 'lucide-react';

const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/track/2KN4k9v9b2JT7mMFrmpQm6?utm_source=generator';

// Floating heart particle component
const FloatingHeart = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, x, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [0, -60, -120, -180],
      x: [x, x + Math.random() * 40 - 20, x + Math.random() * 60 - 30],
      scale: [0, 1, 0.8, 0.3],
      rotate: [0, Math.random() * 30 - 15],
    }}
    transition={{ duration: 3, delay, ease: 'easeOut' }}
    className="absolute bottom-0 left-1/2 pointer-events-none"
  >
    <Heart className="w-4 h-4 text-wine/60" fill="currentColor" />
  </motion.div>
);

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleOpenEnvelope = useCallback(() => {
    setIsOpen(true);
    setShowParticles(true);
    setTimeout(() => setShowLetter(true), 1200);
    setTimeout(() => setShowParticles(false), 3000);
  }, []);

  return (
    <div
      className="min-h-screen pt-6 px-4 bg-gradient-elegant overflow-hidden"
      style={{ paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Header */}
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

      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!showLetter ? (
            /* ===== ENVELOPE ===== */
            <motion.div
              key="envelope"
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="relative cursor-pointer group"
                onClick={!isOpen ? handleOpenEnvelope : undefined}
                style={{ perspective: '800px' }}
              >
                {/* Glow effect behind envelope */}
                <motion.div
                  animate={!isOpen ? {
                    boxShadow: [
                      '0 0 30px hsl(345 45% 25% / 0.15)',
                      '0 0 60px hsl(345 45% 25% / 0.3)',
                      '0 0 30px hsl(345 45% 25% / 0.15)',
                    ],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl"
                />

                {/* Envelope body */}
                <div className="relative w-72 h-48 md:w-80 md:h-52">
                  {/* Back of envelope */}
                  <div className="absolute inset-0 bg-gradient-to-b from-champagne to-cream rounded-2xl border border-wine/20 shadow-elegant overflow-hidden">
                    {/* Inner pattern */}
                    <div className="absolute inset-2 rounded-xl border border-wine/5"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 10px,
                          hsl(345 45% 25% / 0.02) 10px,
                          hsl(345 45% 25% / 0.02) 20px
                        )`,
                      }}
                    />
                  </div>

                  {/* Envelope flap (triangle) */}
                  <motion.div
                    animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                    className="absolute -top-0 left-0 right-0 z-10"
                  >
                    <svg viewBox="0 0 320 100" className="w-full drop-shadow-sm">
                      <path
                        d="M 0 0 L 160 90 L 320 0 Z"
                        fill="hsl(40 45% 88%)"
                        stroke="hsl(345 45% 25% / 0.15)"
                        strokeWidth="1"
                      />
                      <path
                        d="M 10 5 L 160 80 L 310 5"
                        fill="none"
                        stroke="hsl(345 45% 25% / 0.05)"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.div>

                  {/* Bottom triangles (decorative envelope folds) */}
                  <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 0 200 L 160 100 L 0 0"
                      fill="hsl(40 45% 90% / 0.5)"
                      stroke="hsl(345 45% 25% / 0.05)"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M 320 200 L 160 100 L 320 0"
                      fill="hsl(40 45% 89% / 0.5)"
                      stroke="hsl(345 45% 25% / 0.05)"
                      strokeWidth="0.5"
                    />
                  </svg>

                  {/* Wax seal */}
                  <motion.div
                    animate={isOpen
                      ? { scale: 0, opacity: 0, rotate: 180 }
                      : { scale: [1, 1.05, 1], rotate: 0 }
                    }
                    transition={isOpen
                      ? { duration: 0.5, delay: 0.2 }
                      : { duration: 2, repeat: Infinity }
                    }
                    className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-20"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-wine shadow-wine flex items-center justify-center border-2 border-wine-dark/30">
                      <Heart className="w-7 h-7 text-primary-foreground" fill="currentColor" />
                    </div>
                  </motion.div>

                  {/* Letter peeking out when opening */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: -60 }}
                        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                        className="absolute top-4 left-4 right-4 z-5"
                      >
                        <div className="h-32 bg-card rounded-t-lg border border-wine/10 shadow-sm px-4 pt-4">
                          <div className="h-2 w-20 bg-wine/15 rounded-full mb-2" />
                          <div className="h-2 w-32 bg-wine/10 rounded-full mb-2" />
                          <div className="h-2 w-24 bg-wine/10 rounded-full" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Floating heart particles */}
                {showParticles && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <FloatingHeart
                        key={i}
                        delay={0.3 + i * 0.15}
                        x={Math.random() * 200 - 100}
                      />
                    ))}
                  </div>
                )}

                {/* Call to action */}
                {!isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center mt-6 text-wine/70 font-body text-sm"
                  >
                    Toque para abrir ✉️
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          ) : (
            /* ===== LETTER CONTENT ===== */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Decorative top flourish */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <Sparkles className="w-4 h-4 text-gold animate-sparkle" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <Heart className="w-5 h-5 text-wine animate-heart-beat" fill="currentColor" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <Sparkles className="w-4 h-4 text-gold animate-sparkle" style={{ animationDelay: '1s' }} />
              </motion.div>

              {/* Letter body */}
              <div
                className="relative bg-gradient-card rounded-2xl border border-wine/15 shadow-elegant overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(145deg, hsl(345 20% 99%) 0%, hsl(40 40% 97%) 50%, hsl(345 20% 99%) 100%)`,
                }}
              >
                {/* Paper texture */}
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-display text-2xl md:text-3xl text-wine mb-8 text-center italic"
                  >
                    Parabéns, meu amor.
                  </motion.p>

                  {/* Letter paragraphs */}
                  <div className="space-y-6 font-body text-foreground/85 text-[15px] md:text-base leading-relaxed">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
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
                      transition={{ delay: 1.3 }}
                    >
                      E quando pesar, lembra de mim. Lembra que eu tô aqui. Do seu lado pra te ouvir, te proteger, te apoiar e caminhar com você. Como amigo, confidente, companheiro e namorado. Sempre.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                      className="italic text-muted-foreground text-center"
                    >
                      Que seja bom enquanto durar e que dure enquanto for verdadeiro.
                    </motion.p>
                  </div>

                  {/* Signature */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.9 }}
                    className="mt-10 flex flex-col items-end gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl md:text-2xl text-wine italic">
                        Te amo minha gata ❤️
                      </span>
                      <Heart className="w-5 h-5 text-wine" fill="currentColor" />
                    </div>
                    <div className="h-px w-24 bg-gradient-to-r from-wine/30 to-transparent" />
                  </motion.div>
                </div>

                {/* Gold line at bottom */}
                <div className="h-1 bg-gradient-gold" />
              </div>

              {/* Spotify Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="mt-6"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Music className="w-4 h-4 text-wine/60" />
                  <p className="text-xs text-muted-foreground font-body">
                    Dê play para ouvir nossa música
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden shadow-elegant border border-wine/10">
                  <iframe
                    src={SPOTIFY_EMBED_URL}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                  />
                </div>
              </motion.div>

              {/* Decorative bottom flourish */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                className="flex items-center justify-center gap-2 mt-4"
              >
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-wine/30" />
                <Heart className="w-3 h-3 text-wine/40" fill="currentColor" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-wine/30" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveLetter;
