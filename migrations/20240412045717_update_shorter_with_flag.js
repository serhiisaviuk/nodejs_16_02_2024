const USER_TABLE = "users";
const URL_SHORTER_TABLE = "url_shorter";

export function up(knex) {

    return knex.schema
        .alterTable(USER_TABLE, table => {
            table.enum("role", ["ADMIN", "USER"]).defaultTo("USER");
        })
        .alterTable(URL_SHORTER_TABLE, table => {
            table.enum("type", ["PERMANENT", "TEMPORARY", "ONE-TIME"]).defaultTo("TEMPORARY");
            table.boolean("enabled").defaultTo("true");
        });
}

export function down(knex) {

    return knex.schema
        .alterTable(USER_TABLE, table =>{
            table.dropColumn("role");
        })
        .alterTable(URL_SHORTER_TABLE, table => {
            table.dropColumns("expire_at", "type", "enabled");
        });
}
