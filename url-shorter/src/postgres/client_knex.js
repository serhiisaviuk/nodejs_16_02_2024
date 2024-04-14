import knex from "knex";
import {Model} from "objection";

function init(dbConfig) {
    const client = knex(dbConfig);

    Model.knex(client);

    return client
}

export default init;


