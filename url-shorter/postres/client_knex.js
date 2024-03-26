import knex from "knex";
import {Model} from "objection";

const client = knex({
    client: "pg",
    connection: "postgresql://127.0.0.1:5432/hillel",
    pool:{
        min: 2,
        max:10
    }
});

Model.knex(client);

export default client;


