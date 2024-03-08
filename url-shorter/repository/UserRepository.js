const map = new Map();

export default class UserRepository {
    save(user) {
        map.set(user.userId, user);
    }

    get(userId) {
        return map.get(userId);
    }

    getAll(){
        return map.values();
    }
}
