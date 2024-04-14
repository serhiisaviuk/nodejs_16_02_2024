import User from "../entity/User.js";
import logger from "example-logger/lib/logger/logger.js";
const log = logger.getLogger("UserRepository");

export default class UserRepository {

    async findByEmail(email) {
        return User.query().findById(email);
    }

    async findAll(){
        return User.query();
    }

    async find(){
        return User.query();
    }

    async isUserExist(email) {
        const countResult = await User.query()
            .findById(email)
            .count("*", {as: "count"});
        return countResult?.count > 0;
    }

    async createUser(email, password){
        try {
            await User.query().insert({
                email,
                password
            });
        } catch (e) {
            log.error(e);
            throw e;
        }
    }

    async deleteById(id){
        return User.query().deleteById(id);
    }

}
