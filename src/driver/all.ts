import Driver from "../util/driver";
import MySQLDriver from "./mysql";
import PostgresDriver from "./postgres";
import Sqlite3Driver from "./sqlite";

export const driverMap = new Map<string, new (uri: string) => Driver<any>>([
    ['postgresql', PostgresDriver],
    ['sqlite3', Sqlite3Driver],
    ['mysql', MySQLDriver]
])

export function driverForURI(uri: string): Driver<any> | null {
    const protocol = uri.split(':')[0] ?? "";
    const cls = driverMap.get(protocol);
    if(cls) return new cls(uri);
    return null;
}