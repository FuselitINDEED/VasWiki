"use client"

import { FileText, Calendar, User } from "lucide-react"
import type { Article } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ArticleListProps = {
  articles: Article[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ArticleList({ articles, selectedId, onSelect }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-muted-foreground">No articles found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {articles.map((article) => (
        <button
          key={article.id}
          onClick={() => onSelect(article.id)}
          className={cn(
            "flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors hover:bg-accent",
            selectedId === article.id && "bg-accent border-primary"
          )}
        >
          <div className="flex w-full items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight">{article.title}</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {article.createdAt}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
