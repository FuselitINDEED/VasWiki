"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { WifiOff, Menu, X, Home, Pencil } from "lucide-react"
import { getAllArticles, searchArticles, getArticleById } from "@/lib/data-loader"
import { SearchBar } from "@/components/wiki/search-bar"
import { ArticleList } from "@/components/wiki/article-list"
import { ArticleView } from "@/components/wiki/article-view"
import { InstallButton } from "@/components/wiki/install-button"
import { usePWA } from "@/hooks/use-pwa"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function WikiClient() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isOffline, canInstall, isInstalled, installApp } = usePWA()

  // Handle article ID from URL query parameter
  useEffect(() => {
    const articleId = searchParams.get("article")
    if (articleId) {
      setSelectedId(articleId)
    }
  }, [searchParams])

  const allArticles = useMemo(() => getAllArticles(), [])

  const filteredArticles = useMemo(() => {
    return searchArticles(searchQuery)
  }, [searchQuery])

  const selectedArticle = useMemo(() => {
    return selectedId ? getArticleById(selectedId) ?? null : null
  }, [selectedId])

  const handleSelectArticle = (id: string) => {
    setSelectedId(id)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <img src="/images/GBVSR_SoulForgeIcon.png" alt="SoulForgeIcon" className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">VasWiki</h1>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {isOffline && (
            <div className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
              <WifiOff className="h-4 w-4" />
              <span className="hidden sm:inline">Offline</span>
            </div>
          )}

          <InstallButton
            canInstall={canInstall}
            isInstalled={isInstalled}
            onInstall={installApp}
          />

          <Link href="/edit">
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Edit (Admin Only)</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">{allArticles.length} articles</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-80 flex-shrink-0 transform border-r bg-background pt-16 transition-transform duration-200 ease-in-out md:relative md:z-0 md:translate-x-0 md:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col gap-4 p-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="flex-1 overflow-y-auto">
              <ArticleList
                articles={filteredArticles}
                selectedId={selectedId}
                onSelect={handleSelectArticle}
              />
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <button
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <ArticleView
              article={selectedArticle}
              onBack={() => setSelectedId(null)}
              showBackButton={!!selectedArticle}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
