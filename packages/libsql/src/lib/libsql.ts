import { Driver } from '@butterflyjs/core';
import { Client, createClient } from '@libsql/client/.';
import { zip } from './zip';

export const LibSQLDriver: Driver<Client> = {
    name: 'libsql',
    protocols: ['libsql:', 'file:', 'http:', 'https:', 'ws:', 'wss:'],

    parseQueryTemplate(strings: TemplateStringsArray, ...params: any[]): [string, any[]] {
        return [strings.join('?'), params];
    },

    connect(connStr: string): Promise<Client> {
        return Promise.resolve(createClient({ url: connStr }));
    },

    async exec(client, sql, params) {
        await this.query(client, sql, params);
    },

    async query(client, sql, params) {
        const rs = await client.execute({ sql, args: params });

        return rs.rows.map(row =>
            Object.fromEntries(zip(rs.columns, Array.from(row)))    
        );
    },

    async destroy(client) {
        client.close();
    }
};