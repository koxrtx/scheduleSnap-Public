import { Hono } from "hono";
import { db } from "../db/index.js";
import { schedules } from "../db/schema/schedules.js";

const schedulesRoute = new Hono();

schedulesRoute.post('/', async (c) => {
  const body = await c.req.json()

  const newSchedule = await db
    .insert(schedules)
    .values({
      userId:     body.userId,
      title:      body.title,
      event_date: body.event_date,
      start_time: body.start_time,
      end_time:   body.end_time,
    })
    // 登録した内奥を取得
    .returning();
  // 登録したスケジュールを返す
  return c.json(newSchedule);
})

export default schedulesRoute;

