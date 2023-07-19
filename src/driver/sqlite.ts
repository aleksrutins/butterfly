import sqlite3 from 'sqlite3';
import Driver from '../util/driver';
const sqlite = sqlite3.verbose();

export default class Sqlite3Driver extends Driver<sqlite3.Database> {
    override parseQueryTemplate(strings: TemplateStringsArray, ...params: any[]): [string, any[]] {
        return [strings.join('?'), params];
    }

    override async connect(connStr: string): Promise<sqlite3.Database> {
        return new sqlite.Database(connStr.split(':').slice(1).join(':'));
    }
    override async exec(sql: string, params: any[]): Promise<void> {
        await this.query<void>(sql, params);
        return void 0;
    }
    override query<T>(sql: string, params: any[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.client.all<T>(sql, params, (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    override destroy(): Promise<void> {
        return new Promise((resolve, reject) =>
            this.client.close(err => err ? reject(err) : resolve()));
    }
    
}