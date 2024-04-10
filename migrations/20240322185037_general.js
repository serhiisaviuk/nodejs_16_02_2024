const USER_TABLE = "users";
const URL_SHORTER_TABLE = "url_shorter";

export function up(knex) {

    return knex.schema
        .createTable(USER_TABLE, table => {
            table.increments("id").primary();
            table.string("email").unique();
            table.string("password");
            table.timestamp("created_at", {useTz: false}).defaultTo(knex.fn.now());
            ;
        })
        .createTable(URL_SHORTER_TABLE, table => {
            table.increments("id").primary();
            table.string("code", 255).unique();
            table.string("url");
            table.string("alias");
            table.integer("visits").defaultTo(0);
            table.timestamp("created_at", {useTz: false}).defaultTo(knex.fn.now());
            table.timestamp("expired_at", {useTz: false});

            table.integer("user_id");
            table.foreign("user_id").references("id").inTable(USER_TABLE)
        })
}

export function down(knex) {

    return knex.schema
        .dropTable("users")
        .dropTable("url_shorter");
}
