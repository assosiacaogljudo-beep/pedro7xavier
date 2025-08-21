"use client"

import { useState, useEffect } from "react"
import { Printer, ChevronLeft, ChevronRight, CheckCircle, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import ExerciseCard from "./exercise-card"
import Timer from "./timer"
import ProgressTracker from "./progress-tracker"
import { exercisesData } from "@/data/exercises"

export default function ExerciseGuide() {
  const [activeTab, setActiveTab] = useState("intro")
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ageRange, setAgeRange] = useState<[number, number]>([60, 100])
  const [filteredExercises, setFilteredExercises] = useState(exercisesData)
  const [difficultyLevel, setDifficultyLevel] = useState("todos")

  useEffect(() => {
    const filtered = exercisesData.filter((exercise) => {
      // Filtro por termo de busca
      const matchesSearch =
        searchTerm === "" ||
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por faixa etária
      const matchesAge = exercise.recommendedAges.some((age) => age >= ageRange[0] && age <= ageRange[1])

      // Filtro por nível de dificuldade
      const matchesDifficulty = difficultyLevel === "todos" || exercise.difficulty === difficultyLevel

      return matchesSearch && matchesAge && matchesDifficulty
    })

    setFilteredExercises(filtered)
  }, [searchTerm, ageRange, difficultyLevel])

  const handlePrint = () => {
    window.print()
  }

  const markExerciseComplete = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId])
    }
  }

  const resetProgress = () => {
    setCompletedExercises([])
  }

  const totalExercises = filteredExercises.length
  const progressPercentage =
    totalExercises > 0
      ? (completedExercises.filter((id) => filteredExercises.some((ex) => ex.id === id)).length / totalExercises) * 100
      : 0

  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange([values[0], values[1]])
  }

  const getAgeRangeText = () => {
    return `${ageRange[0]}-${ageRange[1] === 100 ? "+" : ageRange[1]} anos`
  }

  const groupedExercises = filteredExercises.reduce(
    (acc, exercise) => {
      if (!acc[exercise.category]) {
        acc[exercise.category] = []
      }
      acc[exercise.category].push(exercise)
      return acc
    },
    {} as Record<string, typeof exercisesData>,
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl print:py-2">
      <div className="flex justify-between items-center mb-6 print:mb-2">
        <h1 className="text-3xl font-bold text-emerald-700 print:text-2xl">
          Apostila de Exercícios Físicos para Idosos
        </h1>
        <div className="flex gap-2 print:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtrar Exercícios</SheetTitle>
                <SheetDescription>Personalize os exercícios de acordo com suas necessidades</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Pesquisar</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Buscar exercícios..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Faixa Etária: {getAgeRangeText()}</Label>
                  <Slider
                    defaultValue={[60, 100]}
                    min={60}
                    max={100}
                    step={5}
                    value={[ageRange[0], ageRange[1]]}
                    onValueChange={handleAgeRangeChange}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>60 anos</span>
                    <span>100+ anos</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                  <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os níveis</SelectItem>
                      <SelectItem value="facil">Fácil</SelectItem>
                      <SelectItem value="moderado">Moderado</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setAgeRange([60, 100])
                      setDifficultyLevel("todos")
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mb-6 print:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Seu progresso</span>
          <span className="text-sm text-emerald-600">
            {completedExercises.filter((id) => filteredExercises.some((ex) => ex.id === id)).length}/{totalExercises}{" "}
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="print:block">
        <TabsList className="grid grid-cols-5 mb-6 print:hidden">
          <TabsTrigger value="intro">Introdução</TabsTrigger>
          <TabsTrigger value="benefits">Benefícios</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="exercises">Exercícios</TabsTrigger>
          <TabsTrigger value="conclusion">Finalização</TabsTrigger>
        </TabsList>

        <TabsContent value="intro" className="print:block print:mb-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">Introdução</h2>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <img
                    src="/images/idosos-exercicio.jpg"
                    alt="Idosos praticando exercícios"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg mb-4">
                    A prática regular de exercícios físicos é essencial para a manutenção da saúde e da qualidade de
                    vida na terceira idade. Com o envelhecimento, é comum haver redução da força muscular,
                    flexibilidade, mobilidade e equilíbrio. Os exercícios ajudam a manter a independência funcional e
                    prevenirem doenças.
                  </p>
                  <p className="text-lg">
                    Este guia foi desenvolvido especialmente para idosos, com exercícios seguros e eficazes que podem
                    ser realizados em casa. Siga as instruções com atenção e respeite sempre seus limites.
                  </p>
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md">
                    <h3 className="font-medium text-amber-800">Exercícios por Faixa Etária</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Este guia permite filtrar exercícios por faixa etária, reconhecendo que as necessidades e
                      capacidades variam com a idade. Use o filtro para encontrar exercícios mais adequados para você.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 print:hidden">
                <Button onClick={() => setActiveTab("benefits")}>
                  Próximo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="print:block print:mb-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">Benefícios dos Exercícios para Idosos</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Melhora da força muscular:</span> Previne a perda de massa
                        muscular e aumenta a capacidade funcional.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Aumento da flexibilidade:</span> Melhora a amplitude de movimento
                        das articulações.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Melhora do equilíbrio e prevenção de quedas:</span> Reduz o risco
                        de acidentes e fraturas.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Controle de doenças crônicas:</span> Ajuda no controle de
                        diabetes, hipertensão e doenças cardiovasculares.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Melhora da saúde mental e bem-estar:</span> Reduz sintomas de
                        ansiedade e depressão, melhora o humor e a qualidade do sono.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3">
                  <img
                    src="/images/beneficios-exercicios.jpg"
                    alt="Benefícios dos exercícios para idosos"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4 print:hidden">
                <Button variant="outline" onClick={() => setActiveTab("intro")}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button onClick={() => setActiveTab("recommendations")}>
                  Próximo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="print:block print:mb-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">Recomendações Gerais</h2>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <img
                    src="/images/recomendacoes-exercicios.jpg"
                    alt="Recomendações para exercícios seguros"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-emerald-100 text-emerald-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <span className="font-medium">Consulte um profissional de saúde</span> antes de iniciar qualquer
                        programa de exercícios, especialmente se você tiver condições médicas pré-existentes.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-emerald-100 text-emerald-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <span className="font-medium">Use roupas leves e confortáveis</span> e calçados apropriados que
                        ofereçam bom suporte.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-emerald-100 text-emerald-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <span className="font-medium">Hidrate-se bem</span> antes, durante e depois das atividades.
                        Tenha sempre água por perto.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-emerald-100 text-emerald-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <span className="font-medium">Realize os exercícios em um ambiente seguro</span>, livre de
                        obstáculos e com boa iluminação.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-emerald-100 text-emerald-700 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        5
                      </div>
                      <div>
                        <span className="font-medium">Respeite seus limites</span> e aumente a intensidade gradualmente.
                        Pare imediatamente se sentir dor, tontura ou desconforto.
                      </div>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <h3 className="font-medium text-blue-800">Recomendações por Idade</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      <strong>60-69 anos:</strong> Foco em exercícios de força e resistência moderados.
                      <br />
                      <strong>70-79 anos:</strong> Priorize exercícios de equilíbrio e flexibilidade.
                      <br />
                      <strong>80+ anos:</strong> Exercícios mais suaves com ênfase na mobilidade e prevenção de quedas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4 print:hidden">
                <Button variant="outline" onClick={() => setActiveTab("benefits")}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button onClick={() => setActiveTab("exercises")}>
                  Próximo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="print:block print:mb-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-emerald-600">Exercícios</h2>
                <div className="flex items-center gap-2 print:hidden">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar exercícios..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Nível de dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os níveis</SelectItem>
                      <SelectItem value="facil">Fácil</SelectItem>
                      <SelectItem value="moderado">Moderado</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 print:hidden">
                <p className="text-sm">
                  Faixa etária: <strong>{getAgeRangeText()}</strong>
                </p>
                <Slider
                  defaultValue={[60, 100]}
                  min={60}
                  max={100}
                  step={5}
                  value={[ageRange[0], ageRange[1]]}
                  onValueChange={handleAgeRangeChange}
                  className="w-64"
                />
              </div>

              {filteredExercises.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-500">Nenhum exercício encontrado com os filtros atuais.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setAgeRange([60, 100])
                      setDifficultyLevel("todos")
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              ) : (
                Object.entries(groupedExercises).map(([category, exercises]) => (
                  <div key={category} className="mb-8 print:mb-4">
                    <h3 className="text-xl font-bold text-emerald-500 mb-4">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {exercises.map((exercise) => (
                        <ExerciseCard
                          key={exercise.id}
                          id={exercise.id}
                          title={exercise.title}
                          steps={exercise.steps}
                          imagePath={exercise.imagePath}
                          imageUrl={exercise.imageUrl}
                          tips={exercise.tips}
                          difficulty={exercise.difficulty}
                          recommendedAges={exercise.recommendedAges}
                          onComplete={() => markExerciseComplete(exercise.id)}
                          isCompleted={completedExercises.includes(exercise.id)}
                        >
                          {exercise.timerSeconds > 0 && (
                            <Timer seconds={exercise.timerSeconds} repetitions={exercise.timerRepetitions} />
                          )}
                        </ExerciseCard>
                      ))}
                    </div>
                  </div>
                ))
              )}

              <div className="flex justify-between mt-4 print:hidden">
                <Button variant="outline" onClick={() => setActiveTab("recommendations")}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button onClick={() => setActiveTab("conclusion")}>
                  Próximo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conclusion" className="print:block print:mb-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">Finalização</h2>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/3">
                  <p className="text-lg mb-4">
                    A prática regular desses exercícios contribui para o bem-estar físico e mental. É importante manter
                    a consistência e buscar atividades prazerosas que incentivem o movimento.
                  </p>
                  <p className="text-lg mb-4">
                    Recomenda-se realizar estes exercícios pelo menos 3 vezes por semana, sempre respeitando seus
                    limites e progredindo gradualmente. Com o tempo, você notará melhorias na sua força, flexibilidade e
                    equilíbrio.
                  </p>
                  <p className="text-lg">Lembre-se: nunca é tarde para começar a se exercitar e cuidar da saúde!</p>

                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-md">
                    <h3 className="font-medium text-emerald-800 mb-2">Adaptação por Idade</h3>
                    <p className="text-sm text-emerald-700">
                      Este guia permite personalizar os exercícios de acordo com sua idade e condição física. Use os
                      filtros para encontrar os exercícios mais adequados para você e consulte sempre um profissional de
                      saúde antes de iniciar qualquer programa de exercícios.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <img
                    src="/images/idosos-ativos.jpg"
                    alt="Idosos ativos e saudáveis"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
              <div className="mt-6 text-right italic">
                <p>Criado por Pedro Xavier</p>
              </div>
              <div className="flex justify-start mt-4 print:hidden">
                <Button variant="outline" onClick={() => setActiveTab("exercises")}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProgressTracker
        completedExercises={completedExercises.filter((id) => filteredExercises.some((ex) => ex.id === id)).length}
        totalExercises={totalExercises}
        className="mt-8 print:hidden"
      />

      <div className="mt-8 text-center text-sm text-gray-500 print:hidden">
        © 2025 Apostila de Exercícios Físicos para Idosos
      </div>
    </div>
  )
}
