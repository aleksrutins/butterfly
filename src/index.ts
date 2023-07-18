import { driverForURI } from './driver/all';

export async function connect(uri: string) {
    const driver = driverForURI(uri);
    await driver?.init();
    return driver;
}