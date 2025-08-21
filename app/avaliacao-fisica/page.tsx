"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Definição das perguntas do quiz
const questions = [
  {
    id: "atividade-fisica",
    title: "Qual seu nível de atividade física atual?",
    description: "Selecione a opção que melhor descreve sua rotina de exercícios",
    type: "radio",
    options: [
      { value: "sedentario", label: "Sedentário (nenhuma atividade física)", score: 1 },
      { value: "leve", label: "Leve (caminhadas ocasionais, 1-2 vezes por semana)", score: 2 },
      { value: "moderado", label: "Moderado (exercícios regulares, 2-3 vezes por semana)", score: 3 },
      { value: "ativo", label: "Ativo (exercícios intensos, 3-5 vezes por semana)", score: 4 },
      { value: "muito-ativo", label: "Muito ativo (exercícios diários ou atleta)", score: 5 },
    ],
  },
  {
    id: "condicao-fisica",
    title: "Como você avalia sua condição física atual?",
    description: "Arraste o controle deslizante para indicar sua percepção (1 = Muito ruim, 10 = Excelente)",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 5,
    labels: {
      1: "Muito ruim",
      5: "Regular",
      10: "Excelente",
    },
  },
  {
    id: "limitacoes",
    title: "Você possui alguma limitação física?",
    description: "Selecione todas as opções aplicáveis",
    type: "checkbox",
    options: [
      { value: "articulacoes", label: "Problemas nas articulações (joelhos, quadril, ombros)", risk: "medium" },
      { value: "coluna", label: "Dores ou problemas na coluna", risk: "medium" },
      { value: "cardio", label: "Problemas cardiovasculares", risk: "high" },
      { value: "respiratorio", label: "Problemas respiratórios", risk: "high" },
      { value: "equilibrio", label: "Dificuldades de equilíbrio", risk: "medium" },
      { value: "nenhuma", label: "Não possuo limitações físicas", risk: "low" },
    ],
  },
  {
    id: "objetivos",
    title: "Quais são seus principais objetivos?",
    description: "Selecione até 3 objetivos principais",
    type: "checkbox",
    options: [
      { value: "perda-peso", label: "Perda de peso" },
      { value: "ganho-muscular", label: "Ganho de massa muscular" },
      { value: "resistencia", label: "Melhorar resistência cardiovascular" },
      { value: "flexibilidade", label: "Aumentar flexibilidade" },
      { value: "equilibrio", label: "Melhorar equilíbrio e coordenação" },
      { value: "saude-geral", label: "Melhorar saúde geral" },
      { value: "reabilitacao", label: "Reabilitação de lesão" },
    ],
    maxSelections: 3,
  },
  {
    id: "frequencia",
    title: "Quantas vezes por semana você pretende se exercitar?",
    description: "Selecione a opção mais adequada à sua rotina",
    type: "radio",
    options: [
      { value: "1-2", label: "1-2 vezes por semana", score: 2 },
      { value: "3-4", label: "3-4 vezes por semana", score: 3 },
      { value: "5-6", label: "5-6 vezes por semana", score: 4 },
      { value: "diario", label: "Todos os dias", score: 5 },
    ],
  },
  {
    id: "tempo-disponivel",
    title: "Quanto tempo você tem disponível para cada sessão de exercícios?",
    description: "Selecione a opção que melhor se adequa à sua disponibilidade",
    type: "radio",
    options: [
      { value: "15min", label: "Até 15 minutos", score: 1 },
      { value: "30min", label: "15-30 minutos", score: 2 },
      { value: "45min", label: "30-45 minutos", score: 3 },
      { value: "60min", label: "45-60 minutos", score: 4 },
      { value: "60min+", label: "Mais de 60 minutos", score: 5 },
    ],
  },
  {
    id: "historico-medico",
    title: "Você possui alguma condição médica que devemos considerar?",
    description: "Selecione todas as opções aplicáveis",
    type: "checkbox",
    options: [
      { value: "hipertensao", label: "Hipertensão", risk: "medium" },
      { value: "diabetes", label: "Diabetes", risk: "medium" },
      { value: "cardiaco", label: "Problemas cardíacos", risk: "high" },
      { value: "artrite", label: "Artrite ou artrose", risk: "medium" },
      { value: "osteoporose", label: "Osteoporose", risk: "high" },
      { value: "outro", label: "Outra condição médica", risk: "medium" },
      { value: "nenhuma", label: "Não possuo condições médicas relevantes", risk: "low" },
    ],
  },
  {
    id: "nivel-energia",
    title: "Como você avalia seu nível de energia diário?",
    description: "Arraste o controle deslizante para indicar seu nível de energia (1 = Muito baixo, 10 = Muito alto)",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 5,
    labels: {
      1: "Muito baixo",
      5: "Moderado",
      10: "Muito alto",
    },
  },
  {
    id: "experiencia-exercicio",
    title: "Qual sua experiência com exercícios físicos?",
    description: "Selecione a opção que melhor descreve seu histórico",
    type: "radio",
    options: [
      { value: "nunca", label: "Nunca pratiquei exercícios regularmente", score: 1 },
      { value: "iniciante", label: "Iniciante (menos de 6 meses de prática)", score: 2 },
      { value: "intermediario", label: "Intermediário (6 meses a 2 anos)", score: 3 },
      { value: "avancado", label: "Avançado (mais de 2 anos)", score: 4 },
      { value: "expert", label: "Expert (mais de 5 anos ou profissional)", score: 5 },
    ],
  },
  {
    id: "preferencias",
    title: "Que tipo de exercícios você prefere?",
    description: "Selecione todas as opções que lhe interessam",
    type: "checkbox",
    options: [
      { value: "caminhada", label: "Caminhada" },
      { value: "natacao", label: "Natação" },
      { value: "yoga", label: "Yoga/Pilates" },
      { value: "musculacao", label: "Musculação" },
      { value: "danca", label: "Dança" },
      { value: "esportes", label: "Esportes em grupo" },
      { value: "casa", label: "Exercícios em casa" },
      { value: "ar-livre", label: "Atividades ao ar livre" },
    ],
  },
]

export default function AvaliacaoFisica() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [completed, setCompleted] = useState(false)
  const [results, setResults] = useState<any>(null)
  const router = useRouter()

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleRadioChange = (value: string) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleSliderChange = (value: number[]) => {
    setAnswers({ ...answers, [question.id]: value[0] })
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = answers[question.id] || []
    let newValues

    if (value === "nenhuma" && checked) {
      // Se "nenhuma" foi selecionado, desmarcar todas as outras opções
      newValues = ["nenhuma"]
    } else if (checked) {
      // Se qualquer outra opção foi selecionada, remover "nenhuma" se estiver presente
      newValues = currentValues.filter((v: string) => v !== "nenhuma")
      newValues.push(value)

      // Verificar se há limite de seleções
      if (question.maxSelections && newValues.length > question.maxSelections) {
        return // Não permitir mais seleções
      }
    } else {
      // Se uma opção foi desmarcada, removê-la
      newValues = currentValues.filter((v: string) => v !== value)
    }

    setAnswers({ ...answers, [question.id]: newValues })
  }

  const calculateResults = () => {
    let totalScore = 0
    let maxScore = 0
    const riskFactors = []
    const recommendations = []

    // Calcular pontuação total
    for (const q of questions) {
      const answer = answers[q.id]

      if (q.type === "radio" && q.options) {
        const selectedOption = q.options.find((opt) => opt.value === answer)
        if (selectedOption && selectedOption.score) {
          totalScore += selectedOption.score
          maxScore += 5 // Máximo possível para questões de rádio
        }
      } else if (q.type === "slider") {
        totalScore += answer || q.defaultValue
        maxScore += q.max
      }
    }

    // Identificar fatores de risco
    const limitacoes = answers.limitacoes || []
    const historicoMedico = answers["historico-medico"] || []

    limitacoes.forEach((item) => {
      const allOptions = [
        ...(questions.find((q) => q.id === "limitacoes")?.options || []),
        ...(questions.find((q) => q.id === "historico-medico")?.options || []),
      ]
      const option = allOptions.find((opt) => opt.value === item)
      if (option && option.risk === "high") {
        riskFactors.push(option.label)
      }
    })

    historicoMedico.forEach((item) => {
      const allOptions = [
        ...(questions.find((q) => q.id === "limitacoes")?.options || []),
        ...(questions.find((q) => q.id === "historico-medico")?.options || []),
      ]
      const option = allOptions.find((opt) => opt.value === item)
      if (option && option.risk === "high") {
        riskFactors.push(option.label)
      }
    })

    // Gerar recomendações baseadas nas respostas
    const nivelAtividade = answers["atividade-fisica"]
    const objetivos = answers.objetivos || []
    const experiencia = answers["experiencia-exercicio"]

    if (nivelAtividade === "sedentario") {
      recommendations.push("Comece com exercícios leves e de baixo impacto")
      recommendations.push("Aumente gradualmente a intensidade ao longo das semanas")
    }

    if (objetivos.includes("perda-peso")) {
      recommendations.push("Combine exercícios cardiovasculares com fortalecimento muscular")
      recommendations.push("Mantenha consistência na frequência dos treinos")
    }

    if (objetivos.includes("equilibrio")) {
      recommendations.push("Inclua exercícios específicos de equilíbrio e propriocepção")
      recommendations.push("Pratique yoga ou tai chi para melhorar estabilidade")
    }

    if (riskFactors.length > 0) {
      recommendations.push("Consulte um médico antes de iniciar qualquer programa de exercícios")
      recommendations.push("Considere acompanhamento profissional especializado")
    }

    const percentageScore = (totalScore / maxScore) * 100
    let fitnessLevel = "Iniciante"

    if (percentageScore >= 80) fitnessLevel = "Avançado"
    else if (percentageScore >= 60) fitnessLevel = "Intermediário"
    else if (percentageScore >= 40) fitnessLevel = "Básico"

    return {
      totalScore,
      maxScore,
      percentageScore: Math.round(percentageScore),
      fitnessLevel,
      riskFactors,
      recommendations,
      answers,
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const calculatedResults = calculateResults()
      setResults(calculatedResults)
      setCompleted(true)

      // Salvar resultados no localStorage
      localStorage.setItem("avaliacaoFisica", JSON.stringify(calculatedResults))
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleFinish = () => {
    // Redirecionar para o dashboard
    router.push("/dashboard")
  }

  const isNextDisabled = () => {
    const answer = answers[question.id]
    if (!answer) return true
    if (question.type === "checkbox" && Array.isArray(answer) && answer.length === 0) return true
    return false
  }

  // Renderizar a página de resultados
  if (completed && results) {
    return (
      <div className="min-h-screen bg-[#1a1625] p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-400">Avaliação Física Concluída!</CardTitle>
              <CardDescription className="text-purple-200">
                Aqui estão os resultados da sua avaliação física personalizada
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Pontuação Geral */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-400">Pontuação Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">{results.percentageScore}%</div>
                  <div className="text-lg text-purple-200 mb-4">
                    Nível: <span className="font-semibold">{results.fitnessLevel}</span>
                  </div>
                  <Progress value={results.percentageScore} className="h-3" />
                  <p className="text-sm text-purple-300 mt-2">
                    {results.totalScore} de {results.maxScore} pontos
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Status de Saúde */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-400">Status de Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                {results.riskFactors.length > 0 ? (
                  <Alert className="bg-red-950 border-red-800">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertTitle className="text-red-300">Atenção Necessária</AlertTitle>
                    <AlertDescription className="text-red-200">
                      Foram identificados alguns fatores de risco:
                      <ul className="list-disc list-inside mt-2">
                        {results.riskFactors.map((factor: string, index: number) => (
                          <li key={index} className="text-sm">
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-green-950 border-green-800">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertTitle className="text-green-300">Boa Condição</AlertTitle>
                    <AlertDescription className="text-green-200">
                      Não foram identificados fatores de risco significativos. Você está apto para iniciar um programa
                      de exercícios.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recomendações Personalizadas */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Recomendações Personalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-[#2a1f3d] rounded-lg">
                    <Info className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-purple-200 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo das Respostas */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Resumo das Suas Respostas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-purple-300 mb-2">Nível de Atividade</h4>
                  <p className="text-purple-200 text-sm">
                    {questions[0].options?.find((opt) => opt.value === results.answers["atividade-fisica"])?.label}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-300 mb-2">Condição Física Atual</h4>
                  <p className="text-purple-200 text-sm">{results.answers["condicao-fisica"]}/10</p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-300 mb-2">Frequência Desejada</h4>
                  <p className="text-purple-200 text-sm">
                    {questions[4].options?.find((opt) => opt.value === results.answers.frequencia)?.label}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-300 mb-2">Tempo Disponível</h4>
                  <p className="text-purple-200 text-sm">
                    {questions[5].options?.find((opt) => opt.value === results.answers["tempo-disponivel"])?.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={handleFinish} size="lg" className="px-8">
              Ir para o Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-purple-300">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm text-purple-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <CardTitle className="text-xl text-purple-400">{question.title}</CardTitle>
          <CardDescription className="text-purple-200">{question.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {question.type === "radio" && (
            <RadioGroup value={answers[question.id] || ""} onValueChange={handleRadioChange} className="space-y-3">
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-3 rounded-md border border-purple-800 hover:bg-[#2a1f3d]"
                >
                  <RadioGroupItem id={option.value} value={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "slider" && (
            <div className="space-y-6">
              <Slider
                defaultValue={[question.defaultValue]}
                max={question.max}
                min={question.min}
                step={question.step}
                onValueChange={handleSliderChange}
                className="py-6"
              />
              <div className="flex justify-between text-sm text-purple-300">
                {Object.entries(question.labels).map(([value, label]) => (
                  <div key={value} className="text-center">
                    <div className="mb-1">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
              <div className="text-center text-lg font-medium text-purple-400 mt-4">
                Valor selecionado: {answers[question.id] || question.defaultValue}
              </div>
            </div>
          )}

          {question.type === "checkbox" && (
            <div className="space-y-3">
              {question.options.map((option) => {
                const currentValues = answers[question.id] || []
                const isChecked = Array.isArray(currentValues) && currentValues.includes(option.value)
                const isDisabled =
                  question.maxSelections &&
                  currentValues.length >= question.maxSelections &&
                  !isChecked &&
                  option.value !== "nenhuma"

                // Desabilitar outras opções se "nenhuma" estiver selecionada
                const isNoneSelected =
                  Array.isArray(currentValues) && currentValues.includes("nenhuma") && option.value !== "nenhuma"

                return (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-2 p-3 rounded-md border border-purple-800 ${
                      isDisabled || isNoneSelected ? "opacity-50" : "hover:bg-[#2a1f3d]"
                    }`}
                  >
                    <Checkbox
                      id={option.value}
                      checked={isChecked}
                      onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                      disabled={isDisabled || isNoneSelected}
                    />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                )
              })}
              {question.maxSelections && (
                <p className="text-sm text-purple-300 mt-2">
                  Selecione até {question.maxSelections} {question.maxSelections === 1 ? "opção" : "opções"}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          <Button onClick={handleNext} disabled={isNextDisabled()}>
            {currentQuestion < questions.length - 1 ? (
              <>
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Finalizar Avaliação"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
