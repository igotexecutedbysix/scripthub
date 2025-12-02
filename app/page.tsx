"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Gamepad2, CheckCircle, Eye, Search, LinkIcon } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [currentView, setCurrentView] = useState("home")
  const [viewingScript, setViewingScript] = useState(null)
  const [scriptContent, setScriptContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewingExecutorLinks, setViewingExecutorLinks] = useState(null)
  const [executorLinks, setExecutorLinks] = useState({})

  const exampleExecutors = [
    {
      id: 1,
      name: "Synapse X",
      category: "Premium",
      verified: true,
      description: "Industry-leading Roblox executor with advanced features.",
      filename: "synapse-x.txt",
      tags: ["roblox", "executor", "premium"],
      links: [
        { name: "Official Site", url: "https://x.synapse.to/" },
        { name: "Download", url: "https://x.synapse.to/download" },
      ],
    },
    {
      id: 2,
      name: "JJSploit",
      category: "Free",
      verified: true,
      description: "Free and reliable Roblox script executor.",
      filename: "jjsploit.txt",
      tags: ["roblox", "executor", "free"],
      links: [
        { name: "Official Site", url: "https://jjsploit.com/" },
        { name: "Download", url: "https://jjsploit.com/download" },
      ],
    },
    {
      id: 3,
      name: "Fluxus",
      category: "Premium",
      verified: true,
      description: "Powerful executor with modern interface.",
      filename: "fluxus.txt",
      tags: ["roblox", "executor", "premium"],
      links: [
        { name: "Official Site", url: "https://fluxus.app/" },
        { name: "Download", url: "https://fluxus.app/download" },
      ],
    },
  ]

  const exampleScripts = [
    {
      id: 1,
      name: "Infinite Yield",
      category: "Hacking",
      verified: true,
      description: "Script with lots of functionality.",
      filename: "infiniteyield.txt",
      tags: ["roblox", "universal"],
    },
    {
      id: 2,
      name: "Miami Streets DK Money/Spoofer/Gun script",
      category: "Modding",
      verified: true,
      description: "This is a script for the roblox game Miami Streets",
      filename: "2.txt",
      tags: ["miami streets", "roblox"],
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

  const filteredExecutors = exampleExecutors.filter((executor) => {
    const query = searchQuery.toLowerCase()
    return executor.name.toLowerCase().includes(query) || executor.tags.some((tag) => tag.toLowerCase().includes(query))
  })

  const handleDownload = (filename) => {
    const link = document.createElement("a")
    link.href = `/scripts/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExecutorDownload = (filename) => {
    const link = document.createElement("a")
    link.href = `/executors/${filename}`
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

  const handleViewExecutorRaw = async (filename, executorName) => {
    try {
      const response = await fetch(`/executors/${filename}`)
      const content = await response.text()
      setScriptContent(content)
      setViewingScript(executorName)
    } catch (error) {
      console.error("Error fetching executor:", error)
      setScriptContent("Error loading executor content")
    }
  }

  const handleViewExecutorLinks = (executor) => {
    setExecutorLinks(executor.links)
    setViewingExecutorLinks(executor.name)
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
            <button
              onClick={() => setCurrentView("executors")}
              className={`transition duration-300 ${
                currentView === "executors" ? "text-accent font-bold" : "text-foreground/70 hover:text-accent"
              }`}
            >
              Executors
            </button>
          </div>
        </div>
      </nav>

      <div className={`transition-opacity duration-500 ${currentView ? "opacity-100" : "opacity-0"}`}>
        {currentView === "home" && (
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 animate-in fade-in duration-500">
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
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 gap-2 font-bold mt-8 transition-all duration-300"
              >
                Browse Scripts
              </Button>
              <Button
                size="lg"
                onClick={() => setCurrentView("executors")}
                className="bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/50 gap-2 font-bold mt-8 ml-4 transition-all duration-300"
              >
                Browse Executors
              </Button>
            </div>
          </section>
        )}

        {currentView === "scripts" && (
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-500">
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
                          className="border-accent/50 hover:border-accent gap-2 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          RAW
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(script.filename)}
                          className="bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:shadow-secondary/50 gap-2 transition-all duration-300"
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

        {currentView === "executors" && (
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-500">
            <h2 className="text-4xl font-black mb-12 text-center bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Available Executors
            </h2>
            <div className="mb-8 flex items-center gap-2 bg-card/40 border border-accent/30 rounded-lg px-4 py-2 backdrop-blur">
              <Search className="w-5 h-5 text-accent/60" />
              <input
                type="text"
                placeholder="Search by executor name or tag (e.g., 'roblox', 'premium')"
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

            {filteredExecutors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">No executors found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredExecutors.map((executor) => (
                  <Card
                    key={executor.id}
                    className="cyber-border border-accent/40 bg-card/40 backdrop-blur hover:border-primary/60 transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{executor.name}</CardTitle>
                            {executor.verified && (
                              <CheckCircle className="w-5 h-5 text-accent fill-accent" title="Verified Executor" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/20 text-accent">
                              {executor.category}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {executor.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded bg-accent/20 text-accent border border-accent/40 cursor-pointer hover:bg-accent/30 transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-foreground/70 text-sm">{executor.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewExecutorLinks(executor)}
                          className="border-primary/50 hover:border-primary gap-2 transition-all duration-300"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Links
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleExecutorDownload(executor.filename)}
                          className="bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/50 gap-2 transition-all duration-300"
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
      </div>

      {viewingScript && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-card border border-primary/50 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-primary/30">
              <h3 className="text-xl font-bold text-primary">{viewingScript}</h3>
              <button
                onClick={() => setViewingScript(null)}
                className="text-foreground/60 hover:text-foreground text-2xl leading-none transition-colors duration-200"
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
              <Button
                variant="outline"
                onClick={() => setViewingScript(null)}
                className="border-foreground/20 transition-all duration-300"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(scriptContent)
                  setViewingScript(null)
                }}
                className="bg-gradient-to-r from-secondary to-primary transition-all duration-300"
              >
                Copy & Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {viewingExecutorLinks && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-card border border-accent/50 rounded-lg max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-accent/30">
              <h3 className="text-xl font-bold text-accent flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                {viewingExecutorLinks} - Links
              </h3>
              <button
                onClick={() => setViewingExecutorLinks(null)}
                className="text-foreground/60 hover:text-foreground text-2xl leading-none transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-3 max-h-[60vh] overflow-auto">
              {executorLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-background/50 rounded border border-accent/30 hover:border-accent/60 transition-colors duration-300"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{link.name}</p>
                    <p className="text-sm text-foreground/60 break-all">{link.url}</p>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 px-4 py-2 rounded bg-gradient-to-r from-accent to-primary text-white font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 whitespace-nowrap"
                  >
                    Open
                  </a>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-6 border-t border-accent/30 justify-end">
              <Button
                onClick={() => setViewingExecutorLinks(null)}
                className="bg-gradient-to-r from-accent to-primary transition-all duration-300"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-primary/20 mt-56 bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-foreground/60 text-sm">
          <p>&copy; 2025 Nark's Script Hub.</p>
        </div>
      </footer>
    </main>
  )
}
