import { NextResponse } from "next/server"
import { getWikiData } from "@/lib/wiki-store"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const wikiData = await getWikiData()
    const article = wikiData.articles.find((a) => a.id === id)

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("GET /api/articles/[id] error:", error)
    return NextResponse.json({ error: "Failed to load article" }, { status: 500 })
  }
}
