import { Hono } from "hono";

// 認証ルート
import authRoute from "./routes/auth.js";
import authCheck from "./routes/authCheck.js";

// CORS
import corsMiddleware from "./middleware/cors.js";
import imageRoute from "./routes/image.js";

// スケジュールルート
import schedulesRoute from "./routes/schedules.js";

const app = new Hono();

app.use("/api/*", corsMiddleware());

app.route("/", authRoute);
app.route("/api/v1/auth-check", authCheck);
app.route("/api/v1/image", imageRoute);
app.route("/api/v1/schedules", schedulesRoute);

// フロントでHono RPCを使うためにAPIの型を共有
export type AppType = typeof app;

export default app;