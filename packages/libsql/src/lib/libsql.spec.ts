import { driverForURI, register } from '@butterflyjs/core';
import { LibSQLDriver } from './libsql';

describe('libsql driver', () => {
    it('correctly escapes queries', () => {
        expect(LibSQLDriver.parseQueryTemplate`SELECT * FROM table_name WHERE count = ${1} AND name = ${'fred'}`)
            .toEqual(['SELECT * FROM table_name WHERE count = ? AND name = ?', [1, 'fred']]);
    })

    it('can be detected', () => {
        register(LibSQLDriver)

        for(const protocol of LibSQLDriver.protocols) {
            expect(driverForURI(`${protocol}test`)).toBe(LibSQLDriver)
        }
    })
})
