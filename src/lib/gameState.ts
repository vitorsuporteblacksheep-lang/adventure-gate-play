export interface ChapterData {
  id: string;
  title: string;
  date: string;
  description: string;
  memory: string;
  quote: string;
  icon: string;
  image?: string;
  videoUrl?: string;
  unlocked: boolean;
  gameCompleted: boolean;
  gameType: 'quiz' | 'memory' | 'puzzle' | 'sequence' | 'matching' | 'heart-catch' | 'heartbeat';
  musicUrl?: string;
  spotifyEmbedUrl?: string;
  isFinalChapter?: boolean;
  isSecret?: boolean;
}

export interface GameState {
  visitCount: number;
  totalInteractions: number;
  storyUnlocked: boolean;
  chapters: ChapterData[];
  quizProgress: {
    correctAnswers: number;
    totalAnswered: number;
    unlockedContent: string[];
  };
  sectionUnlocks: {
    timeline: boolean;
    gallery: boolean;
    letter: boolean;
    future: boolean;
  };
  lastVisit: string;
}

const STORAGE_KEY = 'nossa-historia-state';

const defaultChapters: ChapterData[] = [
  {
    id: 'chapter-1',
    title: 'Apenas Bons Amigos',
    date: 'Maio de 2021',
    description: 'Foi nessa época que conheci a Nataly, uma pessoa extraordinária, de coração imenso, sempre disposta a ajudar quem precisa. Ela tem uma empatia rara, daquelas que acolhem sem julgamento. Desde o primeiro momento, soube que tinha ao meu lado alguém com a alma mais bonita que já conheci.',
    memory: 'Uma amizade que floresceu no ensino médio e, sem que percebêssemos, plantou a semente de algo muito maior.',
    quote: '"De uma boa amizade nascerá um grande amor"',
    icon: '🤝',
    image: '/chapters/chapter-1.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'heartbeat',
    musicUrl: 'https://www.youtube.com/watch?v=pMSwHRwbMEo',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/70dJEanFPdYuWZumkrnKeX?utm_source=generator',
  },
  {
    id: 'chapter-2',
    title: 'Primeiro Beijo',
    date: 'Julho de 2022',
    description: 'Naquele dia, o destino resolveu nos surpreender. Um beijo que nenhum de nós esperava acabou sendo o início de tudo. Foi ali, naquele momento inesperado, que começou a nossa história de amor, escrita pelas mãos do universo.',
    memory: 'E nessa mesma noite, dormimos juntos pela primeira vez 💕',
    quote: '"Quem imaginaria que um simples beijo mudaria nossas vidas para sempre?"',
    icon: '💋',
    image: '/chapters/chapter-2.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'memory',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/5fuK5An5rQcx0OVIzsscOK?utm_source=generator',
  },
  {
    id: 'chapter-3',
    title: 'Nosso Primeiro Encontro',
    date: 'Agosto de 2022',
    description: 'Nosso primeiro encontro de verdade. Foi quando começamos a nos descobrir, a conhecer os detalhes um do outro. A cada minuto ao seu lado, crescia em mim a certeza de que queria passar muito mais tempo contigo.',
    memory: 'Naquele dia, eu simplesmente não queria me despedir de você 💕',
    quote: '"O seu perfume ficou marcado em mim"',
    icon: '🌟',
    image: '/chapters/chapter-3.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/2aJm1uVFVtTlbEXSIxcOAs?utm_source=generator',
  },
  {
    id: 'chapter-4',
    title: 'Aprofundando Nosso Amor',
    date: 'Setembro de 2022',
    description: 'Nesse momento, eu já estava completamente entregue a você, Nataly. Passávamos cada vez mais tempo juntos, e ficar uma semana longe já doía demais. Foi quando, sem planejar, escapou o primeiro "Eu te amo", o mais sincero que já disse.',
    memory: 'Foi ali que nasceu o "eu te amo" mais espontâneo e verdadeiro 💕',
    quote: '"Eu te amo"',
    icon: '💑',
    image: '/chapters/chapter-4.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/6ccKu0LwJzOhLAxBwP2PTk?utm_source=generator',
  },
  {
    id: 'chapter-5',
    title: 'Nossa Primeira Saída Como Casal',
    date: 'Setembro de 2022',
    description: 'Um dia repleto de começos: fui à sua casa pela primeira vez, conheci sua mãe, saímos juntos como um casal de verdade, e você dormiu na minha casa pela primeira vez. Cada "primeira vez" daquele dia ficou gravada no meu coração.',
    memory: 'Um dia de tantas primeiras vezes que jamais vou esquecer 💕',
    quote: '"Saudades das nossas noites no Beco"',
    icon: '🌃',
    image: '/chapters/chapter-5.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/0CmNyrWG37EMIb6d2wspuJ?utm_source=generator',
  },
  {
    id: 'chapter-6',
    title: 'O Pedido de Namoro',
    date: 'Outubro de 2022',
    description: 'Esse foi um dos dias em que mais senti meu coração acelerar. O dia em que finalmente te pedi em namoro, um momento que esperei ansiosamente e que, no fundo, os dois já desejávamos. Nosso primeiro namoro. Obrigado por aceitar ser minha, por ser uma das melhores escolhas da minha vida. Desde então, tenho ao meu lado a pessoa mais especial que eu poderia chamar de namorada.',
    memory: 'Te amo, Nataly. Obrigado por ser minha namorada 💕',
    quote: '"Você estava deslumbrante naquele vestido vermelho"',
    icon: '💍',
    image: '/chapters/chapter-6.jpeg',
    videoUrl: '/chapters/chapter-6.mp4',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/4y93vvzu2h8MITw7YyUTcI?utm_source=generator',
  },
  {
    id: 'chapter-7',
    title: 'Nosso Primeiro Dia dos Namorados Juntos',
    date: 'Junho de 2023',
    description: 'Nosso primeiro Dia dos Namorados juntinhos foi simplesmente mágico. Mesmo depois de eu ter caído em um golpe e perdido 500 reais, nada conseguiu estragar aquele momento. Estar com você transformou tudo em uma celebração perfeita.',
    memory: 'Mesmo com o golpe, cada segundo ao seu lado valeu a pena 💕',
    quote: '"A Taylor Swift me enganou, mas você me conquistou"',
    icon: '💝',
    image: '/chapters/chapter-7.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/6NFyWDv5CjfwuzoCkw47Xf?utm_source=generator',
  },
  {
    id: 'chapter-8',
    title: 'Nossa Primeira Viagem a Sós',
    date: 'Outubro de 2024',
    description: 'Salvador, nossa primeira viagem só nós dois, nosso ninho de amor. Cada momento foi inesquecível: o aconchego do nosso Airbnb, as paisagens de tirar o fôlego, as risadas e os olhares apaixonados. Essa viagem ficará para sempre marcada na minha memória.',
    memory: 'Nosso primeiro ninho de amor, só nosso 💕',
    quote: '"A beleza de Salvador só perde para a sua"',
    icon: '✈️',
    image: '/chapters/chapter-8.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/0hfRYnxJr8tUKBELhkAyXQ?utm_source=generator',
  },
  {
    id: 'chapter-9',
    title: 'Seu Aniversário há 1 Ano',
    date: '+ 1 Ano da minha Nat',
    description: 'Há exatamente um ano, celebrávamos mais um ciclo da sua vida, minha princesa. Essa lembrança guarda nossos momentos mais íntimos, aquelas memórias que são só nossas e que quero que você carregue no coração para sempre, minha sereia.',
    memory: 'Memórias especiais que só nós dois conhecemos 💕',
    quote: '"Esse capítulo é dedicado às lembranças que só nós sabemos"',
    icon: '🎂',
    image: '/chapters/chapter-9.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/75zIfJpcYFYHSBMVlmdiYc?utm_source=generator',
  },
  {
    id: 'chapter-10',
    title: 'Nossa Primeira Fantasia de Carnaval Juntos',
    date: 'Fevereiro de 2025',
    description: 'A lembrança do nosso primeiro Carnaval fantasiados juntos. Foi uma explosão de alegria, cor e amor, com toda a energia que combina com você e com a magia do seu mês de fevereiro.',
    memory: 'Você era a mulher mais deslumbrante de toda a festa 💕',
    quote: '"Você brilhava mais que todos os confetes"',
    icon: '🎭',
    image: '/chapters/chapter-10.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/6xLka4rZhf5O0IWf0qLk4A?utm_source=generator',
  },
  {
    id: 'chapter-11',
    title: 'Nossa Viagem à Cidade Maravilhosa',
    date: 'Outubro de 2025',
    description: 'Essa é uma das lembranças mais preciosas que guardo contigo. Em meio a tanta beleza carioca, eu me perdia admirando você. Fui conhecer uma das sete maravilhas do mundo, mas nada se compara à sua beleza quando acorda ao meu lado pela manhã.',
    memory: 'Te amo, minha Garota de Ipanema 💕',
    quote: '"O Rio é lindo, mas você é a minha verdadeira maravilha"',
    icon: '🌴',
    image: '/chapters/chapter-11.jpeg',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/2vTDA7mOYWtuduCylWfiFd?utm_source=generator',
    isFinalChapter: true,
  },
  {
    id: 'chapter-12',
    title: 'O Amor Que Não Envelhece',
    date: '08/02/2026',
    description: 'Uma surpresa especial, feita com todo o meu amor, exclusivamente para você.',
    memory: 'Um amor eterno, como o crepúsculo que nunca se despede 🌙',
    quote: '"E assim, como a lua e o sol, nosso amor é infinito"',
    icon: '🌙',
    image: '',
    videoUrl: '/chapters/chapter-12.mp4',
    unlocked: false,
    gameCompleted: false,
    gameType: 'quiz',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/6lanRgr6wXibZr8KgzXxBl?utm_source=generator',
    isSecret: true,
  },
];

const defaultState: GameState = {
  visitCount: 0,
  totalInteractions: 0,
  storyUnlocked: false,
  chapters: defaultChapters,
  quizProgress: {
    correctAnswers: 0,
    totalAnswered: 0,
    unlockedContent: [],
  },
  sectionUnlocks: {
    timeline: true,
    gallery: false,
    letter: false,
    future: false,
  },
  lastVisit: new Date().toISOString(),
};

export const loadState = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        visitCount: parsed.visitCount + 1,
        lastVisit: new Date().toISOString(),
      };
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
  return { ...defaultState, visitCount: 1 };
};

export const saveState = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
};

export const recordInteraction = (state: GameState): GameState => {
  const newState = {
    ...state,
    totalInteractions: state.totalInteractions + 1,
  };
  saveState(newState);
  return newState;
};

export const unlockStory = (state: GameState): GameState => {
  const newState = {
    ...state,
    storyUnlocked: true,
    chapters: state.chapters.map((ch, index) => 
      index === 0 ? { ...ch, unlocked: true } : ch
    ),
  };
  saveState(newState);
  return newState;
};

export const completeChapterGame = (state: GameState, chapterId: string): GameState => {
  const chapterIndex = state.chapters.findIndex(ch => ch.id === chapterId);
  if (chapterIndex === -1) return state;

  const newChapters = [...state.chapters];
  newChapters[chapterIndex] = { ...newChapters[chapterIndex], gameCompleted: true };
  
  // Unlock next chapter
  if (chapterIndex + 1 < newChapters.length) {
    newChapters[chapterIndex + 1] = { ...newChapters[chapterIndex + 1], unlocked: true };
  }

  // Check section unlocks - only unlock when ALL chapters are completed
  const totalChapters = newChapters.length;
  const completedCount = newChapters.filter(ch => ch.gameCompleted).length;
  const allCompleted = completedCount === totalChapters;
  const newSectionUnlocks = { ...state.sectionUnlocks };
  
  if (allCompleted) {
    newSectionUnlocks.gallery = true;
    newSectionUnlocks.letter = true;
    newSectionUnlocks.future = true;
  }

  const newState = {
    ...state,
    chapters: newChapters,
    sectionUnlocks: newSectionUnlocks,
    quizProgress: {
      ...state.quizProgress,
      correctAnswers: state.quizProgress.correctAnswers + 1,
    },
  };
  saveState(newState);
  return newState;
};

export const recordQuizAnswer = (
  state: GameState,
  isCorrect: boolean,
  unlockedContent?: string
): GameState => {
  const newState = {
    ...state,
    quizProgress: {
      ...state.quizProgress,
      totalAnswered: state.quizProgress.totalAnswered + 1,
      correctAnswers: isCorrect
        ? state.quizProgress.correctAnswers + 1
        : state.quizProgress.correctAnswers,
      unlockedContent: unlockedContent
        ? [...state.quizProgress.unlockedContent, unlockedContent]
        : state.quizProgress.unlockedContent,
    },
  };
  saveState(newState);
  return newState;
};

export const resetState = (): GameState => {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultState, visitCount: 1 };
};
