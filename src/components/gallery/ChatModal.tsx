import { motion } from 'framer-motion';
import { Heart, Play, X } from 'lucide-react';

interface ChatMessage {
  sender: 'me' | 'her';
  text: string;
  time: string;
  isAudio?: boolean;
  audioDuration?: string;
  isReply?: boolean;
  replyTo?: string;
}

interface ChatModalProps {
  title: string;
  date: string;
  mood: string;
  messages: ChatMessage[];
  onClose: () => void;
}

const ChatModal = ({ title, date, mood, messages, onClose }: ChatModalProps) => {
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
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Chat messages */}
        <div
          className="p-3 max-h-[60vh] overflow-y-auto space-y-1.5"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23ffffff08\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'%2309141a\' width=\'200\' height=\'200\'/%3E%3Crect fill=\'url(%23p)\' width=\'200\' height=\'200\'/%3E%3C/svg%3E")',
          }}
        >
          {messages.map((msg, i) => (
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
              {date} • {mood}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatModal;
