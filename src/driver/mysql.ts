import * as mysql from 'mysql';
import Driver from '../util/driver';

export default class MySQLDriver extends Driver<mysql.Connection> {
    override parseQueryTemplate(strings: TemplateStringsArray, ...params: any[]): [string, any[]] {
        return [strings.join('?'), params];
    }

    override connect(connStr: string): Promise<mysql.Connection> {
        const conn = mysql.createConnection(connStr);
        return new Promise((resolve, reject) => {
            conn.connect(err => err ? reject(err) : resolve(conn));
        });
    }

    override exec(sql: string, params: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.query(sql, params, err => err ? reject(err) : resolve());
        });
    }

    override query<T>(sql: string, params: any[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.client.query(sql, params, (err, results) => err ? reject(err) : resolve(results));
        });
    }

    override destroy(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.end(err => err ? reject(err) : resolve());
        });
    }
    
}