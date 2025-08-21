"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, RefreshCw, Eye } from "lucide-react"
import Link from "next/link"

interface AvaliacaoSummaryProps {
  className?: string
}

export default function AvaliacaoSummary({ className = "" }: AvaliacaoSummaryProps) {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar resultados do localStorage
    const savedResults = localStorage.getItem("avaliacaoFisica")
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    }
    setLoading(false)
  }, [])

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

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-purple-300">Carregando avaliação...</div>
        </CardContent>
      </Card>
    )
  }

  if (!results) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg text-purple-400">Avaliação Física</CardTitle>
          <CardDescription className="text-purple-200">
            Complete sua avaliação física para receber recomendações personalizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/avaliacao-fisica">
            <Button className="w-full">Fazer Avaliação Física</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg text-purple-400">Sua Avaliação Física</CardTitle>
        <CardDescription className="text-purple-200">Resumo dos resultados da sua última avaliação</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pontuação */}
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-300 mb-1">{results.percentageScore}%</div>
          <Progress value={results.percentageScore} className="h-2 mb-2" />
          <Badge className={`${getFitnessLevelColor(results.fitnessLevel)} text-sm`}>{results.fitnessLevel}</Badge>
        </div>

        {/* Status de Saúde */}
        {results.riskFactors.length > 0 ? (
          <Alert className="bg-red-950 border-red-800">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertTitle className="text-red-300 text-sm">Atenção</AlertTitle>
            <AlertDescription className="text-red-200 text-xs">
              {results.riskFactors.length} fator(es) de risco identificado(s)
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-green-950 border-green-800">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertTitle className="text-green-300 text-sm">Boa Condição</AlertTitle>
            <AlertDescription className="text-green-200 text-xs">Sem fatores de risco significativos</AlertDescription>
          </Alert>
        )}

        {/* Ações */}
        <div className="flex gap-2">
          <Link href="/resultados-avaliacao" className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Eye className="h-4 w-4 mr-1" />
              Ver Detalhes
            </Button>
          </Link>
          <Link href="/avaliacao-fisica" className="flex-1">
            <Button variant="ghost" size="sm" className="w-full">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refazer
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
