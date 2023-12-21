import { invariant } from '../util/invariant';
import { AnyDriver, SupportedURI, canConnect, createDriver, DriverForURI } from './driver';

export function butterfly<Drivers extends readonly AnyDriver[]>(...drivers: Drivers) {
    return {
        addDriver<NewDrivers extends readonly AnyDriver[]>(newDrivers: NewDrivers) {
            return butterfly(...drivers, ...newDrivers)
        },

        supportsURI(uri: string): uri is SupportedURI<Drivers[number]> {
            return drivers.find(d => canConnect(d, uri)) != null;
        },
        driverForURI<URI extends SupportedURI<Drivers[number]>>(uri: URI) {
            const foundDriver = drivers.find((d) => canConnect(d, uri));
            invariant(foundDriver, `no driver found for ${uri}`)
            invariant(canConnect(foundDriver, uri), `driver ${foundDriver.name} found, but cannot connect to ${uri} - this is most likely a bug, please submit a report at https://github.com/aleksrutins/butterfly/issues`);
            return foundDriver as unknown as DriverForURI<Drivers[number], URI>;
        },
        connect<URI extends SupportedURI<Drivers[number]>>(uri: URI) {
            return createDriver(this.driverForURI(uri), uri);
        }
    };
}
