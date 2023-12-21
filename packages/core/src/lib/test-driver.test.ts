import { Driver } from "./driver";

export const testDriver: Driver<string> = {
    name: 'test',
    protocols: ['test:'],

    parseQueryTemplate(strings, ...params) {
        return ['', []]
    },

    query(client, sql, params) {
        return Promise.resolve([]);
    },

    async exec(client, sql, params) {
        
    },
    async connect(connStr) {
        return connStr;
    },
};

describe('test driver', () => {
    it('exists', () => expect(testDriver.name).toBe('test'))
})