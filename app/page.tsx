import { Suspense } from "react"
import WikiClient from "./wiki/WikiClient"

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <WikiClient />
    </Suspense>
  )
}
