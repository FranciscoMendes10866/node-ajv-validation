import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";

import { validatorFactory } from "./validator.js";
import { authSchema } from "./schema.js";

const authValidation = validatorFactory(authSchema);

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.post("/", async (ctx, next) => {
  try {
    const data = authValidation.verify(ctx.request.body);
    ctx.body = data;
  } catch (error) {
    next(error);
    ctx.status = 500;
  }
});

app.use(router.routes());

app.listen(3000);
