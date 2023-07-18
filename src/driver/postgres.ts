import pg from 'pg';
import Driver from '../util/driver';

export default class PostgresDriver extends Driver<pg.Client> {
    override async connect(connStr: string): Promise<pg.Client> {
        const client = new pg.Client({ connectionString: connStr });
        await client.connect();
        return client;
    }
    override async exec(sql: string, ...params: string[]): Promise<void> {
        await this.query(sql, ...params);
    }
    override async query<T>(sql: string, ...params: string[]): Promise<T[]> {
        return this.client.query(sql, params).then(result => result.rows);
    }
    override async destroy(): Promise<void> {
        this.client.end();
    }
}