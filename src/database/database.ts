import { Database } from 'sqlite3';

export interface DbConnectionFactory {
    createConnectionAsync(): Promise<Database>
}

export class SqliteConnectionFactory implements DbConnectionFactory {
    constructor(private connectionString: string) {
    }
    
    async createConnectionAsync(): Promise<Database> {
        const db = new Database(this.connectionString, (error) => {
            if (error) {
                return console.error(error.message);
            }
        });
        console.log("Connection with SQLite has been established");
        return db;
    }
}