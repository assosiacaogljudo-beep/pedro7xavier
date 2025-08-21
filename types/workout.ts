export type ExerciseCategory =
  | "peito"
  | "costas"
  | "pernas"
  | "ombros"
  | "braços"
  | "abdômen"
  | "cardio"
  | "alongamento"
  | "funcional"

export type Equipment =
  | "nenhum"
  | "halteres"
  | "barra"
  | "máquina"
  | "cabo"
  | "kettlebell"
  | "bola"
  | "elástico"
  | "banco"
  | "esteira"
  | "bicicleta"

export type Difficulty = "iniciante" | "intermediário" | "avançado"

export type WorkoutCategory =
  | "força"
  | "hipertrofia"
  | "resistência"
  | "cardio"
  | "funcional"
  | "reabilitação"
  | "adaptação"
  | "outro"

export interface Exercise {
  id: string
  name: string
  category: ExerciseCategory
  equipment: Equipment[]
  difficulty: Difficulty
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  tips?: string[]
  image?: string
}

export interface ExerciseInWorkout {
  exercise: Exercise
  sets: number
  reps?: number
  time?: number
  load?: number
  rest: number
  notes?: string
}

export interface Workout {
  id: string
  name: string
  description?: string
  category: WorkoutCategory
  difficulty: Difficulty
  exercises: ExerciseInWorkout[]
  createdAt: Date
  updatedAt: Date
  duration: number
}
