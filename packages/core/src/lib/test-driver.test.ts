/* eslint-disable @typescript-eslint/no-unused-vars */

import { Driver } from "./driver";

const name = 'test' as const;
const protocols = ['test:'] as const;

export const testDriver: Driver<{ msg: string }, typeof name, typeof protocols> = {
    name,
    protocols,

    parseQueryTemplate(strings, ...params) {
        return ['', []]
    },

    query(client, sql, params) {
        return Promise.resolve([]);
    },

    async exec(client, sql, params) {
        
    },
    async connect(connStr) {
        return {msg: connStr};
    },

    async destroy(client) {
        
    },
};

const otherName = 'other-test' as const;
const otherProtocols = ['other-test:'] as const;

export const otherTestDriver: Driver<{ msg: string }, typeof otherName, typeof otherProtocols> = {
    name: otherName,
    protocols: otherProtocols,

    parseQueryTemplate(strings, ...params) {
        return ['', []]
    },

    query(client, sql, params) {
        return Promise.resolve([]);
    },

    async exec(client, sql, params) {
        
    },
    async connect(connStr) {
        return {msg: connStr};
    },

    async destroy(client) {
        
    },
};

describe('test driver', () => {
    it('exists', () => expect(testDriver.name).toBe('test'))
})