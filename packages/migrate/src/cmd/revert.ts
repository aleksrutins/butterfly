import {  AnyDriver, DriverInstance } from "@butterflyjs/core";
import * as log from "../util/log";
import { getTrackedMigrations, untrackMigration } from "../util/tracker";

import * as fs from "fs/promises";

export default async function revert(conn: DriverInstance<AnyDriver>) {
    const migrations = await getTrackedMigrations(conn);
    const latestMigration = migrations.sort()[migrations.length - 1];

    if(!latestMigration) {
        log.error("No migrations to revert");
        return;
    }

    log.info("Reverting migration " + latestMigration);
    const sql = (await fs.readFile(`migrations/${latestMigration}.down.sql`)).toString();
    await conn.exec(sql, []);
    await untrackMigration(conn, latestMigration);
}