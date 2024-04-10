import {Model} from "objection";

export default class User extends Model {
    static get tableName() {
        return "users"
    }

    static get idColumn() {
        return "email"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["email", "password"],
            properties: {
                id: {type: "integer"},
                email: {type: "string"},
                password: {type: "string"},
                created_at: {type: "string", format: "date-time"},
            }
        }
    }
}
