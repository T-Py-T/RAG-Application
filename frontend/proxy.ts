// frontend/proxy.ts
// Refreshes the Supabase session for requests covered by the route matcher.
// It does not implement application routes or authorization decisions.
import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
