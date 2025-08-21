"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  User,
  Ruler,
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle,
  Download,
  Timer,
  Zap,
  Target,
  Printer,
  Utensils,
} from "lucide-react"

interface AvaliacaoData {
  // Dados pessoais
  nome: string
  idade: number
  sexo: "masculino" | "feminino" | ""
  peso: number
  altura: number

  // Dados para cálculo nutricional
  nivelAtividade: "sedentario" | "leve" | "moderado" | "intenso" | "muito-intenso" | ""
  objetivo: "emagrecimento" | "manutencao" | "hipertrofia" | "condicionamento" | ""

  // Perimetria - Lado Direito
  bracoRelaxadoDir: number
  bracoContraidoDir: number
  antebracoDir: number
  coxaDir: number
  panturrilhaDir: number

  // Perimetria - Lado Esquerdo
  bracoRelaxadoEsq: number
  bracoContraidoEsq: number
  antebracoEsq: number
  coxaEsq: number
  panturrilhaEsq: number

  // Perimetria - Central
  cintura: number
  quadril: number
  abdome: number
  pescoco: number
  torax: number

  // Dobras cutâneas - Lado Direito
  tricepsDir: number
  subescapularDir: number
  suprailiacacDir: number
  abdominalDir: number
  coxaDobraDir: number
  axilarMediaDir: number
  peitoralDir: number

  // Dobras cutâneas - Lado Esquerdo
  tricepsEsq: number
  subescapularEsq: number
  suprailiacacEsq: number
  abdominalEsq: number
  coxaDobraEsq: number
  axilarMediaEsq: number
  peitoralEsq: number

  // Testes de Força
  flexaoBraco: number
  agachamento: number
  prancha: number
  preensaoManualDir: number
  preensaoManualEsq: number

  // Teste de Resistência Abdominal
  abdominalMinuto: number

  // Testes de Velocidade/Agilidade
  corrida20m: number
  corridaEstacionaria: number

  // Testes de Flexibilidade
  senteAlcanca: number
  flexaoPescoco: number
  flexaoOmbro: number

  // Testes de Equilíbrio
  equilibrioUnipodalDir: number
  equilibrioUnipodalEsq: number
}

interface ResultadosAvaliacao {
  // Antropometria
  imc: number
  iac: number
  rcq: number
  percentualGordura: number
  massaGorda: number
  massaMagra: number

  // Classificações
  classificacaoIMC: string
  classificacaoIAC: string
  classificacaoRCQ: string
  classificacaoGordura: string
  riscoCardiovascular: string

  // Avaliação Funcional
  nivelForca: string
  nivelResistencia: string
  nivelVelocidade: string
  nivelFlexibilidade: string
  nivelEquilibrio: string

  // Assimetrias
  assimetriaPerimetria: string
  assimetriaDobras: string
  assimetriaForca: string
  assimetriaEquilibrio: string

  // Cálculos Nutricionais
  tmb: number // Taxa Metabólica Basal
  get: number // Gasto Energético Total
  caloriasObjetivo: number
  proteinas: number
  carboidratos: number
  gorduras: number
  agua: number
  fibras: number
}

export default function AvaliacaoProfissional() {
  const [activeTab, setActiveTab] = useState("dados-pessoais")
  const [dados, setDados] = useState<AvaliacaoData>({
    nome: "",
    idade: 0,
    sexo: "",
    peso: 0,
    altura: 0,
    nivelAtividade: "",
    objetivo: "",
    bracoRelaxadoDir: 0,
    bracoContraidoDir: 0,
    antebracoDir: 0,
    coxaDir: 0,
    panturrilhaDir: 0,
    bracoRelaxadoEsq: 0,
    bracoContraidoEsq: 0,
    antebracoEsq: 0,
    coxaEsq: 0,
    panturrilhaEsq: 0,
    cintura: 0,
    quadril: 0,
    abdome: 0,
    pescoco: 0,
    torax: 0,
    tricepsDir: 0,
    subescapularDir: 0,
    suprailiacacDir: 0,
    abdominalDir: 0,
    coxaDobraDir: 0,
    axilarMediaDir: 0,
    peitoralDir: 0,
    tricepsEsq: 0,
    subescapularEsq: 0,
    suprailiacacEsq: 0,
    abdominalEsq: 0,
    coxaDobraEsq: 0,
    axilarMediaEsq: 0,
    peitoralEsq: 0,
    flexaoBraco: 0,
    agachamento: 0,
    prancha: 0,
    preensaoManualDir: 0,
    preensaoManualEsq: 0,
    abdominalMinuto: 0,
    corrida20m: 0,
    corridaEstacionaria: 0,
    senteAlcanca: 0,
    flexaoPescoco: 0,
    flexaoOmbro: 0,
    equilibrioUnipodalDir: 0,
    equilibrioUnipodalEsq: 0,
  })

  const [resultados, setResultados] = useState<ResultadosAvaliacao | null>(null)

  const calcularIMC = (peso: number, altura: number): number => {
    if (peso <= 0 || altura <= 0) return 0
    const alturaMetros = altura / 100
    return peso / (alturaMetros * alturaMetros)
  }

  const calcularIAC = (quadril: number, altura: number): number => {
    if (quadril <= 0 || altura <= 0) return 0
    const alturaMetros = altura / 100
    return quadril / (alturaMetros * Math.sqrt(alturaMetros)) - 18
  }

  const calcularRCQ = (cintura: number, quadril: number): number => {
    if (cintura <= 0 || quadril <= 0) return 0
    return cintura / quadril
  }

  const calcularPercentualGordura = (dados: AvaliacaoData): number => {
    if (dados.sexo === "") return 0

    // Média das dobras direita e esquerda
    const triceps = (dados.tricepsDir + dados.tricepsEsq) / 2
    const subescapular = (dados.subescapularDir + dados.subescapularEsq) / 2
    const suprailiaca = (dados.suprailiacacDir + dados.suprailiacacEsq) / 2
    const abdominal = (dados.abdominalDir + dados.abdominalEsq) / 2
    const coxa = (dados.coxaDobraDir + dados.coxaDobraEsq) / 2
    const axilarMedia = (dados.axilarMediaDir + dados.axilarMediaEsq) / 2
    const peitoral = (dados.peitoralDir + dados.peitoralEsq) / 2

    const somaDobras = triceps + subescapular + suprailiaca + abdominal + coxa + axilarMedia + peitoral

    if (somaDobras <= 0) return 0

    let densidadeCorporal = 0

    if (dados.sexo === "masculino") {
      densidadeCorporal =
        1.112 - 0.00043499 * somaDobras + 0.00000055 * Math.pow(somaDobras, 2) - 0.00028826 * dados.idade
    } else {
      densidadeCorporal =
        1.097 - 0.00046971 * somaDobras + 0.00000056 * Math.pow(somaDobras, 2) - 0.00012828 * dados.idade
    }

    const percentualGordura = (4.95 / densidadeCorporal - 4.5) * 100
    return Math.max(0, percentualGordura)
  }

  // Cálculo da Taxa Metabólica Basal (TMB) - Fórmula de Mifflin-St Jeor
  const calcularTMB = (dados: AvaliacaoData): number => {
    if (dados.peso <= 0 || dados.altura <= 0 || dados.idade <= 0) return 0

    if (dados.sexo === "masculino") {
      return 10 * dados.peso + 6.25 * dados.altura - 5 * dados.idade + 5
    } else {
      return 10 * dados.peso + 6.25 * dados.altura - 5 * dados.idade - 161
    }
  }

  // Cálculo do Gasto Energético Total (GET)
  const calcularGET = (tmb: number, nivelAtividade: string): number => {
    const fatoresAtividade = {
      sedentario: 1.2, // Pouco ou nenhum exercício
      leve: 1.375, // Exercício leve 1-3 dias/semana
      moderado: 1.55, // Exercício moderado 3-5 dias/semana
      intenso: 1.725, // Exercício intenso 6-7 dias/semana
      "muito-intenso": 1.9, // Exercício muito intenso, trabalho físico
    }

    return tmb * (fatoresAtividade[nivelAtividade as keyof typeof fatoresAtividade] || 1.2)
  }

  // Cálculo das calorias baseado no objetivo
  const calcularCaloriasObjetivo = (get: number, objetivo: string): number => {
    switch (objetivo) {
      case "emagrecimento":
        return get * 0.8 // Déficit de 20%
      case "manutencao":
        return get
      case "hipertrofia":
        return get * 1.15 // Superávit de 15%
      case "condicionamento":
        return get * 1.05 // Leve superávit de 5%
      default:
        return get
    }
  }

  // Cálculo dos macronutrientes
  const calcularMacronutrientes = (calorias: number, objetivo: string, peso: number) => {
    let proteinasPorKg = 1.2
    let percentualCarboidratos = 0.5
    let percentualGorduras = 0.25

    switch (objetivo) {
      case "emagrecimento":
        proteinasPorKg = 1.6 // Maior proteína para preservar massa magra
        percentualCarboidratos = 0.4
        percentualGorduras = 0.3
        break
      case "hipertrofia":
        proteinasPorKg = 1.8 // Alta proteína para síntese muscular
        percentualCarboidratos = 0.5
        percentualGorduras = 0.25
        break
      case "condicionamento":
        proteinasPorKg = 1.4
        percentualCarboidratos = 0.55 // Mais carboidratos para energia
        percentualGorduras = 0.25
        break
      default:
        proteinasPorKg = 1.2
        percentualCarboidratos = 0.5
        percentualGorduras = 0.25
    }

    const proteinas = peso * proteinasPorKg
    const caloriasProteinas = proteinas * 4
    const caloriasGorduras = calorias * percentualGorduras
    const gorduras = caloriasGorduras / 9
    const caloriasCarboidratos = calorias - caloriasProteinas - caloriasGorduras
    const carboidratos = caloriasCarboidratos / 4

    return {
      proteinas: Math.round(proteinas),
      carboidratos: Math.round(carboidratos),
      gorduras: Math.round(gorduras),
    }
  }

  const avaliarForca = (dados: AvaliacaoData): string => {
    const idade = dados.idade
    const sexo = dados.sexo

    // Pontuação baseada em flexão de braço
    let pontuacao = 0

    if (sexo === "masculino") {
      if (idade < 30) {
        if (dados.flexaoBraco >= 36) pontuacao += 5
        else if (dados.flexaoBraco >= 29) pontuacao += 4
        else if (dados.flexaoBraco >= 22) pontuacao += 3
        else if (dados.flexaoBraco >= 17) pontuacao += 2
        else pontuacao += 1
      } else if (idade < 40) {
        if (dados.flexaoBraco >= 30) pontuacao += 5
        else if (dados.flexaoBraco >= 22) pontuacao += 4
        else if (dados.flexaoBraco >= 17) pontuacao += 3
        else if (dados.flexaoBraco >= 12) pontuacao += 2
        else pontuacao += 1
      } else {
        if (dados.flexaoBraco >= 25) pontuacao += 5
        else if (dados.flexaoBraco >= 17) pontuacao += 4
        else if (dados.flexaoBraco >= 12) pontuacao += 3
        else if (dados.flexaoBraco >= 8) pontuacao += 2
        else pontuacao += 1
      }
    } else {
      if (idade < 30) {
        if (dados.flexaoBraco >= 30) pontuacao += 5
        else if (dados.flexaoBraco >= 21) pontuacao += 4
        else if (dados.flexaoBraco >= 15) pontuacao += 3
        else if (dados.flexaoBraco >= 10) pontuacao += 2
        else pontuacao += 1
      } else if (idade < 40) {
        if (dados.flexaoBraco >= 24) pontuacao += 5
        else if (dados.flexaoBraco >= 15) pontuacao += 4
        else if (dados.flexaoBraco >= 11) pontuacao += 3
        else if (dados.flexaoBraco >= 8) pontuacao += 2
        else pontuacao += 1
      } else {
        if (dados.flexaoBraco >= 20) pontuacao += 5
        else if (dados.flexaoBraco >= 11) pontuacao += 4
        else if (dados.flexaoBraco >= 8) pontuacao += 3
        else if (dados.flexaoBraco >= 5) pontuacao += 2
        else pontuacao += 1
      }
    }

    // Adicionar pontuação da prancha
    if (dados.prancha >= 120) pontuacao += 2
    else if (dados.prancha >= 60) pontuacao += 1

    if (pontuacao >= 6) return "Excelente"
    if (pontuacao >= 5) return "Muito Bom"
    if (pontuacao >= 4) return "Bom"
    if (pontuacao >= 3) return "Regular"
    return "Fraco"
  }

  const avaliarResistencia = (dados: AvaliacaoData): string => {
    const abdominal = dados.abdominalMinuto
    const idade = dados.idade
    const sexo = dados.sexo

    if (sexo === "masculino") {
      if (idade < 30) {
        if (abdominal >= 50) return "Excelente"
        if (abdominal >= 45) return "Muito Bom"
        if (abdominal >= 40) return "Bom"
        if (abdominal >= 35) return "Regular"
        return "Fraco"
      } else if (idade < 50) {
        if (abdominal >= 45) return "Excelente"
        if (abdominal >= 40) return "Muito Bom"
        if (abdominal >= 35) return "Bom"
        if (abdominal >= 30) return "Regular"
        return "Fraco"
      } else {
        if (abdominal >= 35) return "Excelente"
        if (abdominal >= 30) return "Muito Bom"
        if (abdominal >= 25) return "Bom"
        if (abdominal >= 20) return "Regular"
        return "Fraco"
      }
    } else {
      if (idade < 30) {
        if (abdominal >= 45) return "Excelente"
        if (abdominal >= 40) return "Muito Bom"
        if (abdominal >= 35) return "Bom"
        if (abdominal >= 30) return "Regular"
        return "Fraco"
      } else if (idade < 50) {
        if (abdominal >= 40) return "Excelente"
        if (abdominal >= 35) return "Muito Bom"
        if (abdominal >= 30) return "Bom"
        if (abdominal >= 25) return "Regular"
        return "Fraco"
      } else {
        if (abdominal >= 30) return "Excelente"
        if (abdominal >= 25) return "Muito Bom"
        if (abdominal >= 20) return "Bom"
        if (abdominal >= 15) return "Regular"
        return "Fraco"
      }
    }
  }

  const avaliarVelocidade = (dados: AvaliacaoData): string => {
    const corrida20m = dados.corrida20m
    const idade = dados.idade
    const sexo = dados.sexo

    if (corrida20m <= 0) return "Não avaliado"

    if (sexo === "masculino") {
      if (idade < 30) {
        if (corrida20m <= 3.0) return "Excelente"
        if (corrida20m <= 3.5) return "Muito Bom"
        if (corrida20m <= 4.0) return "Bom"
        if (corrida20m <= 4.5) return "Regular"
        return "Fraco"
      } else if (idade < 50) {
        if (corrida20m <= 3.2) return "Excelente"
        if (corrida20m <= 3.7) return "Muito Bom"
        if (corrida20m <= 4.2) return "Bom"
        if (corrida20m <= 4.7) return "Regular"
        return "Fraco"
      } else {
        if (corrida20m <= 3.5) return "Excelente"
        if (corrida20m <= 4.0) return "Muito Bom"
        if (corrida20m <= 4.5) return "Bom"
        if (corrida20m <= 5.0) return "Regular"
        return "Fraco"
      }
    } else {
      if (idade < 30) {
        if (corrida20m <= 3.5) return "Excelente"
        if (corrida20m <= 4.0) return "Muito Bom"
        if (corrida20m <= 4.5) return "Bom"
        if (corrida20m <= 5.0) return "Regular"
        return "Fraco"
      } else if (idade < 50) {
        if (corrida20m <= 3.7) return "Excelente"
        if (corrida20m <= 4.2) return "Muito Bom"
        if (corrida20m <= 4.7) return "Bom"
        if (corrida20m <= 5.2) return "Regular"
        return "Fraco"
      } else {
        if (corrida20m <= 4.0) return "Excelente"
        if (corrida20m <= 4.5) return "Muito Bom"
        if (corrida20m <= 5.0) return "Bom"
        if (corrida20m <= 5.5) return "Regular"
        return "Fraco"
      }
    }
  }

  const avaliarFlexibilidade = (dados: AvaliacaoData): string => {
    const senteAlcanca = dados.senteAlcanca
    const sexo = dados.sexo

    if (sexo === "masculino") {
      if (senteAlcanca >= 20) return "Excelente"
      if (senteAlcanca >= 15) return "Muito Bom"
      if (senteAlcanca >= 10) return "Bom"
      if (senteAlcanca >= 5) return "Regular"
      return "Fraco"
    } else {
      if (senteAlcanca >= 25) return "Excelente"
      if (senteAlcanca >= 20) return "Muito Bom"
      if (senteAlcanca >= 15) return "Bom"
      if (senteAlcanca >= 10) return "Regular"
      return "Fraco"
    }
  }

  const avaliarEquilibrio = (dados: AvaliacaoData): string => {
    const equilibrioMedio = (dados.equilibrioUnipodalDir + dados.equilibrioUnipodalEsq) / 2
    const idade = dados.idade

    if (idade < 40) {
      if (equilibrioMedio >= 45) return "Excelente"
      if (equilibrioMedio >= 35) return "Muito Bom"
      if (equilibrioMedio >= 25) return "Bom"
      if (equilibrioMedio >= 15) return "Regular"
      return "Fraco"
    } else if (idade < 60) {
      if (equilibrioMedio >= 35) return "Excelente"
      if (equilibrioMedio >= 25) return "Muito Bom"
      if (equilibrioMedio >= 20) return "Bom"
      if (equilibrioMedio >= 10) return "Regular"
      return "Fraco"
    } else {
      if (equilibrioMedio >= 25) return "Excelente"
      if (equilibrioMedio >= 20) return "Muito Bom"
      if (equilibrioMedio >= 15) return "Bom"
      if (equilibrioMedio >= 8) return "Regular"
      return "Fraco"
    }
  }

  const avaliarAssimetrias = (dados: AvaliacaoData) => {
    // Assimetria de Perimetria
    const difBraco = Math.abs(dados.bracoContraidoDir - dados.bracoContraidoEsq)
    const difCoxa = Math.abs(dados.coxaDir - dados.coxaEsq)
    const difPanturrilha = Math.abs(dados.panturrilhaDir - dados.panturrilhaEsq)

    let assimetriaPerimetria = "Normal"
    if (difBraco > 2 || difCoxa > 3 || difPanturrilha > 2) {
      assimetriaPerimetria = "Assimetria Significativa"
    } else if (difBraco > 1 || difCoxa > 2 || difPanturrilha > 1) {
      assimetriaPerimetria = "Assimetria Leve"
    }

    // Assimetria de Dobras
    const difTriceps = Math.abs(dados.tricepsDir - dados.tricepsEsq)
    const difCoxa_dobra = Math.abs(dados.coxaDobraDir - dados.coxaDobraEsq)

    let assimetriaDobras = "Normal"
    if (difTriceps > 4 || difCoxa_dobra > 4) {
      assimetriaDobras = "Assimetria Significativa"
    } else if (difTriceps > 2 || difCoxa_dobra > 2) {
      assimetriaDobras = "Assimetria Leve"
    }

    // Assimetria de Força
    const difPreensao = Math.abs(dados.preensaoManualDir - dados.preensaoManualEsq)
    const percentualDif = (difPreensao / Math.max(dados.preensaoManualDir, dados.preensaoManualEsq)) * 100

    let assimetriaForca = "Normal"
    if (percentualDif > 15) {
      assimetriaForca = "Assimetria Significativa"
    } else if (percentualDif > 10) {
      assimetriaForca = "Assimetria Leve"
    }

    // Assimetria de Equilíbrio
    const difEquilibrio = Math.abs(dados.equilibrioUnipodalDir - dados.equilibrioUnipodalEsq)

    let assimetriaEquilibrio = "Normal"
    if (difEquilibrio > 10) {
      assimetriaEquilibrio = "Assimetria Significativa"
    } else if (difEquilibrio > 5) {
      assimetriaEquilibrio = "Assimetria Leve"
    }

    return {
      assimetriaPerimetria,
      assimetriaDobras,
      assimetriaForca,
      assimetriaEquilibrio,
    }
  }

  const classificarIMC = (imc: number): string => {
    if (imc < 18.5) return "Abaixo do peso"
    if (imc < 25) return "Peso normal"
    if (imc < 30) return "Sobrepeso"
    if (imc < 35) return "Obesidade grau I"
    if (imc < 40) return "Obesidade grau II"
    return "Obesidade grau III"
  }

  const classificarIAC = (iac: number, sexo: string): string => {
    if (sexo === "masculino") {
      if (iac < 8) return "Abaixo do normal"
      if (iac < 21) return "Normal"
      if (iac < 26) return "Sobrepeso"
      return "Obesidade"
    } else {
      if (iac < 21) return "Abaixo do normal"
      if (iac < 33) return "Normal"
      if (iac < 39) return "Sobrepeso"
      return "Obesidade"
    }
  }

  const classificarRCQ = (rcq: number, sexo: string): string => {
    if (sexo === "masculino") {
      if (rcq < 0.95) return "Baixo risco"
      if (rcq < 1.0) return "Risco moderado"
      return "Alto risco"
    } else {
      if (rcq < 0.8) return "Baixo risco"
      if (rcq < 0.85) return "Risco moderado"
      return "Alto risco"
    }
  }

  const classificarGordura = (percentual: number, sexo: string): string => {
    if (sexo === "masculino") {
      if (percentual < 6) return "Essencial"
      if (percentual < 14) return "Atlético"
      if (percentual < 18) return "Bom"
      if (percentual < 25) return "Aceitável"
      return "Obesidade"
    } else {
      if (percentual < 14) return "Essencial"
      if (percentual < 21) return "Atlético"
      if (percentual < 25) return "Bom"
      if (percentual < 32) return "Aceitável"
      return "Obesidade"
    }
  }

  const calcularResultados = () => {
    const imc = calcularIMC(dados.peso, dados.altura)
    const iac = calcularIAC(dados.quadril, dados.altura)
    const rcq = calcularRCQ(dados.cintura, dados.quadril)
    const percentualGordura = calcularPercentualGordura(dados)
    const massaGorda = (dados.peso * percentualGordura) / 100
    const massaMagra = dados.peso - massaGorda

    const assimetrias = avaliarAssimetrias(dados)

    // Cálculos nutricionais
    const tmb = calcularTMB(dados)
    const get = calcularGET(tmb, dados.nivelAtividade)
    const caloriasObjetivo = calcularCaloriasObjetivo(get, dados.objetivo)
    const macros = calcularMacronutrientes(caloriasObjetivo, dados.objetivo, dados.peso)

    // Cálculo de água e fibras
    const agua = Math.round(dados.peso * 35) // 35ml por kg
    const fibras = Math.round((caloriasObjetivo / 1000) * 14) // 14g por 1000 kcal

    const resultadosCalculados: ResultadosAvaliacao = {
      imc: Number(imc.toFixed(1)),
      iac: Number(iac.toFixed(1)),
      rcq: Number(rcq.toFixed(2)),
      percentualGordura: Number(percentualGordura.toFixed(1)),
      massaGorda: Number(massaGorda.toFixed(1)),
      massaMagra: Number(massaMagra.toFixed(1)),
      classificacaoIMC: classificarIMC(imc),
      classificacaoIAC: classificarIAC(iac, dados.sexo),
      classificacaoRCQ: classificarRCQ(rcq, dados.sexo),
      classificacaoGordura: classificarGordura(percentualGordura, dados.sexo),
      riscoCardiovascular: classificarRCQ(rcq, dados.sexo),
      nivelForca: avaliarForca(dados),
      nivelResistencia: avaliarResistencia(dados),
      nivelVelocidade: avaliarVelocidade(dados),
      nivelFlexibilidade: avaliarFlexibilidade(dados),
      nivelEquilibrio: avaliarEquilibrio(dados),
      tmb: Math.round(tmb),
      get: Math.round(get),
      caloriasObjetivo: Math.round(caloriasObjetivo),
      proteinas: macros.proteinas,
      carboidratos: macros.carboidratos,
      gorduras: macros.gorduras,
      agua,
      fibras,
      ...assimetrias,
    }

    setResultados(resultadosCalculados)
    setActiveTab("resultados")
  }

  const imprimirRelatorio = () => {
    if (!resultados) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const getNivelAtividadeTexto = (nivel: string) => {
      const niveis = {
        sedentario: "Sedentário (pouco ou nenhum exercício)",
        leve: "Leve (exercício leve 1-3 dias/semana)",
        moderado: "Moderado (exercício moderado 3-5 dias/semana)",
        intenso: "Intenso (exercício intenso 6-7 dias/semana)",
        "muito-intenso": "Muito Intenso (exercício muito intenso, trabalho físico)",
      }
      return niveis[nivel as keyof typeof niveis] || nivel
    }

    const getObjetivoTexto = (objetivo: string) => {
      const objetivos = {
        emagrecimento: "Emagrecimento",
        manutencao: "Manutenção",
        hipertrofia: "Hipertrofia",
        condicionamento: "Condicionamento Físico",
      }
      return objetivos[objetivo as keyof typeof objetivos] || objetivo
    }

    const printContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Avaliação Física - ${dados.nome}</title>
    <style>
        @page {
            margin: 2cm;
            size: A4;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            background: white;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #7c3aed;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 24px;
            color: #7c3aed;
            margin-bottom: 5px;
        }
        
        .header h2 {
            font-size: 16px;
            color: #666;
            font-weight: normal;
        }
        
        .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #7c3aed;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            background: #f9fafb;
            border-radius: 4px;
        }
        
        .info-label {
            font-weight: bold;
            color: #374151;
        }
        
        .info-value {
            color: #111827;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .table th,
        .table td {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: left;
        }
        
        .table th {
            background: #f3f4f6;
            font-weight: bold;
            color: #374151;
        }
        
        .table tr:nth-child(even) {
            background: #f9fafb;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .result-card {
            text-align: center;
            padding: 15px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
        }
        
        .result-value {
            font-size: 20px;
            font-weight: bold;
            color: #7c3aed;
            margin-bottom: 5px;
        }
        
        .result-label {
            font-size: 10px;
            color: #6b7280;
            margin-bottom: 8px;
        }
        
        .result-classification {
            font-size: 11px;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: bold;
        }
        
        .classification-excellent { background: #dcfce7; color: #166534; }
        .classification-very-good { background: #dbeafe; color: #1e40af; }
        .classification-good { background: #fef3c7; color: #92400e; }
        .classification-regular { background: #fed7aa; color: #c2410c; }
        .classification-poor { background: #fecaca; color: #dc2626; }
        .classification-normal { background: #dcfce7; color: #166534; }
        .classification-risk { background: #fecaca; color: #dc2626; }
        
        .nutrition-section {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 15px;
            margin: 20px 0;
        }
        
        .nutrition-section h3 {
            color: #0c4a6e;
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        .macro-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .macro-card {
            text-align: center;
            padding: 10px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        
        .macro-value {
            font-size: 18px;
            font-weight: bold;
            color: #0ea5e9;
        }
        
        .macro-label {
            font-size: 10px;
            color: #6b7280;
            margin-top: 2px;
        }
        
        .recommendations {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 15px;
            margin-top: 20px;
        }
        
        .recommendations h3 {
            color: #0c4a6e;
            margin-bottom: 10px;
        }
        
        .recommendations ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        
        .recommendations li {
            margin-bottom: 5px;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
        }
        
        .signature-line {
            margin-top: 40px;
            text-align: center;
        }
        
        .signature-line::before {
            content: "";
            display: inline-block;
            width: 300px;
            height: 1px;
            background: #000;
            margin-bottom: 5px;
        }
        
        @media print {
            .no-print { display: none !important; }
            body { -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>RELATÓRIO DE AVALIAÇÃO FÍSICA COMPLETA</h1>
        <h2>Análise Antropométrica, Funcional, de Assimetrias e Nutricional</h2>
        <p style="margin-top: 10px; color: #666;">Data: ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="section">
        <div class="section-title">DADOS PESSOAIS</div>
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Nome:</span>
                <span class="info-value">${dados.nome}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Idade:</span>
                <span class="info-value">${dados.idade} anos</span>
            </div>
            <div class="info-item">
                <span class="info-label">Sexo:</span>
                <span class="info-value">${dados.sexo === "masculino" ? "Masculino" : "Feminino"}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Peso:</span>
                <span class="info-value">${dados.peso} kg</span>
            </div>
            <div class="info-item">
                <span class="info-label">Altura:</span>
                <span class="info-value">${dados.altura} cm</span>
            </div>
            <div class="info-item">
                <span class="info-label">Nível de Atividade:</span>
                <span class="info-value">${getNivelAtividadeTexto(dados.nivelAtividade)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Objetivo:</span>
                <span class="info-value">${getObjetivoTexto(dados.objetivo)}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">RESULTADOS ANTROPOMÉTRICOS</div>
        <div class="results-grid">
            <div class="result-card">
                <div class="result-value">${resultados.imc}</div>
                <div class="result-label">IMC (kg/m²)</div>
                <div class="result-classification classification-${resultados.classificacaoIMC.includes("normal") ? "normal" : resultados.classificacaoIMC.includes("Obesidade") ? "risk" : "regular"}">${resultados.classificacaoIMC}</div>
            </div>
            <div class="result-card">
                <div class="result-value">${resultados.percentualGordura}%</div>
                <div class="result-label">% Gordura</div>
                <div class="result-classification classification-${resultados.classificacaoGordura.includes("Bom") || resultados.classificacaoGordura.includes("Atlético") ? "good" : resultados.classificacaoGordura.includes("Obesidade") ? "risk" : "regular"}">${resultados.classificacaoGordura}</div>
            </div>
            <div class="result-card">
                <div class="result-value">${resultados.rcq}</div>
                <div class="result-label">RCQ</div>
                <div class="result-classification classification-${resultados.classificacaoRCQ.includes("Baixo") ? "normal" : resultados.classificacaoRCQ.includes("Alto") ? "risk" : "regular"}">${resultados.classificacaoRCQ}</div>
            </div>
            <div class="result-card">
                <div class="result-value">${resultados.iac}%</div>
                <div class="result-label">IAC</div>
                <div class="result-classification classification-${resultados.classificacaoIAC.includes("Normal") ? "normal" : resultados.classificacaoIAC.includes("Obesidade") ? "risk" : "regular"}">${resultados.classificacaoIAC}</div>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Massa Gorda:</span>
                <span class="info-value">${resultados.massaGorda} kg</span>
            </div>
            <div class="info-item">
                <span class="info-label">Massa Magra:</span>
                <span class="info-value">${resultados.massaMagra} kg</span>
            </div>
            <div class="info-item">
                <span class="info-label">Risco Cardiovascular:</span>
                <span class="info-value">${resultados.riscoCardiovascular}</span>
            </div>
        </div>
    </div>

    <div class="nutrition-section">
        <h3>PLANEJAMENTO NUTRICIONAL PERSONALIZADO</h3>
        
        <div class="info-grid" style="margin-bottom: 15px;">
            <div class="info-item">
                <span class="info-label">TMB (Taxa Metabólica Basal):</span>
                <span class="info-value">${resultados.tmb} kcal/dia</span>
            </div>
            <div class="info-item">
                <span class="info-label">GET (Gasto Energético Total):</span>
                <span class="info-value">${resultados.get} kcal/dia</span>
            </div>
            <div class="info-item">
                <span class="info-label">Calorias para o Objetivo:</span>
                <span class="info-value">${resultados.caloriasObjetivo} kcal/dia</span>
            </div>
        </div>

        <h4 style="color: #0c4a6e; margin-bottom: 10px;">DISTRIBUIÇÃO DE MACRONUTRIENTES</h4>
        <div class="macro-grid">
            <div class="macro-card">
                <div class="macro-value">${resultados.proteinas}g</div>
                <div class="macro-label">PROTEÍNAS</div>
                <div style="font-size: 9px; color: #6b7280;">${Math.round(((resultados.proteinas * 4) / resultados.caloriasObjetivo) * 100)}% das calorias</div>
            </div>
            <div class="macro-card">
                <div class="macro-value">${resultados.carboidratos}g</div>
                <div class="macro-label">CARBOIDRATOS</div>
                <div style="font-size: 9px; color: #6b7280;">${Math.round(((resultados.carboidratos * 4) / resultados.caloriasObjetivo) * 100)}% das calorias</div>
            </div>
            <div class="macro-card">
                <div class="macro-value">${resultados.gorduras}g</div>
                <div class="macro-label">GORDURAS</div>
                <div style="font-size: 9px; color: #6b7280;">${Math.round(((resultados.gorduras * 9) / resultados.caloriasObjetivo) * 100)}% das calorias</div>
            </div>
            <div class="macro-card">
                <div class="macro-value">${resultados.agua}ml</div>
                <div class="macro-label">ÁGUA</div>
                <div style="font-size: 9px; color: #6b7280;">35ml/kg peso</div>
            </div>
            <div class="macro-card">
                <div class="macro-value">${resultados.fibras}g</div>
                <div class="macro-label">FIBRAS</div>
                <div style="font-size: 9px; color: #6b7280;">14g/1000kcal</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">PERIMETRIA BILATERAL (cm)</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Segmento</th>
                    <th>Lado Direito</th>
                    <th>Lado Esquerdo</th>
                    <th>Diferença</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Braço Relaxado</td>
                    <td>${dados.bracoRelaxadoDir}</td>
                    <td>${dados.bracoRelaxadoEsq}</td>
                    <td>${Math.abs(dados.bracoRelaxadoDir - dados.bracoRelaxadoEsq).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Braço Contraído</td>
                    <td>${dados.bracoContraidoDir}</td>
                    <td>${dados.bracoContraidoEsq}</td>
                    <td>${Math.abs(dados.bracoContraidoDir - dados.bracoContraidoEsq).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Antebraço</td>
                    <td>${dados.antebracoDir}</td>
                    <td>${dados.antebracoEsq}</td>
                    <td>${Math.abs(dados.antebracoDir - dados.antebracoEsq).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Coxa</td>
                    <td>${dados.coxaDir}</td>
                    <td>${dados.coxaEsq}</td>
                    <td>${Math.abs(dados.coxaDir - dados.coxaEsq).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Panturrilha</td>
                    <td>${dados.panturrilhaDir}</td>
                    <td>${dados.panturrilhaEsq}</td>
                    <td>${Math.abs(dados.panturrilhaDir - dados.panturrilhaEsq).toFixed(1)}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Cintura:</span>
                <span class="info-value">${dados.cintura} cm</span>
            </div>
            <div class="info-item">
                <span class="info-label">Quadril:</span>
                <span class="info-value">${dados.quadril} cm</span>
            </div>
            <div class="info-item">
                <span class="info-label">Abdome:</span>
                <span class="info-value">${dados.abdome} cm</span>
            </div>
            <div class="info-item">
                <span class="info-label">Pescoço:</span>
                <span class="info-value">${dados.pescoco} cm</span>
            </div>
            <div class="info-item">
                <span class="info-label">Tórax:</span>
                <span class="info-value">${dados.torax} cm</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">DOBRAS CUTÂNEAS BILATERAIS (mm)</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Dobra</th>
                    <th>Lado Direito</th>
                    <th>Lado Esquerdo</th>
                    <th>Média</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tríceps</td>
                    <td>${dados.tricepsDir}</td>
                    <td>${dados.tricepsEsq}</td>
                    <td>${((dados.tricepsDir + dados.tricepsEsq) / 2).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Subescapular</td>
                    <td>${dados.subescapularDir}</td>
                    <td>${dados.subescapularEsq}</td>
                    <td>${((dados.subescapularDir + dados.subescapularEsq) / 2).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Supra-ilíaca</td>
                    <td>${dados.suprailiacacDir}</td>
                    <td>${dados.suprailiacacEsq}</td>
                    <td>${((dados.suprailiacacDir + dados.suprailiacacEsq) / 2).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Abdominal</td>
                    <td>${dados.abdominalDir}</td>
                    <td>${dados.abdominalEsq}</td>
                    <td>${((dados.abdominalDir + dados.abdominalEsq) / 2).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Coxa</td>
                    <td>${dados.coxaDobraDir}</td>
                    <td>${dados.coxaDobraEsq}</td>
                    <td>${((dados.coxaDobraDir + dados.coxaDobraEsq) / 2).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Axilar Média</td>
                    <td>${dados.axilarMediaDir}</td>
                    <td>${dados.axilarMediaEsq}</td>
                    <td>${((dados.axilarMediaDir + dados.axilarMediaEsq) / 2).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Peitoral</td>
                    <td>${dados.peitoralDir}</td>
                    <td>${dados.peitoralEsq}</td>
                    <td>${((dados.peitoralDir + dados.peitoralEsq) / 2).toFixed(1)}</td>
                </tr>
                <tr style="font-weight: bold; background: #f3f4f6;">
                    <td>SOMA TOTAL</td>
                    <td>${(dados.tricepsDir + dados.subescapularDir + dados.suprailiacacDir + dados.abdominalDir + dados.coxaDobraDir + dados.axilarMediaDir + dados.peitoralDir).toFixed(1)}</td>
                    <td>${(dados.tricepsEsq + dados.subescapularEsq + dados.suprailiacacEsq + dados.abdominalEsq + dados.coxaDobraEsq + dados.axilarMediaEsq + dados.peitoralEsq).toFixed(1)}</td>
                    <td>${((dados.tricepsDir + dados.subescapularDir + dados.suprailiacacDir + dados.abdominalDir + dados.coxaDobraDir + dados.axilarMediaDir + dados.peitoralDir + (dados.tricepsEsq + dados.subescapularEsq + dados.suprailiacacEsq + dados.abdominalEsq + dados.coxaDobraEsq + dados.axilarMediaEsq + dados.peitoralEsq)) / 2).toFixed(1)}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <div class="section-title">AVALIAÇÃO FUNCIONAL</div>
        <div class="results-grid">
            <div class="result-card">
                <div class="result-label">FORÇA</div>
                <div class="result-classification classification-${resultados.nivelForca.toLowerCase().includes("excelente") ? "excellent" : resultados.nivelForca.toLowerCase().includes("muito") ? "very-good" : resultados.nivelForca.toLowerCase().includes("bom") ? "good" : resultados.nivelForca.toLowerCase().includes("regular") ? "regular" : "poor"}">${resultados.nivelForca}</div>
            </div>
            <div class="result-card">
                <div class="result-label">RESISTÊNCIA</div>
                <div class="result-classification classification-${resultados.nivelResistencia.toLowerCase().includes("excelente") ? "excellent" : resultados.nivelResistencia.toLowerCase().includes("muito") ? "very-good" : resultados.nivelResistencia.toLowerCase().includes("bom") ? "good" : resultados.nivelResistencia.toLowerCase().includes("regular") ? "regular" : "poor"}">${resultados.nivelResistencia}</div>
            </div>
            <div class="result-card">
                <div class="result-label">VELOCIDADE</div>
                <div class="result-classification classification-${resultados.nivelVelocidade.toLowerCase().includes("excelente") ? "excellent" : resultados.nivelVelocidade.toLowerCase().includes("muito") ? "very-good" : resultados.nivelVelocidade.toLowerCase().includes("bom") ? "good" : resultados.nivelVelocidade.toLowerCase().includes("regular") ? "regular" : "poor"}">${resultados.nivelVelocidade}</div>
            </div>
            <div class="result-card">
                <div class="result-label">FLEXIBILIDADE</div>
                <div class="result-classification classification-${resultados.nivelFlexibilidade.toLowerCase().includes("excelente") ? "excellent" : resultados.nivelFlexibilidade.toLowerCase().includes("muito") ? "very-good" : resultados.nivelFlexibilidade.toLowerCase().includes("bom") ? "good" : resultados.nivelFlexibilidade.toLowerCase().includes("regular") ? "regular" : "poor"}">${resultados.nivelFlexibilidade}</div>
            </div>
            <div class="result-card">
                <div class="result-label">EQUILÍBRIO</div>
                <div class="result-classification classification-${resultados.nivelEquilibrio.toLowerCase().includes("excelente") ? "excellent" : resultados.nivelEquilibrio.toLowerCase().includes("muito") ? "very-good" : resultados.nivelEquilibrio.toLowerCase().includes("bom") ? "good" : resultados.nivelEquilibrio.toLowerCase().includes("regular") ? "regular" : "poor"}">${resultados.nivelEquilibrio}</div>
            </div>
        </div>
        
        <table class="table">
            <thead>
                <tr>
                    <th>Teste</th>
                    <th>Resultado</th>
                    <th>Unidade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Flexão de Braço</td>
                    <td>${dados.flexaoBraco}</td>
                    <td>repetições</td>
                </tr>
                <tr>
                    <td>Agachamento</td>
                    <td>${dados.agachamento}</td>
                    <td>repetições</td>
                </tr>
                <tr>
                    <td>Prancha</td>
                    <td>${dados.prancha}</td>
                    <td>segundos</td>
                </tr>
                <tr>
                    <td>Preensão Manual Direita</td>
                    <td>${dados.preensaoManualDir}</td>
                    <td>kg</td>
                </tr>
                <tr>
                    <td>Preensão Manual Esquerda</td>
                    <td>${dados.preensaoManualEsq}</td>
                    <td>kg</td>
                </tr>
                <tr>
                    <td>Abdominal (1 min)</td>
                    <td>${dados.abdominalMinuto}</td>
                    <td>repetições</td>
                </tr>
                <tr>
                    <td>Corrida 20m</td>
                    <td>${dados.corrida20m}</td>
                    <td>segundos</td>
                </tr>
                <tr>
                    <td>Sente e Alcança</td>
                    <td>${dados.senteAlcanca}</td>
                    <td>cm</td>
                </tr>
                <tr>
                    <td>Equilíbrio Unipodal Direito</td>
                    <td>${dados.equilibrioUnipodalDir}</td>
                    <td>segundos</td>
                </tr>
                <tr>
                    <td>Equilíbrio Unipodal Esquerdo</td>
                    <td>${dados.equilibrioUnipodalEsq}</td>
                    <td>segundos</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <div class="section-title">ANÁLISE DE ASSIMETRIAS</div>
        <div class="results-grid">
            <div class="result-card">
                <div class="result-label">PERIMETRIA</div>
                <div class="result-classification classification-${resultados.assimetriaPerimetria.includes("Normal") ? "normal" : resultados.assimetriaPerimetria.includes("Significativa") ? "risk" : "regular"}">${resultados.assimetriaPerimetria}</div>
            </div>
            <div class="result-card">
                <div class="result-label">DOBRAS</div>
                <div class="result-classification classification-${resultados.assimetriaDobras.includes("Normal") ? "normal" : resultados.assimetriaDobras.includes("Significativa") ? "risk" : "regular"}">${resultados.assimetriaDobras}</div>
            </div>
            <div class="result-card">
                <div class="result-label">FORÇA</div>
                <div class="result-classification classification-${resultados.assimetriaForca.includes("Normal") ? "normal" : resultados.assimetriaForca.includes("Significativa") ? "risk" : "regular"}">${resultados.assimetriaForca}</div>
            </div>
            <div class="result-card">
                <div class="result-label">EQUILÍBRIO</div>
                <div class="result-classification classification-${resultados.assimetriaEquilibrio.includes("Normal") ? "normal" : resultados.assimetriaEquilibrio.includes("Significativa") ? "risk" : "regular"}">${resultados.assimetriaEquilibrio}</div>
            </div>
        </div>
    </div>

    <div class="recommendations">
        <h3>RECOMENDAÇÕES E INTERPRETAÇÃO</h3>
        <p><strong>Risco Cardiovascular:</strong> ${resultados.riscoCardiovascular}</p>
        
        <h4 style="margin-top: 15px; margin-bottom: 10px;">Recomendações Nutricionais Específicas:</h4>
        <ul>
            ${
              dados.objetivo === "emagrecimento"
                ? `
            <li>Manter déficit calórico controlado de 20% para perda de peso saudável</li>
            <li>Priorizar proteínas (${(resultados.proteinas / dados.peso).toFixed(1)}g/kg) para preservar massa magra</li>
            <li>Distribuir carboidratos preferencialmente no pré e pós-treino</li>
            <li>Incluir gorduras boas (ômega-3, azeite, castanhas) - ${resultados.gorduras}g/dia</li>
            `
                : ""
            }
            ${
              dados.objetivo === "hipertrofia"
                ? `
            <li>Manter superávit calórico de 15% para ganho de massa muscular</li>
            <li>Alta ingestão proteica (${(resultados.proteinas / dados.peso).toFixed(1)}g/kg) distribuída ao longo do dia</li>
            <li>Carboidratos suficientes (${resultados.carboidratos}g/dia) para energia nos treinos</li>
            <li>Refeição pós-treino com proteína + carboidrato em até 2h</li>
            `
                : ""
            }
            ${
              dados.objetivo === "condicionamento"
                ? `
            <li>Leve superávit calórico (5%) para suportar treinos intensos</li>
            <li>Maior proporção de carboidratos (${resultados.carboidratos}g/dia) para energia</li>
            <li>Hidratação adequada: ${resultados.agua}ml/dia, aumentar durante exercícios</li>
            <li>Reposição de eletrólitos em treinos longos (>1h)</li>
            `
                : ""
            }
            <li>Consumir ${resultados.agua}ml de água por dia (35ml/kg de peso corporal)</li>
            <li>Ingerir ${resultados.fibras}g de fibras diárias através de frutas, vegetais e cereais integrais</li>
            <li>Fazer 5-6 refeições por dia para melhor distribuição dos nutrientes</li>
            <li>Suplementação deve ser avaliada individualmente por nutricionista</li>
        </ul>
        
        <h4 style="margin-top: 15px; margin-bottom: 10px;">Recomendações de Exercícios:</h4>
        <ul>
            <li>Manter hidratação adequada durante os exercícios</li>
            <li>Praticar atividade física regular e progressiva</li>
            <li>Acompanhamento profissional especializado</li>
            ${resultados.nivelForca === "Fraco" ? "<li>Priorizar exercícios de fortalecimento muscular</li>" : ""}
            ${resultados.nivelResistencia === "Fraco" ? "<li>Incluir exercícios cardiovasculares progressivos</li>" : ""}
            ${resultados.nivelFlexibilidade === "Fraco" ? "<li>Implementar rotina de alongamentos diários</li>" : ""}
            ${resultados.nivelEquilibrio === "Fraco" ? "<li>Exercícios de propriocepção e equilíbrio</li>" : ""}
        </ul>
        
        ${
          resultados.assimetriaPerimetria.includes("Significativa") ||
          resultados.assimetriaDobras.includes("Significativa") ||
          resultados.assimetriaForca.includes("Significativa") ||
          resultados.assimetriaEquilibrio.includes("Significativa")
            ? `<h4 style="margin-top: 15px; margin-bottom: 10px;">Atenção às Assimetrias:</h4>
           <ul>
               <li>Exercícios unilaterais para correção de assimetrias</li>
               <li>Fortalecimento específico do lado mais fraco</li>
               <li>Avaliação postural complementar recomendada</li>
           </ul>`
            : ""
        }
        
        <h4 style="margin-top: 15px; margin-bottom: 10px;">Exemplo de Distribuição Diária:</h4>
        <ul>
            <li><strong>Café da manhã:</strong> ${Math.round(resultados.caloriasObjetivo * 0.25)} kcal - ${Math.round(resultados.proteinas * 0.2)}g proteína, ${Math.round(resultados.carboidratos * 0.3)}g carboidrato</li>
            <li><strong>Lanche da manhã:</strong> ${Math.round(resultados.caloriasObjetivo * 0.1)} kcal - Fruta + oleaginosas</li>
            <li><strong>Almoço:</strong> ${Math.round(resultados.caloriasObjetivo * 0.35)} kcal - ${Math.round(resultados.proteinas * 0.3)}g proteína, ${Math.round(resultados.carboidratos * 0.4)}g carboidrato</li>
            <li><strong>Lanche da tarde:</strong> ${Math.round(resultados.caloriasObjetivo * 0.1)} kcal - Pré-treino se necessário</li>
            <li><strong>Jantar:</strong> ${Math.round(resultados.caloriasObjetivo * 0.2)} kcal - ${Math.round(resultados.proteinas * 0.5)}g proteína, vegetais</li>
        </ul>
        
        <p style="margin-top: 15px;"><strong>Próxima Reavaliação:</strong> Recomenda-se reavaliação em 60-90 dias para acompanhamento da evolução e ajustes no plano nutricional.</p>
    </div>

    <div class="footer">
        <p>Relatório gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}</p>
        
        <div class="signature-line">
            <p>Assinatura do Profissional Responsável</p>
        </div>
        
        <p style="margin-top: 20px; font-size: 10px;">
            Este relatório foi gerado pelo Sistema de Avaliação Física Profissional<br>
            Protocolo baseado em Jackson & Pollock, Mifflin-St Jeor e normas ACSM<br>
            Cálculos nutricionais baseados em evidências científicas atuais
        </p>
    </div>
</body>
</html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  const gerarRelatorio = () => {
    if (!resultados) return

    const getNivelAtividadeTexto = (nivel: string) => {
      const niveis = {
        sedentario: "Sedentário (pouco ou nenhum exercício)",
        leve: "Leve (exercício leve 1-3 dias/semana)",
        moderado: "Moderado (exercício moderado 3-5 dias/semana)",
        intenso: "Intenso (exercício intenso 6-7 dias/semana)",
        "muito-intenso": "Muito Intenso (exercício muito intenso, trabalho físico)",
      }
      return niveis[nivel as keyof typeof niveis] || nivel
    }

    const getObjetivoTexto = (objetivo: string) => {
      const objetivos = {
        emagrecimento: "Emagrecimento",
        manutencao: "Manutenção",
        hipertrofia: "Hipertrofia",
        condicionamento: "Condicionamento Físico",
      }
      return objetivos[objetivo as keyof typeof objetivos] || objetivo
    }

    const relatorio = `
RELATÓRIO COMPLETO DE AVALIAÇÃO FÍSICA E NUTRICIONAL
===================================================

DADOS PESSOAIS:
Nome: ${dados.nome}
Idade: ${dados.idade} anos
Sexo: ${dados.sexo}
Peso: ${dados.peso} kg
Altura: ${dados.altura} cm
Nível de Atividade: ${getNivelAtividadeTexto(dados.nivelAtividade)}
Objetivo: ${getObjetivoTexto(dados.objetivo)}

CÁLCULOS NUTRICIONAIS:
======================
TMB (Taxa Metabólica Basal): ${resultados.tmb} kcal/dia
GET (Gasto Energético Total): ${resultados.get} kcal/dia
Calorias para o Objetivo: ${resultados.caloriasObjetivo} kcal/dia

DISTRIBUIÇÃO DE MACRONUTRIENTES:
================================
Proteínas: ${resultados.proteinas}g/dia (${(resultados.proteinas / dados.peso).toFixed(1)}g/kg)
Carboidratos: ${resultados.carboidratos}g/dia
Gorduras: ${resultados.gorduras}g/dia
Água: ${resultados.agua}ml/dia
Fibras: ${resultados.fibras}g/dia

PERIMETRIA (cm):
=================
LADO DIREITO:
- Braço Relaxado: ${dados.bracoRelaxadoDir} cm
- Braço Contraído: ${dados.bracoContraidoDir} cm
- Antebraço: ${dados.antebracoDir} cm
- Coxa: ${dados.coxaDir} cm
- Panturrilha: ${dados.panturrilhaDir} cm

LADO ESQUERDO:
- Braço Relaxado: ${dados.bracoRelaxadoEsq} cm
- Braço Contraído: ${dados.bracoContraidoEsq} cm
- Antebraço: ${dados.antebracoEsq} cm
- Coxa: ${dados.coxaEsq} cm
- Panturrilha: ${dados.panturrilhaEsq} cm

MEDIDAS CENTRAIS:
- Cintura: ${dados.cintura} cm
- Quadril: ${dados.quadril} cm
- Abdome: ${dados.abdome} cm
- Pescoço: ${dados.pescoco} cm
- Tórax: ${dados.torax} cm

DOBRAS CUTÂNEAS (mm):
====================
LADO DIREITO:
- Tríceps: ${dados.tricepsDir} mm
- Subescapular: ${dados.subescapularDir} mm
- Supra-ilíaca: ${dados.suprailiacacDir} mm
- Abdominal: ${dados.abdominalDir} mm
- Coxa: ${dados.coxaDobraDir} mm
- Axilar Média: ${dados.axilarMediaDir} mm
- Peitoral: ${dados.peitoralDir} mm

LADO ESQUERDO:
- Tríceps: ${dados.tricepsEsq} mm
- Subescapular: ${dados.subescapularEsq} mm
- Supra-ilíaca: ${dados.suprailiacacEsq} mm
- Abdominal: ${dados.abdominalEsq} mm
- Coxa: ${dados.coxaDobraEsq} mm
- Axilar Média: ${dados.axilarMediaEsq} mm
- Peitoral: ${dados.peitoralEsq} mm

TESTES FUNCIONAIS:
==================
FORÇA:
- Flexão de Braço: ${dados.flexaoBraco} repetições
- Agachamento: ${dados.agachamento} repetições
- Prancha: ${dados.prancha} segundos
- Preensão Manual Dir: ${dados.preensaoManualDir} kg
- Preensão Manual Esq: ${dados.preensaoManualEsq} kg

RESISTÊNCIA:
- Abdominal (1 min): ${dados.abdominalMinuto} repetições

VELOCIDADE/AGILIDADE:
- Corrida 20m: ${dados.corrida20m} segundos
- Corrida Estacionária: ${dados.corridaEstacionaria} passos/15s

FLEXIBILIDADE:
- Sente e Alcança: ${dados.senteAlcanca} cm
- Flexão Pescoço: ${dados.flexaoPescoco}°
- Flexão Ombro: ${dados.flexaoOmbro}°

EQUILÍBRIO:
- Unipodal Direito: ${dados.equilibrioUnipodalDir} segundos
- Unipodal Esquerdo: ${dados.equilibrioUnipodalEsq} segundos

RESULTADOS ANTROPOMÉTRICOS:
===========================
IMC: ${resultados.imc} kg/m² (${resultados.classificacaoIMC})
IAC: ${resultados.iac}% (${resultados.classificacaoIAC})
RCQ: ${resultados.rcq} (${resultados.classificacaoRCQ})
Percentual de Gordura: ${resultados.percentualGordura}% (${resultados.classificacaoGordura})
Massa Gorda: ${resultados.massaGorda} kg
Massa Magra: ${resultados.massaMagra} kg
Risco Cardiovascular: ${resultados.riscoCardiovascular}

AVALIAÇÃO FUNCIONAL:
====================
Nível de Força: ${resultados.nivelForca}
Nível de Resistência: ${resultados.nivelResistencia}
Nível de Velocidade: ${resultados.nivelVelocidade}
Nível de Flexibilidade: ${resultados.nivelFlexibilidade}
Nível de Equilíbrio: ${resultados.nivelEquilibrio}

ANÁLISE DE ASSIMETRIAS:
=======================
Assimetria de Perimetria: ${resultados.assimetriaPerimetria}
Assimetria de Dobras: ${resultados.assimetriaDobras}
Assimetria de Força: ${resultados.assimetriaForca}
Assimetria de Equilíbrio: ${resultados.assimetriaEquilibrio}

RECOMENDAÇÕES NUTRICIONAIS:
===========================
${
  dados.objetivo === "emagrecimento"
    ? `
PARA EMAGRECIMENTO:
- Manter déficit calórico controlado de 20%
- Priorizar proteínas para preservar massa magra
- Distribuir carboidratos no pré e pós-treino
- Incluir gorduras boas (ômega-3, azeite, castanhas)
`
    : ""
}
${
  dados.objetivo === "hipertrofia"
    ? `
PARA HIPERTROFIA:
- Manter superávit calórico de 15%
- Alta ingestão proteica distribuída ao longo do dia
- Carboidratos suficientes para energia nos treinos
- Refeição pós-treino com proteína + carboidrato
`
    : ""
}
${
  dados.objetivo === "condicionamento"
    ? `
PARA CONDICIONAMENTO:
- Leve superávit calórico (5%) para suportar treinos
- Maior proporção de carboidratos para energia
- Hidratação adequada durante exercícios
- Reposição de eletrólitos em treinos longos
`
    : ""
}

DISTRIBUIÇÃO DIÁRIA SUGERIDA:
- Café da manhã: ${Math.round(resultados.caloriasObjetivo * 0.25)} kcal
- Lanche manhã: ${Math.round(resultados.caloriasObjetivo * 0.1)} kcal
- Almoço: ${Math.round(resultados.caloriasObjetivo * 0.35)} kcal
- Lanche tarde: ${Math.round(resultados.caloriasObjetivo * 0.1)} kcal
- Jantar: ${Math.round(resultados.caloriasObjetivo * 0.2)} kcal

Data da Avaliação: ${new Date().toLocaleDateString("pt-BR")}
Avaliador: _________________________
    `

    const blob = new Blob([relatorio], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `avaliacao_completa_nutricional_${dados.nome.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getClassificationColor = (classification: string) => {
    if (
      classification.includes("Normal") ||
      classification.includes("Bom") ||
      classification.includes("Baixo risco") ||
      classification.includes("Excelente")
    ) {
      return "bg-green-100 text-green-800 border-green-200"
    }
    if (
      classification.includes("Sobrepeso") ||
      classification.includes("Aceitável") ||
      classification.includes("moderado") ||
      classification.includes("Muito Bom") ||
      classification.includes("Regular") ||
      classification.includes("Leve")
    ) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
    if (
      classification.includes("Obesidade") ||
      classification.includes("Alto risco") ||
      classification.includes("Fraco") ||
      classification.includes("Significativa")
    ) {
      return "bg-red-100 text-red-800 border-red-200"
    }
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  return (
    <div className="min-h-screen bg-[#1a1625] p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400 mb-2">Avaliação Física Profissional Completa</h1>
          <p className="text-purple-200">
            Sistema completo de avaliação antropométrica, funcional, assimetrias e planejamento nutricional
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="dados-pessoais" className="flex items-center gap-1 text-xs">
              <User className="h-3 w-3" />
              Dados
            </TabsTrigger>
            <TabsTrigger value="perimetria" className="flex items-center gap-1 text-xs">
              <Ruler className="h-3 w-3" />
              Perimetria
            </TabsTrigger>
            <TabsTrigger value="dobras" className="flex items-center gap-1 text-xs">
              <Activity className="h-3 w-3" />
              Dobras
            </TabsTrigger>
            <TabsTrigger value="forca" className="flex items-center gap-1 text-xs">
              <Target className="h-3 w-3" />
              Força
            </TabsTrigger>
            <TabsTrigger value="funcional" className="flex items-center gap-1 text-xs">
              <Zap className="h-3 w-3" />
              Funcional
            </TabsTrigger>
            <TabsTrigger value="calculos" className="flex items-center gap-1 text-xs">
              <Calculator className="h-3 w-3" />
              Cálculos
            </TabsTrigger>
            <TabsTrigger value="resultados" className="flex items-center gap-1 text-xs">
              <FileText className="h-3 w-3" />
              Resultados
            </TabsTrigger>
          </TabsList>

          {/* Dados Pessoais */}
          <TabsContent value="dados-pessoais">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-400">Dados Pessoais e Objetivos</CardTitle>
                <CardDescription className="text-purple-200">Informações básicas e metas do avaliado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={dados.nome}
                      onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="idade">Idade</Label>
                    <Input
                      id="idade"
                      type="text"
                      value={dados.idade || ""}
                      onChange={(e) => setDados({ ...dados, idade: Number(e.target.value) })}
                      placeholder="Anos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sexo">Sexo</Label>
                    <Select
                      value={dados.sexo}
                      onValueChange={(value: "masculino" | "feminino") => setDados({ ...dados, sexo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <Input
                      id="peso"
                      type="text"
                      value={dados.peso || ""}
                      onChange={(e) => setDados({ ...dados, peso: Number(e.target.value) })}
                      placeholder="Ex: 70.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <Input
                      id="altura"
                      type="text"
                      value={dados.altura || ""}
                      onChange={(e) => setDados({ ...dados, altura: Number(e.target.value) })}
                      placeholder="Ex: 175"
                    />
                  </div>
                </div>

                <Alert className="bg-blue-950 border-blue-800">
                  <Utensils className="h-4 w-4 text-blue-400" />
                  <AlertTitle className="text-blue-300">Dados para Planejamento Nutricional</AlertTitle>
                  <AlertDescription className="text-blue-200">
                    Essas informações são essenciais para calcular suas necessidades calóricas e de macronutrientes
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nivelAtividade">Nível de Atividade Física</Label>
                    <Select
                      value={dados.nivelAtividade}
                      onValueChange={(value: "sedentario" | "leve" | "moderado" | "intenso" | "muito-intenso") =>
                        setDados({ ...dados, nivelAtividade: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu nível de atividade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentario">Sedentário (pouco ou nenhum exercício)</SelectItem>
                        <SelectItem value="leve">Leve (exercício leve 1-3 dias/semana)</SelectItem>
                        <SelectItem value="moderado">Moderado (exercício moderado 3-5 dias/semana)</SelectItem>
                        <SelectItem value="intenso">Intenso (exercício intenso 6-7 dias/semana)</SelectItem>
                        <SelectItem value="muito-intenso">
                          Muito Intenso (exercício muito intenso, trabalho físico)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="objetivo">Objetivo Principal</Label>
                    <Select
                      value={dados.objetivo}
                      onValueChange={(value: "emagrecimento" | "manutencao" | "hipertrofia" | "condicionamento") =>
                        setDados({ ...dados, objetivo: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emagrecimento">Emagrecimento (perda de peso)</SelectItem>
                        <SelectItem value="manutencao">Manutenção (manter peso atual)</SelectItem>
                        <SelectItem value="hipertrofia">Hipertrofia (ganho de massa muscular)</SelectItem>
                        <SelectItem value="condicionamento">Condicionamento Físico (performance)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab("perimetria")}>Próximo: Perimetria</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Perimetria */}
          <TabsContent value="perimetria">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-400">Medidas de Perimetria</CardTitle>
                  <CardDescription className="text-purple-200">
                    Medidas de circunferência em centímetros - Bilateral
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="bg-blue-950 border-blue-800">
                    <AlertTriangle className="h-4 w-4 text-blue-400" />
                    <AlertTitle className="text-blue-300">Instruções</AlertTitle>
                    <AlertDescription className="text-blue-200">
                      Realize as medidas em ambos os lados do corpo. Use fita métrica inextensível. Mantenha a fita
                      perpendicular ao eixo longitudinal do segmento.
                    </AlertDescription>
                  </Alert>

                  {/* Medidas Centrais */}
                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-4">Medidas Centrais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cintura">Cintura (cm)</Label>
                        <Input
                          id="cintura"
                          type="text"
                          value={dados.cintura || ""}
                          onChange={(e) => setDados({ ...dados, cintura: Number(e.target.value) })}
                          placeholder="Ex: 80.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="quadril">Quadril (cm)</Label>
                        <Input
                          id="quadril"
                          type="text"
                          value={dados.quadril || ""}
                          onChange={(e) => setDados({ ...dados, quadril: Number(e.target.value) })}
                          placeholder="Ex: 95.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="abdome">Abdome (cm)</Label>
                        <Input
                          id="abdome"
                          type="text"
                          value={dados.abdome || ""}
                          onChange={(e) => setDados({ ...dados, abdome: Number(e.target.value) })}
                          placeholder="Ex: 85.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pescoco">Pescoço (cm)</Label>
                        <Input
                          id="pescoco"
                          type="text"
                          value={dados.pescoco || ""}
                          onChange={(e) => setDados({ ...dados, pescoco: Number(e.target.value) })}
                          placeholder="Ex: 38.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="torax">Tórax (cm)</Label>
                        <Input
                          id="torax"
                          type="text"
                          value={dados.torax || ""}
                          onChange={(e) => setDados({ ...dados, torax: Number(e.target.value) })}
                          placeholder="Ex: 95.0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medidas Bilaterais */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Lado Direito */}
                    <div>
                      <h3 className="text-lg font-medium text-purple-300 mb-4">Lado Direito</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bracoRelaxadoDir">Braço Relaxado (cm)</Label>
                          <Input
                            id="bracoRelaxadoDir"
                            type="text"
                            value={dados.bracoRelaxadoDir || ""}
                            onChange={(e) => setDados({ ...dados, bracoRelaxadoDir: Number(e.target.value) })}
                            placeholder="Ex: 32.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bracoContraidoDir">Braço Contraído (cm)</Label>
                          <Input
                            id="bracoContraidoDir"
                            type="text"
                            value={dados.bracoContraidoDir || ""}
                            onChange={(e) => setDados({ ...dados, bracoContraidoDir: Number(e.target.value) })}
                            placeholder="Ex: 35.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="antebracoDir">Antebraço (cm)</Label>
                          <Input
                            id="antebracoDir"
                            type="text"
                            value={dados.antebracoDir || ""}
                            onChange={(e) => setDados({ ...dados, antebracoDir: Number(e.target.value) })}
                            placeholder="Ex: 28.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="coxaDir">Coxa (cm)</Label>
                          <Input
                            id="coxaDir"
                            type="text"
                            value={dados.coxaDir || ""}
                            onChange={(e) => setDados({ ...dados, coxaDir: Number(e.target.value) })}
                            placeholder="Ex: 58.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="panturrilhaDir">Panturrilha (cm)</Label>
                          <Input
                            id="panturrilhaDir"
                            type="text"
                            value={dados.panturrilhaDir || ""}
                            onChange={(e) => setDados({ ...dados, panturrilhaDir: Number(e.target.value) })}
                            placeholder="Ex: 38.0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Lado Esquerdo */}
                    <div>
                      <h3 className="text-lg font-medium text-purple-300 mb-4">Lado Esquerdo</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bracoRelaxadoEsq">Braço Relaxado (cm)</Label>
                          <Input
                            id="bracoRelaxadoEsq"
                            type="text"
                            value={dados.bracoRelaxadoEsq || ""}
                            onChange={(e) => setDados({ ...dados, bracoRelaxadoEsq: Number(e.target.value) })}
                            placeholder="Ex: 32.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bracoContraidoEsq">Braço Contraído (cm)</Label>
                          <Input
                            id="bracoContraidoEsq"
                            type="text"
                            value={dados.bracoContraidoEsq || ""}
                            onChange={(e) => setDados({ ...dados, bracoContraidoEsq: Number(e.target.value) })}
                            placeholder="Ex: 35.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="antebracoEsq">Antebraço (cm)</Label>
                          <Input
                            id="antebracoEsq"
                            type="text"
                            value={dados.antebracoEsq || ""}
                            onChange={(e) => setDados({ ...dados, antebracoEsq: Number(e.target.value) })}
                            placeholder="Ex: 28.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="coxaEsq">Coxa (cm)</Label>
                          <Input
                            id="coxaEsq"
                            type="text"
                            value={dados.coxaEsq || ""}
                            onChange={(e) => setDados({ ...dados, coxaEsq: Number(e.target.value) })}
                            placeholder="Ex: 58.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="panturrilhaEsq">Panturrilha (cm)</Label>
                          <Input
                            id="panturrilhaEsq"
                            type="text"
                            value={dados.panturrilhaEsq || ""}
                            onChange={(e) => setDados({ ...dados, panturrilhaEsq: Number(e.target.value) })}
                            placeholder="Ex: 38.0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("dados-pessoais")}>
                      Anterior
                    </Button>
                    <Button onClick={() => setActiveTab("dobras")}>Próximo: Dobras Cutâneas</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dobras Cutâneas */}
          <TabsContent value="dobras">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-400">Dobras Cutâneas</CardTitle>
                <CardDescription className="text-purple-200">
                  Protocolo Jackson & Pollock (7 dobras) - Medidas bilaterais em milímetros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-blue-950 border-blue-800">
                  <AlertTriangle className="h-4 w-4 text-blue-400" />
                  <AlertTitle className="text-blue-300">Instruções</AlertTitle>
                  <AlertDescription className="text-blue-200">
                    Utilize adipômetro calibrado. Realize 3 medidas em cada ponto de ambos os lados e use a média.
                    Aguarde 2 segundos antes de fazer a leitura.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Lado Direito */}
                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-4">Lado Direito</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tricepsDir">Tríceps (mm)</Label>
                        <Input
                          id="tricepsDir"
                          type="text"
                          value={dados.tricepsDir || ""}
                          onChange={(e) => setDados({ ...dados, tricepsDir: Number(e.target.value) })}
                          placeholder="Ex: 12.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subescapularDir">Subescapular (mm)</Label>
                        <Input
                          id="subescapularDir"
                          type="text"
                          value={dados.subescapularDir || ""}
                          onChange={(e) => setDados({ ...dados, subescapularDir: Number(e.target.value) })}
                          placeholder="Ex: 15.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="suprailiacacDir">Supra-ilíaca (mm)</Label>
                        <Input
                          id="suprailiacacDir"
                          type="text"
                          value={dados.suprailiacacDir || ""}
                          onChange={(e) => setDados({ ...dados, suprailiacacDir: Number(e.target.value) })}
                          placeholder="Ex: 18.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="abdominalDir">Abdominal (mm)</Label>
                        <Input
                          id="abdominalDir"
                          type="text"
                          value={dados.abdominalDir || ""}
                          onChange={(e) => setDados({ ...dados, abdominalDir: Number(e.target.value) })}
                          placeholder="Ex: 20.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="coxaDobraDir">Coxa (mm)</Label>
                        <Input
                          id="coxaDobraDir"
                          type="text"
                          value={dados.coxaDobraDir || ""}
                          onChange={(e) => setDados({ ...dados, coxaDobraDir: Number(e.target.value) })}
                          placeholder="Ex: 22.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="axilarMediaDir">Axilar Média (mm)</Label>
                        <Input
                          id="axilarMediaDir"
                          type="text"
                          value={dados.axilarMediaDir || ""}
                          onChange={(e) => setDados({ ...dados, axilarMediaDir: Number(e.target.value) })}
                          placeholder="Ex: 14.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="peitoralDir">Peitoral (mm)</Label>
                        <Input
                          id="peitoralDir"
                          type="text"
                          value={dados.peitoralDir || ""}
                          onChange={(e) => setDados({ ...dados, peitoralDir: Number(e.target.value) })}
                          placeholder="Ex: 10.0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lado Esquerdo */}
                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-4">Lado Esquerdo</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tricepsEsq">Tríceps (mm)</Label>
                        <Input
                          id="tricepsEsq"
                          type="text"
                          value={dados.tricepsEsq || ""}
                          onChange={(e) => setDados({ ...dados, tricepsEsq: Number(e.target.value) })}
                          placeholder="Ex: 12.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subescapularEsq">Subescapular (mm)</Label>
                        <Input
                          id="subescapularEsq"
                          type="text"
                          value={dados.subescapularEsq || ""}
                          onChange={(e) => setDados({ ...dados, subescapularEsq: Number(e.target.value) })}
                          placeholder="Ex: 15.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="suprailiacacEsq">Supra-ilíaca (mm)</Label>
                        <Input
                          id="suprailiacacEsq"
                          type="text"
                          value={dados.suprailiacacEsq || ""}
                          onChange={(e) => setDados({ ...dados, suprailiacacEsq: Number(e.target.value) })}
                          placeholder="Ex: 18.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="abdominalEsq">Abdominal (mm)</Label>
                        <Input
                          id="abdominalEsq"
                          type="text"
                          value={dados.abdominalEsq || ""}
                          onChange={(e) => setDados({ ...dados, abdominalEsq: Number(e.target.value) })}
                          placeholder="Ex: 20.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="coxaDobraEsq">Coxa (mm)</Label>
                        <Input
                          id="coxaDobraEsq"
                          type="text"
                          value={dados.coxaDobraEsq || ""}
                          onChange={(e) => setDados({ ...dados, coxaDobraEsq: Number(e.target.value) })}
                          placeholder="Ex: 22.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="axilarMediaEsq">Axilar Média (mm)</Label>
                        <Input
                          id="axilarMediaEsq"
                          type="text"
                          value={dados.axilarMediaEsq || ""}
                          onChange={(e) => setDados({ ...dados, axilarMediaEsq: Number(e.target.value) })}
                          placeholder="Ex: 14.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="peitoralEsq">Peitoral (mm)</Label>
                        <Input
                          id="peitoralEsq"
                          type="text"
                          value={dados.peitoralEsq || ""}
                          onChange={(e) => setDados({ ...dados, peitoralEsq: Number(e.target.value) })}
                          placeholder="Ex: 10.0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-[#2a1f3d] rounded-lg">
                    <h4 className="font-medium text-purple-300 mb-2">Soma das 7 dobras - Lado Direito:</h4>
                    <p className="text-2xl font-bold text-purple-200">
                      {(
                        dados.tricepsDir +
                        dados.subescapularDir +
                        dados.suprailiacacDir +
                        dados.abdominalDir +
                        dados.coxaDobraDir +
                        dados.axilarMediaDir +
                        dados.peitoralDir
                      ).toFixed(1)}{" "}
                      mm
                    </p>
                  </div>
                  <div className="p-4 bg-[#2a1f3d] rounded-lg">
                    <h4 className="font-medium text-purple-300 mb-2">Soma das 7 dobras - Lado Esquerdo:</h4>
                    <p className="text-2xl font-bold text-purple-200">
                      {(
                        dados.tricepsEsq +
                        dados.subescapularEsq +
                        dados.suprailiacacEsq +
                        dados.abdominalEsq +
                        dados.coxaDobraEsq +
                        dados.axilarMediaEsq +
                        dados.peitoralEsq
                      ).toFixed(1)}{" "}
                      mm
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("perimetria")}>
                    Anterior
                  </Button>
                  <Button onClick={() => setActiveTab("forca")}>Próximo: Testes de Força</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testes de Força */}
          <TabsContent value="forca">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-400">Testes de Força</CardTitle>
                <CardDescription className="text-purple-200">Avaliação da força muscular e resistência</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-blue-950 border-blue-800">
                  <Timer className="h-4 w-4 text-blue-400" />
                  <AlertTitle className="text-blue-300">Instruções</AlertTitle>
                  <AlertDescription className="text-blue-200">
                    Realize aquecimento adequado antes dos testes. Mantenha técnica correta. Pare em caso de dor ou
                    desconforto.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-300">Testes de Força Máxima</h3>

                    <div>
                      <Label htmlFor="flexaoBraco">Flexão de Braço (repetições máximas)</Label>
                      <Input
                        id="flexaoBraco"
                        type="text"
                        value={dados.flexaoBraco || ""}
                        onChange={(e) => setDados({ ...dados, flexaoBraco: Number(e.target.value) })}
                        placeholder="Ex: 25"
                      />
                      <p className="text-xs text-purple-300 mt-1">Homens: apoio de pés / Mulheres: apoio de joelhos</p>
                    </div>

                    <div>
                      <Label htmlFor="agachamento">Agachamento (repetições máximas)</Label>
                      <Input
                        id="agachamento"
                        type="text"
                        value={dados.agachamento || ""}
                        onChange={(e) => setDados({ ...dados, agachamento: Number(e.target.value) })}
                        placeholder="Ex: 30"
                      />
                      <p className="text-xs text-purple-300 mt-1">Agachamento livre até 90° de flexão do joelho</p>
                    </div>

                    <div>
                      <Label htmlFor="prancha">Prancha (segundos)</Label>
                      <Input
                        id="prancha"
                        type="text"
                        value={dados.prancha || ""}
                        onChange={(e) => setDados({ ...dados, prancha: Number(e.target.value) })}
                        placeholder="Ex: 60"
                      />
                      <p className="text-xs text-purple-300 mt-1">Tempo máximo em posição de prancha</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-300">Preensão Manual</h3>

                    <div>
                      <Label htmlFor="preensaoManualDir">Preensão Manual Direita (kg)</Label>
                      <Input
                        id="preensaoManualDir"
                        type="text"
                        value={dados.preensaoManualDir || ""}
                        onChange={(e) => setDados({ ...dados, preensaoManualDir: Number(e.target.value) })}
                        placeholder="Ex: 45.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preensaoManualEsq">Preensão Manual Esquerda (kg)</Label>
                      <Input
                        id="preensaoManualEsq"
                        type="text"
                        value={dados.preensaoManualEsq || ""}
                        onChange={(e) => setDados({ ...dados, preensaoManualEsq: Number(e.target.value) })}
                        placeholder="Ex: 43.2"
                      />
                    </div>

                    <div className="p-4 bg-[#2a1f3d] rounded-lg">
                      <h4 className="font-medium text-purple-300 mb-2">Diferença entre lados:</h4>
                      <p className="text-lg font-bold text-purple-200">
                        {Math.abs(dados.preensaoManualDir - dados.preensaoManualEsq).toFixed(1)} kg
                      </p>
                      <p className="text-sm text-purple-300">
                        {dados.preensaoManualDir > 0 && dados.preensaoManualEsq > 0
                          ? `${((Math.abs(dados.preensaoManualDir - dados.preensaoManualEsq) / Math.max(dados.preensaoManualDir, dados.preensaoManualEsq)) * 100).toFixed(1)}%`
                          : "0%"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("dobras")}>
                    Anterior
                  </Button>
                  <Button onClick={() => setActiveTab("funcional")}>Próximo: Testes Funcionais</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testes Funcionais */}
          <TabsContent value="funcional">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-400">Testes Funcionais</CardTitle>
                <CardDescription className="text-purple-200">
                  Avaliação de resistência, velocidade, flexibilidade e equilíbrio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Resistência e Velocidade */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-purple-300 mb-4">Resistência Abdominal</h3>
                      <div>
                        <Label htmlFor="abdominalMinuto">Abdominais em 1 minuto</Label>
                        <Input
                          id="abdominalMinuto"
                          type="text"
                          value={dados.abdominalMinuto || ""}
                          onChange={(e) => setDados({ ...dados, abdominalMinuto: Number(e.target.value) })}
                          placeholder="Ex: 35"
                        />
                        <p className="text-xs text-purple-300 mt-1">
                          Número máximo de abdominais completos em 60 segundos
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-purple-300 mb-4">Testes de Velocidade</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="corrida20m">Corrida 20 metros (segundos)</Label>
                          <Input
                            id="corrida20m"
                            type="text"
                            value={dados.corrida20m || ""}
                            onChange={(e) => setDados({ ...dados, corrida20m: Number(e.target.value) })}
                            placeholder="Ex: 3.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="corridaEstacionaria">Corrida Estacionária (passos/15s)</Label>
                          <Input
                            id="corridaEstacionaria"
                            type="text"
                            value={dados.corridaEstacionaria || ""}
                            onChange={(e) => setDados({ ...dados, corridaEstacionaria: Number(e.target.value) })}
                            placeholder="Ex: 120"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flexibilidade e Equilíbrio */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-purple-300 mb-4">Flexibilidade</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="senteAlcanca">Sente e Alcança (cm)</Label>
                          <Input
                            id="senteAlcanca"
                            type="text"
                            value={dados.senteAlcanca || ""}
                            onChange={(e) => setDados({ ...dados, senteAlcanca: Number(e.target.value) })}
                            placeholder="Ex: 15.5"
                          />
                          <p className="text-xs text-purple-300 mt-1">
                            Distância alcançada além dos pés (valores negativos = não alcançou)
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="flexaoPescoco">Flexão do Pescoço (graus)</Label>
                          <Input
                            id="flexaoPescoco"
                            type="text"
                            value={dados.flexaoPescoco || ""}
                            onChange={(e) => setDados({ ...dados, flexaoPescoco: Number(e.target.value) })}
                            placeholder="Ex: 45"
                          />
                        </div>
                        <div>
                          <Label htmlFor="flexaoOmbro">Flexão do Ombro (graus)</Label>
                          <Input
                            id="flexaoOmbro"
                            type="text"
                            value={dados.flexaoOmbro || ""}
                            onChange={(e) => setDados({ ...dados, flexaoOmbro: Number(e.target.value) })}
                            placeholder="Ex: 180"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-purple-300 mb-4">Equilíbrio Unipodal</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="equilibrioUnipodalDir">Equilíbrio Direito (segundos)</Label>
                          <Input
                            id="equilibrioUnipodalDir"
                            type="text"
                            value={dados.equilibrioUnipodalDir || ""}
                            onChange={(e) => setDados({ ...dados, equilibrioUnipodalDir: Number(e.target.value) })}
                            placeholder="Ex: 30.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="equilibrioUnipodalEsq">Equilíbrio Esquerdo (segundos)</Label>
                          <Input
                            id="equilibrioUnipodalEsq"
                            type="text"
                            value={dados.equilibrioUnipodalEsq || ""}
                            onChange={(e) => setDados({ ...dados, equilibrioUnipodalEsq: Number(e.target.value) })}
                            placeholder="Ex: 28.0"
                          />
                        </div>
                        <div className="p-4 bg-[#2a1f3d] rounded-lg">
                          <h4 className="font-medium text-purple-300 mb-2">Diferença entre lados:</h4>
                          <p className="text-lg font-bold text-purple-200">
                            {Math.abs(dados.equilibrioUnipodalDir - dados.equilibrioUnipodalEsq).toFixed(1)} segundos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("forca")}>
                    Anterior
                  </Button>
                  <Button onClick={() => setActiveTab("calculos")}>Próximo: Cálculos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cálculos */}
          <TabsContent value="calculos">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-400">Cálculos e Análise</CardTitle>
                <CardDescription className="text-purple-200">
                  Processamento completo dos dados coletados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-300">Dados Coletados</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Nome:</span>
                        <span className="text-purple-100">{dados.nome || "Não informado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Idade:</span>
                        <span className="text-purple-100">{dados.idade || 0} anos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Sexo:</span>
                        <span className="text-purple-100">{dados.sexo || "Não informado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Peso:</span>
                        <span className="text-purple-100">{dados.peso || 0} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Altura:</span>
                        <span className="text-purple-100">{dados.altura || 0} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Nível Atividade:</span>
                        <span className="text-purple-100">{dados.nivelAtividade || "Não informado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Objetivo:</span>
                        <span className="text-purple-100">{dados.objetivo || "Não informado"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-300">Validação dos Dados</h3>
                    <div className="space-y-2">
                      {dados.nome && dados.idade > 0 && dados.sexo && dados.peso > 0 && dados.altura > 0 ? (
                        <div className="flex items-center text-green-400">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Dados pessoais completos
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Dados pessoais incompletos
                        </div>
                      )}

                      {dados.nivelAtividade && dados.objetivo ? (
                        <div className="flex items-center text-green-400">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Dados nutricionais completos
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Dados nutricionais incompletos
                        </div>
                      )}

                      {dados.cintura > 0 && dados.quadril > 0 ? (
                        <div className="flex items-center text-green-400">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Perimetria básica completa
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Perimetria básica incompleta
                        </div>
                      )}

                      {dados.tricepsDir + dados.tricepsEsq + dados.subescapularDir + dados.subescapularEsq > 0 ? (
                        <div className="flex items-center text-green-400">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Dobras cutâneas coletadas
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Dobras cutâneas não coletadas
                        </div>
                      )}

                      {dados.flexaoBraco > 0 || dados.abdominalMinuto > 0 ? (
                        <div className="flex items-center text-green-400">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Testes funcionais realizados
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-400">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Testes funcionais opcionais
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={calcularResultados}
                    disabled={
                      !dados.nome ||
                      dados.idade <= 0 ||
                      !dados.sexo ||
                      dados.peso <= 0 ||
                      dados.altura <= 0 ||
                      !dados.nivelAtividade ||
                      !dados.objetivo
                    }
                    className="px-8"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calcular Resultados Completos
                  </Button>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("funcional")}>
                    Anterior
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resultados */}
          <TabsContent value="resultados">
            {resultados ? (
              <div className="space-y-6">
                {/* Resumo Principal */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-400">Resultados Completos da Avaliação</CardTitle>
                    <CardDescription className="text-purple-200">
                      Análise antropométrica, funcional, assimetrias e nutricional de {dados.nome}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">IMC</h3>
                        <p className="text-2xl font-bold text-purple-100">{resultados.imc}</p>
                        <Badge className={`mt-2 ${getClassificationColor(resultados.classificacaoIMC)}`}>
                          {resultados.classificacaoIMC}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">% Gordura</h3>
                        <p className="text-2xl font-bold text-purple-100">{resultados.percentualGordura}%</p>
                        <Badge className={`mt-2 ${getClassificationColor(resultados.classificacaoGordura)}`}>
                          {resultados.classificacaoGordura}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">RCQ</h3>
                        <p className="text-2xl font-bold text-purple-100">{resultados.rcq}</p>
                        <Badge className={`mt-2 ${getClassificationColor(resultados.classificacaoRCQ)}`}>
                          {resultados.classificacaoRCQ}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">IAC</h3>
                        <p className="text-2xl font-bold text-purple-100">{resultados.iac}%</p>
                        <Badge className={`mt-2 ${getClassificationColor(resultados.classificacaoIAC)}`}>
                          {resultados.classificacaoIAC}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Planejamento Nutricional */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-400 flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      Planejamento Nutricional Personalizado
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Cálculos baseados no seu objetivo:{" "}
                      {dados.objetivo === "emagrecimento"
                        ? "Emagrecimento"
                        : dados.objetivo === "hipertrofia"
                          ? "Hipertrofia"
                          : dados.objetivo === "condicionamento"
                            ? "Condicionamento Físico"
                            : "Manutenção"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">TMB</h3>
                        <p className="text-2xl font-bold text-blue-300">{resultados.tmb}</p>
                        <p className="text-xs text-purple-200">kcal/dia (basal)</p>
                      </div>
                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">GET</h3>
                        <p className="text-2xl font-bold text-green-300">{resultados.get}</p>
                        <p className="text-xs text-purple-200">kcal/dia (total)</p>
                      </div>
                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Meta Calórica</h3>
                        <p className="text-2xl font-bold text-orange-300">{resultados.caloriasObjetivo}</p>
                        <p className="text-xs text-purple-200">kcal/dia (objetivo)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-800/30 rounded-lg">
                        <h3 className="text-sm font-medium text-red-300 mb-1">Proteínas</h3>
                        <p className="text-xl font-bold text-red-200">{resultados.proteinas}g</p>
                        <p className="text-xs text-red-300">{(resultados.proteinas / dados.peso).toFixed(1)}g/kg</p>
                        <p className="text-xs text-red-400">
                          {Math.round(((resultados.proteinas * 4) / resultados.caloriasObjetivo) * 100)}% kcal
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border border-yellow-800/30 rounded-lg">
                        <h3 className="text-sm font-medium text-yellow-300 mb-1">Carboidratos</h3>
                        <p className="text-xl font-bold text-yellow-200">{resultados.carboidratos}g</p>
                        <p className="text-xs text-yellow-300">
                          {(resultados.carboidratos / dados.peso).toFixed(1)}g/kg
                        </p>
                        <p className="text-xs text-yellow-400">
                          {Math.round(((resultados.carboidratos * 4) / resultados.caloriasObjetivo) * 100)}% kcal
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-800/30 rounded-lg">
                        <h3 className="text-sm font-medium text-green-300 mb-1">Gorduras</h3>
                        <p className="text-xl font-bold text-green-200">{resultados.gorduras}g</p>
                        <p className="text-xs text-green-300">{(resultados.gorduras / dados.peso).toFixed(1)}g/kg</p>
                        <p className="text-xs text-green-400">
                          {Math.round(((resultados.gorduras * 9) / resultados.caloriasObjetivo) * 100)}% kcal
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-800/30 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-300 mb-1">Água</h3>
                        <p className="text-xl font-bold text-blue-200">{resultados.agua}ml</p>
                        <p className="text-xs text-blue-300">35ml/kg</p>
                        <p className="text-xs text-blue-400">{(resultados.agua / 1000).toFixed(1)}L/dia</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-800/30 rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Fibras</h3>
                        <p className="text-xl font-bold text-purple-200">{resultados.fibras}g</p>
                        <p className="text-xs text-purple-300">14g/1000kcal</p>
                        <p className="text-xs text-purple-400">Mínimo diário</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Avaliação Funcional */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-400">Avaliação Funcional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Força</h3>
                        <Badge className={`${getClassificationColor(resultados.nivelForca)} text-sm`}>
                          {resultados.nivelForca}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Resistência</h3>
                        <Badge className={`${getClassificationColor(resultados.nivelResistencia)} text-sm`}>
                          {resultados.nivelResistencia}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Velocidade</h3>
                        <Badge className={`${getClassificationColor(resultados.nivelVelocidade)} text-sm`}>
                          {resultados.nivelVelocidade}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Flexibilidade</h3>
                        <Badge className={`${getClassificationColor(resultados.nivelFlexibilidade)} text-sm`}>
                          {resultados.nivelFlexibilidade}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Equilíbrio</h3>
                        <Badge className={`${getClassificationColor(resultados.nivelEquilibrio)} text-sm`}>
                          {resultados.nivelEquilibrio}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Análise de Assimetrias */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-400">Análise de Assimetrias Corporais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Perimetria</h3>
                        <Badge className={`${getClassificationColor(resultados.assimetriaPerimetria)} text-sm`}>
                          {resultados.assimetriaPerimetria}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Dobras</h3>
                        <Badge className={`${getClassificationColor(resultados.assimetriaDobras)} text-sm`}>
                          {resultados.assimetriaDobras}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Força</h3>
                        <Badge className={`${getClassificationColor(resultados.assimetriaForca)} text-sm`}>
                          {resultados.assimetriaForca}
                        </Badge>
                      </div>

                      <div className="text-center p-4 bg-[#2a1f3d] rounded-lg">
                        <h3 className="text-sm font-medium text-purple-300 mb-1">Equilíbrio</h3>
                        <Badge className={`${getClassificationColor(resultados.assimetriaEquilibrio)} text-sm`}>
                          {resultados.assimetriaEquilibrio}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Composição Corporal */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-400">Composição Corporal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-purple-300 mb-2">Peso Total</h3>
                        <p className="text-3xl font-bold text-purple-100">{dados.peso} kg</p>
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg font-medium text-purple-300 mb-2">Massa Gorda</h3>
                        <p className="text-3xl font-bold text-red-300">{resultados.massaGorda} kg</p>
                        <Progress value={(resultados.massaGorda / dados.peso) * 100} className="mt-2 h-2" />
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg font-medium text-purple-300 mb-2">Massa Magra</h3>
                        <p className="text-3xl font-bold text-green-300">{resultados.massaMagra} kg</p>
                        <Progress value={(resultados.massaMagra / dados.peso) * 100} className="mt-2 h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interpretação e Recomendações */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-400">Interpretação e Recomendações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert
                      className={`${
                        resultados.riscoCardiovascular === "Alto risco"
                          ? "bg-red-950 border-red-800"
                          : resultados.riscoCardiovascular === "Risco moderado"
                            ? "bg-yellow-950 border-yellow-800"
                            : "bg-green-950 border-green-800"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          resultados.riscoCardiovascular === "Alto risco"
                            ? "text-red-400"
                            : resultados.riscoCardiovascular === "Risco moderado"
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      />
                      <AlertTitle
                        className={`${
                          resultados.riscoCardiovascular === "Alto risco"
                            ? "text-red-300"
                            : resultados.riscoCardiovascular === "Risco moderado"
                              ? "text-yellow-300"
                              : "text-green-300"
                        }`}
                      >
                        Risco Cardiovascular: {resultados.riscoCardiovascular}
                      </AlertTitle>
                      <AlertDescription
                        className={`${
                          resultados.riscoCardiovascular === "Alto risco"
                            ? "text-red-200"
                            : resultados.riscoCardiovascular === "Risco moderado"
                              ? "text-yellow-200"
                              : "text-green-200"
                        }`}
                      >
                        {resultados.riscoCardiovascular === "Alto risco" &&
                          "Recomenda-se acompanhamento médico e nutricional. Considere exames complementares."}
                        {resultados.riscoCardiovascular === "Risco moderado" &&
                          "Atenção aos hábitos alimentares e prática regular de exercícios físicos."}
                        {resultados.riscoCardiovascular === "Baixo risco" &&
                          "Mantenha os hábitos saudáveis atuais. Continue com atividade física regular."}
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-[#2a1f3d] rounded-lg">
                        <h4 className="font-medium text-purple-300 mb-2">Recomendações Nutricionais:</h4>
                        <ul className="text-sm text-purple-200 space-y-1">
                          {dados.objetivo === "emagrecimento" && (
                            <>
                              <li>• Déficit calórico controlado de 20% ({resultados.caloriasObjetivo} kcal/dia)</li>
                              <li>• Alta proteína ({resultados.proteinas}g/dia) para preservar massa magra</li>
                              <li>• Carboidratos no pré/pós-treino ({resultados.carboidratos}g/dia)</li>
                              <li>• Gorduras boas: ômega-3, azeite, castanhas ({resultados.gorduras}g/dia)</li>
                            </>
                          )}
                          {dados.objetivo === "hipertrofia" && (
                            <>
                              <li>• Superávit calórico de 15% ({resultados.caloriasObjetivo} kcal/dia)</li>
                              <li>
                                • Proteína alta ({resultados.proteinas}g/dia ={" "}
                                {(resultados.proteinas / dados.peso).toFixed(1)}g/kg)
                              </li>
                              <li>• Carboidratos para energia nos treinos ({resultados.carboidratos}g/dia)</li>
                              <li>• Refeição pós-treino: proteína + carboidrato em até 2h</li>
                            </>
                          )}
                          {dados.objetivo === "condicionamento" && (
                            <>
                              <li>
                                • Leve superávit (5%) para suportar treinos ({resultados.caloriasObjetivo} kcal/dia)
                              </li>
                              <li>• Mais carboidratos para energia ({resultados.carboidratos}g/dia)</li>
                              <li>• Hidratação: {resultados.agua}ml/dia + extra durante exercícios</li>
                              <li>• Reposição de eletrólitos em treinos longos (&gt;1h)</li>
                            </>
                          )}
                          {dados.objetivo === "manutencao" && (
                            <>
                              <li>• Manter equilíbrio calórico ({resultados.caloriasObjetivo} kcal/dia)</li>
                              <li>• Proteína adequada ({resultados.proteinas}g/dia) para manter massa</li>
                              <li>• Distribuição equilibrada de macronutrientes</li>
                              <li>• Foco na qualidade dos alimentos</li>
                            </>
                          )}
                          <li>• Água: {resultados.agua}ml/dia (35ml/kg peso corporal)</li>
                          <li>• Fibras: {resultados.fibras}g/dia através de frutas e vegetais</li>
                          <li>• 5-6 refeições/dia para melhor distribuição</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-[#2a1f3d] rounded-lg">
                        <h4 className="font-medium text-purple-300 mb-2">Recomendações de Exercícios:</h4>
                        <ul className="text-sm text-purple-200 space-y-1">
                          {resultados.nivelForca === "Fraco" && (
                            <li>• Priorizar exercícios de fortalecimento muscular</li>
                          )}
                          {resultados.nivelResistencia === "Fraco" && (
                            <li>• Incluir exercícios cardiovasculares progressivos</li>
                          )}
                          {resultados.nivelFlexibilidade === "Fraco" && (
                            <li>• Implementar rotina de alongamentos diários</li>
                          )}
                          {resultados.nivelEquilibrio === "Fraco" && (
                            <li>• Exercícios de propriocepção e equilíbrio</li>
                          )}
                          <li>• Progressão gradual da intensidade dos exercícios</li>
                          <li>• Acompanhamento profissional especializado</li>
                          <li>• Hidratação adequada durante os treinos</li>

                          {(resultados.assimetriaPerimetria.includes("Significativa") ||
                            resultados.assimetriaDobras.includes("Significativa") ||
                            resultados.assimetriaForca.includes("Significativa") ||
                            resultados.assimetriaEquilibrio.includes("Significativa")) && (
                            <>
                              <li>• Exercícios unilaterais para correção de assimetrias</li>
                              <li>• Fortalecimento específico do lado mais fraco</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Exemplo de Distribuição Diária */}
                    <div className="p-4 bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-800/30 rounded-lg">
                      <h4 className="font-medium text-blue-300 mb-3">Exemplo de Distribuição Diária de Calorias:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-blue-200">
                            <strong>Café da manhã:</strong> {Math.round(resultados.caloriasObjetivo * 0.25)} kcal
                          </p>
                          <p className="text-blue-300 text-xs">• {Math.round(resultados.proteinas * 0.2)}g proteína</p>
                          <p className="text-blue-300 text-xs">
                            • {Math.round(resultados.carboidratos * 0.3)}g carboidrato
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-200">
                            <strong>Almoço:</strong> {Math.round(resultados.caloriasObjetivo * 0.35)} kcal
                          </p>
                          <p className="text-blue-300 text-xs">• {Math.round(resultados.proteinas * 0.3)}g proteína</p>
                          <p className="text-blue-300 text-xs">
                            • {Math.round(resultados.carboidratos * 0.4)}g carboidrato
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-200">
                            <strong>Jantar:</strong> {Math.round(resultados.caloriasObjetivo * 0.25)} kcal
                          </p>
                          <p className="text-blue-300 text-xs">• {Math.round(resultados.proteinas * 0.3)}g proteína</p>
                          <p className="text-blue-300 text-xs">• Vegetais e saladas</p>
                        </div>
                      </div>
                      <p className="text-blue-300 text-xs mt-2">
                        <strong>Lanches:</strong> {Math.round(resultados.caloriasObjetivo * 0.15)} kcal - Frutas,
                        oleaginosas, iogurte
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Ações */}
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button onClick={imprimirRelatorio} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Printer className="h-5 w-5 mr-2" />
                    Imprimir Relatório Completo
                  </Button>
                  <Button onClick={gerarRelatorio} size="lg" variant="outline">
                    <Download className="h-5 w-5 mr-2" />
                    Baixar Arquivo TXT
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDados({
                        nome: "",
                        idade: 0,
                        sexo: "",
                        peso: 0,
                        altura: 0,
                        nivelAtividade: "",
                        objetivo: "",
                        bracoRelaxadoDir: 0,
                        bracoContraidoDir: 0,
                        antebracoDir: 0,
                        coxaDir: 0,
                        panturrilhaDir: 0,
                        bracoRelaxadoEsq: 0,
                        bracoContraidoEsq: 0,
                        antebracoEsq: 0,
                        coxaEsq: 0,
                        panturrilhaEsq: 0,
                        cintura: 0,
                        quadril: 0,
                        abdome: 0,
                        pescoco: 0,
                        torax: 0,
                        tricepsDir: 0,
                        subescapularDir: 0,
                        suprailiacacDir: 0,
                        abdominalDir: 0,
                        coxaDobraDir: 0,
                        axilarMediaDir: 0,
                        peitoralDir: 0,
                        tricepsEsq: 0,
                        subescapularEsq: 0,
                        suprailiacacEsq: 0,
                        abdominalEsq: 0,
                        coxaDobraEsq: 0,
                        axilarMediaEsq: 0,
                        peitoralEsq: 0,
                        flexaoBraco: 0,
                        agachamento: 0,
                        prancha: 0,
                        preensaoManualDir: 0,
                        preensaoManualEsq: 0,
                        abdominalMinuto: 0,
                        corrida20m: 0,
                        corridaEstacionaria: 0,
                        senteAlcanca: 0,
                        flexaoPescoco: 0,
                        flexaoOmbro: 0,
                        equilibrioUnipodalDir: 0,
                        equilibrioUnipodalEsq: 0,
                      })
                      setResultados(null)
                      setActiveTab("dados-pessoais")
                    }}
                  >
                    Nova Avaliação
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calculator className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-purple-300 mb-2">Nenhum resultado calculado</h3>
                  <p className="text-purple-200 mb-4">
                    Complete os dados e clique em "Calcular Resultados Completos" na aba anterior.
                  </p>
                  <Button onClick={() => setActiveTab("calculos")}>Ir para Cálculos</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
