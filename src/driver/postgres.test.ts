import PostgresDriver from "./postgres";

describe('PostgreSQL driver', () => {
    const driver = new PostgresDriver('postgresql://');
    it('correctly escapes queries', () => {
        expect(driver.parseQueryTemplate`SELECT * FROM table_name WHERE count = ${1} AND name = ${'fred'}`)
            .toEqual(['SELECT * FROM table_name WHERE count = $1 AND name = $2', [1, 'fred']]);
    })
})