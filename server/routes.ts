import * as Router from "koa-router";

const router = new Router();

router.get("/foo", async (ctx, next) => {
  ctx.body = "bar";
  await next();
});

export default router;
