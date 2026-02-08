import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Sparkles, ImageIcon, Play, X, MessageCircle } from 'lucide-react';

interface GalleryProps {
  interactions: number;
  onInteraction: () => void;
}

interface ChatMessage {
  sender: 'me' | 'her';
  text: string;
  time: string;
  isAudio?: boolean;
  audioDuration?: string;
  isReply?: boolean;
  replyTo?: string;
}

interface GalleryItem {
  id: number;
  emoji: string;
  title: string;
  date: string;
  mood: string;
  videoUrl?: string;
  imageUrl?: string;
  chatMessages?: ChatMessage[];
}

const memories: GalleryItem[] = [
  { id: 1, emoji: '💑', title: 'Primeira vez que saímos juntos de "casal"', date: 'Setembro 2022', mood: 'Amor', videoUrl: '/gallery/primeira-saida-casal.mp4' },
  { id: 9, emoji: '🏠', title: 'Primeira vez que você visitou o meu quarto', date: '2022', mood: 'Intimidade', videoUrl: '/gallery/primeira-visita-quarto.mp4' },
  { id: 10, emoji: '📱', title: 'Primeiro vídeo que postei de nós', date: '2022', mood: 'Orgulho', videoUrl: '/gallery/primeiro-video-nos.mp4' },
  { 
    id: 2, 
    emoji: '🪄', 
    title: 'Saudade das nossas conversas até tarde minha bruxinha 🪄❤️', 
    date: '03:34 da madrugada', 
    mood: 'Saudade',
    chatMessages: [
      { sender: 'me', text: 'todas as vezes que você passar por lá vai lembrar', time: '03:32' },
      { sender: 'me', text: 'anota aí', time: '03:32' },
      { sender: 'her', text: '🎵 Áudio 0:26', time: '03:33', isAudio: true, audioDuration: '0:26' },
      { sender: 'her', text: 'aaaaa, eu amo isso', time: '03:33' },
      { sender: 'her', text: 'vai ser é ao contrário', time: '03:33' },
      { sender: 'her', text: 'da minha parte nem precisa anotar', time: '03:33', isReply: true, replyTo: 'anota aí' },
      { sender: 'me', text: 'porque você é quem vai', time: '03:33' },
      { sender: 'me', text: 'mas não tem como eu esquecer', time: '03:33' },
      { sender: 'me', text: 'foi muito especial', time: '03:33' },
      { sender: 'me', text: 'olha aqui', time: '03:34' },
    ]
  },
  { id: 11, emoji: '❤️‍🔥', title: 'Dia da mulher de vermelho', date: '2023', mood: 'Paixão', imageUrl: '/gallery/mulher-de-vermelho.jpeg' },
  { id: 12, emoji: '🏡', title: 'Primeira vez que fui na casa do seu pai', date: '2022', mood: 'Família', imageUrl: '/gallery/casa-do-pai.jpeg' },
  { id: 13, emoji: '🍕', title: 'Primeira vez que fomos no Madre', date: 'Novembro 2022', mood: 'Diversão', imageUrl: '/gallery/primeiro-madre.jpeg' },
  { id: 14, emoji: '🎆', title: 'Primeiro ano novo que passamos juntos', date: 'Dezembro 2022', mood: 'Celebração', imageUrl: '/gallery/primeiro-ano-novo.jpeg' },
  { id: 15, emoji: '🏖️', title: 'Primeira foto na praia juntos', date: '2023', mood: 'Alegria', imageUrl: '/gallery/primeira-praia.jpeg' },
  { id: 16, emoji: '🌹', title: 'Nosso primeiro date na praia', date: '2023', mood: 'Romance', imageUrl: '/gallery/primeiro-date-praia.jpeg' },
  { id: 17, emoji: '🐟', title: 'Primeira vez no pesque pague', date: '2023', mood: 'Aventura', imageUrl: '/gallery/pesque-pague.jpeg' },
  { id: 18, emoji: '🏠', title: 'Primeira vez que ficamos em um Airbnb', date: 'Outubro 2024', mood: 'Intimidade', imageUrl: '/gallery/primeiro-airbnb.jpeg' },
  { id: 3, emoji: '📸', title: 'Nosso primeiro selfie juntos', date: 'Janeiro 2023', mood: 'Felicidade' },
  { id: 4, emoji: '🌅', title: 'Pôr do sol na praia', date: 'Março 2023', mood: 'Paz' },
  { id: 5, emoji: '🎂', title: 'Seu aniversário especial', date: 'Maio 2023', mood: 'Celebração' },
  { id: 6, emoji: '🎄', title: 'Nosso primeiro Natal', date: 'Dezembro 2023', mood: 'Magia' },
  { id: 7, emoji: '✈️', title: 'Nossa viagem dos sonhos', date: 'Junho 2023', mood: 'Aventura' },
  { id: 8, emoji: '🌹', title: 'Dia dos Namorados', date: 'Junho 2023', mood: 'Romance' },
];

const Gallery = ({ interactions, onInteraction }: GalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  const [selectedChat, setSelectedChat] = useState<GalleryItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const handleCardClick = (memory: GalleryItem) => {
    onInteraction();
    if (memory.videoUrl) {
      setSelectedVideo(memory);
    } else if (memory.chatMessages) {
      setSelectedChat(memory);
    } else if (memory.imageUrl) {
      setSelectedImage(memory);
    }
  };

  return (
    <div className="min-h-screen pb-28 pt-6 px-4 bg-gradient-elegant">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-wine" />
          <Camera className="w-6 h-6 text-wine" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-wine" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Nossa Galeria
        </h1>
        <p className="text-muted-foreground font-body">
          Momentos eternizados no coração
        </p>
      </motion.div>

      <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => handleCardClick(memory)}
            className="bg-gradient-card rounded-2xl p-5 shadow-elegant cursor-pointer border border-wine/10 hover:border-wine/30 transition-all group relative"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{memory.emoji}</div>
              <div className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine/20 transition-colors">
                {memory.videoUrl ? (
                  <Play className="w-4 h-4 text-wine" />
                ) : memory.chatMessages ? (
                  <MessageCircle className="w-4 h-4 text-wine" />
                ) : memory.imageUrl ? (
                  <Camera className="w-4 h-4 text-wine" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-wine" />
                )}
              </div>
            </div>
            <h3 className="font-display text-base text-foreground mb-1 leading-tight">
              {memory.title}
            </h3>
            <p className="text-xs text-muted-foreground font-body mb-2">{memory.date}</p>
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-wine" fill="currentColor" />
              <span className="text-xs text-wine font-body font-medium">{memory.mood}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-card rounded-full shadow-elegant border border-wine/10">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm text-foreground font-body font-medium">
            {interactions} momentos de amor
          </span>
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-lg bg-gradient-card rounded-2xl overflow-hidden shadow-elegant border border-wine/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center justify-between border-b border-wine/10">
                <h3 className="font-display text-lg text-foreground">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center hover:bg-wine/20 transition-colors"
                >
                  <X className="w-4 h-4 text-wine" />
                </button>
              </div>
              <div className="p-4">
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full rounded-xl"
                  playsInline
                />
                <div className="mt-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-wine" fill="currentColor" />
                  <span className="text-sm text-muted-foreground font-body">
                    {selectedVideo.date} • {selectedVideo.mood}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {selectedChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedChat(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-sm bg-[#0b141a] rounded-2xl overflow-hidden shadow-elegant border border-wine/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* WhatsApp-style header */}
              <div className="px-4 py-3 flex items-center justify-between bg-[#1f2c34] border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-wine/30 flex items-center justify-center text-lg">
                    🪄
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-white/90">Bruxinha ❤️ ✨</h3>
                    <p className="text-[10px] text-white/40 font-body">online</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedChat(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1.5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23ffffff08\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'%2309141a\' width=\'200\' height=\'200\'/%3E%3Crect fill=\'url(%23p)\' width=\'200\' height=\'200\'/%3E%3C/svg%3E")' }}>
                {selectedChat.chatMessages?.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-1.5 rounded-lg text-sm font-body relative ${
                        msg.sender === 'me'
                          ? 'bg-[#005c4b] text-white/90'
                          : 'bg-[#1f2c34] text-white/90'
                      }`}
                    >
                      {msg.isReply && msg.replyTo && (
                        <div className="mb-1 px-2 py-1 bg-black/20 rounded border-l-2 border-green-400/60">
                          <span className="text-[10px] text-green-400/70 font-medium">Você</span>
                          <p className="text-[11px] text-white/50">{msg.replyTo}</p>
                        </div>
                      )}
                      {msg.isAudio ? (
                        <div className="flex items-center gap-2 py-1">
                          <div className="w-8 h-8 rounded-full bg-wine/40 flex items-center justify-center">
                            <Play className="w-3 h-3 text-white/80 ml-0.5" />
                          </div>
                          <div className="flex-1">
                            <div className="h-1 bg-white/20 rounded-full w-20">
                              <div className="h-1 bg-white/50 rounded-full w-12" />
                            </div>
                            <span className="text-[10px] text-white/40 mt-0.5">{msg.audioDuration}</span>
                          </div>
                        </div>
                      ) : (
                        <span>{msg.text}</span>
                      )}
                      <span className="text-[10px] text-white/30 ml-2 float-right mt-1">
                        {msg.time} {msg.sender === 'me' && '✓✓'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-[#1f2c34] border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-wine" fill="currentColor" />
                  <span className="text-xs text-white/40 font-body">
                    {selectedChat.date} • {selectedChat.mood}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-lg bg-gradient-card rounded-2xl overflow-hidden shadow-elegant border border-wine/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center justify-between border-b border-wine/10">
                <h3 className="font-display text-lg text-foreground">{selectedImage.title}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center hover:bg-wine/20 transition-colors"
                >
                  <X className="w-4 h-4 text-wine" />
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full rounded-xl object-contain max-h-[70vh]"
                />
                <div className="mt-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-wine" fill="currentColor" />
                  <span className="text-sm text-muted-foreground font-body">
                    {selectedImage.date} • {selectedImage.mood}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
