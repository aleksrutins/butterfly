import { invariant } from '../util/invariant';
import { Split, TypedTemplateStringArray } from './util';

export interface Driver<
    DB extends object,
    Name extends string = string,
    Protocols extends readonly string[] = readonly string[],
    TQuery extends string = string,
    TParamReplacement extends string = string,
    TQueryResult extends object = object,
    TParam = unknown
> {
    name: Name;

    protocols: Protocols;

    connect(connStr: string): Promise<DB>;
    exec(client: DB, sql: TQuery, params: TParam[]): Promise<void>;
    query<T extends TQueryResult>(
        client: DB,
        sql: TQuery,
        params: TParam[]
    ): Promise<T[]>;

    parseQueryTemplate(
        strings: TypedTemplateStringArray<Split<TQuery, TParamReplacement>>,
        ...params: TParam[]
    ): [TQuery, TParam[]];

    destroy(client: DB): Promise<void>;
}

export type AnyDriver = Driver<
    unknown & object,
    unknown & string,
    unknown & readonly string[],
    unknown & string,
    unknown & string,
    unknown & object,
    unknown
>;

export type DB<TDriver> = TDriver extends Driver<infer DB> ? DB : never;
export type Name<TDriver> = TDriver extends Driver<unknown & object, infer Name>
    ? Name
    : never;
export type Protocols<TDriver> = TDriver extends Driver<
    unknown & object,
    unknown & string,
    infer Protocols
>
    ? Protocols
    : never;
export type Query<TDriver> = TDriver extends Driver<
    unknown & object,
    unknown & string,
    unknown & readonly string[],
    infer Query
>
    ? Query
    : never;
export type ParamReplacement<TDriver> = TDriver extends Driver<
    unknown & object,
    unknown & string,
    unknown & readonly string[],
    unknown & string,
    infer ParamReplacement
>
    ? ParamReplacement
    : never;
export type QueryResult<TDriver> = TDriver extends Driver<
    unknown & object,
    unknown & string,
    unknown & readonly string[],
    unknown & string,
    unknown & string,
    infer QueryResult
>
    ? QueryResult
    : never;
export type Param<TDriver> = TDriver extends Driver<
    unknown & object,
    unknown & string,
    unknown & readonly string[],
    unknown & string,
    unknown & string,
    unknown & object,
    infer Param
>
    ? Param
    : never;

export type QueryFragmentArray<TDriver> = Split<
    Query<TDriver>,
    ParamReplacement<TDriver>
>;

export type SupportedURI<TDriver extends AnyDriver> =
    `${Protocols<TDriver>[number]}${string}`;

export type IsSupportedURI<
    URI extends string,
    TDriver extends AnyDriver
> = URI extends SupportedURI<TDriver> ? true : false;

export type DriverForURI<Drivers extends AnyDriver, URI extends SupportedURI<Drivers>> = {
    [TDriver in Drivers as SupportedURI<TDriver>]: TDriver extends AnyDriver ? TDriver : never;
}[URI];

export function canConnect<TDriver extends AnyDriver, URI extends string>(
    driver: TDriver,
    uri: URI
) {
    return driver.protocols.some((p) => uri.startsWith(p)) as IsSupportedURI<
        URI,
        TDriver
    >;
}

export type DriverInstance<TDriver extends AnyDriver> = {
    driver: TDriver;

    query<T extends QueryResult<TDriver>>(
        sql: Query<TDriver>,
        params: Param<TDriver>[]
    ): Promise<T[]>;
    exec(sql: Query<TDriver>, params: Param<TDriver>[]): Promise<void>;
    destroy(): Promise<void>;
    q<T extends QueryResult<TDriver>>(
        strings: TypedTemplateStringArray<QueryFragmentArray<TDriver>>,
        ...params: Param<TDriver>[]
    ): Promise<T[]>;
    e(
        strings: TypedTemplateStringArray<QueryFragmentArray<TDriver>>,
        ...params: Param<TDriver>[]
    ): Promise<void>;
};

export function createDriver<TDriver extends AnyDriver>(
    driver: TDriver,
    uri: SupportedURI<TDriver>
): DriverInstance<TDriver> {
    invariant(
        canConnect(driver, uri),
        `driver ${driver.name} does not support connecting to ${uri}`
    );

    const client = driver.connect(uri);

    return {
        driver,

        async query(sql, params) {
            return await driver.query(await client, sql, params);
        },
        async exec(sql, params) {
            await driver.exec(await client, sql, params);
        },

        async destroy() {
            await driver.destroy?.(await client);
        },

        q(strings, ...params) {
            return this.query(
                ...(driver.parseQueryTemplate(strings, ...params) as [
                    Query<TDriver>,
                    Param<TDriver>[]
                ])
            );
        },

        e(strings, ...params): Promise<void> {
            return this.exec(
                ...(driver.parseQueryTemplate(strings, ...params) as [
                    Query<TDriver>,
                    Param<TDriver>[]
                ])
            );
        },
    };
}
