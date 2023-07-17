import sqlite3 from 'sqlite3';
import Driver from '../util/driver';
const sqlite = sqlite3.verbose();

export default class Sqlite3Driver extends Driver<sqlite3.Database> {
    override connect(connStr: string): sqlite3.Database {
        return new sqlite.Database(connStr.split(':').slice(1).join(':'));
    }
    override exec(sql: string, ...params: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.run(sql, params, err => {
                if(err) reject(err);
                else resolve();
            });
        });
    }
    override query<T>(sql: string, ...params: string[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.client.all<T>(sql, params, (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }
    
}