import { driverForURI } from "./all"
import PostgresDriver from "./postgres"
import Sqlite3Driver from "./sqlite";

describe('driver detection', () => {
    it('correctly detects PostgreSQL', () => {
        expect(driverForURI("postgresql://localhost:5432/db")).toBeInstanceOf(PostgresDriver);
    })
    it('correctly detects SQLite3', () => {
        expect(driverForURI("sqlite3:data.db")).toBeInstanceOf(Sqlite3Driver);
    })
})