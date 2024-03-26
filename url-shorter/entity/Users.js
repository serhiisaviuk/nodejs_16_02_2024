import {Model} from "objection";

export default class Users extends Model {
    static get tableName() {
        return "users"
    }

    static get idColumn() {
        return "login"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["login", "email"],
            properties: {
                id: {type: "integer"},
                login: {type: "string", maxLength: 100},
                email: {type: "string"},
                created_at: {type: "string", format: "date-time"},
                data: {type: "object"},
            }
        }
    }


    static get relationMappings(){
        return
    }


    getName(){
        return this.login
    }
}
