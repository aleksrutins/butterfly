import { Driver } from '@butterflyjs/core';
import { Client, InValue, createClient } from '@libsql/client';
import { zip } from './zip';

const name = 'libsql' as const;
const protocols = ['libsql:', 'file:', 'http:', 'https:', 'ws:', 'wss:'] as const;

export const LibSQLDriver: Driver<Client, typeof name, typeof protocols, string, '?', object, InValue> = {
    name,
    protocols,

    parseQueryTemplate(strings, ...params) {
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