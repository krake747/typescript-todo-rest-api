import { Context, Next } from 'koa';

export async function MapGetAllTodos(ctx: Context, next: Next): Promise<void> {
    ctx.body = [
        <Todo>{
            id: 1,
            title: 'Make Todo Rest Api',
            description: 'Make Todo Rest Api',
            addDate: new Date(),
            isDone: false
        }, 
        <Todo>{
            id: 2,
            title: 'Enhance Todo Rest Api',
            description: 'Enhance Todo Rest Api',
            addDate: new Date(),
            isDone: false
        }];
    
    await next();
}

export async function MapGetTodo(ctx: Context, next: Next): Promise<void> {
    ctx.body = <Todo>{
        id: 1,
        title: 'Make Todo Rest Api',
        description: 'Make Todo Rest Api',
        addDate: new Date(),
        isDone: false
    };

    await next();
}