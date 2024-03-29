import UserRepository from "../repository/UserRepository.js";
import UserModel from "../models/UserModel.js";
import {generate} from "../utils/storageGenerators.js";
import Instance from "../helper/Instance.js";
import config from "../config.js";
import generateRandomString from "../utils/cryptoRandomString.js";
import crypto from "crypto";
import * as bcrypt from "bcrypt";


const sequenceName = "user";

export default class UserService extends Instance {
    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    async create(name, password) {

        const user = new UserModel(generate(sequenceName), name, await this.hashPassword(password));

        console.log(user);

        this.userRepository.save(user);
    }

    async hashPassword(input) {
        return await bcrypt.hash(input, 10);
    }

    async getUsersPublicData() {
        const users = await this.userRepository.getAll();

        const result = [];
        for (const user of users) {
            result.push(filterUserData(user))
        }

        return result;
    }

    getUser(userId) {
        const user = this.userRepository.get(userId);
        return filterUserData(user);
    }

    async checkPassword(name, password) {
        if (!name || !password) {
            return false;
        }

        const user = this.userRepository.getUserByName(name);

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return true;
        }

        return false;
    }

}


function filterUserData(user) {
    return {
        userId: user.userId,
        name: user.name
    }
}
