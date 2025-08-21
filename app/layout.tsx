import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitAssess - Sistema de Avaliação Física",
  description: "Sistema completo de avaliação física e exercícios personalizados",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#1a1625]">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
