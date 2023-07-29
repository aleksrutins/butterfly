import Driver from "../util/driver";
import MySQLDriver from "./mysql";
import PostgresDriver from "./postgres";
import Sqlite3Driver from "./sqlite";
import SurrealDriver from "./surreal";

export const driverMap = new Map<string, new (uri: string) => Driver<any>>([
    ['postgresql', PostgresDriver],
    ['sqlite3', Sqlite3Driver],
    ['mysql', MySQLDriver],
    ['https', SurrealDriver]
])

export function driverForURI(uri: string): Driver<any> | null {
    const protocol = uri.split(':')[0] ?? "";
    const cls = driverMap.get(protocol);
    if(cls) return new cls(uri);
    return null;
}