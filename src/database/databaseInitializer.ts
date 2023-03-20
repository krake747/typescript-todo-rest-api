import { DbConnectionFactory } from './database';

export class DatabaseInitializer {
    constructor(private connectionFactory: DbConnectionFactory) {
    }

    async initializeAsync(): Promise<void> {
        const db = await this.connectionFactory.createConnectionAsync();
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Todos (
                Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                Title TEXT NOT NULL,
                Description TEXT NOT NULL,
                AddDate TEXT NOT NULL,
                IsDone TEXT NOT NULL
            )`
        );
    }
}
