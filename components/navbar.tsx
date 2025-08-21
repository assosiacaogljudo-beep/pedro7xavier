"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Activity, User, FileText, Calculator, LogOut, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Treinos", href: "/treinos", icon: Activity },
  { name: "Biblioteca de Exercícios", href: "/biblioteca-exercicios", icon: BookOpen },
  { name: "Avaliação Física", href: "/avaliacao-fisica", icon: User },
  { name: "Avaliação Profissional", href: "/avaliacao-profissional", icon: Calculator },
  { name: "Resultados", href: "/resultados-avaliacao", icon: FileText },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("avaliacaoFisica")
    window.location.href = "/login"
  }

  return (
    <nav className="bg-[#1a1625] border-b border-purple-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-purple-300">FitAssess</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "flex items-center space-x-2",
                      isActive
                        ? "bg-purple-900 text-purple-100"
                        : "text-purple-300 hover:text-purple-100 hover:bg-purple-900",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-900 ml-4"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-purple-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-[#1a1625] border-purple-800">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <Activity className="h-6 w-6 text-purple-400" />
                    <span className="text-lg font-bold text-purple-300">FitAssess</span>
                  </div>

                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start flex items-center space-x-2",
                            isActive
                              ? "bg-purple-900 text-purple-100"
                              : "text-purple-300 hover:text-purple-100 hover:bg-purple-900",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Button>
                      </Link>
                    )
                  })}

                  <div className="pt-4 border-t border-purple-800">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-purple-300 hover:text-purple-100 hover:bg-purple-900"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
