import { driverForURI } from "./all"
import MySQLDriver from "./mysql";
import PostgresDriver from "./postgres"
import Sqlite3Driver from "./sqlite";
import SurrealDriver from "./surreal";

describe('driver detection', () => {
    it('correctly detects PostgreSQL', () => {
        expect(driverForURI("postgresql://localhost:5432/db")).toBeInstanceOf(PostgresDriver);
    })
    it('correctly detects SQLite3', () => {
        expect(driverForURI("sqlite3:data.db")).toBeInstanceOf(Sqlite3Driver);
    })
    it('correctly detects MySQL', () => {
        expect(driverForURI("mysql://localhost:3306/db")).toBeInstanceOf(MySQLDriver);
    })
    it('correctly detects SurrealDB', () => {
        expect(driverForURI("https://cloud.surrealdb.com/rpc")).toBeInstanceOf(SurrealDriver);
    })
})