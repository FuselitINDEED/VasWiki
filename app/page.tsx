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
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <WikiClient />
    </Suspense>
  )
}
