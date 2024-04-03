import postgresClient from "../postres/client.js";
import knexClient from "../postres/client_knex.js"
import knex from "knex";
import Users from "../entity/Users.js";


const map = new Map();
map.set("1", {userId: "userId", name: "qwe", password: "qwe"});
map.set("2", {userId: "userId1", name: "serhii", password: "admin"});


export default class UserRepository {
    async save(user) {

        map.set(user.userId, user);

        // await knexClient("users").insert(user)

        // await Users.query().insert({
        //     login: "Test123",
        // });
    }

    async get(userId) {
        const now = await postgresClient.query("SELECT * from Users where id=$1", [userId]);
        await postgresClient.query("Insert into Users (login, email) values ($1, $2)", ["Serhi", "ser@se.com"])
        console.log("Users", now.rows);

        return map.get(userId);
    }

    getUserByName(name) {
        for (let user of map.values()) {
            if (user.name === name) {
                return user;
            }
        }

        return null;
    }

    async getAll() {
        // const result = await knexClient
        //     .select("login", "email")
        //     .table("users")
        //     .whereRaw("parseInt(data->>'money') > 0")
        //     .orderBy("id", "desc");

        // console.log(result);

        const result = await Users.query();

        return result;
    }
}

// Pure SQL -> Select * from ....

// Query builder -> knex(config -> pg)
// knex.query()
// .select()
// .table("users")
// .where(eq("userID", "1"))
// .orderBy

// ORM Object-relation model
