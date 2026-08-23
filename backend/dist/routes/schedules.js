import { Hono } from "hono";
import requireAuth from "../middleware/requireAuth.js";
import { db } from "../db/index.js";
import { schedules } from "../db/schema/schedules.js";
const schedulesRoute = new Hono()
    .use("*", requireAuth);
schedulesRoute.post('/', async (c) => {
    const body = await c.req.json();
    const auth = c.get("authUser");
    // スケジュールをDBに登録
    const newSchedule = await db
        .insert(schedules)
        .values({
        userId: auth.token.sub,
        title: body.title,
        event_date: body.event_date,
        start_time: body.start_time,
        end_time: body.end_time,
    })
        // 登録したスケジュールを取得
        .returning();
    // 登録したスケジュールを返す
    return c.json(newSchedule);
});
schedulesRoute.get('/', async (c) => {
    const schedulesList = await db
        .select()
        .from(schedules);
    return c.json(schedulesList);
});
export default schedulesRoute;
