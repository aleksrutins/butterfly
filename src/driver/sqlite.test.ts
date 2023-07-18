import Sqlite3Driver from "./sqlite";

describe('SQLite3 driver', () => {
    const driver = new Sqlite3Driver('sqlite:test.db');
    it('correctly escapes queries', () => {
        expect(driver.parseQueryTemplate`SELECT * FROM table_name WHERE count = ${1} AND name = ${'fred'}`)
            .toEqual(['SELECT * FROM table_name WHERE count = ? AND name = ?', [1, 'fred']]);
    })
})