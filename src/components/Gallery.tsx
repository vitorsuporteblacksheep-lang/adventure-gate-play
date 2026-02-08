import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import GalleryCard from '@/components/gallery/GalleryCard';
import ImageModal from '@/components/gallery/ImageModal';
import VideoModal from '@/components/gallery/VideoModal';
import ChatModal from '@/components/gallery/ChatModal';

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
  { id: 19, emoji: '💒', title: 'Primeiro casamento que fomos', date: '2024', mood: 'Celebração', videoUrl: '/gallery/primeiro-casamento.mp4' },
  { id: 20, emoji: '💋', title: 'Voltando ao lugar que nos beijamos pela primeira vez depois de 1 ano', date: '2023', mood: 'Nostalgia', imageUrl: '/gallery/lugar-primeiro-beijo.jpeg' },
  { id: 21, emoji: '🌿', title: 'Nossa primeira trilha juntos', date: '2023', mood: 'Aventura', imageUrl: '/gallery/primeira-trilha.jpeg' },
  { id: 22, emoji: '🎭', title: '+1 carnaval juntos', date: '2025', mood: 'Festa', imageUrl: '/gallery/carnaval-juntos.jpeg' },
  { id: 23, emoji: '🎶', title: 'Primeiro Show do Lagum juntos', date: '2025', mood: 'Emoção', imageUrl: '/gallery/primeiro-show-lagum.jpeg' },
  { id: 24, emoji: '🎉', title: '+1 Festa junina juntos', date: '2025', mood: 'Tradição', videoUrl: '/gallery/festa-junina-juntos.mp4' },
  { id: 25, emoji: '👨‍👩‍👧', title: '+1 Festa de família juntos', date: 'Agosto 2024', mood: 'Família', imageUrl: '/gallery/festa-familia-juntos.jpeg' },
  { id: 26, emoji: '🥂', title: 'Mais um ano novo com você, meu amor', date: 'Dezembro 2025', mood: 'Amor', imageUrl: '/gallery/mais-um-ano-novo.jpeg' },
  { id: 27, emoji: '🚤', title: 'Nosso primeiro rolê de lancha', date: '2025', mood: 'Aventura', imageUrl: '/gallery/primeiro-role-lancha.jpeg' },
  { id: 28, emoji: '🌅', title: '+1 pôr do sol com você', date: '2025', mood: 'Paz', imageUrl: '/gallery/por-do-sol-com-voce.jpeg' },
  { id: 29, emoji: '🍛', title: 'Primeira vez comendo comida Africana na chuva', date: '2025', mood: 'Diversão', imageUrl: '/gallery/comida-africana-chuva.jpeg' },
  { id: 30, emoji: '♨️', title: 'Primeira vez em Caldas Novas', date: '2025', mood: 'Aventura', imageUrl: '/gallery/caldas-novas.jpeg' },
  { id: 31, emoji: '🚲', title: 'Primeira vez pedalando juntos', date: '2025', mood: 'Diversão', imageUrl: '/gallery/pedalando-juntos.jpeg' },
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
    <div
      className="min-h-screen pt-6 px-4 bg-gradient-elegant"
      style={{ paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}
    >
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
          <GalleryCard
            key={memory.id}
            memory={memory}
            index={index}
            onClick={() => handleCardClick(memory)}
          />
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

      {/* Modals */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            title={selectedVideo.title}
            videoUrl={selectedVideo.videoUrl!}
            date={selectedVideo.date}
            mood={selectedVideo.mood}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedChat && selectedChat.chatMessages && (
          <ChatModal
            title={selectedChat.title}
            date={selectedChat.date}
            mood={selectedChat.mood}
            messages={selectedChat.chatMessages}
            onClose={() => setSelectedChat(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && selectedImage.imageUrl && (
          <ImageModal
            title={selectedImage.title}
            imageUrl={selectedImage.imageUrl}
            date={selectedImage.date}
            mood={selectedImage.mood}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
