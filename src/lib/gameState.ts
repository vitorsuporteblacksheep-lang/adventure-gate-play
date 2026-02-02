export interface ChapterData {
  id: string;
  title: string;
  date: string;
  description: string;
  memory: string;
  quote: string;
  icon: string;
  image?: string;
  unlocked: boolean;
  gameCompleted: boolean;
  gameType: 'quiz' | 'memory' | 'puzzle' | 'sequence' | 'matching' | 'heart-catch' | 'heartbeat';
  musicUrl?: string;
  spotifyEmbedUrl?: string;
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
    feelings: boolean;
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
    description: 'Nessa época eu conheço a Nataly, uma pessoa incrível, sempre disposta a ajudar, com o coração aberto, que sempre entende o lado das pessoas, que é muito solicita e tem o melhor coração do mundo.',
    memory: 'Uma amizade que nasceu no ensino médio e se transformou em algo muito maior.',
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
    description: 'Foi nesse dia que por um simples acaso do destino, o universo resolveu desenrolar o nosso beijo que nenhum de nós dois imaginaria que aconteceria, é nesse momento que inicia a nossa linda história de amor.',
    memory: 'Nesse dia ainda dormimos na mesma cama 💕',
    quote: '"Quem imaginaria que um simples beijo iniciaria tudo isso, né?"',
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
    description: 'Foi nesse primeiro encontro que começamos a se conhecer melhor, saber um pouco melhor um sobre o outro, foi o primeiro momento que senti que queria passar cada vez mais tempo com você.',
    memory: 'Nesse dia eu não queria desgrudar de você 💕',
    quote: '"O seu perfume viciou em mim"',
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
    description: 'Nesse momento foi onde eu já estava completamente entregue e apaixonado por você Nataly, onde passamos cada vez mais tempo juntos e a saudade dói de ficar mais de uma semana sem te ver.',
    memory: 'Foi nesse momento que saiu o mais espontâneo e primeiro: "Eu te amo" 💕',
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
    title: 'Nossa Primeira Viagem',
    date: 'Junho 2023',
    description: 'Aventuras e descobertas em um lugar especial.',
    memory: 'Cada paisagem ficou mais bonita ao seu lado. Descobrimos que a melhor viagem é aquela que fazemos juntos.',
    quote: '"A vida é uma viagem, e quem ama nunca viaja sozinho."',
    icon: '✈️',
    unlocked: false,
    gameCompleted: false,
    gameType: 'puzzle',
  },
  {
    id: 'chapter-6',
    title: 'Promessas de Amor',
    date: 'Dezembro 2023',
    description: 'O momento em que juramos estar juntos para sempre.',
    memory: 'Você é meu presente, meu futuro, minha eternidade. Com você, cada dia é uma nova razão para sorrir.',
    quote: '"O amor verdadeiro não tem final feliz, porque o amor verdadeiro nunca acaba."',
    icon: '💍',
    unlocked: false,
    gameCompleted: false,
    gameType: 'heart-catch',
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
    feelings: false,
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

  // Check section unlocks
  const completedCount = newChapters.filter(ch => ch.gameCompleted).length;
  const newSectionUnlocks = { ...state.sectionUnlocks };
  
  if (completedCount >= 2) newSectionUnlocks.gallery = true;
  if (completedCount >= 4) newSectionUnlocks.feelings = true;
  if (completedCount >= 6) newSectionUnlocks.future = true;

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
