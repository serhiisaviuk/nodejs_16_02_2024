import User from "../entity/User.js";

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
        const countResult = await User.query().findById(email).count();
        return countResult > 0;
    }

    async createUser(email, password){
        await User.query().insert({
            email,
            password
        });
    }

    async deleteById(id){
        return User.query().deleteById(id);
    }

}
