"use client"

import { Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstallButtonProps {
  canInstall: boolean
  isInstalled: boolean
  onInstall: () => void
}

export function InstallButton({ canInstall, isInstalled, onInstall }: InstallButtonProps) {
  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
        <Check className="h-4 w-4" />
        <span className="hidden sm:inline">Installed</span>
      </div>
    )
  }

  if (!canInstall) {
    return null
  }

  return (
    <Button
      onClick={onInstall}
      size="sm"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Install App</span>
    </Button>
  )
}
