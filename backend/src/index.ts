// .env読み込むために必要
import "dotenv/config";

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
// 認証ルート
import authRoute from "./routes/auth.js";
// CORS
import corsMiddleware from "./middleware/cors.js";

const app = new Hono()
app.use('/api/*', corsMiddleware())
app.route("/", authRoute)


// Hono　が動作してるか確認用ルートのためコメントアウト（削除してもいい）
// app.get('/', (c) => {
///  return c.text('Hello Hono!')
// })

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
