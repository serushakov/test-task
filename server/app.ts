import * as Koa from "koa";
import routes from "./routes";
import * as logger from "koa-logger";

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(routes.routes());
app.use(routes.allowedMethods());

console.log(`listening on localhost:${PORT}`);
app.on("error", e => {
  console.log(`ERROR`, e);
});

app.use(logger());

app.listen(PORT);
