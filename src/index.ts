import Koa from 'koa';
import Router from 'koa-router';

import KoaLogger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

const app: Koa = new Koa();
const router: Router = new Router();
const logger = KoaLogger;

// Endpoints
router.get('/', async (ctx, next) => {
    ctx.body = { message: 'Make Todo Rest Api', isDone: true };

    await next();
});

router.post("/", async (ctx, next) => {
    ctx.body = ctx.request.body;
    await next();
})

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser())

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Koa running on 3000...');
});