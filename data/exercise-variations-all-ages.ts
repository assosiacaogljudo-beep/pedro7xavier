export interface ExerciseType {
  id: string
  title: string
  category: string
  steps: string[]
  benefits: string
  tips: string
  difficulty: "facil" | "moderado" | "avancado"
  recommendedAges: number[]
  timerSeconds: number
  timerRepetitions: number
  variations?: {
    easier: string
    harder: string
  }
  cautions?: string
}

export interface ProgressionType {
  week: number
  description: string
  repMultiplier: number
  timeMultiplier: number
  sets: number
  baseReps: number
  progressionTip: string
}

export interface WorkoutType {
  title: string
  description: string
  exercises: string[]
  frequency: string
  duration: string
  tips: string
}

// Sistema de progressão por semana
export const progressionSystem: ProgressionType[] = [
  {
    week: 1,
    description: "Semanas 1-2: Fase de adaptação inicial com foco em exercícios básicos.",
    repMultiplier: 1.0,
    timeMultiplier: 1.0,
    sets: 1,
    baseReps: 8,
    progressionTip: "Foque na técnica correta e na familiarização com os movimentos.",
  },
  {
    week: 3,
    description: "Semanas 3-4: Introdução de novos exercícios com aumento leve nas repetições.",
    repMultiplier: 1.25,
    timeMultiplier: 1.2,
    sets: 2,
    baseReps: 8,
    progressionTip: "Adicione uma segunda série nos exercícios que já domina bem.",
  },
  {
    week: 5,
    description: "Semanas 5-6: Progressão moderada com novos padrões de movimento.",
    repMultiplier: 1.5,
    timeMultiplier: 1.3,
    sets: 2,
    baseReps: 10,
    progressionTip: "Comece a reduzir o tempo de descanso entre as séries gradualmente.",
  },
  {
    week: 7,
    description: "Semanas 7-8: Fase intermediária com exercícios mais desafiadores.",
    repMultiplier: 1.75,
    timeMultiplier: 1.5,
    sets: 2,
    baseReps: 12,
    progressionTip: "Considere adicionar pequenos pesos em alguns exercícios se for confortável.",
  },
  {
    week: 9,
    description: "Semanas 9-10: Fase avançada com exercícios combinados e maior intensidade.",
    repMultiplier: 2.0,
    timeMultiplier: 1.75,
    sets: 3,
    baseReps: 10,
    progressionTip: "Experimente variações mais desafiadoras dos exercícios que já domina.",
  },
  {
    week: 11,
    description: "Semanas 11-12: Fase de manutenção com treino completo e integrado.",
    repMultiplier: 2.0,
    timeMultiplier: 2.0,
    sets: 3,
    baseReps: 12,
    progressionTip: "Alterne entre dias de maior e menor intensidade para permitir recuperação adequada.",
  },
]

// Função para obter a progressão com base na semana
export function getProgressionByWeek(week: number): ProgressionType {
  // Encontra a progressão adequada para a semana atual
  const progression = progressionSystem.find((p) => week >= p.week) || progressionSystem[0]
  return progression
}

export const exerciseVariations: ExerciseType[] = [
  // FAIXA ETÁRIA 13-19 ANOS
  {
    id: "aquecimento-13-1",
    title: "Aquecimento Dinâmico",
    category: "Aquecimento",
    steps: [
      "Comece com uma caminhada rápida no lugar por 30 segundos.",
      "Faça 10 polichinelos em ritmo moderado.",
      "Realize 10 rotações de braços para frente e 10 para trás.",
      "Finalize com 10 elevações de joelhos alternados.",
    ],
    benefits: "Prepara o corpo para o exercício, aumenta a frequência cardíaca gradualmente e aquece as articulações.",
    tips: "Mantenha um ritmo constante e respire normalmente durante o aquecimento.",
    difficulty: "facil",
    recommendedAges: [13, 14, 15, 16, 17, 18, 19],
    timerSeconds: 60,
    timerRepetitions: 1,
    variations: {
      easier: "Reduza o número de repetições e faça os movimentos mais lentamente.",
      harder: "Aumente o ritmo e adicione mais repetições.",
    },
  },
  {
    id: "forca-13-1",
    title: "Agachamento Básico",
    category: "Fortalecimento",
    steps: [
      "Fique em pé com os pés na largura dos ombros.",
      "Dobre os joelhos e abaixe o quadril como se fosse sentar em uma cadeira.",
      "Mantenha o peito erguido e os joelhos alinhados com os pés.",
      "Volte à posição inicial. Repita 12-15 vezes.",
    ],
    benefits: "Fortalece os músculos das pernas, glúteos e core, melhorando a estabilidade e postura.",
    tips: "Não deixe os joelhos ultrapassarem a ponta dos pés. Mantenha os calcanhares no chão.",
    difficulty: "moderado",
    recommendedAges: [13, 14, 15, 16, 17, 18, 19],
    timerSeconds: 0,
    timerRepetitions: 15,
    variations: {
      easier: "Reduza a profundidade do agachamento ou apoie-se em uma cadeira.",
      harder: "Adicione peso segurando halteres ou uma bola medicinal.",
    },
  },
  {
    id: "cardio-13-1",
    title: "Corrida no Lugar",
    category: "Cardiovascular",
    steps: [
      "Fique em pé com os pés na largura dos quadris.",
      "Comece a correr no lugar, levantando os joelhos até a altura do quadril.",
      "Balance os braços naturalmente, como em uma corrida.",
      "Continue por 1 minuto, descanse 30 segundos e repita 3 vezes.",
    ],
    benefits: "Melhora a resistência cardiovascular, queima calorias e aumenta o metabolismo.",
    tips: "Mantenha uma postura ereta e aterrisse suavemente nos pés para reduzir o impacto.",
    difficulty: "moderado",
    recommendedAges: [13, 14, 15, 16, 17, 18, 19],
    timerSeconds: 60,
    timerRepetitions: 3,
    variations: {
      easier: "Reduza o tempo para 30 segundos ou diminua a altura dos joelhos.",
      harder: "Aumente o tempo para 2 minutos ou adicione elevação de joelhos mais alta.",
    },
  },

  // FAIXA ETÁRIA 20-29 ANOS
  {
    id: "aquecimento-20-1",
    title: "Mobilidade Articular Completa",
    category: "Aquecimento",
    steps: [
      "Faça 10 rotações de cada tornozelo.",
      "Realize 10 rotações de cada pulso e 10 rotações de cada ombro.",
      "Execute 10 rotações suaves do pescoço (5 para cada lado).",
      "Finalize com 10 rotações de quadril para cada lado.",
    ],
    benefits:
      "Melhora a mobilidade das articulações, prepara o corpo para exercícios mais intensos e reduz o risco de lesões.",
    tips: "Faça movimentos controlados e suaves. Evite movimentos bruscos, especialmente no pescoço.",
    difficulty: "facil",
    recommendedAges: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Reduza a amplitude dos movimentos se sentir desconforto.",
      harder: "Aumente o número de repetições para 15 de cada.",
    },
  },
  {
    id: "forca-20-1",
    title: "Flexão de Braço",
    category: "Fortalecimento",
    steps: [
      "Posicione-se em quatro apoios, mãos alinhadas com os ombros e pernas estendidas.",
      "Mantenha o corpo em linha reta da cabeça aos calcanhares.",
      "Dobre os cotovelos, abaixando o peito em direção ao chão.",
      "Empurre de volta à posição inicial. Repita 10-12 vezes.",
    ],
    benefits: "Fortalece os músculos do peito, ombros, tríceps e core.",
    tips: "Mantenha o core contraído durante todo o exercício. Não deixe o quadril cair ou subir.",
    difficulty: "avancado",
    recommendedAges: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    timerSeconds: 0,
    timerRepetitions: 12,
    variations: {
      easier: "Faça com os joelhos apoiados no chão ou em uma parede.",
      harder: "Eleve os pés em um banco ou adicione palmas entre as flexões.",
    },
  },
  {
    id: "cardio-20-1",
    title: "Burpees",
    category: "Cardiovascular",
    steps: [
      "Comece em pé, agache-se e coloque as mãos no chão.",
      "Salte com os pés para trás, ficando na posição de prancha.",
      "Faça uma flexão (opcional), depois salte com os pés de volta para perto das mãos.",
      "Salte para cima com os braços estendidos. Repita 10 vezes.",
    ],
    benefits: "Exercício completo que trabalha múltiplos grupos musculares e melhora o condicionamento cardiovascular.",
    tips: "Mantenha um ritmo constante. Adapte o exercício ao seu nível de condicionamento.",
    difficulty: "avancado",
    recommendedAges: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Elimine a flexão e/ou o salto final.",
      harder: "Adicione uma flexão completa e um salto mais alto no final.",
    },
  },

  // FAIXA ETÁRIA 30-39 ANOS
  {
    id: "aquecimento-30-1",
    title: "Aquecimento Cardio-Articular",
    category: "Aquecimento",
    steps: [
      "Marche no lugar por 30 segundos, levantando os joelhos.",
      "Faça 10 círculos com os braços para frente e 10 para trás.",
      "Realize 10 torções de tronco para cada lado.",
      "Finalize com 10 agachamentos parciais.",
    ],
    benefits:
      "Aquece os músculos e articulações, aumenta a frequência cardíaca gradualmente e prepara o corpo para o treino.",
    tips: "Respire normalmente e mantenha os movimentos fluidos e controlados.",
    difficulty: "facil",
    recommendedAges: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    timerSeconds: 120,
    timerRepetitions: 1,
    variations: {
      easier: "Reduza o tempo de marcha e o número de repetições.",
      harder: "Aumente o tempo de marcha para 1 minuto e adicione mais repetições.",
    },
  },
  {
    id: "forca-30-1",
    title: "Prancha Frontal",
    category: "Fortalecimento",
    steps: [
      "Apoie os antebraços no chão, cotovelos alinhados com os ombros.",
      "Estenda as pernas para trás, apoiando-se nas pontas dos pés.",
      "Mantenha o corpo em linha reta, contraindo o abdômen.",
      "Segure a posição por 30 segundos. Repita 3 vezes.",
    ],
    benefits: "Fortalece o core, ombros e costas, melhorando a estabilidade e postura.",
    tips: "Não deixe o quadril subir ou cair. Respire normalmente durante o exercício.",
    difficulty: "moderado",
    recommendedAges: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    timerSeconds: 30,
    timerRepetitions: 3,
    variations: {
      easier: "Apoie os joelhos no chão ou reduza o tempo para 15-20 segundos.",
      harder: "Aumente o tempo para 45-60 segundos ou levante uma perna alternadamente.",
    },
  },
  {
    id: "cardio-30-1",
    title: "Mountain Climbers",
    category: "Cardiovascular",
    steps: [
      "Comece na posição de prancha com as mãos no chão, braços estendidos.",
      "Traga um joelho em direção ao peito, depois volte à posição inicial.",
      "Alterne rapidamente as pernas, como se estivesse correndo no lugar.",
      "Continue por 30 segundos. Descanse e repita 3 vezes.",
    ],
    benefits: "Aumenta a frequência cardíaca, trabalha o core e melhora a coordenação.",
    tips: "Mantenha os quadris baixos e o core engajado. Controle a respiração durante o exercício.",
    difficulty: "moderado",
    recommendedAges: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    timerSeconds: 30,
    timerRepetitions: 3,
    variations: {
      easier: "Reduza a velocidade e o tempo para 15-20 segundos.",
      harder: "Aumente a velocidade e o tempo para 45-60 segundos.",
    },
  },

  // FAIXA ETÁRIA 40-49 ANOS
  {
    id: "aquecimento-40-1",
    title: "Aquecimento Completo",
    category: "Aquecimento",
    steps: [
      "Caminhe no lugar por 1 minuto, aumentando gradualmente o ritmo.",
      "Faça 10 rotações de cada articulação principal (tornozelos, joelhos, quadris, ombros).",
      "Realize 10 alongamentos laterais de tronco para cada lado.",
      "Finalize com 10 agachamentos suaves.",
    ],
    benefits: "Prepara o corpo para o exercício, aumenta a temperatura muscular e melhora a mobilidade articular.",
    tips: "Faça movimentos controlados e respire profundamente durante o aquecimento.",
    difficulty: "facil",
    recommendedAges: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    timerSeconds: 180,
    timerRepetitions: 1,
    variations: {
      easier: "Reduza o tempo de caminhada e o número de repetições.",
      harder: "Aumente o ritmo da caminhada e adicione mais repetições.",
    },
  },
  {
    id: "forca-40-1",
    title: "Agachamento com Cadeira",
    category: "Fortalecimento",
    steps: [
      "Posicione-se em frente a uma cadeira firme, pés afastados na largura dos ombros.",
      "Dobre lentamente os joelhos, abaixando o quadril como se fosse sentar.",
      "Toque levemente a cadeira com o quadril e volte à posição inicial.",
      "Realize 12-15 repetições, 2-3 séries.",
    ],
    benefits: "Fortalece quadríceps, glúteos e músculos do core, essenciais para atividades diárias.",
    tips: "Mantenha os joelhos alinhados com os pés, sem ultrapassar a ponta dos dedos. Mantenha o peito erguido.",
    difficulty: "moderado",
    recommendedAges: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    timerSeconds: 0,
    timerRepetitions: 15,
    variations: {
      easier: "Sente-se completamente na cadeira entre as repetições.",
      harder: "Segure halteres leves durante o exercício ou aumente o número de repetições.",
    },
  },
  {
    id: "cardio-40-1",
    title: "Step-Ups",
    category: "Cardiovascular",
    steps: [
      "Use um degrau baixo ou uma plataforma estável.",
      "Suba com o pé direito, depois com o esquerdo.",
      "Desça com o pé direito, depois com o esquerdo.",
      "Continue alternando o pé que inicia por 1 minuto. Repita 3 vezes.",
    ],
    benefits: "Melhora a resistência cardiovascular, fortalece as pernas e melhora o equilíbrio.",
    tips: "Mantenha uma postura ereta. Use um apoio próximo se necessário para segurança.",
    difficulty: "moderado",
    recommendedAges: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    timerSeconds: 60,
    timerRepetitions: 3,
    variations: {
      easier: "Use um degrau mais baixo ou reduza o tempo para 30 segundos.",
      harder: "Aumente a altura do degrau ou adicione halteres leves.",
    },
  },

  // FAIXA ETÁRIA 50-59 ANOS
  {
    id: "aquecimento-50-1",
    title: "Mobilidade Articular Progressiva",
    category: "Aquecimento",
    steps: [
      "Comece com 10 rotações de tornozelos (sentado se preferir).",
      "Faça 10 rotações de joelhos para cada lado.",
      "Realize 10 rotações de quadril para cada lado.",
      "Finalize com 10 rotações de ombros e 5 rotações suaves de pescoço para cada lado.",
    ],
    benefits: "Melhora a mobilidade das articulações, reduz a rigidez e prepara o corpo para exercícios.",
    tips: "Faça movimentos lentos e controlados. Evite movimentos bruscos, especialmente no pescoço.",
    difficulty: "facil",
    recommendedAges: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Reduza o número de repetições e faça sentado se necessário.",
      harder: "Aumente o número de repetições e adicione mais articulações.",
    },
  },
  {
    id: "forca-50-1",
    title: "Flexão de Braço na Parede",
    category: "Fortalecimento",
    steps: [
      "Fique em pé de frente para uma parede, a uma distância de um braço.",
      "Coloque as palmas das mãos na parede, na altura dos ombros.",
      "Dobre os cotovelos, aproximando o peito da parede.",
      "Empurre de volta à posição inicial. Repita 12-15 vezes.",
    ],
    benefits: "Fortalece os músculos do peito, ombros e braços sem sobrecarregar as articulações.",
    tips: "Mantenha o corpo em linha reta da cabeça aos calcanhares. Não curve as costas.",
    difficulty: "facil",
    recommendedAges: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    timerSeconds: 0,
    timerRepetitions: 15,
    variations: {
      easier: "Aproxime-se mais da parede.",
      harder: "Afaste-se mais da parede ou faça em uma superfície mais baixa, como uma mesa.",
    },
  },
  {
    id: "cardio-50-1",
    title: "Marcha Estacionária",
    category: "Cardiovascular",
    steps: [
      "Fique em pé com os pés na largura dos quadris.",
      "Marche no lugar, levantando os joelhos até uma altura confortável.",
      "Balance os braços naturalmente, como em uma caminhada.",
      "Continue por 2 minutos, descanse 1 minuto e repita 2-3 vezes.",
    ],
    benefits: "Aumenta a frequência cardíaca, melhora a circulação e a resistência sem impacto nas articulações.",
    tips: "Mantenha uma postura ereta. Ajuste a altura dos joelhos e o ritmo conforme seu conforto.",
    difficulty: "moderado",
    recommendedAges: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    timerSeconds: 120,
    timerRepetitions: 3,
    variations: {
      easier: "Reduza o tempo para 1 minuto ou diminua a altura dos joelhos.",
      harder: "Aumente o tempo para 3 minutos ou levante mais os joelhos.",
    },
  },

  // FAIXA ETÁRIA 60-69 ANOS
  {
    id: "aquecimento-60-1",
    title: "Marcha Dinâmica",
    category: "Aquecimento",
    steps: [
      "Fique em pé com postura ereta.",
      "Marche no lugar levantando os joelhos até a altura do quadril.",
      "Sincronize o movimento dos braços, oposto às pernas.",
      "Continue por 2 minutos, aumentando gradualmente o ritmo.",
    ],
    benefits: "Aquece os músculos das pernas e aumenta a frequência cardíaca gradualmente.",
    tips: "Mantenha o olhar para frente e a coluna ereta. Respire naturalmente durante o exercício.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 120,
    timerRepetitions: 1,
    variations: {
      easier: "Marche sem levantar tanto os joelhos e em ritmo mais lento.",
      harder: "Aumente a velocidade e adicione pequenos saltos entre os passos.",
    },
  },
  {
    id: "forca-60-1",
    title: "Agachamento com Cadeira",
    category: "Fortalecimento",
    steps: [
      "Posicione-se em frente a uma cadeira firme, pés afastados na largura dos ombros.",
      "Dobre lentamente os joelhos, abaixando o quadril como se fosse sentar.",
      "Pare pouco antes de tocar a cadeira e volte à posição inicial.",
      "Realize 10-12 repetições, 2-3 séries.",
    ],
    benefits: "Fortalece quadríceps, glúteos e músculos do core, essenciais para levantar e sentar.",
    tips: "Mantenha os joelhos alinhados com os pés, sem ultrapassar a ponta dos dedos. Mantenha o peito erguido.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Sente-se completamente na cadeira entre as repetições.",
      harder: "Segure halteres leves durante o exercício ou aumente o número de repetições.",
    },
    cautions: "Evite se tiver problemas graves nos joelhos. Não bloqueie as articulações.",
  },
  {
    id: "equilibrio-60-1",
    title: "Equilíbrio Unipodal com Movimento",
    category: "Equilíbrio",
    steps: [
      "Fique em pé ao lado de uma superfície de apoio (como uma cadeira).",
      "Levante uma perna do chão, mantendo o equilíbrio na outra.",
      "Enquanto equilibra, mova os braços lentamente para os lados.",
      "Mantenha por 15-30 segundos e troque de perna. Repita 3 vezes com cada perna.",
    ],
    benefits: "Melhora o equilíbrio dinâmico e fortalece os músculos estabilizadores.",
    tips: "Fixe o olhar em um ponto à sua frente. Use o apoio apenas se necessário.",
    difficulty: "avancado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 30,
    timerRepetitions: 3,
    variations: {
      easier: "Mantenha a mão apoiada na cadeira durante todo o exercício.",
      harder: "Feche os olhos por alguns segundos enquanto mantém o equilíbrio.",
    },
  },

  // FAIXA ETÁRIA 70-80 ANOS
  {
    id: "aquecimento-70-1",
    title: "Círculos Articulares",
    category: "Aquecimento",
    steps: [
      "Sentado em uma cadeira firme, faça movimentos circulares com os tornozelos, 10 para cada lado.",
      "Continue com os pulsos, fazendo 10 círculos em cada direção.",
      "Faça círculos suaves com os ombros, 5 para frente e 5 para trás.",
      "Finalize com movimentos circulares do pescoço, 5 para cada lado.",
    ],
    benefits: "Aquece as articulações e melhora a mobilidade, preparando o corpo para exercícios.",
    tips: "Faça movimentos lentos e controlados. Evite movimentos bruscos, especialmente no pescoço.",
    difficulty: "facil",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Reduza o número de repetições.",
      harder: "Aumente o número de repetições ou adicione mais articulações.",
    },
  },
  {
    id: "forca-70-1",
    title: "Extensão de Joelhos Sentado",
    category: "Fortalecimento",
    steps: [
      "Sente-se em uma cadeira firme com as costas apoiadas.",
      "Estenda uma perna até que fique paralela ao chão.",
      "Mantenha por 3 segundos e abaixe lentamente.",
      "Repita 8-10 vezes com cada perna.",
    ],
    benefits: "Fortalece os músculos da parte frontal da coxa, importantes para levantar e sentar.",
    tips: "Mantenha o pé flexionado durante a extensão. Não prenda a respiração.",
    difficulty: "moderado",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    timerSeconds: 3,
    timerRepetitions: 8,
    variations: {
      easier: "Não estenda completamente a perna.",
      harder: "Adicione uma pequena pausa de 5 segundos na posição estendida.",
    },
  },
  {
    id: "equilibrio-70-1",
    title: "Transferência de Peso Lateral",
    category: "Equilíbrio",
    steps: [
      "Fique em pé atrás de uma cadeira, segurando o encosto para apoio.",
      "Afaste os pés na largura dos ombros.",
      "Transfira o peso para a perna direita, levantando levemente o pé esquerdo.",
      "Volte ao centro e repita para o outro lado. Faça 10 repetições para cada lado.",
    ],
    benefits: "Melhora o equilíbrio lateral e fortalece os músculos estabilizadores do quadril.",
    tips: "Mantenha o olhar para frente. Use o apoio da cadeira conforme necessário.",
    difficulty: "moderado",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Mantenha ambos os pés no chão, apenas transferindo o peso.",
      harder: "Levante mais o pé ou reduza o apoio na cadeira.",
    },
  },
]

// Função para obter o treino específico para a semana e faixa etária
export function getWorkoutForWeekAndAge(ageGroup: string, week: number): WorkoutType {
  // Treinos para faixa etária 13-19 anos
  const workouts1319 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 13-19 anos",
      description: "Treino de adaptação com exercícios básicos para desenvolver força e condicionamento.",
      exercises: ["aquecimento-13-1", "forca-13-1", "cardio-13-1"],
      frequency: "3 vezes por semana",
      duration: "20-30 minutos por sessão",
      tips: "Foque na técnica correta. Descanse entre os exercícios conforme necessário.",
    },
    // Semanas 3-4
    3: {
      title: "Treino de Progressão para 13-19 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: [
        "aquecimento-13-1",
        "forca-13-1",
        "cardio-13-1",
        "forca-20-1", // Adicionando um exercício mais desafiador
      ],
      frequency: "3-4 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    // Semanas 5-12 seguem o mesmo padrão de progressão
    5: {
      title: "Treino Intermediário para 13-19 anos",
      description: "Treino com foco em resistência e coordenação, com exercícios mais desafiadores.",
      exercises: ["aquecimento-13-1", "forca-13-1", "cardio-13-1", "forca-20-1", "cardio-20-1"],
      frequency: "3-4 vezes por semana",
      duration: "30-40 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Reduza o tempo de descanso entre exercícios.",
    },
    7: {
      title: "Treino Avançado para 13-19 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo.",
      exercises: ["aquecimento-13-1", "forca-13-1", "cardio-13-1", "forca-20-1", "cardio-20-1"],
      frequency: "4 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Considere adicionar pequenos pesos em alguns exercícios. Alterne dias de maior e menor intensidade.",
    },
    9: {
      title: "Treino de Alta Intensidade para 13-19 anos",
      description: "Treino completo com exercícios variados e desafiadores para maximizar os resultados.",
      exercises: ["aquecimento-13-1", "forca-13-1", "cardio-13-1", "forca-20-1", "cardio-20-1"],
      frequency: "4-5 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    11: {
      title: "Treino de Manutenção para 13-19 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: ["aquecimento-13-1", "forca-13-1", "cardio-13-1", "forca-20-1", "cardio-20-1"],
      frequency: "4-5 vezes por semana",
      duration: "45-60 minutos por sessão",
      tips: "Alterne entre dias de maior e menor intensidade. Inclua dias de descanso ativo com atividades leves.",
    },
  }

  // Treinos para faixa etária 20-29 anos
  const workouts2029 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 20-29 anos",
      description: "Treino de adaptação com exercícios básicos para desenvolver força e condicionamento.",
      exercises: ["aquecimento-20-1", "forca-20-1", "cardio-20-1"],
      frequency: "3-4 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Foque na técnica correta. Descanse entre os exercícios conforme necessário.",
    },
    // Semanas 3-12 seguem o mesmo padrão de progressão
    3: {
      title: "Treino de Progressão para 20-29 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: ["aquecimento-20-1", "forca-20-1", "cardio-20-1", "forca-30-1"],
      frequency: "4 vezes por semana",
      duration: "30-40 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    5: {
      title: "Treino Intermediário para 20-29 anos",
      description: "Treino com foco em resistência e força, com exercícios mais desafiadores.",
      exercises: ["aquecimento-20-1", "forca-20-1", "cardio-20-1", "forca-30-1", "cardio-30-1"],
      frequency: "4-5 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Reduza o tempo de descanso entre exercícios.",
    },
    7: {
      title: "Treino Avançado para 20-29 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo.",
      exercises: ["aquecimento-20-1", "forca-20-1", "cardio-20-1", "forca-30-1", "cardio-30-1"],
      frequency: "5 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Considere adicionar pesos em alguns exercícios. Alterne dias de maior e menor intensidade.",
    },
    9: {
      title: "Treino de Alta Intensidade para 20-29 anos",
      description: "Treino completo com exercícios variados e desafiadores para maximizar os resultados.",
      exercises: ["aquecimento-20-1", "forca-20-1", "cardio-20-1", "forca-30-1", "cardio-30-1"],
      frequency: "5 vezes por semana",
      duration: "45-60 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    11: {
      title: "Treino de Manutenção para 20-29 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: ["aquecimento-20-1", "forca-20-1", "cardio-20-1", "forca-30-1", "cardio-30-1"],
      frequency: "5 vezes por semana",
      duration: "50-60 minutos por sessão",
      tips: "Alterne entre dias de maior e menor intensidade. Inclua dias de descanso ativo com atividades leves.",
    },
  }

  // Treinos para faixa etária 30-39 anos
  const workouts3039 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 30-39 anos",
      description: "Treino de adaptação com exercícios básicos para desenvolver força e condicionamento.",
      exercises: ["aquecimento-30-1", "forca-30-1", "cardio-30-1"],
      frequency: "3 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Foque na técnica correta. Descanse entre os exercícios conforme necessário.",
    },
    // Semanas 3-12 seguem o mesmo padrão de progressão
    3: {
      title: "Treino de Progressão para 30-39 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: ["aquecimento-30-1", "forca-30-1", "cardio-30-1", "forca-40-1"],
      frequency: "3-4 vezes por semana",
      duration: "30-40 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    5: {
      title: "Treino Intermediário para 30-39 anos",
      description: "Treino com foco em resistência e força, com exercícios mais desafiadores.",
      exercises: ["aquecimento-30-1", "forca-30-1", "cardio-30-1", "forca-40-1", "cardio-40-1"],
      frequency: "4 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Reduza o tempo de descanso entre exercícios.",
    },
    7: {
      title: "Treino Avançado para 30-39 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo.",
      exercises: ["aquecimento-30-1", "forca-30-1", "cardio-30-1", "forca-40-1", "cardio-40-1"],
      frequency: "4-5 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Considere adicionar pesos em alguns exercícios. Alterne dias de maior e menor intensidade.",
    },
    9: {
      title: "Treino de Alta Intensidade para 30-39 anos",
      description: "Treino completo com exercícios variados e desafiadores para maximizar os resultados.",
      exercises: ["aquecimento-30-1", "forca-30-1", "cardio-30-1", "forca-40-1", "cardio-40-1"],
      frequency: "5 vezes por semana",
      duration: "45-55 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    11: {
      title: "Treino de Manutenção para 30-39 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: ["aquecimento-30-1", "forca-30-1", "cardio-30-1", "forca-40-1", "cardio-40-1"],
      frequency: "4-5 vezes por semana",
      duration: "45-60 minutos por sessão",
      tips: "Alterne entre dias de maior e menor intensidade. Inclua dias de descanso ativo com atividades leves.",
    },
  }

  // Treinos para faixa etária 40-49 anos
  const workouts4049 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 40-49 anos",
      description: "Treino de adaptação com exercícios básicos para desenvolver força e mobilidade.",
      exercises: ["aquecimento-40-1", "forca-40-1", "cardio-40-1"],
      frequency: "3 vezes por semana",
      duration: "20-30 minutos por sessão",
      tips: "Foque na técnica correta. Descanse entre os exercícios conforme necessário.",
    },
    // Semanas 3-12 seguem o mesmo padrão de progressão
    3: {
      title: "Treino de Progressão para 40-49 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: ["aquecimento-40-1", "forca-40-1", "cardio-40-1", "forca-50-1"],
      frequency: "3 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    5: {
      title: "Treino Intermediário para 40-49 anos",
      description: "Treino com foco em resistência e força, com exercícios mais variados.",
      exercises: ["aquecimento-40-1", "forca-40-1", "cardio-40-1", "forca-50-1", "cardio-50-1"],
      frequency: "3-4 vezes por semana",
      duration: "30-40 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Faça pausas quando necessário.",
    },
    7: {
      title: "Treino Avançado para 40-49 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo.",
      exercises: ["aquecimento-40-1", "forca-40-1", "cardio-40-1", "forca-50-1", "cardio-50-1"],
      frequency: "4 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Considere adicionar pequenos pesos em alguns exercícios. Alterne dias de maior e menor intensidade.",
    },
    9: {
      title: "Treino de Alta Intensidade para 40-49 anos",
      description: "Treino completo com exercícios variados para maximizar os resultados.",
      exercises: ["aquecimento-40-1", "forca-40-1", "cardio-40-1", "forca-50-1", "cardio-50-1"],
      frequency: "4 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    11: {
      title: "Treino de Manutenção para 40-49 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: ["aquecimento-40-1", "forca-40-1", "cardio-40-1", "forca-50-1", "cardio-50-1"],
      frequency: "3-4 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Alterne entre dias de maior e menor intensidade. Inclua dias de descanso ativo com atividades leves.",
    },
  }

  // Treinos para faixa etária 50-59 anos
  const workouts5059 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 50-59 anos",
      description: "Treino de adaptação com exercícios básicos para desenvolver força e mobilidade.",
      exercises: ["aquecimento-50-1", "forca-50-1", "cardio-50-1"],
      frequency: "2-3 vezes por semana",
      duration: "20-25 minutos por sessão",
      tips: "Foque na técnica correta. Descanse entre os exercícios conforme necessário.",
    },
    // Semanas 3-12 seguem o mesmo padrão de progressão
    3: {
      title: "Treino de Progressão para 50-59 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: ["aquecimento-50-1", "forca-50-1", "cardio-50-1", "forca-60-1"],
      frequency: "3 vezes por semana",
      duration: "25-30 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    5: {
      title: "Treino Intermediário para 50-59 anos",
      description: "Treino com foco em resistência e força, com exercícios mais variados.",
      exercises: ["aquecimento-50-1", "forca-50-1", "cardio-50-1", "forca-60-1", "equilibrio-60-1"],
      frequency: "3 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Faça pausas quando necessário.",
    },
    7: {
      title: "Treino Avançado para 50-59 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo.",
      exercises: ["aquecimento-50-1", "forca-50-1", "cardio-50-1", "forca-60-1", "equilibrio-60-1"],
      frequency: "3-4 vezes por semana",
      duration: "30-40 minutos por sessão",
      tips: "Considere adicionar pequenos pesos em alguns exercícios. Alterne dias de maior e menor intensidade.",
    },
    9: {
      title: "Treino de Alta Intensidade para 50-59 anos",
      description: "Treino completo com exercícios variados para maximizar os resultados.",
      exercises: ["aquecimento-50-1", "forca-50-1", "cardio-50-1", "forca-60-1", "equilibrio-60-1"],
      frequency: "3-4 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    11: {
      title: "Treino de Manutenção para 50-59 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: ["aquecimento-50-1", "forca-50-1", "cardio-50-1", "forca-60-1", "equilibrio-60-1"],
      frequency: "3-4 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Alterne entre dias de maior e menor intensidade. Inclua dias de descanso ativo com atividades leves.",
    },
  }

  // Treinos para faixa etária 60-69 anos
  const workouts6069 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 60-69 anos",
      description: "Treino de adaptação com exercícios básicos para desenvolver força e equilíbrio.",
      exercises: ["aquecimento-60-1", "forca-60-1", "equilibrio-60-1"],
      frequency: "2-3 vezes por semana",
      duration: "20-30 minutos por sessão",
      tips: "Foque na técnica correta. Descanse entre os exercícios conforme necessário.",
    },
    // Semanas 3-12 seguem o mesmo padrão de progressão
    3: {
      title: "Treino de Progressão para 60-69 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: ["aquecimento-60-1", "forca-60-1", "equilibrio-60-1", "forca-70-1"],
      frequency: "3 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    5: {
      title: "Treino Intermediário para 60-69 anos",
      description: "Treino com foco em resistência e coordenação, com exercícios mais variados.",
      exercises: ["aquecimento-60-1", "forca-60-1", "equilibrio-60-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "3 vezes por semana",
      duration: "30-40 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Faça pausas quando necessário.",
    },
    7: {
      title: "Treino Avançado para 60-69 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo de forma segura.",
      exercises: ["aquecimento-60-1", "forca-60-1", "equilibrio-60-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "3 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Considere adicionar pequenos pesos em alguns exercícios. Foque na qualidade dos movimentos.",
    },
    9: {
      title: "Treino de Alta Intensidade para 60-69 anos",
      description: "Treino completo com exercícios variados para maximizar os resultados de forma segura.",
      exercises: ["aquecimento-60-1", "forca-60-1", "equilibrio-60-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "3 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    11: {
      title: "Treino de Manutenção para 60-69 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: ["aquecimento-60-1", "forca-60-1", "equilibrio-60-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "3 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Alterne entre dias de maior e menor intensidade. Inclua dias de descanso ativo com atividades leves.",
    },
  }

  // Treinos para faixa etária 70-80 anos
  const workouts7080 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 70-80 anos",
      description: "Treino de adaptação com exercícios simples e seguros para melhorar a mobilidade.",
      exercises: ["aquecimento-70-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "2 vezes por semana",
      duration: "15-20 minutos por sessão",
      tips: "Foque na técnica correta. Faça pausas sempre que necessário.",
    },
    // Semanas 3-12 seguem o mesmo padrão de progressão
    3: {
      title: "Treino de Progressão para 70-80 anos",
      description: "Treino com pequeno aumento de intensidade e novos exercícios.",
      exercises: ["aquecimento-70-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "2 vezes por semana",
      duration: "20-25 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Faça os exercícios em seu próprio ritmo.",
    },
    5: {
      title: "Treino Intermediário para 70-80 anos",
      description: "Treino com foco em coordenação e força, com exercícios mais variados.",
      exercises: ["aquecimento-70-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "2-3 vezes por semana",
      duration: "20-30 minutos por sessão",
      tips: "Divida o treino em sessões menores ao longo do dia se necessário. Priorize o conforto e segurança.",
    },
    7: {
      title: "Treino Avançado para 70-80 anos",
      description: "Treino com maior variedade de exercícios para desafiar o corpo de forma segura.",
      exercises: ["aquecimento-70-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "3 vezes por semana",
      duration: "25-30 minutos por sessão",
      tips: "Foque na qualidade dos movimentos. Tenha sempre alguém por perto durante os exercícios.",
    },
    9: {
      title: "Treino Completo para 70-80 anos",
      description: "Treino integrado com todos os componentes importantes para a saúde e funcionalidade.",
      exercises: ["aquecimento-70-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "3 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Divida o treino em sessões menores ao longo do dia. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    11: {
      title: "Treino de Manutenção para 70-80 anos",
      description: "Treino completo para manter os ganhos e continuar ativo de forma sustentável.",
      exercises: ["aquecimento-70-1", "forca-70-1", "equilibrio-70-1"],
      frequency: "3 vezes por semana",
      duration: "30-40 minutos por sessão (divididos em sessões menores)",
      tips: "Alterne entre exercícios mais e menos intensos. Tenha sempre alguém por perto durante os exercícios.",
    },
  }

  // Seleciona o conjunto de treinos com base na faixa etária
  let workouts
  switch (ageGroup) {
    case "13-19":
      workouts = workouts1319
      break
    case "20-29":
      workouts = workouts2029
      break
    case "30-39":
      workouts = workouts3039
      break
    case "40-49":
      workouts = workouts4049
      break
    case "50-59":
      workouts = workouts5059
      break
    case "60-69":
      workouts = workouts6069
      break
    case "70-80":
      workouts = workouts7080
      break
    default:
      workouts = workouts3039 // Padrão para adultos de meia-idade
  }

  // Encontra o treino adequado para a semana atual
  const workoutWeek =
    Object.keys(workouts)
      .map(Number)
      .filter((w) => w <= week)
      .sort((a, b) => b - a)[0] || 1

  return workouts[workoutWeek as keyof typeof workouts]
}
