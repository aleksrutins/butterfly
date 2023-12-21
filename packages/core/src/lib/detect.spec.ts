import { butterfly } from './detect';
import { otherTestDriver, testDriver } from './test-driver.test';

describe('driver detection', () => {
    it('can detect a driver', () => {
        const lib = butterfly(testDriver, otherTestDriver);
        expect(lib.driverForURI('test:hi')).toBe(testDriver);
        expect(lib.driverForURI('other-test:hi')).toBe(otherTestDriver);
        expect(lib.driverForURI('test:hi').name).toBe('test');
    })

    it('doesn\'t detect nonexistent drivers', () => {
        // @ts-expect-error disable typechecking errors so we can test that runtime checks work
        expect(() => butterfly().driverForURI('test:hi')).toThrow(/invariant fail: no driver found for test:hi/);
    })
})