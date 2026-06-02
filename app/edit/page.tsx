"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Book,
  Lock,
  Plus,
  Pencil,
  Trash2,
  Save,
  ArrowLeft,
  Eye,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import type { Article, Category } from "@/lib/types"
import ReactMarkdown from "react-markdown"

export default function EditPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [tagInput, setTagInput] = useState("")

  // Form state for new/editing article
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    youtubeUrl: "",
    tags: [] as string[],
    category: "",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
  })

  useEffect(() => {
    // Check if already authenticated via session storage
    const storedAuth = sessionStorage.getItem("wiki-editor-auth")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
      loadArticles()
    }
  }, [])

  const loadArticles = async () => {
    try {
      const res = await fetch("/api/articles?meta=true")
      const data = await res.json()
      setArticles(data.articles || [])
      setCategories(data.categories || [])
    } catch {
      console.error("Failed to load articles")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        sessionStorage.setItem("wiki-editor-auth", "true")
        sessionStorage.setItem("wiki-editor-password", password)
        loadArticles()
      } else {
        setAuthError("Invalid password")
      }
    } catch {
      setAuthError("Authentication failed")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("wiki-editor-auth")
    sessionStorage.removeItem("wiki-editor-password")
    setPassword("")
  }

  const startCreating = () => {
    setIsCreating(true)
    setEditingArticle(null)
    setFormData({
      title: "",
      author: "",
      description: "",
      youtubeUrl: "",
      tags: [],
      category: categories[0]?.id || "",
      difficulty: "beginner",
    })
    setShowPreview(false)
  }

  const startEditing = (article: Article) => {
    setEditingArticle(article)
    setIsCreating(false)
    setFormData({
      title: article.title,
      author: article.author,
      description: article.description,
      youtubeUrl: article.youtubeUrl || "",
      tags: article.tags,
      category: article.category || "",
      difficulty: article.difficulty || "beginner",
    })
    setShowPreview(false)
  }

  const cancelEdit = () => {
    setEditingArticle(null)
    setIsCreating(false)
    setShowPreview(false)
  }

  const handleSave = async () => {
    const storedPassword = sessionStorage.getItem("wiki-editor-password")
    if (!storedPassword) {
      setSaveMessage("Session expired. Please log in again.")
      return
    }

    setIsSaving(true)
    setSaveMessage("")

    const article: Article = {
      id: editingArticle?.id || "",
      title: formData.title,
      author: formData.author,
      description: formData.description,
      youtubeUrl: formData.youtubeUrl || undefined,
      tags: formData.tags,
      category: formData.category || undefined,
      createdAt: editingArticle?.createdAt || new Date().toISOString().split("T")[0],
      difficulty: formData.difficulty,
    }

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: storedPassword, article }),
      })

      if (res.ok) {
        setSaveMessage("Article saved successfully!")
        await loadArticles()
        setTimeout(() => {
          cancelEdit()
          setSaveMessage("")
        }, 1500)
      } else {
        setSaveMessage("Failed to save article")
      }
    } catch {
      setSaveMessage("Failed to save article")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (articleId: string) => {
    const storedPassword = sessionStorage.getItem("wiki-editor-password")
    if (!storedPassword) return

    try {
      const res = await fetch("/api/articles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: storedPassword, articleId }),
      })

      if (res.ok) {
        await loadArticles()
      }
    } catch {
      console.error("Failed to delete article")
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>VasWiki Editor Access</CardTitle>
            <CardDescription>
              Enter the password to access the VasWiki Editor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter editor password"
                />
              </div>
              {authError && (
                <p className="text-sm text-destructive">{authError}</p>
              )}
              <Button type="submit" className="w-full">
                Unlock Editor
              </Button>
              <Link href="/wiki">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Wiki
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Editor screen
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/wiki">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Wiki</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <img src="/images/GBVSR_SoulForgeIcon.png" alt="SoulForgeIcon" className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Wiki Editor</h1>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <Lock className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl p-4 md:p-6">
        {/* Creating/Editing form */}
        {(isCreating || editingArticle) ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {isCreating ? "Create New Article" : "Edit Article"}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {showPreview ? "Edit" : "Preview"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={cancelEdit}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{formData.title || "Untitled"}</h2>
                  <p className="text-sm text-muted-foreground">By {formData.author || "Unknown"}</p>
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{formData.description || "No description"}</ReactMarkdown>
                    </div>
                  </div>
                  {formData.youtubeUrl && (
                    <div className="aspect-video">
                      <iframe
                        className="h-full w-full rounded-lg"
                        src={formData.youtubeUrl.replace("watch?v=", "embed/")}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Article Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter article title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author Name</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Enter author name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Markdown)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter article description in markdown format..."
                      className="min-h-[200px] font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtubeUrl">YouTube URL (optional)</Label>
                    <Input
                      id="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value) => setFormData({ ...formData, difficulty: value as "beginner" | "intermediate" | "advanced" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        placeholder="Add a tag and press Enter"
                      />
                      <Button type="button" variant="secondary" onClick={addTag}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {saveMessage && (
                    <p className={`text-sm ${saveMessage.includes("success") ? "text-green-600" : "text-destructive"}`}>
                      {saveMessage}
                    </p>
                  )}

                  <Button onClick={handleSave} disabled={isSaving || !formData.title || !formData.author}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Article"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Article list */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Articles ({articles.length})</h2>
              <Button onClick={startCreating}>
                <Plus className="mr-2 h-4 w-4" />
                New Article
              </Button>
            </div>

            <div className="grid gap-4">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <CardDescription>
                          By {article.author} • {article.createdAt}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEditing(article)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Article</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &quot;{article.title}&quot;? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(article.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {article.description.substring(0, 150)}...
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
