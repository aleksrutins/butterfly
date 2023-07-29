import Surreal from "surrealdb.js";
import Driver from "../util/driver";
import { RawQueryResult } from "surrealdb.js/script/types";

export default class SurrealDriver extends Driver<Surreal, RawQueryResult> {

    override parseQueryTemplate(strings: TemplateStringsArray, ...params: any[]): [string, any[]] {
        if(strings.length == 0) return ['', []];

        let result = strings[0] ?? '';
        for(let i = 0; i < params.length; i++) {
            result += '$' + i + strings[i + 1];
        }

        return [result, params];
    }

    override connect(connStr: string): Promise<Surreal> {
        return Promise.resolve(new Surreal(connStr));
    }

    async scope(params: Record<string, unknown>) {
        await this.client.connect(this.connStr, params);
    }

    override async query<T extends RawQueryResult>(sql: string, params: any[]): Promise<T[]> {
        let newParams: Record<string, string> = {};
        for(const paramID in params) {
            newParams[paramID.toString()] = params[paramID];
        }
        const result = await this.client.query<T[][]>(sql, newParams);
        return result[result.length-1]?.result ?? [];
    }
    override exec(sql: string, params: any[]): Promise<void> {
        return this.query(sql, params) as unknown as Promise<void>;
    }
}