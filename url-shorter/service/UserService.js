import UserRepository from "../repository/UserRepository.js";
import UserModel from "../models/UserModel.js";
import {generate} from "../utils/storageGenerators.js";
import Instance from "../helper/Instance.js";

const sequenceName = "user";

export default class UserService extends Instance {
    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    async create(name, password) {
        const user = new UserModel(generate(sequenceName), name, password);

        console.log(user);

        this.userRepository.save(user);
    }

    async getUsersPublicData() {
        const users = await this.userRepository.getAll();

        const result = [];
        for (const user of users) {
            result.push(filterUserData(user))
        }

        return result;
    }

    getUser(userId){
        const user = this.userRepository.get(userId);
        return filterUserData(user);
    }

    checkPassword(name, password) {
        if(!name || !password){
            return false;
        }

        const user = this.userRepository.getUserByName(name);

        if (user?.password === password) {
            return true;
        }

        return false;
    }

}


function filterUserData(user){
    return {
        userId: user.userId,
        name: user.name
    }
}
