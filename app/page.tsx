"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Gamepad2, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [currentView, setCurrentView] = useState("home")

  // Each script object should have: id, name, category, verified (boolean), description, filename
  // Example: { id: 5, name: "Your Script Name", category: "Category", verified: true, description: "What it does", filename: "script-name.txt" }
  const exampleScripts = [
    {
      id: 1,
      name: "Auto Clicker Pro",
      category: "Utility",
      verified: true,
      description: "Precision mouse automation with advanced timing controls",
      filename: "auto-clicker-pro.txt",
    },
    {
      id: 2,
      name: "Form Filler",
      category: "Productivity",
      verified: true,
      description: "Intelligent form completion for repetitive data entry",
      filename: "form-filler.txt",
    },
    {
      id: 3,
      name: "Screenshot Manager",
      category: "Tools",
      verified: true,
      description: "Batch screenshot capture with instant organization",
      filename: "screenshot-manager.txt",
    },
    {
      id: 4,
      name: "API Throttler",
      category: "Developer",
      verified: true,
      description: "Rate limiting and request queueing for API testing",
      filename: "api-throttler.txt",
    },
  ]

  const handleDownload = (filename) => {
    const link = document.createElement("a")
    link.href = `/scripts/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-primary/30 backdrop-blur-md bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nark's Script Hub
            </span>
          </button>
          <div className="flex gap-6 text-sm font-medium">
            <button
              onClick={() => setCurrentView("home")}
              className={`transition duration-300 ${
                currentView === "home" ? "text-primary font-bold" : "text-foreground/70 hover:text-primary"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView("scripts")}
              className={`transition duration-300 ${
                currentView === "scripts" ? "text-secondary font-bold" : "text-foreground/70 hover:text-secondary"
              }`}
            >
              Scripts
            </button>
          </div>
        </div>
      </nav>

      {/* Home View */}
      {currentView === "home" && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Nark's Script Hub
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto font-light">
              A collection of verified scripts and automation tools.
            </p>
            <Button
              size="lg"
              onClick={() => setCurrentView("scripts")}
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 gap-2 font-bold mt-8"
            >
              Browse Scripts
            </Button>
          </div>
        </section>
      )}

      {/* Scripts View */}
      {currentView === "scripts" && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-black mb-12 text-center bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Available Scripts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {exampleScripts.map((script) => (
              <Card
                key={script.id}
                className="cyber-border border-primary/40 bg-card/40 backdrop-blur hover:border-secondary/60 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{script.name}</CardTitle>
                        {script.verified && (
                          <CheckCircle className="w-5 h-5 text-secondary fill-secondary" title="Verified Script" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary">
                          {script.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/70 text-sm">{script.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => handleDownload(script.filename)}
                      className="bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:shadow-secondary/50 gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/20 mt-20 bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-foreground/60 text-sm">
          <p>&copy; 2025 Nark's Script Hub.</p>
        </div>
      </footer>
    </main>
  )
}
