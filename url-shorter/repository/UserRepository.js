import postgresClient from "../postres/client.js";

const map = new Map();
map.set("1", {userId: "userId", name: "qwe", password: "qwe"});


export default class UserRepository {
    save(user) {
        map.set(user.userId, user);
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

    getAll() {
        return map.values();
    }
}
