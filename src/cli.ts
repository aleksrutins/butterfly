#!/usr/bin/env node
import refresh from './cmd/refresh';
import revert from './cmd/revert';
import up from './cmd/up';
import { driverForURI } from './driver/all';
import * as log from './util/log';
import { ensureMigrationsTable } from './util/tracker';

if(process.argv[0]?.endsWith('node')) process.argv.shift();

log.info("Connecting to database...");

const url = process.env['DATABASE_URL'];

if(!url) {
    log.error("DATABASE_URL was not provided, exiting.");
    process.exit(1);
}

const driver = driverForURI(url);

if(!driver) {
    log.error("Unsupported protocol: " + (url ?? "").split(":")[0]);
    process.exit(1);
}

log.info("Ensuring migrations table exists...");
await ensureMigrationsTable(driver);

switch(process.argv[1]) {
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
        log.error(`Unknown command: ${process.argv[1]}. Available commands are up, revert, refresh`);
}