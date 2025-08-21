import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressTrackerProps {
  completedExercises: number
  totalExercises: number
  className?: string
}

export default function ProgressTracker({ completedExercises, totalExercises, className = "" }: ProgressTrackerProps) {
  const progressPercentage = (completedExercises / totalExercises) * 100

  let message = "Vamos começar!"
  if (progressPercentage > 0 && progressPercentage < 50) {
    message = "Bom começo! Continue assim."
  } else if (progressPercentage >= 50 && progressPercentage < 100) {
    message = "Você está indo muito bem!"
  } else if (progressPercentage === 100) {
    message = "Parabéns! Você completou todos os exercícios."
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-2">Seu progresso</h3>
        <Progress value={progressPercentage} className="h-2 mb-2" />
        <div className="flex justify-between text-sm">
          <span>
            {completedExercises} de {totalExercises} exercícios
          </span>
          <span className="text-emerald-600 font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <p className="mt-2 text-sm text-center text-emerald-700">{message}</p>
      </CardContent>
    </Card>
  )
}
