// client コンポーネント
"use client"

// ログイン情報を子コンポーネントに渡す機能
import {
  SessionProvider,
  authConfigManager,
} from "@hono/auth-js/react"

// Auth.jsの認証APIの接続先をHono側のURLに設定する
// 公式に記載あり
authConfigManager.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  basePath: "/api/v1/auth",
  credentials: 'include',
})

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