import Koa, { Next } from 'koa';
import Router from 'koa-router';

import KoaLogger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import { SqliteConnectionFactory } from './database/database';
import { DatabaseInitializer } from './database/databaseInitializer';

const PORT = process.env.PORT || 3000;
const app: Koa = new Koa();
const router: Router = new Router();
const logger = KoaLogger;

// Endpoints
router.get('/', async (ctx, next: Next): Promise<void> => {
    ctx.body = <Todo>{
        id: 1,
        title: 'Make Todo Rest Api',
        description: 'Make Todo Rest Api',
        addDate: new Date(),
        isDone: false
    };

    await next();
});



// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

const connectionString = "./todo.db";
const dbConnectionFactory = new SqliteConnectionFactory(connectionString);
const databaseInitializer = new DatabaseInitializer(dbConnectionFactory);
databaseInitializer.initializeAsync()
    .then(r => r);

router.post('/todos', async (ctx, next: Next): Promise<void> => {
    ctx.body = ctx.request.body;
    const db = await dbConnectionFactory.createConnectionAsync();
    db.exec(`
         INSERT INTO Todos (Title, Description, AddDate, IsDone) 
         VALUES ('Todo Rest Api', 'Make Rest Api using Koa', CURRENT_TIMESTAMP, FALSE)
    `);
    await next();
});

const server = app
    .listen(PORT, () => console.log(`Koa server listening on port: http://localhost/${3000}/`))
    .on('error', (err: Error) => console.error(err));


