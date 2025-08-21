"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"

export default function CadastroPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [idade, setIdade] = useState("")
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (!aceitaTermos) {
      setError("Você precisa aceitar os termos de uso")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulação de cadastro - em um app real, isso seria uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulando cadastro bem-sucedido
      localStorage.setItem("isLoggedIn", "true")
      router.push("/avaliacao-fisica") // Alterado de "/onboarding" para "/avaliacao-fisica"
    } catch (err) {
      setError("Ocorreu um erro ao fazer o cadastro. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center text-emerald-600 mb-6 hover:text-emerald-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-emerald-700">Crie sua conta</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para começar sua jornada de exercícios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idade">Faixa etária</Label>
                <Select value={idade} onValueChange={setIdade} required>
                  <SelectTrigger id="idade">
                    <SelectValue placeholder="Selecione sua faixa etária" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13-19">13-19 anos</SelectItem>
                    <SelectItem value="20-29">20-29 anos</SelectItem>
                    <SelectItem value="30-39">30-39 anos</SelectItem>
                    <SelectItem value="40-49">40-49 anos</SelectItem>
                    <SelectItem value="50-59">50-59 anos</SelectItem>
                    <SelectItem value="60-69">60-69 anos</SelectItem>
                    <SelectItem value="70-80">70-80 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="termos"
                  checked={aceitaTermos}
                  onCheckedChange={(checked) => setAceitaTermos(checked as boolean)}
                  required
                />
                <label
                  htmlFor="termos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eu aceito os{" "}
                  <Link href="/termos" className="text-emerald-600 hover:underline">
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-emerald-600 hover:underline">
                    política de privacidade
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-gray-600 mt-2">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
