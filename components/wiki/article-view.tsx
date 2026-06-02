"use client"

import { ArrowLeft, User, Tag } from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { Article } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type ArticleViewProps = {
  article: Article | null
  onBack?: () => void
  showBackButton?: boolean
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    let videoId: string | null = null

    if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v")
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1)
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
  } catch {
    return null
  }
  return null
}

export function ArticleView({ article, onBack, showBackButton }: ArticleViewProps) {
  if (!article) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="rounded-full bg-muted p-6">
          <Tag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">Select an article</h2>
        <p className="mt-2 text-muted-foreground">
          Choose an article from the list to read its content
        </p>
      </div>
    )
  }

  const embedUrl = article.youtubeUrl ? getYouTubeEmbedUrl(article.youtubeUrl) : null

  return (
    <article className="h-full overflow-y-auto">
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 -ml-2 md:hidden"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to articles
        </Button>
      )}
      
      <header className="mb-6">
        {/* Article Title */}
        <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
        
        {/* Author Name */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{article.author}</span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      
      <Separator className="my-6" />
      
      {/* Markdown Description Box */}
      <div className="rounded-lg border bg-muted/50 p-6">
        <h2 className="mb-4 text-lg font-semibold">Description</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-li:my-0">
          <ReactMarkdown>{article.description}</ReactMarkdown>
        </div>
      </div>
      
      {/* YouTube Video */}
      {embedUrl && (
        <div className="mt-6">
          <h2 className="mb-4 text-lg font-semibold">Video</h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <iframe
              src={embedUrl}
              title={`${article.title} - Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            <a 
              href={article.youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Watch on YouTube
            </a>
          </p>
        </div>
      )}
    </article>
  )
}
