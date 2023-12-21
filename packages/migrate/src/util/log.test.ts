import * as log from './log';
import * as colors from 'colors/safe.js';

describe('logging', () => {
    function testLog(fnName: keyof (typeof log), tag: string) {
        test(fnName, () => {
            const consoleMock = jest.spyOn(console, fnName).mockImplementation();
            log[fnName]('hello world');
            expect(consoleMock).toHaveBeenLastCalledWith(tag, 'hello world');
            consoleMock.mockRestore();
        })
    }
    testLog('info', colors.bgBlue(' INFO '))
    testLog('warn', colors.bgYellow(' WARN '))
    testLog('error', colors.bgRed(' ERR  '))
})