import * as Router from "koa-router";
import Database from "./db";

const router = new Router();

const db = new Database();
db.initialize();

router.get("/foo", async (ctx, next) => {
  ctx.body = "bar";
  await next();
});

export default router;
