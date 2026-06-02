import { NextRequest, NextResponse } from "next/server"
import { getWikiData, saveWikiData } from "@/lib/wiki-store"
import { EDITOR_PASSWORD } from "@/lib/edit-config"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const includesMeta = searchParams.get("meta") === "true"

    const wikiData = await getWikiData()

    let articles = wikiData.articles
    if (query.trim()) {
      const lowerQuery = query.toLowerCase()
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(lowerQuery) ||
          a.description.toLowerCase().includes(lowerQuery) ||
          a.tags.some((t) => t.toLowerCase().includes(lowerQuery))
      )
    }

    if (includesMeta) {
      return NextResponse.json({
        meta: wikiData.meta,
        categories: wikiData.categories,
        articles,
      })
    }

    return NextResponse.json(articles)
  } catch (error) {
    console.error("GET /api/articles error:", error)
    return NextResponse.json({ error: "Failed to load articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password, article } = await request.json()

    if (password !== EDITOR_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const wikiData = await getWikiData()
    const existingIndex = wikiData.articles.findIndex((a) => a.id === article.id)

    if (existingIndex >= 0) {
      wikiData.articles[existingIndex] = article
    } else {
      const maxId = Math.max(...wikiData.articles.map((a) => parseInt(a.id, 10)), 0)
      article.id = String(maxId + 1)
      wikiData.articles.push(article)
    }

    wikiData.meta.lastUpdated = new Date().toISOString().split("T")[0]
    await saveWikiData(wikiData)

    return NextResponse.json({ success: true, article })
  } catch (error) {
    console.error("POST /api/articles error:", error)
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
  } catch (error) {
    console.error("DELETE /api/articles error:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}
