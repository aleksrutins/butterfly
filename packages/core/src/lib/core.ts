import { driverForURI } from './detect';
import { createDriver } from './driver';

export * from './driver';
export * from './detect';

export type DriverInstance = ReturnType<typeof createDriver>

export function connect(uri: string): DriverInstance {
  return createDriver(driverForURI(uri), uri);
}