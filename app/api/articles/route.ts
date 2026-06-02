import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { getAllArticles, searchArticles, getCategories, getWikiMeta } from "@/lib/data-loader"
import { EDITOR_PASSWORD } from "@/lib/edit-config"
import type { WikiData } from "@/lib/types"

const DATA_PATH = path.join(process.cwd(), "public/data/wiki-data.json")

async function getWikiData(): Promise<WikiData> {
  const data = await fs.readFile(DATA_PATH, "utf-8")
  return JSON.parse(data)
}

async function saveWikiData(data: WikiData): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const includesMeta = searchParams.get("meta") === "true"
  
  const articles = query ? searchArticles(query) : getAllArticles()
  
  if (includesMeta) {
    return NextResponse.json({
      meta: getWikiMeta(),
      categories: getCategories(),
      articles
    })
  }
  
  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  try {
    const { password, article } = await request.json()
    
    if (password !== EDITOR_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const wikiData = await getWikiData()
    
    // Check if article exists (update) or is new (create)
    const existingIndex = wikiData.articles.findIndex((a) => a.id === article.id)
    
    if (existingIndex >= 0) {
      wikiData.articles[existingIndex] = article
    } else {
      // Generate new ID
      const maxId = Math.max(...wikiData.articles.map((a) => parseInt(a.id, 10)), 0)
      article.id = String(maxId + 1)
      wikiData.articles.push(article)
    }
    
    wikiData.meta.lastUpdated = new Date().toISOString().split("T")[0]
    
    await saveWikiData(wikiData)
    
    return NextResponse.json({ success: true, article })
  } catch {
    return NextResponse.json({ error: "Failed to save article" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { password, articleId } = await request.json()
    
    if (password !== EDITOR_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const wikiData = await getWikiData()
    const existingIndex = wikiData.articles.findIndex((a) => a.id === articleId)
    
    if (existingIndex < 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }
    
    wikiData.articles.splice(existingIndex, 1)
    wikiData.meta.lastUpdated = new Date().toISOString().split("T")[0]
    
    await saveWikiData(wikiData)
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}
