import { Hono } from "hono";
// 認証ルート
import authRoute from "./routes/auth.js";
import authCheck from "./routes/authCheck.js";
// CORS
import corsMiddleware from "./middleware/cors.js";
import imageRoute from "./routes/image.js";
// スケジュールルート
import schedulesRoute from "./routes/schedules.js";
const app = new Hono()
    .use("/api/*", corsMiddleware())
    .route('/', authRoute)
    .route('/api/v1/auth-check', authCheck)
    .route('/api/v1/image', imageRoute)
    .route('/api/v1/schedules', schedulesRoute);
export default app;
