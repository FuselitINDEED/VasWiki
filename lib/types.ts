export type Article = {
  id: string
  title: string
  author: string
  description: string
  youtubeUrl?: string
  tags: string[]
  category?: string
  createdAt: string
  difficulty?: "beginner" | "intermediate" | "advanced"
}

export type Category = {
  id: string
  name: string
  description: string
  icon: string
}

export type WikiMeta = {
  title: string
  description: string
  version: string
  author: string
  lastUpdated: string
}

export type WikiData = {
  meta: WikiMeta
  categories: Category[]
  articles: Article[]
}
