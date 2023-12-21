import revert from "./revert";
import { getTrackedMigrations } from "../util/tracker";
import up from "./up";
import { AnyDriver, DriverInstance } from "@butterflyjs/core";

export default async function refresh(conn: DriverInstance<AnyDriver>) {
    const nMigrations = (await getTrackedMigrations(conn)).length;
    for(let i = 0; i < nMigrations; i++) {
        await revert(conn);
    }

    await up(conn);
}