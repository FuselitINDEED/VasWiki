import { NextRequest, NextResponse } from "next/server"
import { EDITOR_PASSWORD } from "@/lib/edit-config"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (password === EDITOR_PASSWORD) {
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
