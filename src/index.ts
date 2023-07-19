import { driverForURI } from './driver/all';
export { default as Driver } from './util/driver';

export async function connect(uri: string) {
    const driver = driverForURI(uri);
    await driver?.init();
    return driver;
}