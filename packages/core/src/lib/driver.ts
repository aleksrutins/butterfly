import { invariant } from "../util/invariant";

export interface Driver<DB, TQueryResult = any> {
    name: string,
    
    protocols: string[],

    connect(connStr: string): Promise<DB>;
    exec(client: DB, sql: string, params: any[]): Promise<void>;
    query<T extends TQueryResult>(client: DB, sql: string, params: any[]): Promise<T[]>;

    parseQueryTemplate(strings: TemplateStringsArray, ...params: any[]): [string, any[]];

    destroy?: (client: DB) => Promise<void>;
}

export function canConnect(driver: Driver<any>, uri: string) {
    return driver.protocols.some(p => uri.startsWith(p));
}

export function createDriver<DB, TQueryResult = any, D extends Driver<DB, TQueryResult> = Driver<DB, TQueryResult>>(driver: D, connStr: string) {
    invariant(canConnect(driver, connStr), `driver ${driver.name} does not support connecting to ${connStr}`);

    const client = driver.connect(connStr);

    return {
        async query<T extends TQueryResult>(sql: string, params: any[]) { return await driver.query<T>(await client, sql, params) },
        async exec(sql: string, params: any[]) { await driver.exec(await client, sql, params) },

        async destroy() { await driver.destroy?.(await client) },
        
        q<T extends TQueryResult>(strings: TemplateStringsArray, ...params: any[]): Promise<T[]> {
            return this.query<T>(...driver.parseQueryTemplate(strings, ...params));
        },
    
        e(strings: TemplateStringsArray, ...params: any[]): Promise<void> {
            return this.exec(...driver.parseQueryTemplate(strings, ...params));
        }
    }
}