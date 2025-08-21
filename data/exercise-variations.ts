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
  {
    id: "cardio-60-1",
    title: "Caminhada com Mudanças de Direção",
    category: "Cardiovascular",
    steps: [
      "Em um espaço aberto, caminhe em linha reta por 10 passos.",
      "Faça uma curva de 90 graus e caminhe mais 10 passos.",
      "Continue mudando de direção a cada 10 passos.",
      "Mantenha o exercício por 3-5 minutos.",
    ],
    benefits: "Melhora a resistência cardiovascular e a coordenação espacial.",
    tips: "Mantenha um ritmo constante. Olhe para onde está indo antes de mudar de direção.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 180,
    timerRepetitions: 1,
    variations: {
      easier: "Diminua o número de passos entre as mudanças de direção.",
      harder: "Aumente a velocidade da caminhada ou adicione pequenos obstáculos.",
    },
  },
  {
    id: "flexibilidade-60-1",
    title: "Alongamento Dinâmico de Tronco",
    category: "Flexibilidade",
    steps: [
      "Sente-se na borda de uma cadeira firme, pés apoiados no chão.",
      "Gire o tronco para um lado, usando as mãos nos braços da cadeira para auxiliar.",
      "Mantenha por 5 segundos e volte ao centro.",
      "Repita para o outro lado. Faça 8-10 repetições para cada lado.",
    ],
    benefits: "Melhora a flexibilidade da coluna e fortalece os músculos oblíquos.",
    tips: "Mantenha a respiração fluida. Gire a partir da cintura, mantendo os quadris fixos.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 5,
    timerRepetitions: 8,
    variations: {
      easier: "Diminua a amplitude do movimento.",
      harder: "Aumente o tempo de permanência em cada lado para 10 segundos.",
    },
  },
  {
    id: "coordenacao-60-1",
    title: "Coordenação Cruzada",
    category: "Coordenação",
    steps: [
      "Em pé, toque o joelho direito com a mão esquerda, levantando o joelho.",
      "Retorne à posição inicial.",
      "Toque o joelho esquerdo com a mão direita.",
      "Repita alternando os lados por 1 minuto.",
    ],
    benefits: "Melhora a coordenação entre os hemisférios cerebrais e o equilíbrio dinâmico.",
    tips: "Comece devagar e aumente o ritmo conforme se sentir confortável. Use apoio se necessário.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 60,
    timerRepetitions: 1,
    variations: {
      easier: "Realize o exercício sentado em uma cadeira.",
      harder: "Adicione um pequeno salto entre cada movimento.",
    },
  },
  {
    id: "forca-60-2",
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
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
    timerSeconds: 0,
    timerRepetitions: 12,
    variations: {
      easier: "Aproxime-se mais da parede.",
      harder: "Afaste-se mais da parede ou faça em uma superfície mais baixa, como uma mesa.",
    },
  },
  {
    id: "forca-60-3",
    title: "Elevação de Panturrilha",
    category: "Fortalecimento",
    steps: [
      "Fique em pé, apoiando-se levemente em uma cadeira ou parede.",
      "Levante os calcanhares, ficando na ponta dos pés.",
      "Mantenha por 2 segundos e abaixe lentamente.",
      "Repita 15 vezes.",
    ],
    benefits: "Fortalece os músculos da panturrilha, importantes para caminhar e subir escadas.",
    tips: "Mantenha o corpo ereto. Não bloqueie os joelhos durante o exercício.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 0,
    timerRepetitions: 15,
    variations: {
      easier: "Faça o exercício sentado, levantando apenas a parte da frente dos pés.",
      harder: "Faça o exercício com apenas uma perna de cada vez.",
    },
  },
  {
    id: "equilibrio-60-2",
    title: "Caminhada em Linha Reta",
    category: "Equilíbrio",
    steps: [
      "Imagine uma linha reta no chão ou use uma linha existente.",
      "Caminhe sobre a linha, colocando um pé diretamente na frente do outro.",
      "Mantenha os braços estendidos para os lados para ajudar no equilíbrio.",
      "Caminhe por 10-15 passos, vire-se e retorne.",
    ],
    benefits: "Melhora o equilíbrio dinâmico e a coordenação.",
    tips: "Olhe para um ponto fixo à frente, não para os pés. Tenha um apoio próximo se necessário.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 0,
    timerRepetitions: 2,
    variations: {
      easier: "Caminhe ao lado da linha, não sobre ela.",
      harder: "Tente fazer o exercício com os olhos fechados por alguns passos.",
    },
  },
  {
    id: "cardio-60-2",
    title: "Dança Livre",
    category: "Cardiovascular",
    steps: [
      "Coloque uma música que goste com ritmo moderado.",
      "Dance livremente, movimentando braços e pernas.",
      "Varie os movimentos: passos para os lados, para frente e para trás.",
      "Continue por 3-5 minutos.",
    ],
    benefits: "Aumenta a frequência cardíaca, melhora o humor e a coordenação.",
    tips: "Mova-se no seu próprio ritmo. Tenha um apoio próximo se necessário.",
    difficulty: "moderado",
    recommendedAges: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    timerSeconds: 180,
    timerRepetitions: 1,
    variations: {
      easier: "Dance sentado, movimentando principalmente os braços.",
      harder: "Adicione movimentos mais amplos e giros suaves.",
    },
  },

  // FAIXA ETÁRIA 70-79 ANOS
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
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
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
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
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
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Mantenha ambos os pés no chão, apenas transferindo o peso.",
      harder: "Levante mais o pé ou reduza o apoio na cadeira.",
    },
  },
  {
    id: "cardio-70-1",
    title: "Marcha Sentada com Braços",
    category: "Cardiovascular",
    steps: [
      "Sente-se na borda de uma cadeira firme, costas retas.",
      "Levante os joelhos alternadamente, como se estivesse marchando.",
      "Sincronize o movimento dos braços, como numa caminhada.",
      "Continue por 2-3 minutos em ritmo moderado.",
    ],
    benefits: "Aumenta a frequência cardíaca e melhora a circulação sem impacto nas articulações.",
    tips: "Mantenha um ritmo constante. Respire naturalmente durante o exercício.",
    difficulty: "facil",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
    timerSeconds: 120,
    timerRepetitions: 1,
    variations: {
      easier: "Reduza a altura ao levantar os joelhos.",
      harder: "Aumente o ritmo ou o tempo do exercício.",
    },
  },
  {
    id: "flexibilidade-70-1",
    title: "Alongamento de Peito e Costas",
    category: "Flexibilidade",
    steps: [
      "Sente-se em uma cadeira firme, costas afastadas do encosto.",
      "Entrelace os dedos atrás das costas e estique os braços.",
      "Mantenha por 15 segundos, respirando normalmente.",
      "Relaxe e repita 3 vezes.",
    ],
    benefits: "Melhora a postura e alivia a tensão nos ombros e parte superior das costas.",
    tips: "Não force além do confortável. Mantenha o peito aberto e os ombros relaxados.",
    difficulty: "moderado",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    timerSeconds: 15,
    timerRepetitions: 3,
    variations: {
      easier: "Se não conseguir entrelaçar os dedos, segure uma toalha com as duas mãos.",
      harder: "Incline-se levemente para frente durante o alongamento.",
    },
  },
  {
    id: "coordenacao-70-1",
    title: "Sequência de Dedos",
    category: "Coordenação",
    steps: [
      "Sentado confortavelmente, toque o polegar no indicador, depois no médio, anelar e mínimo.",
      "Faça a sequência inversa, do mínimo ao indicador.",
      "Repita com a outra mão.",
      "Tente aumentar gradualmente a velocidade. Faça por 1 minuto com cada mão.",
    ],
    benefits: "Melhora a coordenação motora fina e a função cognitiva.",
    tips: "Concentre-se nos movimentos. Tente fazer sem olhar para os dedos conforme avança.",
    difficulty: "facil",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    timerSeconds: 60,
    timerRepetitions: 1,
    variations: {
      easier: "Faça mais lentamente, focando na precisão.",
      harder: "Tente fazer a sequência com as duas mãos simultaneamente.",
    },
  },
  {
    id: "forca-70-2",
    title: "Elevação Lateral de Braços",
    category: "Fortalecimento",
    steps: [
      "Sente-se em uma cadeira firme, pés apoiados no chão.",
      "Segure pesos leves (ou garrafas de água) em cada mão, braços ao lado do corpo.",
      "Levante os braços lateralmente até a altura dos ombros.",
      "Abaixe lentamente. Repita 8-10 vezes.",
    ],
    benefits: "Fortalece os músculos dos ombros, importantes para atividades diárias como vestir-se.",
    tips: "Mantenha os cotovelos levemente flexionados. Não levante os braços acima da altura dos ombros.",
    difficulty: "moderado",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    timerSeconds: 0,
    timerRepetitions: 8,
    variations: {
      easier: "Use pesos mais leves ou nenhum peso.",
      harder: "Aumente o peso ou o número de repetições.",
    },
  },
  {
    id: "forca-70-3",
    title: "Flexão de Bíceps Sentado",
    category: "Fortalecimento",
    steps: [
      "Sente-se em uma cadeira firme com as costas retas.",
      "Segure pesos leves (ou garrafas de água) em cada mão, braços estendidos ao lado do corpo.",
      "Dobre os cotovelos, trazendo os pesos em direção aos ombros.",
      "Abaixe lentamente. Repita 10-12 vezes.",
    ],
    benefits: "Fortalece os músculos dos braços, importantes para carregar objetos e realizar tarefas diárias.",
    tips: "Mantenha os cotovelos próximos ao corpo. Não balance o corpo para ajudar no movimento.",
    difficulty: "moderado",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    timerSeconds: 0,
    timerRepetitions: 10,
    variations: {
      easier: "Use pesos mais leves ou nenhum peso.",
      harder: "Aumente o peso ou faça o movimento mais lentamente.",
    },
  },
  {
    id: "equilibrio-70-2",
    title: "Equilíbrio com Apoio Reduzido",
    category: "Equilíbrio",
    steps: [
      "Fique em pé ao lado de uma cadeira, segurando levemente com apenas dois dedos.",
      "Mantenha a postura ereta e olhe para um ponto fixo à frente.",
      "Tente reduzir gradualmente o apoio na cadeira.",
      "Mantenha a posição por 20-30 segundos.",
    ],
    benefits: "Melhora o equilíbrio estático e a consciência corporal.",
    tips: "Respire normalmente. Retome o apoio completo se sentir instabilidade.",
    difficulty: "moderado",
    recommendedAges: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    timerSeconds: 20,
    timerRepetitions: 3,
    variations: {
      easier: "Mantenha mais apoio na cadeira.",
      harder: "Tente ficar sem apoio por alguns segundos.",
    },
  },

  // FAIXA ETÁRIA 80+ ANOS
  {
    id: "aquecimento-80-1",
    title: "Respiração com Movimento de Braços",
    category: "Aquecimento",
    steps: [
      "Sentado em uma cadeira firme, inspire profundamente enquanto levanta os braços à frente até a altura dos ombros.",
      "Expire lentamente enquanto abaixa os braços.",
      "Repita o movimento, desta vez abrindo os braços para os lados ao inspirar.",
      "Continue alternando os movimentos por 1-2 minutos.",
    ],
    benefits: "Melhora a capacidade respiratória e aquece suavemente os músculos dos braços e ombros.",
    tips: "Concentre-se na respiração profunda. Mantenha os movimentos lentos e controlados.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 60,
    timerRepetitions: 1,
    variations: {
      easier: "Reduza a amplitude do movimento dos braços.",
      harder: "Aumente o tempo do exercício para 3 minutos.",
    },
  },
  {
    id: "forca-80-1",
    title: "Aperto de Bola",
    category: "Fortalecimento",
    steps: [
      "Sentado confortavelmente, segure uma bola macia ou uma bolinha anti-estresse.",
      "Aperte a bola com força por 3 segundos.",
      "Relaxe por 3 segundos.",
      "Repita 10 vezes com cada mão.",
    ],
    benefits: "Fortalece os músculos das mãos e antebraços, melhorando a capacidade de segurar objetos.",
    tips: "Respire normalmente durante o exercício. Não prenda a respiração ao apertar.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 3,
    timerRepetitions: 10,
    variations: {
      easier: "Use uma bola mais macia.",
      harder: "Aumente o tempo de aperto para 5 segundos ou use uma bola mais firme.",
    },
  },
  {
    id: "equilibrio-80-1",
    title: "Elevação de Calcanhares Sentado",
    category: "Equilíbrio",
    steps: [
      "Sente-se na borda de uma cadeira firme, pés apoiados no chão.",
      "Levante os calcanhares, mantendo as pontas dos pés no chão.",
      "Mantenha por 3 segundos e abaixe lentamente.",
      "Repita 10 vezes.",
    ],
    benefits: "Fortalece os músculos da panturrilha e melhora o equilíbrio para ficar em pé e caminhar.",
    tips: "Mantenha as costas retas. Use as mãos para apoio na cadeira se necessário.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 3,
    timerRepetitions: 10,
    variations: {
      easier: "Reduza o tempo de elevação para 1-2 segundos.",
      harder: "Tente fazer o exercício com um pé de cada vez.",
    },
  },
  {
    id: "cardio-80-1",
    title: "Batida de Pés e Mãos",
    category: "Cardiovascular",
    steps: [
      "Sentado em uma cadeira firme, bata os pés alternadamente no chão em ritmo moderado.",
      "Adicione palmas no mesmo ritmo.",
      "Continue por 30-60 segundos.",
      "Descanse e repita 2-3 vezes.",
    ],
    benefits: "Aumenta levemente a frequência cardíaca e melhora a circulação.",
    tips: "Mantenha um ritmo confortável. Pare se sentir falta de ar ou desconforto.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 30,
    timerRepetitions: 2,
    variations: {
      easier: "Bata apenas os pés ou apenas as mãos.",
      harder: "Crie padrões rítmicos mais complexos ou aumente o tempo.",
    },
  },
  {
    id: "flexibilidade-80-1",
    title: "Alongamento de Pescoço Sentado",
    category: "Flexibilidade",
    steps: [
      "Sentado com as costas retas, incline lentamente a cabeça para o lado direito.",
      "Mantenha por 10 segundos, sentindo o alongamento no lado esquerdo do pescoço.",
      "Volte ao centro e repita para o lado esquerdo.",
      "Faça 3 repetições para cada lado.",
    ],
    benefits: "Alivia a tensão no pescoço e ombros, melhorando a mobilidade da região cervical.",
    tips: "Faça movimentos suaves. Não force o alongamento se sentir dor.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 10,
    timerRepetitions: 3,
    variations: {
      easier: "Reduza o tempo de alongamento para 5 segundos.",
      harder: "Adicione uma leve pressão com a mão na lateral da cabeça.",
    },
  },
  {
    id: "coordenacao-80-1",
    title: "Exercício de Memória e Movimento",
    category: "Coordenação",
    steps: [
      "Sentado confortavelmente, crie uma sequência simples de movimentos (ex: bater palmas, tocar os ombros, levantar as mãos).",
      "Pratique a sequência algumas vezes.",
      "Tente repetir a sequência de memória.",
      "Aumente gradualmente a complexidade da sequência.",
    ],
    benefits: "Estimula a memória e a coordenação motora, beneficiando a função cognitiva.",
    tips: "Comece com sequências muito simples. Não se preocupe com erros, o importante é o processo.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 0,
    timerRepetitions: 0,
    variations: {
      easier: "Use apenas 2-3 movimentos na sequência.",
      harder: "Adicione mais movimentos ou crie padrões rítmicos.",
    },
  },
  {
    id: "forca-80-2",
    title: "Fortalecimento Abdominal Sentado",
    category: "Fortalecimento",
    steps: [
      "Sente-se na borda da cadeira, costas retas, pés apoiados no chão.",
      "Coloque as mãos sobre o abdômen.",
      "Contraia os músculos abdominais por 5 segundos, como se estivesse puxando o umbigo em direção às costas.",
      "Relaxe e repita 8-10 vezes.",
    ],
    benefits: "Fortalece os músculos abdominais, importantes para a postura e estabilidade do tronco.",
    tips: "Respire normalmente durante a contração. Mantenha os ombros relaxados.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 5,
    timerRepetitions: 8,
    variations: {
      easier: "Reduza o tempo de contração para 3 segundos.",
      harder: "Incline-se levemente para trás enquanto contrai os abdominais.",
    },
  },
  {
    id: "forca-80-3",
    title: "Elevação de Braços Sentado",
    category: "Fortalecimento",
    steps: [
      "Sente-se em uma cadeira firme com as costas retas.",
      "Estenda os braços à frente, na altura dos ombros.",
      "Levante os braços acima da cabeça lentamente.",
      "Abaixe de volta à posição inicial. Repita 8 vezes.",
    ],
    benefits: "Fortalece os músculos dos ombros e melhora a amplitude de movimento dos braços.",
    tips: "Mantenha os ombros relaxados. Se sentir desconforto, não levante os braços acima da cabeça.",
    difficulty: "facil",
    recommendedAges: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    timerSeconds: 0,
    timerRepetitions: 8,
    variations: {
      easier: "Reduza a amplitude do movimento.",
      harder: "Segure pequenos pesos ou garrafas de água durante o exercício.",
    },
  },
]

// Treinos organizados por faixa etária e semana
// Função para obter o treino específico para a semana e faixa etária
export function getWorkoutForWeekAndAge(ageGroup: string, week: number): WorkoutType {
  // Treinos para faixa etária 60-69 anos
  const workouts6069 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 60-69 anos",
      description: "Treino de adaptação com exercícios básicos para desenvolver força e equilíbrio.",
      exercises: [
        "aquecimento-60-1", // Marcha Dinâmica
        "forca-60-1", // Agachamento com Cadeira
        "equilibrio-60-1", // Equilíbrio Unipodal com Movimento
        "flexibilidade-60-1", // Alongamento Dinâmico de Tronco
        "forca-60-2", // Flexão de Braço na Parede
      ],
      frequency: "2-3 vezes por semana",
      duration: "20-30 minutos por sessão",
      tips: "Foque na técnica correta. Descanse entre os exercícios conforme necessário.",
    },
    // Semanas 3-4
    3: {
      title: "Treino de Progressão para 60-69 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: [
        "aquecimento-60-1", // Marcha Dinâmica
        "forca-60-2", // Flexão de Braço na Parede
        "equilibrio-60-2", // Caminhada em Linha Reta
        "cardio-60-1", // Caminhada com Mudanças de Direção
        "flexibilidade-60-1", // Alongamento Dinâmico de Tronco
        "forca-60-1", // Agachamento com Cadeira
      ],
      frequency: "3 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    // Semanas 5-6
    5: {
      title: "Treino Intermediário para 60-69 anos",
      description: "Treino com foco em resistência e coordenação, com exercícios mais desafiadores.",
      exercises: [
        "cardio-60-1", // Caminhada com Mudanças de Direção
        "forca-60-1", // Agachamento com Cadeira
        "forca-60-3", // Elevação de Panturrilha
        "equilibrio-60-2", // Caminhada em Linha Reta
        "coordenacao-60-1", // Coordenação Cruzada
        "flexibilidade-60-1", // Alongamento Dinâmico de Tronco
      ],
      frequency: "3-4 vezes por semana",
      duration: "30-40 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Reduza o tempo de descanso entre exercícios.",
    },
    // Semanas 7-8
    7: {
      title: "Treino Avançado para 60-69 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo.",
      exercises: [
        "cardio-60-2", // Dança Livre
        "forca-60-3", // Elevação de Panturrilha
        "forca-60-1", // Agachamento com Cadeira
        "equilibrio-60-1", // Equilíbrio Unipodal com Movimento
        "coordenacao-60-1", // Coordenação Cruzada
        "forca-60-2", // Flexão de Braço na Parede
        "flexibilidade-60-1", // Alongamento Dinâmico de Tronco
      ],
      frequency: "3-4 vezes por semana",
      duration: "35-45 minutos por sessão",
      tips: "Considere adicionar pequenos pesos em alguns exercícios. Alterne dias de maior e menor intensidade.",
    },
    // Semanas 9-10
    9: {
      title: "Treino de Alta Intensidade para 60-69 anos",
      description: "Treino completo com exercícios variados e desafiadores para maximizar os resultados.",
      exercises: [
        "cardio-60-2", // Dança Livre
        "forca-60-3", // Elevação de Panturrilha
        "equilibrio-60-2", // Caminhada em Linha Reta
        "forca-60-1", // Agachamento com Cadeira
        "cardio-60-1", // Caminhada com Mudanças de Direção
        "forca-60-2", // Flexão de Braço na Parede
        "equilibrio-60-1", // Equilíbrio Unipodal com Movimento
        "flexibilidade-60-1", // Alongamento Dinâmico de Tronco
      ],
      frequency: "4 vezes por semana",
      duration: "40-50 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    // Semanas 11-12
    11: {
      title: "Treino de Manutenção para 60-69 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: [
        "aquecimento-60-1", // Marcha Dinâmica
        "cardio-60-2", // Dança Livre
        "forca-60-1", // Agachamento com Cadeira
        "forca-60-3", // Elevação de Panturrilha
        "equilibrio-60-1", // Equilíbrio Unipodal com Movimento
        "cardio-60-1", // Caminhada com Mudanças de Direção
        "forca-60-2", // Flexão de Braço na Parede
        "coordenacao-60-1", // Coordenação Cruzada
        "flexibilidade-60-1", // Alongamento Dinâmico de Tronco
      ],
      frequency: "3-4 vezes por semana",
      duration: "45-60 minutos por sessão",
      tips: "Alterne entre dias de maior e menor intensidade. Inclua dias de descanso ativo com caminhadas leves.",
    },
  }

  // Treinos para faixa etária 70-79 anos
  const workouts7079 = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 70-79 anos",
      description: "Treino de adaptação com exercícios básicos e seguros para desenvolver força e mobilidade.",
      exercises: [
        "aquecimento-70-1", // Círculos Articulares
        "forca-70-1", // Extensão de Joelhos Sentado
        "equilibrio-70-1", // Transferência de Peso Lateral
        "flexibilidade-70-1", // Alongamento de Peito e Costas
      ],
      frequency: "2 vezes por semana",
      duration: "15-20 minutos por sessão",
      tips: "Foque na técnica correta. Faça pausas sempre que necessário.",
    },
    // Semanas 3-4
    3: {
      title: "Treino de Progressão para 70-79 anos",
      description: "Treino com novos exercícios e aumento gradual de intensidade.",
      exercises: [
        "aquecimento-70-1", // Círculos Articulares
        "cardio-70-1", // Marcha Sentada com Braços
        "forca-70-1", // Extensão de Joelhos Sentado
        "equilibrio-70-1", // Transferência de Peso Lateral
        "flexibilidade-70-1", // Alongamento de Peito e Costas
      ],
      frequency: "2-3 vezes por semana",
      duration: "20-25 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Mantenha-se hidratado durante o treino.",
    },
    // Semanas 5-6
    5: {
      title: "Treino Intermediário para 70-79 anos",
      description: "Treino com foco em resistência e coordenação, com exercícios mais variados.",
      exercises: [
        "aquecimento-70-1", // Círculos Articulares
        "cardio-70-1", // Marcha Sentada com Braços
        "forca-70-2", // Elevação Lateral de Braços
        "coordenacao-70-1", // Sequência de Dedos
        "equilibrio-70-1", // Transferência de Peso Lateral
        "flexibilidade-70-1", // Alongamento de Peito e Costas
      ],
      frequency: "3 vezes por semana",
      duration: "25-30 minutos por sessão",
      tips: "Adicione uma segunda série nos exercícios que já domina bem. Faça pausas quando necessário.",
    },
    // Semanas 7-8
    7: {
      title: "Treino Avançado para 70-79 anos",
      description: "Treino com maior intensidade e exercícios combinados para desafiar o corpo de forma segura.",
      exercises: [
        "cardio-70-1", // Marcha Sentada com Braços
        "forca-70-3", // Flexão de Bíceps Sentado
        "forca-70-1", // Extensão de Joelhos Sentado
        "equilibrio-70-2", // Equilíbrio com Apoio Reduzido
        "coordenacao-70-1", // Sequência de Dedos
        "flexibilidade-70-1", // Alongamento de Peito e Costas
      ],
      frequency: "3 vezes por semana",
      duration: "30-35 minutos por sessão",
      tips: "Considere adicionar pequenos pesos em alguns exercícios. Foque na qualidade dos movimentos.",
    },
    // Semanas 9-10
    9: {
      title: "Treino de Alta Intensidade para 70-79 anos",
      description: "Treino completo com exercícios variados para maximizar os resultados de forma segura.",
      exercises: [
        "aquecimento-70-1", // Círculos Articulares
        "cardio-70-1", // Marcha Sentada com Braços
        "forca-70-2", // Elevação Lateral de Braços
        "forca-70-3", // Flexão de Bíceps Sentado
        "equilibrio-70-2", // Equilíbrio com Apoio Reduzido
        "forca-70-1", // Extensão de Joelhos Sentado
        "coordenacao-70-1", // Sequência de Dedos
        "flexibilidade-70-1", // Alongamento de Peito e Costas
      ],
      frequency: "3 vezes por semana",
      duration: "35-40 minutos por sessão",
      tips: "Experimente variações mais desafiadoras dos exercícios. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    // Semanas 11-12
    11: {
      title: "Treino de Manutenção para 70-79 anos",
      description: "Treino completo para manter os ganhos e continuar progredindo de forma sustentável.",
      exercises: [
        "aquecimento-70-1", // Círculos Articulares
        "cardio-70-1", // Marcha Sentada com Braços
        "forca-70-3", // Flexão de Bíceps Sentado
        "equilibrio-70-1", // Transferência de Peso Lateral
        "forca-70-2", // Elevação Lateral de Braços
        "equilibrio-70-2", // Equilíbrio com Apoio Reduzido
        "forca-70-1", // Extensão de Joelhos Sentado
        "coordenacao-70-1", // Sequência de Dedos
        "flexibilidade-70-1", // Alongamento de Peito e Costas
      ],
      frequency: "3 vezes por semana",
      duration: "40-45 minutos por sessão",
      tips: "Divida o treino em sessões menores ao longo do dia se necessário. Inclua dias de descanso ativo.",
    },
  }

  // Treinos para faixa etária 80+ anos
  const workouts80Plus = {
    // Semanas 1-2
    1: {
      title: "Treino Inicial para 80+ anos",
      description: "Treino de adaptação com exercícios simples e seguros para melhorar a mobilidade.",
      exercises: [
        "aquecimento-80-1", // Respiração com Movimento de Braços
        "forca-80-1", // Aperto de Bola
        "equilibrio-80-1", // Elevação de Calcanhares Sentado
        "flexibilidade-80-1", // Alongamento de Pescoço Sentado
      ],
      frequency: "2 vezes por semana",
      duration: "10-15 minutos por sessão",
      tips: "Foque na técnica correta. Faça pausas sempre que necessário.",
    },
    // Semanas 3-4
    3: {
      title: "Treino de Progressão para 80+ anos",
      description: "Treino com pequeno aumento de intensidade e novos exercícios.",
      exercises: [
        "aquecimento-80-1", // Respiração com Movimento de Braços
        "forca-80-1", // Aperto de Bola
        "cardio-80-1", // Batida de Pés e Mãos
        "equilibrio-80-1", // Elevação de Calcanhares Sentado
        "flexibilidade-80-1", // Alongamento de Pescoço Sentado
      ],
      frequency: "2 vezes por semana",
      duration: "15-20 minutos por sessão",
      tips: "Aumente gradualmente o número de repetições. Faça os exercícios em seu próprio ritmo.",
    },
    // Semanas 5-6
    5: {
      title: "Treino Intermediário para 80+ anos",
      description: "Treino com foco em coordenação e força, com exercícios mais variados.",
      exercises: [
        "aquecimento-80-1", // Respiração com Movimento de Braços
        "forca-80-3", // Elevação de Braços Sentado
        "cardio-80-1", // Batida de Pés e Mãos
        "coordenacao-80-1", // Exercício de Memória e Movimento
        "equilibrio-80-1", // Elevação de Calcanhares Sentado
        "flexibilidade-80-1", // Alongamento de Pescoço Sentado
      ],
      frequency: "2-3 vezes por semana",
      duration: "20-25 minutos por sessão",
      tips: "Divida o treino em sessões menores ao longo do dia se necessário. Priorize o conforto e segurança.",
    },
    // Semanas 7-8
    7: {
      title: "Treino Avançado para 80+ anos",
      description: "Treino com maior variedade de exercícios para desafiar o corpo de forma segura.",
      exercises: [
        "aquecimento-80-1", // Respiração com Movimento de Braços
        "forca-80-2", // Fortalecimento Abdominal Sentado
        "forca-80-1", // Aperto de Bola
        "cardio-80-1", // Batida de Pés e Mãos
        "coordenacao-80-1", // Exercício de Memória e Movimento
        "flexibilidade-80-1", // Alongamento de Pescoço Sentado
      ],
      frequency: "3 vezes por semana",
      duration: "20-30 minutos por sessão",
      tips: "Foque na qualidade dos movimentos. Tenha sempre alguém por perto durante os exercícios.",
    },
    // Semanas 9-10
    9: {
      title: "Treino Completo para 80+ anos",
      description: "Treino integrado com todos os componentes importantes para a saúde e funcionalidade.",
      exercises: [
        "aquecimento-80-1", // Respiração com Movimento de Braços
        "forca-80-3", // Elevação de Braços Sentado
        "cardio-80-1", // Batida de Pés e Mãos
        "forca-80-1", // Aperto de Bola
        "equilibrio-80-1", // Elevação de Calcanhares Sentado
        "coordenacao-80-1", // Exercício de Memória e Movimento
        "flexibilidade-80-1", // Alongamento de Pescoço Sentado
      ],
      frequency: "3 vezes por semana",
      duration: "25-35 minutos por sessão",
      tips: "Divida o treino em sessões menores ao longo do dia. Mantenha um diário de treino para acompanhar seu progresso.",
    },
    // Semanas 11-12
    11: {
      title: "Treino de Manutenção para 80+ anos",
      description: "Treino completo para manter os ganhos e continuar ativo de forma sustentável.",
      exercises: [
        "aquecimento-80-1", // Respiração com Movimento de Braços
        "forca-80-3", // Elevação de Braços Sentado
        "cardio-80-1", // Batida de Pés e Mãos
        "forca-80-2", // Fortalecimento Abdominal Sentado
        "forca-80-1", // Aperto de Bola
        "equilibrio-80-1", // Elevação de Calcanhares Sentado
        "coordenacao-80-1", // Exercício de Memória e Movimento
        "flexibilidade-80-1", // Alongamento de Pescoço Sentado
      ],
      frequency: "3 vezes por semana",
      duration: "30-40 minutos por sessão (divididos em sessões menores)",
      tips: "Alterne entre exercícios mais e menos intensos. Tenha sempre alguém por perto durante os exercícios.",
    },
  }

  // Seleciona o conjunto de treinos com base na faixa etária
  let workouts
  switch (ageGroup) {
    case "60-69":
      workouts = workouts6069
      break
    case "70-79":
      workouts = workouts7079
      break
    case "80+":
      workouts = workouts80Plus
      break
    default:
      workouts = workouts6069
  }

  // Encontra o treino adequado para a semana atual
  const workoutWeek =
    Object.keys(workouts)
      .map(Number)
      .filter((w) => w <= week)
      .sort((a, b) => b - a)[0] || 1

  return workouts[workoutWeek as keyof typeof workouts]
}

// Treinos organizados por faixa etária (mantido para compatibilidade)
export const ageGroupWorkouts = {
  "60-69": {
    title: "Treino para Idosos de 60-69 anos",
    description:
      "Este treino é voltado para idosos mais ativos, com foco em fortalecimento muscular, equilíbrio dinâmico e exercícios cardiovasculares moderados.",
    exercises: [
      "aquecimento-60-1", // Marcha Dinâmica
      "forca-60-1", // Agachamento com Cadeira
      "equilibrio-60-1", // Equilíbrio Unipodal com Movimento
      "cardio-60-1", // Caminhada com Mudanças de Direção
      "flexibilidade-60-1", // Alongamento Dinâmico de Tronco
      "coordenacao-60-1", // Coordenação Cruzada
      "forca-60-2", // Flexão de Braço na Parede
    ],
    frequency: "3-4 vezes por semana",
    duration: "30-45 minutos por sessão",
    tips: "Mantenha-se bem hidratado durante o treino. Descanse 30-60 segundos entre os exercícios. Aumente gradualmente a intensidade conforme sua adaptação.",
  },
  "70-79": {
    title: "Treino para Idosos de 70-79 anos",
    description:
      "Este treino é adaptado para idosos com mobilidade moderada, priorizando exercícios de equilíbrio, fortalecimento suave e coordenação.",
    exercises: [
      "aquecimento-70-1", // Círculos Articulares
      "forca-70-1", // Extensão de Joelhos Sentado
      "equilibrio-70-1", // Transferência de Peso Lateral
      "cardio-70-1", // Marcha Sentada com Braços
      "flexibilidade-70-1", // Alongamento de Peito e Costas
      "coordenacao-70-1", // Sequência de Dedos
      "forca-70-2", // Elevação Lateral de Braços
    ],
    frequency: "2-3 vezes por semana",
    duration: "20-30 minutos por sessão",
    tips: "Faça pausas quando necessário. Foque na qualidade dos movimentos, não na velocidade. Use sempre apoio para exercícios em pé se sentir insegurança.",
  },
  "80+": {
    title: "Treino para Idosos de 80+ anos",
    description:
      "Este treino é especialmente desenvolvido para idosos com mobilidade reduzida, com exercícios predominantemente sentados, focando na manutenção da funcionalidade.",
    exercises: [
      "aquecimento-80-1", // Respiração com Movimento de Braços
      "forca-80-1", // Aperto de Bola
      "equilibrio-80-1", // Elevação de Calcanhares Sentado
      "cardio-80-1", // Batida de Pés e Mãos
      "flexibilidade-80-1", // Alongamento de Pescoço Sentado
      "coordenacao-80-1", // Exercício de Memória e Movimento
      "forca-80-2", // Fortalecimento Abdominal Sentado
    ],
    frequency: "2-3 vezes por semana",
    duration: "15-20 minutos por sessão",
    tips: "Divida o treino em sessões menores ao longo do dia se necessário. Priorize o conforto e segurança. Tenha sempre alguém por perto durante os exercícios.",
  },
}
