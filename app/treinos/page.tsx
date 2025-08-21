"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Info, TrendingUp, CheckCircle, ChevronDown, ChevronUp, Printer } from "lucide-react"
import { useRouter } from "next/navigation"
import { exerciseVariations, getProgressionByWeek, getWorkoutForWeekAndAge } from "@/data/exercise-variations"

export default function TreinosPage() {
  const [currentWeek, setCurrentWeek] = useState("1")
  const [activeTab, setActiveTab] = useState("30-39")
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  const router = useRouter()

  // Verificar se o usuário está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const markExerciseComplete = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId])
    } else {
      setCompletedExercises(completedExercises.filter((id) => id !== exerciseId))
    }
  }

  const resetProgress = () => {
    setCompletedExercises([])
  }

  const getExerciseById = (id: string) => {
    return exerciseVariations.find((exercise) => exercise.id === id)
  }

  // Obter a progressão para a semana atual
  const weekNumber = Number.parseInt(currentWeek)
  const progression = getProgressionByWeek(weekNumber)

  // Obter o treino específico para a faixa etária e semana atual
  const currentWorkout = getWorkoutForWeekAndAge(activeTab, weekNumber)
  const workoutExercises = currentWorkout.exercises.map((id) => getExerciseById(id)).filter(Boolean)

  const progressPercentage =
    workoutExercises.length > 0
      ? (completedExercises.filter((id) => currentWorkout.exercises.includes(id)).length / workoutExercises.length) *
        100
      : 0

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6 print:mb-2">
        <h1 className="text-3xl font-bold text-emerald-700 print:text-2xl">Seu Treino Personalizado</h1>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start print:hidden">
        <div className="w-full md:w-1/2">
          <label htmlFor="week-select" className="block text-sm font-medium text-gray-700 mb-1">
            Selecione a semana de treino:
          </label>
          <Select value={currentWeek} onValueChange={setCurrentWeek}>
            <SelectTrigger id="week-select" className="w-full">
              <SelectValue placeholder="Selecione a semana" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semana 1-2 (Iniciante)</SelectItem>
              <SelectItem value="3">Semana 3-4 (Adaptação)</SelectItem>
              <SelectItem value="5">Semana 5-6 (Progressão)</SelectItem>
              <SelectItem value="7">Semana 7-8 (Intermediário)</SelectItem>
              <SelectItem value="9">Semana 9-10 (Avançado)</SelectItem>
              <SelectItem value="11">Semana 11-12 (Manutenção)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Alert className="w-full md:w-1/2 bg-blue-50 border-blue-200">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-700">Progressão de treino</AlertTitle>
          <AlertDescription className="text-blue-600">{progression.description}</AlertDescription>
        </Alert>
      </div>

      <div className="mb-6 print:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Seu progresso</span>
          <span className="text-sm text-emerald-600">
            {completedExercises.filter((id) => currentWorkout.exercises.includes(id)).length}/{workoutExercises.length}{" "}
            exercícios
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        {completedExercises.length > 0 && (
          <div className="mt-2 text-right">
            <Button variant="link" size="sm" onClick={resetProgress} className="text-sm text-gray-500">
              Reiniciar progresso
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full print:block">
        <TabsList className="grid grid-cols-7 mb-6 print:hidden">
          <TabsTrigger value="13-19">13-19</TabsTrigger>
          <TabsTrigger value="20-29">20-29</TabsTrigger>
          <TabsTrigger value="30-39">30-39</TabsTrigger>
          <TabsTrigger value="40-49">40-49</TabsTrigger>
          <TabsTrigger value="50-59">50-59</TabsTrigger>
          <TabsTrigger value="60-69">60-69</TabsTrigger>
          <TabsTrigger value="70-80">70-80</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          <Card>
            <CardHeader className="bg-emerald-50 border-b">
              <CardTitle className="text-2xl text-emerald-700">{currentWorkout.title}</CardTitle>
              <CardDescription className="text-base">{currentWorkout.description}</CardDescription>

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                  <span>{currentWorkout.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
                  <span>{currentWorkout.frequency}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {workoutExercises.map((exercise, index) => {
                  // Aplicar a progressão ao exercício
                  const progressedExercise = {
                    ...exercise,
                    timerSeconds: exercise?.timerSeconds
                      ? Math.round(exercise.timerSeconds * progression.timeMultiplier)
                      : 0,
                    timerRepetitions: exercise?.timerRepetitions
                      ? Math.round(exercise.timerRepetitions * progression.repMultiplier)
                      : 0,
                  }

                  return (
                    <AccordionItem key={exercise?.id} value={exercise?.id || `item-${index}`}>
                      <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-lg">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                completedExercises.includes(exercise?.id || "")
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium">{exercise?.title}</h3>
                              <p className="text-sm text-gray-500">{exercise?.category}</p>
                            </div>
                          </div>
                          <Badge
                            className={`
                            ${exercise?.difficulty === "facil" ? "bg-green-100 text-green-800 border-green-200" : ""}
                            ${exercise?.difficulty === "moderado" ? "bg-amber-100 text-amber-800 border-amber-200" : ""}
                            ${exercise?.difficulty === "avancado" ? "bg-red-100 text-red-800 border-red-200" : ""}
                          `}
                          >
                            {exercise?.difficulty === "facil"
                              ? "Fácil"
                              : exercise?.difficulty === "moderado"
                                ? "Moderado"
                                : "Avançado"}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-2 pb-4">
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <h4 className="font-medium text-emerald-700 mb-2">Instruções:</h4>
                            <ol className="list-decimal pl-5 mb-4 space-y-1">
                              {exercise?.steps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>

                            {/* Mostrar a progressão de repetições/tempo */}
                            <div className="bg-emerald-50 p-3 rounded-md border border-emerald-100 mb-4">
                              <h4 className="font-medium text-emerald-700 flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" /> Progressão (Semana {currentWeek}):
                              </h4>
                              <ul className="text-sm text-emerald-700 mt-1 space-y-1">
                                {progressedExercise.timerSeconds > 0 && (
                                  <li>
                                    <span className="font-medium">Tempo:</span> {progressedExercise.timerSeconds}{" "}
                                    segundos
                                    {progression.repMultiplier > 1 && (
                                      <span className="text-xs ml-1 text-emerald-600">
                                        (↑ de {exercise?.timerSeconds} segundos)
                                      </span>
                                    )}
                                  </li>
                                )}
                                {progressedExercise.timerRepetitions > 0 && (
                                  <li>
                                    <span className="font-medium">Repetições:</span>{" "}
                                    {progressedExercise.timerRepetitions} vezes
                                    {progression.repMultiplier > 1 && (
                                      <span className="text-xs ml-1 text-emerald-600">
                                        (↑ de {exercise?.timerRepetitions} repetições)
                                      </span>
                                    )}
                                  </li>
                                )}
                                {!progressedExercise.timerSeconds && !progressedExercise.timerRepetitions && (
                                  <li>
                                    <span className="font-medium">Séries:</span> {progression.sets} séries de{" "}
                                    {progression.baseReps} repetições
                                  </li>
                                )}
                              </ul>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4">
                              <h4 className="font-medium text-blue-700 flex items-center">
                                <Info className="h-4 w-4 mr-1" /> Benefícios:
                              </h4>
                              <p className="text-sm text-blue-700 mt-1">{exercise?.benefits}</p>
                            </div>

                            {exercise?.tips && (
                              <div className="bg-amber-50 p-3 rounded-md border border-amber-100 mb-4">
                                <h4 className="font-medium text-amber-700">Dicas:</h4>
                                <p className="text-sm text-amber-700 mt-1">{exercise?.tips}</p>
                              </div>
                            )}

                            {exercise?.variations && (
                              <Collapsible className="mb-4">
                                <CollapsibleTrigger className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                                  Variações
                                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500 collapsible-closed" />
                                  <ChevronUp className="h-4 w-4 ml-1 text-gray-500 collapsible-open" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-2 space-y-2 text-sm">
                                  <div className="pl-4 border-l-2 border-green-200">
                                    <span className="font-medium text-green-700">Mais fácil: </span>
                                    {exercise.variations.easier}
                                  </div>
                                  <div className="pl-4 border-l-2 border-amber-200">
                                    <span className="font-medium text-amber-700">Mais difícil: </span>
                                    {exercise.variations.harder}
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            )}

                            <Button
                              variant={completedExercises.includes(exercise?.id || "") ? "outline" : "default"}
                              size="sm"
                              className={`print:hidden ${
                                completedExercises.includes(exercise?.id || "")
                                  ? "border-emerald-200 text-emerald-700"
                                  : ""
                              }`}
                              onClick={() => markExerciseComplete(exercise?.id || "")}
                            >
                              {completedExercises.includes(exercise?.id || "") ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Concluído
                                </>
                              ) : (
                                "Marcar como concluído"
                              )}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </CardContent>

            <CardFooter className="bg-gray-50 border-t">
              <div className="w-full">
                <h3 className="font-medium mb-2">Dicas para este treino:</h3>
                <p className="text-gray-700">{currentWorkout.tips}</p>
                <div className="mt-4 p-3 bg-emerald-50 rounded-md border border-emerald-100">
                  <h4 className="font-medium text-emerald-700">Dica de progressão:</h4>
                  <p className="text-sm text-emerald-700 mt-1">
                    {progression.progressionTip} Lembre-se de que a progressão deve ser gradual e confortável.
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
