import { expect } from "../util/invariant";
import { Driver, canConnect, createDriver } from "./driver";

let registeredDrivers: Set<Driver<any>> = new Set();

export function register(...drivers: Driver<any>[]) {
    registeredDrivers = new Set([...registeredDrivers, ...drivers]);
}

export function unregister(...drivers: Driver<any>[]) {
    for (const driver of drivers) {
        registeredDrivers.delete(driver);
    }
}

export function driverForURI(uri: string): Driver<any> {
    return expect([...registeredDrivers].find(d => canConnect(d, uri)), `failed to find a driver for ${uri} - did you forget to call register()?`);
}