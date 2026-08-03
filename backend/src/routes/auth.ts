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
      adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        authenticatorsTable: authenticators,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      }),
      secret: c.env.AUTH_SECRET,
      providers: [
        Google({
          clientId: c.env.GOOGLE_ID,
          clientSecret: c.env.GOOGLE_SECRET,
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