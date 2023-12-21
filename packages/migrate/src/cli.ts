#!/usr/bin/env node
import refresh from './cmd/refresh';
import revert from './cmd/revert';
import up from './cmd/up';
import { connect } from '@butterflyjs/core'
import * as log from './util/log';
import { ensureMigrationsTable } from './util/tracker';

let conn = null;

try {
    if (process.argv[0]?.endsWith('node')) process.argv.shift();

    log.info("Connecting to database...");

    const url = process.env['DATABASE_URL'];

    if (!url) {
        throw "DATABASE_URL was not provided, exiting.";
    }

    conn = connect(url);

    if (!conn) {
        throw "Unsupported protocol: " + (url ?? "").split(":")[0];
    }

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
} catch(e: any) {
    if(typeof e == 'object' && 'message' in e) log.error(e.message.toString());
    else log.error(e.toString());
    if(typeof e == 'object' && 'printStackTrace' in e && typeof e['printStackTrace'] == 'function') e.printStackTrace();
} finally {
    conn?.destroy();
}