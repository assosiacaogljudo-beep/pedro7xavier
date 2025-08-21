"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [experiencia, setExperiencia] = useState("")
  const [objetivos, setObjetivos] = useState<string[]>([])
  const [limitacoes, setLimitacoes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleFinish = async () => {
    setIsLoading(true)

    try {
      // Simulação de salvamento dos dados - em um app real, isso seria uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para o dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Erro ao salvar preferências:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleObjetivo = (value: string) => {
    setObjetivos(objetivos.includes(value) ? objetivos.filter((item) => item !== value) : [...objetivos, value])
  }

  const toggleLimitacao = (value: string) => {
    setLimitacoes(limitacoes.includes(value) ? limitacoes.filter((item) => item !== value) : [...limitacoes, value])
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-emerald-700">Vamos personalizar sua experiência</CardTitle>
          <CardDescription className="text-center">
            Responda algumas perguntas para adaptarmos os exercícios às suas necessidades
          </CardDescription>
          <Progress value={(step / 3) * 100} className="h-2 mt-4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Qual sua experiência com exercícios físicos?</h3>
              <RadioGroup value={experiencia} onValueChange={setExperiencia}>
                <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                  <RadioGroupItem value="iniciante" id="iniciante" />
                  <Label htmlFor="iniciante" className="flex-1 cursor-pointer">
                    <span className="font-medium">Iniciante</span>
                    <p className="text-sm text-gray-500">Nunca pratiquei exercícios regularmente</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                  <RadioGroupItem value="intermediario" id="intermediario" />
                  <Label htmlFor="intermediario" className="flex-1 cursor-pointer">
                    <span className="font-medium">Intermediário</span>
                    <p className="text-sm text-gray-500">Já pratiquei exercícios, mas não regularmente</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                  <RadioGroupItem value="avancado" id="avancado" />
                  <Label htmlFor="avancado" className="flex-1 cursor-pointer">
                    <span className="font-medium">Avançado</span>
                    <p className="text-sm text-gray-500">Pratico exercícios regularmente</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quais são seus principais objetivos? (selecione até 3)</h3>
              <div className="space-y-2">
                {[
                  { id: "mobilidade", label: "Melhorar a mobilidade" },
                  { id: "forca", label: "Aumentar a força muscular" },
                  { id: "equilibrio", label: "Melhorar o equilíbrio" },
                  { id: "postura", label: "Corrigir a postura" },
                  { id: "dor", label: "Reduzir dores no corpo" },
                  { id: "cardiovascular", label: "Melhorar a saúde cardiovascular" },
                  { id: "independencia", label: "Manter a independência" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Checkbox
                      id={item.id}
                      checked={objetivos.includes(item.id)}
                      onCheckedChange={() => toggleObjetivo(item.id)}
                      disabled={objetivos.length >= 3 && !objetivos.includes(item.id)}
                    />
                    <label htmlFor={item.id} className="flex-1 cursor-pointer font-medium">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Você tem alguma limitação física? (selecione todas que se aplicam)
              </h3>
              <div className="space-y-2">
                {[
                  { id: "joelhos", label: "Problemas nos joelhos" },
                  { id: "coluna", label: "Dores na coluna" },
                  { id: "ombros", label: "Limitação nos ombros" },
                  { id: "equilibrio", label: "Dificuldade de equilíbrio" },
                  { id: "respiratorio", label: "Problemas respiratórios" },
                  { id: "cardiaco", label: "Problemas cardíacos" },
                  { id: "nenhuma", label: "Não tenho limitações" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Checkbox
                      id={item.id}
                      checked={limitacoes.includes(item.id)}
                      onCheckedChange={() => toggleLimitacao(item.id)}
                      disabled={
                        item.id === "nenhuma"
                          ? limitacoes.length > 0 && !limitacoes.includes("nenhuma")
                          : limitacoes.includes("nenhuma")
                      }
                    />
                    <label htmlFor={item.id} className="flex-1 cursor-pointer font-medium">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Voltar
            </Button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={(step === 1 && !experiencia) || (step === 2 && objetivos.length === 0)}
            >
              Próximo
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={isLoading || limitacoes.length === 0}>
              {isLoading ? "Finalizando..." : "Finalizar"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
