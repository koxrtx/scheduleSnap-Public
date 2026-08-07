// CORS設定
import { cors } from 'hono/cors'

// CORS should be called before the route
export default function corsMiddleware() {
  return cors({
    origin: process.env.FRONTEND_URLS,
    maxAge: 600,
    credentials: true,
})
}