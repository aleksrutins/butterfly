import pg from 'pg';
import Driver from '../util/driver';

export default class PostgresDriver extends Driver<pg.Client> {
    override parseQueryTemplate(strings: TemplateStringsArray, ...params: any[]): [string, any[]] {
        if(strings.length == 0) return ['', []];

        let result = strings[0] ?? '';
        for(let i = 0; i < params.length; i++) {
            result += '$' + (i + 1) + strings[i + 1];
        }

        return [result, params];
    }

    override async connect(connStr: string): Promise<pg.Client> {
        const client = new pg.Client({ connectionString: connStr });
        await client.connect();
        return client;
    }
    override async exec(sql: string, params: any[]): Promise<void> {
        await this.query(sql, params);
    }
    override async query<T>(sql: string, params: any[]): Promise<T[]> {
        return this.client.query(sql, params).then(result => result.rows);
    }
    override async destroy(): Promise<void> {
        this.client.end();
    }
}