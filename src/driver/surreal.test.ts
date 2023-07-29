import SurrealDriver from "./surreal";

describe("SurrealDB driver", () => {
    const driver = new SurrealDriver("");
    it('correctly escapes queries', () => {
        expect(driver.parseQueryTemplate`SELECT * FROM table_name WHERE count = ${1} AND name = ${'fred'}`)
            .toEqual(['SELECT * FROM table_name WHERE count = $0 AND name = $1', [1, 'fred']]);
    })
})