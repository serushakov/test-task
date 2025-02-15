import * as Router from "koa-router";
import Database from "./db";
import { GetPackagesResponse } from "../common/types";

const router = new Router();

const db = new Database();
db.initialize();

router.get("/api/packages", async (ctx, next) => {
  const { offset = 0, amount = 20 } = ctx.query;

  const parsedOffset = Number(offset);
  const parsedAmount = Number(amount);

  if (isNaN(parsedOffset) || isNaN(parsedAmount)) {
    ctx.status = 400;
    ctx.body = {
      error: "Please check request parameters"
    };
  } else {
    const packages = db.getPackagesWithOffset(parsedOffset, parsedAmount);
    const total = db.getAllPackages().length;

    const response: GetPackagesResponse = {
      packages,
      total
    };

    ctx.body = response;
  }

  await next();
});

router.get("/api/packages/:packageName", async (ctx, next) => {
  const { packageName } = ctx.params;

  const pkg = db.getPackageData(packageName);

  if (!pkg) {
    ctx.status = 404;

    ctx.body = {
      error: `Package ${packageName} could not be found`
    };
  } else {
    ctx.body = {
      result: pkg
    };
  }

  await next();
});

export default router;
