import dbInit from "../src/postgres/client_knex.js";

const knex = dbInit({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: ':memory:',
    },
    migrations: "./migrations",
    useNullAsDefault: true
});

try {
    const res = await knex.migrate.latest();
    console.log("Migration files run:", res);
} catch (e) {
    console.log(e);
}

const web = (await import("../src/webContext.js")).default;
const app = new web();

export {app};
