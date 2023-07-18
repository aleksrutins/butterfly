import MySQLDriver from "./mysql"

describe('MySQL driver', () => {
    const driver = new MySQLDriver('mysql://');
    it('correctly escapes queries', () => {
        expect(driver.parseQueryTemplate`SELECT * FROM table_name WHERE count = ${1} AND name = ${'fred'}`)
            .toEqual(['SELECT * FROM table_name WHERE count = ? AND name = ?', [1, 'fred']]);
    })
})