/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable("url_shorter", (table) =>{
        table.integer("user_id").references("users.id")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

    return knex.schema.alterTable("url_shorter", (table) =>{
        table.dropColumn("user_id");
    })

};
