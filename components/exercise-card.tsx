"use client"

import { useState, type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

interface ExerciseCardProps {
  id: string
  title: string
  steps: string[]
  imagePath: string
  imageUrl?: string
  tips?: string
  difficulty?: string
  recommendedAges?: number[]
  children?: ReactNode
  onComplete?: () => void
  isCompleted?: boolean
}

export default function ExerciseCard({
  id,
  title,
  steps,
  imagePath,
  imageUrl,
  tips,
  difficulty = "moderado",
  recommendedAges = [60, 70, 80, 90],
  children,
  onComplete,
  isCompleted,
}: ExerciseCardProps) {
  const [imageError, setImageError] = useState(false)

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "facil":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderado":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "avancado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getDifficultyText = () => {
    switch (difficulty) {
      case "facil":
        return "Fácil"
      case "moderado":
        return "Moderado"
      case "avancado":
        return "Avançado"
      default:
        return "Moderado"
    }
  }

  const getAgeRangeText = () => {
    if (!recommendedAges || recommendedAges.length === 0) return "Todas as idades"

    const min = Math.min(...recommendedAges)
    const max = Math.max(...recommendedAges)

    if (min === max) return `${min}+ anos`
    return `${min}-${max === 100 ? "+" : max} anos`
  }

  return (
    <Card className={`h-full transition-all ${isCompleted ? "border-emerald-300 bg-emerald-50" : ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-emerald-600 flex items-center justify-between">
          <span className="flex items-center">
            {title}
            {isCompleted && <CheckCircle className="h-5 w-5 text-emerald-500 ml-2" />}
          </span>
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${getDifficultyColor()}`}>{getDifficultyText()}</Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Recomendado para: {getAgeRangeText()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-shrink-0 w-[150px] h-[150px] relative">
            {imageUrl && !imageError ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={`Ilustração do exercício: ${title}`}
                className="rounded-md object-cover w-[150px] h-[150px]"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                src={imagePath || "/placeholder.svg"}
                alt={`Ilustração do exercício: ${title}`}
                width={150}
                height={150}
                className="rounded-md object-cover"
              />
            )}
          </div>
          <div className="flex-grow">
            <ul className="list-none space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="text-base">
                  {step}
                </li>
              ))}
            </ul>
            {tips && (
              <div className="mt-3 bg-amber-50 p-2 rounded-md border border-amber-100">
                <p className="text-sm text-amber-800">
                  <span className="font-medium">Dica:</span> {tips}
                </p>
              </div>
            )}
            {children && <div className="mt-4">{children}</div>}
            {onComplete && !isCompleted && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                onClick={onComplete}
              >
                Marcar como concluído
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
