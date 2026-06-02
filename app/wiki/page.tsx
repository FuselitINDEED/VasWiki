import { Suspense } from "react"
import WikiClient from "./WikiClient"

export default function WikiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <WikiClient />
    </Suspense>
  )
}
