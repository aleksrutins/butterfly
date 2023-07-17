import pg from 'pg';
import Driver from '../util/driver';

export default class PostgresDriver extends Driver<pg.Client> {
    override connect(connStr: string): pg.Client {
        return new pg.Client({ connectionString: connStr });
    }
    override async exec(sql: string, ...params: string[]): Promise<void> {
        await this.query(sql, ...params);
    }
    override async query<T>(sql: string, ...params: string[]): Promise<T[]> {
        return await this.client.query({
            text: sql,
            values: params
        }).then(result => result.rows);
    }
}