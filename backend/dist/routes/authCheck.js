import { Hono } from "hono";
import requireAuth from "../middleware/requireAuth.js";
const authCheck = new Hono()
    .use("*", requireAuth);
authCheck.get("/", (c) => {
    const auth = c.get("authUser");
    return c.json({
        authenticated: true,
        user: auth,
    });
});
export default authCheck;
