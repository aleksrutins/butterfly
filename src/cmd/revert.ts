import Driver from "../util/driver";
import * as log from "../util/log";
import { getTrackedMigrations, untrackMigration } from "../util/tracker";

import fs from "fs";

export default async function revert(conn: Driver<any>) {
    const migrations = await getTrackedMigrations(conn);
    const latestMigration = migrations.sort()[migrations.length - 1];

    if(!latestMigration) {
        log.error("No migrations to revert");
        return;
    }

    log.info("Reverting migration " + latestMigration);
    const sql = fs.readFileSync(`migrations/${latestMigration}.down.sql`).toString();
    await conn.exec(sql, []);
    await untrackMigration(conn, latestMigration);
}