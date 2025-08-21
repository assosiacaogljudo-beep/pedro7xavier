"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar, Clock, Info, TrendingUp, Award, CheckCircle, Play, Activity } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getProgressionByWeek, getWorkoutForWeekAndAge } from "@/data/exercise-variations-all-ages"
import AvaliacaoSummary from "@/components/avaliacao-summary"

export default function DashboardPage() {
  const [currentWeek, setCurrentWeek] = useState("1")
  const [activeTab, setActiveTab] = useState("30-39")
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  const [avaliacaoResults, setAvaliacaoResults] = useState<any>(null)
  const router = useRouter()

  // Verificar se o usuário está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }

    // Carregar resultados da avaliação física
    const savedResults = localStorage.getItem("avaliacaoFisica")
    if (savedResults) {
      setAvaliacaoResults(JSON.parse(savedResults))
    }
  }, [router])

  // Obter a progressão para a semana atual
  const weekNumber = Number.parseInt(currentWeek)
  const progression = getProgressionByWeek(weekNumber)

  // Obter o treino específico para a faixa etária e semana atual
  const currentWorkout = getWorkoutForWeekAndAge(activeTab, weekNumber)

  // Calcular progresso
  const totalExercises = currentWorkout.exercises.length
  const completedCount = completedExercises.filter((id) => currentWorkout.exercises.includes(id)).length
  const progressPercentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0

  // Obter recomendação baseada na avaliação física
  const getRecommendedAgeGroup = () => {
    if (!avaliacaoResults) return activeTab

    const { fitnessLevel, riskFactors } = avaliacaoResults

    // Se há fatores de risco, recomendar faixa etária mais conservadora
    if (riskFactors.length > 0) {
      return "70-80" // Exercícios mais suaves
    }

    // Baseado no nível de condicionamento
    switch (fitnessLevel) {
      case "Iniciante":
        return "60-69"
      case "Básico":
        return "50-59"
      case "Intermediário":
        return "40-49"
      case "Avançado":
        return "30-39"
      default:
        return activeTab
    }
  }

  const recommendedAgeGroup = getRecommendedAgeGroup()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-purple-400 mb-2">Olá, Bem-vindo(a)!</h1>
      <p className="text-purple-200 mb-8">Aqui está seu painel de exercícios personalizado.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Progresso do Treino */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-400">Seu progresso</CardTitle>
            <CardDescription className="text-purple-200">Semana atual: {currentWeek}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">
                  {completedCount} de {totalExercises} exercícios
                </span>
                <span className="font-medium text-purple-300">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-purple-300 mt-2">
                {progressPercentage === 0
                  ? "Comece seus exercícios hoje!"
                  : progressPercentage < 50
                    ? "Bom começo! Continue assim."
                    : progressPercentage < 100
                      ? "Você está indo muito bem!"
                      : "Parabéns! Você completou todos os exercícios."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Semana de Treino */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-400">Semana de treino</CardTitle>
            <CardDescription className="text-purple-200">Selecione sua semana atual</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={currentWeek} onValueChange={setCurrentWeek}>
              <SelectTrigger>
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
            <Alert className="mt-4 bg-blue-950 border-blue-800">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-300 text-sm">Fase atual</AlertTitle>
              <AlertDescription className="text-blue-200 text-xs">{progression.description}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Próximo Treino */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-400">Próximo treino</CardTitle>
            <CardDescription className="text-purple-200">Recomendado para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-purple-200">
                <Clock className="h-4 w-4 text-purple-400 mr-2" />
                <span>{currentWorkout.duration}</span>
              </div>
              <div className="flex items-center text-sm text-purple-200">
                <Calendar className="h-4 w-4 text-purple-400 mr-2" />
                <span>{currentWorkout.frequency}</span>
              </div>
              <Link href="/treinos">
                <Button className="w-full mt-2">
                  <Play className="h-4 w-4 mr-2" /> Iniciar Treino
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Avaliação Física */}
        <AvaliacaoSummary />

        {/* Recomendações Baseadas na Avaliação */}
        {avaliacaoResults && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-400 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recomendação Personalizada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-purple-300 mb-2">Baseado na sua avaliação:</p>
                  <div className="p-3 bg-[#2a1f3d] rounded-lg">
                    <p className="text-purple-200 text-sm">
                      Recomendamos exercícios da faixa <strong>{recommendedAgeGroup} anos</strong> para seu perfil
                      atual.
                    </p>
                  </div>
                </div>
                {avaliacaoResults.riskFactors.length > 0 && (
                  <Alert className="bg-amber-950 border-amber-800">
                    <Info className="h-4 w-4 text-amber-400" />
                    <AlertDescription className="text-amber-200 text-xs">
                      Consulte um médico antes de iniciar exercícios intensos.
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setActiveTab(recommendedAgeGroup)}
                >
                  Usar Recomendação
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dicas da Semana */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-400 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Dicas da semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">
                  1
                </div>
                <p className="text-purple-200 text-sm">Mantenha-se hidratado antes, durante e após os exercícios.</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">
                  2
                </div>
                <p className="text-purple-200 text-sm">Respeite seus limites. Pare se sentir dor ou desconforto.</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">
                  3
                </div>
                <p className="text-purple-200 text-sm">{progression.progressionTip}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Plano de Treino */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Seu plano de treino</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 mb-6">
            <TabsTrigger value="13-19">13-19</TabsTrigger>
            <TabsTrigger value="20-29">20-29</TabsTrigger>
            <TabsTrigger value="30-39">30-39</TabsTrigger>
            <TabsTrigger value="40-49">40-49</TabsTrigger>
            <TabsTrigger value="50-59">50-59</TabsTrigger>
            <TabsTrigger value="60-69">60-69</TabsTrigger>
            <TabsTrigger value="70-80">70-80</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card>
              <CardHeader className="bg-[#2a1f3d] border-b border-purple-800">
                <CardTitle className="text-xl text-purple-300">{currentWorkout.title}</CardTitle>
                <CardDescription className="text-purple-200">{currentWorkout.description}</CardDescription>
                {activeTab === recommendedAgeGroup && avaliacaoResults && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-900 text-green-300 border border-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Recomendado para você
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-4 text-purple-300">Exercícios desta semana:</h3>
                <div className="space-y-2">
                  {currentWorkout.exercises.map((exerciseId, index) => (
                    <div
                      key={exerciseId}
                      className="p-3 border border-purple-800 rounded-md flex items-center justify-between hover:bg-[#2a1f3d]"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-purple-200">
                            {exerciseId.split("-")[0].charAt(0).toUpperCase() + exerciseId.split("-")[0].slice(1)}
                          </p>
                          <p className="text-sm text-purple-400">{exerciseId.split("-")[1]}</p>
                        </div>
                      </div>
                      {completedExercises.includes(exerciseId) ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-purple-600"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/treinos">
                    <Button>Ver treino completo</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Estatísticas e Objetivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-400 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Seus objetivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-purple-300">Progresso semanal</h4>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div>
                <h4 className="font-medium mb-2 text-purple-300">Consistência</h4>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-md ${i < 3 ? "bg-purple-600" : "bg-[#2a1f3d]"}`}
                      title={`Dia ${i + 1}`}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-purple-300 mt-2">3 de 7 dias completados esta semana</p>
              </div>
              <Link href="/resultados-avaliacao">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver todos os objetivos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-400">Histórico de Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-[#2a1f3d] rounded">
                <span className="text-purple-200 text-sm">Avaliação Física</span>
                <span className="text-xs text-purple-400">{avaliacaoResults ? "Concluída" : "Pendente"}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-[#2a1f3d] rounded">
                <span className="text-purple-200 text-sm">Primeiro Treino</span>
                <span className="text-xs text-purple-400">{completedCount > 0 ? "Iniciado" : "Não iniciado"}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-[#2a1f3d] rounded">
                <span className="text-purple-200 text-sm">Meta Semanal</span>
                <span className="text-xs text-purple-400">{Math.round(progressPercentage)}% concluída</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
