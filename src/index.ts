import Koa, { Context, DefaultState } from 'koa';
import Router from 'koa-router';

import KoaLogger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

import { SqliteConnectionFactory } from './database/database';
import { DatabaseInitializer } from './database/databaseInitializer';
import { ApiEndpoints } from './api.endpoints';
import { MapGetAllTodos, MapGetTodo } from './endpoints/todos/todos.endpoint';


const PORT = process.env.PORT || 3000;
const app = new Koa();
const router = new Router<DefaultState, Context>();
const logger = KoaLogger;

// Database
const connectionString = "./todo.db";
const dbConnectionFactory = new SqliteConnectionFactory(connectionString);

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Endpoints
const apiEndpoints = new ApiEndpoints();

router.get('/', async (ctx, next) => {
    ctx.body = 'Hello Todo Rest Api'
    
    await next();
});
router.get(apiEndpoints.todosGetAll, MapGetAllTodos);
router.get(apiEndpoints.todosGet, MapGetTodo);

router.post(apiEndpoints.todosPost, async (ctx, next): Promise<void> => {
    ctx.body = ctx.request.body;
    
    await next();
});

const databaseInitializer = new DatabaseInitializer(dbConnectionFactory);
databaseInitializer.initializeAsync()
    .then(r => r);

const server = app
    .listen(PORT, () => console.log(`Koa server listening on port: http://localhost:${3000}/`))
    .on('error', (err: Error) => console.error(err));


