// Honoアプリを作るための部品
import { Hono } from "hono";
import { initAuthConfig, verifyAuth, authHandler } from "@hono/auth-js";
// Auth.jsとDrizzleをつなぐ橋渡し(アダプター)
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "@auth/core/providers/google";
import { db } from "../db/index.js";
import { users, accounts, authenticators, sessions, verificationTokens, } from "../db/schema/schema.js";
// 本番環境かどうかを判定
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    secure: isProduction,
};
// 認証専用のルーターを作成
const v1Router = new Hono()
    .use("*", initAuthConfig((c) => ({
    // Hono側のルート設定が /api/v1/auth のため、Auth.jsに認識させるために設定。
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
    session: { strategy: "jwt" },
    cookies: {
        sessionToken: {
            name: "authjs.session-token",
            options: cookieOptions,
        },
        csrfToken: {
            name: "authjs.csrf-token",
            options: cookieOptions,
        },
        callbackUrl: {
            name: "authjs.callback-url",
            options: cookieOptions,
        },
        pkceCodeVerifier: {
            name: "authjs.pkce.code_verifier",
            options: cookieOptions,
        },
        state: {
            name: "authjs.state",
            options: cookieOptions,
        },
        nonce: {
            name: "authjs.nonce",
            options: cookieOptions,
        },
    },
    // Render などでホスト検証をスキップ
    trustHost: true,
    callbacks: {
        async redirect({ url }) {
            return url;
        },
    },
    // 本番環境では secure cookies を使用
    useSecureCookies: isProduction,
})))
    .use("/auth/*", authHandler());
const authRoute = new Hono().route("/api/v1", v1Router);
export default authRoute;
