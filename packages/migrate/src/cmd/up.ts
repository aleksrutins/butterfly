import * as fs from 'fs/promises'

import { AnyDriver, DriverInstance } from '@butterflyjs/core';
import { getTrackedMigrations, trackMigration } from "../util/tracker";
import * as log from '../util/log';

function getMigrationName(filename: string) {
    if(filename.indexOf(".up.sql") != -1) {
        return filename.substring(0, filename.indexOf(".up.sql"));
    }
    if(filename.indexOf(".down.sql") != -1) {
        return filename.substring(0, filename.indexOf(".down.sql"));
    }
    return filename;
}

export default async function up(conn: DriverInstance<AnyDriver>) {
    const migrations = await getTrackedMigrations(conn);
    const actualMigrations = new Set(
        (await fs.readdir("migrations")).map(
            filename => 
                getMigrationName(filename)));
    
    const needToRun = [...actualMigrations].filter(m => !migrations.includes(m)).sort();
    for(const migrationName of needToRun) {
        log.info("Running migration " + migrationName);
        const fileName = migrationName + ".up.sql";
        const sql = (await fs.readFile("migrations/" + fileName)).toString();
        await conn.exec(sql, []);
        await trackMigration(conn, migrationName);
    }
}