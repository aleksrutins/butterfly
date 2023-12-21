import { Driver } from './driver';
import { driverForURI, register, unregister } from './detect';
import { testDriver } from './test-driver.test';

describe('driver detection', () => {
    it('can detect a driver', () => {
        register(testDriver);

        expect(driverForURI('test:hi')).toBe(testDriver);
    })

    it('can unregister a driver', () => {
        register(testDriver);

        expect(driverForURI('test:hi')).toBe(testDriver);

        unregister(testDriver);
        
        expect(() => driverForURI('test:hi')).toThrow(/^expectation failed: failed to find a driver for (.*)/);
    })
})