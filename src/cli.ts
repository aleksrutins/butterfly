#!/usr/bin/env node
import refresh from './cmd/refresh';
import revert from './cmd/revert';
import up from './cmd/up';
import { driverForURI } from './driver/all';
import * as log from './util/log';
import { ensureMigrationsTable } from './util/tracker';

let driver = null;

try {
    if (process.argv[0]?.endsWith('node')) process.argv.shift();

    log.info("Connecting to database...");

    const url = process.env['DATABASE_URL'];

    if (!url) {
        throw "DATABASE_URL was not provided, exiting.";
    }

    driver = driverForURI(url);
    await driver?.init();

    if (!driver) {
        throw "Unsupported protocol: " + (url ?? "").split(":")[0];
    }

    log.info("Ensuring migrations table exists...");
    await ensureMigrationsTable(driver);

    switch (process.argv[1]) {
        case 'up':
            await up(driver);
            break;
        case 'revert':
            await revert(driver);
            break;
        case 'refresh':
            await refresh(driver);
            break;
        default:
            throw `Unknown command: ${process.argv[1]}. Available commands are up, revert, refresh`;
    }
} catch(e: any) {
    if('message' in e) log.error(e.message.toString());
    else log.error(e.toString());
    if('printStackTrace' in e && typeof e['printStackTrace'] == 'function') e.printStackTrace();
} finally {
    driver?.destroy();
}