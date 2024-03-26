/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
      .createTable("users", table =>{
      table.increments("id").primary();
      table.string("login").unique().notNullable();
      table.string("email").unique();
      table.timestamp("created_at", {useTz: false});
      table.jsonb("data");
  })
      .createTable("url_shorter", table=>{
          table.increments("id").primary();
          table.string("code", 100).unique();
          table.string("url");
          // table.integer("user_id");
              // .references("users")

          // table.foreign("user_id")
          //     .references("users")
      })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

    return knex.schema
        .dropTable("users")
        .dropTable("url_shorter");
}
