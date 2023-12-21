import { Driver, DriverInstance } from "@butterflyjs/core";

type Migration = {
    name: string
}

export function ensureMigrationsTable(ctx: DriverInstance) {
    return ctx.e/*sql*/`
        create table if not exists butterfly_migrations (
            name text primary key
        );
    `;
}

export async function getTrackedMigrations(ctx: DriverInstance) {
    const rows = await ctx.q<Migration>/*sql*/ `
        select * from butterfly_migrations order by name asc;
    `;
    return rows.map(row => row.name);
}

export function trackMigration(ctx: DriverInstance, migration: string) {
    return ctx.e/*sql*/`
        insert into butterfly_migrations (name) values (${migration});
    `;
}

export function untrackMigration(ctx: DriverInstance, migration: string) {
    return ctx.e/*sql*/`
        delete from butterfly_migrations where name = ${migration};
    `;
}