import UserRepository from "../repository/UserRepository.js";
import UserModel from "../models/UserModel.js";
import {generate} from "../utils/storageGenerators.js";

const sequenceName = "user";

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    create(name, password) {
        const user = new UserModel(generate(sequenceName), name, password);
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


}
