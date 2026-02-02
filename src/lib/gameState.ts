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
  gameType: 'quiz' | 'memory' | 'puzzle' | 'sequence' | 'matching' | 'heart-catch';
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
    gameType: 'quiz',
    musicUrl: 'https://www.youtube.com/watch?v=pMSwHRwbMEo',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/70dJEanFPdYuWZumkrnKeX?utm_source=generator',
  },
  {
    id: 'chapter-2',
    title: 'Primeiro Encontro',
    date: 'Fevereiro 2023',
    description: 'O nervosismo, as borboletas, a magia do primeiro café juntos.',
    memory: 'As borboletas no estômago e as risadas que não paravam. Cada segundo ao seu lado parecia um presente.',
    quote: '"Você é o que eu não sabia que procurava."',
    icon: '☕',
    unlocked: false,
    gameCompleted: false,
    gameType: 'memory',
  },
  {
    id: 'chapter-3',
    title: 'Nosso Primeiro Beijo',
    date: 'Março 2023',
    description: 'Um momento guardado para sempre no coração.',
    memory: 'O mundo parou por um instante. Só existíamos nós dois, e aquele momento ficou eternizado em nossas memórias.',
    quote: '"Um beijo é uma carta de amor que não precisa de palavras."',
    icon: '💋',
    unlocked: false,
    gameCompleted: false,
    gameType: 'sequence',
  },
  {
    id: 'chapter-4',
    title: 'Oficialmente Juntos',
    date: 'Abril 2023',
    description: 'O dia em que decidimos trilhar essa jornada lado a lado.',
    memory: 'A certeza de que era você. Sempre foi você. Prometemos cuidar um do outro, e assim começou nossa história oficial.',
    quote: '"Amar não é olhar um para o outro, é olhar juntos na mesma direção."',
    icon: '💑',
    unlocked: false,
    gameCompleted: false,
    gameType: 'matching',
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
