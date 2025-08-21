"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { CheckCircle, AlertTriangle, Info, TrendingUp, Target, Clock, Activity, Heart, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function ResultadosAvaliacao() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Carregar resultados do localStorage
    const savedResults = localStorage.getItem("avaliacaoFisica")
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    } else {
      // Se não há resultados, redirecionar para a avaliação
      router.push("/avaliacao-fisica")
    }
    setLoading(false)
  }, [router])

  const getFitnessLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante":
        return "bg-red-100 text-red-800 border-red-200"
      case "Básico":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Intermediário":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Avançado":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRecommendedProgram = (results: any) => {
    const { fitnessLevel, riskFactors, answers } = results

    if (riskFactors.length > 0) {
      return {
        title: "Programa Supervisionado",
        description: "Recomendamos acompanhamento médico e profissional especializado",
        intensity: "Baixa a Moderada",
        frequency: "2-3x por semana",
        duration: "20-30 minutos",
        color: "border-red-500 bg-red-50",
      }
    }

    switch (fitnessLevel) {
      case "Iniciante":
        return {
          title: "Programa Iniciante",
          description: "Exercícios básicos para construir uma base sólida",
          intensity: "Baixa",
          frequency: "2-3x por semana",
          duration: "15-25 minutos",
          color: "border-yellow-500 bg-yellow-50",
        }
      case "Básico":
        return {
          title: "Programa Básico",
          description: "Exercícios fundamentais com progressão gradual",
          intensity: "Baixa a Moderada",
          frequency: "3-4x por semana",
          duration: "25-35 minutos",
          color: "border-blue-500 bg-blue-50",
        }
      case "Intermediário":
        return {
          title: "Programa Intermediário",
          description: "Exercícios variados com desafios progressivos",
          intensity: "Moderada",
          frequency: "4-5x por semana",
          duration: "35-45 minutos",
          color: "border-green-500 bg-green-50",
        }
      case "Avançado":
        return {
          title: "Programa Avançado",
          description: "Exercícios complexos e alta intensidade",
          intensity: "Moderada a Alta",
          frequency: "5-6x por semana",
          duration: "45-60 minutos",
          color: "border-purple-500 bg-purple-50",
        }
      default:
        return {
          title: "Programa Personalizado",
          description: "Programa adaptado às suas necessidades específicas",
          intensity: "Variável",
          frequency: "Conforme disponibilidade",
          duration: "Flexível",
          color: "border-gray-500 bg-gray-50",
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1625] flex items-center justify-center">
        <div className="text-purple-300">Carregando resultados...</div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-[#1a1625] flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-purple-400">Nenhuma avaliação encontrada</CardTitle>
            <CardDescription className="text-purple-200">
              Você precisa completar a avaliação física primeiro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/avaliacao-fisica">
              <Button className="w-full">Fazer Avaliação Física</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const recommendedProgram = getRecommendedProgram(results)

  return (
    <div className="min-h-screen bg-[#1a1625] p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400 mb-2">Resultados da Avaliação Física</h1>
          <p className="text-purple-200">Análise completa do seu perfil de condicionamento físico</p>
        </div>

        {/* Pontuação Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Pontuação Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-300 mb-2">{results.percentageScore}%</div>
              <Progress value={results.percentageScore} className="h-3 mb-2" />
              <p className="text-sm text-purple-200">
                {results.totalScore} de {results.maxScore} pontos
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Nível de Condicionamento</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`text-lg px-4 py-2 ${getFitnessLevelColor(results.fitnessLevel)}`}>
                {results.fitnessLevel}
              </Badge>
              <div className="mt-4">
                <TrendingUp className="h-8 w-8 text-purple-400 mx-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Status de Saúde</CardTitle>
            </CardHeader>
            <CardContent>
              {results.riskFactors.length > 0 ? (
                <>
                  <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <p className="text-red-300 font-medium">Atenção Necessária</p>
                  <p className="text-sm text-red-200 mt-1">
                    {results.riskFactors.length} fator(es) de risco identificado(s)
                  </p>
                </>
              ) : (
                <>
                  <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-300 font-medium">Boa Condição</p>
                  <p className="text-sm text-green-200 mt-1">Sem fatores de risco significativos</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Programa Recomendado */}
        <Card className={`mb-8 ${recommendedProgram.color} border-2`}>
          <CardHeader>
            <CardTitle className="text-xl text-purple-400 flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Programa Recomendado
            </CardTitle>
            <CardDescription className="text-purple-200">{recommendedProgram.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h4 className="font-medium text-purple-300">Intensidade</h4>
                <p className="text-purple-200 text-sm">{recommendedProgram.intensity}</p>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h4 className="font-medium text-purple-300">Frequência</h4>
                <p className="text-purple-200 text-sm">{recommendedProgram.frequency}</p>
              </div>
              <div className="text-center">
                <Zap className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h4 className="font-medium text-purple-300">Duração</h4>
                <p className="text-purple-200 text-sm">{recommendedProgram.duration}</p>
              </div>
              <div className="text-center">
                <Heart className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h4 className="font-medium text-purple-300">Foco</h4>
                <p className="text-purple-200 text-sm">Saúde Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fatores de Risco */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Análise de Riscos</CardTitle>
            </CardHeader>
            <CardContent>
              {results.riskFactors.length > 0 ? (
                <Alert className="bg-red-950 border-red-800 mb-4">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertTitle className="text-red-300">Fatores de Risco Identificados</AlertTitle>
                  <AlertDescription className="text-red-200">
                    <ul className="list-disc list-inside mt-2 space-y-1">
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
                  <AlertTitle className="text-green-300">Perfil de Baixo Risco</AlertTitle>
                  <AlertDescription className="text-green-200">
                    Não foram identificados fatores de risco significativos. Você pode iniciar um programa de exercícios
                    com segurança.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Recomendações Personalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.recommendations.slice(0, 4).map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-[#2a1f3d] rounded-lg">
                    <Info className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-purple-200 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Detalhado */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-purple-400">Resumo da Avaliação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Nível de Atividade</h4>
                <p className="text-purple-200 text-sm">
                  {results.answers["atividade-fisica"] === "sedentario" && "Sedentário"}
                  {results.answers["atividade-fisica"] === "leve" && "Leve"}
                  {results.answers["atividade-fisica"] === "moderado" && "Moderado"}
                  {results.answers["atividade-fisica"] === "ativo" && "Ativo"}
                  {results.answers["atividade-fisica"] === "muito-ativo" && "Muito Ativo"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Condição Física</h4>
                <p className="text-purple-200 text-sm">{results.answers["condicao-fisica"]}/10</p>
              </div>
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Nível de Energia</h4>
                <p className="text-purple-200 text-sm">{results.answers["nivel-energia"]}/10</p>
              </div>
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Experiência</h4>
                <p className="text-purple-200 text-sm">
                  {results.answers["experiencia-exercicio"] === "nunca" && "Nunca pratiquei"}
                  {results.answers["experiencia-exercicio"] === "iniciante" && "Iniciante"}
                  {results.answers["experiencia-exercicio"] === "intermediario" && "Intermediário"}
                  {results.answers["experiencia-exercicio"] === "avancado" && "Avançado"}
                  {results.answers["experiencia-exercicio"] === "expert" && "Expert"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/treinos">
              <Button size="lg" className="px-8">
                Começar Treinos Personalizados
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Ir para o Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/avaliacao-fisica">
              <Button variant="ghost" size="sm">
                Refazer Avaliação
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const dataStr = JSON.stringify(results, null, 2)
                const dataBlob = new Blob([dataStr], { type: "application/json" })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement("a")
                link.href = url
                link.download = "avaliacao-fisica.json"
                link.click()
              }}
            >
              Baixar Resultados
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
