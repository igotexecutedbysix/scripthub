"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Gamepad2, CheckCircle, Eye, Search } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [currentView, setCurrentView] = useState("home")
  const [viewingScript, setViewingScript] = useState(null)
  const [scriptContent, setScriptContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const exampleScripts = [
    {
      id: 1,
      name: "Infinite Yield",
      category: "Utility",
      verified: true,
      description: "Script with lots of functionality.",
      filename: "infiniteyield.txt",
      tags: ["roblox", "universal",],
    },
    {
      id: 2,
      name: "Example 2",
      category: "Productivity",
      verified: true,
      description: "Lorum Ipsum.",
      filename: "2.txt",
      tags: ["placeholder", "placeholder", "placeholder"],
    },
    {
      id: 3,
      name: "Example 3",
      category: "Tools",
      verified: true,
      description: "Lorum Ipsum.",
      filename: "3.txt",
      tags: ["placeholder", "placeholder", "placeholder"],
    },
    {
      id: 4,
      name: "Example 4",
      category: "Developer",
      verified: true,
      description: "Lorum Ipsum.",
      filename: "4.txt",
      tags: ["placeholder", "placeholder", "placeholder"],
    },
  ]

  const filteredScripts = exampleScripts.filter((script) => {
    const query = searchQuery.toLowerCase()
    return script.name.toLowerCase().includes(query) || script.tags.some((tag) => tag.toLowerCase().includes(query))
  })

  const handleDownload = (filename) => {
    const link = document.createElement("a")
    link.href = `/scripts/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewRaw = async (filename, scriptName) => {
    try {
      const response = await fetch(`/scripts/${filename}`)
      const content = await response.text()
      setScriptContent(content)
      setViewingScript(scriptName)
    } catch (error) {
      console.error("Error fetching script:", error)
      setScriptContent("Error loading script content")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden font-sans">
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

      {currentView === "scripts" && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-black mb-12 text-center bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Available Scripts
          </h2>
          <div className="mb-8 flex items-center gap-2 bg-card/40 border border-primary/30 rounded-lg px-4 py-2 backdrop-blur">
            <Search className="w-5 h-5 text-primary/60" />
            <input
              type="text"
              placeholder="Search by script name or tag (e.g., 'roblox', 'automation')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-foreground/50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-foreground/60 hover:text-foreground ml-2">
                ×
              </button>
            )}
          </div>

          {filteredScripts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 text-lg">No scripts found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredScripts.map((script) => (
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
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary">
                            {script.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {script.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary border border-secondary/40 cursor-pointer hover:bg-secondary/30 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/70 text-sm">{script.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewRaw(script.filename, script.name)}
                        className="border-accent/50 hover:border-accent gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        RAW
                      </Button>
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
          )}
        </section>
      )}

      {viewingScript && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-primary/50 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-primary/30">
              <h3 className="text-xl font-bold text-primary">{viewingScript}</h3>
              <button
                onClick={() => setViewingScript(null)}
                className="text-foreground/60 hover:text-foreground text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="overflow-auto flex-1 p-6">
              <pre className="bg-background/50 rounded p-4 text-sm text-foreground/80 font-mono whitespace-pre-wrap break-words border border-primary/20">
                {scriptContent}
              </pre>
            </div>
            <div className="flex gap-2 p-6 border-t border-primary/30 justify-end">
              <Button variant="outline" onClick={() => setViewingScript(null)} className="border-foreground/20">
                Close
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(scriptContent)
                  setViewingScript(null)
                }}
                className="bg-gradient-to-r from-secondary to-primary"
              >
                Copy & Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-primary/20 mt-20 bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-foreground/60 text-sm">
          <p>&copy; 2025 Nark's Script Hub.</p>
        </div>
      </footer>
    </main>
  )
}
