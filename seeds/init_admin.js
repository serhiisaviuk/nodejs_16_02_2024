/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex('users').insert([
        {
            login: 'admin', email: "admin@qwe.qwe", data: {
                money: 100,
                docs: {
                    name: "Serhii"
                }
            }
        },
    ]);
};
