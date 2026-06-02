"use client"

import useSWR from "swr"
import type { Article } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useArticles(searchQuery: string = "") {
  const url = searchQuery 
    ? `/api/articles?q=${encodeURIComponent(searchQuery)}`
    : "/api/articles"
  
  const { data, error, isLoading } = useSWR<Article[]>(url, fetcher, {
    fallbackData: [],
    revalidateOnFocus: false,
  })

  return {
    articles: data ?? [],
    isLoading,
    isError: !!error,
  }
}

export function useArticle(id: string | null) {
  const { data, error, isLoading } = useSWR<Article>(
    id ? `/api/articles/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    article: data ?? null,
    isLoading,
    isError: !!error,
  }
}
