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

    create(name, password) {
        const user = new UserModel(generate(sequenceName), name, password);

        console.log(user);

        this.userRepository.save(user);
    }

    getUsersPublicData() {
        const users = this.userRepository.getAll();

        const result = [];
        for (const user of users) {
            result.push({
                id: user.userId,
                name: user.name
            })
        }

        return result;
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
