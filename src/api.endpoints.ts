export class ApiEndpoints {
    constructor() {
    }
    
    private readonly apiBase: string = '/api';
    
    private readonly todosBase: string = `${this.apiBase}/todos`;
    
    public readonly todosGet: string = `${this.todosBase}/{id}`;
    public readonly todosGetAll: string = `${this.todosBase}`;
    public readonly todosPost: string = `${this.todosBase}/{id}`;
    public readonly todosPut: string = `${this.todosBase}/{id}`;
    public readonly todosDelete: string = `${this.todosBase}/{id}`;

}