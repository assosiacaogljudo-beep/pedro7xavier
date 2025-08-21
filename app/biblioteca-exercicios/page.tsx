"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dumbbell, Info, Plus, Save, Trash } from "lucide-react"

interface SimpleExercise {
  id: string
  name: string
  sets: string
  reps: string
  time: string
  load: string
  rest: string
  notes: string
}

interface SimpleWorkout {
  id: string
  name: string
  description: string
  category: string
  difficulty: string
  exercises: SimpleExercise[]
  createdAt: Date
  updatedAt: Date
}

export default function BibliotecaExercicios() {
  // Estados para o construtor de treinos
  const [workoutName, setWorkoutName] = useState("")
  const [workoutCategory, setWorkoutCategory] = useState("hipertrofia")
  const [workoutDifficulty, setWorkoutDifficulty] = useState("intermediário")
  const [workoutDescription, setWorkoutDescription] = useState("")
  const [workoutExercises, setWorkoutExercises] = useState<SimpleExercise[]>([])

  // Estados para adicionar exercício
  const [exerciseName, setExerciseName] = useState("")
  const [exerciseSets, setExerciseSets] = useState("")
  const [exerciseReps, setExerciseReps] = useState("")
  const [exerciseTime, setExerciseTime] = useState("")
  const [exerciseLoad, setExerciseLoad] = useState("")
  const [exerciseRest, setExerciseRest] = useState("")
  const [exerciseNotes, setExerciseNotes] = useState("")

  // Estados para treinos salvos
  const [savedWorkouts, setSavedWorkouts] = useState<SimpleWorkout[]>([
    // Treinos Adaptativos
    {
      id: "adaptive-1",
      name: "Treino Adaptativo - Mobilidade e Força",
      description:
        "Treino focado em mobilidade articular e fortalecimento funcional para idosos ou pessoas com limitações físicas",
      category: "adaptação",
      difficulty: "iniciante",
      exercises: [
        {
          id: "ex1",
          name: "Marcha estacionária",
          sets: "3",
          reps: "30 passos",
          time: "1 minuto",
          load: "peso corporal",
          rest: "30s",
          notes: "Manter postura ereta, elevar bem os joelhos",
        },
        {
          id: "ex2",
          name: "Elevação de braços sentado",
          sets: "2",
          reps: "15",
          time: "",
          load: "sem peso",
          rest: "30s",
          notes: "Movimento lento e controlado, respirar durante o exercício",
        },
        {
          id: "ex3",
          name: "Flexão de pernas sentado",
          sets: "2",
          reps: "12 cada perna",
          time: "",
          load: "peso corporal",
          rest: "45s",
          notes: "Segurar na cadeira para apoio se necessário",
        },
        {
          id: "ex4",
          name: "Rotação de ombros",
          sets: "2",
          reps: "10 para frente, 10 para trás",
          time: "",
          load: "sem peso",
          rest: "30s",
          notes: "Movimento amplo e suave",
        },
        {
          id: "ex5",
          name: "Alongamento cervical",
          sets: "1",
          reps: "4 direções",
          time: "15s cada",
          load: "sem peso",
          rest: "15s",
          notes: "Movimento lento, sem forçar",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "adaptive-2",
      name: "Treino Adaptativo - Equilíbrio e Coordenação",
      description: "Exercícios para melhorar equilíbrio, coordenação e prevenção de quedas",
      category: "adaptação",
      difficulty: "iniciante",
      exercises: [
        {
          id: "ex1",
          name: "Apoio unipodal com apoio",
          sets: "3",
          reps: "30s cada perna",
          time: "30 segundos",
          load: "peso corporal",
          rest: "30s",
          notes: "Segurar em cadeira ou parede para apoio",
        },
        {
          id: "ex2",
          name: "Caminhada em linha reta",
          sets: "3",
          reps: "10 passos",
          time: "",
          load: "peso corporal",
          rest: "45s",
          notes: "Um pé na frente do outro, braços abertos para equilíbrio",
        },
        {
          id: "ex3",
          name: "Elevação lateral de pernas",
          sets: "2",
          reps: "10 cada perna",
          time: "",
          load: "peso corporal",
          rest: "30s",
          notes: "Segurar em apoio, movimento controlado",
        },
        {
          id: "ex4",
          name: "Flexão plantar sentado",
          sets: "2",
          reps: "15",
          time: "",
          load: "peso corporal",
          rest: "30s",
          notes: "Subir e descer as pontas dos pés",
        },
        {
          id: "ex5",
          name: "Respiração diafragmática",
          sets: "2",
          reps: "10 respirações",
          time: "5s inspirar, 5s expirar",
          load: "sem peso",
          rest: "30s",
          notes: "Mão no peito e abdômen, respirar pelo nariz",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Peito e Tríceps 1
    {
      id: "chest-triceps-1",
      name: "Peito e Tríceps - Força",
      description: "Treino focado em desenvolvimento de força para peito e tríceps",
      category: "força",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Supino reto com barra",
          sets: "4",
          reps: "8-10",
          time: "",
          load: "70-80% 1RM",
          rest: "2-3min",
          notes: "Controlar a descida, explosão na subida",
        },
        {
          id: "ex2",
          name: "Supino inclinado com halteres",
          sets: "3",
          reps: "10-12",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Inclinação 30-45°, amplitude completa",
        },
        {
          id: "ex3",
          name: "Paralelas ou mergulho",
          sets: "3",
          reps: "máximo",
          time: "",
          load: "peso corporal",
          rest: "2min",
          notes: "Descer até 90° no cotovelo",
        },
        {
          id: "ex4",
          name: "Tríceps testa com barra",
          sets: "3",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Cotovelos fixos, movimento apenas do antebraço",
        },
        {
          id: "ex5",
          name: "Tríceps corda no cabo",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "leve a moderado",
          rest: "60s",
          notes: "Abrir a corda no final do movimento",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Peito e Tríceps 2
    {
      id: "chest-triceps-2",
      name: "Peito e Tríceps - Hipertrofia",
      description: "Treino voltado para hipertrofia de peito e tríceps com maior volume",
      category: "hipertrofia",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Supino inclinado com barra",
          sets: "4",
          reps: "10-12",
          time: "",
          load: "60-70% 1RM",
          rest: "90s",
          notes: "Foco na contração, tempo sob tensão",
        },
        {
          id: "ex2",
          name: "Crucifixo reto com halteres",
          sets: "3",
          reps: "12-15",
          time: "",
          load: "leve a moderado",
          rest: "75s",
          notes: "Movimento amplo, sentir o alongamento",
        },
        {
          id: "ex3",
          name: "Flexão de braços",
          sets: "3",
          reps: "máximo",
          time: "",
          load: "peso corporal",
          rest: "90s",
          notes: "Variações: normal, inclinada, declinada",
        },
        {
          id: "ex4",
          name: "Tríceps francês com halter",
          sets: "4",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "75s",
          notes: "Um halter com duas mãos, amplitude completa",
        },
        {
          id: "ex5",
          name: "Tríceps banco",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "peso corporal",
          rest: "60s",
          notes: "Pés no chão ou elevados para maior dificuldade",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Costas e Bíceps 1
    {
      id: "back-biceps-1",
      name: "Costas e Bíceps - Força",
      description: "Desenvolvimento de força para músculos das costas e bíceps",
      category: "força",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Barra fixa ou pulldown",
          sets: "4",
          reps: "6-8",
          time: "",
          load: "peso corporal ou pesado",
          rest: "2-3min",
          notes: "Pegada pronada, peito para fora",
        },
        {
          id: "ex2",
          name: "Remada curvada com barra",
          sets: "4",
          reps: "8-10",
          time: "",
          load: "70-80% 1RM",
          rest: "2min",
          notes: "Joelhos flexionados, core contraído",
        },
        {
          id: "ex3",
          name: "Remada unilateral com halter",
          sets: "3",
          reps: "10-12 cada braço",
          time: "",
          load: "moderado a pesado",
          rest: "90s",
          notes: "Apoio no banco, puxar até o quadril",
        },
        {
          id: "ex4",
          name: "Rosca direta com barra",
          sets: "3",
          reps: "10-12",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Cotovelos fixos, movimento controlado",
        },
        {
          id: "ex5",
          name: "Rosca martelo",
          sets: "3",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "75s",
          notes: "Pegada neutra, alternar ou simultâneo",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Costas e Bíceps 2
    {
      id: "back-biceps-2",
      name: "Costas e Bíceps - Hipertrofia",
      description: "Treino de hipertrofia para costas e bíceps com foco em volume",
      category: "hipertrofia",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Pulldown pegada aberta",
          sets: "4",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Puxar até o peito, contrair as escápulas",
        },
        {
          id: "ex2",
          name: "Remada baixa no cabo",
          sets: "4",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Peito para fora, puxar até o abdômen",
        },
        {
          id: "ex3",
          name: "Pullover com halter",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "leve a moderado",
          rest: "75s",
          notes: "Movimento amplo, sentir o alongamento",
        },
        {
          id: "ex4",
          name: "Rosca alternada com halteres",
          sets: "4",
          reps: "12-15 cada braço",
          time: "",
          load: "moderado",
          rest: "75s",
          notes: "Movimento controlado, contração no topo",
        },
        {
          id: "ex5",
          name: "Rosca concentrada",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "leve a moderado",
          rest: "60s",
          notes: "Apoio no joelho, foco na contração",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Ombros e Abdômen 1
    {
      id: "shoulders-abs-1",
      name: "Ombros e Abdômen - Força",
      description: "Desenvolvimento de ombros e fortalecimento do core",
      category: "força",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Desenvolvimento militar",
          sets: "4",
          reps: "8-10",
          time: "",
          load: "70-80% 1RM",
          rest: "2-3min",
          notes: "Em pé ou sentado, core contraído",
        },
        {
          id: "ex2",
          name: "Elevação lateral com halteres",
          sets: "3",
          reps: "12-15",
          time: "",
          load: "leve a moderado",
          rest: "90s",
          notes: "Braços ligeiramente flexionados, subir até a linha dos ombros",
        },
        {
          id: "ex3",
          name: "Elevação frontal alternada",
          sets: "3",
          reps: "10-12 cada braço",
          time: "",
          load: "moderado",
          rest: "75s",
          notes: "Movimento controlado, não balançar o corpo",
        },
        {
          id: "ex4",
          name: "Prancha isométrica",
          sets: "3",
          reps: "",
          time: "30-60s",
          load: "peso corporal",
          rest: "90s",
          notes: "Corpo alinhado, respiração normal",
        },
        {
          id: "ex5",
          name: "Abdominal supra",
          sets: "3",
          reps: "20-25",
          time: "",
          load: "peso corporal",
          rest: "60s",
          notes: "Não puxar o pescoço, contrair o abdômen",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Ombros e Abdômen 2
    {
      id: "shoulders-abs-2",
      name: "Ombros e Abdômen - Hipertrofia",
      description: "Treino de hipertrofia para ombros e definição abdominal",
      category: "hipertrofia",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Desenvolvimento com halteres",
          sets: "4",
          reps: "10-12",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Amplitude completa, controlar a descida",
        },
        {
          id: "ex2",
          name: "Elevação lateral no cabo",
          sets: "4",
          reps: "15-20",
          time: "",
          load: "leve a moderado",
          rest: "75s",
          notes: "Tensão constante, movimento fluido",
        },
        {
          id: "ex3",
          name: "Crucifixo inverso",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "leve",
          rest: "75s",
          notes: "Trabalhar deltóide posterior, peito para fora",
        },
        {
          id: "ex4",
          name: "Abdominal bicicleta",
          sets: "3",
          reps: "20 cada lado",
          time: "",
          load: "peso corporal",
          rest: "60s",
          notes: "Movimento alternado, cotovelo ao joelho oposto",
        },
        {
          id: "ex5",
          name: "Elevação de pernas",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "peso corporal",
          rest: "60s",
          notes: "Controlar a descida, não tocar o chão",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Posteriores e Panturrilha 1
    {
      id: "posterior-calves-1",
      name: "Posteriores e Panturrilha - Força",
      description: "Fortalecimento da cadeia posterior e panturrilhas",
      category: "força",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Levantamento terra",
          sets: "4",
          reps: "6-8",
          time: "",
          load: "80-90% 1RM",
          rest: "3min",
          notes: "Técnica perfeita, core contraído, barra próxima ao corpo",
        },
        {
          id: "ex2",
          name: "Mesa flexora",
          sets: "3",
          reps: "10-12",
          time: "",
          load: "moderado a pesado",
          rest: "2min",
          notes: "Movimento controlado, contração no topo",
        },
        {
          id: "ex3",
          name: "Stiff com halteres",
          sets: "3",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Joelhos ligeiramente flexionados, sentir o alongamento",
        },
        {
          id: "ex4",
          name: "Panturrilha em pé",
          sets: "4",
          reps: "15-20",
          time: "",
          load: "pesado",
          rest: "90s",
          notes: "Amplitude completa, pausa no topo",
        },
        {
          id: "ex5",
          name: "Panturrilha sentado",
          sets: "3",
          reps: "20-25",
          time: "",
          load: "moderado",
          rest: "75s",
          notes: "Trabalhar o sóleo, movimento lento",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Posteriores e Panturrilha 2
    {
      id: "posterior-calves-2",
      name: "Posteriores e Panturrilha - Hipertrofia",
      description: "Hipertrofia da cadeia posterior e panturrilhas",
      category: "hipertrofia",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Levantamento terra romeno",
          sets: "4",
          reps: "10-12",
          time: "",
          load: "60-70% 1RM",
          rest: "2min",
          notes: "Foco no alongamento dos posteriores",
        },
        {
          id: "ex2",
          name: "Mesa flexora unilateral",
          sets: "3",
          reps: "12-15 cada perna",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Trabalhar cada perna separadamente",
        },
        {
          id: "ex3",
          name: "Bom dia com barra",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "leve a moderado",
          rest: "90s",
          notes: "Movimento controlado, não arredondar as costas",
        },
        {
          id: "ex4",
          name: "Panturrilha no leg press",
          sets: "4",
          reps: "20-25",
          time: "",
          load: "pesado",
          rest: "75s",
          notes: "Usar apenas a ponta dos pés",
        },
        {
          id: "ex5",
          name: "Panturrilha unilateral",
          sets: "3",
          reps: "15-20 cada perna",
          time: "",
          load: "peso corporal + halter",
          rest: "60s",
          notes: "Equilíbrio e contração máxima",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Quadríceps e Adutores 1
    {
      id: "quads-adductors-1",
      name: "Quadríceps e Adutores - Força",
      description: "Desenvolvimento de força para quadríceps e adutores",
      category: "força",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Agachamento livre",
          sets: "4",
          reps: "6-8",
          time: "",
          load: "80-90% 1RM",
          rest: "3min",
          notes: "Descer até 90°, core contraído, joelhos alinhados",
        },
        {
          id: "ex2",
          name: "Leg press 45°",
          sets: "3",
          reps: "10-12",
          time: "",
          load: "pesado",
          rest: "2min",
          notes: "Pés na largura dos ombros, amplitude completa",
        },
        {
          id: "ex3",
          name: "Cadeira extensora",
          sets: "3",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Movimento controlado, contração no topo",
        },
        {
          id: "ex4",
          name: "Agachamento sumo",
          sets: "3",
          reps: "12-15",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Pés afastados, trabalhar adutores",
        },
        {
          id: "ex5",
          name: "Adução no cabo",
          sets: "3",
          reps: "15-20 cada perna",
          time: "",
          load: "moderado",
          rest: "75s",
          notes: "Movimento controlado, sentir a contração",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Treino Quadríceps e Adutores 2
    {
      id: "quads-adductors-2",
      name: "Quadríceps e Adutores - Hipertrofia",
      description: "Hipertrofia de quadríceps e adutores com alto volume",
      category: "hipertrofia",
      difficulty: "intermediário",
      exercises: [
        {
          id: "ex1",
          name: "Agachamento frontal",
          sets: "4",
          reps: "10-12",
          time: "",
          load: "60-70% 1RM",
          rest: "2min",
          notes: "Barra na frente, tronco ereto",
        },
        {
          id: "ex2",
          name: "Afundo alternado",
          sets: "3",
          reps: "12-15 cada perna",
          time: "",
          load: "moderado",
          rest: "90s",
          notes: "Passo amplo, descer até 90°",
        },
        {
          id: "ex3",
          name: "Sissy squat",
          sets: "3",
          reps: "15-20",
          time: "",
          load: "peso corporal",
          rest: "90s",
          notes: "Foco no quadríceps, movimento controlado",
        },
        {
          id: "ex4",
          name: "Máquina adutora",
          sets: "4",
          reps: "15-20",
          time: "",
          load: "moderado",
          rest: "75s",
          notes: "Contração máxima, pausa no final",
        },
        {
          id: "ex5",
          name: "Agachamento búlgaro",
          sets: "3",
          reps: "12-15 cada perna",
          time: "",
          load: "peso corporal ou halteres",
          rest: "90s",
          notes: "Pé traseiro elevado, foco na perna da frente",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
  const [selectedWorkout, setSelectedWorkout] = useState<SimpleWorkout | null>(null)

  // Adicionar estados para edição de treinos:
  const [editingWorkout, setEditingWorkout] = useState<SimpleWorkout | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Adicionar após os outros estados de edição
  const [newExerciseName, setNewExerciseName] = useState("")
  const [newExerciseSets, setNewExerciseSets] = useState("")
  const [newExerciseReps, setNewExerciseReps] = useState("")
  const [newExerciseTime, setNewExerciseTime] = useState("")
  const [newExerciseLoad, setNewExerciseLoad] = useState("")
  const [newExerciseRest, setNewExerciseRest] = useState("")
  const [newExerciseNotes, setNewExerciseNotes] = useState("")

  // Funções para o construtor de treinos
  const handleAddExerciseToWorkout = () => {
    if (!exerciseName.trim()) return

    const newExercise: SimpleExercise = {
      id: Date.now().toString(),
      name: exerciseName.trim(),
      sets: exerciseSets.trim(),
      reps: exerciseReps.trim(),
      time: exerciseTime.trim(),
      load: exerciseLoad.trim(),
      rest: exerciseRest.trim(),
      notes: exerciseNotes.trim(),
    }

    setWorkoutExercises([...workoutExercises, newExercise])
    resetExerciseForm()
  }

  const resetExerciseForm = () => {
    setExerciseName("")
    setExerciseSets("")
    setExerciseReps("")
    setExerciseTime("")
    setExerciseLoad("")
    setExerciseRest("")
    setExerciseNotes("")
  }

  const removeExerciseFromWorkout = (index: number) => {
    const updatedExercises = [...workoutExercises]
    updatedExercises.splice(index, 1)
    setWorkoutExercises(updatedExercises)
  }

  const saveWorkout = () => {
    if (!workoutName.trim() || workoutExercises.length === 0) return

    const newWorkout: SimpleWorkout = {
      id: Date.now().toString(),
      name: workoutName,
      description: workoutDescription.trim(),
      category: workoutCategory,
      difficulty: workoutDifficulty,
      exercises: [...workoutExercises],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setSavedWorkouts([...savedWorkouts, newWorkout])
    resetWorkoutForm()
  }

  const resetWorkoutForm = () => {
    setWorkoutName("")
    setWorkoutCategory("hipertrofia")
    setWorkoutDifficulty("intermediário")
    setWorkoutDescription("")
    setWorkoutExercises([])
  }

  const deleteWorkout = (workoutId: string) => {
    setSavedWorkouts(savedWorkouts.filter((w) => w.id !== workoutId))
  }

  const startEditWorkout = (workout: SimpleWorkout) => {
    setEditingWorkout({ ...workout })
    setIsEditDialogOpen(true)
  }

  const saveEditedWorkout = () => {
    if (!editingWorkout) return

    const updatedWorkouts = savedWorkouts.map((w) =>
      w.id === editingWorkout.id ? { ...editingWorkout, updatedAt: new Date() } : w,
    )
    setSavedWorkouts(updatedWorkouts)
    setIsEditDialogOpen(false)
    setEditingWorkout(null)
  }

  const updateEditingWorkout = (field: keyof SimpleWorkout, value: any) => {
    if (!editingWorkout) return
    setEditingWorkout({ ...editingWorkout, [field]: value })
  }

  const updateEditingExercise = (index: number, field: keyof SimpleExercise, value: string) => {
    if (!editingWorkout) return
    const updatedExercises = [...editingWorkout.exercises]
    updatedExercises[index] = { ...updatedExercises[index], [field]: value }
    setEditingWorkout({ ...editingWorkout, exercises: updatedExercises })
  }

  const removeEditingExercise = (index: number) => {
    if (!editingWorkout) return
    const updatedExercises = [...editingWorkout.exercises]
    updatedExercises.splice(index, 1)
    setEditingWorkout({ ...editingWorkout, exercises: updatedExercises })
  }

  const printWorkout = (workout: SimpleWorkout) => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${workout.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .workout-info { margin-bottom: 20px; }
          .exercise { margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; }
          .exercise-name { font-weight: bold; font-size: 16px; }
          .exercise-details { margin-top: 5px; font-size: 14px; }
          .notes { font-style: italic; color: #666; margin-top: 5px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${workout.name}</h1>
          <p><strong>Categoria:</strong> ${workout.category} | <strong>Dificuldade:</strong> ${workout.difficulty}</p>
          ${workout.description ? `<p><strong>Descrição:</strong> ${workout.description}</p>` : ""}
        </div>
        
        <div class="exercises">
          ${workout.exercises
            .map(
              (ex, index) => `
            <div class="exercise">
              <div class="exercise-name">${index + 1}. ${ex.name}</div>
              <div class="exercise-details">
                ${ex.sets ? `<strong>Séries:</strong> ${ex.sets} | ` : ""}
                ${ex.reps ? `<strong>Repetições:</strong> ${ex.reps} | ` : ""}
                ${ex.time ? `<strong>Tempo:</strong> ${ex.time} | ` : ""}
                ${ex.load ? `<strong>Carga:</strong> ${ex.load} | ` : ""}
                ${ex.rest ? `<strong>Descanso:</strong> ${ex.rest}` : ""}
              </div>
              ${ex.notes ? `<div class="notes"><strong>Observações:</strong> ${ex.notes}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
          Treino criado em: ${workout.createdAt.toLocaleDateString("pt-BR")}
        </div>
      </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  // Adicionar função para adicionar exercício ao treino em edição:
  const addExerciseToEditingWorkout = () => {
    if (!editingWorkout || !newExerciseName.trim()) return

    const newExercise: SimpleExercise = {
      id: Date.now().toString(),
      name: newExerciseName.trim(),
      sets: newExerciseSets.trim(),
      reps: newExerciseReps.trim(),
      time: newExerciseTime.trim(),
      load: newExerciseLoad.trim(),
      rest: newExerciseRest.trim(),
      notes: newExerciseNotes.trim(),
    }

    setEditingWorkout({
      ...editingWorkout,
      exercises: [...editingWorkout.exercises, newExercise],
    })

    // Limpar campos
    setNewExerciseName("")
    setNewExerciseSets("")
    setNewExerciseReps("")
    setNewExerciseTime("")
    setNewExerciseLoad("")
    setNewExerciseRest("")
    setNewExerciseNotes("")
  }

  // Renderização da interface
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-purple-300 mb-6">Construtor de Treinos</h1>

      <Tabs defaultValue="construtor" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="construtor">Construtor de Treinos</TabsTrigger>
          <TabsTrigger value="treinos">Treinos Salvos</TabsTrigger>
        </TabsList>

        {/* TAB: CONSTRUTOR DE TREINOS */}
        <TabsContent value="construtor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna 1: Informações do treino */}
            <Card className="bg-[#2a1f3d] border-purple-800 text-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-200">Informações do Treino</CardTitle>
                <CardDescription className="text-purple-300">Defina os detalhes básicos do treino</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workout-name">Nome do Treino</Label>
                  <Input
                    id="workout-name"
                    type="text"
                    placeholder="Ex: Treino A - Hipertrofia"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    className="bg-[#3a2d4d] border-purple-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-category">Categoria</Label>
                  <Select value={workoutCategory} onValueChange={setWorkoutCategory}>
                    <SelectTrigger id="workout-category" className="bg-[#3a2d4d] border-purple-700">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="força">Força</SelectItem>
                      <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                      <SelectItem value="resistência">Resistência</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="funcional">Funcional</SelectItem>
                      <SelectItem value="reabilitação">Reabilitação</SelectItem>
                      <SelectItem value="adaptação">Adaptação</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-difficulty">Dificuldade</Label>
                  <Select value={workoutDifficulty} onValueChange={setWorkoutDifficulty}>
                    <SelectTrigger id="workout-difficulty" className="bg-[#3a2d4d] border-purple-700">
                      <SelectValue placeholder="Selecione a dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediário">Intermediário</SelectItem>
                      <SelectItem value="avançado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-description">Descrição (opcional)</Label>
                  <Textarea
                    id="workout-description"
                    placeholder="Descreva o objetivo e detalhes do treino..."
                    value={workoutDescription}
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    className="bg-[#3a2d4d] border-purple-700 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Coluna 2: Adicionar exercícios */}
            <Card className="bg-[#2a1f3d] border-purple-800 text-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-200">Adicionar Exercício</CardTitle>
                <CardDescription className="text-purple-300">Digite os detalhes do exercício</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exercise-name">Nome do Exercício</Label>
                  <Input
                    id="exercise-name"
                    type="text"
                    placeholder="Ex: Supino reto, Agachamento..."
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="bg-[#3a2d4d] border-purple-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exercise-sets">Séries</Label>
                    <Input
                      id="exercise-sets"
                      type="text"
                      placeholder="Ex: 3, 4x, 3-4..."
                      value={exerciseSets}
                      onChange={(e) => setExerciseSets(e.target.value)}
                      className="bg-[#3a2d4d] border-purple-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exercise-reps">Repetições</Label>
                    <Input
                      id="exercise-reps"
                      type="text"
                      placeholder="Ex: 12, 8-12, máx..."
                      value={exerciseReps}
                      onChange={(e) => setExerciseReps(e.target.value)}
                      className="bg-[#3a2d4d] border-purple-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exercise-time">Tempo</Label>
                    <Input
                      id="exercise-time"
                      type="text"
                      placeholder="Ex: 30s, 1min, 45s..."
                      value={exerciseTime}
                      onChange={(e) => setExerciseTime(e.target.value)}
                      className="bg-[#3a2d4d] border-purple-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exercise-load">Carga</Label>
                    <Input
                      id="exercise-load"
                      type="text"
                      placeholder="Ex: 20kg, 50%, peso corporal..."
                      value={exerciseLoad}
                      onChange={(e) => setExerciseLoad(e.target.value)}
                      className="bg-[#3a2d4d] border-purple-700"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="exercise-rest">Descanso</Label>
                    <Input
                      id="exercise-rest"
                      type="text"
                      placeholder="Ex: 60s, 1-2min, até recuperar..."
                      value={exerciseRest}
                      onChange={(e) => setExerciseRest(e.target.value)}
                      className="bg-[#3a2d4d] border-purple-700"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="exercise-notes">Observações (opcional)</Label>
                    <Textarea
                      id="exercise-notes"
                      placeholder="Instruções específicas, variações, dicas..."
                      value={exerciseNotes}
                      onChange={(e) => setExerciseNotes(e.target.value)}
                      className="bg-[#3a2d4d] border-purple-700"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleAddExerciseToWorkout}
                  disabled={!exerciseName.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" /> Adicionar ao Treino
                </Button>
              </CardContent>
            </Card>

            {/* Coluna 3: Exercícios do treino */}
            <Card className="bg-[#2a1f3d] border-purple-800 text-purple-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-purple-200">Exercícios do Treino</CardTitle>
                  <CardDescription className="text-purple-300">
                    {workoutExercises.length} exercícios adicionados
                  </CardDescription>
                </div>
                {workoutExercises.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-200"
                    onClick={() => setWorkoutExercises([])}
                  >
                    Limpar
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {workoutExercises.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {workoutExercises.map((ex, index) => (
                      <div key={ex.id} className="flex items-start justify-between p-3 bg-[#3a2d4d] rounded-md">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-purple-400 font-medium mr-2">{index + 1}.</span>
                            <h4 className="font-medium text-purple-200">{ex.name}</h4>
                          </div>
                          <div className="mt-1 text-sm text-purple-300">
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                              {ex.sets && <span>Séries: {ex.sets}</span>}
                              {ex.reps && <span>Reps: {ex.reps}</span>}
                              {ex.time && <span>Tempo: {ex.time}</span>}
                              {ex.load && <span>Carga: {ex.load}</span>}
                              {ex.rest && <span>Descanso: {ex.rest}</span>}
                            </div>
                            {ex.notes && <p className="mt-1 text-purple-400 italic">{ex.notes}</p>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-400 hover:text-purple-200"
                          onClick={() => removeExerciseFromWorkout(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                      <Dumbbell className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium text-purple-300 mb-2">Nenhum exercício adicionado</h3>
                    <p className="text-purple-400">Digite os exercícios nos campos ao lado para montar seu treino</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={workoutExercises.length === 0 || !workoutName.trim()}
                  onClick={saveWorkout}
                >
                  <Save className="h-4 w-4 mr-2" /> Salvar Treino
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* TAB: TREINOS SALVOS */}
        <TabsContent value="treinos" className="space-y-6">
          {savedWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedWorkouts.map((workout) => (
                <Card key={workout.id} className="bg-[#2a1f3d] border-purple-800 text-purple-100">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-purple-200">{workout.name}</CardTitle>
                      <Badge
                        variant={
                          workout.difficulty === "iniciante"
                            ? "outline"
                            : workout.difficulty === "intermediário"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {workout.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-purple-300">
                      {workout.category} • {workout.exercises.length} exercícios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {workout.description && <p className="text-sm text-purple-300">{workout.description}</p>}
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-purple-200 mb-1">Exercícios:</h4>
                        <ul className="space-y-1">
                          {workout.exercises.slice(0, 3).map((ex, index) => (
                            <li key={index} className="text-sm text-purple-300">
                              {index + 1}. {ex.name}
                            </li>
                          ))}
                          {workout.exercises.length > 3 && (
                            <li className="text-sm text-purple-400">+ {workout.exercises.length - 3} mais...</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-300 hover:text-purple-100"
                      onClick={() => setSelectedWorkout(workout)}
                    >
                      <Info className="h-4 w-4 mr-1" /> Detalhes
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => startEditWorkout(workout)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300"
                        onClick={() => printWorkout(workout)}
                      >
                        Imprimir
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => deleteWorkout(workout.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Iniciar Treino
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                <Dumbbell className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-medium text-purple-300 mb-2">Nenhum treino salvo</h3>
              <p className="text-purple-400 mb-4">Crie e salve treinos para visualizá-los aqui</p>
              <Button
                variant="outline"
                onClick={() => document.querySelector('[value="construtor"]')?.click()}
                className="border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-purple-100"
              >
                Ir para Construtor de Treinos
              </Button>
            </div>
          )}

          {/* Modal de detalhes do treino */}
          {selectedWorkout && (
            <Dialog open={!!selectedWorkout} onOpenChange={() => setSelectedWorkout(null)}>
              <DialogContent className="bg-[#2a1f3d] text-purple-100 border-purple-800 max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl text-purple-200">{selectedWorkout.name}</DialogTitle>
                  <DialogDescription className="text-purple-300">
                    {selectedWorkout.category} • {selectedWorkout.difficulty} • {selectedWorkout.exercises.length}{" "}
                    exercícios
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {selectedWorkout.description && (
                    <div>
                      <h4 className="font-medium text-purple-200 mb-1">Descrição:</h4>
                      <p className="text-sm text-purple-300">{selectedWorkout.description}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-purple-200 mb-2">Exercícios:</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {selectedWorkout.exercises.map((ex, index) => (
                        <div key={ex.id} className="flex items-start justify-between p-3 bg-[#3a2d4d] rounded-md">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="text-purple-400 font-medium mr-2">{index + 1}.</span>
                              <h4 className="font-medium text-purple-200">{ex.name}</h4>
                            </div>
                            <div className="mt-1 text-sm text-purple-300">
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {ex.sets && <span>Séries: {ex.sets}</span>}
                                {ex.reps && <span>Reps: {ex.reps}</span>}
                                {ex.time && <span>Tempo: {ex.time}</span>}
                                {ex.load && <span>Carga: {ex.load}</span>}
                                {ex.rest && <span>Descanso: {ex.rest}</span>}
                              </div>
                              {ex.notes && <p className="mt-1 text-purple-400 italic">{ex.notes}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-purple-100 bg-transparent"
                  >
                    Editar Treino
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Iniciar Treino</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Modal de edição do treino */}
          {editingWorkout && (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="bg-[#2a1f3d] text-purple-100 border-purple-800 max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl text-purple-200">Editar Treino</DialogTitle>
                  <DialogDescription className="text-purple-300">Modifique as informações do treino</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Informações básicas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome do Treino</Label>
                      <Input
                        type="text"
                        value={editingWorkout.name}
                        onChange={(e) => updateEditingWorkout("name", e.target.value)}
                        className="bg-[#3a2d4d] border-purple-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Select
                        value={editingWorkout.category}
                        onValueChange={(value) => updateEditingWorkout("category", value)}
                      >
                        <SelectTrigger className="bg-[#3a2d4d] border-purple-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="força">Força</SelectItem>
                          <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                          <SelectItem value="resistência">Resistência</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="funcional">Funcional</SelectItem>
                          <SelectItem value="reabilitação">Reabilitação</SelectItem>
                          <SelectItem value="adaptação">Adaptação</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Dificuldade</Label>
                      <Select
                        value={editingWorkout.difficulty}
                        onValueChange={(value) => updateEditingWorkout("difficulty", value)}
                      >
                        <SelectTrigger className="bg-[#3a2d4d] border-purple-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iniciante">Iniciante</SelectItem>
                          <SelectItem value="intermediário">Intermediário</SelectItem>
                          <SelectItem value="avançado">Avançado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Textarea
                        value={editingWorkout.description}
                        onChange={(e) => updateEditingWorkout("description", e.target.value)}
                        className="bg-[#3a2d4d] border-purple-700"
                      />
                    </div>
                  </div>

                  {/* Exercícios */}
                  <div>
                    <h4 className="font-medium text-purple-200 mb-4">Exercícios ({editingWorkout.exercises.length})</h4>
                    <div className="space-y-4">
                      {editingWorkout.exercises.map((ex, index) => (
                        <div key={ex.id} className="p-4 bg-[#3a2d4d] rounded-md">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-purple-400 font-medium">{index + 1}.</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => removeEditingExercise(index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Nome do Exercício</Label>
                              <Input
                                type="text"
                                value={ex.name}
                                onChange={(e) => updateEditingExercise(index, "name", e.target.value)}
                                className="bg-[#2a1f3d] border-purple-600 text-sm"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs">Séries</Label>
                              <Input
                                type="text"
                                value={ex.sets}
                                onChange={(e) => updateEditingExercise(index, "sets", e.target.value)}
                                className="bg-[#2a1f3d] border-purple-600 text-sm"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs">Repetições</Label>
                              <Input
                                type="text"
                                value={ex.reps}
                                onChange={(e) => updateEditingExercise(index, "reps", e.target.value)}
                                className="bg-[#2a1f3d] border-purple-600 text-sm"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs">Tempo</Label>
                              <Input
                                type="text"
                                value={ex.time}
                                onChange={(e) => updateEditingExercise(index, "time", e.target.value)}
                                className="bg-[#2a1f3d] border-purple-600 text-sm"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs">Carga</Label>
                              <Input
                                type="text"
                                value={ex.load}
                                onChange={(e) => updateEditingExercise(index, "load", e.target.value)}
                                className="bg-[#2a1f3d] border-purple-600 text-sm"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs">Descanso</Label>
                              <Input
                                type="text"
                                value={ex.rest}
                                onChange={(e) => updateEditingExercise(index, "rest", e.target.value)}
                                className="bg-[#2a1f3d] border-purple-600 text-sm"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2 lg:col-span-3">
                              <Label className="text-xs">Observações</Label>
                              <Textarea
                                value={ex.notes}
                                onChange={(e) => updateEditingExercise(index, "notes", e.target.value)}
                                className="bg-[#2a1f3d] border-purple-600 text-sm"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Adicionar novo exercício */}
                  <div className="border-t border-purple-700 pt-4">
                    <h4 className="font-medium text-purple-200 mb-4">Adicionar Novo Exercício</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Nome do Exercício</Label>
                        <Input
                          type="text"
                          placeholder="Ex: Supino reto..."
                          value={newExerciseName}
                          onChange={(e) => setNewExerciseName(e.target.value)}
                          className="bg-[#2a1f3d] border-purple-600 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Séries</Label>
                        <Input
                          type="text"
                          placeholder="Ex: 3, 4x..."
                          value={newExerciseSets}
                          onChange={(e) => setNewExerciseSets(e.target.value)}
                          className="bg-[#2a1f3d] border-purple-600 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Repetições</Label>
                        <Input
                          type="text"
                          placeholder="Ex: 12, 8-12..."
                          value={newExerciseReps}
                          onChange={(e) => setNewExerciseReps(e.target.value)}
                          className="bg-[#2a1f3d] border-purple-600 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Tempo</Label>
                        <Input
                          type="text"
                          placeholder="Ex: 30s, 1min..."
                          value={newExerciseTime}
                          onChange={(e) => setNewExerciseTime(e.target.value)}
                          className="bg-[#2a1f3d] border-purple-600 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Carga</Label>
                        <Input
                          type="text"
                          placeholder="Ex: 20kg, 50%..."
                          value={newExerciseLoad}
                          onChange={(e) => setNewExerciseLoad(e.target.value)}
                          className="bg-[#2a1f3d] border-purple-600 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Descanso</Label>
                        <Input
                          type="text"
                          placeholder="Ex: 60s, 1-2min..."
                          value={newExerciseRest}
                          onChange={(e) => setNewExerciseRest(e.target.value)}
                          className="bg-[#2a1f3d] border-purple-600 text-sm"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2 lg:col-span-3">
                        <Label className="text-xs">Observações</Label>
                        <Textarea
                          placeholder="Instruções específicas, dicas..."
                          value={newExerciseNotes}
                          onChange={(e) => setNewExerciseNotes(e.target.value)}
                          className="bg-[#2a1f3d] border-purple-600 text-sm"
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2 lg:col-span-3">
                        <Button
                          onClick={addExerciseToEditingWorkout}
                          disabled={!newExerciseName.trim()}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Adicionar Exercício
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-purple-100 bg-transparent"
                  >
                    Cancelar
                  </Button>
                  <Button onClick={saveEditedWorkout} className="bg-purple-600 hover:bg-purple-700">
                    Salvar Alterações
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
