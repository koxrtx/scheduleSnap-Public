// client コンポーネント
"use client"

// ログイン情報を子コンポーネントに渡す機能
import { SessionProvider } from "@hono/auth-js/react"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}