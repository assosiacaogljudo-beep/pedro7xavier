"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface TimerProps {
  seconds: number
  repetitions: number
}

export default function Timer({ seconds, repetitions }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [isActive, setIsActive] = useState(false)
  const [currentRep, setCurrentRep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1
          setProgress(((seconds - newTime) / seconds) * 100)
          return newTime
        })
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      if (currentRep < repetitions) {
        setCurrentRep(currentRep + 1)
        setTimeLeft(seconds)
        setProgress(0)
      } else {
        setCompleted(true)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, seconds, currentRep, repetitions])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(seconds)
    setCurrentRep(1)
    setProgress(0)
    setCompleted(false)
  }

  return (
    <div className="print:hidden bg-slate-50 p-3 rounded-md border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div className="text-lg font-medium">{timeLeft}s</div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Repetição {currentRep}/{repetitions}
          </Badge>
          {completed && <Badge className="bg-emerald-500 text-xs">Concluído</Badge>}
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-3" />

      <div className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={toggleTimer} className="flex-1" disabled={completed}>
          {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {isActive ? "Pausar" : "Iniciar"}
        </Button>
        <Button size="sm" variant="outline" onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
