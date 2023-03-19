import Koa, { Next } from 'koa';
import Router from 'koa-router';

import KoaLogger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

const PORT = process.env.PORT || 3000;
const app: Koa = new Koa();
const router: Router = new Router();
const logger = KoaLogger;

// Endpoints
router.get('/', async (ctx, next: Next): Promise<void> => {
    ctx.body = {
        message: 'Make Todo Rest Api',
        isDone: true
    };

    await next();
});

router.post('/', async (ctx, next: Next): Promise<void> => {
    ctx.body = ctx.request.body;
    await next();
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

const server = app
    .listen(PORT, () => console.log(`Koa server listening on port: ${3000}`))
    .on('error', (err: Error) => console.error(err));