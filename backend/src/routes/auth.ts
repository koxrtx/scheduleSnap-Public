// Honoアプリを作るための部品
import { Hono } from 'hono'

import {
  initAuthConfig,
  verifyAuth,
  authHandler,
} from '@hono/auth-js'
// Auth.jsとDrizzleをつなぐ橋渡し(アダプター)
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Google from '@auth/core/providers/google'
import {
  db,
  users,
  accounts,
  authenticators,
  sessions,
  verificationTokens,
} from '../db/schema.js'

// 認証専用のルーターを作成
const v1Router = new Hono()
  .use(
    '*',
    initAuthConfig((c) => ({
      // 後でいるか確認要
      basePath: "/api/v1/auth",

      adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        authenticatorsTable: authenticators,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      }),
      secret: process.env.AUTH_SECRET,
      providers: [
        Google({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
      ],
      session: { strategy: 'jwt' },
    }))
  )
  // ログインしているか確認するミドルウェア
  // .use('*', verifyAuth())
  .use('/auth/*', authHandler())

const authRoute = new Hono().route('/api/v1', v1Router)
export default authRoute