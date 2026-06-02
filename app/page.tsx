"use client"

import Link from "next/link"
import { 
  Book, 
  Download, 
  WifiOff, 
  FileJson,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Code2,
  FileText,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { usePWA } from "@/hooks/use-pwa"
import { getWikiMeta, getAllArticles, getCategories } from "@/lib/data-loader"

export default function LandingPage() {
  const { canInstall, isInstalled, installApp } = usePWA()
  const meta = getWikiMeta()
  const articles = getAllArticles()
  const categories = getCategories()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src="/images/GBVSR_SoulForgeIcon.png" alt="SoulForgeIcon" className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VasWiki</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/wiki">
              <Button>Open WebApp</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b pt-40 pb-20 md:pt-56 md:pb-32">

        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
          style={{ backgroundImage: "url('/images/GBVSR_Vaseraga.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        
        <div className="relative mx-auto max-w-6xl px-4 mt-20">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              VasWiki
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl text-pretty">
              A documentary website / PWA to keep track of Vaseraga related posts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/wiki">
                <Button size="lg" className="gap-2">
                  <Globe className="h-5 w-5" />
                  Open WebApp
                </Button>
              </Link>
              {isInstalled ? (
                <Button size="lg" variant="outline" className="gap-2 bg-background/80 backdrop-blur-sm" disabled>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Installed
                </Button>
              ) : canInstall ? (
                <Button size="lg" variant="outline" className="gap-2 bg-background/80 backdrop-blur-sm" onClick={installApp}>
                  <Download className="h-5 w-5" />
                  Install App
                </Button>
              ) : (
                <Button size="lg" variant="outline" className="gap-2 bg-background/80 backdrop-blur-sm" asChild>
                  <Link href="/wiki">
                    <Download className="h-5 w-5" />
                    Check out Articles
                  </Link>
                </Button>
              )}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm py-1.5 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Version {meta.version} Available
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20" id="articles">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Featured Articles</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Articles that are within the repository, to view.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article) => (
              <Link key={article.id} href={`/wiki?article=${article.id}`}>
                <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.description.substring(0, 150)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span className="flex items-center gap-1">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Read more
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/wiki">
              <Button size="lg" variant="outline" className="gap-2">
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 text-center md:grid-cols-2">
            <div>
              <div className="text-4xl font-bold">{articles.length}</div>
              <div className="text-muted-foreground">Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold">{categories.length}</div>
              <div className="text-muted-foreground">Categories</div>
            </div>  
          </div>
        </div>  
      </section>

      {/* Documentation Download Section
      <section className="py-20" id="download-docs">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Download Documentation</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Get the complete technical documentation as a PDF for offline reference
            </p>
          </div>
          <div className="mx-auto max-w-xl">
            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>VasWiki Technical Documentation</CardTitle>
                <CardDescription>
                  Complete breakdown of website functionality, architecture, 
                  components, data flow, and customization guide.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-2 font-medium">Includes:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      System Architecture Overview
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Component Documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Data Flow Diagrams
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      PWA Implementation Details
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Custom Dataset Guide
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      File Structure Reference
                    </li>
                  </ul>
                </div>
                <a 
                  href="/downloads/vas-wiki-documentation.pdf" 
                  download="vas-wiki-documentation.pdf"
                  className="block"
                >
                  <Button size="lg" className="w-full gap-2">
                    <Download className="h-5 w-5" />
                    Download PDF Documentation
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <img src="/images/GBVSR_SoulForgeIcon.png" alt="SoulForgeIcon" className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">VasWiki</span>
              <span className="text-muted-foreground">v{meta.version}</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="https://www.dustloop.com/w/GBVSR/Vaseraga" className="hover:text-foreground" target="_blank">Dustloop</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
