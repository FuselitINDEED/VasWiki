import type { WikiData, Article, Category } from "./types"
import wikiDataJson from "@/public/data/wiki-data.json"

// Load wiki data from JSON file
const wikiData: WikiData = wikiDataJson as WikiData

export function getWikiMeta() {
  return wikiData.meta
}

export function getAllArticles(): Article[] {
  return wikiData.articles
}

export function getCategories(): Category[] {
  return wikiData.categories
}

export function getArticleById(id: string): Article | undefined {
  return wikiData.articles.find((article) => article.id === id)
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return wikiData.articles.filter((article) => article.category === categoryId)
}

export function searchArticles(query: string): Article[] {
  if (!query.trim()) return wikiData.articles

  const lowerQuery = query.toLowerCase()
  return wikiData.articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getArticlesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Article[] {
  return wikiData.articles.filter((article) => article.difficulty === difficulty)
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  wikiData.articles.forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}
