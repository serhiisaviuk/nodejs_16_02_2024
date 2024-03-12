const map = new Map();

map.set("1", {userId: "userId", name: "qwe", password: "qwe"});

export default class UserRepository {
    save(user) {
        map.set(user.userId, user);
    }

    get(userId) {
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
