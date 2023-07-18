import Driver from './driver';

type Migration = {
    name: string
}

export function ensureMigrationsTable(ctx: Driver<any>) {
    return ctx.exec(/*sql*/`
        create table if not exists butterfly_migrations (
            name text primary key
        );
    `);
}

export async function getTrackedMigrations(ctx: Driver<any>) {
    const rows = await ctx.query<Migration>(/*sql*/ `
        select * from butterfly_migrations order by name asc;
    `);
    return rows.map(row => row.name);
}

export function trackMigration(ctx: Driver<any>, migration: string) {
    return ctx.exec(/*sql*/`
        insert into butterfly_migrations (name) values ($1);
    `, migration);
}

export function untrackMigration(ctx: Driver<any>, migration: string) {
    return ctx.exec(/*sql*/`
        delete from butterfly_migrations where name = $1;
    `, migration);
}