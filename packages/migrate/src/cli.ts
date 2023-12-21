#!/usr/bin/env node
import { butterfly } from '@butterflyjs/core';
import refresh from './cmd/refresh';
import revert from './cmd/revert';
import up from './cmd/up';
import * as log from './util/log';
import { ensureMigrationsTable } from './util/tracker';
import { LibSQLDriver } from '@butterflyjs/libsql';

let conn = null;

try {
    if (process.argv[0]?.endsWith('node')) process.argv.shift();

    log.info("Connecting to database...");

    const url = process.env['DATABASE_URL'];

    if (!url) {
        throw "DATABASE_URL was not provided, exiting.";
    }

    const lib = butterfly(LibSQLDriver);
    if (!lib.supportsURI(url)) {
        throw "Unsupported protocol: " + (url ?? "").split(":")[0];
    }

    conn = lib.connect(url);

    log.info("Ensuring migrations table exists...");
    await ensureMigrationsTable(conn);

    switch (process.argv[1]) {
        case 'up':
            await up(conn);
            break;
        case 'revert':
            await revert(conn);
            break;
        case 'refresh':
            await refresh(conn);
            break;
        default:
            throw `Unknown command: ${process.argv[1]}. Available commands are up, revert, refresh`;
    }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch(e: any) {
    if(typeof e == 'object' && 'message' in e) log.error(e.message.toString());
    else log.error(e.toString());
    if(typeof e == 'object' && 'printStackTrace' in e && typeof e['printStackTrace'] == 'function') e.printStackTrace();
} finally {
    conn?.destroy();
}
